import Script from "next/script";
import { getLocale } from "next-intl/server";
import IletisimPage from "./PageClient";
import { getSocialLinks } from "@/lib/social";

export const dynamic = "force-dynamic";

const CLINIC_DESCRIPTIONS: Record<string, string> = {
  tr: "Altınsoy Hair Clinic — saç, sakal ve kaş restorasyon kliniği",
  en: "Altınsoy Hair Clinic — hair, beard and eyebrow restoration clinic",
  ar: "عيادة ألتنصوي — عيادة لزراعة الشعر واللحية والحواجب",
};

export default async function Page() {
  const locale = await getLocale();
  const socialLinks = await getSocialLinks();
  const activeLinks = socialLinks.filter(l => l.active && l.url);

  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Altınsoy Hair Clinic",
    "description": CLINIC_DESCRIPTIONS[locale] ?? CLINIC_DESCRIPTIONS.tr,
    "telephone": "+905539784242",
    "email": "info@altinsoy.com",
    "address": { "@type": "PostalAddress", "addressLocality": "İstanbul", "addressCountry": "TR" },
    "openingHours": "Mo-Sa 09:00-18:00",
    "url": "https://altinsoy.com",
  };

  return (
    <>
      <Script id="schema-iletisim-clinic" type="application/ld+json">{JSON.stringify(clinicSchema)}</Script>
      <IletisimPage socialLinks={activeLinks} />
    </>
  );
}
