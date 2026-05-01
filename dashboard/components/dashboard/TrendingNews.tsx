import { unstable_cache } from "next/cache";
import TrendingNewsUI from "./TrendingNewsUI";
import type { NewsItem } from "./TrendingNewsUI";

/* ── RSS parser ───────────────────────────────────────────────────────────── */
function strip(s: string) {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/<[^>]+>/g, "").trim();
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins  <  2) return "Az önce";
  if (mins  < 60) return `${mins} dk önce`;
  if (hours < 24) return `${hours} sa önce`;
  return `${days} gün önce`;
}

function parseRSS(xml: string): NewsItem[] {
  const blocks = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];
  const items: NewsItem[] = [];

  for (const block of blocks.slice(0, 7)) {
    const rawTitle  = block.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "";
    const link      = block.match(/<link>([\s\S]*?)<\/link>/)?.[1]  ?? "#";
    const pubDate   = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? "";
    const rawSource = block.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] ?? "";

    const title  = strip(rawTitle).replace(/\s[–-]\s.+$/, "").trim();
    const source = strip(rawSource);

    if (!title) continue;
    items.push({ title, link: link.trim(), source, timeAgo: timeAgo(pubDate) });
  }
  return items;
}

/* ── Cached fetcher (30 dk TTL) ──────────────────────────────────────────── */
const fetchNews = unstable_cache(
  async (query: string): Promise<NewsItem[]> => {
    try {
      const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=tr&gl=TR&ceid=TR:tr`;
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" },
        next: { revalidate: 1800 },
      });
      if (!res.ok) return [];
      return parseRSS(await res.text());
    } catch {
      return [];
    }
  },
  ["google-news-tr"],
  { revalidate: 1800 }
);

/* ── Server Component ────────────────────────────────────────────────────── */
export default async function TrendingNews() {
  const [sac, sakal, kas] = await Promise.allSettled([
    fetchNews("saç ekimi"),
    fetchNews("sakal ekimi"),
    fetchNews("kaş ekimi"),
  ]);

  const data = {
    sac:   sac.status   === "fulfilled" ? sac.value   : [],
    sakal: sakal.status === "fulfilled" ? sakal.value : [],
    kas:   kas.status   === "fulfilled" ? kas.value   : [],
  };

  return <TrendingNewsUI data={data} />;
}
