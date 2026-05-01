"use client";

import { useState } from "react";

export interface NewsItem {
  title: string;
  link: string;
  source: string;
  timeAgo: string;
}

export interface NewsData {
  sac: NewsItem[];
  sakal: NewsItem[];
  kas: NewsItem[];
}

const TABS = [
  { key: "sac"   as const, label: "Saç Ekimi"  },
  { key: "sakal" as const, label: "Sakal Ekimi" },
  { key: "kas"   as const, label: "Kaş Ekimi"   },
];

/* ── Renk paleti kaynak adına göre (deterministik) ── */
const SOURCE_COLORS = [
  "rgba(233,193,118,0.7)",
  "rgba(147,197,253,0.7)",
  "rgba(167,243,208,0.7)",
  "rgba(253,186,116,0.7)",
  "rgba(216,180,254,0.7)",
  "rgba(252,165,165,0.7)",
];
function sourceColor(source: string) {
  let hash = 0;
  for (let i = 0; i < source.length; i++) hash = source.charCodeAt(i) + ((hash << 5) - hash);
  return SOURCE_COLORS[Math.abs(hash) % SOURCE_COLORS.length];
}

/* ── Featured card (ilk haber) ── */
function FeaturedCard({ item }: { item: NewsItem }) {
  const color = sourceColor(item.source);
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative overflow-hidden rounded-2xl p-6 transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, rgba(233,193,118,0.06) 0%, rgba(0,0,0,0) 60%), #0d0c0a",
        border: "1px solid rgba(233,193,118,0.14)",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(233,193,118,0.3)"; e.currentTarget.style.boxShadow = "0 0 32px rgba(233,193,118,0.06)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(233,193,118,0.14)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {/* Glowing orb */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(233,193,118,0.08) 0%, transparent 70%)" }} />

      <div className="flex items-start justify-between gap-4 mb-4">
        <span className="inline-flex items-center gap-1.5 text-[9px] font-label tracking-[0.25em] uppercase px-2.5 py-1 rounded-full"
          style={{ background: "rgba(233,193,118,0.1)", color: "#e9c176", border: "1px solid rgba(233,193,118,0.2)" }}>
          <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
          Öncü Haber
        </span>
        <span className="text-[10px] font-label flex-shrink-0" style={{ color: "#8a7a68" }}>
          {item.timeAgo}
        </span>
      </div>

      <h3 className="text-[15px] font-headline leading-snug mb-5 transition-colors duration-200 group-hover:text-primary line-clamp-3"
        style={{ color: "#d8cfc4" }}>
        {item.title}
      </h3>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
          <span className="text-[11px] font-label tracking-wider" style={{ color: "#a89888" }}>
            {item.source || "Haber Kaynağı"}
          </span>
        </div>
        <span className="text-xs transition-all duration-200 group-hover:translate-x-1"
          style={{ color: "rgba(233,193,118,0.5)" }}>→</span>
      </div>
    </a>
  );
}

/* ── Mini card (2-7. haberler) ── */
function MiniCard({ item, index }: { item: NewsItem; index: number }) {
  const color = sourceColor(item.source);
  const num   = String(index + 2).padStart(2, "0");

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 p-4 rounded-xl transition-all duration-200"
      style={{ background: "#0a0908", border: "1px solid rgba(78,70,57,0.18)" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(233,193,118,0.22)"; e.currentTarget.style.background = "rgba(233,193,118,0.03)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(78,70,57,0.18)"; e.currentTarget.style.background = "#0a0908"; }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-label" style={{ color: "#7a6a58", fontVariantNumeric: "tabular-nums" }}>
          {num}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
          <span className="text-[9px] font-label tracking-wider truncate max-w-[100px]"
            style={{ color: "#a89888" }}>
            {item.source || "Kaynak"}
          </span>
        </div>
      </div>

      <p className="text-[12px] leading-snug line-clamp-3 flex-1 transition-colors duration-200 group-hover:text-primary"
        style={{ color: "#c8bfb4" }}>
        {item.title}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-[9px] font-label" style={{ color: "#7a6a58" }}>
          {item.timeAgo}
        </span>
        <span className="text-[11px] opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-0 group-hover:translate-x-0.5"
          style={{ color: "rgba(233,193,118,0.6)" }}>→</span>
      </div>
    </a>
  );
}

/* ── Ana bileşen ── */
export default function TrendingNewsUI({ data }: { data: NewsData }) {
  const [active, setActive] = useState<"sac" | "sakal" | "kas">("sac");
  const items = data[active];
  const [featured, ...rest] = items;

  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: "#080706", border: "1px solid rgba(78,70,57,0.2)" }}>

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid rgba(78,70,57,0.12)" }}>

        <div className="flex items-center gap-3">
          {/* Puls ikonu */}
          <div className="relative w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(233,193,118,0.07)", border: "1px solid rgba(233,193,118,0.12)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M2 12h3l3-8 4 16 3-8h7" stroke="#e9c176" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-headline" style={{ color: "#d1c5b4" }}>Trend Haberler</p>
            <p className="text-[10px] font-label tracking-wider mt-0.5" style={{ color: "#8a7a68" }}>
              Google News · Türkiye · 30 dk cache
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0.5 p-1 rounded-xl" style={{ background: "rgba(0,0,0,0.4)" }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setActive(t.key)}
              className="px-3 py-1.5 rounded-lg text-[10px] font-label tracking-wider uppercase transition-all duration-200"
              style={active === t.key
                ? { background: "rgba(233,193,118,0.1)", color: "#e9c176", border: "1px solid rgba(233,193,118,0.18)" }
                : { color: "#8a7a68",      border: "1px solid transparent" }
              }>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── İçerik ── */}
      <div className="p-5 space-y-3">
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16"
            style={{ color: "#6a5a48" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M19 5H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2z"
                stroke="currentColor" strokeWidth="1.5"/>
              <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p className="text-xs font-label tracking-widest uppercase">Haber bulunamadı</p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured && <FeaturedCard item={featured} />}

            {/* Mini grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {rest.slice(0, 6).map((item, i) => (
                  <MiniCard key={i} item={item} index={i} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center justify-between px-5 py-3"
        style={{ borderTop: "1px solid rgba(78,70,57,0.1)" }}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.6)" }} />
          <span className="text-[9px] font-label tracking-widest uppercase" style={{ color: "#8a7a68" }}>
            Kaynak: Google News RSS
          </span>
        </div>
        <a
          href={`https://news.google.com/search?q=${TABS.find(t => t.key === active)?.label}&hl=tr&gl=TR`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[9px] font-label tracking-widest uppercase transition-colors duration-200"
          style={{ color: "rgba(233,193,118,0.35)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#e9c176")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(233,193,118,0.35)")}
        >
          Google News'te aç →
        </a>
      </div>
    </div>
  );
}
