import Script from "next/script";
import { getTranslations } from "next-intl/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import OncesiSonrasiClient, { type CaseStudy } from "./PageClient";

async function getCases(): Promise<CaseStudy[]> {
  try {
    const { data } = await supabaseAdmin
      .from("case_studies")
      .select("id, title, procedure, technique, grafts, duration, age, gender, before_url, after_url, sort_order")
      .eq("visible", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    return (data ?? []) as CaseStudy[];
  } catch {
    return [];
  }
}

async function getPageFaqs() {
  try {
    const { data } = await supabaseAdmin
      .from("faqs")
      .select("id, question, answer")
      .eq("page", "oncesi-sonrasi")
      .eq("visible", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    return (data ?? []) as { id: string; question: string; answer: string }[];
  } catch {
    return [];
  }
}

export default async function OncesiSonrasiPage() {
  const [cases, faqs] = await Promise.all([getCases(), getPageFaqs()]);

  const t = await getTranslations("pages.beforeAfter");
  const tFaq = await getTranslations("pages.beforeAfter.faq");
  type FaqItem = { q: string; a: string };
  const faqItems = tFaq.raw("items") as FaqItem[];

  const procedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: t("schema.procedureName"),
    description: t("schema.procedureDescription"),
    procedureType: "https://schema.org/SurgicalProcedure",
    followup: t("schema.followup"),
  };

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: t("schema.galleryName"),
    description: t("schema.galleryDescription"),
    url: "https://altinsoy.com/oncesi-sonrasi",
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
      <Script id="schema-procedure" type="application/ld+json">{JSON.stringify(procedureSchema)}</Script>
      <Script id="schema-gallery" type="application/ld+json">{JSON.stringify(gallerySchema)}</Script>
      <Script id="schema-faq" type="application/ld+json">{JSON.stringify(faqSchema)}</Script>
      <OncesiSonrasiClient cases={cases} faqs={faqs} />
    </>
  );
}
