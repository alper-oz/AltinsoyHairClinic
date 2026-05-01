import { unstable_cache } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * Toggle ile pasifleştirilemeyen sayfalar:
 * - Anasayfa: site komple ölmesin
 * - Yasal sayfalar: KVKK/GDPR uyumu için her zaman erişilebilir olmalı
 */
export const LOCKED_PATHS = [
  "/",
  "/kvkk-aydinlatma",
  "/gizlilik-politikasi",
  "/cerez-politikasi",
] as const;

/**
 * Sitemap admin'inde gösterilen + middleware'in kontrol ettiği tüm internal pathname'ler.
 * routing.pathnames ile senkron tutulmalı.
 */
export const ALL_PATHS = [
  "/",
  "/sac-ekimi",
  "/sac-ekimi/fue",
  "/sac-ekimi/dhi",
  "/sac-ekimi/sapphire",
  "/sakal-ekimi",
  "/kas-ekimi",
  "/fue-vs-dhi",
  "/sac-analizi",
  "/fiyat",
  "/fiyat-hesaplama",
  "/greft-hesaplama",
  "/oncesi-sonrasi",
  "/iletisim",
  "/uygun-degil",
  "/vaka/dhi-sakal-1800-greft",
  "/vaka/fue-3200-greft",
  "/vaka/kas-restorasyonu-400-greft",
  "/kvkk-aydinlatma",
  "/gizlilik-politikasi",
  "/cerez-politikasi",
  "/client-data",
] as const;

export type InternalPath = (typeof ALL_PATHS)[number];

export interface PageSetting {
  path: string;
  active: boolean;
  updated_at: string;
}

export function isLocked(path: string): boolean {
  return (LOCKED_PATHS as readonly string[]).includes(path);
}

/**
 * Admin için: tüm satırları döner. Her ALL_PATHS için varsayılan {active: true}
 * sağlar — DB'de henüz seed edilmemiş path'ler de listede görünür.
 */
export async function getAllPageSettings(): Promise<PageSetting[]> {
  const { data } = await supabaseAdmin
    .from("page_settings")
    .select("*");

  const byPath = new Map((data ?? []).map((r) => [r.path, r as PageSetting]));
  const now = new Date().toISOString();
  return ALL_PATHS.map((p) => byPath.get(p) ?? { path: p, active: true, updated_at: now });
}

/**
 * Public middleware için: hızlı, cache'li lookup. 60 saniyede bir revalidate.
 * Admin toggle değiştirdiğinde PATCH endpoint revalidateTag tetikler.
 *
 * Migration uygulanmamışsa (tablo yok) sessizce boş map döner — site çalışmaya
 * devam eder, hiçbir sayfa pasif değilmiş gibi davranır.
 */
export const getActivePathMap = unstable_cache(
  async (): Promise<Record<string, boolean>> => {
    try {
      const { data, error } = await supabaseAdmin
        .from("page_settings")
        .select("path, active");
      if (error) return {};
      const out: Record<string, boolean> = {};
      for (const row of data ?? []) out[row.path] = row.active !== false;
      return out;
    } catch {
      return {};
    }
  },
  ["page-settings-active-map"],
  { revalidate: 60, tags: ["page-settings"] },
);
