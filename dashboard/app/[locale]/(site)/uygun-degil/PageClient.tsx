"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type AbsoluteItem = { title: string; desc: string; icon: string };
type RelativeItem = { title: string; desc: string };
type AgeItem = { range: string; status: string; detail: string };
type FaqItem = { q: string; a: string };

const AGE_COLORS = ["text-red-400", "text-yellow-400", "text-primary", "text-primary"];

export default function UygunDegilPageClient() {
  const t = useTranslations("pages.notEligible");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const absoluteItems = t.raw("absolute.items") as AbsoluteItem[];
  const relativeItems = t.raw("relative.items") as RelativeItem[];
  const ageItems = t.raw("age.items") as AgeItem[];
  const faqItems = t.raw("faq.items") as FaqItem[];

  return (
    <section className="pt-28">

      {/* HERO */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-on-surface-variant mb-8 tracking-wider">
            <Link href="/" className="hover:text-primary transition-colors">{t("breadcrumb.home")}</Link>
            <span className="mx-2">›</span>
            <Link href="/sac-ekimi" className="hover:text-primary transition-colors">{t("breadcrumb.parent")}</Link>
            <span className="mx-2">›</span>
            <span className="text-on-surface">{t("breadcrumb.current")}</span>
          </nav>
          <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("hero.eyebrow")}</span>
          <h1 className="font-headline text-4xl md:text-6xl leading-tight mb-8">
            {t("hero.titlePart1")} <span className="italic text-primary/80">{t("hero.titleItalic")}</span>
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

      {/* MUTLAK KRİTERLER */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("absolute.eyebrow")}</span>
          <h2 className="font-headline text-3xl mb-4">{t("absolute.title")}</h2>
          <p className="text-on-surface/60 text-sm mb-12">{t("absolute.lede")}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {absoluteItems.map((item, i) => (
              <div key={i} className="bg-surface-container-high rounded p-6 border border-outline-variant/10">
                <div className="flex items-start gap-4">
                  <span className={`material-symbols-outlined text-[20px] mt-0.5 ${item.icon === "warning" ? "text-yellow-500/70" : "text-on-surface/40"}`}>
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="font-headline text-base mb-2">{item.title}</h3>
                    <p className="text-on-surface/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GÖRELİ KRİTERLER */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("relative.eyebrow")}</span>
          <h2 className="font-headline text-3xl mb-4">{t("relative.title")}</h2>
          <p className="text-on-surface/60 text-sm mb-12">{t("relative.lede")}</p>
          <div className="space-y-4">
            {relativeItems.map((item, i) => (
              <div key={i} className="bg-surface-container-low rounded p-6 border border-primary/10 flex gap-4 items-start">
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">info</span>
                <div>
                  <h3 className="font-headline text-base mb-2">{item.title}</h3>
                  <p className="text-on-surface/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YAŞ KRİTERLERİ */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("age.eyebrow")}</span>
          <h2 className="font-headline text-3xl mb-12">{t("age.title")}</h2>
          <div className="space-y-0">
            {ageItems.map((item, i) => (
              <div
                key={i}
                className={`flex gap-6 items-start ${i < ageItems.length - 1 ? "pb-8 border-b border-outline-variant/10" : ""} pt-8`}
              >
                <div className="w-24 shrink-0">
                  <p className="text-on-surface/50 text-sm font-label uppercase tracking-wider">{item.range}</p>
                </div>
                <div className="flex-1">
                  <p className={`font-headline text-sm mb-1 ${AGE_COLORS[i]}`}>{item.status}</p>
                  <p className="text-on-surface/60 text-sm leading-relaxed">{item.detail}</p>
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
              href="/sac-ekimi"
              className="border border-primary/40 text-primary px-10 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary/10 transition-all"
            >
              {t("cta.secondary")}
            </Link>
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
