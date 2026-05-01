import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getSocialLinks } from "@/lib/social";
import SocialManager from "@/components/dashboard/SocialManager";

export const metadata = { title: "Sosyal Medya — Altınsoy Dashboard" };

export default async function SosyalMedyaPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const links = await getSocialLinks();

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline text-2xl" style={{ color: "#d1c5b4" }}>Sosyal Medya</h1>
        <p className="text-sm mt-1" style={{ color: "#4a4035" }}>
          Platform linklerini yönetin — aktif olanlar footer ve iletişim sayfasında otomatik görünür
        </p>
      </div>

      <SocialManager initial={links} />
    </div>
  );
}
