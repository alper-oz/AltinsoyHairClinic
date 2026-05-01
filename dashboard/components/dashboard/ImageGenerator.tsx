"use client";

import { useState } from "react";
import { fal } from "@/lib/fal";

/* ─── Types ─── */
type Model = { id: string; label: string; badge: string };
type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
type GenerateState = "idle" | "generating" | "done" | "error";

interface GeneratedImage {
  url: string;
  prompt: string;
  model: string;
  ratio: AspectRatio;
  ts: number;
}

/* ─── Config ─── */
const MODELS: Model[] = [
  { id: "fal-ai/imagen4/fast", label: "Nano Banana 2",  badge: "Hızlı"    },
  { id: "fal-ai/imagen4",      label: "Nano Banana",    badge: "Standart" },
  { id: "fal-ai/imagen4/pro",  label: "Nano Banana Pro",badge: "Pro"      },
];

const RATIOS: { value: AspectRatio; label: string }[] = [
  { value: "16:9", label: "16:9 — Yatay" },
  { value: "1:1",  label: "1:1 — Kare"  },
  { value: "9:16", label: "9:16 — Dikey" },
  { value: "4:3",  label: "4:3 — Standart" },
  { value: "3:4",  label: "3:4 — Portre" },
];

const PRESETS = [
  "Profesyonel saç ekimi kliniği, minimalist iç mekan, altın ışık, lüks",
  "Saç folikülü yakın çekim, makro fotoğraf, siyah arka plan, altın detaylar",
  "Başarılı saç ekimi sonucu, doğal görünüm, yumuşak ışık, güven verici",
  "Modern klinik ekipmanları, steril ortam, profesyonel atmosfer",
  "İstanbul manzarası, premium klinik cephesi, altın ve siyah tonlar",
  "Saç dokusu makro fotoğraf, yüksek detay, sinematik aydınlatma",
];

export default function ImageGenerator() {
  const [prompt,      setPrompt]      = useState("");
  const [model,       setModel]       = useState(MODELS[0].id);
  const [ratio,       setRatio]       = useState<AspectRatio>("16:9");
  const [state,       setState]       = useState<GenerateState>("idle");
  const [progress,    setProgress]    = useState("");
  const [history,     setHistory]     = useState<GeneratedImage[]>([]);
  const [copied,      setCopied]      = useState<string | null>(null);

  async function handleGenerate() {
    if (!prompt.trim() || state === "generating") return;
    setState("generating");
    setProgress("Görsel oluşturuluyor…");

    try {
      const result = await fal.subscribe(model, {
        input: {
          prompt: prompt.trim(),
          aspect_ratio: ratio,
          num_images: 1,
          safety_filter_level: "block_only_high",
        },
        onQueueUpdate(update) {
          if (update.status === "IN_QUEUE") setProgress("Kuyrukta bekleniyor…");
          if (update.status === "IN_PROGRESS") setProgress("Görsel işleniyor…");
        },
      });

      const images = (result.data as { images?: { url: string }[] }).images ?? [];
      if (!images[0]?.url) throw new Error("No image returned");

      const img: GeneratedImage = {
        url:    images[0].url,
        prompt: prompt.trim(),
        model:  MODELS.find(m => m.id === model)?.label ?? model,
        ratio,
        ts:     Date.now(),
      };
      setHistory(prev => [img, ...prev]);
      setState("done");
    } catch (err) {
      console.error(err);
      setState("error");
    }
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="grid lg:grid-cols-[420px_1fr] gap-8 items-start">

      {/* ── Left: Controls ── */}
      <div className="space-y-6">

        {/* Model */}
        <div>
          <p className="text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-2">Model</p>
          <div className="space-y-2">
            {MODELS.map(m => (
              <button key={m.id} onClick={() => setModel(m.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left ${
                  model === m.id
                    ? "border-primary/50 bg-primary/8"
                    : "border-outline-variant/15 hover:border-outline-variant/30"
                }`}>
                <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 transition-colors ${
                  model === m.id ? "border-primary bg-primary" : "border-outline-variant/30"
                }`} />
                <span className="text-sm text-on-surface flex-1">{m.label}</span>
                <span className={`text-[10px] font-label tracking-wider px-2 py-0.5 rounded-full ${
                  model === m.id ? "bg-primary/15 text-primary" : "bg-surface-container-highest text-on-surface/40"
                }`}>{m.badge}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Aspect Ratio */}
        <div>
          <p className="text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-2">Oran</p>
          <div className="flex flex-wrap gap-2">
            {RATIOS.map(r => (
              <button key={r.value} onClick={() => setRatio(r.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-label tracking-wide transition-all ${
                  ratio === r.value
                    ? "bg-primary text-on-primary"
                    : "border border-outline-variant/15 text-on-surface/50 hover:border-primary/30 hover:text-on-surface/80"
                }`}>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt */}
        <div>
          <p className="text-[10px] tracking-widest uppercase text-on-surface/40 font-label mb-2">Prompt</p>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            rows={5}
            placeholder="Görseli Türkçe veya İngilizce tanımlayın…"
            className="w-full bg-surface-container-highest border border-outline-variant/20 focus:border-primary/50 rounded-lg px-4 py-3 text-sm text-on-surface outline-none transition-colors resize-none"
          />
          {/* Presets */}
          <p className="text-[10px] text-on-surface/30 font-label tracking-wider uppercase mt-3 mb-2">Hazır Promptlar</p>
          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {PRESETS.map((p, i) => (
              <button key={i} onClick={() => setPrompt(p)}
                className="w-full text-left text-[11px] text-on-surface/50 hover:text-on-surface/80 hover:bg-surface-container-highest px-3 py-1.5 rounded transition-colors line-clamp-1">
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Generate */}
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || state === "generating"}
          className="w-full bg-primary text-on-primary py-4 rounded-lg font-label uppercase tracking-widest text-xs hover:bg-primary-container transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {state === "generating" ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
              {progress}
            </span>
          ) : "Görsel Üret"}
        </button>

        {state === "error" && (
          <p className="text-error text-xs text-center">Bir hata oluştu. Tekrar deneyin.</p>
        )}
      </div>

      {/* ── Right: Results ── */}
      <div>
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-80 border border-dashed border-outline-variant/15 rounded-2xl text-on-surface/20">
            <span className="material-symbols-outlined text-[48px] mb-3">image</span>
            <p className="text-sm">Üretilen görseller burada görünecek</p>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((img, i) => (
              <div key={img.ts} className={`bg-surface-container-low border rounded-2xl overflow-hidden ${i === 0 ? "border-primary/20" : "border-outline-variant/10"}`}>
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.prompt} className="w-full object-cover max-h-[500px]" />

                {/* Info + Actions */}
                <div className="p-4">
                  <p className="text-xs text-on-surface/60 line-clamp-2 mb-3">{img.prompt}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-label tracking-wider bg-surface-container-highest text-on-surface/50 px-2 py-1 rounded-full">{img.model}</span>
                    <span className="text-[10px] font-label tracking-wider bg-surface-container-highest text-on-surface/50 px-2 py-1 rounded-full">{img.ratio}</span>
                    <div className="flex-1" />
                    {/* Copy URL */}
                    <button
                      onClick={() => copyUrl(img.url)}
                      className="flex items-center gap-1.5 text-[11px] font-label px-3 py-1.5 rounded-lg border border-outline-variant/20 hover:border-primary/30 text-on-surface/50 hover:text-on-surface/80 transition-all"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {copied === img.url ? "check" : "link"}
                      </span>
                      {copied === img.url ? "Kopyalandı" : "URL Kopyala"}
                    </button>
                    {/* Download */}
                    <a
                      href={img.url}
                      download={`altinsoy-${img.ts}.jpg`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[11px] font-label px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/15 transition-all"
                    >
                      <span className="material-symbols-outlined text-[14px]">download</span>
                      İndir
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
