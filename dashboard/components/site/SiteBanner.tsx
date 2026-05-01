"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface Banner {
  id: string;
  title: string;
  body: string | null;
  cta_label: string | null;
  cta_url: string | null;
  position: string;
}

export default function SiteBanner({ banners }: { banners: Banner[] }) {
  const t = useTranslations("siteBanner");
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = banners.filter((b) => !dismissed.has(b.id));
  if (visible.length === 0) return null;

  return (
    <>
      {visible.map((banner) => (
        <div
          key={banner.id}
          className="w-full bg-primary text-on-primary px-4 py-2.5 flex items-center justify-center gap-4 text-sm font-label relative"
          style={{ zIndex: 60 }}
        >
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="font-medium tracking-wide">{banner.title}</span>
            {banner.body && (
              <span className="opacity-80 hidden sm:inline">{banner.body}</span>
            )}
            {banner.cta_label && banner.cta_url && (
              <Link
                href={banner.cta_url}
                className="border border-on-primary/40 hover:border-on-primary px-3 py-1 rounded-sm uppercase tracking-widest text-[10px] transition-colors hover:bg-on-primary/10 whitespace-nowrap"
              >
                {banner.cta_label}
              </Link>
            )}
          </div>
          <button
            onClick={() => setDismissed((prev) => new Set([...prev, banner.id]))}
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
            aria-label={t("closeLabel")}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      ))}
    </>
  );
}
