# Altınsoy Saç Ekim Merkezi

İstanbul merkezli saç, sakal ve kaş restorasyon cerrahisi kliniğinin **dijital ürünleri ve içerik altyapısı** — production web sitesi, admin paneli ve LLM-temelli ajans bilgi tabanı.

> **Private repository.** Marka içeriği, hasta-yönlendirme metinleri ve klinik admin paneli içerir.

## Proje Yapısı

```
altinsoy/
├── dashboard/              # Production Next.js 16 uygulaması (web sitesi + admin paneli)
│   ├── app/                # App Router rotaları
│   │   ├── [locale]/(site) # Public site (TR/EN/AR, 22 sayfa)
│   │   ├── dashboard/      # Admin paneli (auth korumalı)
│   │   ├── api/            # REST endpoints (banners, cases, faqs, hero, leads, ...)
│   │   └── login/          # Auth giriş
│   ├── components/         # Site + admin React bileşenleri
│   ├── lib/                # Helper'lar (Supabase, i18n, fal.ai, ...)
│   ├── messages/           # next-intl mesaj dosyaları (tr/en/ar.json)
│   ├── i18n/               # next-intl routing + pathnames
│   ├── supabase/migrations # SQL migration dosyaları
│   ├── scripts/            # Seed / backfill / temizlik script'leri
│   └── proxy.ts            # Next.js 16 proxy (i18n + auth + page-settings)
├── wiki/                   # LLM-üretimi bilgi tabanı (strateji, içerik, audit raporları)
├── skills/                 # Ajans rolleri (24 skill — copywriter, trichologist, vb.)
├── raw/                    # Dokunulmaz kaynak dosyalar (makaleler, asset, brief)
├── preview/                # Statik HTML mockup'ları (dashboard'a taşınmadan önceki konsept)
├── tools/                  # Node.js yardımcı script'ler (HTML manipülasyonu)
├── CLAUDE.md               # Proje protokolü ve ajans işleyiş kuralları
├── index.md                # Wiki + skill kataloğu
└── log.md                  # Kronolojik işlem kaydı
```

## Tech Stack (dashboard/)

| Katman | Teknoloji |
|---|---|
| Framework | **Next.js 16.2.4** (App Router, Turbopack) |
| UI | **React 19.2.4** + **TypeScript 5** |
| Stil | **Tailwind CSS v4** |
| i18n | **next-intl 4.11** (TR / EN / AR + RTL) |
| Auth + DB | **Supabase** (`@supabase/ssr` + `@supabase/supabase-js`) |
| AI / Görsel | **fal.ai** (`@fal-ai/client`) |
| Animasyon | **GSAP 3** |
| Grafik | **Recharts 3** |

## Setup

### 1. Bağımlılıklar

```bash
cd dashboard
npm install
```

### 2. Environment Variables

`dashboard/.env.local` dosyası oluşturun (bu dosya gitignore'da, paylaşılmaz):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<proje>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
FAL_KEY=<fal-api-key>
```

### 3. Database Migrations

Supabase Dashboard → SQL Editor → şu migration'ları sırayla çalıştırın:

1. `dashboard/supabase/migrations/0001_add_locale_columns.sql` — banner/hero/case/faq tablolarına `_en` ve `_ar` sütunları
2. `dashboard/supabase/migrations/0002_page_settings.sql` — sitemap admin için `page_settings` tablosu

### 4. Dev server

```bash
cd dashboard
npm run dev   # http://localhost:3000
```

## Site Yapısı

### Public Site
- 3 dil: **TR** (default, prefix yok), **EN** (`/en/...`), **AR** (`/ar/...`, RTL)
- 22 sayfa: anasayfa, hub'lar (saç-ekimi, sakal, kaş), teknikler (FUE/DHI/Sapphire), dönüşüm sayfaları (fiyat, hesaplama, iletişim, sac-analizi), vakalar, yasal sayfalar
- URL slug'ları her dilde **çevirili** (örn. `/sac-ekimi` → `/en/hair-transplant` → `/ar/زراعة-الشعر`)

### Admin Paneli (`/dashboard`)
- Auth korumalı (Supabase Auth)
- Yönetilen içerik: Hero, Banner, SSS, Vakalar (öncesi-sonrası), Sosyal Medya, **Sitemap** (sayfa aktif/pasif toggle), Lead, Trafik
- Tüm içerik **3 dilde** girilir (TR zorunlu, EN/AR opsiyonel — boşsa TR'ye fallback)

## Geliştirme Notları

**Next.js 16 breaking changes** — `dashboard/AGENTS.md`'de uyarı: `params` artık `Promise`, kod yazmadan önce `node_modules/next/dist/docs/` lokal docs'a bakın.

**LLM-driven workflow** — `CLAUDE.md` ve `skills/` ajans işleyişini tanımlar. Her görev önce komutan skill'inden geçer, ilgili rol skill'leri (trichologist, copywriter, health-regulator, vb.) zincirleme uygulanır.

## Lisans

Proprietary — Altınsoy Saç Ekim Merkezi'ne aittir. İzin olmadan kopyalanamaz.
