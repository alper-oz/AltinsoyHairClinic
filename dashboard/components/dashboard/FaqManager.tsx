"use client";

import { useState, useTransition } from "react";
import { LocaleTabs, ADMIN_LOCALES, type AdminLocale } from "./LocaleTabs";

export interface Faq {
  id: string;
  created_at: string;
  question:   string;
  answer:     string;
  page:       string;
  sort_order: number;
  visible:    boolean;
  // Locale alanları
  question_en?: string | null;
  question_ar?: string | null;
  answer_en?:   string | null;
  answer_ar?:   string | null;
}

const PAGES = [
  { value: "homepage",       label: "Anasayfa" },
  { value: "oncesi-sonrasi", label: "Öncesi Sonrası" },
];

function pageLabel(p: string) {
  return PAGES.find(x => x.value === p)?.label ?? p;
}

type LocalizedFields = { question: string; answer: string };

const PLACEHOLDERS: Record<AdminLocale, LocalizedFields> = {
  tr: { question: "Saç ekimi ağrılı mı?", answer: "Operasyon lokal anestezi altında yapılır…" },
  en: { question: "Is hair transplantation painful?", answer: "The procedure is performed under local anaesthesia…" },
  ar: { question: "هل زراعة الشعر مؤلمة؟", answer: "تُجرى العملية تحت تخدير موضعي…" },
};

interface Draft {
  byLocale: Record<AdminLocale, LocalizedFields>;
  page: string;
  sort_order: number;
  visible: boolean;
}

const EMPTY_DRAFT: Draft = {
  byLocale: {
    tr: { question: "", answer: "" },
    en: { question: "", answer: "" },
    ar: { question: "", answer: "" },
  },
  page: "homepage",
  sort_order: 0,
  visible: true,
};

function draftFromFaq(f: Faq): Draft {
  return {
    byLocale: {
      tr: { question: f.question ?? "", answer: f.answer ?? "" },
      en: { question: f.question_en ?? "", answer: f.answer_en ?? "" },
      ar: { question: f.question_ar ?? "", answer: f.answer_ar ?? "" },
    },
    page: f.page,
    sort_order: f.sort_order,
    visible: f.visible,
  };
}

function draftToPayload(d: Draft) {
  return {
    question:    d.byLocale.tr.question,
    answer:      d.byLocale.tr.answer,
    question_en: d.byLocale.en.question,
    answer_en:   d.byLocale.en.answer,
    question_ar: d.byLocale.ar.question,
    answer_ar:   d.byLocale.ar.answer,
    page:        d.page,
    sort_order:  d.sort_order,
    visible:     d.visible,
  };
}

export default function FaqManager({ initial }: { initial: Faq[] }) {
  const [faqs,       setFaqs]       = useState<Faq[]>(initial);
  const [filterPage, setFilterPage] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Faq | null>(null);
  const [draft,      setDraft]      = useState<Draft>(EMPTY_DRAFT);
  const [activeLocale, setActiveLocale] = useState<AdminLocale>("tr");
  const [saving,     setSaving]     = useState(false);
  const [deleteId,   setDeleteId]   = useState<string | null>(null);
  const [saveError,  setSaveError]  = useState(false);
  const [, startTransition]         = useTransition();

  function openAdd() {
    setEditTarget(null);
    setDraft(EMPTY_DRAFT);
    setActiveLocale("tr");
    setSaveError(false);
    setDrawerOpen(true);
  }
  function openEdit(f: Faq) {
    setEditTarget(f);
    setDraft(draftFromFaq(f));
    setActiveLocale("tr");
    setSaveError(false);
    setDrawerOpen(true);
  }

  async function handleSave() {
    if (!draft.byLocale.tr.question.trim() || !draft.byLocale.tr.answer.trim()) {
      setActiveLocale("tr");
      return;
    }
    setSaving(true); setSaveError(false);
    try {
      const isEdit = !!editTarget;
      const res = await fetch(
        isEdit ? `/api/faqs/${editTarget!.id}` : "/api/faqs",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draftToPayload(draft)),
        }
      );
      if (!res.ok) throw new Error();
      const saved: Faq = await res.json();
      startTransition(() => {
        setFaqs(prev =>
          isEdit ? prev.map(f => f.id === saved.id ? saved : f) : [saved, ...prev]
        );
      });
      setDrawerOpen(false);
    } catch { setSaveError(true); }
    finally { setSaving(false); }
  }

  async function toggleVisible(id: string, current: boolean) {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, visible: !current } : f));
    const res = await fetch(`/api/faqs/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !current }),
    });
    if (!res.ok) setFaqs(prev => prev.map(f => f.id === id ? { ...f, visible: current } : f));
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" });
    if (res.ok) { setFaqs(prev => prev.filter(f => f.id !== id)); setDeleteId(null); }
  }

  const filtered = filterPage === "all" ? faqs : faqs.filter(f => f.page === filterPage);

  const current = draft.byLocale[activeLocale];
  const dir = activeLocale === "ar" ? "rtl" : "ltr";

  const setLocField = (key: keyof LocalizedFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDraft(d => ({
        ...d,
        byLocale: { ...d.byLocale, [activeLocale]: { ...d.byLocale[activeLocale], [key]: e.target.value } },
      }));

  const filledCount: Record<AdminLocale, number> = {
    tr: Object.values(draft.byLocale.tr).filter((v) => v.trim() !== "").length,
    en: Object.values(draft.byLocale.en).filter((v) => v.trim() !== "").length,
    ar: Object.values(draft.byLocale.ar).filter((v) => v.trim() !== "").length,
  };

  function langBadgesFor(f: Faq): AdminLocale[] {
    const out: AdminLocale[] = [];
    if (f.question && f.answer) out.push("tr");
    if (f.question_en && f.answer_en) out.push("en");
    if (f.question_ar && f.answer_ar) out.push("ar");
    return out;
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex gap-2">
          {[{ value: "all", label: "Tümü" }, ...PAGES].map(p => (
            <button key={p.value} onClick={() => setFilterPage(p.value)}
              className={`px-4 py-1.5 rounded-sm text-[11px] font-label uppercase tracking-wider transition-all ${
                filterPage === p.value
                  ? "bg-primary text-on-primary"
                  : "border border-outline-variant/20 text-on-surface/50 hover:border-primary/30 hover:text-on-surface/80"
              }`}>
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2 rounded-sm text-xs font-label uppercase tracking-wider hover:bg-primary-container transition-all">
          <span className="material-symbols-outlined text-[16px]">add</span>
          Yeni Soru
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-on-surface/30">
          <span className="material-symbols-outlined text-5xl block mb-3 opacity-20">quiz</span>
          <p className="text-sm">Henüz SSS eklenmemiş.</p>
          <p className="text-xs mt-1 text-on-surface/20">Yeni Soru butonuyla ekleyebilirsiniz.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((f, i) => {
            const langs = langBadgesFor(f);
            return (
              <div key={f.id}
                className={`bg-surface-container-low border rounded-lg px-5 py-4 flex items-start gap-4 transition-all ${
                  f.visible ? "border-outline-variant/15" : "border-outline-variant/8 opacity-55"
                }`}>
                <span className="text-[11px] text-on-surface/25 font-label w-5 pt-0.5 flex-shrink-0">{i + 1}</span>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-on-surface mb-1 leading-snug">{f.question}</p>
                  <p className="text-xs text-on-surface/50 line-clamp-2 leading-relaxed">{f.answer}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-[10px] font-label tracking-wider bg-surface-container-highest text-on-surface/40 px-2 py-0.5 rounded-full">
                      {pageLabel(f.page)}
                    </span>
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
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button onClick={() => toggleVisible(f.id, f.visible)}
                    className={`flex items-center gap-1 text-[10px] font-label px-2.5 py-1 rounded-md transition-all ${
                      f.visible
                        ? "bg-success/10 text-success border border-success/20"
                        : "bg-surface-container-highest text-on-surface/35 border border-outline-variant/15 hover:border-primary/20"
                    }`}>
                    <span className="material-symbols-outlined text-[13px]">{f.visible ? "visibility" : "visibility_off"}</span>
                    {f.visible ? "Aktif" : "Gizli"}
                  </button>
                  <button onClick={() => openEdit(f)}
                    className="p-1.5 rounded hover:bg-surface-container-highest text-on-surface/40 hover:text-on-surface/80 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                  <button onClick={() => setDeleteId(f.id)}
                    className="p-1.5 rounded hover:bg-error/10 text-on-surface/30 hover:text-error transition-colors">
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => !saving && setDrawerOpen(false)} />
          <div className="w-full max-w-lg bg-[#0e0e0e] border-l border-outline-variant/15 flex flex-col h-full">
            <div className="px-6 py-5 border-b border-outline-variant/15 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary/70 text-[20px]">quiz</span>
              <h2 className="font-headline text-lg text-on-surface flex-1">
                {editTarget ? "Soruyu Düzenle" : "Yeni Soru Ekle"}
              </h2>
              <button onClick={() => !saving && setDrawerOpen(false)} className="text-on-surface/40 hover:text-on-surface/80 transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

              <div>
                <p className="text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-2">Sayfa</p>
                <div className="flex gap-2">
                  {PAGES.map(p => (
                    <button key={p.value} onClick={() => setDraft(d => ({ ...d, page: p.value }))}
                      className={`flex-1 py-2 rounded-lg text-xs font-label tracking-wide transition-all ${
                        draft.page === p.value
                          ? "bg-primary text-on-primary"
                          : "border border-outline-variant/20 text-on-surface/50 hover:border-primary/30"
                      }`}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── 3-dilli içerik ── */}
              <div>
                <p className="text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-2">İçerik (3 Dil)</p>
                <LocaleTabs active={activeLocale} onChange={setActiveLocale} filledCount={filledCount} totalFields={2} size="sm" />

                <div className="space-y-4 pt-4">
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-1.5">
                      Soru {activeLocale === "tr" && <span className="text-error">*</span>}
                    </label>
                    <input
                      value={current.question}
                      onChange={setLocField("question")}
                      dir={dir}
                      placeholder={PLACEHOLDERS[activeLocale].question}
                      className="w-full bg-surface-container-highest border border-outline-variant/20 focus:border-primary/50 rounded-lg px-3 py-2 text-sm text-on-surface outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-1.5">
                      Cevap {activeLocale === "tr" && <span className="text-error">*</span>}
                    </label>
                    <textarea
                      value={current.answer}
                      onChange={setLocField("answer")}
                      rows={6}
                      dir={dir}
                      placeholder={PLACEHOLDERS[activeLocale].answer}
                      className="w-full bg-surface-container-highest border border-outline-variant/20 focus:border-primary/50 rounded-lg px-3 py-2 text-sm text-on-surface outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-1.5">
                  Sıra <span className="normal-case text-on-surface/25">(küçük = öne, tüm dillerde ortak)</span>
                </label>
                <input type="number" min={0} max={999}
                  value={draft.sort_order}
                  onChange={e => setDraft(d => ({ ...d, sort_order: parseInt(e.target.value) || 0 }))}
                  className="w-full bg-surface-container-highest border border-outline-variant/20 focus:border-primary/50 rounded-lg px-3 py-2 text-sm text-on-surface outline-none transition-colors"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" checked={draft.visible} onChange={e => setDraft(d => ({ ...d, visible: e.target.checked }))} className="sr-only" />
                  <div className={`w-10 h-5 rounded-full transition-colors ${draft.visible ? "bg-primary" : "bg-surface-container-highest border border-outline-variant/30"}`} />
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${draft.visible ? "translate-x-5" : "translate-x-0"}`} />
                </div>
                <span className="text-sm text-on-surface/70 group-hover:text-on-surface/90 transition-colors">
                  {draft.visible ? "Sitede yayında" : "Gizli (taslak)"}
                </span>
              </label>
            </div>

            <div className="px-6 py-4 border-t border-outline-variant/15 flex flex-col gap-2">
              <div className="flex gap-3">
                <button onClick={() => !saving && setDrawerOpen(false)}
                  className="flex-1 border border-outline-variant/20 text-on-surface/60 hover:text-on-surface/90 py-2.5 rounded-sm text-xs font-label uppercase tracking-wider transition-all">
                  İptal
                </button>
                <button onClick={handleSave}
                  disabled={!draft.byLocale.tr.question.trim() || !draft.byLocale.tr.answer.trim() || saving}
                  className="flex-1 bg-primary text-on-primary py-2.5 rounded-sm text-xs font-label uppercase tracking-wider hover:bg-primary-container transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                  {saving ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3 h-3 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                      Kaydediliyor…
                    </span>
                  ) : (editTarget ? "Kaydet" : "Ekle")}
                </button>
              </div>
              {saveError && <p className="text-xs text-error text-center">Bir hata oluştu. Tekrar deneyin.</p>}
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0e0e0e] border border-outline-variant/20 rounded-lg p-6 max-w-sm w-full">
            <h3 className="font-headline text-lg text-on-surface mb-2">Soruyu sil?</h3>
            <p className="text-sm text-on-surface/60 mb-6">Bu işlem geri alınamaz.</p>
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
