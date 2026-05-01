#!/usr/bin/env node
/**
 * DB'de TR'de dolu ama EN veya AR'da boş olan kayıtları dump eder.
 * JSON çıktı stdout'a yazılır.
 *
 * Çalıştırma:
 *   node scripts/dump-i18n-gaps.mjs > /tmp/i18n-gaps.json
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");
const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, "")];
    })
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const sb = createClient(url, key, { auth: { persistSession: false } });

const TABLES = {
  hero_config: {
    fields: ["eyebrow", "headline", "headline_italic", "body", "cta_label"],
    select: "*",
  },
  banners: {
    fields: ["title", "body", "cta_label"],
    select: "*",
  },
  case_studies: {
    fields: ["title", "notes"],
    select: "*",
  },
  faqs: {
    fields: ["question", "answer"],
    select: "*",
  },
};

function isEmpty(v) {
  return v === null || v === undefined || (typeof v === "string" && v.trim() === "");
}

const out = {};

for (const [table, cfg] of Object.entries(TABLES)) {
  const { data, error } = await sb.from(table).select(cfg.select);
  if (error) {
    out[table] = { error: error.message };
    continue;
  }
  const rows = (data ?? []).map((row) => {
    const tr = {};
    const enMissing = {};
    const arMissing = {};
    for (const f of cfg.fields) {
      const trVal = row[f];
      if (isEmpty(trVal)) continue;
      tr[f] = trVal;
      if (isEmpty(row[`${f}_en`])) enMissing[f] = trVal;
      if (isEmpty(row[`${f}_ar`])) arMissing[f] = trVal;
    }
    if (Object.keys(enMissing).length === 0 && Object.keys(arMissing).length === 0) {
      return null;
    }
    return { id: row.id, tr, missing: { en: enMissing, ar: arMissing } };
  }).filter(Boolean);
  out[table] = rows;
}

console.log(JSON.stringify(out, null, 2));
