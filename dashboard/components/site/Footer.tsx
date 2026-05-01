import { unstable_noStore as noStore } from "next/cache";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSocialLinks } from "@/lib/social";
import type { Platform } from "@/lib/social";

/* ── Social icon SVGs ──────────────────────────────────────────────────────── */
const SOCIAL_ICONS: Record<Platform, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.024 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.097 24 18.1 24 12.073z"/>
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.264 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  ),
  gmail: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  google_maps: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  ),
};

function buildHref(platform: Platform, url: string): string {
  if (!url) return "#";
  if (platform === "whatsapp") {
    const num = url.replace(/\D/g, "");
    return `https://wa.me/${num}`;
  }
  if (platform === "gmail") {
    return url.startsWith("mailto:") ? url : `mailto:${url}`;
  }
  return url;
}

export default async function Footer() {
  noStore();
  const [t, allLinks] = await Promise.all([
    getTranslations("footer"),
    getSocialLinks(),
  ]);
  const activeLinks = allLinks.filter((l) => l.active && l.url);

  const waLink = allLinks.find((l) => l.platform === "whatsapp");
  const waHref =
    waLink?.active && waLink.url
      ? `https://wa.me/${waLink.url.replace(/\D/g, "")}`
      : "https://wa.me/905539784242";

  const year = new Date().getFullYear();

  const socialLabels: Record<Platform, string> = {
    instagram: t("social.instagram"),
    facebook: t("social.facebook"),
    x: t("social.x"),
    gmail: t("social.gmail"),
    whatsapp: t("social.whatsapp"),
    google_maps: t("social.googleMaps"),
  };

  const navLinks = [
    { href: "/" as const, label: t("links.home") },
    { href: "/sac-ekimi" as const, label: t("links.hairTransplant") },
    { href: "/sakal-ekimi" as const, label: t("links.beardTransplant") },
    { href: "/kas-ekimi" as const, label: t("links.browTransplant") },
    { href: "/oncesi-sonrasi" as const, label: t("links.results") },
    { href: "/iletisim" as const, label: t("links.contact") },
  ] as const;

  const legalLinks = [
    { href: "/gizlilik-politikasi" as const, label: t("legal.privacy") },
    { href: "/kvkk-aydinlatma" as const, label: t("legal.kvkk") },
    { href: "/cerez-politikasi" as const, label: t("legal.cookies") },
  ] as const;

  return (
    <>
      {/* ── Yasal uyarı şeridi ────────────────────────────────────────────── */}
      <div
        className="px-6 py-6 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p
          className="text-[11px] leading-relaxed max-w-3xl mx-auto"
          style={{ color: "rgba(229,226,225,0.38)" }}
        >
          {t("legal.disclaimer")}
        </p>
      </div>

      {/* ── Ana footer ───────────────────────────────────────────────────── */}
      <footer style={{ background: "#0e0e0e" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-14">

            {/* Kolon 1 — Marka */}
            <div className="space-y-5 lg:col-span-1">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 font-headline text-base"
                  style={{
                    background: "rgba(233,193,118,0.12)",
                    border: "1px solid rgba(233,193,118,0.22)",
                    color: "#e9c176",
                  }}
                >
                  A
                </div>
                <span
                  className="font-headline text-base tracking-wide"
                  style={{ color: "#e5e2e1" }}
                >
                  {t("brand.name")}
                </span>
              </div>

              <p
                className="text-base leading-7"
                style={{ color: "rgba(229,226,225,0.55)", maxWidth: "260px" }}
              >
                {t("brand.blurb")}
              </p>
            </div>

            {/* Kolon 2 — İletişim */}
            <div className="space-y-5">
              <h3
                className="text-base font-medium tracking-wide"
                style={{ color: "#e5e2e1" }}
              >
                {t("contact.title")}
              </h3>
              <ul className="space-y-3.5" style={{ color: "rgba(229,226,225,0.55)" }}>
                <li>
                  <a
                    href="mailto:info@altinsoy.com"
                    className="text-base leading-relaxed transition-colors duration-300 hover:text-white"
                    style={{ color: "inherit" }}
                  >
                    info@altinsoy.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+905539784242"
                    className="text-base transition-colors duration-300 hover:text-white"
                    style={{ color: "inherit" }}
                  >
                    +90 553 978 42 42
                  </a>
                </li>
                <li>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base transition-colors duration-300 hover:text-white"
                    style={{ color: "inherit" }}
                  >
                    {t("contact.whatsapp")}
                  </a>
                </li>
                <li
                  className="text-base leading-7 pt-1 whitespace-pre-line"
                  style={{ color: "rgba(229,226,225,0.4)" }}
                >
                  {t("contact.address")}
                </li>
              </ul>
            </div>

            {/* Kolon 3 — Bağlantılar */}
            <div className="space-y-5">
              <h3
                className="text-base font-medium tracking-wide"
                style={{ color: "#e5e2e1" }}
              >
                {t("links.title")}
              </h3>
              <nav>
                <ul className="space-y-3.5">
                  {navLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-base transition-colors duration-300 hover:text-white"
                        style={{ color: "rgba(229,226,225,0.55)" }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Kolon 4 — Sosyal Medya */}
            <div className="space-y-5">
              <h3
                className="text-base font-medium tracking-wide"
                style={{ color: "#e5e2e1" }}
              >
                {t("social.title")}
              </h3>

              {activeLinks.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {activeLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={buildHref(link.platform as Platform, link.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={socialLabels[link.platform as Platform]}
                      title={socialLabels[link.platform as Platform]}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border text-white/70 hover:text-primary hover:border-primary/50 hover:bg-primary/[0.08]"
                      style={{ borderColor: "rgba(229,226,225,0.2)" }}
                    >
                      {SOCIAL_ICONS[link.platform as Platform]}
                    </a>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2.5">
                  {(["instagram", "facebook", "whatsapp"] as Platform[]).map((platform) => (
                    <div
                      key={platform}
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        border: "1px solid rgba(229,226,225,0.2)",
                        color: "rgba(229,226,225,0.3)",
                      }}
                    >
                      {SOCIAL_ICONS[platform]}
                    </div>
                  ))}
                </div>
              )}

              <ul className="space-y-2.5 pt-2">
                {legalLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm transition-colors duration-300 hover:text-white"
                      style={{ color: "rgba(229,226,225,0.38)" }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Alt çizgi + telif ─────────────────────────────────────────── */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <span
              className="text-sm tracking-wide"
              style={{ color: "rgba(229,226,225,0.4)" }}
            >
              {t("copyrightLine", { year })}
            </span>
            <span
              className="text-sm tracking-wide"
              style={{ color: "rgba(229,226,225,0.4)" }}
            >
              {t("location")}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
