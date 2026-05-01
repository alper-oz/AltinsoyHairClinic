#!/usr/bin/env node
/**
 * page_settings tablosunu ALL_PATHS ile seed eder.
 * Idempotent: upsert (path PK'da çakışma → mevcut satır korunur, active dokunulmaz).
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");
const env = Object.fromEntries(
  readFileSync(envPath, "utf8").split("\n").filter(l => l.trim() && !l.startsWith("#"))
    .map(l => { const i = l.indexOf("="); return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g, "")]; })
);
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const ALL_PATHS = [
  "/", "/sac-ekimi", "/sac-ekimi/fue", "/sac-ekimi/dhi", "/sac-ekimi/sapphire",
  "/sakal-ekimi", "/kas-ekimi", "/fue-vs-dhi",
  "/sac-analizi", "/fiyat", "/fiyat-hesaplama", "/greft-hesaplama",
  "/oncesi-sonrasi", "/iletisim", "/uygun-degil",
  "/vaka/dhi-sakal-1800-greft", "/vaka/fue-3200-greft", "/vaka/kas-restorasyonu-400-greft",
  "/kvkk-aydinlatma", "/gizlilik-politikasi", "/cerez-politikasi",
  "/client-data",
];

const { data: before } = await sb.from("page_settings").select("path");
const existing = new Set((before ?? []).map(r => r.path));
console.log(`Önce: ${existing.size} satır`);

const toInsert = ALL_PATHS.filter(p => !existing.has(p)).map(path => ({ path, active: true }));
if (toInsert.length === 0) {
  console.log("Tüm path'ler zaten mevcut, eklenecek satır yok.");
} else {
  const { error } = await sb.from("page_settings").insert(toInsert);
  if (error) { console.error("INSERT hata:", error.message); process.exit(1); }
  console.log(`✓ ${toInsert.length} yeni satır eklendi`);
}

// /altinsoy temizliği (idempotent)
await sb.from("page_settings").delete().eq("path", "/altinsoy");

const { data: after } = await sb.from("page_settings").select("path,active").order("path");
console.log(`\nSonra: ${after?.length ?? 0} satır\n`);
for (const r of after ?? []) console.log(`  ${r.active ? "✓" : "✗"} ${r.path}`);
