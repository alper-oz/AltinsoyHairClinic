"use client";

import { useState, useTransition } from "react";
import { isLocked } from "@/lib/page-settings";
import type { PageSetting } from "@/lib/page-settings";

/**
 * Her iç pathname için: gösterim adı, ikon, hangi gruba ait, 3 locale URL özeti.
 * `slugs` admin liste rozetlerinde TR/EN/AR slug'larını gösterir.
 */
interface PathMeta {
  internal: string;
  label: string;
  icon: string;
  group: GroupKey;
  slugs: { tr: string; en: string; ar: string };
}

type GroupKey = "home" | "techniques" | "conversion" | "cases" | "legal" | "internal";

const GROUP_ORDER: ReadonlyArray<{ key: GroupKey; label: string; description: string }> = [
  { key: "home",        label: "Anasayfa",          description: "Sitenin giriş noktası" },
  { key: "techniques",  label: "Teknikler & Hub",   description: "Saç ekimi, FUE, DHI, Sapphire, sakal, kaş" },
  { key: "conversion",  label: "Dönüşüm Sayfaları", description: "Form ve hesaplama sayfaları" },
  { key: "cases",       label: "Vakalar",           description: "Öncesi/sonrası ve vaka detayları" },
  { key: "legal",       label: "Yasal",             description: "Kilitli — KVKK uyumu için her zaman aktif" },
  { key: "internal",    label: "Klinik İçi",        description: "Sadece dahili kullanım" },
];

const PATHS: ReadonlyArray<PathMeta> = [
  { internal: "/",                             label: "Anasayfa",                 icon: "home",          group: "home",       slugs: { tr: "/", en: "/en", ar: "/ar" } },

  { internal: "/sac-ekimi",                    label: "Saç Ekimi (Hub)",          icon: "spa",           group: "techniques", slugs: { tr: "/sac-ekimi", en: "/en/hair-transplant", ar: "/ar/زراعة-الشعر" } },
  { internal: "/sac-ekimi/fue",                label: "FUE",                      icon: "biotech",       group: "techniques", slugs: { tr: "/sac-ekimi/fue", en: "/en/hair-transplant/fue", ar: "/ar/زراعة-الشعر/fue" } },
  { internal: "/sac-ekimi/dhi",                label: "DHI",                      icon: "biotech",       group: "techniques", slugs: { tr: "/sac-ekimi/dhi", en: "/en/hair-transplant/dhi", ar: "/ar/زراعة-الشعر/dhi" } },
  { internal: "/sac-ekimi/sapphire",           label: "Sapphire",                 icon: "diamond",       group: "techniques", slugs: { tr: "/sac-ekimi/sapphire", en: "/en/hair-transplant/sapphire", ar: "/ar/زراعة-الشعر/sapphire" } },
  { internal: "/sakal-ekimi",                  label: "Sakal Ekimi",              icon: "face",          group: "techniques", slugs: { tr: "/sakal-ekimi", en: "/en/beard-transplant", ar: "/ar/زراعة-اللحية" } },
  { internal: "/kas-ekimi",                    label: "Kaş Ekimi",                icon: "visibility",    group: "techniques", slugs: { tr: "/kas-ekimi", en: "/en/eyebrow-transplant", ar: "/ar/زراعة-الحواجب" } },
  { internal: "/fue-vs-dhi",                   label: "FUE vs DHI",               icon: "compare_arrows",group: "techniques", slugs: { tr: "/fue-vs-dhi", en: "/en/fue-vs-dhi", ar: "/ar/fue-vs-dhi" } },

  { internal: "/sac-analizi",                  label: "Saç Analizi",              icon: "analytics",     group: "conversion", slugs: { tr: "/sac-analizi", en: "/en/hair-analysis", ar: "/ar/تحليل-الشعر" } },
  { internal: "/fiyat",                        label: "Fiyat",                    icon: "payments",      group: "conversion", slugs: { tr: "/fiyat", en: "/en/pricing", ar: "/ar/الأسعار" } },
  { internal: "/fiyat-hesaplama",              label: "Fiyat Hesaplama",          icon: "calculate",     group: "conversion", slugs: { tr: "/fiyat-hesaplama", en: "/en/price-calculator", ar: "/ar/حاسبة-الأسعار" } },
  { internal: "/greft-hesaplama",              label: "Greft Hesaplama",          icon: "calculate",     group: "conversion", slugs: { tr: "/greft-hesaplama", en: "/en/graft-calculator", ar: "/ar/حاسبة-الطعوم" } },
  { internal: "/iletisim",                     label: "İletişim",                 icon: "mail",          group: "conversion", slugs: { tr: "/iletisim", en: "/en/contact", ar: "/ar/اتصل-بنا" } },
  { internal: "/uygun-degil",                  label: "Uygun Değil",              icon: "do_not_disturb",group: "conversion", slugs: { tr: "/uygun-degil", en: "/en/not-eligible", ar: "/ar/غير-مؤهل" } },

  { internal: "/oncesi-sonrasi",               label: "Öncesi & Sonrası",         icon: "photo_library", group: "cases",      slugs: { tr: "/oncesi-sonrasi", en: "/en/before-after", ar: "/ar/قبل-وبعد" } },
  { internal: "/vaka/dhi-sakal-1800-greft",    label: "Vaka: DHI Sakal 1800",     icon: "image",         group: "cases",      slugs: { tr: "/vaka/dhi-sakal-1800-greft", en: "/en/case/dhi-beard-1800-grafts", ar: "/ar/حالة/dhi-beard-1800" } },
  { internal: "/vaka/fue-3200-greft",          label: "Vaka: FUE 3200",           icon: "image",         group: "cases",      slugs: { tr: "/vaka/fue-3200-greft", en: "/en/case/fue-3200-grafts", ar: "/ar/حالة/fue-3200" } },
  { internal: "/vaka/kas-restorasyonu-400-greft", label: "Vaka: Kaş 400",         icon: "image",         group: "cases",      slugs: { tr: "/vaka/kas-restorasyonu-400-greft", en: "/en/case/eyebrow-restoration-400-grafts", ar: "/ar/حالة/eyebrow-400" } },

  { internal: "/kvkk-aydinlatma",              label: "KVKK Aydınlatma",          icon: "gavel",         group: "legal",      slugs: { tr: "/kvkk-aydinlatma", en: "/en/data-protection-disclosure", ar: "/ar/إفصاح-حماية-البيانات" } },
  { internal: "/gizlilik-politikasi",          label: "Gizlilik Politikası",      icon: "policy",        group: "legal",      slugs: { tr: "/gizlilik-politikasi", en: "/en/privacy-policy", ar: "/ar/سياسة-الخصوصية" } },
  { internal: "/cerez-politikasi",             label: "Çerez Politikası",         icon: "cookie",        group: "legal",      slugs: { tr: "/cerez-politikasi", en: "/en/cookie-policy", ar: "/ar/سياسة-ملفات-تعريف-الارتباط" } },

  { internal: "/client-data",                  label: "Client Data",              icon: "database",      group: "internal",   slugs: { tr: "/client-data", en: "/en/client-data", ar: "/ar/client-data" } },
];

export default function SitemapManager({ initial }: { initial: PageSetting[] }) {
  const initialMap = new Map(initial.map((s) => [s.path, s.active]));
  const [activeMap, setActiveMap] = useState<Map<string, boolean>>(initialMap);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const totalToggleable = PATHS.filter((p) => !isLocked(p.internal)).length;
  const activeCount = PATHS.filter((p) => activeMap.get(p.internal) !== false).length;

  async function toggle(path: string, current: boolean) {
    if (isLocked(path)) return;
    const next = !current;
    // Optimistik
    setActiveMap((prev) => {
      const m = new Map(prev);
      m.set(path, next);
      return m;
    });
    setPendingPath(path);
    setError(null);
    try {
      const res = await fetch(`/api/page-settings/${encodeURIComponent(path)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: next }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Güncelleme başarısız.");
      }
      startTransition(() => {
        // Server cache temizleme bir tag revalidation ile yapılıyor (PATCH'te)
      });
    } catch (e) {
      // Rollback
      setActiveMap((prev) => {
        const m = new Map(prev);
        m.set(path, current);
        return m;
      });
      setError(e instanceof Error ? e.message : "Bilinmeyen hata.");
    } finally {
      setPendingPath(null);
    }
  }

  const grouped = GROUP_ORDER.map((g) => ({
    group: g,
    rows: PATHS.filter((p) => p.group === g.key),
  }));

  return (
    <div>
      {/* Üst bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-outline-variant/15">
        <div className="flex items-center gap-3">
          <div className="text-sm text-on-surface/60">
            <span className="text-on-surface font-medium">{activeCount}</span>
            <span className="text-on-surface/40"> / {PATHS.length} aktif</span>
          </div>
          <span className="text-[11px] text-on-surface/40">
            ({totalToggleable} pasifleştirilebilir, {PATHS.length - totalToggleable} kilitli)
          </span>
        </div>
        {error && (
          <p className="text-xs text-error bg-error/10 border border-error/20 rounded px-3 py-1.5">
            {error}
          </p>
        )}
      </div>

      <div className="space-y-8">
        {grouped.map(({ group, rows }) => (
          <div key={group.key}>
            <div className="mb-3 flex items-baseline gap-3">
              <h2 className="text-[10px] font-label tracking-[0.3em] uppercase text-on-surface/50">
                {group.label}
              </h2>
              <p className="text-[11px] text-on-surface/30">{group.description}</p>
              <span className="ml-auto text-[10px] text-on-surface/30">
                {rows.length} sayfa
              </span>
            </div>

            <div className="space-y-2">
              {rows.map((p) => {
                const active = activeMap.get(p.internal) !== false;
                const locked = isLocked(p.internal);
                const isPending = pendingPath === p.internal;
                return (
                  <div
                    key={p.internal}
                    className={`flex items-center gap-4 px-4 py-3 rounded border transition-all ${
                      active
                        ? "bg-surface-container-low border-outline-variant/15"
                        : "bg-surface-container-low/40 border-outline-variant/10 opacity-65"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[20px] flex-shrink-0"
                      style={{ color: active ? "#e9c176" : "#8a7a68" }}
                    >
                      {p.icon}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="text-sm font-medium text-on-surface">{p.label}</p>
                        {locked && (
                          <span
                            className="inline-flex items-center gap-1 text-[9px] font-label tracking-wider uppercase px-1.5 py-0.5 rounded border"
                            style={{ borderColor: "rgba(229,193,118,0.35)", color: "#e9c176", background: "rgba(229,193,118,0.08)" }}
                          >
                            <span className="material-symbols-outlined text-[11px]">lock</span>
                            kilitli
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        {(["tr", "en", "ar"] as const).map((l) => (
                          <code
                            key={l}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded border bg-surface-container-highest border-outline-variant/15 text-on-surface/55 truncate max-w-[280px]"
                            title={p.slugs[l]}
                          >
                            <span className="text-on-surface/35 mr-1">{l.toUpperCase()}</span>
                            {p.slugs[l]}
                          </code>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span
                        className={`text-[10px] font-label tracking-wider uppercase px-2 py-0.5 rounded border ${
                          active
                            ? "bg-success/10 text-success border-success/30"
                            : "bg-surface-container-highest text-on-surface/40 border-outline-variant/20"
                        }`}
                      >
                        {active ? "Aktif" : "Pasif"}
                      </span>

                      <button
                        type="button"
                        onClick={() => toggle(p.internal, active)}
                        disabled={locked || isPending}
                        title={
                          locked
                            ? "Bu sayfa kilitli — pasifleştirilemez."
                            : active
                              ? "Pasife al (anasayfaya 301 redirect)"
                              : "Aktife al"
                        }
                        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                          active ? "bg-primary" : "bg-surface-container-highest border border-outline-variant/30"
                        } ${locked ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:opacity-90"} ${
                          isPending ? "animate-pulse" : ""
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                            active ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
