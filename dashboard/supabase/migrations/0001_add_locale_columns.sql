-- Locale alanları: admin panelinden yönetilen tablolara EN ve AR sütunları ekler.
-- Mevcut sütunlar (TR) korunur; EN/AR null kaldığında public site otomatik TR'ye fallback eder.
--
-- Çalıştırma:
--   1. Supabase Dashboard → SQL Editor → New query
--   2. Bu dosyanın tamamını yapıştır → Run
--   3. Uygulamayı restart edin (Vercel preview/prod) — yeni sütunlar şemaya yansısın.

-- ── BANNERS ────────────────────────────────────────────────────────────
ALTER TABLE banners
  ADD COLUMN IF NOT EXISTS title_en      text,
  ADD COLUMN IF NOT EXISTS title_ar      text,
  ADD COLUMN IF NOT EXISTS body_en       text,
  ADD COLUMN IF NOT EXISTS body_ar       text,
  ADD COLUMN IF NOT EXISTS cta_label_en  text,
  ADD COLUMN IF NOT EXISTS cta_label_ar  text;

-- ── HERO_CONFIG ────────────────────────────────────────────────────────
ALTER TABLE hero_config
  ADD COLUMN IF NOT EXISTS eyebrow_en           text,
  ADD COLUMN IF NOT EXISTS eyebrow_ar           text,
  ADD COLUMN IF NOT EXISTS headline_en          text,
  ADD COLUMN IF NOT EXISTS headline_ar          text,
  ADD COLUMN IF NOT EXISTS headline_italic_en   text,
  ADD COLUMN IF NOT EXISTS headline_italic_ar   text,
  ADD COLUMN IF NOT EXISTS body_en              text,
  ADD COLUMN IF NOT EXISTS body_ar              text,
  ADD COLUMN IF NOT EXISTS cta_label_en         text,
  ADD COLUMN IF NOT EXISTS cta_label_ar         text;

-- ── CASE_STUDIES ───────────────────────────────────────────────────────
ALTER TABLE case_studies
  ADD COLUMN IF NOT EXISTS title_en      text,
  ADD COLUMN IF NOT EXISTS title_ar      text,
  ADD COLUMN IF NOT EXISTS procedure_en  text,
  ADD COLUMN IF NOT EXISTS procedure_ar  text,
  ADD COLUMN IF NOT EXISTS technique_en  text,
  ADD COLUMN IF NOT EXISTS technique_ar  text,
  ADD COLUMN IF NOT EXISTS notes_en      text,
  ADD COLUMN IF NOT EXISTS notes_ar      text;

-- ── FAQS ───────────────────────────────────────────────────────────────
ALTER TABLE faqs
  ADD COLUMN IF NOT EXISTS question_en  text,
  ADD COLUMN IF NOT EXISTS question_ar  text,
  ADD COLUMN IF NOT EXISTS answer_en    text,
  ADD COLUMN IF NOT EXISTS answer_ar    text;
