"use client";

import { useEffect } from "react";
import { captureUTM } from "@/lib/utm";

/** Sayfa yüklendiğinde UTM parametrelerini yakalar ve sayfa görüntülenme eventi gönderir. */
export default function UTMCapture() {
  useEffect(() => {
    captureUTM();

    // Sayfa görüntülenme — fire & forget, kullanıcı deneyimini bloklamaz
    const page = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page,
        utm_source:   params.get("utm_source"),
        utm_medium:   params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        referrer:     document.referrer || null,
      }),
    }).catch(() => {}); // Sessizce hata yut — kritik değil
  }, []);

  return null;
}
