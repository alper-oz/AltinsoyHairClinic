import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ImageGenerator from "@/components/dashboard/ImageGenerator";

export const metadata = { title: "Görsel Üret — Altınsoy Dashboard" };

export default async function GorselUretPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="font-headline text-2xl text-on-surface">Görsel Üret</h1>
          <span className="text-[10px] font-label tracking-widest uppercase bg-primary/15 text-primary px-2.5 py-1 rounded-full border border-primary/20">
            Nano Banana · Imagen 4
          </span>
        </div>
        <p className="text-sm text-on-surface/50">
          Google Imagen 4 ile site için AI görsel üretin — hero, galeri, sosyal medya.
        </p>
      </div>

      <ImageGenerator />
    </div>
  );
}
