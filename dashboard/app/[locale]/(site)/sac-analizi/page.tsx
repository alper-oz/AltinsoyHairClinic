import Script from "next/script";
import { getLocale, getTranslations } from "next-intl/server";
import SacAnaliziPage from "./PageClient";

export default async function Page() {
  const locale = await getLocale();
  const tMeta = await getTranslations("meta.sacAnalizi");

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "inLanguage": locale,
    "name": tMeta("title"),
    "description": tMeta("description"),
    "provider": { "@type": "MedicalClinic", "name": "Altınsoy Hair Clinic", "telephone": "+905539784242" },
  };

  return (
    <>
      <Script id="schema-sac-analizi" type="application/ld+json">{JSON.stringify(pageSchema)}</Script>
      <SacAnaliziPage />
    </>
  );
}
