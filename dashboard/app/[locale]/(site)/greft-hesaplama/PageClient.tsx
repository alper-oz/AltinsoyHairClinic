"use client";

import { useState, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Area = "sac" | "sakal" | "kas" | null;
type Gender = "male" | "female";
type Step = 1 | 2 | 3 | 4;
type Density = "natural" | "medium" | "high";

const graftEstimates: Record<string, { min: number; max: number }> = {
  n2: { min: 1500, max: 2500 },
  n3: { min: 2500, max: 3500 },
  n4: { min: 3500, max: 4500 },
  n5: { min: 4500, max: 5500 },
  n6: { min: 5500, max: 7000 },
  n7: { min: 7000, max: 8000 },
  l1: { min: 1500, max: 2500 },
  l2: { min: 2500, max: 3500 },
  l3: { min: 3500, max: 4500 },
  sakal_cene: { min: 800, max: 1500 },
  sakal_yanak: { min: 400, max: 800 },
  sakal_full: { min: 1500, max: 2500 },
  sakal_biyik: { min: 300, max: 600 },
  kas_tam: { min: 300, max: 500 },
  kas_simetri: { min: 150, max: 300 },
};

const densityMultiplier: Record<Density, number> = { natural: 0.85, medium: 1.0, high: 1.2 };

export default function GreftHesaplamaPage() {
  const t = useTranslations("pages.graftCalc");
  const locale = useLocale();
  const numberLocale = locale === "tr" ? "tr-TR" : locale === "ar" ? "ar-EG" : "en-US";

  const [step, setStep] = useState<Step>(1);
  const [area, setArea] = useState<Area>(null);
  const [gender, setGender] = useState<Gender>("male");
  const [level, setLevel] = useState<string | null>(null);
  const [density, setDensity] = useState<Density | null>(null);
  const [result, setResult] = useState<{
    min: number;
    max: number;
    scale: string;
    summaryArea: string;
    summaryLevel: string;
    summaryDensity: string;
    packageName: string;
    packageDesc: string;
  } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const progressWidth = `${step * 25}%`;

  const goStep = (n: Step) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAreaSelect = (a: Area) => {
    setArea(a);
    setLevel(null);
  };

  const handleGenderChange = (g: Gender) => {
    setGender(g);
    setLevel(null);
  };

  const calculate = useCallback(() => {
    if (!level || !area || !density) return;
    const base = graftEstimates[level];
    if (!base) return;

    const mult = area === "sac" ? densityMultiplier[density] : 1;
    const min = Math.round((base.min * mult) / 100) * 100;
    const max = Math.round((base.max * mult) / 100) * 100;

    let packageName: string;
    let packageDesc: string;
    if (max <= 3500) {
      packageName = t("labels.packages.standardName");
      packageDesc = t("labels.packages.standardDesc");
    } else if (max <= 5000) {
      packageName = t("labels.packages.premiumName");
      packageDesc = t("labels.packages.premiumDesc");
    } else {
      packageName = t("labels.packages.internationalName");
      packageDesc = t("labels.packages.internationalDesc");
    }

    const fullScale = t(`labels.estimates.${level}`);
    // Level summary = first segment before " — " (or whole string)
    const summaryLevel = fullScale.split(" — ")[0];

    setResult({
      min,
      max,
      scale: fullScale,
      summaryArea: t(`labels.areas.${area}`),
      summaryLevel,
      summaryDensity: area === "sac" ? t(`labels.density.${density}`) : t("labels.density.regional"),
      packageName,
      packageDesc,
    });
    goStep(4);
  }, [level, area, density, t]);

  const resetCalc = () => {
    setArea(null);
    setLevel(null);
    setDensity(null);
    setResult(null);
    setStep(1);
  };

  const norwoodKeys = ["n2", "n3", "n4", "n5", "n6", "n7"] as const;
  const norwoodSvgs: Record<(typeof norwoodKeys)[number], React.ReactNode> = {
    n2: <><ellipse cx="50" cy="55" rx="28" ry="22" stroke="currentColor" strokeWidth="1" className="text-on-surface/30"/><path d="M22 45 Q50 32 78 45" stroke="currentColor" strokeWidth="1.5" className="text-primary/70" fill="none"/><path d="M28 42 L32 38 M68 42 L72 38" stroke="currentColor" strokeWidth="1" className="text-primary/40"/></>,
    n3: <><ellipse cx="50" cy="55" rx="28" ry="22" stroke="currentColor" strokeWidth="1" className="text-on-surface/30"/><path d="M22 48 Q30 42 40 44 L40 36 Q50 32 60 36 L60 44 Q70 42 78 48" stroke="currentColor" strokeWidth="1.5" className="text-primary/70" fill="none"/></>,
    n4: <><ellipse cx="50" cy="55" rx="28" ry="22" stroke="currentColor" strokeWidth="1" className="text-on-surface/30"/><path d="M22 48 L40 46 L40 34 Q50 30 60 34 L60 46 L78 48" stroke="currentColor" strokeWidth="1.5" className="text-primary/70" fill="none"/><ellipse cx="50" cy="50" rx="10" ry="5" fill="currentColor" className="text-on-surface/20"/></>,
    n5: <><ellipse cx="50" cy="55" rx="28" ry="22" stroke="currentColor" strokeWidth="1" className="text-on-surface/30"/><path d="M22 50 L40 48 L42 40 Q50 38 58 40 L60 48 L78 50" stroke="currentColor" strokeWidth="1.5" className="text-primary/70" fill="none"/><ellipse cx="50" cy="48" rx="16" ry="7" fill="currentColor" className="text-on-surface/25"/></>,
    n6: <><ellipse cx="50" cy="55" rx="28" ry="22" stroke="currentColor" strokeWidth="1" className="text-on-surface/30"/><path d="M22 52 Q28 50 32 50 M68 50 Q72 50 78 52" stroke="currentColor" strokeWidth="1.5" className="text-primary/70" fill="none"/><ellipse cx="50" cy="46" rx="22" ry="10" fill="currentColor" className="text-on-surface/30"/></>,
    n7: <><ellipse cx="50" cy="55" rx="28" ry="22" stroke="currentColor" strokeWidth="1" className="text-on-surface/30"/><path d="M25 58 Q28 56 30 56 M70 56 Q72 56 75 58" stroke="currentColor" strokeWidth="1.5" className="text-primary/70" fill="none"/><ellipse cx="50" cy="48" rx="25" ry="12" fill="currentColor" className="text-on-surface/35"/></>,
  };
  const norwoodItems = norwoodKeys.map((key) => ({
    key,
    label: t(`step2.norwood.${key}.label`),
    title: t(`step2.norwood.${key}.title`),
    sub: t(`step2.norwood.${key}.sub`),
    svgPath: norwoodSvgs[key],
  }));

  const ludwigKeys = ["l1", "l2", "l3"] as const;
  const ludwigItems = ludwigKeys.map((key) => ({
    key,
    label: t(`step2.ludwig.${key}.label`),
    title: t(`step2.ludwig.${key}.title`),
    sub: t(`step2.ludwig.${key}.sub`),
  }));

  const sakalKeys = ["sakal_cene", "sakal_yanak", "sakal_biyik", "sakal_full"] as const;
  const sakalIcons: Record<(typeof sakalKeys)[number], string> = {
    sakal_cene: "face_6",
    sakal_yanak: "face_3",
    sakal_biyik: "face_retouching_natural",
    sakal_full: "face",
  };
  const sakalOptions = sakalKeys.map((key) => ({
    key,
    icon: sakalIcons[key],
    title: t(`step2.sakal.${key}.title`),
    sub: t(`step2.sakal.${key}.sub`),
  }));

  const kasKeys = ["kas_tam", "kas_simetri"] as const;
  const kasIcons: Record<(typeof kasKeys)[number], string> = {
    kas_tam: "visibility",
    kas_simetri: "architecture",
  };
  const kasOptions = kasKeys.map((key) => ({
    key,
    icon: kasIcons[key],
    title: t(`step2.kas.${key}.title`),
    sub: t(`step2.kas.${key}.sub`),
  }));

  const densityOptions = [
    { key: "natural" as Density, icon: "grain", title: t("step3.options.natural.title"), sub: t("step3.options.natural.sub"), desc: t("step3.options.natural.desc") },
    { key: "medium" as Density, icon: "density_medium", title: t("step3.options.medium.title"), sub: t("step3.options.medium.sub"), desc: t("step3.options.medium.desc") },
    { key: "high" as Density, icon: "density_small", title: t("step3.options.high.title"), sub: t("step3.options.high.sub"), desc: t("step3.options.high.desc") },
  ];

  const faqItems = ["q1", "q2", "q3"].map((k) => ({
    q: t(`faq.items.${k}.q`),
    a: t(`faq.items.${k}.a`),
  }));

  const norwoodTableKeys = ["n2", "n3", "n4", "n5", "n6", "n7"];

  return (
    <section className="pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* HERO */}
        <div className="mb-12">
          <nav className="text-sm text-on-surface-variant mb-6 tracking-wider">
            <Link href="/" className="hover:text-primary transition-colors">{t("breadcrumb.home")}</Link>
            <span className="mx-2">›</span>
            <Link href="/sac-ekimi" className="hover:text-primary transition-colors">{t("breadcrumb.hairTransplant")}</Link>
            <span className="mx-2">›</span>
            <span className="text-on-surface">{t("breadcrumb.graftCalc")}</span>
          </nav>
          <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("hero.eyebrow")}</span>
          <h1 className="font-headline text-4xl md:text-6xl leading-tight mb-6">
            {t("hero.titlePart1")} <span className="italic text-primary/80">{t("hero.titleAccent")}</span>
          </h1>
          <p className="text-on-surface/70 text-lg leading-relaxed max-w-2xl">{t("hero.subtitle")}</p>
        </div>

        {/* PROGRESS */}
        <div className="flex items-center gap-3 mb-10">
          <div className="flex-1 h-1 rounded-full bg-surface-container-high overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: progressWidth }} />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-on-surface/60 w-24 text-right">{t("progress", { step })}</span>
        </div>

        {/* CALCULATOR */}
        <div className="bg-surface-container-low rounded-sm p-8 md:p-12 relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -mr-40 -mt-40" />
          <div className="relative z-10">

            {/* STEP 1: ALAN */}
            {step === 1 && (
              <div>
                <h2 className="font-headline text-2xl md:text-3xl mb-3">{t("step1.title")}</h2>
                <p className="text-on-surface-variant text-sm mb-10 opacity-70">{t("step1.subtitle")}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    { key: "sac", icon: "face", title: t("step1.options.sac.title"), sub: t("step1.options.sac.sub") },
                    { key: "sakal", icon: "face_6", title: t("step1.options.sakal.title"), sub: t("step1.options.sakal.sub") },
                    { key: "kas", icon: "visibility", title: t("step1.options.kas.title"), sub: t("step1.options.kas.sub") },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className={`cursor-pointer border rounded-sm p-7 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-0.5 ${
                        area === item.key ? "border-primary/60 bg-primary/5" : "border-outline-variant/20 hover:border-primary/40"
                      }`}
                      onClick={() => handleAreaSelect(item.key as Area)}
                    >
                      <span className={`material-symbols-outlined text-4xl mb-4 ${area === item.key ? "text-primary/90" : "text-primary/40"}`}>{item.icon}</span>
                      <h3 className="font-headline text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-on-surface/60">{item.sub}</p>
                      <span className={`material-symbols-outlined text-primary text-sm mt-3 ${area === item.key ? "opacity-100" : "opacity-0"}`}>check_circle</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-10 pt-6 border-t border-outline-variant/10">
                  <button
                    disabled={!area}
                    onClick={() => goStep(2)}
                    className="px-10 py-3.5 text-sm font-bold tracking-widest uppercase rounded-sm text-on-primary transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                    style={{ background: area ? "linear-gradient(135deg,#e9c176,#c5a059)" : "rgba(233,193,118,0.2)" }}
                  >
                    {t("step1.next")}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SEVİYE */}
            {step === 2 && (
              <div>
                {area === "sac" && (
                  <div>
                    <h2 className="font-headline text-2xl md:text-3xl mb-3">{t("step2.hair.title")}</h2>
                    <p className="text-on-surface-variant text-sm mb-3 opacity-70">
                      {t("step2.hair.subtitlePrefix")}{" "}
                      <span>{gender === "male" ? t("step2.hair.scaleMale") : t("step2.hair.scaleFemale")}</span> {t("step2.hair.scaleSuffix")}
                    </p>
                    {/* Cinsiyet */}
                    <div className="flex gap-2 mb-8">
                      <button
                        onClick={() => handleGenderChange("male")}
                        className={`border px-5 py-2 rounded-sm text-sm uppercase tracking-widest transition-all ${
                          gender === "male" ? "bg-primary/5 border-primary/40 text-primary" : "border-outline-variant/20 text-on-surface/60 hover:border-primary/40"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px] align-middle mr-1">male</span>{t("step2.hair.male")}
                      </button>
                      <button
                        onClick={() => handleGenderChange("female")}
                        className={`border px-5 py-2 rounded-sm text-sm uppercase tracking-widest transition-all ${
                          gender === "female" ? "bg-primary/5 border-primary/40 text-primary" : "border-outline-variant/20 text-on-surface/60 hover:border-primary/40"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px] align-middle mr-1">female</span>{t("step2.hair.female")}
                      </button>
                    </div>

                    {gender === "male" && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {norwoodItems.map((item) => (
                          <div
                            key={item.key}
                            className={`cursor-pointer border rounded-sm p-5 text-center transition-all duration-300 hover:-translate-y-0.5 ${
                              level === item.key ? "border-primary/60 bg-primary/5" : "border-outline-variant/20 hover:border-primary/40"
                            }`}
                            onClick={() => setLevel(item.key)}
                          >
                            <svg className="w-full h-24 mb-3" viewBox="0 0 100 80" fill="none">
                              {item.svgPath}
                            </svg>
                            <p className="text-[10px] uppercase tracking-widest text-primary/70 mb-1">{item.label}</p>
                            <p className="font-headline text-sm">{item.title}</p>
                            <p className="text-[10px] text-on-surface/50 mt-1">{item.sub}</p>
                            <span className={`material-symbols-outlined text-primary text-[14px] mt-2 ${level === item.key ? "opacity-100" : "opacity-0"}`}>check_circle</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {gender === "female" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {ludwigItems.map((item) => (
                          <div
                            key={item.key}
                            className={`cursor-pointer border rounded-sm p-5 text-center transition-all duration-300 hover:-translate-y-0.5 ${
                              level === item.key ? "border-primary/60 bg-primary/5" : "border-outline-variant/20 hover:border-primary/40"
                            }`}
                            onClick={() => setLevel(item.key)}
                          >
                            <svg className="w-full h-24 mb-3" viewBox="0 0 100 80" fill="none">
                              <ellipse cx="50" cy="55" rx="28" ry="22" stroke="currentColor" strokeWidth="1" className="text-on-surface/30"/>
                              <path d="M32 40 Q50 35 68 40" stroke="currentColor" strokeWidth="1.5" className="text-primary/70" fill="none"/>
                            </svg>
                            <p className="text-[10px] uppercase tracking-widest text-primary/70 mb-1">{item.label}</p>
                            <p className="font-headline text-sm">{item.title}</p>
                            <p className="text-[10px] text-on-surface/50 mt-1">{item.sub}</p>
                            <span className={`material-symbols-outlined text-primary text-[14px] mt-2 ${level === item.key ? "opacity-100" : "opacity-0"}`}>check_circle</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {area === "sakal" && (
                  <div>
                    <h2 className="font-headline text-2xl md:text-3xl mb-3">{t("step2.beard.title")}</h2>
                    <p className="text-on-surface-variant text-sm mb-10 opacity-70">{t("step2.beard.subtitle")}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {sakalOptions.map((item) => (
                        <div
                          key={item.key}
                          className={`cursor-pointer border rounded-sm p-6 transition-all duration-300 hover:-translate-y-0.5 ${
                            level === item.key ? "border-primary/60 bg-primary/5" : "border-outline-variant/20 hover:border-primary/40"
                          }`}
                          onClick={() => setLevel(item.key)}
                        >
                          <span className={`material-symbols-outlined text-2xl mb-3 block ${level === item.key ? "text-primary/90" : "text-primary/40"}`}>{item.icon}</span>
                          <h3 className="font-headline text-lg mb-1">{item.title}</h3>
                          <p className="text-sm text-on-surface/60">{item.sub}</p>
                          <span className={`material-symbols-outlined text-primary text-sm mt-3 ${level === item.key ? "opacity-100" : "opacity-0"}`}>check_circle</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {area === "kas" && (
                  <div>
                    <h2 className="font-headline text-2xl md:text-3xl mb-3">{t("step2.brow.title")}</h2>
                    <p className="text-on-surface-variant text-sm mb-10 opacity-70">{t("step2.brow.subtitle")}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {kasOptions.map((item) => (
                        <div
                          key={item.key}
                          className={`cursor-pointer border rounded-sm p-6 transition-all duration-300 hover:-translate-y-0.5 ${
                            level === item.key ? "border-primary/60 bg-primary/5" : "border-outline-variant/20 hover:border-primary/40"
                          }`}
                          onClick={() => setLevel(item.key)}
                        >
                          <span className={`material-symbols-outlined text-2xl mb-3 block ${level === item.key ? "text-primary/90" : "text-primary/40"}`}>{item.icon}</span>
                          <h3 className="font-headline text-lg mb-1">{item.title}</h3>
                          <p className="text-sm text-on-surface/60">{item.sub}</p>
                          <span className={`material-symbols-outlined text-primary text-sm mt-3 ${level === item.key ? "opacity-100" : "opacity-0"}`}>check_circle</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center mt-10 pt-6 border-t border-outline-variant/10">
                  <button onClick={() => goStep(1)} className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">arrow_back</span> {t("step2.back")}
                  </button>
                  <button
                    disabled={!level}
                    onClick={() => goStep(3)}
                    className="px-10 py-3.5 text-sm font-bold tracking-widest uppercase rounded-sm text-on-primary transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                    style={{ background: level ? "linear-gradient(135deg,#e9c176,#c5a059)" : "rgba(233,193,118,0.2)" }}
                  >
                    {t("step2.next")}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: YOĞUNLUK */}
            {step === 3 && (
              <div>
                <h2 className="font-headline text-2xl md:text-3xl mb-3">{t("step3.title")}</h2>
                <p className="text-on-surface-variant text-sm mb-10 opacity-70">{t("step3.subtitle")}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {densityOptions.map((item) => (
                    <div
                      key={item.key}
                      className={`cursor-pointer border rounded-sm p-6 transition-all duration-300 hover:-translate-y-0.5 ${
                        density === item.key ? "border-primary/60 bg-primary/5" : "border-outline-variant/20 hover:border-primary/40"
                      }`}
                      onClick={() => setDensity(item.key)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className={`material-symbols-outlined text-2xl ${density === item.key ? "text-primary/90" : "text-primary/40"}`}>{item.icon}</span>
                        <span className={`material-symbols-outlined text-primary text-sm ${density === item.key ? "opacity-100" : "opacity-0"}`}>check_circle</span>
                      </div>
                      <h3 className="font-headline text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-on-surface/60 mb-3">{item.sub}</p>
                      <p className="text-[11px] text-on-surface/70 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-10 pt-6 border-t border-outline-variant/10">
                  <button onClick={() => goStep(2)} className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">arrow_back</span> {t("step3.back")}
                  </button>
                  <button
                    disabled={!density}
                    onClick={calculate}
                    className="px-10 py-3.5 text-sm font-bold tracking-widest uppercase rounded-sm text-on-primary transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                    style={{ background: density ? "linear-gradient(135deg,#e9c176,#c5a059)" : "rgba(233,193,118,0.2)" }}
                  >
                    {t("step3.calculate")}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: SONUÇ */}
            {step === 4 && result && (
              <div>
                <div className="text-center mb-10">
                  <span className="material-symbols-outlined text-primary text-3xl mb-3">calculate</span>
                  <h2 className="font-headline text-2xl md:text-3xl mb-3">{t("step4.title")}</h2>
                  <p className="text-on-surface-variant text-sm opacity-70 max-w-md mx-auto">{t("step4.subtitle")}</p>
                </div>

                <div className="bg-surface-container-high border border-primary/20 rounded-sm p-8 md:p-10 mb-6 text-center">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-primary/70 mb-4">{t("step4.rangeLabel")}</p>
                  <div className="font-headline text-5xl md:text-7xl text-primary mb-4" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {result.min.toLocaleString(numberLocale)}{" "}
                    <span className="text-primary/50">–</span>{" "}
                    {result.max.toLocaleString(numberLocale)}
                  </div>
                  <p className="text-sm text-on-surface/60 mb-6">{t("step4.unit")}</p>
                  <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-on-surface/50">
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    <span>{result.scale}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {[
                    { label: t("step4.summary.area"), value: result.summaryArea },
                    { label: t("step4.summary.level"), value: result.summaryLevel },
                    { label: t("step4.summary.density"), value: result.summaryDensity },
                  ].map((item) => (
                    <div key={item.label} className="bg-surface-container-low p-4 rounded-sm">
                      <p className="text-[10px] uppercase tracking-widest text-on-surface/50 mb-1">{item.label}</p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-primary/5 border-l-2 border-primary rounded-sm p-6 mb-8">
                  <p className="text-[11px] uppercase tracking-widest text-primary mb-2">{t("step4.packageLabel")}</p>
                  <p className="font-headline text-xl mb-2">{result.packageName}</p>
                  <p className="text-sm text-on-surface/70 leading-relaxed">{result.packageDesc}</p>
                </div>

                <div className="bg-surface-container-low border border-outline-variant/10 rounded-sm p-5 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-on-surface/50 text-[18px] mt-0.5 flex-shrink-0">info</span>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-on-surface/60 mb-2">{t("step4.noteTitle")}</p>
                      <p
                        className="text-[12px] text-on-surface/60 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: t.raw("step4.noteText") as string }}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/sac-analizi"
                      className="text-on-primary px-10 py-4 text-sm font-bold tracking-widest uppercase rounded-sm inline-block"
                      style={{ background: "linear-gradient(135deg,#e9c176,#c5a059)" }}
                    >
                      {t("step4.ctaConsult")}
                    </Link>
                    <Link href="/fiyat-hesaplama" className="border border-primary/40 text-primary px-10 py-4 text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-primary/10 transition-all">
                      {t("step4.ctaPriceCalc")}
                    </Link>
                    <a
                      href="https://wa.me/905539784242?text=Merhaba%2C%20greft%20hesaplamas%C4%B1%20yapt%C4%B1m%20konsultasyon%20istiyorum."
                      className="border border-outline-variant/30 text-on-surface/80 px-10 py-4 text-sm font-bold tracking-widest uppercase rounded-sm hover:border-primary/40 hover:text-primary transition-all"
                    >
                      {t("step4.ctaWhatsapp")}
                    </a>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button onClick={resetCalc} className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">refresh</span> {t("step4.recalc")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BİLGİ */}
        <section className="mt-16 max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-10">{t("info.title")}</h2>
          <div className="space-y-8 text-on-surface/80 leading-relaxed">
            <div>
              <h3 className="font-headline text-xl mb-3 text-primary/90">{t("info.howManyTitle")}</h3>
              <p
                className="text-sm mb-4"
                dangerouslySetInnerHTML={{ __html: t.raw("info.howManyText") as string }}
              />
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[500px]">
                  <thead>
                    <tr className="border-b border-outline-variant/20 text-left">
                      <th className="py-3 pr-4 text-primary font-label uppercase tracking-wider text-sm">{t("info.table.levelCol")}</th>
                      <th className="py-3 pr-4 text-primary font-label uppercase tracking-wider text-sm">{t("info.table.areaCol")}</th>
                      <th className="py-3 text-primary font-label uppercase tracking-wider text-sm">{t("info.table.graftCol")}</th>
                    </tr>
                  </thead>
                  <tbody className="text-on-surface/75">
                    {norwoodTableKeys.map((key, i) => (
                      <tr key={key} className={i < norwoodTableKeys.length - 1 ? "border-b border-outline-variant/10" : ""}>
                        <td className="py-3 pr-4">{t(`info.table.rows.${key}.level`)}</td>
                        <td className="py-3 pr-4">{t(`info.table.rows.${key}.area`)}</td>
                        <td className="py-3">{t(`info.table.rows.${key}.graft`)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[10px] text-on-surface/40 mt-2">{t("info.table.footnote")}</p>
              </div>
            </div>

            {faqItems.map((item, i) => (
              <div
                key={i}
                className={`cursor-pointer ${i < faqItems.length - 1 ? "border-b border-outline-variant/10 pb-6" : "pb-6"}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-sm font-medium">{item.q}</h3>
                  <span className="transition-transform duration-300 text-primary text-lg" style={{ transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                </div>
                <div
                  className="text-sm text-on-surface/75 leading-relaxed overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openFaq === i ? "300px" : "0", paddingTop: openFaq === i ? "16px" : "0" }}
                >
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="max-w-2xl mx-auto mt-16 text-center">
          <p className="text-[11px] text-on-surface/50 leading-relaxed">{t("disclaimer")}</p>
        </div>

      </div>
    </section>
  );
}
