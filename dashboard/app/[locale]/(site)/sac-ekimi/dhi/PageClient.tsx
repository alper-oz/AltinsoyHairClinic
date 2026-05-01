"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type StepItem = { title: string; body: string };
type ProsConItem = { title: string; desc: string };
type CompareRow = { feature: string; dhi: string; fue: string };
type SummaryItem = { value: string; label: string };
type FaqItem = { q: string; a: string };

const SUMMARY_ICONS = ["schedule", "healing", "psychiatry", "trending_up", "verified"];
const PROS_ICONS = ["tune", "hub", "density_medium", "water_drop", "timer"];
const CONS_ICONS = ["hourglass_slow", "payments", "content_cut", "psychology"];

export default function DhiPage() {
  const t = useTranslations("pages.dhi");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const choiSteps = t.raw("what.choiSteps") as string[];
  const howSteps = t.raw("how.steps") as StepItem[];
  const pros = t.raw("prosCons.pros") as ProsConItem[];
  const cons = t.raw("prosCons.cons") as ProsConItem[];
  const ideal = t.raw("candidates.ideal") as string[];
  const fueBetter = t.raw("candidates.fueBetter") as string[];
  const compareRows = t.raw("compare.rows") as CompareRow[];
  const summaryItems = t.raw("summary.items") as SummaryItem[];
  const faqItems = t.raw("faq.items") as FaqItem[];

  return (
    <section className="pt-28">
      {/* HERO */}
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-on-surface-variant mb-8 tracking-wider">
            <Link href="/" className="hover:text-primary transition-colors">{t("breadcrumb.home")}</Link>
            <span className="mx-2">&gt;</span>
            <Link href="/sac-ekimi" className="hover:text-primary transition-colors">{t("breadcrumb.parent")}</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-on-surface">{t("breadcrumb.current")}</span>
          </nav>
          <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("hero.eyebrow")}</span>
          <h1 className="font-headline text-4xl md:text-6xl leading-tight mb-8">
            {t("hero.title")}<br />
            <span className="italic text-primary/80">{t("hero.titleItalic")}</span>
          </h1>
          <p className="text-on-surface/70 text-lg leading-relaxed max-w-2xl">{t("hero.lede")}</p>
        </div>
      </div>

      {/* DHI NEDİR */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-8">{t("what.title")}</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-on-surface/70 text-sm leading-relaxed mb-4">{t("what.p1")}</p>
              <p className="text-on-surface/70 text-sm leading-relaxed mb-4">{t("what.p2")}</p>
              <p className="text-on-surface/70 text-sm leading-relaxed">{t("what.p3")}</p>
            </div>
            <div className="bg-surface-container-high p-8 rounded">
              <h3 className="font-headline text-lg mb-4 text-primary">{t("what.choiTitle")}</h3>
              <ol className="space-y-4 text-sm">
                {choiSteps.map((step, i) => {
                  const highlight = i === 2;
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-full ${highlight ? "bg-primary text-on-primary" : "bg-primary/10 text-primary"} flex items-center justify-center font-headline text-sm flex-shrink-0`}>{i + 1}</span>
                      <span className="text-on-surface/70">{step}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* DHI NASIL YAPILIR */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-4">{t("how.title")}</h2>
          <p className="text-on-surface/70 text-sm mb-12 max-w-2xl leading-relaxed">{t("how.lede")}</p>
          <div className="space-y-0">
            {howSteps.map((step, i) => {
              const highlight = i === 3;
              return (
                <div key={i} className="flex gap-6 items-start pb-10 relative">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-headline text-lg flex-shrink-0 ${
                        highlight ? "bg-primary text-on-primary" : "bg-primary/10 text-primary"
                      }`}
                    >
                      {i + 1}
                    </div>
                    {i < howSteps.length - 1 && (
                      <div className="w-px flex-1 bg-outline-variant/20 mt-2" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-headline text-xl mb-2">
                      {step.title}
                      {highlight && (
                        <span className="text-primary text-sm ml-2">{t("how.highlightLabel")}</span>
                      )}
                    </h3>
                    <p className="text-on-surface/70 text-sm leading-relaxed">{step.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AVANTAJLAR VE LİMİTLER */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-4">{t("prosCons.title")}</h2>
          <p className="text-on-surface/70 mb-10 max-w-2xl text-sm leading-relaxed">{t("prosCons.lede")}</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-headline text-lg mb-6 text-primary">{t("prosCons.prosTitle")}</h3>
              <div className="space-y-4">
                {pros.map((item, i) => (
                  <div key={i} className="bg-surface-container-high p-5 rounded">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">{PROS_ICONS[i]}</span>
                      <div>
                        <h4 className="text-sm font-medium mb-1">{item.title}</h4>
                        <p className="text-on-surface/60 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-headline text-lg mb-6 text-on-surface/60">{t("prosCons.consTitle")}</h3>
              <div className="space-y-4">
                {cons.map((item, i) => (
                  <div key={i} className="bg-surface-container-high p-5 rounded">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-on-surface/50 text-[18px] mt-0.5">{CONS_ICONS[i]}</span>
                      <div>
                        <h4 className="text-sm font-medium mb-1">{item.title}</h4>
                        <p className="text-on-surface/60 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DHI KİMLERE UYGUN */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-4">{t("candidates.title")}</h2>
          <p className="text-on-surface/70 mb-10 max-w-2xl text-sm leading-relaxed">{t("candidates.lede")}</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-surface-container-high p-8 rounded">
              <h3 className="font-headline text-lg mb-6 text-primary">{t("candidates.idealTitle")}</h3>
              <ul className="space-y-3 text-sm">
                {ideal.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check_circle</span>
                    <span className="text-on-surface/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-container-high p-8 rounded">
              <h3 className="font-headline text-lg mb-6 text-on-surface/60">{t("candidates.fueBetterTitle")}</h3>
              <ul className="space-y-3 text-sm">
                {fueBetter.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-on-surface/50 text-[16px] mt-0.5">info</span>
                    <span className="text-on-surface/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DHI vs FUE KARŞILAŞTIRMA TABLOSU */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-4">{t("compare.title")}</h2>
          <p className="text-on-surface/70 mb-10 max-w-2xl text-sm leading-relaxed">{t("compare.lede")}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant/20">
                  <th className="text-left py-4 pr-4 font-headline text-on-surface/60 font-normal">{t("compare.headers.feature")}</th>
                  <th className="text-left py-4 px-4 font-headline text-primary font-normal">{t("compare.headers.dhi")}</th>
                  <th className="text-left py-4 pl-4 font-headline text-on-surface/60 font-normal">{t("compare.headers.fue")}</th>
                </tr>
              </thead>
              <tbody className="text-on-surface/70">
                {compareRows.map((row, i) => (
                  <tr key={i} className="border-b border-outline-variant/10">
                    <td className="py-4 pr-4 text-on-surface font-medium">{row.feature}</td>
                    <td className="py-4 px-4">{row.dhi}</td>
                    <td className="py-4 pl-4">{row.fue}</td>
                  </tr>
                ))}
                <tr>
                  <td className="py-4 pr-4 text-on-surface font-medium">{t("compare.finalRow.feature")}</td>
                  <td className="py-4 px-4" colSpan={2}>{t("compare.finalRow.value")}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-on-surface/50 mt-6">
            {t("compare.footer")}{" "}
            <Link href="/fue-vs-dhi" className="text-primary hover:underline">{t("compare.footerLink")}</Link>
          </p>
        </div>
      </section>

      {/* DHI SÜREÇ ÖZETİ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-12">{t("summary.title")}</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {summaryItems.map((card, i) => {
              const highlight = i === 4;
              return (
                <div
                  key={i}
                  className={`p-6 rounded text-center ${
                    highlight ? "bg-primary/10 border border-primary/20" : "bg-surface-container-high"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      highlight ? "bg-primary text-on-primary" : "bg-primary/10 text-primary"
                    }`}
                  >
                    <span className="material-symbols-outlined">{SUMMARY_ICONS[i]}</span>
                  </div>
                  <div className={`font-headline text-xl mb-1 ${highlight ? "text-primary" : ""}`}>
                    {card.value}
                  </div>
                  <p className="text-on-surface/60 text-sm">{card.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-12">{t("faq.title")}</h2>
          {faqItems.map((item, i) => (
            <div
              key={i}
              className={`cursor-pointer border-b border-outline-variant/10 pb-6 mb-6 ${i === faqItems.length - 1 ? "border-b-0" : ""}`}
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
              {openFaq === i && (
                <div className="text-sm text-on-surface/70 leading-relaxed pt-4">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-surface-container-lowest">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-headline text-3xl mb-4">{t("cta.title")}</h2>
          <p className="text-on-surface/70 mb-8">{t("cta.lede")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sac-analizi"
              className="bg-primary text-on-primary px-10 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary-container transition-all"
            >
              {t("cta.primary")}
            </Link>
            <a
              href="https://wa.me/905539784242?text=Merhaba%2C%20DHI%20sa%C3%A7%20ekimi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              className="border border-primary/20 text-primary px-10 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary/5 transition-all"
            >
              {t("cta.whatsapp")}
            </a>
          </div>
          <div className="flex gap-6 justify-center mt-6 text-[11px] tracking-wider uppercase text-on-surface/60">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-primary/90">check_circle</span>{t("cta.trustFree")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-primary/90">check_circle</span>{t("cta.trustNonBinding")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-primary/90">check_circle</span>{t("cta.trust24h")}
            </span>
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
