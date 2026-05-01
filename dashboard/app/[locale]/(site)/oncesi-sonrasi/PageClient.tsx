"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export interface CaseStudy {
  id: string;
  title: string;
  procedure: string;
  technique: string;
  grafts: number | null;
  duration: string | null;
  age: number | null;
  gender: string;
  before_url: string | null;
  after_url: string | null;
  sort_order: number;
}

interface FaqItem { id: string; question: string; answer: string }

/* ─── Single Case Card ─── */
function CaseCard({ c, categoryLabel }: { c: CaseStudy; categoryLabel: (c: CaseStudy) => string }) {
  const t = useTranslations("pages.beforeAfter");
  const [flipped, setFlipped] = useState(false);
  const mainSrc = flipped
    ? (c.before_url ?? c.after_url)
    : (c.after_url  ?? c.before_url);

  const stats = [
    c.age      ? `${c.age} ${t("filter.ageSuffix")}`                   : null,
    c.grafts   ? `${c.grafts.toLocaleString("tr-TR")} ${t("filter.graftsSuffix")}` : null,
    c.duration ? c.duration                                              : null,
  ].filter(Boolean) as string[];

  return (
    <div
      className="relative rounded-3xl overflow-hidden bg-black group cursor-pointer select-none"
      onClick={() => setFlipped(p => !p)}
    >
      {/* ── Main image ── */}
      <div className="aspect-[3/4] relative overflow-hidden">
        {mainSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={mainSrc}
            src={mainSrc}
            alt={flipped ? t("card.before") : t("card.after")}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#111]">
            <span className="material-symbols-outlined text-[48px] text-white/10">hide_image</span>
            <span className="text-[11px] text-white/20 tracking-widest uppercase">{t("card.missingImage")}</span>
          </div>
        )}

        {/* Deep gradient — bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 38%, transparent 65%)" }} />

        {/* ── Category badge ── */}
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-label tracking-[0.2em] uppercase bg-primary text-on-primary px-3 py-1.5 rounded-full shadow-lg">
            {categoryLabel(c)}
          </span>
        </div>

        {/* ── Tap hint badge ── */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[9px] font-label tracking-widest uppercase bg-white/10 text-white/70 border border-white/15 px-2.5 py-1 rounded-full backdrop-blur-sm">
            {flipped ? t("card.tapAfter") : t("card.tapBefore")}
          </span>
        </div>

        {/* ── Bottom area ── */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-14">

          {/* Stats strip */}
          {stats.length > 0 && (
            <div className="flex gap-3 mb-4">
              {stats.map(s => (
                <span key={s} className="text-[10px] font-label tracking-wider uppercase text-white/50">
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* Thumbnail pair */}
          <div className="flex items-end gap-2">

            {/* BEFORE thumb */}
            <div className="flex flex-col items-center gap-1.5" style={{ flex: "0 0 44%" }}>
              <div
                className={`w-full rounded-xl overflow-hidden transition-all duration-200 ${
                  flipped
                    ? "ring-2 ring-white/80 shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                    : "ring-1 ring-white/20"
                }`}
                style={{ height: "150px" }}
              >
                {c.before_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.before_url} alt={t("card.before")} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-white/20">hide_image</span>
                  </div>
                )}
              </div>
              <span className="text-[9px] font-label tracking-[0.22em] uppercase text-white/55">{t("card.beforeLabel")}</span>
            </div>

            {/* Curved arrow */}
            <div className="flex-1 flex items-center justify-center pb-5">
              <svg width="26" height="16" viewBox="0 0 26 16" fill="none">
                <path d="M2 12 C6 3 18 2 24 7" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                <path d="M19 3 L24 7 L20 11" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* AFTER thumb */}
            <div className="flex flex-col items-center gap-1.5" style={{ flex: "0 0 44%" }}>
              <div
                className={`w-full rounded-xl overflow-hidden transition-all duration-200 ${
                  !flipped
                    ? "ring-2 ring-white/80 shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                    : "ring-1 ring-white/20"
                }`}
                style={{ height: "150px" }}
              >
                {c.after_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.after_url} alt={t("card.after")} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-white/20">hide_image</span>
                  </div>
                )}
              </div>
              <span className="text-[9px] font-label tracking-[0.22em] uppercase text-white/55">{t("card.afterLabel")}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page Client ─── */
export default function OncesiSonrasiClient({ cases, faqs = [] }: { cases: CaseStudy[]; faqs?: FaqItem[] }) {
  const t = useTranslations("pages.beforeAfter");
  const allLabel = t("filter.all");
  const [activeFilter, setActiveFilter] = useState(allLabel);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  type FaqRecord = { q: string; a: string };
  const defaultFaqItems = t.raw("faq.items") as FaqRecord[];
  const faqItems = (faqs.length > 0
    ? faqs.map(f => ({ q: f.question, a: f.answer }))
    : defaultFaqItems
  );

  const hairLabel = t("categoryLabels.hair");
  const beardLabel = t("categoryLabels.beard");
  const browLabel = t("categoryLabels.brow");

  function categoryLabel(c: CaseStudy) {
    // Procedure values come from DB as TR strings; map to localised labels.
    if (c.procedure === "Saç Ekimi" || c.procedure.toLowerCase().includes("hair")) {
      return `${hairLabel} ${c.technique}`;
    }
    if (c.procedure === "Sakal Ekimi" || c.procedure.toLowerCase().includes("beard")) {
      return beardLabel;
    }
    if (c.procedure === "Kaş Ekimi" || c.procedure.toLowerCase().includes("brow") || c.procedure.toLowerCase().includes("eyebrow")) {
      return browLabel;
    }
    // Fallback: strip " Ekimi" if present, otherwise raw
    return c.procedure.replace(" Ekimi", "");
  }

  const filterOptions = [allLabel, ...Array.from(new Set(cases.map(categoryLabel)))];
  const filtered = activeFilter === allLabel
    ? cases
    : cases.filter(c => categoryLabel(c) === activeFilter);

  return (
    <section className="pt-28">

      {/* ── HERO ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm text-on-surface-variant mb-8 tracking-wider">
            <Link href="/" className="hover:text-primary transition-colors">{t("breadcrumb.home")}</Link>
            <span className="mx-2">›</span>
            <span className="text-on-surface">{t("breadcrumb.current")}</span>
          </nav>
          <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("hero.eyebrow")}</span>
          <h1 className="font-headline text-4xl md:text-6xl leading-tight mb-8">
            {t("hero.title")} <span className="italic text-primary/80">{t("hero.titleItalic")}</span>
          </h1>
          <p className="text-on-surface/70 text-sm leading-relaxed max-w-2xl bg-surface-container-low border-l-2 border-primary/30 px-6 py-4 rounded-sm">
            {t("hero.consent")}
          </p>
        </div>
      </section>

      {/* ── FİLTRE + GALERİ ── */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-12">
            {filterOptions.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-label uppercase tracking-wider transition-all ${
                  activeFilter === f
                    ? "bg-primary text-on-primary"
                    : "border border-outline-variant/20 text-on-surface/60 hover:border-primary/40 hover:text-primary"
                }`}>
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-on-surface/40">
              <p className="text-sm">{t("filter.noResults")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filtered.map(c => <CaseCard key={c.id} c={c} categoryLabel={categoryLabel} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── SSS ── */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-12">{t("faq.title")}</h2>
          {faqItems.map((item, i) => (
            <div key={i}
              className={`faq-item ${openFaq === i ? "open" : ""} cursor-pointer ${
                i < faqItems.length - 1 ? "border-b border-outline-variant/10 pb-6 mb-6" : "pb-6"
              }`}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="flex justify-between items-center gap-4">
                <h3 className="text-sm font-medium">{item.q}</h3>
                <span className="faq-icon transition-transform duration-300 text-primary text-lg">+</span>
              </div>
              <div className="faq-answer text-sm text-on-surface/70 leading-relaxed">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-surface-container-lowest">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-headline text-3xl mb-4">{t("cta.title")}</h2>
          <p className="text-on-surface/70 mb-8">{t("cta.lede")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sac-analizi"
              className="bg-primary text-on-primary px-10 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary-container transition-all">
              {t("cta.primary")}
            </Link>
            <a href="https://wa.me/905539784242?text=Merhaba%2C%20%C3%B6ncesi%20sonras%C4%B1%20galerisini%20inceledim%2C%20bilgi%20almak%20istiyorum."
              className="border border-outline-variant/30 text-on-surface/80 px-10 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:border-primary/40 hover:text-primary transition-all">
              {t("cta.whatsapp")}
            </a>
          </div>
          <div className="flex gap-6 justify-center mt-6 text-[11px] tracking-wider uppercase text-on-surface/60">
            {[t("cta.trustFree"), t("cta.trustNonBinding"), t("cta.trust24h")].map((tt) => (
              <span key={tt} className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-primary/90">check_circle</span>
                {tt}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="py-6 px-6 text-center">
        <p className="text-[11px] text-on-surface/60 max-w-2xl mx-auto">{t("disclaimer")}</p>
      </div>

    </section>
  );
}
