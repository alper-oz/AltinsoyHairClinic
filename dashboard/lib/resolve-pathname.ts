import { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];

/**
 * URL pathname'ini routing.pathnames'deki **internal** key'e çevirir.
 * Locale prefix kaldırılır; eşleşen pathname mapping bulunup TR (canonical) key'i döner.
 *
 * Örnekler:
 *   "/sac-ekimi"                  → { internal: "/sac-ekimi", locale: "tr" }
 *   "/en/hair-transplant"         → { internal: "/sac-ekimi", locale: "en" }
 *   "/ar/زراعة-الشعر"             → { internal: "/sac-ekimi", locale: "ar" }
 *   "/ar/%D8%B2%D8%B1%D8%A7%..."  → { internal: "/sac-ekimi", locale: "ar" }  (URL-encoded AR)
 *   "/api/leads"                  → null (mapping yok)
 */
export function resolveInternalPathname(
  rawPathname: string,
): { internal: string; locale: Locale } | null {
  if (!rawPathname) return null;

  // Decode (Arapça URL'ler %D8...)
  let pathname: string;
  try {
    pathname = decodeURIComponent(rawPathname);
  } catch {
    pathname = rawPathname;
  }

  // Locale prefix tespiti
  let locale: Locale = routing.defaultLocale;
  let withoutLocale = pathname;
  for (const l of routing.locales) {
    if (l === routing.defaultLocale) continue;
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) {
      locale = l;
      withoutLocale = pathname.slice(`/${l}`.length) || "/";
      break;
    }
  }

  // Trailing slash normalize (root hariç)
  if (withoutLocale.length > 1 && withoutLocale.endsWith("/")) {
    withoutLocale = withoutLocale.slice(0, -1);
  }

  // pathnames mapping üzerinde ara
  const pathnames = routing.pathnames as Record<
    string,
    string | Record<Locale, string>
  >;

  for (const [internal, value] of Object.entries(pathnames)) {
    const target = typeof value === "string" ? value : value[locale];
    if (target === withoutLocale) {
      return { internal, locale };
    }
  }

  // Mapping'de yoksa: withoutLocale'ı internal olarak kabul et (pathnames'de tanımlı olmayan path)
  // — admin'de listelenmediği için bu durum nadirdir. null dönmek daha güvenli:
  return null;
}
