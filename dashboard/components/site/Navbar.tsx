"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import ThemeToggle from "./ThemeToggle";

type RouteHref = "/sac-ekimi" | "/oncesi-sonrasi" | "/fiyat" | "/iletisim";
type HashHref = "#teknikler" | "#sss";

const NAV_ITEMS: ReadonlyArray<
  | { kind: "route"; href: RouteHref; key: string }
  | { kind: "hash"; hash: HashHref; key: string }
> = [
  { kind: "route", href: "/sac-ekimi", key: "expertise" },
  { kind: "hash", hash: "#teknikler", key: "techniques" },
  { kind: "route", href: "/oncesi-sonrasi", key: "results" },
  { kind: "route", href: "/fiyat", key: "price" },
  { kind: "hash", hash: "#sss", key: "faq" },
  { kind: "route", href: "/iletisim", key: "contact" },
];

const LOCALES = [
  { code: "tr", label: "TR" },
  { code: "en", label: "EN" },
  { code: "ar", label: "AR" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastScroll = useRef(0);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleScroll = () => {
      const curr = window.pageYOffset;
      if (curr <= 0) { nav.style.transform = "translateY(0)"; lastScroll.current = curr; return; }
      if (curr > lastScroll.current) nav.style.transform = "translateY(-100%)";
      else nav.style.transform = "translateY(0)";
      lastScroll.current = curr;
    };

    nav.style.transition = "transform 0.5s ease";
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] border-b border-outline-variant/10"
    >
      <div className="flex justify-between items-center w-full px-6 md:px-12 py-6 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-headline tracking-tighter text-primary">
            ALTINSOY
          </Link>

          {/* Dil Seçici */}
          <div className="hidden sm:flex items-center gap-2.5 text-[10px] font-label tracking-widest border-l border-outline-variant/20 ps-8">
            {LOCALES.map((l, i) => (
              <span key={l.code} className="flex items-center gap-2.5">
                {i > 0 && <span className="w-px h-2 bg-outline-variant/30" />}
                <button
                  onClick={() => switchLocale(l.code)}
                  className={`transition-colors duration-200 ${
                    locale === l.code
                      ? "text-primary font-medium"
                      : "text-on-surface/40 hover:text-on-surface/70 cursor-pointer"
                  }`}
                  aria-label={`${t("switchLocale")}: ${l.label}`}
                >
                  {l.label}
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10 font-headline tracking-tight text-sm uppercase">
          {NAV_ITEMS.map((item) => {
            const localePrefix =
              locale === routing.defaultLocale ? "" : `/${locale}`;
            if (item.kind === "hash") {
              return (
                <a
                  key={item.hash}
                  href={`${localePrefix}/${item.hash}`}
                  className="text-on-surface/70 hover:text-primary transition-all duration-700"
                >
                  {t(item.key)}
                </a>
              );
            }
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "text-primary border-b border-primary/30 pb-1"
                    : "text-on-surface/70 hover:text-primary transition-all duration-700"
                }
              >
                {t(item.key)}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden text-primary p-2 flex items-center justify-center"
            aria-label={t("menu")}
          >
            <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
          </button>
          <Link
            href="/sac-analizi"
            className="cta-premium bg-primary text-on-primary px-6 py-2.5 text-sm font-label uppercase tracking-widest rounded-sm hover:bg-primary-container active:scale-95 hidden sm:inline-block ms-2"
          >
            {t("cta")}
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden flex flex-col bg-background/95 backdrop-blur-xl border-t border-outline-variant/10 absolute top-full left-0 right-0 p-6 gap-4 text-sm">
          {NAV_ITEMS.map((item) => {
            const localePrefix =
              locale === routing.defaultLocale ? "" : `/${locale}`;
            if (item.kind === "hash") {
              return (
                <a
                  key={item.hash}
                  href={`${localePrefix}/${item.hash}`}
                  className="text-on-surface-variant hover:text-primary py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(item.key)}
                </a>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className="text-on-surface-variant hover:text-primary py-2"
                onClick={() => setMobileOpen(false)}
              >
                {t(item.key)}
              </Link>
            );
          })}

          {/* Mobil dil seçici */}
          <div className="flex items-center gap-3 pt-2 border-t border-outline-variant/10">
            {LOCALES.map((l) => (
              <button
                key={l.code}
                onClick={() => { switchLocale(l.code); setMobileOpen(false); }}
                className={`text-[11px] font-label tracking-widest px-3 py-1.5 rounded-full transition-all ${
                  locale === l.code
                    ? "bg-primary text-on-primary"
                    : "border border-outline-variant/30 text-on-surface/60 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <Link
            href="/sac-analizi"
            className="bg-primary text-on-primary px-6 py-3 text-sm font-label uppercase tracking-widest rounded-sm text-center mt-2"
            onClick={() => setMobileOpen(false)}
          >
            {t("cta")}
          </Link>
        </div>
      )}
    </nav>
  );
}
