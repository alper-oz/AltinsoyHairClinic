"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError("E-posta veya şifre hatalı.");
      setLoading(false);
    } else {
      router.push("/dashboard/leads");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(233,193,118,0.06) 0%, #131313 60%)" }}>

      {/* Logo */}
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-headline text-2xl tracking-tighter text-primary mb-1">
            ALTINSOY
          </p>
          <p className="text-xs tracking-[0.3em] uppercase text-on-surface-variant font-label">
            Yönetim Paneli
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8"
          style={{
            background: "#1c1b1b",
            border: "1px solid rgba(233,193,118,0.12)",
            boxShadow: "0 0 0 1px rgba(78,70,57,0.3), 0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(233,193,118,0.06)",
          }}>

          <h1 className="font-headline text-lg text-on-surface mb-6">
            Giriş Yap
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-label tracking-widest uppercase text-on-surface-variant">
                E-posta
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-lg px-4 py-3 text-sm font-body text-on-surface outline-none transition-all duration-200"
                style={{
                  background: "#201f1f",
                  border: "1px solid rgba(78,70,57,0.4)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(233,193,118,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(78,70,57,0.4)")}
                placeholder="admin@altinsoy.com"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-label tracking-widest uppercase text-on-surface-variant">
                Şifre
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-lg px-4 py-3 text-sm font-body text-on-surface outline-none transition-all duration-200"
                style={{
                  background: "#201f1f",
                  border: "1px solid rgba(78,70,57,0.4)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(233,193,118,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(78,70,57,0.4)")}
                placeholder="••••••••"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-center py-2 px-3 rounded-lg"
                style={{ background: "rgba(220,53,69,0.1)", color: "#f87171", border: "1px solid rgba(220,53,69,0.2)" }}>
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-12 w-full rounded-lg text-sm font-label tracking-widest uppercase transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #e9c176, #c5a059)",
                color: "#412d00",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingDots />
                </span>
              ) : (
                "Giriş Yap"
              )}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-on-surface-variant mt-6 opacity-40">
          Altınsoy Hair Clinic © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{
            background: "#412d00",
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }`}</style>
    </>
  );
}
