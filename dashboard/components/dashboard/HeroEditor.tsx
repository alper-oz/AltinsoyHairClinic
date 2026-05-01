"use client";

import { useState } from "react";

const LOCALES = ["tr", "en", "ar"] as const;
type Locale = (typeof LOCALES)[number];

const LOCALE_LABELS: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  ar: "العربية",
};

export interface HeroConfig {
  id: string;
  updated_at: string;
  eyebrow: string | null;
  headline: string;
  headline_italic: string | null;
  body: string | null;
  cta_label: string | null;
  cta_href: string | null;
  image_url: string | null;
  // EN sütunları
  eyebrow_en: string | null;
  headline_en: string | null;
  headline_italic_en: string | null;
  body_en: string | null;
  cta_label_en: string | null;
  // AR sütunları
  eyebrow_ar: string | null;
  headline_ar: string | null;
  headline_italic_ar: string | null;
  body_ar: string | null;
  cta_label_ar: string | null;
}

type LocalizedFields = {
  eyebrow: string;
  headline: string;
  headline_italic: string;
  body: string;
  cta_label: string;
};

function fieldsForLocale(config: HeroConfig, locale: Locale): LocalizedFields {
  if (locale === "tr") {
    return {
      eyebrow: config.eyebrow ?? "",
      headline: config.headline ?? "",
      headline_italic: config.headline_italic ?? "",
      body: config.body ?? "",
      cta_label: config.cta_label ?? "",
    };
  }
  const suffix = `_${locale}` as const;
  return {
    eyebrow: (config[`eyebrow${suffix}` as const] ?? "") as string,
    headline: (config[`headline${suffix}` as const] ?? "") as string,
    headline_italic: (config[`headline_italic${suffix}` as const] ?? "") as string,
    body: (config[`body${suffix}` as const] ?? "") as string,
    cta_label: (config[`cta_label${suffix}` as const] ?? "") as string,
  };
}

/* ─────────────────────────────────────────────
   Hero önizlemesi (aktif locale verisini gösterir)
───────────────────────────────────────────── */
function HeroPreview({
  fields,
  cta_href,
  image_url,
  locale,
}: {
  fields: LocalizedFields;
  cta_href: string;
  image_url: string;
  locale: Locale;
}) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <div className="sticky top-6 rounded overflow-hidden border border-outline-variant/15 bg-[#131313]">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0e0e0e] border-b border-outline-variant/10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="flex-1 mx-3 bg-[#1c1b1b] rounded text-[9px] text-on-surface/30 px-2 py-0.5 font-mono text-center truncate">
          altinsoy.com{locale !== "tr" ? `/${locale}` : ""}
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-2 bg-[#131313]/90 border-b border-outline-variant/10">
        <span className="text-[10px] font-serif text-[#e9c176] tracking-tighter font-bold">ALTINSOY</span>
        <span className="text-[8px] bg-[#e9c176] text-[#412d00] px-2 py-0.5 font-bold uppercase tracking-wider">
          {locale.toUpperCase()}
        </span>
      </div>

      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{ minHeight: 260 }}
        dir={dir}
      >
        {image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image_url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top opacity-35 scale-110"
            style={{ filter: "grayscale(100%) brightness(0.5)" }}
          />
        ) : (
          <div className="absolute inset-0 bg-[#1a1a1a]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#131313]/20 to-[#131313]" />

        <div className="relative z-10 text-center px-6 py-12 w-full">
          {fields.eyebrow && (
            <p
              className="font-medium uppercase mb-4 text-[#e9c176]"
              style={{ fontSize: 8, letterSpacing: "0.35em" }}
            >
              {fields.eyebrow}
            </p>
          )}

          <div
            className="font-serif text-white leading-[0.92] tracking-tighter mb-6"
            style={{ fontSize: 36 }}
          >
            <span>{fields.headline || <span className="opacity-20">Başlık</span>}</span>
            {fields.headline_italic && (
              <>
                <br />
                <span className="italic">{fields.headline_italic}</span>
              </>
            )}
          </div>

          {(fields.body || fields.cta_label) && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
              {fields.body && (
                <p
                  className="text-white/50 border-l border-[#e9c176]/20 pl-3 max-w-[160px]"
                  style={{ fontSize: 9, lineHeight: 1.7, textAlign: dir === "rtl" ? "right" : "left" }}
                >
                  {fields.body}
                </p>
              )}
              {fields.cta_label && (
                <span
                  className="inline-flex items-center gap-1.5 bg-[#e9c176] text-[#412d00] font-bold uppercase tracking-widest whitespace-nowrap"
                  style={{ fontSize: 8, padding: "8px 18px" }}
                >
                  {fields.cta_label}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="px-3 py-2 bg-[#0e0e0e]/80 border-t border-outline-variant/10 flex items-center justify-between">
        <span className="text-[9px] text-on-surface/30 font-label tracking-widest uppercase">
          Önizleme · {LOCALE_LABELS[locale]}
        </span>
        <span className="flex items-center gap-1 text-[9px] text-success/70">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse inline-block" />
          {cta_href ? `→ ${cta_href}` : "Link yok"}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Locale switcher
───────────────────────────────────────────── */
function LocaleTabs({
  active,
  onChange,
  filledCount,
}: {
  active: Locale;
  onChange: (l: Locale) => void;
  filledCount: Record<Locale, number>;
}) {
  return (
    <div className="flex items-center gap-1 border-b border-outline-variant/15 mb-5">
      {LOCALES.map((l) => {
        const isActive = l === active;
        return (
          <button
            key={l}
            type="button"
            onClick={() => onChange(l)}
            className={`relative px-4 py-2.5 text-xs font-label tracking-widest uppercase transition-colors ${
              isActive
                ? "text-primary border-b-2 border-primary -mb-px"
                : "text-on-surface/45 hover:text-on-surface/70 border-b-2 border-transparent"
            }`}
          >
            {LOCALE_LABELS[l]}
            {filledCount[l] > 0 && (
              <span className="ml-2 text-[9px] text-on-surface/30">
                {filledCount[l]}/5
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Ana editör — 3 dilli
───────────────────────────────────────────── */
export default function HeroEditor({ config }: { config: HeroConfig }) {
  const [byLocale, setByLocale] = useState<Record<Locale, LocalizedFields>>({
    tr: fieldsForLocale(config, "tr"),
    en: fieldsForLocale(config, "en"),
    ar: fieldsForLocale(config, "ar"),
  });
  const [shared, setShared] = useState({
    cta_href: config.cta_href ?? "",
    image_url: config.image_url ?? "",
  });
  const [active, setActive] = useState<Locale>("tr");
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  const current = byLocale[active];
  const dir = active === "ar" ? "rtl" : "ltr";

  const setField = (key: keyof LocalizedFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setByLocale((prev) => ({
        ...prev,
        [active]: { ...prev[active], [key]: e.target.value },
      }));

  const setSharedField = (key: keyof typeof shared) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setShared((prev) => ({ ...prev, [key]: e.target.value }));

  const filledCount: Record<Locale, number> = {
    tr: Object.values(byLocale.tr).filter((v) => v.trim() !== "").length,
    en: Object.values(byLocale.en).filter((v) => v.trim() !== "").length,
    ar: Object.values(byLocale.ar).filter((v) => v.trim() !== "").length,
  };

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setState("saving");
    try {
      const res = await fetch("/api/hero-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // TR (zorunlu)
          eyebrow:               byLocale.tr.eyebrow,
          headline:              byLocale.tr.headline,
          headline_italic:       byLocale.tr.headline_italic,
          body:                  byLocale.tr.body,
          cta_label:             byLocale.tr.cta_label,
          // EN
          eyebrow_en:            byLocale.en.eyebrow,
          headline_en:           byLocale.en.headline,
          headline_italic_en:    byLocale.en.headline_italic,
          body_en:               byLocale.en.body,
          cta_label_en:          byLocale.en.cta_label,
          // AR
          eyebrow_ar:            byLocale.ar.eyebrow,
          headline_ar:           byLocale.ar.headline,
          headline_italic_ar:    byLocale.ar.headline_italic,
          body_ar:               byLocale.ar.body,
          cta_label_ar:          byLocale.ar.cta_label,
          // Locale-bağımsız
          cta_href:              shared.cta_href,
          image_url:             shared.image_url,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error ?? "Hata oluştu.");
        setState("error");
        return;
      }
      setState("saved");
      setTimeout(() => setState("idle"), 3000);
    } catch {
      setError("Bağlantı hatası.");
      setState("error");
    }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <p className="text-[10px] font-label tracking-widest uppercase text-on-surface/40 pb-1">
            İçerik · 3 Dilli Yönetim
          </p>
          <p className="text-[11px] text-on-surface/40 pb-3">
            TR alanları zorunludur. EN/AR boş bırakılırsa site o dilde otomatik TR&apos;ye düşer.
          </p>
          <LocaleTabs active={active} onChange={setActive} filledCount={filledCount} />
        </div>

        {/* Eyebrow */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-label tracking-widest uppercase text-on-surface/50">
            Üst Etiket {active === "tr" && <span className="text-on-surface/30">(opsiyonel)</span>}
          </label>
          <input
            type="text"
            value={current.eyebrow}
            onChange={setField("eyebrow")}
            dir={dir}
            placeholder={
              active === "tr" ? "Saç, Sakal & Kaş Restorasyonunda Ustalık" :
              active === "en" ? "Mastery in Hair, Beard & Brow Restoration" :
              "إتقان في زراعة الشعر واللحية والحواجب"
            }
            className="bg-surface-container border border-outline-variant/20 rounded px-3 py-2.5 text-sm text-on-surface outline-none focus:border-primary/40 transition-colors"
          />
        </div>

        {/* Headline + italic */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-label tracking-widest uppercase text-on-surface/50">
              Ana Başlık {active === "tr" && <span className="text-error">*</span>}
            </label>
            <input
              type="text"
              value={current.headline}
              onChange={setField("headline")}
              dir={dir}
              required={active === "tr"}
              placeholder={
                active === "tr" ? "Görünmezlik" :
                active === "en" ? "Invisibility" :
                "اختفاء"
              }
              className="bg-surface-container border border-outline-variant/20 rounded px-3 py-2.5 text-sm text-on-surface outline-none focus:border-primary/40 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-label tracking-widest uppercase text-on-surface/50">
              İtalik (2. satır)
            </label>
            <input
              type="text"
              value={current.headline_italic}
              onChange={setField("headline_italic")}
              dir={dir}
              placeholder={
                active === "tr" ? "Sanatı." :
                active === "en" ? "as Art." :
                "كفنّ."
              }
              className="bg-surface-container border border-outline-variant/20 rounded px-3 py-2.5 text-sm text-on-surface outline-none focus:border-primary/40 transition-colors"
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-label tracking-widest uppercase text-on-surface/50">
            Açıklama
          </label>
          <textarea
            value={current.body}
            onChange={setField("body")}
            rows={3}
            dir={dir}
            placeholder={
              active === "tr" ? "İstanbul'da saç ekimi cerrahisi..." :
              active === "en" ? "Hair restoration surgery in Istanbul..." :
              "جراحة زراعة الشعر في إسطنبول..."
            }
            className="bg-surface-container border border-outline-variant/20 rounded px-3 py-2.5 text-sm text-on-surface outline-none focus:border-primary/40 transition-colors resize-none"
          />
        </div>

        {/* CTA Label (locale-aware) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-label tracking-widest uppercase text-on-surface/50">
            Buton Metni
          </label>
          <input
            type="text"
            value={current.cta_label}
            onChange={setField("cta_label")}
            dir={dir}
            placeholder={
              active === "tr" ? "Analize Başlayın" :
              active === "en" ? "Start Analysis" :
              "ابدأ التحليل"
            }
            className="bg-surface-container border border-outline-variant/20 rounded px-3 py-2.5 text-sm text-on-surface outline-none focus:border-primary/40 transition-colors"
          />
        </div>

        {/* ── Locale-bağımsız: Buton link + image ── */}
        <p className="text-[10px] font-label tracking-widest uppercase text-on-surface/40 pb-1 border-b border-outline-variant/10 pt-3">
          Tüm Dillerde Ortak
        </p>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-label tracking-widest uppercase text-on-surface/50">
            Buton Linki
          </label>
          <input
            type="text"
            value={shared.cta_href}
            onChange={setSharedField("cta_href")}
            placeholder="#iletisim"
            className="bg-surface-container border border-outline-variant/20 rounded px-3 py-2.5 text-sm text-on-surface outline-none focus:border-primary/40 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-label tracking-widest uppercase text-on-surface/50">
            Fotoğraf URL
          </label>
          <input
            type="url"
            value={shared.image_url}
            onChange={setSharedField("image_url")}
            placeholder="https://..."
            className="bg-surface-container border border-outline-variant/20 rounded px-3 py-2.5 text-sm text-on-surface outline-none focus:border-primary/40 transition-colors font-mono text-xs"
          />
          <p className="text-[10px] text-on-surface/35">
            Cloudinary, Supabase Storage veya herhangi bir public URL.
          </p>
        </div>

        {state === "error" && error && (
          <p className="text-xs text-error bg-error/10 border border-error/20 rounded px-3 py-2">{error}</p>
        )}
        {state === "saved" && (
          <p className="text-xs text-success bg-success/10 border border-success/20 rounded px-3 py-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            3 dilde de kaydedildi.
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-outline-variant/15">
          <p className="text-[10px] text-on-surface/25">
            Son güncelleme:{" "}
            {new Date(config.updated_at).toLocaleDateString("tr-TR", {
              day: "2-digit", month: "long", year: "numeric",
              hour: "2-digit", minute: "2-digit",
            })}
          </p>
          <button
            type="submit"
            disabled={state === "saving"}
            className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded text-xs font-label tracking-wider uppercase hover:bg-primary-container transition-colors disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-[15px]">
              {state === "saving" ? "sync" : "save"}
            </span>
            {state === "saving" ? "Kaydediliyor…" : "Tüm Dilleri Kaydet"}
          </button>
        </div>
      </form>

      <HeroPreview
        fields={current}
        cta_href={shared.cta_href}
        image_url={shared.image_url}
        locale={active}
      />
    </div>
  );
}
