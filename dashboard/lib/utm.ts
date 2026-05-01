const UTM_KEY = "altinsoy_utm";

export interface UTMData {
  utm_source:   string | null;
  utm_medium:   string | null;
  utm_campaign: string | null;
  referrer:     string | null;
}

/** URL'deki UTM parametrelerini okur ve sessionStorage'a kaydeder. */
export function captureUTM(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const source   = params.get("utm_source");
  const medium   = params.get("utm_medium");
  const campaign = params.get("utm_campaign");

  // Sadece UTM parametresi varsa yaz (direkt girişlerde mevcut değeri koru)
  if (source || medium || campaign) {
    sessionStorage.setItem(
      UTM_KEY,
      JSON.stringify({
        utm_source:   source,
        utm_medium:   medium,
        utm_campaign: campaign,
        referrer:     document.referrer || null,
      })
    );
  } else if (!sessionStorage.getItem(UTM_KEY)) {
    // İlk ziyaret, UTM yok → referrer'dan kanal tahmini
    const ref = document.referrer;
    let inferredSource: string | null = null;

    if (ref) {
      if (ref.includes("google"))    inferredSource = "google";
      else if (ref.includes("bing")) inferredSource = "bing";
      else if (ref.includes("instagram") || ref.includes("facebook")) inferredSource = "social";
      else if (ref.includes("tiktok"))  inferredSource = "tiktok";
      else if (ref.includes("youtube")) inferredSource = "youtube";
      else inferredSource = "referral";
    }

    sessionStorage.setItem(
      UTM_KEY,
      JSON.stringify({
        utm_source:   inferredSource,
        utm_medium:   inferredSource ? "referral" : null,
        utm_campaign: null,
        referrer:     ref || null,
      })
    );
  }
}

/** Kaydedilmiş UTM verisini döner. */
export function getUTM(): UTMData {
  if (typeof window === "undefined") {
    return { utm_source: null, utm_medium: null, utm_campaign: null, referrer: null };
  }
  try {
    const raw = sessionStorage.getItem(UTM_KEY);
    if (!raw) return { utm_source: null, utm_medium: null, utm_campaign: null, referrer: null };
    return JSON.parse(raw) as UTMData;
  } catch {
    return { utm_source: null, utm_medium: null, utm_campaign: null, referrer: null };
  }
}

/** Kanal adını okunabilir hale getirir. */
export function channelLabel(source: string | null, medium: string | null): string {
  if (!source && !medium) return "Direkt";
  if (medium === "cpc" || medium === "paid") return "Google Ads";
  if (source === "google" && medium === "organic") return "Google Organik";
  if (source === "google") return "Google";
  if (source === "instagram" || source === "social") return "Sosyal Medya";
  if (source === "facebook") return "Facebook";
  if (source === "tiktok") return "TikTok";
  if (source === "youtube") return "YouTube";
  if (source === "email") return "E-posta";
  if (medium === "referral" || source === "referral") return "Referans Site";
  return source ?? medium ?? "Diğer";
}
