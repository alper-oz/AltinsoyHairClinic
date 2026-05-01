import { createClient } from "@/lib/supabase/server";
import BannerManager, { type Banner } from "@/components/dashboard/BannerManager";

export const metadata = { title: "Banner Yönetimi — Altınsoy Dashboard" };

async function getBanners(): Promise<Banner[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Banners fetch error:", error);
    return [];
  }
  return data ?? [];
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/15 rounded p-5">
      <p className="text-[10px] font-label tracking-widest uppercase text-on-surface/50 mb-1">{label}</p>
      <p className="font-headline text-3xl text-primary">{value}</p>
    </div>
  );
}

export default async function BannerPage() {
  const banners = await getBanners();

  const activeCount  = banners.filter((b) => b.active).length;
  const topCount     = banners.filter((b) => b.position === "top").length;
  const heroCount    = banners.filter((b) => b.position === "hero").length;

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Başlık */}
      <div className="mb-8">
        <h1 className="font-headline text-2xl text-on-surface">Banner Yönetimi</h1>
        <p className="text-sm text-on-surface/50 mt-1">Site genelinde görünen duyuru ve kampanya bantları</p>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Toplam Banner"  value={banners.length} />
        <StatCard label="Aktif"          value={activeCount} />
        <StatCard label="Üst Şerit"      value={topCount} />
        <StatCard label="Hero"           value={heroCount} />
      </div>

      {/* Manager */}
      <BannerManager initialBanners={banners as Banner[]} />
    </div>
  );
}
