import Script from "next/script";
import { getTranslations } from "next-intl/server";
import FuePage from "./PageClient";

export default async function Page() {
  const t = await getTranslations("pages.fue");
  const tFaq = await getTranslations("pages.fue.faq");

  type FaqItem = { q: string; a: string };
  const faqItems = tFaq.raw("items") as FaqItem[];

  const fueProcedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: t("schema.procedureName"),
    description: t("schema.procedureDescription"),
    howPerformed: t("schema.howPerformed"),
    procedureType: "https://schema.org/SurgicalProcedure",
  };
  const fueFaqSchema = {
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
      <Script id="schema-fue-procedure" type="application/ld+json">{JSON.stringify(fueProcedureSchema)}</Script>
      <Script id="schema-fue-faq" type="application/ld+json">{JSON.stringify(fueFaqSchema)}</Script>
      <FuePage />
    </>
  );
}
