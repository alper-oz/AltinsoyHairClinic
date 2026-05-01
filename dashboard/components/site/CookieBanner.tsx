"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("cookie-consent")) return;
    const tm = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(tm);
  }, []);

  function dismiss() {
    localStorage.setItem("cookie-consent", "1");
    setVisible(false);
  }

  return (
    <div
      className={`cookie-banner bg-surface-container-high border-t border-outline-variant/10 px-6 md:px-12 py-6 ${
        visible ? "show" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-on-surface/70 max-w-lg leading-relaxed">
          {t("text")}{" "}
          <Link href="/cerez-politikasi" className="underline text-primary/60">
            {t("policyLink")}
          </Link>{" "}
          {t("policyLinkSuffix")}
        </p>
        <div className="flex gap-3">
          <button
            onClick={dismiss}
            className="px-6 py-2 border border-outline-variant/20 text-on-surface/60 text-[10px] uppercase tracking-widest hover:text-on-surface transition-colors"
          >
            {t("decline")}
          </button>
          <button
            onClick={dismiss}
            className="px-6 py-2 bg-primary text-on-primary text-[10px] uppercase tracking-widest hover:bg-primary-container transition-colors"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
