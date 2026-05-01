"use client";

import { useState, useRef, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { LocaleTabs, ADMIN_LOCALES, type AdminLocale } from "./LocaleTabs";

/* ─── Types ─── */
export interface CaseStudy {
  id: string;
  created_at: string;
  title: string;
  procedure: string;
  technique: string;
  grafts: number | null;
  duration: string | null;
  age: number | null;
  gender: string;
  before_url: string | null;
  after_url: string | null;
  visible: boolean;
  sort_order: number;
  notes: string | null;
  // Locale alanları
  title_en?: string | null;
  title_ar?: string | null;
  notes_en?: string | null;
  notes_ar?: string | null;
}

type LocalizedFields = { title: string; notes: string };
type SaveState = "idle" | "uploading" | "saving" | "error";

const PROCEDURES  = ["Saç Ekimi", "Sakal Ekimi", "Kaş Ekimi"];
const TECHNIQUES  = ["FUE", "DHI", "Safir FUE"];
const DURATIONS   = ["3 ay", "6 ay", "8 ay", "10 ay", "12 ay", "14 ay", "16 ay", "18 ay"];
const GENDERS     = ["erkek", "kadın"];

const PLACEHOLDERS: Record<AdminLocale, LocalizedFields> = {
  tr: { title: "ör. Norwood III Ön Hat Restorasyonu", notes: "Admin notları..." },
  en: { title: "e.g. Norwood III Frontal Restoration",   notes: "Internal notes..." },
  ar: { title: "مثل: ترميم خط أمامي نوروود III",          notes: "ملاحظات داخلية..." },
};

interface Draft {
  byLocale: Record<AdminLocale, LocalizedFields>;
  procedure: string;
  technique: string;
  grafts: number | null;
  duration: string | null;
  age: number | null;
  gender: string;
  before_url: string | null;
  after_url: string | null;
  visible: boolean;
  sort_order: number;
}

const EMPTY_DRAFT: Draft = {
  byLocale: {
    tr: { title: "", notes: "" },
    en: { title: "", notes: "" },
    ar: { title: "", notes: "" },
  },
  procedure: "Saç Ekimi", technique: "FUE",
  grafts: null, duration: null, age: null, gender: "erkek",
  before_url: null, after_url: null,
  visible: false, sort_order: 0,
};

function draftFromCase(c: CaseStudy): Draft {
  return {
    byLocale: {
      tr: { title: c.title ?? "",         notes: c.notes ?? "" },
      en: { title: c.title_en ?? "",      notes: c.notes_en ?? "" },
      ar: { title: c.title_ar ?? "",      notes: c.notes_ar ?? "" },
    },
    procedure: c.procedure, technique: c.technique,
    grafts: c.grafts, duration: c.duration, age: c.age, gender: c.gender,
    before_url: c.before_url, after_url: c.after_url,
    visible: c.visible, sort_order: c.sort_order,
  };
}

function draftToPayload(d: Draft) {
  return {
    title:      d.byLocale.tr.title,
    notes:      d.byLocale.tr.notes || null,
    title_en:   d.byLocale.en.title,
    notes_en:   d.byLocale.en.notes,
    title_ar:   d.byLocale.ar.title,
    notes_ar:   d.byLocale.ar.notes,
    procedure:  d.procedure,
    technique:  d.technique,
    grafts:     d.grafts,
    duration:   d.duration,
    age:        d.age,
    gender:     d.gender,
    before_url: d.before_url,
    after_url:  d.after_url,
    visible:    d.visible,
    sort_order: d.sort_order,
  };
}

async function uploadPhoto(file: File, slot: "before" | "after"): Promise<string | null> {
  try {
    const supabase = createClient();
    const ext  = file.name.split(".").pop() ?? "jpg";
    const path = `cases/${slot}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("lead-photos").upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) { console.error("Upload error:", error); return null; }
    return supabase.storage.from("lead-photos").getPublicUrl(path).data.publicUrl;
  } catch { return null; }
}

function categoryLabel(c: CaseStudy) {
  if (c.procedure === "Saç Ekimi") return `Saç ${c.technique}`;
  return c.procedure.replace(" Ekimi", "");
}

function PhotoSlot({
  label, url, preview, onFile,
}: {
  label: string; url: string | null; preview: string | null;
  onFile: (f: File) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const src = preview ?? url;
  return (
    <div className="flex-1">
      <p className="text-[10px] tracking-widest uppercase text-on-surface/40 mb-1.5 font-label">{label}</p>
      <input ref={ref} type="file" accept="image/*" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
      <button type="button" onClick={() => ref.current?.click()}
        className="w-full h-28 rounded overflow-hidden border border-outline-variant/20 hover:border-primary/40 transition-colors relative group">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-surface-container-highest flex flex-col items-center justify-center gap-1">
            <span className="material-symbols-outlined text-[22px] text-on-surface/30 group-hover:text-primary/60 transition-colors">add_photo_alternate</span>
            <span className="text-[10px] text-on-surface/30">Ekle</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-[18px]">edit</span>
        </div>
      </button>
    </div>
  );
}

export default function CaseManager({ initial }: { initial: CaseStudy[] }) {
  const [cases,       setCases]       = useState<CaseStudy[]>(initial);
  const [filterProc,  setFilterProc]  = useState("tümü");
  const [drawerOpen,  setDrawerOpen]  = useState(false);
  const [editTarget,  setEditTarget]  = useState<CaseStudy | null>(null);
  const [deleteId,    setDeleteId]    = useState<string | null>(null);
  const [draft,       setDraft]       = useState<Draft>(EMPTY_DRAFT);
  const [activeLocale, setActiveLocale] = useState<AdminLocale>("tr");
  const [beforeFile,  setBeforeFile]  = useState<File | null>(null);
  const [afterFile,   setAfterFile]   = useState<File | null>(null);
  const [beforePrev,  setBeforePrev]  = useState<string | null>(null);
  const [afterPrev,   setAfterPrev]   = useState<string | null>(null);
  const [saveState,   setSaveState]   = useState<SaveState>("idle");
  const [, startTransition]           = useTransition();

  function openAdd() {
    setEditTarget(null);
    setDraft(EMPTY_DRAFT);
    setActiveLocale("tr");
    setBeforeFile(null); setAfterFile(null);
    setBeforePrev(null); setAfterPrev(null);
    setSaveState("idle");
    setDrawerOpen(true);
  }
  function openEdit(c: CaseStudy) {
    setEditTarget(c);
    setDraft(draftFromCase(c));
    setActiveLocale("tr");
    setBeforeFile(null); setAfterFile(null);
    setBeforePrev(null); setAfterPrev(null);
    setSaveState("idle");
    setDrawerOpen(true);
  }

  function setField<K extends keyof Omit<Draft, "byLocale">>(key: K, val: Draft[K]) {
    setDraft(d => ({ ...d, [key]: val }));
  }

  function setLocField(key: keyof LocalizedFields, val: string) {
    setDraft(d => ({
      ...d,
      byLocale: { ...d.byLocale, [activeLocale]: { ...d.byLocale[activeLocale], [key]: val } },
    }));
  }

  function handleBeforeFile(f: File) { setBeforeFile(f); setBeforePrev(URL.createObjectURL(f)); }
  function handleAfterFile(f: File)  { setAfterFile(f);  setAfterPrev(URL.createObjectURL(f)); }

  async function handleSave() {
    if (!draft.byLocale.tr.title) { setActiveLocale("tr"); return; }
    setSaveState("uploading");

    let before_url = draft.before_url;
    let after_url  = draft.after_url;

    if (beforeFile) { const u = await uploadPhoto(beforeFile, "before"); if (u) before_url = u; }
    if (afterFile)  { const u = await uploadPhoto(afterFile,  "after");  if (u) after_url  = u; }

    setSaveState("saving");
    try {
      const payload = { ...draftToPayload(draft), before_url, after_url };
      const isEdit = !!editTarget;
      const res = await fetch(
        isEdit ? `/api/cases/${editTarget!.id}` : "/api/cases",
        { method: isEdit ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
      );
      if (!res.ok) throw new Error();
      const saved: CaseStudy = await res.json();
      startTransition(() => {
        setCases(prev =>
          isEdit ? prev.map(c => c.id === saved.id ? saved : c) : [saved, ...prev]
        );
      });
      setDrawerOpen(false);
      setSaveState("idle");
    } catch {
      setSaveState("error");
    }
  }

  async function toggleVisible(id: string, current: boolean) {
    setCases(prev => prev.map(c => c.id === id ? { ...c, visible: !current } : c));
    const res = await fetch(`/api/cases/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !current }),
    });
    if (!res.ok) setCases(prev => prev.map(c => c.id === id ? { ...c, visible: current } : c));
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/cases/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCases(prev => prev.filter(c => c.id !== id));
      setDeleteId(null);
    }
  }

  const filtered = filterProc === "tümü"
    ? cases
    : cases.filter(c => c.procedure === filterProc);

  const procedures = ["tümü", ...PROCEDURES];
  const busy = saveState === "uploading" || saveState === "saving";

  const current = draft.byLocale[activeLocale];
  const dir = activeLocale === "ar" ? "rtl" : "ltr";

  const filledCount: Record<AdminLocale, number> = {
    tr: (draft.byLocale.tr.title.trim() ? 1 : 0) + (draft.byLocale.tr.notes.trim() ? 1 : 0),
    en: (draft.byLocale.en.title.trim() ? 1 : 0) + (draft.byLocale.en.notes.trim() ? 1 : 0),
    ar: (draft.byLocale.ar.title.trim() ? 1 : 0) + (draft.byLocale.ar.notes.trim() ? 1 : 0),
  };

  function langBadgesFor(c: CaseStudy): AdminLocale[] {
    const out: AdminLocale[] = [];
    if (c.title) out.push("tr");
    if (c.title_en) out.push("en");
    if (c.title_ar) out.push("ar");
    return out;
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex flex-wrap gap-2 flex-1">
          {procedures.map(p => (
            <button key={p} onClick={() => setFilterProc(p)}
              className={`px-4 py-1.5 rounded-sm text-[11px] font-label uppercase tracking-wider transition-all ${
                filterProc === p
                  ? "bg-primary text-on-primary"
                  : "border border-outline-variant/20 text-on-surface/50 hover:border-primary/30 hover:text-on-surface/80"
              }`}>
              {p}
            </button>
          ))}
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2 rounded-sm text-xs font-label uppercase tracking-wider hover:bg-primary-container transition-all">
          <span className="material-symbols-outlined text-[16px]">add</span>
          Yeni Vaka
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-on-surface/30">
          <span className="material-symbols-outlined text-5xl block mb-3 opacity-20">photo_library</span>
          <p className="text-sm">Henüz vaka yok.</p>
          <p className="text-xs mt-1">Yeni Vaka butonuyla ekleyebilirsiniz.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(c => {
            const langs = langBadgesFor(c);
            return (
              <div key={c.id}
                className={`bg-surface-container-low border rounded overflow-hidden transition-all ${
                  c.visible ? "border-outline-variant/15" : "border-outline-variant/8 opacity-60"
                }`}>
                <div className="flex h-36 relative">
                  <div className="flex-1 bg-surface-container-highest overflow-hidden relative">
                    {c.before_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.before_url} alt="Öncesi" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[28px] text-on-surface/15">hide_image</span>
                      </div>
                    )}
                    <span className="absolute bottom-1.5 left-1.5 text-[9px] font-label tracking-widest uppercase bg-black/60 text-white/70 px-1.5 py-0.5 rounded-sm">Önce</span>
                  </div>
                  <div className="w-px bg-surface-container" />
                  <div className="flex-1 bg-surface-container-highest overflow-hidden relative">
                    {c.after_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.after_url} alt="Sonrası" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[28px] text-on-surface/15">hide_image</span>
                      </div>
                    )}
                    <span className="absolute bottom-1.5 right-1.5 text-[9px] font-label tracking-widest uppercase bg-primary/80 text-on-primary px-1.5 py-0.5 rounded-sm">Sonra</span>
                  </div>
                  <span className="absolute top-2 left-2 text-[9px] font-label tracking-wider uppercase bg-surface-container/90 text-on-surface/80 px-2 py-0.5 rounded-sm backdrop-blur-sm">
                    {categoryLabel(c)}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-medium text-on-surface mb-2 leading-snug">{c.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-on-surface/50 mb-2">
                    {c.age      && <span><span className="text-on-surface/30">Yaş</span> {c.age}</span>}
                    {c.gender   && <span className="capitalize">{c.gender}</span>}
                    {c.grafts   && <span><span className="text-on-surface/30">Greft</span> {c.grafts.toLocaleString("tr-TR")}</span>}
                    {c.duration && <span><span className="text-on-surface/30">Süre</span> {c.duration}</span>}
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {ADMIN_LOCALES.map((l) => (
                      <span
                        key={l}
                        title={langs.includes(l) ? `${l.toUpperCase()} dolu` : `${l.toUpperCase()} boş — TR'ye fallback`}
                        className={`text-[9px] font-label tracking-wider uppercase px-1.5 py-0.5 rounded ${
                          langs.includes(l)
                            ? "bg-success/15 text-success border border-success/30"
                            : "bg-surface-container-highest text-on-surface/30 border border-outline-variant/15"
                        }`}
                      >
                        {l}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-outline-variant/10">
                    <button onClick={() => toggleVisible(c.id, c.visible)}
                      className={`flex items-center gap-1.5 text-[11px] font-label px-2.5 py-1 rounded-sm transition-all ${
                        c.visible
                          ? "bg-success/10 text-success border border-success/20"
                          : "bg-surface-container-highest text-on-surface/40 border border-outline-variant/15 hover:border-primary/20"
                      }`}>
                      <span className="material-symbols-outlined text-[13px]">{c.visible ? "visibility" : "visibility_off"}</span>
                      {c.visible ? "Yayında" : "Gizli"}
                    </button>
                    <div className="flex-1" />
                    <button onClick={() => openEdit(c)}
                      className="p-1.5 rounded hover:bg-surface-container-highest text-on-surface/40 hover:text-on-surface/80 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                    </button>
                    <button onClick={() => setDeleteId(c.id)}
                      className="p-1.5 rounded hover:bg-error/10 text-on-surface/30 hover:text-error transition-colors">
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => !busy && setDrawerOpen(false)} />
          <div className="w-full max-w-lg bg-[#0e0e0e] border-l border-outline-variant/15 flex flex-col h-full overflow-hidden">
            <div className="px-6 py-5 border-b border-outline-variant/15 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary/70 text-[20px]">photo_library</span>
              <h2 className="font-headline text-lg text-on-surface flex-1">
                {editTarget ? "Vakayı Düzenle" : "Yeni Vaka Ekle"}
              </h2>
              <button onClick={() => !busy && setDrawerOpen(false)}
                className="text-on-surface/40 hover:text-on-surface/80 transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

              <div>
                <p className="text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-3">Fotoğraflar</p>
                <div className="flex gap-3">
                  <PhotoSlot label="Öncesi" url={draft.before_url} preview={beforePrev} onFile={handleBeforeFile} />
                  <PhotoSlot label="Sonrası" url={draft.after_url}  preview={afterPrev}  onFile={handleAfterFile}  />
                </div>
              </div>

              {/* ── 3-dilli içerik ── */}
              <div>
                <p className="text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-2">İçerik (3 Dil)</p>
                <LocaleTabs active={activeLocale} onChange={setActiveLocale} filledCount={filledCount} totalFields={2} size="sm" />

                <div className="space-y-4 pt-4">
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-1.5">
                      Başlık {activeLocale === "tr" && <span className="text-error">*</span>}
                    </label>
                    <input
                      value={current.title}
                      onChange={e => setLocField("title", e.target.value)}
                      dir={dir}
                      placeholder={PLACEHOLDERS[activeLocale].title}
                      className="w-full bg-surface-container-highest border border-outline-variant/20 focus:border-primary/50 rounded px-3 py-2 text-sm text-on-surface outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-1.5">
                      Notlar (iç kullanım)
                    </label>
                    <textarea
                      value={current.notes}
                      onChange={e => setLocField("notes", e.target.value)}
                      rows={2}
                      dir={dir}
                      placeholder={PLACEHOLDERS[activeLocale].notes}
                      className="w-full bg-surface-container-highest border border-outline-variant/20 focus:border-primary/50 rounded px-3 py-2 text-sm text-on-surface outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* ── Locale-bağımsız teknik bilgiler ── */}
              <div>
                <p className="text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-3">
                  Teknik Bilgiler <span className="normal-case text-on-surface/25">(tüm dillerde ortak)</span>
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-1.5">Prosedür</label>
                    <select value={draft.procedure} onChange={e => setField("procedure", e.target.value)}
                      className="w-full bg-surface-container-highest border border-outline-variant/20 focus:border-primary/50 rounded px-3 py-2 text-sm text-on-surface outline-none transition-colors">
                      {PROCEDURES.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-1.5">Teknik</label>
                    <select value={draft.technique} onChange={e => setField("technique", e.target.value)}
                      className="w-full bg-surface-container-highest border border-outline-variant/20 focus:border-primary/50 rounded px-3 py-2 text-sm text-on-surface outline-none transition-colors">
                      {TECHNIQUES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-1.5">Yaş</label>
                    <input type="number" min={18} max={80}
                      value={draft.age ?? ""}
                      onChange={e => setField("age", e.target.value ? parseInt(e.target.value) : null)}
                      placeholder="34"
                      className="w-full bg-surface-container-highest border border-outline-variant/20 focus:border-primary/50 rounded px-3 py-2 text-sm text-on-surface outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-1.5">Cinsiyet</label>
                    <select value={draft.gender} onChange={e => setField("gender", e.target.value)}
                      className="w-full bg-surface-container-highest border border-outline-variant/20 focus:border-primary/50 rounded px-3 py-2 text-sm text-on-surface outline-none transition-colors">
                      {GENDERS.map(g => <option key={g} className="capitalize">{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-1.5">Greft Sayısı</label>
                    <input type="number" min={100} max={10000} step={50}
                      value={draft.grafts ?? ""}
                      onChange={e => setField("grafts", e.target.value ? parseInt(e.target.value) : null)}
                      placeholder="3200"
                      className="w-full bg-surface-container-highest border border-outline-variant/20 focus:border-primary/50 rounded px-3 py-2 text-sm text-on-surface outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-1.5">Sonuç Süresi</label>
                    <select value={draft.duration ?? ""}
                      onChange={e => setField("duration", e.target.value || null)}
                      className="w-full bg-surface-container-highest border border-outline-variant/20 focus:border-primary/50 rounded px-3 py-2 text-sm text-on-surface outline-none transition-colors">
                      <option value="">Seç</option>
                      {DURATIONS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-1.5">
                  Sıralama <span className="normal-case text-on-surface/25">(küçük = öne)</span>
                </label>
                <input type="number" min={0} max={999}
                  value={draft.sort_order}
                  onChange={e => setField("sort_order", parseInt(e.target.value) || 0)}
                  className="w-full bg-surface-container-highest border border-outline-variant/20 focus:border-primary/50 rounded px-3 py-2 text-sm text-on-surface outline-none transition-colors"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" checked={draft.visible} onChange={e => setField("visible", e.target.checked)} className="sr-only" />
                  <div className={`w-10 h-5 rounded-full transition-colors ${draft.visible ? "bg-primary" : "bg-surface-container-highest border border-outline-variant/30"}`} />
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${draft.visible ? "translate-x-5" : "translate-x-0"}`} />
                </div>
                <span className="text-sm text-on-surface/70 group-hover:text-on-surface/90 transition-colors">
                  {draft.visible ? "Sitede yayında" : "Gizli (taslak)"}
                </span>
              </label>
            </div>

            <div className="px-6 py-4 border-t border-outline-variant/15 flex items-center gap-3">
              <button onClick={() => !busy && setDrawerOpen(false)}
                className="flex-1 border border-outline-variant/20 text-on-surface/60 hover:text-on-surface/90 py-2.5 rounded-sm text-xs font-label uppercase tracking-wider transition-all">
                İptal
              </button>
              <button onClick={handleSave} disabled={!draft.byLocale.tr.title || busy}
                className="flex-1 bg-primary text-on-primary py-2.5 rounded-sm text-xs font-label uppercase tracking-wider hover:bg-primary-container transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                {busy ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-3 h-3 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                    {saveState === "uploading" ? "Fotoğraf yükleniyor…" : "Kaydediliyor…"}
                  </span>
                ) : (editTarget ? "Kaydet" : "Ekle")}
              </button>
            </div>
            {saveState === "error" && (
              <p className="px-6 pb-3 text-xs text-error text-center">Bir hata oluştu. Tekrar deneyin.</p>
            )}
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0e0e0e] border border-outline-variant/20 rounded p-6 max-w-sm w-full">
            <h3 className="font-headline text-lg text-on-surface mb-2">Vakayı sil?</h3>
            <p className="text-sm text-on-surface/60 mb-6">Bu işlem geri alınamaz. Fotoğraflar Storage&apos;da kalır.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 border border-outline-variant/20 text-on-surface/60 py-2.5 rounded-sm text-xs font-label uppercase tracking-wider hover:text-on-surface/90 transition-colors">
                İptal
              </button>
              <button onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-error text-on-error py-2.5 rounded-sm text-xs font-label uppercase tracking-wider hover:opacity-90 transition-opacity">
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
