"use client";

import { useState, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const pricing = {
  techMultiplier: { fue: 1.0, sapphire: 1.1, dhi: 1.2 } as Record<string, number>,
  packages: {
    standart: { base_min: 2500, base_max: 3000 },
    premium:  { base_min: 3500, base_max: 4000 },
    uluslararasi: { base_min: 4500, base_max: 4800 },
  } as Record<string, { base_min: number; base_max: number }>,
  graftMultiplier: { small: 0.9, medium: 1.0, large: 1.1, xlarge: 1.15 } as Record<string, number>,
};

const pkgCap: Record<string, number> = { standart: 3500, premium: 4500, uluslararasi: 5000 };

type Step = 1 | 2 | 3 | 4;

export default function FiyatHesaplamaPage() {
  const t = useTranslations("pages.priceCalc");
  const locale = useLocale();
  const numberLocale = locale === "tr" ? "tr-TR" : locale === "ar" ? "ar-EG" : "en-US";

  const [step, setStep] = useState<Step>(1);
  const [tech, setTech] = useState<string | null>(null);
  const [graft, setGraft] = useState<string | null>(null);
  const [pkg, setPkg] = useState<string | null>(null);
  const [result, setResult] = useState<{
    min: number;
    max: number;
    summaryTech: string;
    summaryGraft: string;
    summaryPackage: string;
    includes: string[];
  } | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const progressWidth = `${step * 25}%`;

  const calculate = useCallback(() => {
    if (!tech || !graft || !pkg) return;
    const pkgData = pricing.packages[pkg];
    const techMult = pricing.techMultiplier[tech];
    const graftMult = pricing.graftMultiplier[graft];

    let min = Math.round((pkgData.base_min * techMult * graftMult) / 50) * 50;
    let max = Math.round((pkgData.base_max * techMult * graftMult) / 50) * 50;

    const cap = pkgCap[pkg];
    if (max > cap) max = cap;
    if (min > max) min = Math.max(max - 500, cap - 1000);

    const includesKeys = pkg === "standart"
      ? ["i1", "i2", "i3", "i4", "i5", "i6", "i7"]
      : ["i1", "i2", "i3", "i4", "i5", "i6"];
    const includes = includesKeys.map((k) => t(`packages.${pkg}.items.${k}`));

    setResult({
      min,
      max,
      summaryTech: t(`techNames.${tech}`),
      summaryGraft: t(`graftNames.${graft}`),
      summaryPackage: t(`packageNames.${pkg}`),
      includes,
    });
    setStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tech, graft, pkg, t]);

  const resetCalc = () => {
    setTech(null);
    setGraft(null);
    setPkg(null);
    setResult(null);
    setStep(1);
  };

  const goStep = (n: Step) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const techOptions = [
    {
      key: "fue",
      icon: "grain",
      title: t("step1.options.fue.title"),
      sub: t("step1.options.fue.sub"),
      desc: t("step1.options.fue.desc"),
    },
    {
      key: "sapphire",
      icon: "diamond",
      title: t("step1.options.sapphire.title"),
      sub: t("step1.options.sapphire.sub"),
      desc: t("step1.options.sapphire.desc"),
    },
    {
      key: "dhi",
      icon: "edit",
      title: t("step1.options.dhi.title"),
      sub: t("step1.options.dhi.sub"),
      desc: t("step1.options.dhi.desc"),
    },
  ];

  const graftOptions = [
    { key: "small", icon: "blur_on", title: t("step2.options.small.title"), sub: t("step2.options.small.sub") },
    { key: "medium", icon: "density_medium", title: t("step2.options.medium.title"), sub: t("step2.options.medium.sub") },
    { key: "large", icon: "density_small", title: t("step2.options.large.title"), sub: t("step2.options.large.sub") },
    { key: "xlarge", icon: "grain", title: t("step2.options.xlarge.title"), sub: t("step2.options.xlarge.sub") },
  ];

  const pkgOptions = [
    {
      key: "standart",
      icon: "workspace_premium",
      title: t("step3.options.standart.title"),
      desc: t("step3.options.standart.desc"),
      tags: [t("step3.options.standart.tag1"), t("step3.options.standart.tag2")],
      featured: false,
    },
    {
      key: "premium",
      icon: "stars",
      title: t("step3.options.premium.title"),
      desc: t("step3.options.premium.desc"),
      tags: [t("step3.options.premium.tag1"), t("step3.options.premium.tag2")],
      featured: true,
    },
    {
      key: "uluslararasi",
      icon: "flight",
      title: t("step3.options.uluslararasi.title"),
      desc: t("step3.options.uluslararasi.desc"),
      tags: [t("step3.options.uluslararasi.tag1"), t("step3.options.uluslararasi.tag2")],
      featured: false,
    },
  ];

  const faqItems = ["q1", "q2", "q3"].map((k) => ({
    q: t(`faq.items.${k}.q`),
    a: t(`faq.items.${k}.a`),
  }));

  const tableRows = [
    { tech: t("info.table.rows.fue.tech"), level: t("info.table.rows.fue.level"), reason: t("info.table.rows.fue.reason") },
    { tech: t("info.table.rows.sapphire.tech"), level: t("info.table.rows.sapphire.level"), reason: t("info.table.rows.sapphire.reason") },
    { tech: t("info.table.rows.dhi.tech"), level: t("info.table.rows.dhi.level"), reason: t("info.table.rows.dhi.reason") },
  ];

  return (
    <section className="pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* HERO */}
        <div className="mb-12">
          <nav className="text-sm text-on-surface-variant mb-6 tracking-wider">
            <Link href="/" className="hover:text-primary transition-colors">{t("breadcrumb.home")}</Link>
            <span className="mx-2">›</span>
            <Link href="/fiyat" className="hover:text-primary transition-colors">{t("breadcrumb.pricing")}</Link>
            <span className="mx-2">›</span>
            <span className="text-on-surface">{t("breadcrumb.calc")}</span>
          </nav>
          <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("hero.eyebrow")}</span>
          <h1 className="font-headline text-4xl md:text-6xl leading-tight mb-6">
            {t("hero.titlePart1")} <span className="italic text-primary/80">{t("hero.titleAccent")}</span>
          </h1>
          <p
            className="text-on-surface/70 text-lg leading-relaxed max-w-2xl"
            dangerouslySetInnerHTML={{ __html: t.raw("hero.subtitle") as string }}
          />
          <div className="mt-8 bg-surface-container-low border-l-2 border-primary/50 rounded-sm p-4 flex items-start gap-3">
            <span className="material-symbols-outlined text-primary/70 text-[18px] mt-0.5">tips_and_updates</span>
            <p className="text-sm text-on-surface/70">
              {t("hero.tipPrefix")}{" "}
              <Link href="/greft-hesaplama" className="text-primary underline hover:no-underline">
                {t("hero.tipLink")}
              </Link>{" "}
              {t("hero.tipSuffix")}
            </p>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="flex items-center gap-3 mb-10">
          <div className="flex-1 h-1 rounded-full bg-surface-container-high overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: progressWidth }}
            />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-on-surface/60 w-24 text-right">
            {t("progress", { step })}
          </span>
        </div>

        {/* CALCULATOR */}
        <div className="bg-surface-container-low rounded-sm p-8 md:p-12 relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -mr-40 -mt-40" />
          <div className="relative z-10">

            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <h2 className="font-headline text-2xl md:text-3xl mb-3">{t("step1.title")}</h2>
                <p className="text-on-surface-variant text-sm mb-10 opacity-70">
                  {t("step1.subtitlePrefix")}{" "}
                  <Link href="/fue-vs-dhi" className="text-primary underline">
                    {t("step1.subtitleLink")}
                  </Link>{" "}
                  {t("step1.subtitleSuffix")}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {techOptions.map((item) => (
                    <div
                      key={item.key}
                      className={`cursor-pointer border rounded-sm p-6 transition-all duration-300 hover:-translate-y-0.5 ${
                        tech === item.key
                          ? "border-primary/60 bg-primary/5"
                          : "border-outline-variant/20 hover:border-primary/40"
                      }`}
                      onClick={() => setTech(item.key)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className={`material-symbols-outlined text-2xl ${tech === item.key ? "text-primary/90" : "text-primary/40"}`}>
                          {item.icon}
                        </span>
                        <span className={`material-symbols-outlined text-primary text-sm ${tech === item.key ? "opacity-100" : "opacity-0"}`}>
                          check_circle
                        </span>
                      </div>
                      <h3 className="font-headline text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-on-surface/60 mb-3">{item.sub}</p>
                      <p className="text-[11px] text-on-surface/70 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-10 pt-6 border-t border-outline-variant/10">
                  <button
                    disabled={!tech}
                    onClick={() => goStep(2)}
                    className="px-10 py-3.5 text-sm font-bold tracking-widest uppercase rounded-sm text-on-primary transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                    style={{ background: tech ? "linear-gradient(135deg,#e9c176,#c5a059)" : "rgba(233,193,118,0.2)" }}
                  >
                    {t("step1.next")}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <h2 className="font-headline text-2xl md:text-3xl mb-3">{t("step2.title")}</h2>
                <p className="text-on-surface-variant text-sm mb-10 opacity-70">
                  {t("step2.subtitlePrefix")}{" "}
                  <Link href="/greft-hesaplama" className="text-primary underline">
                    {t("step2.subtitleLink")}
                  </Link>{" "}
                  {t("step2.subtitleSuffix")}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {graftOptions.map((item) => (
                    <div
                      key={item.key}
                      className={`cursor-pointer border rounded-sm p-6 transition-all duration-300 hover:-translate-y-0.5 ${
                        graft === item.key
                          ? "border-primary/60 bg-primary/5"
                          : "border-outline-variant/20 hover:border-primary/40"
                      }`}
                      onClick={() => setGraft(item.key)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className={`material-symbols-outlined text-2xl ${graft === item.key ? "text-primary/90" : "text-primary/40"}`}>
                          {item.icon}
                        </span>
                        <span className={`material-symbols-outlined text-primary text-sm ${graft === item.key ? "opacity-100" : "opacity-0"}`}>
                          check_circle
                        </span>
                      </div>
                      <h3 className="font-headline text-lg mb-1">{item.title}</h3>
                      <p className="text-[11px] text-on-surface/60">{item.sub}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-10 pt-6 border-t border-outline-variant/10">
                  <button
                    onClick={() => goStep(1)}
                    className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span> {t("step2.back")}
                  </button>
                  <button
                    disabled={!graft}
                    onClick={() => goStep(3)}
                    className="px-10 py-3.5 text-sm font-bold tracking-widest uppercase rounded-sm text-on-primary transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                    style={{ background: graft ? "linear-gradient(135deg,#e9c176,#c5a059)" : "rgba(233,193,118,0.2)" }}
                  >
                    {t("step2.next")}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div>
                <h2 className="font-headline text-2xl md:text-3xl mb-3">{t("step3.title")}</h2>
                <p className="text-on-surface-variant text-sm mb-10 opacity-70">
                  {t("step3.subtitlePrefix")}{" "}
                  <Link href="/fiyat" className="text-primary underline">
                    {t("step3.subtitleLink")}
                  </Link>{" "}
                  {t("step3.subtitleSuffix")}
                </p>
                <div className="space-y-4">
                  {pkgOptions.map((item) => (
                    <div
                      key={item.key}
                      className={`cursor-pointer rounded-sm p-6 relative transition-all duration-300 hover:-translate-y-0.5 ${
                        item.featured
                          ? `border-2 ${pkg === item.key ? "border-primary/80 bg-primary/5" : "border-primary/40"}`
                          : `border ${pkg === item.key ? "border-primary/60 bg-primary/5" : "border-outline-variant/20 hover:border-primary/40"}`
                      }`}
                      onClick={() => setPkg(item.key)}
                    >
                      {item.featured && (
                        <span className="absolute top-0 right-0 bg-primary text-on-primary text-[9px] tracking-widest uppercase px-3 py-1 rounded-bl-sm rounded-tr-sm font-semibold">
                          {t("step3.popular")}
                        </span>
                      )}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`material-symbols-outlined text-2xl ${item.featured ? "text-primary" : "text-primary/40"}`}>
                              {item.icon}
                            </span>
                            <h3 className="font-headline text-lg">{item.title}</h3>
                          </div>
                          <p className="text-sm text-on-surface/70 leading-relaxed mb-3">{item.desc}</p>
                          <div className="flex gap-4 text-[10px] uppercase tracking-widest text-on-surface/50">
                            {item.tags.map((tag, i) => (
                              <span key={i}>{i > 0 && <span className="mr-4">•</span>}{tag}</span>
                            ))}
                          </div>
                        </div>
                        <span className={`material-symbols-outlined text-primary text-sm ${pkg === item.key ? "opacity-100" : "opacity-0"}`}>
                          check_circle
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-10 pt-6 border-t border-outline-variant/10">
                  <button
                    onClick={() => goStep(2)}
                    className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span> {t("step3.back")}
                  </button>
                  <button
                    disabled={!pkg}
                    onClick={calculate}
                    className="px-10 py-3.5 text-sm font-bold tracking-widest uppercase rounded-sm text-on-primary transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                    style={{ background: pkg ? "linear-gradient(135deg,#e9c176,#c5a059)" : "rgba(233,193,118,0.2)" }}
                  >
                    {t("step3.calculate")}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4 — RESULT */}
            {step === 4 && result && (
              <div>
                <div className="text-center mb-10">
                  <span className="material-symbols-outlined text-primary text-3xl mb-3">payments</span>
                  <h2 className="font-headline text-2xl md:text-3xl mb-3">{t("step4.title")}</h2>
                  <p className="text-on-surface-variant text-sm opacity-70 max-w-md mx-auto">
                    {t("step4.subtitle")}
                  </p>
                </div>

                <div className="bg-surface-container-high border border-primary/20 rounded-sm p-8 md:p-10 mb-6 text-center">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-primary/70 mb-4">{t("step4.rangeLabel")}</p>
                  <div className="font-headline text-4xl md:text-6xl text-primary mb-4" style={{ fontVariantNumeric: "tabular-nums" }}>
                    €{result.min.toLocaleString(numberLocale)}{" "}
                    <span className="text-primary/50">–</span>{" "}
                    €{result.max.toLocaleString(numberLocale)}
                  </div>
                  <p className="text-sm text-on-surface/60 mb-6">{t("step4.forSelection")}</p>
                  <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-on-surface/50">
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    <span>
                      {result.summaryTech} · {result.summaryGraft} {t("scaleSuffix.graft")} · {result.summaryPackage} {t("scaleSuffix.package")}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: t("step4.summary.tech"), value: result.summaryTech },
                    { label: t("step4.summary.graft"), value: result.summaryGraft },
                    { label: t("step4.summary.package"), value: result.summaryPackage },
                  ].map((item) => (
                    <div key={item.label} className="bg-surface-container-low p-4 rounded-sm">
                      <p className="text-[10px] uppercase tracking-widest text-on-surface/50 mb-1">{item.label}</p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-primary/5 border-l-2 border-primary rounded-sm p-6 mb-8">
                  <p className="text-[11px] uppercase tracking-widest text-primary mb-3">{t("step4.includedTitle")}</p>
                  <ul className="space-y-2 text-sm text-on-surface/80">
                    {result.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-3 gap-3 mb-8">
                  {[
                    { icon: "payments", title: t("step4.payments.cash.title"), sub: t("step4.payments.cash.sub") },
                    { icon: "credit_card", title: t("step4.payments.card.title"), sub: t("step4.payments.card.sub") },
                    { icon: "account_balance", title: t("step4.payments.transfer.title"), sub: t("step4.payments.transfer.sub") },
                  ].map((item) => (
                    <div key={item.icon} className="bg-surface-container-low p-4 rounded-sm text-center">
                      <span className="material-symbols-outlined text-primary/70 text-[20px] mb-2 block">{item.icon}</span>
                      <p className="text-sm font-medium mb-1">{item.title}</p>
                      <p className="text-[10px] text-on-surface/60">{item.sub}</p>
                    </div>
                  ))}
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
                      {t("step4.ctaWrittenQuote")}
                    </Link>
                    <a
                      href="https://wa.me/905539784242?text=Merhaba%2C%20fiyat%20hesaplamas%C4%B1%20yapt%C4%B1m%20yazili%20teklif%20istiyorum."
                      className="border border-primary/20 text-primary px-10 py-4 text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-primary/5 transition-all"
                    >
                      {t("step4.ctaWhatsapp")}
                    </a>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={resetCalc}
                    className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2"
                  >
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
              <h3 className="font-headline text-xl mb-3 text-primary/90">{t("info.diffTitle")}</h3>
              <p className="text-sm mb-4">{t("info.diffIntro")}</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[500px]">
                  <thead>
                    <tr className="border-b border-outline-variant/20 text-left">
                      <th className="py-3 pr-4 text-primary font-label uppercase tracking-wider text-sm">{t("info.table.techCol")}</th>
                      <th className="py-3 pr-4 text-primary font-label uppercase tracking-wider text-sm">{t("info.table.levelCol")}</th>
                      <th className="py-3 text-primary font-label uppercase tracking-wider text-sm">{t("info.table.reasonCol")}</th>
                    </tr>
                  </thead>
                  <tbody className="text-on-surface/75">
                    {tableRows.map((row, i) => (
                      <tr key={i} className={i < tableRows.length - 1 ? "border-b border-outline-variant/10" : ""}>
                        <td className="py-3 pr-4">{row.tech}</td>
                        <td className="py-3 pr-4">{row.level}</td>
                        <td className="py-3">{row.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                  <span
                    className="transition-transform duration-300 text-primary text-lg"
                    style={{ transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
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

        {/* BOTTOM DISCLAIMER */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <p className="text-[11px] text-on-surface/50 leading-relaxed">{t("disclaimer")}</p>
        </div>

      </div>
    </section>
  );
}
