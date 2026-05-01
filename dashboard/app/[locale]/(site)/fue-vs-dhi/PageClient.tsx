"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type CompareRow = { feature: string; fue: string; dhi: string };
type MythItem = { myth: string; fact: string };
type FaqItem = { q: string; a: string };

export default function FueVsDhiPageClient() {
  const t = useTranslations("pages.fueVsDhi");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const compareRows = t.raw("table.rows") as CompareRow[];
  const fueItems = t.raw("ideal.fueItems") as string[];
  const dhiItems = t.raw("ideal.dhiItems") as string[];
  const myths = t.raw("myths.items") as MythItem[];
  const faqItems = t.raw("faq.items") as FaqItem[];

  return (
    <section className="pt-28">
      {/* HERO */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-on-surface-variant mb-8 tracking-wider">
            <Link href="/" className="hover:text-primary transition-colors">{t("breadcrumb.home")}</Link>
            <span className="mx-2">›</span>
            <span className="text-on-surface">{t("breadcrumb.current")}</span>
          </nav>
          <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("hero.eyebrow")}</span>
          <h1 className="font-headline text-4xl md:text-6xl leading-tight mb-8">
            {t("hero.title")}<br />
            <span className="italic text-primary/80">{t("hero.titleItalic")}</span>
          </h1>
          <p className="text-on-surface/70 text-lg leading-relaxed max-w-2xl">{t("hero.lede")}</p>
        </div>
      </section>

      {/* AEO DIRECT ANSWER */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary/5 border-l-2 border-primary p-8 rounded-sm">
            <p className="text-sm font-label uppercase tracking-wider text-primary mb-3">{t("shortAnswer.label")}</p>
            <p className="text-on-surface/80 leading-relaxed">{t("shortAnswer.body")}</p>
          </div>
        </div>
      </section>

      {/* KARŞILAŞTIRMA TABLOSU */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("table.eyebrow")}</span>
          <h2 className="font-headline text-3xl mb-4">{t("table.title")}</h2>
          <p className="text-on-surface/60 text-sm mb-10">{t("table.lede")}</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20">
                  <th className="text-left py-3 pr-6 text-on-surface/60 font-label text-sm uppercase tracking-wider w-1/3">{t("table.headers.feature")}</th>
                  <th className="text-left py-3 pr-6 text-primary font-label text-sm uppercase tracking-wider w-1/3">{t("table.headers.fue")}</th>
                  <th className="text-left py-3 text-on-surface/80 font-label text-sm uppercase tracking-wider w-1/3">{t("table.headers.dhi")}</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-outline-variant/10 ${i % 2 === 0 ? "" : "bg-surface-container-high/30"}`}
                  >
                    <td className="py-4 pr-6 text-on-surface/60 text-sm uppercase tracking-wider">{row.feature}</td>
                    <td className="py-4 pr-6 text-on-surface/80">{row.fue}</td>
                    <td className="py-4 text-on-surface/80">{row.dhi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* KİMİN İÇİN İDEAL */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("ideal.eyebrow")}</span>
          <h2 className="font-headline text-3xl mb-12">{t("ideal.title")}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* FUE */}
            <div className="bg-surface-container-high p-8 rounded border border-primary/10">
              <h3 className="font-headline text-xl mb-6 text-primary">{t("ideal.fueTitle")}</h3>
              <ul className="space-y-3 text-on-surface/80 text-sm">
                {fueItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* DHI */}
            <div className="bg-surface-container-high p-8 rounded border border-outline-variant/10">
              <h3 className="font-headline text-xl mb-6 text-on-surface/80">{t("ideal.dhiTitle")}</h3>
              <ul className="space-y-3 text-on-surface/80 text-sm">
                {dhiItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-on-surface/60 text-[16px] mt-0.5">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-sm text-on-surface/50 mt-6">
            {t("ideal.footer")}{" "}
            <Link href="/uygun-degil" className="text-primary hover:underline">
              {t("ideal.footerLink")}
            </Link>
          </p>
        </div>
      </section>

      {/* MİTOS VS GERÇEK */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("myths.eyebrow")}</span>
          <h2 className="font-headline text-3xl mb-12">{t("myths.title")}</h2>
          <div className="space-y-6">
            {myths.map((item, i) => (
              <div key={i} className="bg-surface-container-high rounded p-6">
                <div className="flex gap-4 mb-3">
                  <span className="text-[10px] tracking-wider uppercase bg-outline-variant/20 text-on-surface/60 px-3 py-1 rounded-sm self-start">{t("myths.mythLabel")}</span>
                  <p className="text-on-surface/60 text-sm line-through">{item.myth}</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-[10px] tracking-wider uppercase bg-primary/10 text-primary px-3 py-1 rounded-sm self-start">{t("myths.factLabel")}</span>
                  <p className="text-on-surface/80 text-sm leading-relaxed">{item.fact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-12">{t("faq.title")}</h2>
          {faqItems.map((item, i) => (
            <div
              key={i}
              className={`faq-item ${openFaq === i ? "open" : ""} cursor-pointer ${
                i < faqItems.length - 1 ? "border-b border-outline-variant/10 pb-6 mb-6" : "pb-6"
              }`}
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
            <Link
              href="/oncesi-sonrasi"
              className="border border-primary/40 text-primary px-10 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary/10 transition-all"
            >
              {t("cta.secondary")}
            </Link>
          </div>
          <div className="flex gap-6 justify-center mt-6 text-[11px] tracking-wider uppercase text-on-surface/60">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-primary/90">check_circle</span>
              {t("cta.trustFree")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-primary/90">check_circle</span>
              {t("cta.trustNonBinding")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-primary/90">check_circle</span>
              {t("cta.trust24h")}
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
