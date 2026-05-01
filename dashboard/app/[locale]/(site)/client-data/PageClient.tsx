"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getUTM } from "@/lib/utm";

type SubmitState = "idle" | "uploading" | "saving" | "success" | "error";

async function uploadPhoto(file: File): Promise<string | null> {
  try {
    const supabase = createClient();
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `client-data/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("lead-photos").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) { console.error("Upload error:", error); return null; }
    const { data } = supabase.storage.from("lead-photos").getPublicUrl(path);
    return data.publicUrl;
  } catch {
    return null;
  }
}

export default function ClientDataPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: false,
  });
  const [photo, setPhoto]             = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setPhoto(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    } else {
      setPhotoPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent || !form.firstName || !form.phone) return;

    let photoUrl: string | null = null;

    // 1) Fotoğraf varsa önce yükle
    if (photo) {
      setSubmitState("uploading");
      photoUrl = await uploadPhoto(photo);
    }

    // 2) Lead kaydet
    setSubmitState("saving");
    try {
      const utm = getUTM();
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          phone: form.phone,
          email: form.email || undefined,
          source: "client-data",
          consent: true,
          ...(photoUrl ? { photo_url: photoUrl } : {}),
          ...utm,
        }),
      });

      if (!res.ok) throw new Error();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  const busy = submitState === "uploading" || submitState === "saving";

  const buttonLabel =
    submitState === "uploading" ? "Fotoğraf yükleniyor…" :
    submitState === "saving"    ? "Kaydediliyor…" :
    "Analizi Tamamla";

  return (
    <section className="pt-28 pb-24 min-h-screen">
      {/* PROGRESS INDICATOR */}
      <div className="px-6 mb-10">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          {[
            { n: "1", label: "İlgi Alanı" },
            { n: "2", label: "Profil" },
            { n: "3", label: "İletişim & Fotoğraf" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium ${
                    i === 2
                      ? "bg-primary text-on-primary"
                      : "bg-primary/20 text-primary/60"
                  }`}
                >
                  {s.n}
                </div>
                <span
                  className={`text-sm tracking-wide hidden sm:inline ${
                    i === 2 ? "text-on-surface" : "text-on-surface/40"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < 2 && <div className="flex-1 h-px w-6 bg-outline-variant/20" />}
            </div>
          ))}
          <p className="ml-auto text-[11px] text-on-surface/50 whitespace-nowrap">
            Adım 3 / 3
          </p>
        </div>
      </div>

      {/* HERO */}
      <section className="py-10 px-6">
        <div className="max-w-lg mx-auto">
          <nav className="text-sm text-on-surface/50 mb-6 tracking-wider">
            <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            <span className="mx-2">›</span>
            <Link href="/sac-analizi" className="hover:text-primary transition-colors">Saç Analizi</Link>
            <span className="mx-2">›</span>
            <span className="text-on-surface">Danışan Bilgileri</span>
          </nav>
          <h1 className="font-headline text-4xl md:text-5xl leading-tight mb-4">Son adım.</h1>
          <p className="text-on-surface/70 text-base leading-relaxed">
            Analizinizi kişiselleştirmek için temel bilgilerinizi girin. 24 saat içinde uzman ekibimiz dönüş yapacak.
          </p>
        </div>
      </section>

      {/* FORM CARD */}
      <section className="px-6">
        <div className="max-w-lg mx-auto bg-surface-container-low rounded p-8 md:p-10">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* First Name */}
            <div>
              <label className="block text-sm tracking-widest uppercase text-on-surface/60 mb-2" htmlFor="firstName">
                Ad
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary outline-none text-on-surface py-2 text-sm transition-colors"
                placeholder="Adınız"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm tracking-widest uppercase text-on-surface/60 mb-2" htmlFor="lastName">
                Soyad
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary outline-none text-on-surface py-2 text-sm transition-colors"
                placeholder="Soyadınız"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm tracking-widest uppercase text-on-surface/60 mb-2" htmlFor="email">
                E-posta
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary outline-none text-on-surface py-2 text-sm transition-colors"
                placeholder="ornek@email.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm tracking-widest uppercase text-on-surface/60 mb-2" htmlFor="phone">
                Telefon
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary outline-none text-on-surface py-2 text-sm transition-colors"
                placeholder="+90 5XX XXX XX XX"
              />
            </div>

            {/* Photo Upload */}
            <div>
              <p className="text-sm tracking-widest uppercase text-on-surface/60 mb-3">
                Saç Fotoğrafı <span className="normal-case text-on-surface/30">(isteğe bağlı)</span>
              </p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
              {photoPreview ? (
                <div className="flex items-center gap-4">
                  {/* Preview */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoPreview}
                    alt="Saç fotoğrafı önizleme"
                    className="w-20 h-20 rounded object-cover border border-outline-variant/20"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-on-surface/70 max-w-[180px] truncate">{photo?.name}</p>
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="text-[11px] text-primary/70 hover:text-primary transition-colors text-left"
                    >
                      Değiştir
                    </button>
                    <button
                      type="button"
                      onClick={() => { setPhoto(null); setPhotoPreview(null); if (fileRef.current) fileRef.current.value = ""; }}
                      className="text-[11px] text-on-surface/40 hover:text-error transition-colors text-left"
                    >
                      Kaldır
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-full border border-dashed border-outline-variant/30 hover:border-primary/40 rounded p-5 flex flex-col items-center gap-2 text-on-surface/40 hover:text-on-surface/70 transition-colors group"
                >
                  <span className="material-symbols-outlined text-[28px] group-hover:text-primary/60 transition-colors">add_photo_alternate</span>
                  <span className="text-sm">Fotoğraf ekle</span>
                  <span className="text-[10px] text-on-surface/30">JPG, PNG, HEIC — maks. 10 MB</span>
                </button>
              )}
              <p className="text-[10px] text-on-surface/30 mt-2 leading-relaxed">
                Saçınızın mevcut durumunu görmek için yardımcı olur. Eklemek zorunlu değil.
              </p>
            </div>

            {/* KVKK Consent */}
            <div className="flex items-start gap-3">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                checked={form.consent}
                onChange={handleChange}
                className="mt-0.5 accent-primary cursor-pointer"
              />
              <label htmlFor="consent" className="text-sm text-on-surface/70 leading-relaxed cursor-pointer">
                Kişisel verilerimin{" "}
                <Link href="/kvkk-aydinlatma" className="text-primary hover:underline">
                  KVKK
                </Link>{" "}
                kapsamında işlenmesini kabul ediyorum.
              </label>
            </div>

            {/* Submit */}
            {submitState === "success" ? (
              <div className="flex items-center gap-3 text-success text-sm bg-success/10 border border-success/20 rounded-sm px-6 py-4">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>Bilgileriniz alındı! Uzmanımız 24 saat içinde sizinle iletişime geçecek.</span>
              </div>
            ) : (
              <>
                <button
                  type="submit"
                  disabled={!form.consent || !form.firstName || !form.phone || busy}
                  className="bg-primary text-on-primary px-10 py-4 font-label uppercase tracking-widest text-sm rounded-sm hover:bg-primary-container transition-all w-full disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {busy ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3 h-3 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                      {buttonLabel}
                    </span>
                  ) : buttonLabel}
                </button>
                {submitState === "error" && (
                  <p className="text-error text-sm text-center">Bir hata oluştu. Lütfen WhatsApp ile bize ulaşın.</p>
                )}
              </>
            )}
          </form>

          {/* Trust Row */}
          <div className="flex flex-wrap gap-4 justify-center mt-8 pt-6 border-t border-outline-variant/10">
            {[
              { icon: "lock", label: "SSL şifreli" },
              { icon: "verified_user", label: "KVKK uyumlu" },
              { icon: "shield", label: "Veriler satılmaz" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-on-surface/50 text-[11px]">
                <span className="material-symbols-outlined text-primary/70 text-[14px]">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
