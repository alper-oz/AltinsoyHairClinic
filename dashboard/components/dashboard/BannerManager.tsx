"use client";

import { useState, useTransition } from "react";
import { LocaleTabs, ADMIN_LOCALES, type AdminLocale } from "./LocaleTabs";

export interface Banner {
  id: string;
  created_at: string;
  title: string;
  body: string | null;
  cta_label: string | null;
  cta_url: string | null;
  active: boolean;
  position: string;
  // Locale alanları
  title_en?: string | null;
  title_ar?: string | null;
  body_en?: string | null;
  body_ar?: string | null;
  cta_label_en?: string | null;
  cta_label_ar?: string | null;
}

const POSITION_LABEL: Record<string, string> = {
  top:    "Üst Şerit",
  hero:   "Hero",
  footer: "Alt",
};

type LocalizedFields = { title: string; body: string; cta_label: string };

const emptyLocalized: LocalizedFields = { title: "", body: "", cta_label: "" };

const PLACEHOLDERS: Record<AdminLocale, LocalizedFields> = {
  tr: {
    title: "Özel fiyat kampanyası başlıyor!",
    body: "Bu ay FUE operasyonlarında %10 indirim",
    cta_label: "Hemen Ara",
  },
  en: {
    title: "Special pricing campaign is live!",
    body: "10% off FUE procedures this month",
    cta_label: "Call Now",
  },
  ar: {
    title: "حملة أسعار خاصة!",
    body: "خصم 10٪ على عمليات FUE هذا الشهر",
    cta_label: "اتصل الآن",
  },
};

export default function BannerManager({ initialBanners }: { initialBanners: Banner[] }) {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [byLocale, setByLocale] = useState<Record<AdminLocale, LocalizedFields>>({
    tr: { ...emptyLocalized },
    en: { ...emptyLocalized },
    ar: { ...emptyLocalized },
  });
  const [shared, setShared] = useState({ cta_url: "", position: "top" });
  const [active, setActive] = useState<AdminLocale>("tr");
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function resetForm() {
    setByLocale({ tr: { ...emptyLocalized }, en: { ...emptyLocalized }, ar: { ...emptyLocalized } });
    setShared({ cta_url: "", position: "top" });
    setActive("tr");
    setFormError("");
  }

  function toggleActive(id: string, current: boolean) {
    setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, active: !current } : b)));
    startTransition(async () => {
      try {
        await fetch(`/api/banners/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ active: !current }),
        });
      } catch {
        setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, active: current } : b)));
      }
    });
  }

  async function deleteBanner(id: string) {
    if (!confirm("Bu banner'ı silmek istediğinize emin misiniz?")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/banners/${id}`, { method: "DELETE" });
      setBanners((prev) => prev.filter((b) => b.id !== id));
    } catch {
      alert("Silme işlemi başarısız.");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    if (!byLocale.tr.title.trim()) {
      setFormError("Türkçe başlık zorunludur.");
      setActive("tr");
      return;
    }
    setFormLoading(true);
    try {
      const res = await fetch("/api/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title:         byLocale.tr.title,
          body:          byLocale.tr.body,
          cta_label:     byLocale.tr.cta_label,
          title_en:      byLocale.en.title,
          title_ar:      byLocale.ar.title,
          body_en:       byLocale.en.body,
          body_ar:       byLocale.ar.body,
          cta_label_en:  byLocale.en.cta_label,
          cta_label_ar:  byLocale.ar.cta_label,
          cta_url:       shared.cta_url,
          position:      shared.position,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        setFormError(err.error ?? "Hata oluştu.");
        return;
      }
      const newBanner: Banner = await res.json();
      setBanners((prev) => [newBanner, ...prev]);
      resetForm();
      setShowForm(false);
    } catch {
      setFormError("Bağlantı hatası.");
    } finally {
      setFormLoading(false);
    }
  }

  const current = byLocale[active];
  const dir = active === "ar" ? "rtl" : "ltr";

  const setField = (key: keyof LocalizedFields) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setByLocale((prev) => ({
        ...prev,
        [active]: { ...prev[active], [key]: e.target.value },
      }));

  const filledCount: Record<AdminLocale, number> = {
    tr: Object.values(byLocale.tr).filter((v) => v.trim() !== "").length,
    en: Object.values(byLocale.en).filter((v) => v.trim() !== "").length,
    ar: Object.values(byLocale.ar).filter((v) => v.trim() !== "").length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-on-surface/50">
          {banners.filter((b) => b.active).length} aktif / {banners.length} toplam banner
        </p>
        <button
          onClick={() => { setShowForm((s) => !s); if (showForm) resetForm(); }}
          className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded text-xs font-label tracking-wider uppercase hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">{showForm ? "close" : "add"}</span>
          {showForm ? "İptal" : "Yeni Banner"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-surface-container-low border border-outline-variant/15 rounded p-6 mb-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-on-surface mb-1">Yeni Banner</h3>
            <p className="text-[11px] text-on-surface/40 mb-3">
              TR alanları zorunludur. EN/AR boş bırakılırsa o dilde TR&apos;ye düşer.
            </p>
            <LocaleTabs active={active} onChange={setActive} filledCount={filledCount} totalFields={3} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-[10px] font-label tracking-widest uppercase text-on-surface/50">
                Başlık {active === "tr" && <span className="text-error">*</span>}
              </label>
              <input
                type="text"
                value={current.title}
                onChange={setField("title")}
                dir={dir}
                placeholder={PLACEHOLDERS[active].title}
                className="bg-surface-container border border-outline-variant/20 rounded px-3 py-2.5 text-sm text-on-surface outline-none focus:border-primary/40 transition-colors"
              />
            </div>

            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-[10px] font-label tracking-widest uppercase text-on-surface/50">Açıklama</label>
              <input
                type="text"
                value={current.body}
                onChange={setField("body")}
                dir={dir}
                placeholder={PLACEHOLDERS[active].body}
                className="bg-surface-container border border-outline-variant/20 rounded px-3 py-2.5 text-sm text-on-surface outline-none focus:border-primary/40 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-label tracking-widest uppercase text-on-surface/50">CTA Butonu</label>
              <input
                type="text"
                value={current.cta_label}
                onChange={setField("cta_label")}
                dir={dir}
                placeholder={PLACEHOLDERS[active].cta_label}
                className="bg-surface-container border border-outline-variant/20 rounded px-3 py-2.5 text-sm text-on-surface outline-none focus:border-primary/40 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-label tracking-widest uppercase text-on-surface/50">
                CTA Linki <span className="text-on-surface/30">(tüm dillerde ortak)</span>
              </label>
              <input
                type="text"
                value={shared.cta_url}
                onChange={(e) => setShared({ ...shared, cta_url: e.target.value })}
                placeholder="/iletisim veya tel:+905539784242"
                className="bg-surface-container border border-outline-variant/20 rounded px-3 py-2.5 text-sm text-on-surface outline-none focus:border-primary/40 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-label tracking-widest uppercase text-on-surface/50">
                Pozisyon <span className="text-on-surface/30">(tüm dillerde ortak)</span>
              </label>
              <select
                value={shared.position}
                onChange={(e) => setShared({ ...shared, position: e.target.value })}
                className="bg-surface-container border border-outline-variant/20 rounded px-3 py-2.5 text-sm text-on-surface outline-none focus:border-primary/40 transition-colors cursor-pointer"
              >
                <option value="top">Üst Şerit</option>
                <option value="hero">Hero</option>
                <option value="footer">Alt</option>
              </select>
            </div>
          </div>

          {formError && (
            <p className="text-xs text-error bg-error/10 border border-error/20 rounded px-3 py-2">{formError}</p>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={formLoading}
              className="bg-primary text-on-primary px-6 py-2.5 rounded text-xs font-label tracking-wider uppercase hover:bg-primary-container transition-colors disabled:opacity-60"
            >
              {formLoading ? "Oluşturuluyor…" : "Banner Oluştur"}
            </button>
          </div>
        </form>
      )}

      {banners.length === 0 ? (
        <div className="text-center py-20 text-on-surface/40 text-sm">
          <span className="material-symbols-outlined text-4xl block mb-3 opacity-30">image</span>
          Henüz banner yok. Yukarıdan yeni bir tane oluşturun.
        </div>
      ) : (
        <div className="space-y-3">
          {banners.map((banner) => {
            const langBadges: AdminLocale[] = (["tr", "en", "ar"] as const).filter((l) => {
              if (l === "tr") return !!banner.title;
              return !!banner[`title_${l}` as const];
            });
            return (
              <div
                key={banner.id}
                className={`flex items-start gap-4 p-4 rounded border transition-colors ${
                  banner.active
                    ? "bg-primary/5 border-primary/20"
                    : "bg-surface-container-low border-outline-variant/15"
                }`}
              >
                <button
                  onClick={() => toggleActive(banner.id, banner.active)}
                  disabled={isPending}
                  title={banner.active ? "Pasife al" : "Aktife al"}
                  className={`mt-0.5 flex-shrink-0 w-10 h-5 rounded-full transition-colors relative disabled:opacity-50 ${
                    banner.active ? "bg-primary" : "bg-surface-container-high"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      banner.active ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-medium text-on-surface text-sm">{banner.title}</p>
                    <span className={`text-[10px] font-label tracking-wider uppercase px-2 py-0.5 rounded border ${
                      banner.active
                        ? "text-primary border-primary/30 bg-primary/10"
                        : "text-on-surface/40 border-outline-variant/20"
                    }`}>
                      {banner.active ? "Aktif" : "Pasif"}
                    </span>
                    <span className="text-[10px] text-on-surface/40 font-label tracking-wider uppercase border border-outline-variant/15 px-2 py-0.5 rounded">
                      {POSITION_LABEL[banner.position] ?? banner.position}
                    </span>
                    {/* Hangi dillerde dolu */}
                    <span className="flex items-center gap-1 ml-auto">
                      {ADMIN_LOCALES.map((l) => (
                        <span
                          key={l}
                          title={langBadges.includes(l) ? `${l.toUpperCase()} dolu` : `${l.toUpperCase()} boş — TR'ye fallback`}
                          className={`text-[9px] font-label tracking-wider uppercase px-1.5 py-0.5 rounded ${
                            langBadges.includes(l)
                              ? "bg-success/15 text-success border border-success/30"
                              : "bg-surface-container-high text-on-surface/30 border border-outline-variant/15"
                          }`}
                        >
                          {l}
                        </span>
                      ))}
                    </span>
                  </div>
                  {banner.body && (
                    <p className="text-xs text-on-surface/60 mt-0.5 truncate">{banner.body}</p>
                  )}
                  {banner.cta_label && (
                    <p className="text-[11px] text-primary/70 mt-1">
                      <span className="material-symbols-outlined text-[12px] align-middle mr-0.5">link</span>
                      {banner.cta_label}{banner.cta_url ? ` → ${banner.cta_url}` : ""}
                    </p>
                  )}
                  <p className="text-[10px] text-on-surface/30 mt-1.5">
                    {new Date(banner.created_at).toLocaleDateString("tr-TR", { day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                </div>

                <button
                  onClick={() => deleteBanner(banner.id)}
                  disabled={deletingId === banner.id}
                  className="text-on-surface/30 hover:text-error transition-colors disabled:opacity-40 flex-shrink-0"
                  title="Sil"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
