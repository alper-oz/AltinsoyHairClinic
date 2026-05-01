"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function FiyatPage() {
  const t = useTranslations("pages.pricing");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const standardItems = ["i1", "i2", "i3", "i4", "i5", "i6", "i7"].map((k) =>
    t(`packages.standard.items.${k}`)
  );
  const premiumItems = ["i1", "i2", "i3", "i4", "i5", "i6"].map((k) =>
    t(`packages.premium.items.${k}`)
  );
  const internationalItems = ["i1", "i2", "i3", "i4", "i5", "i6"].map((k) =>
    t(`packages.international.items.${k}`)
  );

  const notIncluded = [
    { title: t("notIncluded.items.flight.title"), desc: t("notIncluded.items.flight.desc") },
    { title: t("notIncluded.items.visa.title"), desc: t("notIncluded.items.visa.desc") },
    { title: t("notIncluded.items.extraStay.title"), desc: t("notIncluded.items.extraStay.desc") },
    { title: t("notIncluded.items.extraTreatment.title"), desc: t("notIncluded.items.extraTreatment.desc") },
  ];

  const faqItems = ["q1", "q2", "q3", "q4", "q5"].map((k) => ({
    q: t(`faq.items.${k}.q`),
    a: t(`faq.items.${k}.a`),
  }));

  return (
    <section className="pt-28 pb-24">

      {/* HERO */}
      <div className="px-6 py-16 max-w-5xl mx-auto">
        <nav className="text-sm text-on-surface-variant mb-8 tracking-wider">
          <Link href="/" className="hover:text-primary transition-colors">{t("breadcrumb.home")}</Link>
          <span className="mx-2">›</span>
          <span className="text-on-surface">{t("breadcrumb.pricing")}</span>
        </nav>
        <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("hero.eyebrow")}</span>
        <h1 className="font-headline text-4xl md:text-6xl leading-tight mb-8">
          {t("hero.titlePart1")}<br />
          <span className="italic text-primary/80">{t("hero.titleAccent")}</span>
        </h1>
        <p className="text-on-surface/70 text-lg leading-relaxed max-w-2xl">{t("hero.subtitle")}</p>
      </div>

      {/* AEO DIRECT ANSWER BOX */}
      <section className="px-6 mb-16 max-w-5xl mx-auto">
        <div className="bg-primary/5 border-l-2 border-primary rounded-sm p-8">
          <h2 className="font-headline text-xl mb-4 text-primary">{t("shortAnswer.title")}</h2>
          <p
            className="text-on-surface/90 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t.raw("shortAnswer.body") as string }}
          />
        </div>
      </section>

      {/* 3 PACKAGE CARDS */}
      <section className="px-6 mb-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("packages.eyebrow")}</span>
          <h2 className="font-headline text-3xl md:text-4xl">{t("packages.title")}</h2>
          <p className="text-on-surface/60 mt-4 max-w-xl mx-auto">{t("packages.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* STANDART PAKET */}
          <div className="bg-surface-container-high rounded-sm p-8 border border-outline-variant/10 transition-all duration-500 hover:-translate-y-1">
            <div className="mb-6">
              <span className="text-[10px] tracking-widest uppercase text-on-surface/60 block mb-3">{t("packages.standard.tag")}</span>
              <h3 className="font-headline text-2xl mb-2">{t("packages.standard.title")}</h3>
              <p className="text-sm text-on-surface/60">{t("packages.standard.subtitle")}</p>
            </div>
            <div className="mb-8 pb-8 border-b border-outline-variant/10">
              <span className="text-[10px] tracking-widest uppercase text-on-surface/50 block mb-1">{t("packages.labels.priceRange")}</span>
              <p className="font-headline text-3xl text-primary">{t("packages.standard.range")}</p>
              <p className="text-[11px] text-on-surface/50 mt-2">{t("packages.labels.rangeNote")}</p>
            </div>
            <div className="mb-6">
              <p className="text-sm uppercase tracking-widest text-primary/80 mb-4">{t("packages.labels.includedTitle")}</p>
              <ul className="space-y-3 text-sm text-on-surface/80">
                {standardItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check</span>{item}</li>
                ))}
              </ul>
            </div>
            <Link href="/sac-analizi" className="block text-center border border-primary/30 text-primary px-6 py-3 text-sm uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all rounded-sm">{t("packages.labels.moreInfo")}</Link>
          </div>

          {/* PREMIUM PAKET */}
          <div className="bg-surface-container-high rounded-sm p-8 border-2 border-primary/60 relative transition-all duration-500 hover:-translate-y-1">
            <span className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-bl-sm rounded-tr-sm font-semibold">{t("packages.labels.popularBadge")}</span>
            <div className="mb-6">
              <span className="text-[10px] tracking-widest uppercase text-primary/80 block mb-3">{t("packages.premium.tag")}</span>
              <h3 className="font-headline text-2xl mb-2">{t("packages.premium.title")}</h3>
              <p className="text-sm text-on-surface/60">{t("packages.premium.subtitle")}</p>
            </div>
            <div className="mb-8 pb-8 border-b border-outline-variant/10">
              <span className="text-[10px] tracking-widest uppercase text-on-surface/50 block mb-1">{t("packages.labels.priceRange")}</span>
              <p className="font-headline text-3xl text-primary">{t("packages.premium.range")}</p>
              <p className="text-[11px] text-on-surface/50 mt-2">{t("packages.labels.rangeNote")}</p>
            </div>
            <div className="mb-6">
              <p className="text-sm uppercase tracking-widest text-primary/80 mb-4">{t("packages.labels.includedAddOn")}</p>
              <ul className="space-y-3 text-sm text-on-surface/80">
                {premiumItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check</span>{item}</li>
                ))}
              </ul>
            </div>
            <Link href="/sac-analizi" className="block text-center bg-primary text-on-primary px-6 py-3 text-sm uppercase tracking-widest hover:bg-primary-container transition-all rounded-sm">{t("packages.labels.moreInfo")}</Link>
          </div>

          {/* ULUSLARARASI PAKET */}
          <div className="bg-surface-container-high rounded-sm p-8 border border-outline-variant/10 transition-all duration-500 hover:-translate-y-1">
            <div className="mb-6">
              <span className="text-[10px] tracking-widest uppercase text-on-surface/60 block mb-3">{t("packages.international.tag")}</span>
              <h3 className="font-headline text-2xl mb-2">{t("packages.international.title")}</h3>
              <p className="text-sm text-on-surface/60">{t("packages.international.subtitle")}</p>
            </div>
            <div className="mb-8 pb-8 border-b border-outline-variant/10">
              <span className="text-[10px] tracking-widest uppercase text-on-surface/50 block mb-1">{t("packages.labels.priceRange")}</span>
              <p className="font-headline text-3xl text-primary">{t("packages.international.range")}</p>
              <p className="text-[11px] text-on-surface/50 mt-2">{t("packages.labels.rangeNoteFull")}</p>
            </div>
            <div className="mb-6">
              <p className="text-sm uppercase tracking-widest text-primary/80 mb-4">{t("packages.labels.includedAddOnPremium")}</p>
              <ul className="space-y-3 text-sm text-on-surface/80">
                {internationalItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check</span>{item}</li>
                ))}
              </ul>
            </div>
            <Link href="/sac-analizi" className="block text-center border border-primary/30 text-primary px-6 py-3 text-sm uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all rounded-sm">{t("packages.labels.moreInfo")}</Link>
          </div>

        </div>

        <p className="text-center text-[11px] text-on-surface/50 mt-8 max-w-xl mx-auto">{t("packages.footnote")}</p>
      </section>

      {/* NEYE DAHİL DEĞİL */}
      <section className="px-6 py-16 bg-surface-container-low max-w-5xl mx-auto rounded-sm mb-24">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("notIncluded.eyebrow")}</span>
          <h2 className="font-headline text-3xl mb-4">{t("notIncluded.title")}</h2>
          <p className="text-on-surface/70 mb-8">{t("notIncluded.subtitle")}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {notIncluded.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-surface-container-high p-5 rounded-sm">
                <span className="material-symbols-outlined text-on-surface/60 text-[18px] mt-0.5">info</span>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-sm text-on-surface/60 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÖDEME SEÇENEKLERİ */}
      <section className="px-6 mb-24 max-w-5xl mx-auto">
        <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("payment.eyebrow")}</span>
        <h2 className="font-headline text-3xl mb-8">{t("payment.title")}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-surface-container-high p-6 rounded-sm">
            <span className="material-symbols-outlined text-primary text-2xl mb-3">payments</span>
            <h3 className="font-headline text-lg mb-2">{t("payment.cash.title")}</h3>
            <p className="text-sm text-on-surface/70">{t("payment.cash.desc")}</p>
          </div>
          <div className="bg-surface-container-high p-6 rounded-sm">
            <span className="material-symbols-outlined text-primary text-2xl mb-3">credit_card</span>
            <h3 className="font-headline text-lg mb-2">{t("payment.card.title")}</h3>
            <p className="text-sm text-on-surface/70">{t("payment.card.desc")}</p>
          </div>
          <div className="bg-surface-container-high p-6 rounded-sm">
            <span className="material-symbols-outlined text-primary text-2xl mb-3">account_balance</span>
            <h3 className="font-headline text-lg mb-2">{t("payment.transfer.title")}</h3>
            <p className="text-sm text-on-surface/70">{t("payment.transfer.desc")}</p>
          </div>
        </div>
      </section>

      {/* AEO FAQ */}
      <section className="px-6 mb-24 max-w-4xl mx-auto">
        <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("faq.eyebrow")}</span>
        <h2 className="font-headline text-3xl mb-12">{t("faq.title")}</h2>
        <div className="space-y-4">
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
                >+</span>
              </div>
              {openFaq === i && (
                <div className="text-sm text-on-surface/70 leading-relaxed pt-4">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-surface-container-lowest">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-headline text-3xl mb-4">{t("cta.title")}</h2>
          <p className="text-on-surface/70 mb-8">{t("cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sac-analizi" className="bg-primary text-on-primary px-10 py-4 text-sm font-label uppercase tracking-widest rounded-sm hover:bg-primary-container transition-all">{t("cta.primary")}</Link>
            <Link href="/fiyat-hesaplama" className="border border-primary/40 text-primary px-10 py-4 text-sm font-label uppercase tracking-widest rounded-sm hover:bg-primary/10 transition-all">{t("cta.calculator")}</Link>
            <a href="https://wa.me/905539784242?text=Merhaba%2C%20fiyat%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." className="border border-outline-variant/30 text-on-surface/80 px-10 py-4 text-sm font-label uppercase tracking-widest rounded-sm hover:border-primary/40 hover:text-primary transition-all">{t("cta.whatsapp")}</a>
          </div>
          <div className="flex gap-6 justify-center mt-6 text-[11px] tracking-wider uppercase text-on-surface/60">
            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px] text-primary/90">check_circle</span>{t("cta.tags.freeConsult")}</span>
            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px] text-primary/90">check_circle</span>{t("cta.tags.nonBinding")}</span>
            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px] text-primary/90">check_circle</span>{t("cta.tags.writtenQuote")}</span>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <div className="py-8 px-6 text-center max-w-2xl mx-auto">
        <p className="text-[11px] text-on-surface/50 leading-relaxed">{t("disclaimer")}</p>
      </div>

    </section>
  );
}
