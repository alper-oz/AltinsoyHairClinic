import type { Metadata } from "next";
import { getAllPageSettings } from "@/lib/page-settings";
import SitemapManager from "@/components/dashboard/SitemapManager";

export const metadata: Metadata = {
  title: "Sitemap | Altınsoy Admin",
  robots: "noindex, nofollow",
};

export default async function SitemapPage() {
  const settings = await getAllPageSettings();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-2xl tracking-tight text-on-surface mb-1">Sitemap</h1>
        <p className="text-sm text-on-surface/50">
          Sitedeki tüm sayfaların aktif/pasif durumunu yönetin. Pasif sayfalar 3 dilde de
          anasayfaya 301 redirect verir. Anasayfa ve yasal sayfalar kilitlidir.
        </p>
      </div>
      <SitemapManager initial={settings} />
    </div>
  );
}
