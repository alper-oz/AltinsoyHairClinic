"use client";

import { useState } from "react";
import type { SocialLink, Platform } from "@/lib/social";
import { PLATFORM_META, ALL_PLATFORMS } from "@/lib/social";

/* ── Platform SVG icons ─────────────────────────────────────────────────── */
const ICONS: Record<Platform, { svg: React.ReactNode; bg: string; border: string; color: string }> = {
  instagram: {
    bg: "rgba(225,48,108,0.08)", border: "rgba(225,48,108,0.2)", color: "#e1306c",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>,
  },
  facebook: {
    bg: "rgba(24,119,242,0.08)", border: "rgba(24,119,242,0.2)", color: "#1877f2",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.024 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.097 24 18.1 24 12.073z"/>
    </svg>,
  },
  x: {
    bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.12)", color: "#e7e9ea",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.264 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>,
  },
  gmail: {
    bg: "rgba(234,67,53,0.08)", border: "rgba(234,67,53,0.2)", color: "#ea4335",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
    </svg>,
  },
  whatsapp: {
    bg: "rgba(37,211,102,0.08)", border: "rgba(37,211,102,0.2)", color: "#25d366",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>,
  },
  google_maps: {
    bg: "rgba(66,133,244,0.08)", border: "rgba(66,133,244,0.2)", color: "#4285f4",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>,
  },
};

/* ── Platform Card ──────────────────────────────────────────────────────── */
function PlatformCard({
  link,
  onSave,
}: {
  link: SocialLink;
  onSave: (platform: Platform, url: string, active: boolean) => Promise<void>;
}) {
  const meta = PLATFORM_META[link.platform];
  const icon = ICONS[link.platform];
  const [url,     setUrl]     = useState(link.url);
  const [active,  setActive]  = useState(link.active);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [error,   setError]   = useState(false);

  const isDirty = url !== link.url || active !== link.active;

  async function handleSave() {
    setSaving(true); setError(false); setSaved(false);
    try {
      await onSave(link.platform, url, active);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch { setError(true); }
    finally   { setSaving(false); }
  }

  return (
    <div className="rounded-2xl overflow-hidden transition-all"
      style={{
        background: "#0c0c0c",
        border: active ? `1px solid ${icon.border}` : "1px solid rgba(78,70,57,0.18)",
      }}>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid rgba(78,70,57,0.1)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: icon.bg, border: `1px solid ${icon.border}`, color: icon.color }}>
            {icon.svg}
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: "#d1c5b4" }}>{meta.label}</p>
            <p className="text-xs mt-0.5" style={{ color: active ? "#4ade80" : "#4a4035" }}>
              {active ? "Yayında" : "Pasif"}
            </p>
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setActive(a => !a)}
          className="relative flex-shrink-0 transition-all"
          style={{ width: 40, height: 22 }}>
          <div className="absolute inset-0 rounded-full transition-colors"
            style={{ background: active ? "#22c55e" : "rgba(255,255,255,0.08)", border: active ? "none" : "1px solid rgba(255,255,255,0.1)" }} />
          <div className="absolute top-0.5 rounded-full transition-all"
            style={{
              width: 18, height: 18, background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
              left: active ? "calc(100% - 19px)" : "2px",
            }} />
        </button>
      </div>

      {/* URL input */}
      <div className="px-5 py-4 space-y-3">
        <div>
          <label className="block text-xs font-label mb-2" style={{ color: "#4a4035" }}>
            {link.platform === "whatsapp" ? "Telefon numarası (başında 90 ile)" :
             link.platform === "gmail"    ? "E-posta adresi" : "URL"}
          </label>
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder={meta.placeholder}
            className="w-full text-sm rounded-xl px-4 py-3 outline-none transition-all"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(78,70,57,0.2)",
              color: "#d1c5b4",
            }}
            onFocus={e => (e.target.style.borderColor = "rgba(233,193,118,0.35)")}
            onBlur={e  => (e.target.style.borderColor = "rgba(78,70,57,0.2)")}
          />
          {link.platform === "whatsapp" && url && (
            <p className="text-xs mt-1.5" style={{ color: "#4a4035" }}>
              → wa.me/{url}
            </p>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving || !isDirty}
          className="w-full py-2.5 rounded-xl text-sm font-label transition-all"
          style={{
            background: saved
              ? "rgba(34,197,94,0.12)"
              : error
              ? "rgba(239,68,68,0.12)"
              : isDirty
              ? "rgba(233,193,118,0.1)"
              : "rgba(255,255,255,0.03)",
            border: saved
              ? "1px solid rgba(34,197,94,0.25)"
              : error
              ? "1px solid rgba(239,68,68,0.25)"
              : isDirty
              ? "1px solid rgba(233,193,118,0.2)"
              : "1px solid rgba(78,70,57,0.15)",
            color: saved ? "#4ade80" : error ? "#f87171" : isDirty ? "#e9c176" : "#3a3028",
            cursor: saving || !isDirty ? "not-allowed" : "pointer",
            opacity: !isDirty && !saved && !error ? 0.5 : 1,
          }}>
          {saving ? "Kaydediliyor…" : saved ? "✓ Kaydedildi" : error ? "Hata oluştu" : "Kaydet"}
        </button>
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────────────── */
export default function SocialManager({ initial }: { initial: SocialLink[] }) {
  const [links, setLinks] = useState<SocialLink[]>(
    // Her platformun mevcut durumunu al, eksikse boş default ekle
    ALL_PLATFORMS.map(p =>
      initial.find(l => l.platform === p) ?? { platform: p, url: "", active: false }
    )
  );

  async function handleSave(platform: Platform, url: string, active: boolean) {
    const res = await fetch("/api/social-links", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform, url, active }),
    });
    if (!res.ok) throw new Error();
    const updated: SocialLink = await res.json();
    setLinks(prev => prev.map(l => l.platform === platform ? updated : l));
  }

  const activeCount = links.filter(l => l.active && l.url).length;

  return (
    <div>
      {/* Stats bar */}
      <div className="flex items-center gap-3 mb-6 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.5)" }} />
          <span className="text-sm" style={{ color: "#9a8f80" }}>
            {activeCount} / {links.length} platform aktif
          </span>
        </div>
        <div className="flex-1 h-px" style={{ background: "rgba(78,70,57,0.15)" }} />
        <span className="text-xs" style={{ color: "#3a3028" }}>
          Değişiklikler anında sitede yansır
        </span>
      </div>

      {/* Platform grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map(link => (
          <PlatformCard key={link.platform} link={link} onSave={handleSave} />
        ))}
      </div>

      {/* Info */}
      <div className="mt-6 px-5 py-4 rounded-2xl" style={{ background: "rgba(233,193,118,0.04)", border: "1px solid rgba(233,193,118,0.08)" }}>
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-[18px] flex-shrink-0 mt-0.5" style={{ color: "#6b5f4e" }}>info</span>
          <div className="space-y-1">
            <p className="text-sm" style={{ color: "#6b5f4e" }}>Aktif platformlar sitenin footer'ında ve iletişim sayfasında otomatik görünür.</p>
            <p className="text-sm" style={{ color: "#4a4035" }}>WhatsApp numarası ayrıca sayfanın sağ alt köşesindeki yüzen butonu da günceller.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
