"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

export interface ChartPoint {
  date: string;   // "14 Oca" formatında
  leads: number;
  iso: string;    // YYYY-MM-DD (sıralama için)
}

/* ── Custom tooltip ─────────────────────────────────────────────────────── */
function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3 shadow-xl"
      style={{
        background: "#141008",
        border: "1px solid rgba(233,193,118,0.2)",
        backdropFilter: "blur(8px)",
      }}>
      <p className="text-xs font-label mb-1" style={{ color: "#6b5f4e" }}>{label}</p>
      <p className="font-headline text-2xl leading-none" style={{ color: "#e9c176" }}>
        {payload[0].value}
      </p>
      <p className="text-xs mt-0.5" style={{ color: "#4a4035" }}>
        {payload[0].value === 1 ? "lead" : "lead"}
      </p>
    </div>
  );
}

/* ── Custom dot ─────────────────────────────────────────────────────────── */
function CustomDot(props: { cx?: number; cy?: number; payload?: ChartPoint; value?: number }) {
  const { cx, cy, value } = props;
  if (!value || value === 0) return null;
  return (
    <circle cx={cx} cy={cy} r={4} fill="#e9c176"
      stroke="#0c0c08" strokeWidth={2}
      style={{ filter: "drop-shadow(0 0 4px rgba(233,193,118,0.6))" }} />
  );
}

/* ── Main component ─────────────────────────────────────────────────────── */
export default function LeadChart({ data, period }: { data: ChartPoint[]; period: 14 | 30 }) {
  const maxVal = Math.max(...data.map(d => d.leads), 1);
  const totalPeriod = data.reduce((s, d) => s + d.leads, 0);
  const avgPerDay   = totalPeriod > 0 ? (totalPeriod / data.length).toFixed(1) : "0";

  // X ekseni: her kaçta bir label gösterilsin
  const step = period === 14 ? 1 : 4;

  return (
    <div className="rounded-3xl overflow-hidden"
      style={{ background: "#090909", border: "1px solid rgba(78,70,57,0.2)" }}>

      {/* Header */}
      <div className="flex items-start justify-between px-7 pt-6 pb-5"
        style={{ borderBottom: "1px solid rgba(78,70,57,0.1)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(233,193,118,0.1)", border: "1px solid rgba(233,193,118,0.15)" }}>
            <span className="material-symbols-outlined text-[18px]"
              style={{ color: "#e9c176", fontVariationSettings: "'FILL' 1,'wght' 300" }}>
              show_chart
            </span>
          </div>
          <div>
            <h2 className="font-headline text-base" style={{ color: "#d1c5b4" }}>Lead Akışı</h2>
            <p className="text-xs mt-0.5" style={{ color: "#4a4035" }}>Son {period} gün</p>
          </div>
        </div>

        {/* Özet pill'leri */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-headline text-2xl leading-none" style={{ color: "#e9c176" }}>{totalPeriod}</p>
            <p className="text-xs mt-0.5" style={{ color: "#4a4035" }}>toplam</p>
          </div>
          <div className="w-px h-8" style={{ background: "rgba(78,70,57,0.3)" }} />
          <div className="text-right">
            <p className="font-headline text-2xl leading-none" style={{ color: "#9a8f80" }}>{avgPerDay}</p>
            <p className="text-xs mt-0.5" style={{ color: "#4a4035" }}>günlük ort.</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="px-2 pt-6 pb-4" style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 24, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#e9c176" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#e9c176" stopOpacity={0}    />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="rgba(78,70,57,0.12)"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="date"
              tick={{ fill: "#4a4035", fontSize: 11, fontFamily: "inherit" }}
              tickLine={false}
              axisLine={false}
              interval={step - 1}
              dy={8}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fill: "#4a4035", fontSize: 11, fontFamily: "inherit" }}
              tickLine={false}
              axisLine={false}
              domain={[0, maxVal + 1]}
              width={36}
            />

            {/* Ortalama referans çizgisi */}
            {parseFloat(avgPerDay) > 0 && (
              <ReferenceLine
                y={parseFloat(avgPerDay)}
                stroke="rgba(233,193,118,0.2)"
                strokeDasharray="6 3"
                label={{ value: "ort.", position: "right", fill: "#4a4035", fontSize: 10 }}
              />
            )}

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(233,193,118,0.15)", strokeWidth: 1, strokeDasharray: "4 3" }}
            />

            <Area
              type="monotone"
              dataKey="leads"
              stroke="#e9c176"
              strokeWidth={2}
              fill="url(#leadGrad)"
              dot={<CustomDot />}
              activeDot={{ r: 6, fill: "#e9c176", stroke: "#0c0c08", strokeWidth: 2,
                style: { filter: "drop-shadow(0 0 6px rgba(233,193,118,0.7))" } }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
