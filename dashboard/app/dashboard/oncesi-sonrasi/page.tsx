import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import CaseManager, { type CaseStudy } from "@/components/dashboard/CaseManager";

export const metadata = { title: "Öncesi Sonrası — Altınsoy Dashboard" };

async function getCases(): Promise<CaseStudy[]> {
  const { data } = await supabaseAdmin
    .from("case_studies")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  return (data ?? []) as CaseStudy[];
}

export default async function CasesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const cases = await getCases();

  const total    = cases.length;
  const visible  = cases.filter(c => c.visible).length;
  const withBoth = cases.filter(c => c.before_url && c.after_url).length;
  const procMap: Record<string, number> = {};
  cases.forEach(c => { procMap[c.procedure] = (procMap[c.procedure] ?? 0) + 1; });
  const topProc = Object.entries(procMap).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-headline text-2xl text-on-surface">Öncesi Sonrası</h1>
        <p className="text-sm text-on-surface/50 mt-1">Vaka galerisi yönetimi — fotoğraf, meta bilgi, sıralama</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Toplam Vaka",    value: total,    sub: "Tüm vakalar"       },
          { label: "Yayında",        value: visible,  sub: "Sitede görünür"    },
          { label: "Fotoğraf Tam",   value: withBoth, sub: "Önce + Sonra var"  },
          { label: "En Çok",         value: topProc,  sub: "Popüler prosedür"  },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-surface-container-low border border-outline-variant/15 rounded p-5">
            <p className="text-[10px] font-label tracking-widest uppercase text-on-surface/50 mb-1">{label}</p>
            <p className="font-headline text-3xl text-primary">{value}</p>
            <p className="text-xs text-on-surface/40 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Manager */}
      <CaseManager initial={cases} />
    </div>
  );
}
