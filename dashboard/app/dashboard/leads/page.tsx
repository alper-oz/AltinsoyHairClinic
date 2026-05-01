import { createClient } from "@/lib/supabase/server";
import LeadTable, { type Lead } from "@/components/dashboard/LeadTable";

export const metadata = { title: "Lead Yönetimi — Altınsoy Dashboard" };

async function getLeads(): Promise<Lead[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Leads fetch error:", error);
    return [];
  }
  return data ?? [];
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/15 rounded p-5">
      <p className="text-[10px] font-label tracking-widest uppercase text-on-surface/50 mb-1">{label}</p>
      <p className="font-headline text-3xl text-primary">{value}</p>
      {sub && <p className="text-xs text-on-surface/40 mt-1">{sub}</p>}
    </div>
  );
}

export default async function LeadsPage() {
  const leads = await getLeads();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const todayCount = leads.filter((l) => new Date(l.created_at) >= today).length;
  const weekCount  = leads.filter((l) => new Date(l.created_at) >= weekAgo).length;
  const converted  = leads.filter((l) => l.status === "converted").length;
  const convRate   = leads.length > 0 ? Math.round((converted / leads.length) * 100) : 0;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Başlık */}
      <div className="mb-8">
        <h1 className="font-headline text-2xl text-on-surface">Lead Yönetimi</h1>
        <p className="text-sm text-on-surface/50 mt-1">Tüm potansiyel hasta kayıtları</p>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Toplam Lead"    value={leads.length} />
        <StatCard label="Bugün Gelen"    value={todayCount} />
        <StatCard label="Bu Hafta"       value={weekCount} />
        <StatCard label="Dönüşüm Oranı" value={`%${convRate}`} sub={`${converted} dönüştü`} />
      </div>

      {/* Tablo */}
      <LeadTable initialLeads={leads as Lead[]} />
    </div>
  );
}
