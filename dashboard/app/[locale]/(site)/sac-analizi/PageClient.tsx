"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { getUTM } from "@/lib/utm";

// Fotoğrafı doğrudan Supabase Storage'a yükler (Next.js bypass)
async function uploadPhoto(file: File): Promise<string | null> {
  try {
    const supabase = createClient();
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await supabase.storage
      .from("lead-photos")
      .upload(path, file, { contentType: file.type, upsert: false });

    if (error || !data) return null;

    const { data: { publicUrl } } = supabase.storage
      .from("lead-photos")
      .getPublicUrl(data.path);

    return publicUrl;
  } catch {
    return null; // Fotoğraf yükleme başarısız olsa bile lead kaydedilsin
  }
}

const AREAS = [
  { value: "Saç Restorasyonu", labelKey: "areas.hair", profileKey: "hair", icon: "content_cut" },
  { value: "Sakal Ekimi", labelKey: "areas.beard", profileKey: "beard", icon: "face" },
  { value: "Kaş Restorasyonu", labelKey: "areas.brow", profileKey: "brow", icon: "visibility" },
] as const;

const PROFILE_MAP: Record<string, { profileKey: "hair" | "beard" | "brow"; entries: string[] }> = {
  "Saç Restorasyonu": { profileKey: "hair", entries: ["p1", "p2", "p3", "p4"] },
  "Sakal Ekimi": { profileKey: "beard", entries: ["p1", "p2", "p3"] },
  "Kaş Restorasyonu": { profileKey: "brow", entries: ["p1", "p2", "p3"] },
};

export default function SacAnaliziPage() {
  const t = useTranslations("pages.analysis");
  const [step, setStep] = useState(1);
  const [area, setArea] = useState<string | null>(null);
  const [profile, setProfile] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<"idle" | "uploading" | "saving" | "success" | "error">("idle");

  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    photo: null as File | null,
    consent: false,
  });

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setContactForm({ ...contactForm, photo: files?.[0] ?? null });
    } else if (type === "checkbox") {
      setContactForm({ ...contactForm, [name]: checked });
    } else {
      setContactForm({ ...contactForm, [name]: value });
    }
  };

  const handleStep3Submit = async () => {
    if (!contactForm.consent || !contactForm.fullName || !contactForm.phone) return;

    // 1) Fotoğraf varsa önce Storage'a yükle
    let photoUrl: string | null = null;
    if (contactForm.photo) {
      setSubmitState("uploading");
      photoUrl = await uploadPhoto(contactForm.photo);
    }

    // 2) Lead kaydını oluştur
    setSubmitState("saving");
    try {
      const utm = getUTM();
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.fullName,
          phone: contactForm.phone,
          email: contactForm.email || undefined,
          interest: area ?? undefined,
          hair_loss: profile ?? undefined,
          source: "sac-analizi",
          consent: true,
          photo_url: photoUrl,
          ...utm,
        }),
      });

      if (!res.ok) throw new Error();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  const STEPS = [
    { n: 1, label: t("steps.s1") },
    { n: 2, label: t("steps.s2") },
    { n: 3, label: t("steps.s3") },
  ];

  // Build current profile entries
  const profileMeta = area ? PROFILE_MAP[area] : PROFILE_MAP["Saç Restorasyonu"];
  const profileEntries = profileMeta.entries.map((key) => ({
    label: t(`profiles.${profileMeta.profileKey}.${key}.label`),
    sub: t(`profiles.${profileMeta.profileKey}.${key}.sub`),
  }));

  return (
    <section className="pt-32 pb-24 min-h-screen">
      {/* HERO */}
      <div className="px-6 mb-16">
        <div className="max-w-5xl mx-auto">
          <p
            id="hero-step-label"
            className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-4"
          >
            {t("hero.stepLabel", { step })}
          </p>
          <h1 className="font-headline text-4xl md:text-6xl leading-tight mb-6">
            {t("hero.titlePart1")}{" "}
            <br />
            <span className="italic text-primary/80">{t("hero.titleAccent")}</span>
          </h1>
          <p className="text-on-surface/70 text-base md:text-lg leading-relaxed max-w-xl mb-8">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-6 text-[11px] tracking-wider uppercase text-on-surface/60">
            {[t("hero.tags.free"), t("hero.tags.nonBinding"), t("hero.tags.reply24h")].map((tag, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-primary/90">check_circle</span>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="px-6">
        <div className="max-w-5xl mx-auto lg:grid lg:grid-cols-12 lg:gap-12">

          {/* SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 self-start">
            <div className="space-y-1 mb-10">
              {STEPS.map((s) => {
                const active = s.n === step;
                const done = s.n < step;
                return (
                  <div
                    key={s.n}
                    className={`flex items-center gap-3 py-2 px-3 rounded transition-colors ${
                      active
                        ? "bg-primary/10 text-primary"
                        : done
                        ? "text-on-surface/40"
                        : "text-on-surface/30"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium shrink-0 ${
                        active
                          ? "bg-primary text-on-primary"
                          : done
                          ? "bg-primary/20 text-primary/60"
                          : "bg-outline-variant/20 text-on-surface/30"
                      }`}
                    >
                      {done ? (
                        <span className="material-symbols-outlined text-[12px]">check</span>
                      ) : (
                        s.n
                      )}
                    </div>
                    <span className="text-sm tracking-wide">{s.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-outline-variant/10 pt-6 space-y-3">
              {[
                { icon: "lock", label: t("trust.ssl") },
                { icon: "verified_user", label: t("trust.kvkk") },
                { icon: "shield", label: t("trust.noSale") },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-on-surface/40 text-[11px]">
                  <span className="material-symbols-outlined text-primary/60 text-[14px]">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </aside>

          {/* FORM CANVAS */}
          <div className="lg:col-span-9 bg-surface-container-low rounded p-8 md:p-16">

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <div>
                <h2 className="font-headline text-2xl md:text-3xl mb-2">{t("step1.title")}</h2>
                <p className="text-on-surface/60 text-sm mb-10">{t("step1.subtitle")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                  {AREAS.map((a) => (
                    <button
                      key={a.value}
                      type="button"
                      onClick={() => setArea(a.value)}
                      className={`p-6 rounded border text-left transition-colors ${
                        area === a.value
                          ? "border-primary/60 bg-primary/5"
                          : "border-outline-variant/20 hover:border-primary/30"
                      }`}
                    >
                      <span className="material-symbols-outlined text-primary text-[28px] block mb-3">{a.icon}</span>
                      <span className="font-headline text-base">{t(a.labelKey)}</span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={!area}
                  onClick={() => setStep(2)}
                  className="bg-primary text-on-primary px-10 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary-container transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t("step1.next")}
                </button>
              </div>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <div>
                <h2 className="font-headline text-2xl md:text-3xl mb-2">{t("step2.title")}</h2>
                <p className="text-on-surface/60 text-sm mb-10">{t("step2.subtitle")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                  {profileEntries.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setProfile(p.label)}
                      className={`p-6 rounded border text-left transition-colors ${
                        profile === p.label
                          ? "border-primary/60 bg-primary/5"
                          : "border-outline-variant/20 hover:border-primary/30"
                      }`}
                    >
                      <span className="font-headline text-base block">{p.label}</span>
                      {p.sub && <span className="text-sm text-on-surface/50 mt-1 block">{p.sub}</span>}
                    </button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => { setStep(1); setProfile(null); }}
                    className="border border-outline-variant/30 text-on-surface/70 px-8 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:border-primary/40 hover:text-primary transition-all"
                  >
                    {t("step2.back")}
                  </button>
                  <button
                    type="button"
                    disabled={!profile}
                    onClick={() => setStep(3)}
                    className="bg-primary text-on-primary px-10 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary-container transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {t("step2.next")}
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3 ── */}
            {step === 3 && (
              <div>
                <h2 className="font-headline text-2xl md:text-3xl mb-2">{t("step3.title")}</h2>
                <p className="text-on-surface/60 text-sm mb-10">{t("step3.subtitle")}</p>

                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm tracking-widest uppercase text-on-surface/60 mb-2" htmlFor="fullName">
                      {t("step3.fullNameLabel")}
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={contactForm.fullName}
                      onChange={handleContactChange}
                      className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary outline-none text-on-surface py-2 text-sm transition-colors"
                      placeholder={t("step3.fullNamePlaceholder")}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm tracking-widest uppercase text-on-surface/60 mb-2" htmlFor="s3email">
                      {t("step3.emailLabel")}
                    </label>
                    <input
                      id="s3email"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary outline-none text-on-surface py-2 text-sm transition-colors"
                      placeholder={t("step3.emailPlaceholder")}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm tracking-widest uppercase text-on-surface/60 mb-2" htmlFor="s3phone">
                      {t("step3.phoneLabel")}
                    </label>
                    <input
                      id="s3phone"
                      name="phone"
                      type="tel"
                      value={contactForm.phone}
                      onChange={handleContactChange}
                      className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary outline-none text-on-surface py-2 text-sm transition-colors"
                      placeholder={t("step3.phonePlaceholder")}
                    />
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm tracking-widest uppercase text-on-surface/60 mb-2" htmlFor="photo">
                      {t("step3.photoLabel")}
                    </label>
                    <input
                      id="photo"
                      name="photo"
                      type="file"
                      accept="image/*"
                      onChange={handleContactChange}
                      className="w-full text-on-surface/70 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-label file:uppercase file:tracking-wider file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                    />
                    <p className="text-sm text-on-surface/40 mt-2">{t("step3.photoHint")}</p>
                  </div>

                  {/* KVKK */}
                  <div className="flex items-start gap-3">
                    <input
                      id="s3consent"
                      name="consent"
                      type="checkbox"
                      checked={contactForm.consent}
                      onChange={handleContactChange}
                      className="mt-0.5 accent-primary cursor-pointer"
                    />
                    <label htmlFor="s3consent" className="text-sm text-on-surface/70 leading-relaxed cursor-pointer">
                      {t("step3.consentText")}{" "}
                      <Link href="/kvkk-aydinlatma" className="text-primary hover:underline">
                        {t("step3.consentLink")}
                      </Link>{" "}
                      {t("step3.consentSuffix")}
                    </label>
                  </div>

                  {submitState === "success" ? (
                    <div className="flex items-center gap-3 text-success text-sm bg-success/10 border border-success/20 rounded-sm px-6 py-4">
                      <span className="material-symbols-outlined text-[20px]">check_circle</span>
                      <span>{t("step3.successText")}</span>
                    </div>
                  ) : (
                    <div className="flex gap-4 flex-wrap">
                      <button
                        type="button"
                        disabled={submitState === "uploading" || submitState === "saving"}
                        onClick={() => setStep(2)}
                        className="border border-outline-variant/30 text-on-surface/70 px-8 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:border-primary/40 hover:text-primary transition-all disabled:opacity-40"
                      >
                        {t("step3.back")}
                      </button>
                      <button
                        type="button"
                        disabled={
                          !contactForm.consent ||
                          !contactForm.fullName ||
                          !contactForm.phone ||
                          submitState === "uploading" ||
                          submitState === "saving"
                        }
                        onClick={handleStep3Submit}
                        className="bg-primary text-on-primary px-10 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary-container transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {submitState === "uploading"
                          ? t("step3.uploading")
                          : submitState === "saving"
                          ? t("step3.saving")
                          : t("step3.submit")}
                      </button>
                    </div>
                  )}
                  {submitState === "error" && (
                    <p className="text-error text-sm mt-3">{t("step3.errorText")}</p>
                  )}
                </form>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
