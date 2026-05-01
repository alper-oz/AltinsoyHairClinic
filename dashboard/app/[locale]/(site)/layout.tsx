import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import ChatWidget from "@/components/site/ChatWidget";
import CookieBanner from "@/components/site/CookieBanner";
import GsapProvider from "@/components/site/GsapProvider";
import ThemeProvider from "@/components/site/ThemeProvider";
import SiteBanner from "@/components/site/SiteBanner";
import UTMCapture from "@/components/site/UTMCapture";
import VisitorTracker from "@/components/site/VisitorTracker";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getSocialUrl } from "@/lib/social";
import { pickField } from "@/lib/i18n-content";

export const metadata: Metadata = {
  robots: "index, follow",
};

async function getActiveBanners(locale: string) {
  try {
    const { data } = await supabaseAdmin
      .from("banners")
      .select("*")
      .eq("active", true)
      .eq("position", "top")
      .order("created_at", { ascending: false });
    return (data ?? []).map((b) => ({
      id: b.id,
      title:     pickField(b, "title", locale) ?? b.title,
      body:      pickField(b, "body", locale),
      cta_label: pickField(b, "cta_label", locale),
      cta_url:   b.cta_url,
      position:  b.position,
    }));
  } catch {
    return [];
  }
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const [banners, waUrl, messages] = await Promise.all([
    getActiveBanners(locale),
    getSocialUrl("whatsapp"),
    getMessages(),
  ]);

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <div className="bg-background text-on-surface font-body">
          <UTMCapture />
          <VisitorTracker />
          <SiteBanner banners={banners} />
          <Navbar />
          <GsapProvider />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat url={waUrl} />
          <ChatWidget />
          <CookieBanner />
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
