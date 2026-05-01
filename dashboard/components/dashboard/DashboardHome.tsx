"use client";

import React from "react";
import Link from "next/link";
import LeadChart, { type ChartPoint } from "./LeadChart";

/* ── Types ──────────────────────────────────────────────────────────────── */
export interface DashboardStats {
  leads: {
    total: number;
    today: number;
    week: number;
    converted: number;
    convRate: number;
    chartData: ChartPoint[];
    recent: {
      id: string;
      name: string;
      phone: string;
      source: string;
      status: string;
      created_at: string;
    }[];
  };
  cases:   { total: number; visible: number };
  faqs:    { total: number; visible: number };
  hero:    { hasImage: boolean; headline: string | null };
  banners: { active: number };
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */
const STATUS: Record<string, { bg: string; border: string; text: string; dot: string; label: string }> = {
  new:       { bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)",  text: "#93c5fd", dot: "#3b82f6", label: "Yeni"         },
  contacted: { bg: "rgba(234,179,8,0.12)",   border: "rgba(234,179,8,0.25)",   text: "#fde047", dot: "#eab308", label: "Arandı"       },
  consulted: { bg: "rgba(249,115,22,0.12)",  border: "rgba(249,115,22,0.25)",  text: "#fdba74", dot: "#f97316", label: "Konsültasyon" },
  converted: { bg: "rgba(74,222,128,0.12)",  border: "rgba(74,222,128,0.25)",  text: "#86efac", dot: "#22c55e", label: "Dönüştü"      },
  lost:      { bg: "rgba(107,114,128,0.12)", border: "rgba(107,114,128,0.25)", text: "#9ca3af", dot: "#6b7280", label: "Kayıp"        },
};

const SOURCE: Record<string, string> = {
  homepage: "Anasayfa", "sac-analizi": "Saç Analizi",
  "client-data": "Veri Formu", iletisim: "İletişim",
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "Az önce";
  if (m < 60) return `${m} dk önce`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} saat önce`;
  const d = Math.floor(h / 24);
  if (d < 7)  return `${d} gün önce`;
  return new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
}

/* Renk sabitleri — tek yerden yönetilen okunabilirlik paleti */
const C = {
  text:    "#d8cfc4",   // ana metin
  sub:     "#a89888",   // ikincil metin — eski #4a4035'in yerine
  muted:   "#7a6a58",   // üçüncül / zaman damgaları
  gold:    "#e9c176",
  goldDim: "#b8975a",
  border:  "rgba(78,70,57,0.22)",
  card:    "#0b0a08",
};

/* ── Component ───────────────────────────────────────────────────────────── */
export default function DashboardHome({ stats, newsWidget }: { stats: DashboardStats; newsWidget?: React.ReactNode }) {
  const { leads, cases, faqs, hero, banners } = stats;

  const hour = new Date().getHours();
  const greeting = hour < 5 ? "İyi geceler" : hour < 12 ? "Günaydın" : hour < 18 ? "İyi günler" : "İyi akşamlar";
  const dateStr  = new Date().toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* ══ HERO BANNER ═══════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-3xl"
        style={{
          background: "linear-gradient(135deg,#0d0c09 0%,#161208 60%,#0c0a06 100%)",
          border: `1px solid rgba(233,193,118,0.18)`,
        }}>
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(233,193,118,0.09) 0%,transparent 65%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(233,193,118,0.45),transparent)" }} />

        <div className="relative px-8 pt-8 pb-7">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-label tracking-[0.25em] uppercase mb-2" style={{ color: C.sub }}>
                Altınsoy Hair Clinic · Kontrol Paneli
              </p>
              <h1 className="font-headline leading-tight" style={{ fontSize: "2rem", color: C.text }}>
                {greeting},&nbsp;<span style={{ color: C.gold }}>Admin.</span>
              </h1>
              <p className="mt-1 text-sm capitalize" style={{ color: C.sub }}>{dateStr}</p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2 mt-1 rounded-full px-4 py-2"
              style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                style={{ background: "#4ade80", boxShadow: "0 0 8px rgba(74,222,128,0.8)" }} />
              <span className="text-xs font-label tracking-wider" style={{ color: "#4ade80" }}>Site Canlı</span>
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: leads.today,          label: "Bugün Gelen",  sub: "Yeni lead",            icon: "flash_on",    accent: true  },
              { value: leads.week,           label: "Bu Hafta",     sub: "Son 7 gün",            icon: "calendar_today", accent: false },
              { value: leads.total,          label: "Toplam Lead",  sub: "Tüm zamanlar",         icon: "group",       accent: false },
              { value: `%${leads.convRate}`, label: "Dönüşüm",      sub: `${leads.converted} hasta`, icon: "trending_up", accent: false },
            ].map(k => (
              <div key={k.label} className="rounded-2xl px-5 py-4 flex flex-col gap-1.5"
                style={{
                  background: k.accent
                    ? "linear-gradient(135deg,rgba(233,193,118,0.14),rgba(197,160,89,0.07))"
                    : "rgba(255,255,255,0.04)",
                  border: k.accent ? "1px solid rgba(233,193,118,0.25)" : "1px solid rgba(255,255,255,0.07)",
                }}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-label" style={{ color: k.accent ? C.goldDim : C.sub }}>{k.label}</p>
                  <span className="material-symbols-outlined text-[17px]"
                    style={{ color: k.accent ? C.gold : C.muted, fontVariationSettings: "'FILL' 1,'wght' 300" }}>
                    {k.icon}
                  </span>
                </div>
                <p className="font-headline leading-none" style={{ fontSize: "2.25rem", color: k.accent ? C.gold : C.text }}>
                  {k.value}
                </p>
                <p className="text-xs" style={{ color: C.muted }}>{k.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ LEAD CHART ════════════════════════════════════════════════════ */}
      <LeadChart data={leads.chartData} period={30} />

      {/* ══ GÜNCEL HABERLER ═══════════════════════════════════════════════ */}
      {newsWidget}

      {/* ══ MAIN GRID ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* ── Son Leadler (3 col) ──────────────────────────────────────── */}
        <div className="lg:col-span-3 rounded-2xl overflow-hidden flex flex-col"
          style={{ background: C.card, border: `1px solid ${C.border}` }}>

          <div className="flex items-center justify-between px-6 py-5"
            style={{ borderBottom: `1px solid ${C.border}` }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(233,193,118,0.1)", border: "1px solid rgba(233,193,118,0.18)" }}>
                <span className="material-symbols-outlined text-[18px]"
                  style={{ color: C.gold, fontVariationSettings: "'FILL' 1,'wght' 300" }}>person_add</span>
              </div>
              <div>
                <h2 className="font-headline text-base" style={{ color: C.text }}>Son Leadler</h2>
                <p className="text-xs mt-0.5" style={{ color: C.sub }}>En son {leads.recent.length} kayıt</p>
              </div>
            </div>
            <Link href="/dashboard/leads"
              className="flex items-center gap-1 text-sm font-label px-3 py-1.5 rounded-lg transition-all"
              style={{ color: C.sub, background: "rgba(233,193,118,0.06)", border: "1px solid rgba(233,193,118,0.12)" }}
              onMouseEnter={e => { e.currentTarget.style.color = C.gold; e.currentTarget.style.borderColor = "rgba(233,193,118,0.25)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = C.sub;  e.currentTarget.style.borderColor = "rgba(233,193,118,0.12)"; }}>
              Tümü
              <span className="material-symbols-outlined text-[15px]">chevron_right</span>
            </Link>
          </div>

          {leads.recent.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-16 gap-3">
              <span className="material-symbols-outlined text-[48px]" style={{ color: "#2a2218" }}>inbox</span>
              <p className="text-sm font-label" style={{ color: C.muted }}>Henüz lead gelmemiş</p>
            </div>
          ) : (
            <div className="flex-1 divide-y" style={{ borderColor: "rgba(78,70,57,0.1)" }}>
              {leads.recent.map(lead => {
                const s = STATUS[lead.status] ?? STATUS.new;
                return (
                  <div key={lead.id}
                    className="flex items-center gap-4 px-6 py-4 transition-colors cursor-default"
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(233,193,118,0.03)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>

                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-headline text-base flex-shrink-0"
                      style={{ background: "rgba(233,193,118,0.1)", color: C.gold, border: "1px solid rgba(233,193,118,0.18)" }}>
                      {lead.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: C.text }}>{lead.name}</p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: C.sub }}>
                        {lead.phone}&ensp;·&ensp;{SOURCE[lead.source] ?? lead.source}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
                        style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                        {s.label}
                      </span>
                      <span className="text-xs" style={{ color: C.muted }}>{timeAgo(lead.created_at)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Site Sağlığı (2 col) ─────────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          <div className="rounded-2xl overflow-hidden"
            style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <div className="flex items-center gap-3 px-5 py-4"
              style={{ borderBottom: `1px solid ${C.border}` }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(233,193,118,0.1)", border: "1px solid rgba(233,193,118,0.18)" }}>
                <span className="material-symbols-outlined text-[18px]"
                  style={{ color: C.gold, fontVariationSettings: "'FILL' 1,'wght' 300" }}>monitor_heart</span>
              </div>
              <div>
                <h2 className="font-headline text-base" style={{ color: C.text }}>İçerik Durumu</h2>
                <p className="text-xs mt-0.5" style={{ color: C.sub }}>Yayın sağlığı</p>
              </div>
            </div>

            <div className="p-4 space-y-2">
              {[
                { label: "Hero Görseli",  ok: hero.hasImage,      detail: hero.hasImage ? "Aktif" : "Görsel eksik",                           icon: "wallpaper",     href: "/dashboard/hero"            },
                { label: "Banner",        ok: banners.active > 0, detail: banners.active > 0 ? `${banners.active} aktif` : "Aktif banner yok", icon: "campaign",      href: "/dashboard/banner"          },
                { label: "Vaka Galerisi", ok: cases.visible > 0,  detail: `${cases.visible} vaka yayında`,                                    icon: "photo_library", href: "/dashboard/oncesi-sonrasi"  },
                { label: "SSS",           ok: faqs.visible > 0,   detail: `${faqs.visible} soru yayında`,                                     icon: "quiz",          href: "/dashboard/sss"             },
              ].map(item => (
                <Link key={item.label} href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all group"
                  style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${C.border}` }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(233,193,118,0.05)"; e.currentTarget.style.borderColor = "rgba(233,193,118,0.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.025)"; e.currentTarget.style.borderColor = C.border; }}>

                  <div className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: item.ok ? "#22c55e" : "#ef4444", boxShadow: item.ok ? "0 0 6px rgba(34,197,94,0.5)" : "0 0 6px rgba(239,68,68,0.4)" }} />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-label" style={{ color: C.text }}>{item.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: item.ok ? "#4ade80" : "#f87171" }}>{item.detail}</p>
                  </div>

                  <span className="material-symbols-outlined text-[15px] opacity-0 group-hover:opacity-70 transition-opacity"
                    style={{ color: C.gold }}>arrow_forward</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Lead dağılımı */}
          <div className="rounded-2xl px-5 py-5 flex-1"
            style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <h3 className="font-headline text-sm mb-5" style={{ color: C.text }}>Lead Dağılımı</h3>
            <div className="space-y-4">
              {([
                { label: "Yeni",         count: leads.recent.filter(l => l.status === "new").length,       color: "#3b82f6", max: Math.max(leads.recent.length, 1) },
                { label: "İletişimde",   count: leads.recent.filter(l => l.status === "contacted").length, color: "#eab308", max: Math.max(leads.recent.length, 1) },
                { label: "Konsültasyon", count: leads.recent.filter(l => l.status === "consulted").length, color: "#f97316", max: Math.max(leads.recent.length, 1) },
                { label: "Dönüştü",     count: leads.converted,                                           color: "#22c55e", max: Math.max(leads.total, 1)         },
              ] as const).map(bar => (
                <div key={bar.label}>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm font-label" style={{ color: C.sub }}>{bar.label}</span>
                    <span className="text-sm font-headline" style={{ color: C.text }}>{bar.count}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full"
                      style={{ width: `${Math.round((bar.count / bar.max) * 100)}%`, background: bar.color, transition: "width 0.8s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ QUICK ACTIONS ══════════════════════════════════════════════════ */}
      <div>
        <h2 className="font-headline text-base mb-4" style={{ color: C.text }}>Hızlı Erişim</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { href: "/dashboard/leads",          icon: "person_add",    label: "Lead Yönetimi",  sub: "Kayıtları incele"   },
            { href: "/dashboard/oncesi-sonrasi", icon: "photo_library", label: "Vaka Galerisi",  sub: "Vaka ekle, düzenle"},
            { href: "/dashboard/sss",            icon: "quiz",          label: "SSS",            sub: "Soruları yönet"    },
            { href: "/dashboard/hero",           icon: "wallpaper",     label: "Hero Bölümü",    sub: "Başlık & görsel"   },
            { href: "/dashboard/banner",         icon: "campaign",      label: "Banner",         sub: "Duyuru yönetimi"   },
          ].map(({ href, icon, label, sub }) => (
            <Link key={href} href={href}
              className="group flex flex-col gap-3 p-5 rounded-2xl transition-all duration-200"
              style={{ background: C.card, border: `1px solid ${C.border}` }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(233,193,118,0.05)"; e.currentTarget.style.borderColor = "rgba(233,193,118,0.25)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.card; e.currentTarget.style.borderColor = C.border; }}>

              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                style={{ background: "rgba(233,193,118,0.08)", border: "1px solid rgba(233,193,118,0.15)" }}>
                <span className="material-symbols-outlined text-[22px]"
                  style={{ color: C.gold, fontVariationSettings: "'FILL' 0,'wght' 300" }}>
                  {icon}
                </span>
              </div>

              <div>
                <p className="text-sm font-label" style={{ color: C.text }}>{label}</p>
                <p className="text-xs mt-0.5" style={{ color: C.sub }}>{sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
