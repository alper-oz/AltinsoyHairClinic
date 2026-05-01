import { supabaseAdmin } from "./supabase/admin";

export type Platform = "instagram" | "facebook" | "x" | "gmail" | "whatsapp" | "google_maps";

export interface SocialLink {
  platform: Platform;
  url: string;
  active: boolean;
}

export const PLATFORM_META: Record<Platform, { label: string; placeholder: string; prefix?: string }> = {
  instagram:   { label: "Instagram",    placeholder: "https://instagram.com/altinsoyhair"           },
  facebook:    { label: "Facebook",     placeholder: "https://facebook.com/altinsoyhair"            },
  x:           { label: "X (Twitter)", placeholder: "https://x.com/altinsoyhair"                   },
  gmail:       { label: "E-posta",      placeholder: "info@altinsoy.com"                            },
  whatsapp:    { label: "WhatsApp",     placeholder: "905539784242", prefix: "https://wa.me/"        },
  google_maps: { label: "Google Maps",  placeholder: "https://maps.google.com/?q=Altinsoy+Clinic"   },
};

export const ALL_PLATFORMS: Platform[] = ["instagram", "facebook", "x", "gmail", "whatsapp", "google_maps"];

/** Server-side: tüm linkleri çeker, yoksa boş defaults döner */
export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const { data } = await supabaseAdmin
      .from("social_links")
      .select("platform, url, active");
    if (!data || data.length === 0) return defaultLinks();
    // DB'de eksik platform varsa default ile tamamla
    const map = new Map(data.map(r => [r.platform, r]));
    return ALL_PLATFORMS.map(p => map.get(p) ?? { platform: p, url: "", active: false });
  } catch {
    return defaultLinks();
  }
}

/** Belirli bir platformun URL'sini çeker (null → aktif değil/yok) */
export async function getSocialUrl(platform: Platform): Promise<string | null> {
  try {
    const { data } = await supabaseAdmin
      .from("social_links")
      .select("url, active")
      .eq("platform", platform)
      .single();
    if (!data || !data.active || !data.url) return null;
    return data.url;
  } catch {
    return null;
  }
}

function defaultLinks(): SocialLink[] {
  return ALL_PLATFORMS.map(p => ({ platform: p, url: "", active: false }));
}
