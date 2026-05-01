import type { Metadata } from "next";
import Script from "next/script";
import { getLocale, getTranslations } from "next-intl/server";
import HomePageClient from "./HomePageClient";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { buildPageMetadata } from "@/lib/i18n-metadata";
import { pickField } from "@/lib/i18n-content";

export function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("home", "/");
}

async function getHeroConfig(locale: string) {
  try {
    const { data } = await supabaseAdmin
      .from("hero_config")
      .select("*")
      .limit(1)
      .single();
    if (!data) return null;
    return {
      eyebrow:         pickField(data, "eyebrow", locale),
      headline:        pickField(data, "headline", locale) ?? data.headline,
      headline_italic: pickField(data, "headline_italic", locale),
      body:            pickField(data, "body", locale),
      cta_label:       pickField(data, "cta_label", locale),
      cta_href:        data.cta_href ?? null,
      image_url:       data.image_url ?? null,
    };
  } catch {
    return null;
  }
}

async function getCarouselCases(locale: string) {
  try {
    const { data } = await supabaseAdmin
      .from("case_studies")
      .select("*")
      .eq("visible", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(6);
    return (data ?? []).map((c) => ({
      id: c.id,
      title:     pickField(c, "title", locale) ?? c.title,
      procedure: c.procedure,
      technique: c.technique,
      grafts:    c.grafts,
      duration:  c.duration,
      age:       c.age,
      gender:    c.gender,
      after_url:  c.after_url,
      before_url: c.before_url,
    }));
  } catch {
    return [];
  }
}

async function getHomepageFaqs(locale: string) {
  try {
    const { data } = await supabaseAdmin
      .from("faqs")
      .select("*")
      .eq("page", "homepage")
      .eq("visible", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    return (data ?? []).map((f) => ({
      id: f.id,
      question: pickField(f, "question", locale) ?? f.question,
      answer:   pickField(f, "answer", locale) ?? f.answer,
    }));
  } catch {
    return [];
  }
}

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5"] as const;

export default async function Page() {
  const locale = await getLocale();
  const [hero, cases, faqs, tFaq, tMeta, tCommon] = await Promise.all([
    getHeroConfig(locale),
    getCarouselCases(locale),
    getHomepageFaqs(locale),
    getTranslations("pages.home.faq"),
    getTranslations("meta.home"),
    getTranslations("meta.site"),
  ]);

  // Locality for clinic name + address still TR (clinic is physically in İstanbul, TR).
  const localityByLocale: Record<string, string> = {
    tr: "İstanbul",
    en: "Istanbul",
    ar: "إسطنبول",
  };

  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: tCommon("siteName"),
    description: tMeta("description"),
    url: "https://altinsoy.com",
    telephone: "+905539784242",
    address: {
      "@type": "PostalAddress",
      addressLocality: localityByLocale[locale] ?? "İstanbul",
      addressCountry: "TR",
    },
    inLanguage: locale,
    medicalSpecialty: "Hair Restoration",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "850",
      bestRating: "5",
    },
    memberOf: {
      "@type": "Organization",
      name: "ISHRS - International Society of Hair Restoration Surgery",
    },
  };

  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: FAQ_KEYS.map((k) => ({
      "@type": "Question",
      name: tFaq(`${k}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: tFaq(`${k}.answer`),
      },
    })),
  };

  return (
    <>
      <Script id="schema-clinic"   type="application/ld+json">{JSON.stringify(clinicSchema)}</Script>
      <Script id="schema-home-faq" type="application/ld+json">{JSON.stringify(homeFaqSchema)}</Script>
      <HomePageClient hero={hero} cases={cases} faqs={faqs} />
    </>
  );
}
