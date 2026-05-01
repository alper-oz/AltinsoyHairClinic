"use client";

import { useState, useTransition } from "react";
import LeadStatusBadge, { type LeadStatus, STATUS_CONFIG } from "./LeadStatusBadge";

export interface Lead {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  interest: string | null;
  hair_loss: string | null;
  source: string | null;
  status: LeadStatus;
  notes: string | null;
  photo_url: string | null;
}

const SOURCE_LABEL: Record<string, string> = {
  homepage:      "Anasayfa",
  "sac-analizi": "Saç Analizi",
  "client-data": "Danışan Formu",
};

const INTEREST_LABEL: Record<string, string> = {
  "Saç Restorasyonu": "Saç",
  "Sakal Ekimi":      "Sakal",
  "Kaş Restorasyonu": "Kaş",
};

/* ─── Detay çekmecesi ─── */
function LeadDrawer({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Çekmece */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-surface-container-low border-l border-outline-variant/15 z-50 overflow-y-auto flex flex-col shadow-2xl">
        {/* Üst bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/15 sticky top-0 bg-surface-container-low">
          <div>
            <h3 className="font-medium text-on-surface text-sm">{lead.name}</h3>
            <p className="text-xs text-on-surface/40 mt-0.5">
              {new Date(lead.created_at).toLocaleDateString("tr-TR", {
                day: "2-digit", month: "long", year: "numeric",
                hour: "2-digit", minute: "2-digit",
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface/40 hover:text-on-surface transition-colors p-1"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Fotoğraf */}
        {lead.photo_url ? (
          <div className="mx-6 mt-6 rounded overflow-hidden border border-outline-variant/15">
            <img
              src={lead.photo_url}
              alt={`${lead.name} saç fotoğrafı`}
              className="w-full object-cover max-h-64"
            />
            <div className="px-3 py-2 bg-surface-container flex items-center justify-between">
              <span className="text-[10px] text-on-surface/40 font-label tracking-wider uppercase">Yüklenen Fotoğraf</span>
              <a
                href={lead.photo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-primary hover:text-primary/80 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                Tam boyut
              </a>
            </div>
          </div>
        ) : (
          <div className="mx-6 mt-6 rounded border border-outline-variant/10 border-dashed flex items-center justify-center py-8 text-on-surface/20">
            <span className="material-symbols-outlined text-[28px] mr-2">photo_camera</span>
            <span className="text-xs">Fotoğraf yüklenmedi</span>
          </div>
        )}

        {/* Bilgiler */}
        <div className="px-6 py-6 space-y-5 flex-1">
          <Row icon="phone" label="Telefon">
            <a href={`tel:${lead.phone}`} className="text-primary hover:underline">{lead.phone}</a>
          </Row>
          {lead.email && (
            <Row icon="mail" label="E-posta">
              <a href={`mailto:${lead.email}`} className="text-primary hover:underline">{lead.email}</a>
            </Row>
          )}
          <Row icon="interests" label="İlgi Alanı">
            {lead.interest ?? "—"}
          </Row>
          <Row icon="hair_dryer" label="Dökülme Profili">
            {lead.hair_loss ?? "—"}
          </Row>
          <Row icon="ads_click" label="Kaynak">
            {SOURCE_LABEL[lead.source ?? ""] ?? lead.source ?? "—"}
          </Row>
          {lead.notes && (
            <Row icon="note" label="Notlar">
              <span className="whitespace-pre-wrap">{lead.notes}</span>
            </Row>
          )}
        </div>

        {/* Alt eylemler */}
        <div className="px-6 py-4 border-t border-outline-variant/15 flex gap-3">
          <a
            href={`tel:${lead.phone}`}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-on-primary py-2.5 rounded text-xs font-label tracking-wider uppercase hover:bg-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">call</span>
            Ara
          </a>
          {lead.email && (
            <a
              href={`mailto:${lead.email}`}
              className="flex-1 flex items-center justify-center gap-2 border border-outline-variant/20 text-on-surface/70 py-2.5 rounded text-xs font-label tracking-wider uppercase hover:border-primary/30 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">mail</span>
              E-posta
            </a>
          )}
        </div>
      </div>
    </>
  );
}

function Row({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="material-symbols-outlined text-[16px] text-on-surface/30 mt-0.5 flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-label tracking-widest uppercase text-on-surface/40 mb-0.5">{label}</p>
        <div className="text-sm text-on-surface/80">{children}</div>
      </div>
    </div>
  );
}

/* ─── Ana tablo ─── */
export default function LeadTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "all">("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filtered = filterStatus === "all" ? leads : leads.filter((l) => l.status === filterStatus);

  async function updateStatus(id: string, status: LeadStatus) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    startTransition(async () => {
      try {
        await fetch(`/api/leads/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
      } catch {
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: leads.find((x) => x.id === id)!.status } : l)));
      }
    });
  }

  async function deleteLead(id: string) {
    if (!confirm("Bu lead'i silmek istediğinize emin misiniz?")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/leads/${id}`, { method: "DELETE" });
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selectedLead?.id === id) setSelectedLead(null);
    } catch {
      alert("Silme işlemi başarısız.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      {/* Filtre */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-3 py-1.5 rounded text-xs font-label tracking-wider uppercase border transition-colors ${
            filterStatus === "all"
              ? "bg-primary/15 text-primary border-primary/30"
              : "border-outline-variant/20 text-on-surface/50 hover:text-primary hover:border-primary/20"
          }`}
        >
          Tümü ({leads.length})
        </button>
        {(Object.keys(STATUS_CONFIG) as LeadStatus[]).map((s) => {
          const count = leads.filter((l) => l.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded text-xs font-label tracking-wider uppercase border transition-colors ${
                filterStatus === s
                  ? "bg-primary/15 text-primary border-primary/30"
                  : "border-outline-variant/20 text-on-surface/50 hover:text-primary hover:border-primary/20"
              }`}
            >
              {STATUS_CONFIG[s].label} ({count})
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-on-surface/40 text-sm">
          <span className="material-symbols-outlined text-4xl block mb-3 opacity-30">inbox</span>
          Bu kategoride lead yok.
        </div>
      ) : (
        <div className="overflow-x-auto rounded border border-outline-variant/15">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-outline-variant/15 bg-surface-container-lowest">
                <th className="text-left px-4 py-3 text-[10px] font-label tracking-widest uppercase text-on-surface/50">Ad</th>
                <th className="text-left px-4 py-3 text-[10px] font-label tracking-widest uppercase text-on-surface/50">Telefon</th>
                <th className="text-left px-4 py-3 text-[10px] font-label tracking-widest uppercase text-on-surface/50 hidden md:table-cell">İlgi</th>
                <th className="text-left px-4 py-3 text-[10px] font-label tracking-widest uppercase text-on-surface/50 hidden lg:table-cell">Kaynak</th>
                <th className="text-left px-4 py-3 text-[10px] font-label tracking-widest uppercase text-on-surface/50">Durum</th>
                <th className="text-left px-4 py-3 text-[10px] font-label tracking-widest uppercase text-on-surface/50 hidden sm:table-cell">Tarih</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      {/* Fotoğraf göstergesi */}
                      {lead.photo_url ? (
                        <img
                          src={lead.photo_url}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-primary/20"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-surface-container-high flex-shrink-0 flex items-center justify-center">
                          <span className="text-xs font-medium text-on-surface/40">
                            {lead.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-on-surface text-sm">{lead.name}</p>
                        {lead.email && <p className="text-xs text-on-surface/50 mt-0.5">{lead.email}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                    <a href={`tel:${lead.phone}`} className="text-primary/80 hover:text-primary transition-colors text-sm">
                      {lead.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell text-on-surface/70 text-xs">
                    {lead.interest ? INTEREST_LABEL[lead.interest] ?? lead.interest : "—"}
                    {lead.hair_loss && (
                      <p className="text-on-surface/40 mt-0.5">{lead.hair_loss}</p>
                    )}
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell text-on-surface/50 text-xs">
                    {SOURCE_LABEL[lead.source ?? ""] ?? lead.source ?? "—"}
                  </td>
                  <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={lead.status}
                      disabled={isPending}
                      onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                      className="text-[11px] font-label tracking-wider uppercase bg-transparent border border-outline-variant/20 rounded px-2 py-1 text-on-surface cursor-pointer hover:border-primary/30 transition-colors outline-none"
                    >
                      {(Object.keys(STATUS_CONFIG) as LeadStatus[]).map((s) => (
                        <option key={s} value={s} className="bg-surface-container text-on-surface normal-case tracking-normal">
                          {STATUS_CONFIG[s].label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3.5 hidden sm:table-cell text-xs text-on-surface/40 whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleDateString("tr-TR", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => deleteLead(lead.id)}
                      disabled={deletingId === lead.id}
                      className="text-on-surface/30 hover:text-error transition-colors disabled:opacity-40"
                      title="Sil"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detay çekmecesi */}
      {selectedLead && (
        <LeadDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}
