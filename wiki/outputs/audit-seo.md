---
title: SEO/GEO/AEO Audit
type: output
tags: [audit, seo, geo, aeo]
created: 2026-04-17
status: final
sources: [preview/*.html (18 sayfa)]
---

# SEO + GEO + AEO Audit Raporu

**Kapsam:** `altınsoy/preview/` altındaki 18 yayın sayfası.
**Denetleyen:** seo-geo-specialist
**Tarih:** 2026-04-17

---

## Özet (Executive Snapshot)

| Alan | Durum | Skor |
|---|---|---|
| `<title>` mevcut | 18/18 | Tam |
| Title 60 karakter altı | 5/18 | **KRİTİK** |
| Meta description mevcut | 18/18 | Tam |
| Meta description 155 altı | ~16/18 | İyi |
| Canonical link | 18/18 | Tam |
| `lang="tr"` | 18/18 | Tam |
| OpenGraph tag set | **3/18** | **KRİTİK** |
| Twitter Card | **0/18** | **KRİTİK** |
| `og:image` | **0/18** | **KRİTİK** |
| Tek H1 kuralı | 18/18 | Tam |
| JSON-LD Schema mevcut | 16/18 (legal sayfalar hariç) | İyi |
| FAQPage schema | 15/18 | Çok iyi |
| AEO "Kısa cevap" kutusu | 3/18 | **Zayıf** |
| Soru formatlı H2 | ~7/18 (kısmi) | Orta |
| `<img>` alt text | 6/6 (sadece index) | Tam (ama imaj yok) |
| **sitemap.xml** | **YOK** | **ENGELLEYİCİ** |
| **robots.txt** | **YOK** | **ENGELLEYİCİ** |
| **favicon** | **YOK (0/18 referans)** | **ENGELLEYİCİ** |
| Türkçe karakter URL'de | Yok | Temiz |
| Orphan sayfa riski | oncesi-sonrasi & vaka-* (düşük internal link) | Orta |

**Tek cümlelik değerlendirme:** İçerik ve schema altyapısı güçlü (özellikle FAQPage kapsamı); ama **paylaşım (OG/Twitter), keşif (sitemap/robots/favicon) ve AEO-first UX (Kısa cevap kutusu + soru H2) altyapıları eksik**. Yayın öncesi bu 3 katman tamamlanmalı.

---

## Sayfa × Kriter Matrisi

Lejant: ✅ tam | ⚠️ kısmi/uzun/eksik | ❌ yok | — uygulanamaz

| # | Sayfa | Title ≤60 | Meta ≤155 | Canon | OG | Twitter | H1=1 | Schema Tipi | AEO Kutu | Alt |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | index.html | ⚠️ (~66) | ✅ | ✅ | ❌ | ❌ | ✅ | MedicalClinic+FAQPage ✅ | ⚠️ (dinamik, JS-içi) | ✅ (6/6) |
| 2 | sac-ekimi.html | ⚠️ (~68) | ✅ | ✅ | ❌ | ❌ | ✅ | MedicalProcedure+FAQPage ✅ | ❌ | — (0 img) |
| 3 | sac-analizi.html | ✅ (~43) | ✅ | ✅ | ❌ | ❌ | ✅ | MedicalWebPage+MedicalClinic | ❌ | — |
| 4 | sac-ekimi-fue.html | ⚠️ (~70) | ✅ | ✅ | ❌ | ❌ | ✅ | MedicalProcedure+FAQPage ✅ | ❌ | — |
| 5 | sac-ekimi-dhi.html | ⚠️ (~80) | ✅ | ✅ | ❌ | ❌ | ✅ | MedicalProcedure+FAQPage ✅ | ❌ | — |
| 6 | sac-ekimi-sapphire.html | ⚠️ (~75) | ✅ | ✅ | ❌ | ❌ | ✅ | MedicalProcedure+FAQPage ✅ | ❌ | — |
| 7 | fue-vs-dhi.html | ⚠️ (~68) | ✅ | ✅ | ❌ | ❌ | ✅ | MedicalProcedure+Article+FAQPage ✅ | ✅ (p içi) | — |
| 8 | vaka-fue-3200-greft.html | ⚠️ (~63) | ✅ | ✅ | ❌ | ❌ | ✅ | MedicalProcedure+FAQPage ✅ | ❌ | — |
| 9 | vaka-dhi-sakal-1800-greft.html | ⚠️ (~62) | ✅ | ✅ | ❌ | ❌ | ✅ | MedicalProcedure+FAQPage ✅ | ❌ | — |
| 10 | vaka-kas-restorasyonu-400-greft.html | ✅ (~58) | ✅ | ✅ | ❌ | ❌ | ✅ | MedicalProcedure+FAQPage ✅ | ❌ | — |
| 11 | oncesi-sonrasi.html | ⚠️ (~74) | ✅ | ✅ | ❌ | ❌ | ✅ | MedicalProcedure+FAQPage ✅ | ❌ | — (0 img — **kritik**) |
| 12 | fiyat.html | ⚠️ (~64) | ✅ | ✅ | ❌ | ❌ | ✅ | MedicalWebPage+MedicalClinic+FAQPage ✅ | ✅ | — |
| 13 | iletisim.html | ✅ (~51) | ✅ | ✅ | ❌ | ❌ | ✅ | LocalBusiness+MedicalClinic+FAQPage ✅ | ❌ | — |
| 14 | greft-hesaplama.html | ⚠️ (~70) | ✅ | ✅ | ✅ | ❌ | ✅ | MedicalWebPage+HowTo+FAQPage ✅ | ❌ | — |
| 15 | fiyat-hesaplama.html | ⚠️ (~72) | ✅ | ✅ | ✅ | ❌ | ✅ | MedicalWebPage+HowTo+FAQPage ✅ | ❌ | — |
| 16 | uygun-degil.html | ⚠️ (~76) | ✅ | ✅ | ✅ | ❌ | ✅ | MedicalWebPage+MedicalClinic+FAQPage ✅ | ✅ | — |
| 17 | gizlilik-politikasi.html | ✅ (~47) | ✅ | ✅ | ❌ | ❌ | ✅ | — (legal, gerek yok) | — | — |
| 18 | kvkk-aydinlatma.html | ✅ (~52) | ✅ | ✅ | ❌ | ❌ | ✅ | — (legal) | — | — |
| 19 | cerez-politikasi.html | ✅ (~42) | ✅ | ✅ | ❌ | ❌ | ✅ | — (legal) | — | — |

> Not: `altinsoy.html` dosyası klasörde mevcut ama 18'lik denetim listesinde değil — muhtemelen eski/alternatif bir versiyon (sadece H1 ve title var, OG/canonical/schema yok). **Aksiyon: silinmeli veya `noindex` eklenmeli**, SEO'da duplicate content riski.

---

## KRİTİK Eksikler (Yayın Öncesi Zorunlu)

### A. Altyapı (engelleyici — crawler erişimi)

1. **`sitemap.xml` YOK.** Google/Bing/AI botları sayfa keşfini bu dosyadan yapar. Root dizinde `altinsoy/sitemap.xml` oluşturulmalı, tüm 18 URL (canonical'lar) ve lastmod/priority bilgileriyle.
2. **`robots.txt` YOK.** Minimum içerik: `User-agent: *` / `Allow: /` / `Sitemap: https://altinsoy.com/sitemap.xml`. Ayrıca 2026 itibarı GEO için `User-agent: GPTBot`, `User-agent: ClaudeBot`, `User-agent: PerplexityBot` politikaları açıkça belirtilmeli (aksi halde bazı AI'lar crawl etmiyor).
3. **`favicon` yok** — hiçbir sayfada `<link rel="icon">` tag'i yok. Hem UX (tab bar) hem de brand recognition için eksik. `.ico` + `apple-touch-icon` + `manifest.json` eklenmeli.
4. **`llms.txt` yok (2026 GEO best practice).** AI asistanların klinik hakkında doğru, kısa, atıflabilir içerik bulması için root'ta `llms.txt` eklenmesi önerilir.

### B. Sosyal Paylaşım (düşük CTR + GEO citation kaybı)

5. **15/18 sayfada OpenGraph tag seti eksik.** Sadece araç sayfaları (greft-hesaplama, fiyat-hesaplama, uygun-degil) var. Eksikler: index, sac-ekimi, sac-analizi, sac-ekimi-fue, sac-ekimi-dhi, sac-ekimi-sapphire, fue-vs-dhi, vaka-*, oncesi-sonrasi, fiyat, iletisim, legal-3. Her sayfaya en az: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:site_name`, `og:locale` eklenmeli.
6. **18/18 sayfada Twitter Card yok.** En azından `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image` eklenmeli.
7. **18/18 sayfada `og:image` yok** — paylaşımlarda görsel çıkmaz. Her sayfa için en az bir 1200×630 OG görseli üretilmeli (vaka sayfalarında öncesi/sonrası kompozit, teknik sayfalarda şema görseli, index'te brand mark).

### C. Title Uzunlukları (SERP kırpması)

8. **13/18 sayfada title 60 karakter sınırını aşıyor.** Google'un SERP'te kırptığı sınır. En kritik aşımlar:
   - `sac-ekimi-dhi.html`: ~80 karakter
   - `uygun-degil.html`: ~76
   - `sac-ekimi-sapphire.html`: ~75
   - `oncesi-sonrasi.html`: ~74
   - `fiyat-hesaplama.html`: ~72
   - `sac-ekimi-fue.html`, `greft-hesaplama.html`: ~70

   Brand (`| Altınsoy Hair Clinic`) uzun. Kısaltma stratejisi: "| Altınsoy" veya brand'i description'a taşı.

### D. Görsel SEO (vaka ve galeri sayfalarında kritik)

9. **`oncesi-sonrasi.html` ve 3 vaka sayfasında HİÇ `<img>` yok.** Bu sayfalar görsel-first içerikler — muhtemelen CSS `background-image` veya placeholder kullanılıyor. Gerçek `<img>` tag'leri, alt text ve `loading="lazy"` ile eklenmeli. Görsel SEO, Google Images trafiği ve AEO için kritik (AI Overview hasta sonuç görsellerini atıflar).

### E. Ayrı/Eski Dosya

10. **`altinsoy.html` dosyası** klasörde mevcut, denetim listesinde yok, minimum meta içeriyor. Silinmeli veya `<meta name="robots" content="noindex">` eklenmeli (duplicate content riski).

---

## AEO (Answer Engine Optimization) Analizi

| Sayfa | Soru H2'ler (tespit) | "Kısa cevap" Kutusu | FAQ Schema | AEO Skor |
|---|---|---|---|---|
| index.html | FAQ içinde soru seti var; H2 soru formatı sınırlı | ⚠️ JS içi dinamik | ✅ (5 soru) | 3/5 |
| sac-ekimi.html | 2 soru H2 | ❌ | ✅ | 3/5 |
| sac-analizi.html | 2 soru H2 | ❌ | ❌ | 2/5 |
| sac-ekimi-fue.html | 4 soru H2 | ❌ | ✅ | 3/5 |
| sac-ekimi-dhi.html | 4 soru H2 | ❌ | ✅ | 3/5 |
| sac-ekimi-sapphire.html | 4 soru H2 | ❌ | ✅ | 3/5 |
| fue-vs-dhi.html | 4 soru H2 | ✅ (hero'da paragraf) | ✅ | **5/5** |
| vaka-fue-3200-greft.html | 5 soru H2 | ❌ | ✅ | 4/5 |
| vaka-dhi-sakal-1800-greft.html | 5 soru H2 | ❌ | ✅ | 4/5 |
| vaka-kas-restorasyonu-400-greft.html | 5 soru H2 | ❌ | ✅ | 4/5 |
| oncesi-sonrasi.html | 3 soru H2 | ❌ | ✅ | 3/5 |
| fiyat.html | 13 soru H2 (çok iyi) | ✅ (dedicated H2 blok) | ✅ | **5/5** |
| iletisim.html | ~0 soru H2 | ❌ | ✅ | 2/5 |
| greft-hesaplama.html | 4 soru H2 | ❌ | ✅ | 3/5 |
| fiyat-hesaplama.html | 4 soru H2 | ❌ | ✅ | 3/5 |
| uygun-degil.html | 2 soru H2 | ✅ | ✅ | **5/5** |

**AEO bulgusu:** `fue-vs-dhi`, `fiyat`, `uygun-degil` referans kalite (tam AEO). Diğerleri FAQ schema var ama **sayfa gövdesinde "Kısa cevap" kutusu eksik**. AEO kuralı: AI'lar schema'dan önce DOM'u tarar; görsel kutu yoksa "featured answer" olarak seçilme ihtimali düşer.

**Öncelikli AEO aksiyonu:** Her teknik ve araç sayfasında (12 sayfa) H1 altına `<div class="short-answer">` kutusu eklenmeli — hero'daki soruya 2-3 cümlede doğrudan cevap.

---

## GEO (Generative Engine Optimization) Analizi

| Kriter | Durum | Not |
|---|---|---|
| Entity authority (MedicalClinic schema) | ✅ index + 10+ sayfa | Iyi |
| Physician schema | ⚠️ | `Dr. [İsim Soyisim]` placeholder — **AEO için kritik hata**, gerçek doktor adı ve bio eklenmeli |
| aggregateRating | ✅ (index: 4.9 / 850) | Iyi, ama tüm sayfalara yayılmalı |
| Orijinal veri noktaları | ✅ "10.000+ operasyon, 15 yıl, ISHRS" | Atıflanabilir |
| Vaka detay sayıları | ✅ (3.200 greft, 1.800 greft, 400 greft — spesifik) | Çok iyi GEO sinyali |
| E-E-A-T (Author/Physician) | ⚠️ | Doktor profil sayfası yok; skill uyarısına göre gerekli |
| `llms.txt` | ❌ | 2026 GEO best practice |
| Brand mention tutarlılığı | ⚠️ | İki format: "Altınsoy Saç Ekim Merkezi" ve "Altınsoy Hair Clinic" — tek canonical brand seçilmeli |

---

## Internal Linking

`href` ile diğer `.html` sayfalara link sayımı (count, kabaca toplam href — navigasyon dahil):

| Sayfa | İç link sayısı |
|---|---|
| index.html | 20 |
| fiyat-hesaplama.html | 18 |
| fiyat.html | 17 |
| oncesi-sonrasi.html | 17 |
| sac-ekimi.html | 18 |
| fue-vs-dhi.html | 16 |
| greft-hesaplama.html | 16 |
| uygun-degil.html | 16 |
| iletisim.html | 13 |
| sac-ekimi-fue.html | 13 |
| sac-ekimi-dhi.html | 13 |
| sac-ekimi-sapphire.html | 13 |
| vaka-*.html (3) | 14 |
| sac-analizi.html | 10 |
| cerez/gizlilik/kvkk | 5 |

**Bulgu:** Tüm içerik sayfaları ≥10 link içeriyor — orphan sayfa yok. Ancak:
- **sac-analizi** sadece 10 link (daha fazla contextual link'e uygun — ilgili vaka ve teknik sayfalarına).
- **Legal sayfalar** (5'er link) — sadece footer'dan erişiliyor; bu doğru.
- **Vaka sayfaları** birbirine çapraz link vermiyor (vaka→vaka önerisi eksik — AEO ve user engagement için).

---

## Keyword Hedefleme (spot-check)

| Sayfa | Birincil Keyword | Title'da | H1'de | Meta'da |
|---|---|---|---|---|
| index | "saç ekimi istanbul" | ✅ | ❌ (genel) | ✅ |
| sac-ekimi | "saç ekimi nedir" | ✅ | ✅ | ✅ |
| sac-ekimi-fue | "fue saç ekimi" | ✅ | ✅ | ✅ |
| sac-ekimi-dhi | "dhi saç ekimi" | ✅ | ✅ | ✅ |
| sac-ekimi-sapphire | "sapphire fue" | ✅ | ✅ | ✅ |
| fue-vs-dhi | "fue vs dhi" | ✅ | ✅ | ✅ |
| fiyat | "saç ekimi fiyat 2026" | ✅ | ❌ (creative) | ✅ |
| oncesi-sonrasi | "saç ekimi öncesi sonrası" | ✅ | ❌ (creative) | ✅ |
| greft-hesaplama | "greft hesaplama" | ✅ | ✅ | ✅ |
| fiyat-hesaplama | "saç ekimi fiyat hesaplama" | ✅ | ❌ | ✅ |
| uygun-degil | "saç ekimi uygun değil" | ✅ | ✅ | ✅ |

**Bulgu:** Creative-only H1'ler (fiyat, oncesi-sonrasi, fiyat-hesaplama, index) keyword içermiyor — AEO ve SEO için orta düzey kayıp. H1'e alt-satır veya alt-text şeklinde keyword entegre edilmeli.

**Türkçe karakter sorunu (önemli):** FUE/DHI/Sapphire sayfalarında title ve H1 metinlerinde `ç, ğ, ı, ş, ü` karakterleri KULLANILMAMIŞ ("Sac", "Yapilir", "Dogal"). Hem Türkçe SEO (user query'lerinde Türkçe karakterli) hem UX için **tutarsız**. Diğer sayfalar Türkçe karakter kullanıyor. Tekrar düzeltilmeli.

---

## URL Yapısı

Tüm dosya isimleri ve canonical'lar SEO-friendly (küçük harf, tire, Türkçe karakter yok). Canonical path şeması mantıklı:
- `/sac-ekimi/`, `/fue-sac-ekimi/`, `/dhi-sac-ekimi/`, `/sapphire-fue/`, `/oncesi-sonrasi/fue-3200-greft/`, `/kimler-icin-uygun-degil/` vb.

**Uyarı:** Dosya adı ve canonical URL uyumu bazı yerlerde yok (örn. `sac-ekimi-fue.html` → `/fue-sac-ekimi/`). Production'da URL rewrite/.htaccess veya Next.js rewrites ile map edilmeli — aksi halde 404 riski.

---

## Öneriler (Öncelik Sırasına Göre)

### P0 — Yayın Öncesi Zorunlu (Engelleyici)

1. **sitemap.xml + robots.txt + favicon** üret (root).
2. **Tüm 18 sayfaya OG tag seti + Twitter Card + og:image** ekle.
3. **`Physician` schema'sındaki `Dr. [İsim Soyisim]` placeholder**'ını gerçek doktor bilgisiyle değiştir (GEO'da kritik hata).
4. **Title kısaltması** — 13 sayfada 60 karakter sınırına çek.
5. **`altinsoy.html`** (orphan duplicate) sil veya noindex.
6. **Türkçe karakterleri FUE/DHI/Sapphire sayfalarının title+H1+meta'sına geri getir**.

### P1 — AEO/GEO Güçlendirme (2 hafta içinde)

7. **Her teknik+araç sayfasına (12 sayfa)** H1 altına görsel "Kısa cevap" kutusu.
8. **oncesi-sonrasi + 3 vaka sayfasına gerçek `<img>` + alt text + lazy load**. Görsel yoksa AEO zayıflar.
9. **`llms.txt`** dosyası root'a eklenmeli (2026 AI crawler için).
10. **Brand naming standardize**: "Altınsoy Saç Ekim Merkezi" (TR) / "Altınsoy Hair Clinic" (EN) — karar verilmeli, tüm sayfalarda tutarlı.
11. **Vaka sayfaları birbirine çapraz linklensin** ("İlgili vakalar" bölümü).
12. **sac-analizi** internal link sayısı artırılmalı (şimdi 10, hedef 15+).

### P2 — İleri Optimizasyon (sprint 2)

13. **Core Web Vitals audit** (GSC + PSI ile LCP/CLS ölçümü — Tailwind CDN yerine inline/bundled CSS önerisi).
14. **Hreflang** — EN versiyon planlanıyorsa şimdiden placeholder.
15. **Blog/TOFU içerik hub'ı** — "saç ekimi sonrası ne zaman yıkanır" gibi long-tail sorular ayrı URL'ler olmalı.
16. **Review schema** (aggregateRating haricinde bireysel `Review` schema'ları hasta yorumları sayfasına).
17. **Doktor profil sayfası** (`/doktorlarimiz/`) — E-E-A-T için zorunlu.

---

## Hızlı Self-Review (audit iç kontrolü)

- [x] 18 sayfanın tamamı tarandı
- [x] Skill SKILL.md okundu ve kriterler uygulandı
- [x] SEO + GEO + AEO üçlüsü ayrı ayrı değerlendirildi
- [x] Kritik vs öneri ayrımı yapıldı
- [x] Her bulguya aksiyon önerisi eklendi
- [x] Sayfa × Kriter matrisi eksiksiz

---

## HANDOFF

```
HANDOFF: seo-geo-specialist → web-developer + copywriter + ui-designer
Dosya: wiki/outputs/audit-seo.md
Özet: 18 sayfalık tam SEO/GEO/AEO denetimi. Altyapı (sitemap/robots/favicon) ve sosyal (OG/Twitter) katmanları eksik; içerik/schema altyapısı güçlü.
Aksiyon:
  - web-developer: P0 altyapı (sitemap.xml, robots.txt, favicon, OG/Twitter template)
  - copywriter: Title kısaltma (13 sayfa) + Türkçe karakter düzeltmesi + "Kısa cevap" kutu metinleri (12 sayfa)
  - ui-designer: OG görsel seti (18×1200×630) + "Kısa cevap" component tasarımı
Flag: Physician schema'da placeholder doktor bilgisi GEO/E-E-A-T'de kırmızı bayrak — trichologist/account-lead'den gerçek doktor bilgisi acil.
```
