"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getUTM } from "@/lib/utm";
import type { Platform, SocialLink } from "@/lib/social";

type SubmitState = "idle" | "loading" | "success" | "error";

/* ── Social icons (inline SVG) ─────────────────────────────────────────── */
const SOCIAL_ICONS: Record<Platform, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.024 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.097 24 18.1 24 12.073z"/>
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.264 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  ),
  gmail: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  google_maps: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  ),
};

const SOCIAL_COLORS: Record<Platform, { bg: string; border: string; color: string }> = {
  instagram:   { bg: "rgba(193,53,132,0.08)",  border: "rgba(193,53,132,0.25)",  color: "#c13584" },
  facebook:    { bg: "rgba(24,119,242,0.08)",  border: "rgba(24,119,242,0.25)",  color: "#1877f2" },
  x:           { bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.15)", color: "#e5e2e1" },
  gmail:       { bg: "rgba(234,67,53,0.08)",   border: "rgba(234,67,53,0.25)",   color: "#ea4335" },
  whatsapp:    { bg: "rgba(37,211,102,0.08)",  border: "rgba(37,211,102,0.25)",  color: "#25d366" },
  google_maps: { bg: "rgba(66,133,244,0.08)",  border: "rgba(66,133,244,0.25)",  color: "#4285f4" },
};

const SOCIAL_LABEL_KEYS: Record<Platform, string> = {
  instagram:   "instagram",
  facebook:    "facebook",
  x:           "x",
  gmail:       "gmail",
  whatsapp:    "whatsapp",
  google_maps: "googleMaps",
};

function buildHref(platform: Platform, url: string): string {
  if (!url) return "#";
  if (platform === "whatsapp") return `https://wa.me/${url.replace(/\D/g, "")}`;
  if (platform === "gmail") return url.startsWith("mailto:") ? url : `mailto:${url}`;
  return url;
}

export default function IletisimPage({ socialLinks = [] }: { socialLinks?: SocialLink[] }) {
  const t = useTranslations("pages.contact");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", message: "", area: "saç", consent: false,
  });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent || !form.name || !form.phone) return;
    setSubmitState("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     form.name,
          phone:    form.phone,
          email:    form.email   || undefined,
          interest: form.area    || undefined,
          notes:    form.message || undefined,
          source:   "iletisim",
          consent:  true,
          ...getUTM(),
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  const channels = [
    {
      href: "https://wa.me/905539784242?text=Merhaba%2C%20sa%C3%A7%20ekimi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.",
      icon: "chat",
      title: t("channels.whatsapp.title"),
      desc: t("channels.whatsapp.desc"),
      detail: t("channels.whatsapp.detail"),
      external: true,
    },
    {
      href: "tel:+905539784242",
      icon: "call",
      title: t("channels.phone.title"),
      desc: t("channels.phone.desc"),
      detail: t("channels.phone.detail"),
      external: true,
    },
    {
      href: "mailto:info@altinsoy.com",
      icon: "mail",
      title: t("channels.email.title"),
      desc: t("channels.email.desc"),
      detail: t("channels.email.detail"),
      external: true,
    },
    {
      href: null,
      icon: "location_on",
      title: t("channels.address.title"),
      desc: t("channels.address.desc"),
      detail: null,
      external: false,
    },
  ];

  const busy = submitState === "loading";

  return (
    <section className="pt-28">
      {/* HERO */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary font-label text-[11px] tracking-[0.3em] uppercase block mb-4">{t("hero.eyebrow")}</span>
          <h1 className="font-headline text-4xl md:text-6xl leading-tight mb-6">{t("hero.title")}</h1>
          <p className="text-on-surface/70 text-lg leading-relaxed max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* CONTACT CHANNELS */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((ch, i) =>
            ch.href ? (
              <a key={i} href={ch.href}
                target={ch.external ? "_blank" : undefined}
                rel={ch.external ? "noopener noreferrer" : undefined}
                className="bg-surface-container-low border border-outline-variant/20 rounded p-6 flex flex-col gap-3 hover:border-primary/40 transition-colors"
              >
                <span className="material-symbols-outlined text-primary text-[28px]">{ch.icon}</span>
                <div>
                  <p className="font-headline text-base mb-1">{ch.title}</p>
                  <p className="text-sm text-on-surface/60">{ch.desc}</p>
                  {ch.detail && <p className="text-sm text-primary mt-2">{ch.detail}</p>}
                </div>
              </a>
            ) : (
              <div key={i} className="bg-surface-container-low border border-outline-variant/20 rounded p-6 flex flex-col gap-3">
                <span className="material-symbols-outlined text-primary text-[28px]">{ch.icon}</span>
                <div>
                  <p className="font-headline text-base mb-1">{ch.title}</p>
                  <p className="text-sm text-on-surface/60">{ch.desc}</p>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-xl mx-auto">
          <h2 className="font-headline text-3xl mb-2">{t("form.title")}</h2>
          <p className="text-on-surface/60 text-sm mb-10">{t("form.subtitle")}</p>

          {submitState === "success" ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <span className="material-symbols-outlined text-success text-[48px]">check_circle</span>
              <h3 className="font-headline text-2xl text-on-surface">{t("form.successTitle")}</h3>
              <p className="text-on-surface/60 text-sm max-w-xs leading-relaxed">
                {t("form.successText")}
              </p>
              <button
                onClick={() => { setSubmitState("idle"); setForm({ name: "", email: "", phone: "", message: "", area: "saç", consent: false }); }}
                className="mt-4 text-sm font-label uppercase tracking-widest text-primary/70 hover:text-primary transition-colors"
              >
                {t("form.newMessage")}
              </button>
            </div>
          ) : (
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block text-sm tracking-widest uppercase text-on-surface/60 mb-2" htmlFor="name">
                  {t("form.nameLabel")}
                </label>
                <input id="name" name="name" type="text" required
                  value={form.name} onChange={handleChange} disabled={busy}
                  className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary outline-none text-on-surface py-2 text-sm transition-colors disabled:opacity-50"
                  placeholder={t("form.namePlaceholder")}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm tracking-widest uppercase text-on-surface/60 mb-2" htmlFor="email">
                  {t("form.emailLabel")}
                </label>
                <input id="email" name="email" type="email"
                  value={form.email} onChange={handleChange} disabled={busy}
                  className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary outline-none text-on-surface py-2 text-sm transition-colors disabled:opacity-50"
                  placeholder={t("form.emailPlaceholder")}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm tracking-widest uppercase text-on-surface/60 mb-2" htmlFor="phone">
                  {t("form.phoneLabel")}
                </label>
                <input id="phone" name="phone" type="tel" required
                  value={form.phone} onChange={handleChange} disabled={busy}
                  className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary outline-none text-on-surface py-2 text-sm transition-colors disabled:opacity-50"
                  placeholder={t("form.phonePlaceholder")}
                />
              </div>

              {/* Area */}
              <div>
                <label className="block text-sm tracking-widest uppercase text-on-surface/60 mb-2" htmlFor="area">
                  {t("form.areaLabel")}
                </label>
                <select id="area" name="area"
                  value={form.area} onChange={handleChange} disabled={busy}
                  className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary outline-none text-on-surface py-2 text-sm transition-colors cursor-pointer disabled:opacity-50"
                >
                  <option value="saç">{t("form.areaHair")}</option>
                  <option value="sakal">{t("form.areaBeard")}</option>
                  <option value="kaş">{t("form.areaBrow")}</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm tracking-widest uppercase text-on-surface/60 mb-2" htmlFor="message">
                  {t("form.messageLabel")}
                </label>
                <textarea id="message" name="message" rows={4}
                  value={form.message} onChange={handleChange} disabled={busy}
                  className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary outline-none text-on-surface py-2 text-sm transition-colors resize-none disabled:opacity-50"
                  placeholder={t("form.messagePlaceholder")}
                />
              </div>

              {/* KVKK */}
              <div className="flex items-start gap-3">
                <input id="consent" name="consent" type="checkbox"
                  checked={form.consent} onChange={handleChange}
                  className="mt-0.5 accent-primary cursor-pointer"
                />
                <label htmlFor="consent" className="text-sm text-on-surface/70 leading-relaxed cursor-pointer">
                  {t("form.consentText")}{" "}
                  <Link href="/kvkk-aydinlatma" className="text-primary hover:underline">{t("form.consentLink")}</Link>{" "}
                  {t("form.consentSuffix")}
                </label>
              </div>

              {/* Submit */}
              <button type="submit"
                disabled={!form.consent || !form.name || !form.phone || busy}
                className="bg-primary text-on-primary px-10 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary-container transition-all w-full disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {busy ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-3 h-3 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                    {t("form.submitting")}
                  </span>
                ) : t("form.submit")}
              </button>

              {submitState === "error" && (
                <p className="text-error text-sm text-center">
                  {t("form.errorPrefix")}{" "}
                  <a href="https://wa.me/905539784242" className="underline">{t("form.errorLink")}</a>{" "}
                  {t("form.errorSuffix")}
                </p>
              )}

              <p className="text-sm text-on-surface/50 text-center">
                {t("form.replyNote")}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* SOSYAL MEDYA */}
      {socialLinks.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-headline text-2xl mb-2 text-center">{t("social.title")}</h2>
            <p className="text-on-surface/50 text-sm text-center mb-10">{t("social.subtitle")}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {socialLinks.map(link => {
                const platform = link.platform as Platform;
                const colors = SOCIAL_COLORS[platform];
                const labelKey = SOCIAL_LABEL_KEYS[platform];
                const label = t(`social.labels.${labelKey}`);
                return (
                  <a
                    key={link.platform}
                    href={buildHref(platform, link.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-200 hover:scale-105"
                    style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.color }}
                  >
                    {SOCIAL_ICONS[platform]}
                    <span className="text-sm font-medium">{label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* TRUST SIGNALS */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-6 justify-center items-center">
          {[
            { icon: "lock", label: t("trust.ssl") },
            { icon: "verified_user", label: t("trust.kvkk") },
            { icon: "shield", label: t("trust.noSale") },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-on-surface/60 text-sm">
              <span className="material-symbols-outlined text-primary/70 text-[18px]">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
