import type { Metadata } from "next";
import { Noto_Serif, Manrope, Noto_Sans_Arabic } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-noto-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Altınsoy Dashboard",
  description: "Altınsoy Hair Clinic — Yönetim Paneli",
  robots: "noindex, nofollow",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Middleware'den gelen locale bilgisini oku (sadece public site rotaları için set edilir)
  const hdrs = await headers();
  const locale = hdrs.get("x-locale") ?? "tr";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${notoSerif.variable} ${manrope.variable} ${notoSansArabic.variable} h-full`}
    >
      <head>
        {/* Anti-flash: tema kararı React hidrasyon öncesinde uygulanır */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('altinsoy-theme');if(!t){t=window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark';}if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`,
          }}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="h-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
