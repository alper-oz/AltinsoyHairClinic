import Script from "next/script";
import { getTranslations } from "next-intl/server";
import FueVsDhiPageClient from "./PageClient";

export default async function Page() {
  const t = await getTranslations("pages.fueVsDhi");
  const tFaq = await getTranslations("pages.fueVsDhi.faq");

  type FaqItem = { q: string; a: string };
  const faqItems = tFaq.raw("items") as FaqItem[];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: t("schema.articleName"),
    headline: t("schema.articleHeadline"),
    description: t("schema.articleDescription"),
    author: { "@type": "Organization", name: "Altınsoy Hair Clinic" },
    publisher: { "@type": "Organization", name: "Altınsoy Hair Clinic" },
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
      <Script id="schema-article" type="application/ld+json">{JSON.stringify(articleSchema)}</Script>
      <Script id="schema-faq" type="application/ld+json">{JSON.stringify(faqSchema)}</Script>
      <FueVsDhiPageClient />
    </>
  );
}
