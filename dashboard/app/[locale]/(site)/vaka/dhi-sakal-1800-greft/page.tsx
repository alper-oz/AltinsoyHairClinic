import Script from "next/script";
import { getLocale, getTranslations } from "next-intl/server";
import DHISakal1800GreftPage from "./PageClient";

const FAQ_KEYS = ["q1", "q2", "q3"] as const;

export default async function Page() {
  const [locale, tSchema, tFaq] = await Promise.all([
    getLocale(),
    getTranslations("pages.caseDhiBeard.schema"),
    getTranslations("pages.caseDhiBeard.faq"),
  ]);

  const procedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: tSchema("procedureName"),
    description: tSchema("procedureDescription"),
    howPerformed: tSchema("howPerformed"),
    procedureType: "https://schema.org/SurgicalProcedure",
    inLanguage: locale,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: FAQ_KEYS.map((k) => ({
      "@type": "Question",
      name: tFaq(`${k}.question`),
      acceptedAnswer: { "@type": "Answer", text: tFaq(`${k}.answer`) },
    })),
  };

  return (
    <>
      <Script id="schema-dhi-sakal-procedure" type="application/ld+json">{JSON.stringify(procedureSchema)}</Script>
      <Script id="schema-dhi-sakal-faq"       type="application/ld+json">{JSON.stringify(faqSchema)}</Script>
      <DHISakal1800GreftPage />
    </>
  );
}
