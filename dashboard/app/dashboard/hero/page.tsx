import { supabaseAdmin } from "@/lib/supabase/admin";
import HeroEditor, { type HeroConfig } from "@/components/dashboard/HeroEditor";

export const metadata = { title: "Hero Yönetimi — Altınsoy Dashboard" };

async function getHeroConfig(): Promise<HeroConfig | null> {
  const { data, error } = await supabaseAdmin
    .from("hero_config")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    console.error("Hero config fetch error:", error);
    return null;
  }
  return data;
}

export default async function HeroPage() {
  const config = await getHeroConfig();

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline text-2xl text-on-surface">Hero Yönetimi</h1>
        <p className="text-sm text-on-surface/50 mt-1">Ana sayfanın tam ekran giriş bölümü</p>
      </div>

      <div className="bg-surface-container-low border border-outline-variant/15 rounded p-6">
        {config ? (
          <HeroEditor config={config} />
        ) : (
          <div className="text-center py-12 text-on-surface/40 text-sm">
            <span className="material-symbols-outlined text-4xl block mb-3 opacity-30">error</span>
            Hero config yüklenemedi. Supabase bağlantısını ve tabloyu kontrol edin.
          </div>
        )}
      </div>
    </div>
  );
}
