"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type FactItem = { label: string; value: string };
type ProsConItem = { title: string; desc: string };
type CompareRow = { feature: string; sapphire: string; standard: string };
type RecoveryItem = { title: string; body: string };
type FaqItem = { q: string; a: string };

const FACT_ICONS = ["science", "schedule", "healing", "calendar_month", "verified"];
const PROS_ICONS = ["content_cut", "healing", "precision_manufacturing", "spa"];
const CONS_ICONS = ["balance", "person", "payments", "compare"];
const RECOVERY_ICONS = ["surgical", "healing", "psychiatry", "verified"];

export default function SapphirePage() {
  const t = useTranslations("pages.sapphire");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const facts = t.raw("what.facts") as FactItem[];
  const advantageItems = t.raw("diff.advantageItems") as string[];
  const limitsItems = t.raw("diff.limitsItems") as string[];
  const pros = t.raw("prosCons.pros") as ProsConItem[];
  const cons = t.raw("prosCons.cons") as ProsConItem[];
  const compareRows = t.raw("compare.rows") as CompareRow[];
  const recoveryItems = t.raw("recovery.items") as RecoveryItem[];
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
          <h1 className="font-headline text-4xl md:text-6xl leading-tight mb-8">{t("hero.title")}<br /><span className="italic text-primary/80">{t("hero.titleItalic")}</span></h1>
          <p className="text-on-surface/70 text-lg leading-relaxed max-w-2xl">{t("hero.lede")}</p>
        </div>
      </div>

      {/* SAPPHIRE FUE NEDIR */}
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
              <h3 className="font-headline text-lg mb-4 text-primary">{t("what.factsTitle")}</h3>
              <ul className="space-y-4 text-sm">
                {facts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">{FACT_ICONS[i]}</span>
                    <div><strong className="text-on-surface">{fact.label}:</strong> <span className="text-on-surface/70">{fact.value}</span></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SAPPHIRE FARKI */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-4">{t("diff.title")}</h2>
          <p className="text-on-surface/70 mb-10 max-w-2xl text-sm leading-relaxed">{t("diff.lede")}</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-surface-container-high p-8 rounded">
              <h3 className="font-headline text-lg mb-4 text-primary">{t("diff.advantageTitle")}</h3>
              <p className="text-on-surface/70 text-sm leading-relaxed mb-4">{t("diff.advantageIntro")}</p>
              <ul className="space-y-3 text-on-surface/80 text-sm">
                {advantageItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check_circle</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-container-high p-8 rounded">
              <h3 className="font-headline text-lg mb-4 text-on-surface/60">{t("diff.limitsTitle")}</h3>
              <p className="text-on-surface/70 text-sm leading-relaxed mb-4">{t("diff.limitsIntro")}</p>
              <ul className="space-y-3 text-on-surface/70 text-sm">
                {limitsItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><span className="material-symbols-outlined text-on-surface/60 text-[16px] mt-0.5">info</span>{item}</li>
                ))}
              </ul>
              <p className="text-sm text-on-surface/50 mt-4">{t("diff.limitsFooter")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* NASIL YAPILIR */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-12">{t("how.title")}</h2>
          <p className="text-on-surface/70 text-sm mb-10 max-w-2xl leading-relaxed">{t("how.lede")}</p>
          <div className="space-y-0">
            <div className="flex gap-6 items-start pb-10 relative">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-headline text-lg">1</div>
                <div className="w-px h-full bg-outline-variant/20 mt-2"></div>
              </div>
              <div>
                <h3 className="font-headline text-xl mb-2">{t("how.step1.title")}</h3>
                <p className="text-on-surface/70 text-sm leading-relaxed">{t("how.step1.body")}</p>
              </div>
            </div>
            <div className="flex gap-6 items-start pb-10 relative">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-headline text-lg">2</div>
                <div className="w-px h-full bg-outline-variant/20 mt-2"></div>
              </div>
              <div>
                <h3 className="font-headline text-xl mb-2">{t("how.step2.title")}</h3>
                <p className="text-on-surface/70 text-sm leading-relaxed">{t("how.step2.body")}</p>
              </div>
            </div>
            <div className="flex gap-6 items-start pb-10 relative">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline text-lg">3</div>
                <div className="w-px h-full bg-outline-variant/20 mt-2"></div>
              </div>
              <div>
                <h3 className="font-headline text-xl mb-2">{t("how.step3.title")} <span className="text-primary text-sm">{t("how.step3.highlight")}</span></h3>
                <p className="text-on-surface/70 text-sm leading-relaxed">{t("how.step3.body")}</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-headline text-lg">4</div>
              </div>
              <div>
                <h3 className="font-headline text-xl mb-2">{t("how.step4.title")}</h3>
                <p className="text-on-surface/70 text-sm leading-relaxed">{t("how.step4.body")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AVANTAJLAR VE LIMITLER */}
      <section className="py-20 px-6">
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

      {/* KARSILASTIRMA TABLOSU */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-4">{t("compare.title")}</h2>
          <p className="text-on-surface/70 mb-10 max-w-2xl text-sm leading-relaxed">{t("compare.lede")}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant/20">
                  <th className="text-left py-4 pr-4 font-headline text-on-surface/60 font-normal">{t("compare.headers.feature")}</th>
                  <th className="text-left py-4 px-4 font-headline text-primary font-normal">{t("compare.headers.sapphire")}</th>
                  <th className="text-left py-4 pl-4 font-headline text-on-surface/60 font-normal">{t("compare.headers.standard")}</th>
                </tr>
              </thead>
              <tbody className="text-on-surface/70">
                {compareRows.map((row, i) => (
                  <tr key={i} className="border-b border-outline-variant/10">
                    <td className="py-4 pr-4 text-on-surface font-medium">{row.feature}</td>
                    <td className="py-4 px-4">{row.sapphire}</td>
                    <td className="py-4 pl-4">{row.standard}</td>
                  </tr>
                ))}
                <tr>
                  <td className="py-4 pr-4 text-on-surface font-medium">{t("compare.finalRow.feature")}</td>
                  <td className="py-4 px-4" colSpan={2}>{t("compare.finalRow.value")}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-on-surface/50 mt-6">{t("compare.footer")}</p>
        </div>
      </section>

      {/* SUREC TIMELINE */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-12">{t("recovery.title")}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {recoveryItems.map((card, i) => {
              const highlight = i === recoveryItems.length - 1;
              return (
                <div key={i} className="bg-surface-container-high p-6 rounded text-center">
                  <div className={`w-12 h-12 rounded-full ${highlight ? "bg-primary text-on-primary" : "bg-primary/10 text-primary"} flex items-center justify-center mx-auto mb-4`}>
                    <span className="material-symbols-outlined">{RECOVERY_ICONS[i]}</span>
                  </div>
                  <h3 className="font-headline text-lg mb-2">{card.title}</h3>
                  <p className="text-on-surface/60 text-sm leading-relaxed">{card.body}</p>
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
      <section className="py-20 px-6 bg-surface-container-lowest">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-headline text-3xl mb-4">{t("cta.title")}</h2>
          <p className="text-on-surface/70 mb-8">{t("cta.lede")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sac-analizi" className="bg-primary text-on-primary px-10 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary-container transition-all">{t("cta.primary")}</Link>
            <a href="https://wa.me/905539784242?text=Merhaba%2C%20Sapphire%20FUE%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." className="border border-primary/20 text-primary px-10 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary/5 transition-all">{t("cta.whatsapp")}</a>
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
