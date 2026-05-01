import { supabaseAdmin } from "@/lib/supabase/admin";
import { channelLabel } from "@/lib/utm";

export const metadata = { title: "Trafik Kanalları — Altınsoy Dashboard" };

/* ─── Veri çekme ─── */
async function getData() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const iso = thirtyDaysAgo.toISOString();

  const [leadsRes, viewsRes] = await Promise.all([
    supabaseAdmin
      .from("leads")
      .select("utm_source, utm_medium, utm_campaign, status, created_at")
      .gte("created_at", iso)
      .order("created_at", { ascending: true }),
    supabaseAdmin
      .from("page_views")
      .select("page, utm_source, utm_medium, created_at")
      .gte("created_at", iso)
      .order("created_at", { ascending: true }),
  ]);

  return {
    leads:     leadsRes.data  ?? [],
    pageViews: viewsRes.data  ?? [],
  };
}

/* ─── Yardımcı tipler ─── */
interface ChannelStat {
  channel: string;
  leads:   number;
  converted: number;
}

/* ─── Kanal renkleri ─── */
const CHANNEL_COLORS: Record<string, string> = {
  "Google Ads":      "#4285F4",
  "Google Organik":  "#34A853",
  "Google":          "#34A853",
  "Sosyal Medya":    "#E1306C",
  "Facebook":        "#1877F2",
  "TikTok":          "#010101",
  "YouTube":         "#FF0000",
  "E-posta":         "#F4B400",
  "Referans Site":   "#9C27B0",
  "Direkt":          "#78909C",
  "Diğer":           "#B0BEC5",
};

function getColor(channel: string) {
  return CHANNEL_COLORS[channel] ?? "#9E9E9E";
}

/* ─── Bileşenler ─── */
function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/15 rounded p-5">
      <p className="text-[10px] font-label tracking-widest uppercase text-on-surface/50 mb-1">{label}</p>
      <p className="font-headline text-3xl text-primary">{value}</p>
      {sub && <p className="text-xs text-on-surface/40 mt-1">{sub}</p>}
    </div>
  );
}

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex-1 bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

/* ─── Son 30 günün günlük görüntülenme bar chart'ı ─── */
function DailyChart({ views }: { views: { created_at: string }[] }) {
  // Son 14 günü göster
  const days: { label: string; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString("tr-TR", { day: "2-digit", month: "short" });
    const count = views.filter((v) => v.created_at.slice(0, 10) === key).length;
    days.push({ label, count });
  }
  const max = Math.max(...days.map((d) => d.count), 1);

  return (
    <div className="bg-surface-container-low border border-outline-variant/15 rounded p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-medium text-on-surface">Günlük Sayfa Görüntülenme</h3>
          <p className="text-[10px] text-on-surface/40 mt-0.5 font-label tracking-wider uppercase">Son 14 gün</p>
        </div>
        <span className="text-2xl font-headline text-primary">{views.length.toLocaleString("tr-TR")}</span>
      </div>
      <div className="flex items-end gap-1 h-28">
        {days.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
            <div className="relative w-full flex flex-col items-center justify-end" style={{ height: 88 }}>
              {/* Tooltip */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-surface-container-highest text-on-surface text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {d.count}
              </div>
              <div
                className="w-full rounded-sm transition-all duration-500"
                style={{
                  height: `${Math.max((d.count / max) * 88, d.count > 0 ? 4 : 0)}px`,
                  backgroundColor: d.count > 0 ? "#e9c176" : "#353534",
                  opacity: d.count > 0 ? 0.85 : 0.3,
                }}
              />
            </div>
            <span className="text-[8px] text-on-surface/30 rotate-45 origin-left whitespace-nowrap hidden sm:block">
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── En çok ziyaret edilen sayfalar ─── */
function TopPages({ views }: { views: { page: string }[] }) {
  const counts: Record<string, number> = {};
  views.forEach((v) => { counts[v.page] = (counts[v.page] ?? 0) + 1; });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const max = sorted[0]?.[1] ?? 1;

  return (
    <div className="bg-surface-container-low border border-outline-variant/15 rounded p-6">
      <h3 className="text-sm font-medium text-on-surface mb-4">En Çok Ziyaret Edilen Sayfalar</h3>
      <div className="space-y-3">
        {sorted.length === 0 ? (
          <p className="text-xs text-on-surface/40 py-4 text-center">Henüz veri yok</p>
        ) : sorted.map(([page, count]) => (
          <div key={page} className="flex items-center gap-3">
            <span className="text-xs text-on-surface/60 font-mono w-40 truncate flex-shrink-0">{page}</span>
            <div className="flex-1 bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-primary/60 rounded-full"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
            <span className="text-xs text-on-surface/50 w-8 text-right flex-shrink-0">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Ana sayfa ─── */
export default async function TrafikPage() {
  const { leads, pageViews } = await getData();

  // Kanal istatistikleri
  const channelMap: Record<string, ChannelStat> = {};
  leads.forEach((lead) => {
    const ch = channelLabel(
      (lead as { utm_source?: string }).utm_source ?? null,
      (lead as { utm_medium?: string }).utm_medium ?? null
    );
    if (!channelMap[ch]) channelMap[ch] = { channel: ch, leads: 0, converted: 0 };
    channelMap[ch].leads++;
    if ((lead as { status: string }).status === "converted") channelMap[ch].converted++;
  });
  const channels = Object.values(channelMap).sort((a, b) => b.leads - a.leads);
  const totalLeads = leads.length;

  // Kampanya istatistikleri
  const campaignMap: Record<string, number> = {};
  leads.forEach((lead) => {
    const c = (lead as { utm_campaign?: string }).utm_campaign;
    if (c) campaignMap[c] = (campaignMap[c] ?? 0) + 1;
  });
  const campaigns = Object.entries(campaignMap).sort((a, b) => b[1] - a[1]);

  // Genel metrikler
  const totalViews     = pageViews.length;
  const convRate       = totalLeads > 0
    ? Math.round((leads.filter((l) => (l as { status: string }).status === "converted").length / totalLeads) * 100)
    : 0;
  const viewToLeadRate = totalViews > 0 ? ((totalLeads / totalViews) * 100).toFixed(1) : "0";

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Başlık */}
      <div className="mb-8">
        <h1 className="font-headline text-2xl text-on-surface">Trafik Kanalları</h1>
        <p className="text-sm text-on-surface/50 mt-1">Son 30 günün kanal ve dönüşüm verileri</p>
      </div>

      {/* Özet kartlar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Sayfa Görüntülenme" value={totalViews.toLocaleString("tr-TR")} sub="Son 30 gün" />
        <StatCard label="Toplam Lead"         value={totalLeads} sub="Son 30 gün" />
        <StatCard label="Dönüşüm Oranı"       value={`%${convRate}`} sub="Lead → Müşteri" />
        <StatCard label="Ziyaret → Lead"      value={`%${viewToLeadRate}`} sub="Genel oran" />
      </div>

      {/* Kanal breakdown + Bar chart */}
      <div className="grid lg:grid-cols-[1fr_420px] gap-6 mb-6">

        {/* Günlük chart */}
        <DailyChart views={pageViews} />

        {/* Kanal tablosu */}
        <div className="bg-surface-container-low border border-outline-variant/15 rounded p-6">
          <h3 className="text-sm font-medium text-on-surface mb-4">Kanal Başına Lead</h3>

          {channels.length === 0 ? (
            <div className="text-center py-8 text-on-surface/30 text-xs">
              <span className="material-symbols-outlined text-3xl block mb-2 opacity-30">bar_chart</span>
              Henüz lead verisi yok. Formlara UTM parametreli linklerle trafik gönderin.
            </div>
          ) : (
            <div className="space-y-3">
              {channels.map((ch) => {
                const color = getColor(ch.channel);
                const convPct = ch.leads > 0 ? Math.round((ch.converted / ch.leads) * 100) : 0;
                return (
                  <div key={ch.channel}>
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs text-on-surface/80 flex-1">{ch.channel}</span>
                      <span className="text-xs font-medium text-on-surface">{ch.leads}</span>
                      <span className="text-[10px] text-on-surface/40 w-10 text-right">%{convPct}</span>
                    </div>
                    <MiniBar value={ch.leads} max={totalLeads} color={color} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Alt satır: Sayfalar + Kampanyalar */}
      <div className="grid lg:grid-cols-2 gap-6">
        <TopPages views={pageViews} />

        {/* Kampanyalar */}
        <div className="bg-surface-container-low border border-outline-variant/15 rounded p-6">
          <h3 className="text-sm font-medium text-on-surface mb-4">Kampanya Breakdown</h3>
          {campaigns.length === 0 ? (
            <div className="text-center py-8 text-on-surface/30 text-xs">
              <span className="material-symbols-outlined text-3xl block mb-2 opacity-30">campaign</span>
              Henüz kampanya verisi yok.
              <br />
              Linklerinize <code className="bg-surface-container px-1 rounded">utm_campaign=</code> ekleyin.
            </div>
          ) : (
            <div className="space-y-2">
              {campaigns.map(([name, count]) => (
                <div key={name} className="flex items-center justify-between py-2 border-b border-outline-variant/8 last:border-0">
                  <span className="text-xs text-on-surface/70 font-mono">{name}</span>
                  <span className="text-xs font-medium text-primary ml-4">{count} lead</span>
                </div>
              ))}
            </div>
          )}

          {/* UTM link oluşturucu */}
          <div className="mt-6 pt-4 border-t border-outline-variant/10">
            <p className="text-[10px] text-on-surface/40 font-label tracking-widest uppercase mb-2">
              Örnek UTM Link
            </p>
            <code className="text-[10px] text-primary/70 break-all leading-relaxed block bg-surface-container rounded p-2">
              {`https://altinsoy.com?utm_source=google&utm_medium=cpc&utm_campaign=fue-nisan`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
