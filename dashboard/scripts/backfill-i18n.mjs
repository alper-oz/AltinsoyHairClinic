#!/usr/bin/env node
/**
 * DB'deki TR-only kayıtların _en ve _ar alanlarını AI çevirileriyle doldurur.
 * Sadece boş/null _en, _ar alanlarına yazar — mevcut çevirileri ASLA üzerine yazmaz.
 *
 * Çeviriler tıbbi terim sözlüğüne uyumlu (greft → graft / طعم,
 * şok dökülme → shock loss / تساقط الصدمة, vb.).
 *
 * Çalıştırma:
 *   node scripts/backfill-i18n.mjs
 *   node scripts/backfill-i18n.mjs --dry-run   # update atmadan ne olacağını göster
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

const dryRun = process.argv.includes("--dry-run");
const sb = createClient(url, key, { auth: { persistSession: false } });

/**
 * Çeviriler — DB'den dump edilen gerçek TR içerikten üretildi.
 * Format: { table: { id: { field_en: "...", field_ar: "..." } } }
 */
const TRANSLATIONS = {
  banners: {
    "997c1ffa-d1b6-4d4d-bc91-07c0ea1ddd07": {
      title_en: "Banner SQL Test",
      title_ar: "اختبار البانر",
      body_en: "10% off on hair transplant procedures this month",
      body_ar: "خصم 10٪ على عمليات زراعة الشعر هذا الشهر",
      cta_label_en: "Call Now",
      cta_label_ar: "اتصل الآن",
    },
  },

  // Not: TR'deki "Nordwood" yazım hatası; EN/AR'de doğru "Norwood" kullanıldı.
  case_studies: {
    "a1890d3a-c438-43fb-90e2-9479413d9565": {
      title_en: "Norwood Stage 3",
      title_ar: "نوروود المرحلة 3",
    },
    "95d29e2c-7c1a-46a7-bc6d-1b28c4339cb1": {
      title_en: "Norwood Stage 3",
      title_ar: "نوروود المرحلة 3",
    },
    "be541daa-5694-4529-a2fb-61e2435f56b5": {
      title_en: "Norwood Stage 4",
      title_ar: "نوروود المرحلة 4",
    },
    "b727da76-60ce-43aa-a0c1-8d723feb441b": {
      title_en: "Norwood Stage 3",
      title_ar: "نوروود المرحلة 3",
    },
  },

  faqs: {
    // 1. Sonuçlar ne zaman görülür?
    "eab05aa9-af93-41d8-b400-52022092e545": {
      question_en: "When do results become visible?",
      question_ar: "متى تظهر النتائج؟",
      answer_en:
        "Transplanted hairs shed within the first 2–4 weeks — this is called shock loss and is entirely normal. New hairs begin to emerge from months 3–4. The final result is reached at 12–18 months; individual results may vary.",
      answer_ar:
        "يتساقط الشعر المزروع خلال الأسابيع الأولى من 2 إلى 4 — وهو ما يُسمى تساقط الصدمة، وهو أمر طبيعي تماماً. يبدأ الشعر الجديد بالظهور في الشهر 3–4. تكتمل النتيجة النهائية في الشهر 12–18؛ وقد تختلف النتائج الفردية.",
    },

    // 2. FUE ve DHI arasındaki fark nedir?
    "12d01f26-9cf1-41ca-8d2d-4afd65665f8c": {
      question_en: "What is the difference between FUE and DHI?",
      question_ar: "ما الفرق بين FUE وDHI؟",
      answer_en:
        "With FUE, grafts are extracted one by one and placed after channels are opened. With DHI, extraction and placement are done simultaneously using a Choi pen, which provides better control over angle and direction. The technique that suits you is determined during a free consultation.",
      answer_ar:
        "في تقنية FUE، يُقتطف كل طعم على حدة ويُزرع بعد فتح القنوات. أما في DHI، فيتم الاقتطاف والزراعة في وقت واحد باستخدام قلم تشوي، مما يزيد التحكم بالزاوية والاتجاه. تُحدَّد التقنية المناسبة لك في الاستشارة المجانية.",
    },

    // 3. Kaç greft gerekli?
    "6dada878-8763-44fe-88f5-8053757f547f": {
      question_en: "How many grafts do I need?",
      question_ar: "كم عدد الطعوم اللازمة؟",
      answer_en:
        "The graft count is personalised to your hair-loss stage, the capacity of your donor area, and your expectations. In our free hair analysis, a tailored graft plan is prepared based on the Norwood scale. Typical procedures range between 2,000 and 4,500 grafts.",
      answer_ar:
        "يُخصَّص عدد الطعوم وفق مرحلة تساقط الشعر، وقدرة المنطقة المانحة، وتوقعاتك. في تحليل الشعر المجاني، تُعَدّ خطة طعوم مخصصة وفق مقياس نوروود. تتراوح العمليات المعتادة بين 2٬000 و4٬500 طعم.",
    },

    // 4. İyileşme süreci nasıl işler?
    "086d7a24-f3de-4fd0-8800-878c38a26202": {
      question_en: "How does the recovery process work?",
      question_ar: "كيف تتم عملية التعافي؟",
      answer_en:
        "Light scabbing and mild swelling are normal in the first 3 days. Scabs fall off around day 10. Normal showering can resume from day 14. Avoid sun exposure, sweat-inducing activities, and alcohol during the first month. Most patients return to social life within 5–7 days.",
      answer_ar:
        "في الأيام الثلاثة الأولى يُتوقع تكوّن قشور خفيفة وتورم بسيط. تتساقط القشور حوالي اليوم العاشر. يمكن استئناف الاستحمام الطبيعي اعتباراً من اليوم 14. يُنصح بتجنّب الشمس والأنشطة التي تُسبّب التعرّق وتناول الكحول خلال الشهر الأول. يعود معظم المرضى إلى حياتهم الاجتماعية خلال 5–7 أيام.",
    },

    // 5. Yurt dışından geliyorum, süreç nasıl işliyor?
    "042fdde5-67d5-42ca-9ac1-a0fbeaba1a9d": {
      question_en: "I'm coming from abroad — how does the process work?",
      question_ar: "أنا قادم من الخارج، كيف تتم العملية؟",
      answer_en:
        "We offer packages that include airport transfer, accommodation, and transport to the clinic. A preliminary assessment is made via online consultation; only a 2–3 day stay in Istanbul is required. Our multilingual coordinator team supports you throughout the entire process.",
      answer_ar:
        "نقدّم باقات تشمل النقل من المطار والإقامة والمواصلات إلى العيادة. يُجرى تقييم مبدئي عبر استشارة إلكترونية؛ تكفي الإقامة 2–3 أيام في إسطنبول. يرافقك فريق المنسقين متعدد اللغات طوال العملية.",
    },

    // 6. Saç ekimi kalıcı mıdır?
    "fa84da75-7c2c-4f7e-8e62-e3506066678d": {
      question_en: "Is hair transplantation permanent?",
      question_ar: "هل زراعة الشعر دائمة؟",
      answer_en:
        "Yes. Grafts taken from the nape and sides are genetically resistant to shedding and continue to grow throughout life. They do not affect the natural progression of your existing hair. Following post-operative care recommendations is essential for long-term results.",
      answer_ar:
        "نعم. الطعوم المأخوذة من المؤخرة والجانبين مقاومة وراثياً للتساقط وتواصل النمو طوال الحياة. ولا تؤثر على المسار الطبيعي لشعرك الحالي. يُعدّ الالتزام بتوصيات الرعاية بعد العملية أساسياً للنتائج طويلة المدى.",
    },
  },

  hero_config: {}, // şu an boş kayıt yok / hepsi dolu
};

function isEmpty(v) {
  return v === null || v === undefined || (typeof v === "string" && v.trim() === "");
}

let totalUpdated = 0;
let totalSkipped = 0;
let totalFieldsWritten = 0;

for (const [table, byId] of Object.entries(TRANSLATIONS)) {
  const ids = Object.keys(byId);
  if (ids.length === 0) continue;

  console.log(`\n=== ${table} ===`);

  // Mevcut row'ları çek (sadece çeviri eklenecek olanlar)
  const { data: existing, error: fetchErr } = await sb
    .from(table)
    .select("*")
    .in("id", ids);

  if (fetchErr) {
    console.error(`  ✗ Fetch error: ${fetchErr.message}`);
    continue;
  }
  const existingMap = new Map((existing ?? []).map((r) => [r.id, r]));

  for (const id of ids) {
    const row = existingMap.get(id);
    if (!row) {
      console.log(`  ⚠ ${id}: kayıt bulunamadı (silinmiş olabilir) — atlanıyor`);
      totalSkipped++;
      continue;
    }

    // Sadece DB'de boş olan _en/_ar alanlarını update'e ekle
    const proposed = byId[id];
    const updates = {};
    const written = [];
    const skipped = [];
    for (const [field, value] of Object.entries(proposed)) {
      if (isEmpty(row[field])) {
        updates[field] = value;
        written.push(field);
      } else {
        skipped.push(`${field}(zaten dolu)`);
      }
    }

    if (Object.keys(updates).length === 0) {
      console.log(`  · ${id}: hepsi zaten dolu, geç`);
      totalSkipped++;
      continue;
    }

    if (dryRun) {
      console.log(`  [DRY] ${id}: yazılacak → ${written.join(", ")}` + (skipped.length ? ` | atlanan → ${skipped.join(", ")}` : ""));
    } else {
      const { error: updErr } = await sb.from(table).update(updates).eq("id", id);
      if (updErr) {
        console.error(`  ✗ ${id}: ${updErr.message}`);
      } else {
        console.log(`  ✓ ${id}: ${written.length} alan yazıldı (${written.join(", ")})` + (skipped.length ? ` | atlandı: ${skipped.join(", ")}` : ""));
        totalUpdated++;
        totalFieldsWritten += written.length;
      }
    }
  }
}

console.log(`\n${dryRun ? "[DRY-RUN] " : ""}Özet: ${totalUpdated} kayıt güncellendi, ${totalFieldsWritten} alan yazıldı, ${totalSkipped} atlandı.`);
if (dryRun) console.log("Gerçek yazma için --dry-run flag'ini kaldırıp tekrar çalıştırın.");
