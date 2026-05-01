"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type AreaItem = { title: string; tag: string; body: string };
type StepItem = { title: string; text: string };
type ProcessRow = { stage: string; detail: string };
type FaqItem = { q: string; a: string };

const AREA_ICONS = ["face_6", "face", "face_retouching_natural", "account_circle"];

export default function SakalEkimiPage() {
  const t = useTranslations("pages.beard");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const areas = t.raw("areas.items") as AreaItem[];
  const suitable = t.raw("candidates.suitable") as string[];
  const careful = t.raw("candidates.careful") as string[];
  const howSteps = t.raw("how.steps") as StepItem[];
  const processRows = t.raw("process.rows") as ProcessRow[];
  const faqItems = t.raw("faq.items") as FaqItem[];

  return (
    <section className="pt-28">

      {/* HERO */}
      <div className="py-20 px-6 max-w-4xl mx-auto">
        <nav className="text-sm text-on-surface-variant mb-8 tracking-wider">
          <Link href="/" className="hover:text-primary transition-colors">{t("breadcrumb.home")}</Link>
          <span className="mx-2">›</span>
          <span className="text-on-surface">{t("breadcrumb.current")}</span>
        </nav>
        <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("hero.eyebrow")}</span>
        <h1 className="font-headline text-4xl md:text-6xl leading-tight mb-8">{t("hero.title")}<br /><span className="italic text-primary/80">{t("hero.titleItalic")}</span></h1>
        <p className="text-on-surface/70 text-lg leading-relaxed max-w-2xl mb-8">{t("hero.lede")}</p>
        <div className="flex flex-wrap gap-6 text-sm text-on-surface/60">
          <span><strong className="text-on-surface">{t("hero.stat1.value")}</strong> {t("hero.stat1.label")}</span>
          <span><strong className="text-on-surface">{t("hero.stat2.value")}</strong> {t("hero.stat2.label")}</span>
          <span><strong className="text-on-surface">{t("hero.stat3.value")}</strong> {t("hero.stat3.label")}</span>
        </div>
      </div>

      {/* AEO DIRECT ANSWER */}
      <section className="px-6 mb-16 max-w-4xl mx-auto">
        <div className="bg-primary/5 border-l-2 border-primary rounded-sm p-8">
          <h2 className="font-headline text-xl mb-4 text-primary">{t("shortAnswer.title")}</h2>
          <p className="text-on-surface/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw("shortAnswer.body") }} />
        </div>
      </section>

      {/* BÖLGELER */}
      <section className="py-16 px-6 bg-surface-container-low">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-headline text-3xl mb-4">{t("areas.title")}</h2>
          <p className="text-on-surface/70 mb-12 max-w-2xl">{t("areas.lede")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {areas.map((area, i) => (
              <div key={i} className="bg-surface-container-high p-6 rounded-sm">
                <span className="material-symbols-outlined text-primary/70 text-2xl mb-3 block">{AREA_ICONS[i]}</span>
                <h3 className="font-headline text-lg mb-2">{area.title}</h3>
                <p className="text-sm text-on-surface/60 mb-3">{area.tag}</p>
                <p className="text-[11px] text-on-surface/70 leading-relaxed">{area.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KİMLER İÇİN */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="font-headline text-3xl mb-10">{t("candidates.title")}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-surface-container-high p-8 rounded">
            <h3 className="font-headline text-lg mb-4 text-primary">{t("candidates.suitableTitle")}</h3>
            <ul className="space-y-3 text-on-surface/80 text-sm">
              {suitable.map((item, i) => (
                <li key={i} className="flex items-start gap-3"><span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check_circle</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-surface-container-high p-8 rounded">
            <h3 className="font-headline text-lg mb-4 text-on-surface/60">{t("candidates.carefulTitle")}</h3>
            <ul className="space-y-3 text-on-surface/70 text-sm">
              {careful.map((item, i) => (
                <li key={i} className="flex items-start gap-3"><span className="material-symbols-outlined text-on-surface/60 text-[16px] mt-0.5">info</span>{item}</li>
              ))}
            </ul>
            <p className="text-sm text-on-surface/60 mt-4"><Link href="/uygun-degil" className="text-primary hover:underline">{t("candidates.footerLink")}</Link></p>
          </div>
        </div>
      </section>

      {/* NASIL YAPILIR */}
      <section className="py-16 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-10">{t("how.title")}</h2>
          <div className="space-y-0">
            {howSteps.map((step, i) => {
              const isLast = i === howSteps.length - 1;
              return (
                <div key={i} className={`flex gap-6 items-start ${!isLast ? 'pb-10 relative' : ''}`}>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full ${isLast ? "bg-primary text-on-primary" : "bg-primary/10 text-primary"} flex items-center justify-center font-headline text-lg`}>{i + 1}</div>
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

      {/* SÜREÇ TABLOSU */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="font-headline text-3xl mb-10">{t("process.title")}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-outline-variant/20 text-left">
                <th className="py-3 pr-4 text-primary font-label uppercase tracking-wider text-sm">{t("process.headers.stage")}</th>
                <th className="py-3 text-primary font-label uppercase tracking-wider text-sm">{t("process.headers.detail")}</th>
              </tr>
            </thead>
            <tbody className="text-on-surface/75">
              {processRows.map((row, i) => (
                <tr key={i} className={i < processRows.length - 1 ? "border-b border-outline-variant/10" : ""}>
                  <td className="py-3 pr-4">{row.stage}</td>
                  <td className="py-3">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* VAKA REFERANS */}
      <section className="py-16 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-6">{t("case.title")}</h2>
          <div className="bg-surface-container-high p-8 rounded-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] tracking-widest uppercase text-primary/70 block mb-2">{t("case.tag")}</span>
                <h3 className="font-headline text-xl mb-2">{t("case.caseTitle")}</h3>
                <p className="text-sm text-on-surface/70">{t("case.caseSubtitle")}</p>
              </div>
              <Link href="/vaka/dhi-sakal-1800-greft" className="text-primary text-sm uppercase tracking-wider hover:underline whitespace-nowrap">{t("case.linkText")}</Link>
            </div>
          </div>
          <p className="text-sm text-on-surface/50 mt-4 text-center">{t("case.footnote")}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
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
                <div className="text-sm text-on-surface/75 leading-relaxed pt-4">{item.a}</div>
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
            <Link href="/sac-analizi" className="bg-primary text-on-primary px-10 py-4 text-sm font-label uppercase tracking-widest rounded-sm hover:bg-primary-container transition-all">{t("cta.primary")}</Link>
            <Link href="/greft-hesaplama" className="border border-primary/40 text-primary px-10 py-4 text-sm font-label uppercase tracking-widest rounded-sm hover:bg-primary/10 transition-all">{t("cta.secondary")}</Link>
            <a href="https://wa.me/905539784242?text=Merhaba%2C%20sakal%20ekimi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." className="border border-outline-variant/30 text-on-surface/80 px-10 py-4 text-sm font-label uppercase tracking-widest rounded-sm hover:border-primary/40 hover:text-primary transition-all">{t("cta.whatsapp")}</a>
          </div>
        </div>
      </section>

    </section>
  );
}
