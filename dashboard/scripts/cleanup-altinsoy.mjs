#!/usr/bin/env node
/**
 * Tek seferlik temizlik: page_settings tablosundan /altinsoy satırını siler.
 * /altinsoy artık geçerli bir route değil (klasör boştu, page.tsx yoktu).
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

const { data: before } = await sb.from("page_settings").select("path").order("path");
console.log(`Önce: ${before?.length ?? 0} satır`);
const had = before?.some(r => r.path === "/altinsoy");
console.log(`/altinsoy mevcut mu: ${had ? "EVET" : "hayır"}`);

if (had) {
  const { error } = await sb.from("page_settings").delete().eq("path", "/altinsoy");
  if (error) { console.error("DELETE hata:", error.message); process.exit(1); }
  console.log("✓ /altinsoy silindi");
}

const { data: after } = await sb.from("page_settings").select("path").order("path");
console.log(`\nSonra: ${after?.length ?? 0} satır\n`);
for (const r of after ?? []) console.log("  " + r.path);
