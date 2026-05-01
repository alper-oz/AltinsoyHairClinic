import { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];

/**
 * DB satırından locale-aware bir metin alanı seçer.
 *
 * Konvansiyon: temel sütun (örn. `title`) TR içeriği tutar; EN/AR çevirileri
 * `<field>_en` ve `<field>_ar` sütunlarında yer alır. Belirli bir locale için
 * çeviri boş ya da yoksa TR'ye düşülür — böylece henüz çevrilmemiş içerikler
 * site dışına TR olarak görünür (boş string yerine).
 */
export function pickField<T extends Record<string, unknown>>(
  row: T | null | undefined,
  field: keyof T & string,
  locale: string,
): string | null {
  if (!row) return null;
  const trValue = row[field] as string | null | undefined;
  if (locale === routing.defaultLocale) {
    return (trValue ?? null) || null;
  }
  if (!routing.locales.includes(locale as Locale)) {
    return trValue ?? null;
  }
  const localizedKey = `${field}_${locale}` as keyof T & string;
  const localized = row[localizedKey] as string | null | undefined;
  if (localized && localized.trim() !== "") return localized;
  return (trValue ?? null) || null;
}

/**
 * Aynı row'dan birden fazla alanı locale-aware seçer.
 */
export function pickFields<T extends Record<string, unknown>>(
  row: T | null | undefined,
  fields: ReadonlyArray<keyof T & string>,
  locale: string,
): Record<string, string | null> {
  const out: Record<string, string | null> = {};
  for (const f of fields) out[f] = pickField(row, f, locale);
  return out;
}
