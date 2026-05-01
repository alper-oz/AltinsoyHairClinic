import { unstable_cache } from "next/cache";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export interface ExchangeRates {
  usd: number;
  eur: number;
  gbp: number;
  date: string;
}

const fetchRates = unstable_cache(
  async (): Promise<ExchangeRates | null> => {
    try {
      const res = await fetch("https://api.frankfurter.app/latest?from=EUR&to=USD,GBP,TRY", {
        next: { revalidate: 3600 },
      });
      if (!res.ok) return null;
      const data = await res.json();
      const { USD, GBP, TRY } = data.rates as Record<string, number>;
      return {
        usd: parseFloat((TRY / USD).toFixed(2)),
        eur: parseFloat(TRY.toFixed(2)),
        gbp: parseFloat((TRY / GBP).toFixed(2)),
        date: data.date,
      };
    } catch {
      return null;
    }
  },
  ["exchange-rates"],
  { revalidate: 3600 }
);

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const rates = await fetchRates();

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header rates={rates} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
