import Script from "next/script";
import { getTranslations } from "next-intl/server";
import UygunDegilPageClient from "./PageClient";

export default async function UygunDegilPage() {
  const t = await getTranslations("pages.notEligible");
  const tFaq = await getTranslations("pages.notEligible.faq");

  type FaqItem = { q: string; a: string };
  const faqItems = tFaq.raw("items") as FaqItem[];

  const medicalWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: t("schema.name"),
    description: t("schema.description"),
    medicalAudience: { "@type": "Patient" },
    specialty: "Dermatology",
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
      <Script
        id="schema-medical"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }}
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <UygunDegilPageClient />
    </>
  );
}
