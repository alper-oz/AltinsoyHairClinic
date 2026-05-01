import Script from "next/script";
import { getTranslations } from "next-intl/server";
import SacEkimiPage from "./PageClient";

export default async function Page() {
  const t = await getTranslations("pages.hairTransplant");
  const tFaq = await getTranslations("pages.hairTransplant.faq");

  type FaqItem = { q: string; a: string };
  const faqItems = tFaq.raw("items") as FaqItem[];

  const procedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: t("schema.procedureName"),
    description: t("schema.procedureDescription"),
    howPerformed: t("schema.howPerformed"),
    procedureType: "https://schema.org/SurgicalProcedure",
    body: { "@type": "AnatomicalStructure", name: t("schema.bodyName") },
    followup: t("schema.followup"),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <Script id="schema-sac-ekimi-procedure" type="application/ld+json">{JSON.stringify(procedureSchema)}</Script>
      <Script id="schema-sac-ekimi-faq" type="application/ld+json">{JSON.stringify(faqSchema)}</Script>
      <SacEkimiPage />
    </>
  );
}
