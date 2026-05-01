"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { getUTM } from "@/lib/utm";
import { Link } from "@/i18n/navigation";

interface HeroConfig {
  eyebrow: string | null;
  headline: string;
  headline_italic: string | null;
  body: string | null;
  cta_label: string | null;
  cta_href: string | null;
  image_url: string | null;
}

interface CaseStudy {
  id: string;
  title: string;
  procedure: string;
  technique: string;
  grafts: number | null;
  duration: string | null;
  age: number | null;
  gender: string;
  after_url: string | null;
  before_url: string | null;
}

function HomeCaseCard({ c }: { c: CaseStudy }) {
  const t = useTranslations("pages.home.cases.card");
  const [flipped, setFlipped] = useState(false);
  const mainSrc = flipped
    ? (c.before_url ?? c.after_url)
    : (c.after_url  ?? c.before_url);

  // category derived from procedure (raw TR string from DB) — translate label only
  const categoryLabel = (() => {
    if (c.procedure === "Saç Ekimi") return `${t("categoryHair")} ${c.technique}`;
    if (c.procedure === "Sakal Ekimi") return t("categoryBeard");
    if (c.procedure === "Kaş Ekimi") return t("categoryBrow");
    return c.procedure.replace(" Ekimi", "");
  })();

  const stats = [
    c.age      ? `${c.age} ${t("ageSuffix")}`                              : null,
    c.grafts   ? `${c.grafts.toLocaleString("tr-TR")} ${t("graftsSuffix")}` : null,
    c.duration ? c.duration                                                 : null,
  ].filter(Boolean) as string[];

  return (
    <div
      className="relative rounded-3xl overflow-hidden bg-black group cursor-pointer select-none flex-shrink-0"
      style={{ width: "clamp(260px, 30vw, 340px)" }}
      onClick={() => setFlipped(p => !p)}
    >
      {/* ── Main image ── */}
      <div className="aspect-[3/4] relative overflow-hidden">
        {mainSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={mainSrc}
            src={mainSrc}
            alt={flipped ? t("beforeAlt") : t("afterAlt")}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#111]">
            <span className="material-symbols-outlined text-[48px] text-white/10">hide_image</span>
            <span className="text-[11px] text-white/20 tracking-widest uppercase">{t("imagePlaceholder")}</span>
          </div>
        )}

        {/* Gradient */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 38%, transparent 65%)" }} />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-label tracking-[0.2em] uppercase bg-primary text-on-primary px-3 py-1.5 rounded-full shadow-lg">
            {categoryLabel}
          </span>
        </div>

        {/* Tap hint */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[9px] font-label tracking-widest uppercase bg-white/10 text-white/70 border border-white/15 px-2.5 py-1 rounded-full backdrop-blur-sm">
            {flipped ? t("tapToAfter") : t("tapToBefore")}
          </span>
        </div>

        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-14">

          {/* Stats */}
          {stats.length > 0 && (
            <div className="flex gap-3 mb-4">
              {stats.map(s => (
                <span key={s} className="text-[10px] font-label tracking-wider uppercase text-white/50">{s}</span>
              ))}
            </div>
          )}

          {/* Thumbnail pair */}
          <div className="flex items-end gap-2">

            {/* BEFORE */}
            <div className="flex flex-col items-center gap-1.5" style={{ flex: "0 0 44%" }}>
              <div
                className={`w-full rounded-xl overflow-hidden transition-all duration-200 ${
                  flipped ? "ring-2 ring-white/80 shadow-[0_0_12px_rgba(255,255,255,0.25)]" : "ring-1 ring-white/20"
                }`}
                style={{ height: "120px" }}
              >
                {c.before_url
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={c.before_url} alt={t("beforeAlt")} className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-white/5 flex items-center justify-center"><span className="material-symbols-outlined text-[14px] text-white/20">hide_image</span></div>}
              </div>
              <span className="text-[9px] font-label tracking-[0.22em] uppercase text-white/55">{t("before")}</span>
            </div>

            {/* Arrow */}
            <div className="flex-1 flex items-center justify-center pb-5">
              <svg width="26" height="16" viewBox="0 0 26 16" fill="none">
                <path d="M2 12 C6 3 18 2 24 7" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                <path d="M19 3 L24 7 L20 11" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* AFTER */}
            <div className="flex flex-col items-center gap-1.5" style={{ flex: "0 0 44%" }}>
              <div
                className={`w-full rounded-xl overflow-hidden transition-all duration-200 ${
                  !flipped ? "ring-2 ring-white/80 shadow-[0_0_12px_rgba(255,255,255,0.25)]" : "ring-1 ring-white/20"
                }`}
                style={{ height: "120px" }}
              >
                {c.after_url
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={c.after_url} alt={t("afterAlt")} className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-white/5 flex items-center justify-center"><span className="material-symbols-outlined text-[14px] text-white/20">hide_image</span></div>}
              </div>
              <span className="text-[9px] font-label tracking-[0.22em] uppercase text-white/55">{t("after")}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

interface FaqItem { id: string; question: string; answer: string }

const PROCESS_KEYS = ["s1", "s2", "s3", "s4"] as const;
const PROCESS_ICONS: Record<typeof PROCESS_KEYS[number], string> = {
  s1: "search",
  s2: "draw",
  s3: "medical_services",
  s4: "verified",
};

const RECOVERY_KEYS = ["p1", "p2", "p3", "p4", "p5"] as const;
const RECOVERY_COLORS: Record<typeof RECOVERY_KEYS[number], string> = {
  p1: "#94a3b8",
  p2: "#a78bfa",
  p3: "#f59e0b",
  p4: "#34d399",
  p5: "#e9c176",
};

const INTL_SERVICE_KEYS = ["consult", "transfer", "hotel", "duration", "support", "remote"] as const;
const INTL_SERVICE_ICONS: Record<typeof INTL_SERVICE_KEYS[number], string> = {
  consult: "video_call",
  transfer: "flight_land",
  hotel: "hotel",
  duration: "calendar_month",
  support: "support_agent",
  remote: "photo_camera",
};

const FAQ_FALLBACK_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

export default function HomePage({ hero, cases = [], faqs = [] }: { hero?: HeroConfig | null; cases?: CaseStudy[]; faqs?: FaqItem[] }) {
  const t = useTranslations("pages.home");
  const tFaq = useTranslations("pages.home.faq");

  // Locale-aware fallback hero (used when Supabase doesn't return data)
  const fallbackHero: HeroConfig = {
    eyebrow: t("hero.fallbackEyebrow"),
    headline: t("hero.fallbackHeadline"),
    headline_italic: t("hero.fallbackHeadlineItalic"),
    body: t("hero.fallbackBody"),
    cta_label: t("hero.fallbackCta"),
    cta_href: "#iletisim",
    image_url: "https://v3b.fal.media/files/b/0a987092/CTaOqFjvs15BCGZ-aDKHm.jpg",
  };

  const h = hero ?? fallbackHero;
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("loading");

    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.ad,
          phone: data.telefon,
          source: "homepage",
          consent: true,
          ...getUTM(),
        }),
      });

      if (!res.ok) throw new Error();
      setFormState("success");
      form.reset();
    } catch {
      setFormState("error");
    }
  };

  // Build FAQ list: prefer Supabase data; if empty, fall back to translated defaults.
  const faqItems: { q: string; a: string; id: string }[] =
    faqs.length > 0
      ? faqs.map(f => ({ q: f.question, a: f.answer, id: f.id }))
      : FAQ_FALLBACK_KEYS.map(k => ({
          id: k,
          q: tFaq(`${k}.question`),
          a: tFaq(`${k}.answer`),
        }));

  return (
    <section>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-10"></div>
          {h.image_url && (
            <img
              className="w-full h-[120%] object-cover opacity-40 scale-110"
              alt={t("hero.imageAlt")}
              id="hero-parallax"
              src={h.image_url}
            />
          )}
        </div>
        <div className="relative z-20 text-center px-6 max-w-5xl">
          {h.eyebrow && (
            <span className="reveal block font-label text-primary tracking-[0.4em] uppercase text-sm mb-8">
              {h.eyebrow}
            </span>
          )}
          <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl text-on-surface mb-12 tracking-tighter leading-[0.9]" style={{ opacity: 0, transform: 'translateY(32px)' }} id="hero-headline">
            {h.headline}
            {h.headline_italic && <><br /><span className="italic">{h.headline_italic}</span></>}
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12 reveal" style={{ transitionDelay: '.3s' }}>
            {h.body && (
              <p className="max-w-xs text-on-surface/60 text-sm leading-relaxed text-left border-l border-primary/20 pl-6">
                {h.body}
              </p>
            )}
            {h.cta_label && (
              <button
                onClick={() => {
                  const href = h.cta_href ?? "#iletisim";
                  if (href.startsWith("#")) {
                    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = href;
                  }
                }}
                className="cta-premium group flex items-center gap-4 bg-primary text-on-primary px-10 py-5 rounded-sm font-label tracking-widest uppercase text-sm hover:pr-12 transition-all duration-700"
              >
                {h.cta_label}
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-12 left-12 hidden lg:block reveal" style={{ transitionDelay: '.5s' }}>
          <div className="flex flex-col gap-1 text-[10px] tracking-[0.3em] uppercase text-on-surface/60">
            <span>{t("hero.establishedLine")}</span>
            <span>+90 553 978 42 42</span>
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="py-6 border-y border-outline-variant/10 bg-surface-container-lowest reveal">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-headline text-primary">{t("surgeon.stats.operationsValue")}</span>
            <span className="text-[10px] uppercase tracking-widest text-on-surface/70 whitespace-pre-line">{t("trust.operations")}</span>
          </div>
          <div className="w-px h-8 bg-outline-variant/10 hidden md:block"></div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-headline text-primary">4.9/5</span>
            <span className="text-[10px] uppercase tracking-widest text-on-surface/70 whitespace-pre-line">{t("trust.rating")}</span>
          </div>
          <div className="w-px h-8 bg-outline-variant/10 hidden md:block"></div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-headline text-primary">42</span>
            <span className="text-[10px] uppercase tracking-widest text-on-surface/70 whitespace-pre-line">{t("trust.countries")}</span>
          </div>
          <div className="w-px h-8 bg-outline-variant/10 hidden md:block"></div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-headline text-primary">{t("surgeon.stats.experienceValue")}</span>
            <span className="text-[10px] uppercase tracking-widest text-on-surface/70 whitespace-pre-line">{t("trust.experience")}</span>
          </div>
          <div className="w-px h-8 bg-outline-variant/10 hidden md:block"></div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-headline text-primary tracking-tight">ISHRS</span>
            <span className="text-[10px] uppercase tracking-widest text-on-surface/70 whitespace-pre-line">{t("trust.ishrs")}</span>
          </div>
        </div>
      </section>

      {/* ═══ SÜREÇ ═══ */}
      <section className="py-32 px-6 md:px-12 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20 reveal">
            <div>
              <span className="text-primary font-label tracking-widest uppercase text-sm block mb-4">{t("process.eyebrow")}</span>
              <h2 className="font-headline text-4xl md:text-5xl">{t("process.title")} <span className="italic">{t("process.titleAccent")}</span></h2>
            </div>
            <p className="text-on-surface/60 max-w-sm text-sm leading-relaxed">{t("process.subtitle")}</p>
          </div>

          {/* Adımlar */}
          <div className="relative">
            {/* Bağlantı çizgisi — desktop */}
            <div className="hidden md:block absolute top-[2.6rem] left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-px" style={{ background: "linear-gradient(to right, transparent, rgba(233,193,118,0.25) 15%, rgba(233,193,118,0.25) 85%, transparent)" }} />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
              {PROCESS_KEYS.map((stepKey, i) => {
                const num = String(i + 1).padStart(2, "0");
                return (
                  <div key={stepKey} className="reveal flex flex-col gap-6" style={{ transitionDelay: `${i * 0.12}s` }}>
                    {/* Nokta + numara */}
                    <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                        style={{ background: "rgba(233,193,118,0.1)", border: "1px solid rgba(233,193,118,0.3)" }}>
                        <span className="material-symbols-outlined text-[18px]" style={{ color: "#e9c176" }}>{PROCESS_ICONS[stepKey]}</span>
                      </div>
                      <span className="font-headline text-5xl md:text-6xl" style={{ color: "rgba(233,193,118,0.12)", lineHeight: 1 }}>{num}</span>
                    </div>
                    <div>
                      <h3 className="font-headline text-xl mb-3 text-on-surface">{t(`process.steps.${stepKey}.title`)}</h3>
                      <p className="text-sm text-on-surface/60 leading-relaxed">{t(`process.steps.${stepKey}.desc`)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Alt CTA */}
          <div className="mt-20 text-center reveal" style={{ transitionDelay: '.5s' }}>
            <Link href="/sac-analizi"
              className="inline-flex items-center gap-3 border border-primary/25 text-primary px-8 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary/8 transition-all duration-500">
              {t("process.cta")}
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ EMPATHY ═══ */}
      <section className="py-32 px-6 md:px-12 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-12 reveal">
            <h2 className="font-headline text-4xl md:text-5xl text-on-surface leading-tight">
              <span className="text-primary italic">{t("empathy.titleAccent")}</span> {t("empathy.titleRest")}
            </h2>
            <div className="space-y-8 font-body text-lg text-on-surface/70 max-w-md">
              <p>{t("empathy.p1")}</p>
              <p className="text-on-surface">
                {t("empathy.p2Lead")}{" "}
                <span className="underline decoration-primary/30 underline-offset-8">{t("empathy.p2Underlined")}</span>
                {t("empathy.p2Trail")}
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] bg-surface-container overflow-hidden reveal" style={{ transitionDelay: '.2s' }}>
            <img
              className="w-full h-[115%] object-cover opacity-60 scale-105"
              alt={t("empathy.imageAlt")}
              id="problem-parallax"
              src="https://regrow.themerex.net/wp-content/uploads/2025/09/background-01-copyright.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <div className="p-8 border border-outline-variant/20 backdrop-blur-xl bg-background/40">
                <p className="text-sm italic font-headline">&quot;{t("empathy.quote")}&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TEKNİKLER ═══ */}
      <section className="py-32 bg-surface-container-low" id="teknikler">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 reveal">
            <div>
              <span className="text-primary font-label tracking-widest uppercase text-sm block mb-4">{t("techniques.eyebrow")}</span>
              <h2 className="font-headline text-4xl md:text-5xl">{t("techniques.title")} <span className="italic">{t("techniques.titleAccent")}</span></h2>
            </div>
            <p className="text-on-surface/70 max-w-sm text-sm leading-relaxed">{t("techniques.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-[2px] reveal" style={{ transitionDelay: '.1s' }}>
            {/* FUE */}
            <Link href="/sac-ekimi/fue" className="bg-surface-container p-10 group cursor-pointer transition-all duration-500 hover:bg-surface-container-high relative block">
              <div className="absolute bottom-0 left-10 right-10 h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <span className="text-[10px] font-label uppercase tracking-widest text-primary mb-6 block">{t("techniques.fue.badge")}</span>
              <h3 className="font-headline text-2xl mb-4">{t("techniques.fue.title")}</h3>
              <p className="text-sm text-on-surface/70 leading-relaxed mb-8">{t("techniques.fue.desc")}</p>
              <div className="flex gap-8 pt-6 border-t border-outline-variant/10">
                <div><span className="text-sm font-semibold text-on-surface block">{t("techniques.fue.duration")}</span><span className="text-[10px] text-on-surface/70 uppercase tracking-wider">{t("techniques.labels.duration")}</span></div>
                <div><span className="text-sm font-semibold text-on-surface block">{t("techniques.fue.recovery")}</span><span className="text-[10px] text-on-surface/70 uppercase tracking-wider">{t("techniques.labels.recovery")}</span></div>
                <div><span className="text-sm font-semibold text-on-surface block">{t("techniques.fue.result")}</span><span className="text-[10px] text-on-surface/70 uppercase tracking-wider">{t("techniques.labels.result")}</span></div>
              </div>
            </Link>
            {/* DHI */}
            <Link href="/sac-ekimi/dhi" className="bg-surface-container p-10 group cursor-pointer transition-all duration-500 hover:bg-surface-container-high relative block">
              <div className="absolute bottom-0 left-10 right-10 h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <span className="text-[10px] font-label uppercase tracking-widest text-primary mb-6 block">{t("techniques.dhi.badge")}</span>
              <h3 className="font-headline text-2xl mb-4">{t("techniques.dhi.title")}</h3>
              <p className="text-sm text-on-surface/70 leading-relaxed mb-8">{t("techniques.dhi.desc")}</p>
              <div className="flex gap-8 pt-6 border-t border-outline-variant/10">
                <div><span className="text-sm font-semibold text-on-surface block">{t("techniques.dhi.duration")}</span><span className="text-[10px] text-on-surface/70 uppercase tracking-wider">{t("techniques.labels.duration")}</span></div>
                <div><span className="text-sm font-semibold text-on-surface block">{t("techniques.dhi.recovery")}</span><span className="text-[10px] text-on-surface/70 uppercase tracking-wider">{t("techniques.labels.recovery")}</span></div>
                <div><span className="text-sm font-semibold text-on-surface block">{t("techniques.dhi.result")}</span><span className="text-[10px] text-on-surface/70 uppercase tracking-wider">{t("techniques.labels.result")}</span></div>
              </div>
            </Link>
            {/* Sapphire */}
            <Link href="/sac-ekimi/sapphire" className="bg-surface-container p-10 group cursor-pointer transition-all duration-500 hover:bg-surface-container-high relative block">
              <div className="absolute bottom-0 left-10 right-10 h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <span className="text-[10px] font-label uppercase tracking-widest text-primary mb-6 block">{t("techniques.sapphire.badge")}</span>
              <h3 className="font-headline text-2xl mb-4">{t("techniques.sapphire.title")}</h3>
              <p className="text-sm text-on-surface/70 leading-relaxed mb-8">{t("techniques.sapphire.desc")}</p>
              <div className="flex gap-8 pt-6 border-t border-outline-variant/10">
                <div><span className="text-sm font-semibold text-on-surface block">{t("techniques.sapphire.duration")}</span><span className="text-[10px] text-on-surface/70 uppercase tracking-wider">{t("techniques.labels.duration")}</span></div>
                <div><span className="text-sm font-semibold text-on-surface block">{t("techniques.sapphire.recovery")}</span><span className="text-[10px] text-on-surface/70 uppercase tracking-wider">{t("techniques.labels.recovery")}</span></div>
                <div><span className="text-sm font-semibold text-on-surface block">{t("techniques.sapphire.result")}</span><span className="text-[10px] text-on-surface/70 uppercase tracking-wider">{t("techniques.labels.result")}</span></div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ İYİLEŞME TAKVİMİ ═══ */}
      <section className="py-32 px-6 md:px-12 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 reveal">
            <span className="text-primary font-label tracking-widest uppercase text-sm block mb-4">{t("recovery.eyebrow")}</span>
            <h2 className="font-headline text-4xl md:text-5xl mb-4">{t("recovery.title")} <span className="italic">{t("recovery.titleAccent")}</span></h2>
            <p className="text-on-surface/60 text-sm leading-relaxed max-w-lg">{t("recovery.subtitle")}</p>
          </div>

          {/* Zaman çizelgesi */}
          <div className="relative reveal" style={{ transitionDelay: '.15s' }}>
            {/* Rail çizgisi */}
            <div className="absolute left-5 md:left-0 top-0 bottom-0 md:top-5 md:bottom-auto md:h-px md:w-full md:left-0"
              style={{ width: "1px", background: "linear-gradient(to bottom, rgba(233,193,118,0.3), rgba(233,193,118,0.05))" }}>
              <div className="md:hidden" />
            </div>
            <div className="hidden md:block absolute top-5 left-0 right-0 h-px"
              style={{ background: "linear-gradient(to right, rgba(233,193,118,0.3) 0%, rgba(233,193,118,0.08) 100%)" }} />

            <div className="flex flex-col md:flex-row md:gap-0 gap-0">
              {RECOVERY_KEYS.map((phaseKey, i) => {
                const color = RECOVERY_COLORS[phaseKey];
                return (
                  <div key={phaseKey}
                    className="relative flex flex-row md:flex-col gap-6 md:gap-0 pl-12 md:pl-0 pb-10 md:pb-0 flex-1"
                    style={{ transitionDelay: `${i * 0.1}s` }}>
                    {/* Nokta */}
                    <div className="absolute left-[14px] md:left-1/2 top-0 md:-translate-x-1/2 w-3 h-3 rounded-full z-10 flex-shrink-0"
                      style={{ background: color, boxShadow: `0 0 10px ${color}55`, border: "2px solid rgba(0,0,0,0.4)" }} />
                    {/* İçerik */}
                    <div className="md:pt-10 md:pr-6">
                      <span className="text-[9px] font-label tracking-[0.2em] uppercase px-2 py-0.5 rounded-full mb-3 inline-block"
                        style={{ background: `${color}18`, color: color, border: `1px solid ${color}40` }}>
                        {t(`recovery.phases.${phaseKey}.badge`)}
                      </span>
                      <p className="font-headline text-lg mb-2 text-on-surface">{t(`recovery.phases.${phaseKey}.period`)}</p>
                      <p className="text-sm text-on-surface/55 leading-relaxed">{t(`recovery.phases.${phaseKey}.desc`)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Uyarı notu */}
          <p className="text-[10px] uppercase tracking-wider text-on-surface/40 mt-14 text-center reveal" style={{ transitionDelay: '.6s' }}>
            {t("recovery.footnote")}
          </p>
        </div>
      </section>

      {/* ═══ SURGEON ═══ */}
      <section className="py-40 bg-surface-container-lowest" id="cerrah">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row-reverse gap-24">
          <div className="md:w-1/2 reveal">
            <div className="overflow-hidden">
              <img
                className="w-full object-cover aspect-[3/4] hover:scale-105 transition-transform duration-[2s] ease-out"
                alt={t("surgeon.imageAlt")}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmfJdU7ByTXF3R8ScqifgmuGUb39EelTz1uAyooddiNVoEj5oF4bTYDUCQID-FnjedHLb0wkTfmQUTz0XAhwycuvMIafGZCOG8rXyAkBLjFxnvgQr8hCgVLTJM_GeMDC0es3_QjPjLKIceD1Eur43uJB4Ce13IyPg_s51gtRnUGG8gjLDq1sjv5DSLgscCCJnyxbgyRe5UBf4ThEBU0uVWOX9nrhkeSuyOGDqYFKcxzroKI6SXomJ080snJ8J8yM-CGA_2TqT9VVI"
              />
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col justify-center space-y-16 reveal" style={{ transitionDelay: '.1s' }}>
            <div>
              <span className="text-primary font-label tracking-widest uppercase text-sm">{t("surgeon.eyebrow")}</span>
              <h2 className="font-headline text-5xl md:text-6xl mt-4">{t("surgeon.title1")}<br />{t("surgeon.title2")}</h2>
              <p className="text-on-surface/60 text-sm mt-4">{t("surgeon.subtitle")}</p>
            </div>
            <div className="grid grid-cols-2 gap-12 border-t border-outline-variant/10 pt-12">
              <div className="group cursor-default">
                <span className="block text-4xl font-headline text-primary mb-2 group-hover:translate-x-1 transition-transform duration-500">{t("surgeon.stats.experienceValue")}</span>
                <span className="text-sm uppercase tracking-widest text-on-surface/60">{t("surgeon.stats.experienceLabel")}</span>
              </div>
              <div className="group cursor-default">
                <span className="block text-4xl font-headline text-primary mb-2 group-hover:translate-x-1 transition-transform duration-500">{t("surgeon.stats.operationsValue")}</span>
                <span className="text-sm uppercase tracking-widest text-on-surface/60">{t("surgeon.stats.operationsLabel")}</span>
              </div>
              <div className="col-span-2">
                <p className="text-on-surface/60 leading-relaxed italic border-l border-primary/10 pl-6">
                  &quot;{t("surgeon.quote")}&quot;
                </p>
              </div>
            </div>
            <a className="w-fit border border-primary/20 text-on-surface px-8 py-4 hover:bg-primary hover:text-on-primary transition-all duration-700 uppercase tracking-widest text-sm font-label text-center cta-premium" href="tel:+905539784242">
              {t("surgeon.phoneCta")}
            </a>
          </div>
        </div>
      </section>

      {/* ═══ RESULTS CAROUSEL ═══ */}
      {cases.length > 0 && (
        <section className="py-32 overflow-hidden" id="sonuclar">
          <div className="px-6 md:px-12 mb-20 max-w-7xl mx-auto flex justify-between items-end reveal">
            <div className="max-w-xl">
              <span className="text-primary font-label tracking-widest uppercase text-sm block mb-4">{t("cases.eyebrow")}</span>
              <h2 className="font-headline text-5xl mb-6">{t("cases.title")} <span className="italic">{t("cases.titleAccent")}</span></h2>
              <p className="text-on-surface/70 text-sm leading-relaxed">{t("cases.subtitle")}</p>
              <p className="text-on-surface/70 text-[10px] uppercase tracking-wider mt-4">{t("cases.disclaimer")}</p>
            </div>
            <div className="hidden md:flex items-center gap-4 mb-2">
              <button
                aria-label={t("cases.navPrev")}
                onClick={() => carouselRef.current?.scrollBy({ left: -470, behavior: "smooth" })}
                className="material-symbols-outlined text-on-surface/70 cursor-pointer hover:text-primary transition-colors"
              >
                west
              </button>
              <button
                aria-label={t("cases.navNext")}
                onClick={() => carouselRef.current?.scrollBy({ left: 470,  behavior: "smooth" })}
                className="material-symbols-outlined text-primary cursor-pointer hover:scale-110 transition-transform"
              >
                east
              </button>
            </div>
          </div>
          <div ref={carouselRef} id="carousel" className="flex gap-6 overflow-x-auto hide-scrollbar px-6 md:px-12 pb-6 snap-x">
            {cases.map((c, i) => (
              <Link
                key={c.id}
                href="/oncesi-sonrasi"
                className="flex-shrink-0 w-[78vw] md:w-[360px] snap-center reveal block"
                style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
              >
                <HomeCaseCard c={c} />
              </Link>
            ))}
            {/* Tüm Vakalar son kart */}
            <Link href="/oncesi-sonrasi" className="flex-shrink-0 w-[160px] snap-center flex items-center justify-center group">
              <div className="text-center space-y-4">
                <div className="w-14 h-14 rounded-full border border-outline-variant/20 flex items-center justify-center mx-auto group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300">
                  <span className="material-symbols-outlined text-on-surface/40 group-hover:text-primary transition-colors">arrow_forward</span>
                </div>
                <p className="text-sm font-label uppercase tracking-widest text-on-surface/50 group-hover:text-primary transition-colors">{t("cases.viewAll")}</p>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ═══ ULUSLARARASI HASTALAR ═══ */}
      <section className="py-32 px-6 md:px-12" style={{ background: "#0a0908" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Sol — başlık + açıklama */}
            <div className="reveal space-y-8">
              <div>
                <span className="text-primary font-label tracking-widest uppercase text-sm block mb-4">{t("international.eyebrow")}</span>
                <h2 className="font-headline text-4xl md:text-5xl leading-tight">
                  {t("international.titleLine1")}<br /><span className="italic">{t("international.titleAccent")}</span><br />{t("international.titleLine2")}
                </h2>
              </div>
              <p className="text-on-surface/60 text-sm leading-relaxed max-w-sm">
                {t("international.body")}
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="text-[10px] font-label tracking-widest uppercase text-on-surface/40">{t("international.languageLabel")}</span>
                <div className="flex gap-2">
                  {["TR", "EN", "AR", "DE"].map(lang => (
                    <span key={lang} className="text-[10px] font-label tracking-widest px-2 py-0.5 rounded"
                      style={{ background: "rgba(233,193,118,0.08)", color: "rgba(233,193,118,0.7)", border: "1px solid rgba(233,193,118,0.15)" }}>
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              <Link href="/iletisim"
                className="inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary-container transition-all duration-500 cta-premium">
                {t("international.cta")}
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>

            {/* Sağ — hizmet kartları */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal" style={{ transitionDelay: '.15s' }}>
              {INTL_SERVICE_KEYS.map((serviceKey) => (
                <div key={serviceKey}
                  className="p-5 rounded-xl flex gap-4 items-start transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(78,70,57,0.2)" }}>
                  <span className="material-symbols-outlined text-[22px] flex-shrink-0 mt-0.5" style={{ color: "#e9c176" }}>{INTL_SERVICE_ICONS[serviceKey]}</span>
                  <div>
                    <p className="font-headline text-sm mb-1.5 text-on-surface">{t(`international.services.${serviceKey}.title`)}</p>
                    <p className="text-sm text-on-surface/55 leading-relaxed">{t(`international.services.${serviceKey}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL ═══ */}
      <section className="py-20 bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center reveal">
          <div className="flex justify-center gap-1 mb-8">
            <span className="text-primary text-sm">★</span><span className="text-primary text-sm">★</span><span className="text-primary text-sm">★</span><span className="text-primary text-sm">★</span><span className="text-primary text-sm">★</span>
          </div>
          <blockquote className="font-headline text-2xl md:text-3xl italic text-on-surface/80 leading-relaxed mb-8">
            &quot;{t("testimonial.quote")}&quot;
          </blockquote>
          <div className="text-[10px] uppercase tracking-[0.3em] text-on-surface/70">{t("testimonial.attribution")}</div>
        </div>
      </section>

      {/* ═══ SSS ═══ */}
      <section className="py-32 bg-surface" id="sss">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-20 items-start">
            <div className="reveal">
              <span className="text-primary font-label tracking-widest uppercase text-sm block mb-4">{t("faq.eyebrow")}</span>
              <h2 className="font-headline text-4xl md:text-5xl leading-tight">{t("faq.title")} <span className="italic">{t("faq.titleAccent")}</span></h2>
              <p className="text-on-surface/60 text-sm leading-relaxed mt-6">{t("faq.intro")}</p>
            </div>
            <div className="reveal" style={{ transitionDelay: '.1s' }}>
              {faqItems.map((item, i) => (
                <div
                  key={item.id}
                  className={`faq-item ${openFaq === i ? 'open' : ''} cursor-pointer ${i < faqItems.length - 1 ? 'border-b border-outline-variant/10 pb-6 mb-6' : 'pb-6'}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex justify-between items-center gap-4">
                    <h3 className="text-sm font-medium">{item.q}</h3>
                    <span className="faq-icon transition-transform duration-300 text-primary text-lg">+</span>
                  </div>
                  <div className="faq-answer text-sm text-on-surface/70 leading-relaxed">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA / CONTACT ═══ */}
      <section className="py-40 px-6 overflow-hidden" id="iletisim">
        <div className="max-w-5xl mx-auto rounded-sm bg-surface-container-high p-12 md:p-24 relative overflow-hidden reveal">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-l from-primary/30 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-2 text-primary font-label text-[10px] tracking-[0.3em] uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              {t("cta.eyebrow")}
            </span>
            <h2 className="font-headline text-4xl md:text-5xl mb-6 leading-tight">{t("cta.title")} <span className="italic">{t("cta.titleAccent")}</span></h2>
            <p className="text-on-surface/70 mb-12 leading-relaxed">{t("cta.body")}</p>
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input name="ad" required disabled={formState === "loading" || formState === "success"} className="flex-grow bg-transparent border-0 border-b border-outline-variant/30 focus:outline-none focus:ring-0 focus:border-primary transition-all px-0 py-4 font-body placeholder:text-on-surface/60 text-sm disabled:opacity-50" placeholder={t("cta.namePlaceholder")} type="text" />
                <input name="telefon" required disabled={formState === "loading" || formState === "success"} className="flex-grow bg-transparent border-0 border-b border-outline-variant/30 focus:outline-none focus:ring-0 focus:border-primary transition-all px-0 py-4 font-body placeholder:text-on-surface/60 text-sm disabled:opacity-50" placeholder={t("cta.phonePlaceholder")} type="tel" />
                <button type="submit" disabled={formState === "loading" || formState === "success"} className="cta-premium bg-primary text-on-primary px-12 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary-container transition-all whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed">
                  {formState === "loading" ? t("cta.submitting") : t("cta.submit")}
                </button>
              </div>
              <div className="flex gap-6 text-[11px] tracking-wider uppercase text-on-surface/80 mb-6">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px] text-primary/90">check_circle</span>{t("cta.trust.free")}</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px] text-primary/90">check_circle</span>{t("cta.trust.nonBinding")}</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px] text-primary/90">check_circle</span>{t("cta.trust.reply24")}</span>
              </div>
              <label className="flex items-start gap-3 mb-4 cursor-pointer">
                <input type="checkbox" required className="mt-0.5 rounded-sm border-outline-variant/40 text-primary focus:ring-primary/30 bg-transparent" />
                <span className="text-[11px] text-on-surface/75 leading-relaxed">
                  {t("cta.consentLead")}{' '}
                  <Link href="/kvkk-aydinlatma" className="text-primary/80 underline hover:text-primary">{t("cta.consentKvkk")}</Link>{' '}
                  {t("cta.consentAnd")}{' '}
                  <Link href="/gizlilik-politikasi" className="text-primary/80 underline hover:text-primary">{t("cta.consentPrivacy")}</Link>
                  {t("cta.consentTrail")}
                </span>
              </label>
              <p className="text-[11px] text-on-surface/60 leading-relaxed">{t("cta.footnote")}</p>

              {formState === "success" && (
                <div className="mt-4 flex items-center gap-3 text-success text-sm bg-success/10 border border-success/20 rounded-sm px-4 py-3">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  {t("cta.successMessage")}
                </div>
              )}
              {formState === "error" && (
                <div className="mt-4 flex items-center gap-3 text-error text-sm bg-error/10 border border-error/20 rounded-sm px-4 py-3">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  {t("cta.errorMessage")}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

    </section>
  );
}
