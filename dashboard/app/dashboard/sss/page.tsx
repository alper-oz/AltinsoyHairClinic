import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import FaqManager, { type Faq } from "@/components/dashboard/FaqManager";

export const metadata = { title: "SSS Yönetimi — Altınsoy Dashboard" };

async function getFaqs(): Promise<Faq[]> {
  const { data } = await supabaseAdmin
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  return (data ?? []) as Faq[];
}

export default async function SssPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const faqs = await getFaqs();

  const total      = faqs.length;
  const visible    = faqs.filter(f => f.visible).length;
  const homepage   = faqs.filter(f => f.page === "homepage").length;
  const oncesiSonrasi = faqs.filter(f => f.page === "oncesi-sonrasi").length;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-headline text-2xl text-on-surface">SSS Yönetimi</h1>
        <p className="text-sm text-on-surface/50 mt-1">Sıkça sorulan sorular — sayfa bazlı yönetim, sıralama, görünürlük</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Toplam Soru",    value: total,           sub: "Tüm sayfalar"      },
          { label: "Yayında",        value: visible,         sub: "Sitede görünür"    },
          { label: "Anasayfa",       value: homepage,        sub: "Homepage SSS"      },
          { label: "Öncesi Sonrası", value: oncesiSonrasi,   sub: "Galeri SSS"        },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-surface-container-low border border-outline-variant/15 rounded p-5">
            <p className="text-[10px] font-label tracking-widest uppercase text-on-surface/50 mb-1">{label}</p>
            <p className="font-headline text-3xl text-primary">{value}</p>
            <p className="text-xs text-on-surface/40 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Manager */}
      <FaqManager initial={faqs} />
    </div>
  );
}
