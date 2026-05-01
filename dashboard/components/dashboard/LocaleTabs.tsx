"use client";

export const ADMIN_LOCALES = ["tr", "en", "ar"] as const;
export type AdminLocale = (typeof ADMIN_LOCALES)[number];

export const ADMIN_LOCALE_LABELS: Record<AdminLocale, string> = {
  tr: "Türkçe",
  en: "English",
  ar: "العربية",
};

export function LocaleTabs({
  active,
  onChange,
  filledCount,
  totalFields,
  size = "md",
}: {
  active: AdminLocale;
  onChange: (l: AdminLocale) => void;
  filledCount?: Record<AdminLocale, number>;
  totalFields?: number;
  size?: "sm" | "md";
}) {
  const padX = size === "sm" ? "px-3 py-1.5" : "px-4 py-2.5";
  return (
    <div className="flex items-center gap-1 border-b border-outline-variant/15">
      {ADMIN_LOCALES.map((l) => {
        const isActive = l === active;
        return (
          <button
            key={l}
            type="button"
            onClick={() => onChange(l)}
            className={`relative ${padX} text-xs font-label tracking-widest uppercase transition-colors ${
              isActive
                ? "text-primary border-b-2 border-primary -mb-px"
                : "text-on-surface/45 hover:text-on-surface/70 border-b-2 border-transparent"
            }`}
          >
            {ADMIN_LOCALE_LABELS[l]}
            {filledCount && totalFields !== undefined && filledCount[l] > 0 && (
              <span className="ml-2 text-[9px] text-on-surface/30">
                {filledCount[l]}/{totalFields}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
