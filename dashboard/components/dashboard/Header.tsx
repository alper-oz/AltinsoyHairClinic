"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { ExchangeRates } from "@/app/dashboard/layout";

const PAGE_TITLES: Record<string, { title: string; sub: string }> = {
  "/dashboard":                { title: "Genel Bakış",      sub: "Klinik özeti ve hızlı erişim"      },
  "/dashboard/leads":          { title: "Lead Yönetimi",    sub: "Potansiyel hasta kayıtları"         },
  "/dashboard/hero":           { title: "Hero Bölümü",      sub: "Anasayfa hero içeriği"              },
  "/dashboard/banner":         { title: "Banner",           sub: "Site geneli duyuru bandı"           },
  "/dashboard/oncesi-sonrasi": { title: "Öncesi Sonrası",   sub: "Vaka galerisi yönetimi"             },
  "/dashboard/sss":            { title: "SSS Yönetimi",     sub: "Sıkça sorulan sorular"              },
  "/dashboard/trafik":         { title: "Trafik Kanalları", sub: "Kaynak ve kanal analizi"            },
  "/dashboard/sosyal-medya":   { title: "Sosyal Medya",     sub: "Platform linkleri ve görünürlük"    },
};

const CURRENCY_ITEMS = [
  { key: "usd" as const, label: "USD", symbol: "$" },
  { key: "eur" as const, label: "EUR", symbol: "€" },
  { key: "gbp" as const, label: "GBP", symbol: "£" },
];

export default function Header({ rates }: { rates?: ExchangeRates | null }) {
  const pathname = usePathname();
  const page = PAGE_TITLES[pathname] ?? { title: "Dashboard", sub: "" };

  const [visitors, setVisitors] = useState<number | null>(null);

  useEffect(() => {
    const fetchVisitors = () => {
      fetch("/api/visitors")
        .then(r => r.json())
        .then(d => setVisitors(d.count ?? 0))
        .catch(() => {});
    };
    fetchVisitors();
    const interval = setInterval(fetchVisitors, 30_000);
    return () => clearInterval(interval);
  }, []);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Günaydın" : hour < 18 ? "İyi günler" : "İyi akşamlar";
  const today = now.toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <header
      className="flex items-center justify-between px-6 py-3.5 flex-shrink-0 gap-4"
      style={{
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(78,70,57,0.15)",
      }}
    >
      {/* Sol — sayfa başlığı */}
      <div className="flex flex-col min-w-0">
        <h1 className="font-headline text-base tracking-tight truncate" style={{ color: "#d8cfc4" }}>
          {page.title}
        </h1>
        {page.sub && (
          <p className="text-[10px] font-label tracking-wider mt-0.5 truncate" style={{ color: "#8a7a68" }}>
            {page.sub}
          </p>
        )}
      </div>

      {/* Sağ — döviz + tarih + canlı */}
      <div className="flex items-center gap-2.5 flex-shrink-0">

        {/* Anlık ziyaretçi */}
        {visitors !== null && (
          <>
            <div
              className="hidden sm:flex items-center gap-2 h-7 px-3 rounded-lg"
              style={{
                background: "rgba(74,222,128,0.07)",
                border: "1px solid rgba(74,222,128,0.18)",
              }}
              title="Son 5 dakikada sitede aktif ziyaretçi"
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
                style={{ background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.7)" }}
              />
              <span className="text-[11px] font-label tabular-nums" style={{ color: "#4ade80" }}>
                {visitors}
              </span>
              <span className="text-[10px] font-label tracking-wider" style={{ color: "rgba(74,222,128,0.55)" }}>
                ziyaretçi
              </span>
            </div>

            <div className="w-px h-4 hidden sm:block" style={{ background: "rgba(78,70,57,0.3)" }} />
          </>
        )}

        {/* Döviz kurları */}
        {rates && (
          <>
            <div className="flex items-center gap-1.5">
              {CURRENCY_ITEMS.map(({ key, label, symbol }) => (
                <div
                  key={key}
                  className="hidden sm:flex items-center gap-1.5 h-7 px-2.5 rounded-lg"
                  style={{
                    background: "rgba(233,193,118,0.05)",
                    border: "1px solid rgba(233,193,118,0.12)",
                  }}
                  title={`Güncelleme: ${rates.date}`}
                >
                  <span className="text-[10px] font-label tracking-wider" style={{ color: "rgba(233,193,118,0.5)" }}>
                    {symbol}
                  </span>
                  <span className="text-[11px] font-label font-medium tabular-nums" style={{ color: "#e9c176" }}>
                    {rates[key].toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-[9px] font-label tracking-widest" style={{ color: "rgba(233,193,118,0.35)" }}>
                    ₺
                  </span>
                </div>
              ))}
            </div>

            <div className="w-px h-4 hidden sm:block" style={{ background: "rgba(78,70,57,0.3)" }} />
          </>
        )}

        {/* Tarih */}
        <span className="text-[10px] font-label tracking-wider hidden lg:block capitalize" style={{ color: "#8a7a68" }}>
          {greeting} · {today}
        </span>

        <div className="w-px h-4 hidden lg:block" style={{ background: "rgba(78,70,57,0.3)" }} />

        {/* Canlı */}
        <div
          className="h-7 px-3 flex items-center gap-1.5 rounded-full text-[9px] font-label tracking-[0.2em] uppercase"
          style={{
            background: "rgba(74,222,128,0.06)",
            border: "1px solid rgba(74,222,128,0.15)",
            color: "#4ade80",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.7)" }}
          />
          Canlı
        </div>
      </div>
    </header>
  );
}
