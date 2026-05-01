"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type StepItem = { title: string; text: string };
type FaqItem = { q: string; a: string };

export default function SacEkimiPage() {
  const t = useTranslations("pages.hairTransplant");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const candidatesSuitable = t.raw("candidates.suitable") as string[];
  const candidatesNotSuitable = t.raw("candidates.notSuitable") as string[];
  const processSteps = t.raw("process.steps") as StepItem[];
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
          <h1 className="font-headline text-4xl md:text-6xl leading-tight mb-8">{t("hero.title")}<br /><span className="italic text-primary/80">{t("hero.titleItalic")}</span></h1>
          <p className="text-on-surface/70 text-lg leading-relaxed max-w-2xl">{t("hero.lede")}</p>
        </div>
      </section>

      {/* KİMLER İÇİN UYGUN */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-10">{t("candidates.title")}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-surface-container-high p-8 rounded">
              <h3 className="font-headline text-lg mb-4 text-primary">{t("candidates.suitableTitle")}</h3>
              <ul className="space-y-3 text-on-surface/80 text-sm">
                {candidatesSuitable.map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check_circle</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-container-high p-8 rounded">
              <h3 className="font-headline text-lg mb-4 text-on-surface/60">{t("candidates.notSuitableTitle")}</h3>
              <ul className="space-y-3 text-on-surface/70 text-sm">
                {candidatesNotSuitable.map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><span className="material-symbols-outlined text-on-surface/60 text-[16px] mt-0.5">info</span>{item}</li>
                ))}
              </ul>
              <p className="text-sm text-on-surface/60 mt-4">{t("candidates.footer")} <Link href="/uygun-degil" className="text-primary hover:underline">{t("candidates.footerLink")}</Link></p>
            </div>
          </div>
        </div>
      </section>

      {/* TEKNİKLER */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-4">{t("techniques.title")}</h2>
          <p className="text-on-surface/70 mb-12 max-w-xl">{t("techniques.lede")}</p>

          {/* FUE Card */}
          <div className="bg-surface-container-high rounded p-8 mb-6 hover:border-primary/20 border border-transparent transition-colors">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1">
                <span className="text-[10px] tracking-wider uppercase text-primary/70 block mb-2">{t("techniques.fue.tag")}</span>
                <h3 className="font-headline text-2xl mb-3">{t("techniques.fue.title")}</h3>
                <p className="text-on-surface/70 text-sm leading-relaxed mb-4">{t("techniques.fue.desc")}</p>
                <div className="flex gap-6 text-sm text-on-surface/60">
                  <span><strong className="text-on-surface">{t("techniques.fue.duration")}</strong> {t("techniques.fue.durationLabel")}</span>
                  <span><strong className="text-on-surface">{t("techniques.fue.recovery")}</strong> {t("techniques.fue.recoveryLabel")}</span>
                  <span><strong className="text-on-surface">{t("techniques.fue.result")}</strong> {t("techniques.fue.resultLabel")}</span>
                </div>
              </div>
              <Link href="/sac-ekimi/fue" className="text-primary text-sm font-label uppercase tracking-wider hover:underline whitespace-nowrap self-center">{t("techniques.fue.cta")}</Link>
            </div>
          </div>

          {/* DHI Card */}
          <div className="bg-surface-container-high rounded p-8 mb-6 hover:border-primary/20 border border-transparent transition-colors">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1">
                <span className="text-[10px] tracking-wider uppercase text-primary/70 block mb-2">{t("techniques.dhi.tag")}</span>
                <h3 className="font-headline text-2xl mb-3">{t("techniques.dhi.title")}</h3>
                <p className="text-on-surface/70 text-sm leading-relaxed mb-4">{t("techniques.dhi.desc")}</p>
                <div className="flex gap-6 text-sm text-on-surface/60">
                  <span><strong className="text-on-surface">{t("techniques.dhi.duration")}</strong> {t("techniques.dhi.durationLabel")}</span>
                  <span><strong className="text-on-surface">{t("techniques.dhi.recovery")}</strong> {t("techniques.dhi.recoveryLabel")}</span>
                  <span><strong className="text-on-surface">{t("techniques.dhi.result")}</strong> {t("techniques.dhi.resultLabel")}</span>
                </div>
              </div>
              <Link href="/sac-ekimi/dhi" className="text-primary text-sm font-label uppercase tracking-wider hover:underline whitespace-nowrap self-center">{t("techniques.dhi.cta")}</Link>
            </div>
          </div>

          {/* Sapphire Card */}
          <div className="bg-surface-container-high rounded p-8 hover:border-primary/20 border border-transparent transition-colors">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1">
                <span className="text-[10px] tracking-wider uppercase text-primary/70 block mb-2">{t("techniques.sapphire.tag")}</span>
                <h3 className="font-headline text-2xl mb-3">{t("techniques.sapphire.title")}</h3>
                <p className="text-on-surface/70 text-sm leading-relaxed mb-4">{t("techniques.sapphire.desc")}</p>
                <div className="flex gap-6 text-sm text-on-surface/60">
                  <span><strong className="text-on-surface">{t("techniques.sapphire.duration")}</strong> {t("techniques.sapphire.durationLabel")}</span>
                  <span><strong className="text-on-surface">{t("techniques.sapphire.recovery")}</strong> {t("techniques.sapphire.recoveryLabel")}</span>
                  <span><strong className="text-on-surface">{t("techniques.sapphire.result")}</strong> {t("techniques.sapphire.resultLabel")}</span>
                </div>
              </div>
              <Link href="/sac-ekimi/sapphire" className="text-primary text-sm font-label uppercase tracking-wider hover:underline whitespace-nowrap self-center">{t("techniques.sapphire.cta")}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SÜREÇ */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-12">{t("process.title")}</h2>
          <div className="space-y-0">
            {processSteps.map((step, idx) => {
              const isLast = idx === processSteps.length - 1;
              return (
                <div key={idx} className={`flex gap-6 items-start ${!isLast ? 'pb-10 relative' : ''}`}>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full ${isLast ? 'bg-primary' : 'bg-primary/10'} flex items-center justify-center ${isLast ? 'text-on-primary' : 'text-primary'} font-headline text-lg`}>{idx + 1}</div>
                    {!isLast && <div className="w-px h-full bg-outline-variant/20 mt-2"></div>}
                  </div>
                  <div>
                    <h3 className="font-headline text-xl mb-2">{step.title}</h3>
                    <p className="text-on-surface/70 text-sm leading-relaxed">{step.text}</p>
                  </div>
                </div>
              );
            })}
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
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-surface-container-lowest">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-headline text-3xl mb-4">{t("cta.title")}</h2>
          <p className="text-on-surface/70 mb-8">{t("cta.lede")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sac-analizi" className="bg-primary text-on-primary px-10 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary-container transition-all">{t("cta.primary")}</Link>
            <Link href="/greft-hesaplama" className="border border-primary/40 text-primary px-10 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary/10 transition-all">{t("cta.secondary")}</Link>
            <a href="https://wa.me/905539784242?text=Merhaba%2C%20sa%C3%A7%20ekimi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." className="border border-outline-variant/30 text-on-surface/80 px-10 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:border-primary/40 hover:text-primary transition-all">{t("cta.whatsapp")}</a>
          </div>
          <div className="flex gap-6 justify-center mt-6 text-[11px] tracking-wider uppercase text-on-surface/60">
            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px] text-primary/90">check_circle</span>{t("cta.trustFree")}</span>
            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px] text-primary/90">check_circle</span>{t("cta.trustNonBinding")}</span>
            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px] text-primary/90">check_circle</span>{t("cta.trust24h")}</span>
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
