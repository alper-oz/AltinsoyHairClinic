---
title: Teknik Audit (Tech-Advisor + SWE + Web-Dev)
type: output
tags: [audit, tech, performance, code]
created: 2026-04-14
---

# Teknik Audit Raporu

## Özet

- **Production readiness:** 4/10 — birçok altyapı eksiği var
- **Kritik teknik borç:** 8 madde
- **Performance:** Tailwind CDN kullanımı tüm 19 sayfada → production'da yavaş
- **Altyapı eksiği:** sitemap, robots, favicon, GTM/GA4 hepsi yok

---

## Production Readiness Checklist

| Öğe | Durum | Not |
|-----|-------|-----|
| Tailwind CDN production mode | ❌ | 19 sayfa `cdn.tailwindcss.com` kullanıyor — geliştirme CDN'i, yavaş |
| CSS bundle optimizasyonu | ❌ | Tüm Tailwind class'ları runtime'da işleniyor |
| Google Fonts preload | ❌ | Font preload link yok, FCP'ye etki ediyor |
| Favicon | ❌ | `favicon.ico` dosyası yok |
| apple-touch-icon | ❌ | Yok |
| 404.html | ❌ | Custom 404 sayfası yok |
| robots.txt | ❌ | Yok |
| sitemap.xml | ❌ | Yok |
| GTM container aktif | ❌ | GTM-XXXXXX placeholder `index.html` satır ~534'te |
| GA4 pixel | ❌ | Aktif değil |
| SSL/HTTPS | ⏳ | Hosting kararı henüz verilmedi |
| Content Security Policy | ❌ | Yok |
| Cache headers | ⏳ | Hosting bağımlı |

**Production readiness skoru: 0/13 aktif, 2/13 beklemede**

---

## JavaScript Bug Taraması

### Kontrol edilen wizard'lar

| Sayfa | Fonksiyon | Durum | Not |
|-------|-----------|-------|-----|
| `greft-hesaplama.html` | 4-adım wizard, hesaplama | ✅ Çalışıyor | Test edildi, tüm Norwood/Ludwig/sakal/kaş kombinasyonları doğrulandı |
| `fiyat-hesaplama.html` | 4-adım wizard, fiyat algoritması | ✅ Çalışıyor | Cap logic bug önceden fix edildi (min > max durumu) |
| `sac-analizi.html` | 3-adım wizard, KVKK validation | ✅ Çalışıyor | KVKK checkbox required, loading state var |
| `iletisim.html` | Form validation, dinamik açık/kapalı | ✅ Çalışıyor | Form submit prevent default, photo preview |
| `index.html` | Chatbot toggle, FAQ accordion, reveal animations | ✅ Çalışıyor | Inline onclick + scroll-based reveal |

**Tespit edilen bug: 0**

### Kod kalitesi

- **Global scope:** Wizard state (`state` variable) her araçta global. Küçük script için kabul edilebilir.
- **Event listener cleanup:** SPA değil, statik sayfalar → cleanup gereksiz.
- **Error handling:** Form validation HTML5 required + JS submit handler ile çalışıyor, ama server-side yok (backend eksik).

---

## Dead Link Taraması

**`href="#"` kullanımı tespit edildi:**

| Sayfa | Sayı | Detay |
|-------|------|-------|
| `altinsoy.html` | 13 | ESKİ dosya — silinmeli veya noindex |
| `index.html` | 5 | "Uzmanlık" nav link (satır 133), dil seçici (TR), EN seçici, footer social ikonlar, vb. |
| `sac-analizi.html` | 1 | Dil seçici (TR) |

**Kritik:** `index.html` ana nav'daki "Uzmanlık" linki dead. TR/EN dil seçici işlevsiz.

---

## Altyapı Eksikleri (KRİTİK)

```
❌ favicon.ico                 — Root klasörde yok
❌ apple-touch-icon-*.png      — Yok
❌ robots.txt                  — Yok (SEO kritik)
❌ sitemap.xml                 — Yok (SEO kritik)
❌ 404.html                    — Yok (UX)
❌ manifest.webmanifest        — Yok (PWA hazırlığı)
❌ GTM container               — GTM-XXXXXX placeholder
❌ GA4 measurement ID          — Placeholder
❌ Meta Pixel                  — Yok
❌ Microsoft Clarity           — Yok
```

---

## Lazy Loading Durumu

- Sadece `iletisim.html`'de 1 `loading="lazy"` kullanımı
- Diğer 17 sayfada image lazy loading tanımsız
- Aktif olarak görsel az kullanılıyor (placeholder'lar var) ama production'da eklenmeli

---

## Performans Önerileri

### Öncelik 1 (Production'a geçmeden önce ZORUNLU)
1. **Tailwind production build** — `@tailwindcss/cli` veya Vite ile bundle. CDN yerine minified CSS. Beklenen: CSS boyutu ~%95 azalır.
2. **Favicon + apple-touch-icon** oluştur.
3. **Sitemap.xml + robots.txt** oluştur.
4. **GTM/GA4 kur**, placeholder'ları gerçek ID ile değiştir.

### Öncelik 2 (İlk hafta)
5. Font preload: `<link rel="preload" href="..." as="font" crossorigin>`.
6. Tüm görsellere `loading="lazy"` ekle.
7. Cloudflare CDN devreye al.
8. 404.html custom sayfası.

### Öncelik 3 (İlk ay)
9. PWA manifest + service worker.
10. CSP header.
11. WebP + srcset tüm görsellerde.

---

## Security Notları

- **Form'larda XSS koruması:** Client-side only — backend olmadığı için risk düşük. Backend'e bağlanınca input sanitization gerekli.
- **External link'lerde `rel="noopener noreferrer"`:** ❌ Eksik (WhatsApp linki vb.)
- **HTTPS-only:** Hosting kararı ile gelecek.
- **Iframe koruması:** X-Frame-Options header gerekli (hosting seviyesinde).

---

## Cross-Browser Uyumluluk

- Tailwind v3 → modern browser desteği (IE yok)
- `backdrop-filter` (glass nav) → Safari'de 15.4+ destekli
- CSS Grid, Flexbox → sorunsuz
- JavaScript: ES2015+ syntax, tüm modern browser'lar destekliyor
- **Safari özel dikkat:** backdrop-filter, bazı font-variation-settings

---

## Tailwind CDN Sorun Derinliği

Tüm 19 HTML'de:
```html
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
```

**Sorun:**
- CDN her sayfa yüklemesinde Tailwind'i runtime'da compile ediyor (~300KB+ JS)
- Console warning: "cdn.tailwindcss.com should not be used in production"
- FCP/LCP'ye direkt etki
- Offline çalışma yok

**Çözüm:**
1. Vite + Tailwind PostCSS ile production build
2. veya standalone CLI ile tek CSS dosyası üret
3. Beklenen sonuç: ~15-30KB minified CSS, tüm runtime'lar kaldırılır

---

## Backend Eksikliği

Tüm formlar **client-side only**:
- sac-analizi form submit → sadece success state gösteriyor, veri gönderilmiyor
- iletisim form → sadece inline success
- greft/fiyat hesaplama → hesap yapıyor ama CRM'e gitmiyor

**Gerekli:**
- Form endpoint (Formspree, Netlify Forms, veya custom backend)
- Email notifikasyon
- CRM entegrasyonu (HubSpot, Pipedrive vs)
- WhatsApp API ile otomatik karşılama

---

## Özet Önceliklendirme

### P0 — Yayın öncesi MUTLAKA
- [ ] Tailwind production build
- [ ] Favicon + icons
- [ ] sitemap.xml + robots.txt
- [ ] GTM/GA4 gerçek ID
- [ ] Form backend (en azından Formspree)

### P1 — İlk hafta
- [ ] Dead link'leri fix (index.html 5 href="#")
- [ ] `altinsoy.html` eski dosyayı sil
- [ ] Font preload
- [ ] Image lazy loading
- [ ] 404.html
- [ ] rel="noopener noreferrer" external link'lerde

### P2 — İlk ay
- [ ] Cloudflare CDN
- [ ] CSP header
- [ ] PWA manifest
- [ ] Security headers

---

HANDOFF: `web-developer` (altyapı kurulumu) + `software-engineer` (production build + backend) → `agency-director` onay.
