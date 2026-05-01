import Script from "next/script";
import { getTranslations } from "next-intl/server";
import DhiPage from "./PageClient";

export default async function Page() {
  const t = await getTranslations("pages.dhi");
  const tFaq = await getTranslations("pages.dhi.faq");

  type FaqItem = { q: string; a: string };
  const faqItems = tFaq.raw("items") as FaqItem[];

  const dhiProcedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: t("schema.procedureName"),
    description: t("schema.procedureDescription"),
    howPerformed: t("schema.howPerformed"),
    procedureType: "https://schema.org/SurgicalProcedure",
  };
  const dhiFaqSchema = {
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
      <Script id="schema-dhi-procedure" type="application/ld+json">{JSON.stringify(dhiProcedureSchema)}</Script>
      <Script id="schema-dhi-faq" type="application/ld+json">{JSON.stringify(dhiFaqSchema)}</Script>
      <DhiPage />
    </>
  );
}
