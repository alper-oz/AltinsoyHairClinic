import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import DashboardHome, { type DashboardStats } from "@/components/dashboard/DashboardHome";
import TrendingNews from "@/components/dashboard/TrendingNews";

export const metadata = { title: "Genel Bakış — Altınsoy Dashboard" };

const CHART_DAYS = 30;

async function getStats(): Promise<DashboardStats> {
  const now   = new Date();
  const today = new Date(now); today.setHours(0, 0, 0, 0);
  const week  = new Date(today); week.setDate(week.getDate() - 7);
  const chartStart = new Date(today); chartStart.setDate(chartStart.getDate() - (CHART_DAYS - 1));

  const [leadsRes, casesRes, faqsRes, heroRes, bannersRes] = await Promise.allSettled([
    supabaseAdmin.from("leads").select("id,name,phone,source,status,created_at").order("created_at", { ascending: false }),
    supabaseAdmin.from("case_studies").select("id,visible"),
    supabaseAdmin.from("faqs").select("id,visible"),
    supabaseAdmin.from("hero_config").select("image_url,headline").limit(1).single(),
    supabaseAdmin.from("banners").select("id,active"),
  ]);

  /* Leads */
  const allLeads   = leadsRes.status === "fulfilled" ? (leadsRes.value.data ?? []) : [];
  const todayLeads = allLeads.filter(l => new Date(l.created_at) >= today).length;
  const weekLeads  = allLeads.filter(l => new Date(l.created_at) >= week).length;
  const converted  = allLeads.filter(l => l.status === "converted").length;
  const convRate   = allLeads.length > 0 ? Math.round((converted / allLeads.length) * 100) : 0;
  const recent     = allLeads.slice(0, 8);

  /* Chart — son CHART_DAYS gün, her gün için lead sayısı */
  const monthFmt = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short" });
  const chartData = Array.from({ length: CHART_DAYS }, (_, i) => {
    const d = new Date(chartStart);
    d.setDate(d.getDate() + i);
    const iso  = d.toISOString().slice(0, 10);
    const next = new Date(d); next.setDate(next.getDate() + 1);
    const count = allLeads.filter(l => {
      const t = new Date(l.created_at);
      return t >= d && t < next;
    }).length;
    return { date: monthFmt.format(d), iso, leads: count };
  });

  /* Cases */
  const allCases  = casesRes.status === "fulfilled" ? (casesRes.value.data ?? []) : [];
  const visCases  = allCases.filter(c => c.visible).length;

  /* FAQs */
  const allFaqs   = faqsRes.status === "fulfilled" ? (faqsRes.value.data ?? []) : [];
  const visFaqs   = allFaqs.filter(f => f.visible).length;

  /* Hero */
  const heroData  = heroRes.status === "fulfilled" ? heroRes.value.data : null;

  /* Banners */
  const allBanners    = bannersRes.status === "fulfilled" ? (bannersRes.value.data ?? []) : [];
  const activeBanners = allBanners.filter(b => b.active).length;

  return {
    leads: { total: allLeads.length, today: todayLeads, week: weekLeads, converted, convRate, recent, chartData },
    cases:   { total: allCases.length, visible: visCases  },
    faqs:    { total: allFaqs.length,  visible: visFaqs   },
    hero:    { hasImage: !!heroData?.image_url, headline: heroData?.headline ?? null },
    banners: { active: activeBanners },
  };
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const stats = await getStats();

  return (
    <div className="p-6 md:p-8">
      <DashboardHome stats={stats} newsWidget={<TrendingNews />} />
    </div>
  );
}
