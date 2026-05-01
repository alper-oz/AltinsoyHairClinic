export type LeadStatus = "new" | "contacted" | "consulted" | "converted" | "lost";

const STATUS_CONFIG: Record<LeadStatus, { label: string; colors: string }> = {
  new:       { label: "Yeni",         colors: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
  contacted: { label: "Arandı",       colors: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20" },
  consulted: { label: "Konsültasyon", colors: "bg-orange-500/15 text-orange-400 border-orange-500/20" },
  converted: { label: "Dönüştü",      colors: "bg-green-500/15 text-green-400 border-green-500/20" },
  lost:      { label: "Kayıp",        colors: "bg-surface-container text-on-surface/40 border-outline-variant/20" },
};

export default function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.new;
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-label tracking-wider uppercase border ${cfg.colors}`}>
      {cfg.label}
    </span>
  );
}

export { STATUS_CONFIG };
