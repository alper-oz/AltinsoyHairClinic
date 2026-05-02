import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];

/**
 * Production canonical URL.
 * - `NEXT_PUBLIC_SITE_URL` set ise (custom domain bağlandıktan sonra) onu kullan.
 * - Değilse Vercel'in otomatik enjekte ettiği `VERCEL_URL`'e düş (preview deploy'larda).
 * - Local development'ta her ikisi de yoksa altinsoy.com placeholder.
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://altinsoy.com");

/**
 * Locale-aware metadata builder.
 *
 * Reads `meta.<page>.title` and `meta.<page>.description` from the active
 * locale's messages, generates `alternates.languages` for hreflang, and sets
 * Open Graph + Twitter cards.
 *
 * `pathKey` is the internal pathname (e.g. "/sac-ekimi"); the helper looks up
 * each locale's external slug from `routing.pathnames` to build canonical and
 * alternate URLs.
 */
export async function buildPageMetadata(
  page: string,
  pathKey: keyof typeof routing.pathnames | "/"
): Promise<Metadata> {
  const t = await getTranslations(`meta.${page}`);
  const tCommon = await getTranslations("meta.site");

  const pathEntry = routing.pathnames[pathKey as keyof typeof routing.pathnames];

  function urlFor(locale: Locale): string {
    const slug =
      typeof pathEntry === "string"
        ? pathEntry
        : (pathEntry as Record<Locale, string>)[locale];
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    return `${SITE_URL}${prefix}${slug === "/" ? "" : slug}`;
  }

  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = urlFor(locale);
  }
  languages["x-default"] = urlFor(routing.defaultLocale);

  const title = t("title");
  const description = t("description");
  const siteName = tCommon("siteName");

  return {
    title,
    description,
    alternates: {
      canonical: urlFor((await getCurrentLocale()) ?? routing.defaultLocale),
      languages,
    },
    openGraph: {
      title,
      description,
      url: urlFor((await getCurrentLocale()) ?? routing.defaultLocale),
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

async function getCurrentLocale(): Promise<Locale | null> {
  try {
    const { getLocale } = await import("next-intl/server");
    const l = await getLocale();
    return routing.locales.includes(l as Locale) ? (l as Locale) : null;
  } catch {
    return null;
  }
}
