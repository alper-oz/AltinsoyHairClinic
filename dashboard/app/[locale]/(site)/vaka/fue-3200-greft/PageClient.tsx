"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const PROFILE_FIELDS = [
  { labelKey: "ageLabel", valueKey: "ageValue" },
  { labelKey: "genderLabel", valueKey: "genderValue" },
  { labelKey: "norwoodLabel", valueKey: "norwoodValue" },
  { labelKey: "techniqueLabel", valueKey: "techniqueValue" },
  { labelKey: "graftsLabel", valueKey: "graftsValue" },
  { labelKey: "followUpLabel", valueKey: "followUpValue" },
] as const;

const RECOVERY_STEPS = [
  { key: "s1", icon: "surgical" },
  { key: "s2", icon: "healing" },
  { key: "s3", icon: "psychiatry" },
  { key: "s4", icon: "verified", highlight: true },
] as const;

const FAQ_KEYS = ["q1", "q2", "q3"] as const;

export default function FUE3200GreftPage() {
  const t = useTranslations("pages.caseFue");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="pt-28">
      {/* HERO */}
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-on-surface-variant mb-8 tracking-wider">
            <Link href="/" className="hover:text-primary transition-colors">
              {t("breadcrumb.home")}
            </Link>
            <span className="mx-2">&gt;</span>
            <Link
              href="/oncesi-sonrasi"
              className="hover:text-primary transition-colors"
            >
              {t("breadcrumb.results")}
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-on-surface">{t("breadcrumb.current")}</span>
          </nav>
          <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">
            {t("hero.eyebrow")}
          </span>
          <h1 className="font-headline text-4xl md:text-6xl leading-tight mb-8">
            {t("hero.title")}{" "}
            <span className="italic text-primary/80">
              {t("hero.titleAccent")}
            </span>
          </h1>
          <p className="text-on-surface/70 text-lg leading-relaxed max-w-2xl">
            {t("hero.subtitle")}
          </p>
        </div>
      </div>

      {/* HASTA PROFİLİ */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-8">{t("profile.title")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PROFILE_FIELDS.map((field) => (
              <div
                key={field.labelKey}
                className="bg-surface-container-high p-6 rounded"
              >
                <p className="text-sm text-on-surface/50 uppercase tracking-widest mb-2">
                  {t(`profile.${field.labelKey}`)}
                </p>
                <p className="font-headline text-2xl text-primary">
                  {t(`profile.${field.valueKey}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GÖRSEL PLACEHOLDER */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-8">
            {t("media.title")}
          </h2>
          <div className="bg-surface-container-high rounded h-64 flex flex-col items-center justify-center gap-4">
            <span className="material-symbols-outlined text-primary/40 text-5xl">
              image
            </span>
            <p className="text-on-surface/50 text-sm">
              {t("media.placeholder")}
            </p>
          </div>
          <p className="text-sm text-on-surface/50 mt-4 text-center">
            {t("media.consent")}
          </p>
        </div>
      </section>

      {/* İYİLEŞME SÜRECİ */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-12">{t("recovery.title")}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {RECOVERY_STEPS.map((step) => (
              <div
                key={step.key}
                className="bg-surface-container-high p-6 rounded text-center"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    "highlight" in step && step.highlight
                      ? "bg-primary text-on-primary"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <span className="material-symbols-outlined">{step.icon}</span>
                </div>
                <h3 className="font-headline text-lg mb-2">{t(`recovery.${step.key}.title`)}</h3>
                <p className="text-on-surface/60 text-sm leading-relaxed">
                  {t(`recovery.${step.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SONUÇ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-6">{t("result.title")}</h2>
          <p className="text-on-surface/70 text-sm leading-relaxed max-w-2xl">
            {t("result.body")}
          </p>
          <p className="text-sm text-on-surface/50 mt-6">
            {t("result.disclaimer")}
          </p>
        </div>
      </section>

      {/* SSS */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl mb-12">
            {t("faq.title")}
          </h2>
          {FAQ_KEYS.map((k, i) => (
            <div
              key={k}
              className={`cursor-pointer border-b border-outline-variant/10 pb-6 mb-6 ${
                i === FAQ_KEYS.length - 1 ? "border-b-0" : ""
              }`}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="flex justify-between items-center gap-4">
                <h3 className="text-sm font-medium">{t(`faq.${k}.question`)}</h3>
                <span
                  className="transition-transform duration-300 text-primary text-lg flex-shrink-0"
                  style={{
                    transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </div>
              {openFaq === i && (
                <div className="text-sm text-on-surface/70 leading-relaxed pt-4">
                  {t(`faq.${k}.answer`)}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-surface-container-lowest">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-headline text-3xl mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-on-surface/70 mb-8 text-sm leading-relaxed">
            {t("cta.body")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sac-analizi"
              className="bg-primary text-on-primary px-10 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary-container transition-all"
            >
              {t("cta.primary")}
            </Link>
            <Link
              href="/oncesi-sonrasi"
              className="border border-primary/20 text-primary px-10 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary/5 transition-all"
            >
              {t("cta.secondary")}
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
