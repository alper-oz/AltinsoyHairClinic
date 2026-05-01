---
title: "Kapsamlı Kontrol Planı — Ekip Genel Audit"
type: strategy
tags: [audit, qa, review, quality-control, pre-launch]
created: 2026-04-14
updated: 2026-04-14
status: active
---

# Kapsamlı Kontrol Planı — Tüm Ekip Genel Audit

**Amaç:** Yayın öncesi 18 aktif sayfayı 17 uzman perspektifinden denetlemek. Hiçbir kritik hatanın kaçmamasını sağlamak.

**Kapsam:** 18 HTML sayfa + wiki/strateji dokümanları + SEO altyapısı + kullanıcı deneyimi + tıbbi-hukuki uyum.

**Yaklaşım:** Her rol kendi SKILL.md'sindeki Self-Review checklist'ini uygular. Sonuç → konsolide rapor.

---

## 1. Denetlenecek Sayfalar (18 adet)

### Ana Omurga (3)
- `index.html` — Ana sayfa
- `sac-ekimi.html` — Teknikler hub
- `sac-analizi.html` — Ücretsiz analiz wizard

### Teknik Sayfalar (4)
- `sac-ekimi-fue.html`
- `sac-ekimi-dhi.html`
- `sac-ekimi-sapphire.html`
- `fue-vs-dhi.html`

### Vaka Detayları (3)
- `vaka-fue-3200-greft.html`
- `vaka-dhi-sakal-1800-greft.html`
- `vaka-kas-restorasyonu-400-greft.html`

### Dönüşüm (3)
- `oncesi-sonrasi.html`
- `fiyat.html`
- `iletisim.html`

### İnteraktif Araçlar (2)
- `greft-hesaplama.html`
- `fiyat-hesaplama.html`

### Farklılaşma (1)
- `uygun-degil.html`

### Yasal (3)
- `gizlilik-politikasi.html`
- `kvkk-aydinlatma.html`
- `cerez-politikasi.html`

---

## 2. Rol Bazlı Denetim Görevleri (17 uzman)

Her rol kendi SKILL.md'sinin Self-Review bölümünü uygular. Aşağıda her rolün odağı:

### 🩺 Tıbbi & Hasta Kapısı (3 rol)

#### 👨‍⚕️ trichologist — Tıbbi Doğruluk Kapısı
- [ ] Tüm tıbbi iddialar doğru mu? (Norwood, greft sayıları, zaman çizelgeleri)
- [ ] Kırmızı çizgi ihlali var mı? (garantili, ağrısız, %100, devrimsel, kesilmeden, hiç iz kalmaz)
- [ ] Teknik karşılaştırmalar fair mi (FUE vs DHI)?
- [ ] Beklenti yönetimi gerçekçi mi?
- [ ] Sapphire "devrimsel" değil vurgusu net mi?
- [ ] PRP/minoxidil iddiaları doğru mu?
- [ ] Şok dökülme açıklamaları tutarlı mı (tüm sayfalar aynı zaman çizelgesi mi kullanıyor)?
- [ ] Kontrendikasyonlar (uygun-degil.html) tıbbi olarak doğru mu?

**Çıktı:** `wiki/outputs/audit-trichologist.md` — ONAYLA/DÜZELT/SİL verdiktleri

#### 🧠 patient-psychologist — Hasta Uygunluğu Kapısı
- [ ] Her sayfa hangi faza (1-5) hitap ediyor? Ton uyumlu mu?
- [ ] Faz 1 hastasına satış mesajı verilmemiş mi?
- [ ] Faz 5 hastasına (post-op) rahatlatma içeriği var mı?
- [ ] Korku adresleme var mı (ağrı, doğallık, iz, garantisizlik)?
- [ ] Trust signal'lar CTA'dan ÖNCE yerleştirilmiş mi?
- [ ] Hasta dili mi, klinik jargon mu?
- [ ] Empati → bilgi → CTA akışı doğru mu?

**Çıktı:** `wiki/outputs/audit-patient-psych.md` — Faz bazlı değerlendirme + düzeltme önerileri

#### ⚖️ health-regulator — Regülasyon Uyumu Kapısı
- [ ] **YASAK kelime taraması** (tüm sayfalarda):
  - "indirim", "kampanya", "fırsat", "özel teklif", "avantaj", "tasarruf", "%X tasarruf"
  - "garantili", "kesin sonuç", "%100 başarı"
  - "en iyi", "rakipsiz", "tek"
  - "ağrısız", "acısız"
  - "hiç iz kalmaz", "tamamen doğal görünmez"
  - Ünlü/şöhretli ismi
  - Rakip klinik ismi
- [ ] Her sayfada disclaimer var mı?
- [ ] Tüm vakalarda "hasta onamıyla" notu var mı?
- [ ] KVKK aydınlatma linki ulaşılabilir mi?
- [ ] Form'larda KVKK checkbox zorunlu mu?
- [ ] "Tıbbi teşhis değildir" uyarısı fiyat/greft/analiz araçlarında var mı?
- [ ] Before/after görsellerde manipülasyon yok mu?

**Çıktı:** `wiki/outputs/audit-regulator.md` — GEÇTİ/REVİZYON/YAYINLANAMAZ verdikti

---

### 🎨 Strateji & Marka (3 rol)

#### 🎭 agency-director — Marka Tutarlılığı Kapısı
- [ ] Onyx & Gilt design system tüm sayfalarda tutarlı mı?
- [ ] Marka sesi (otoriter + şeffaf + empatik) tüm sayfalarda aynı mı?
- [ ] Uluslararası ödül kalitesinde mi?
- [ ] Kopya (rakip) mı, orijinal mi?
- [ ] Farklılaşma stratejisi (şeffaflık) tutarlı uygulanmış mı?
- [ ] Her sayfa portföye koyulur mu?

**Puan:** Her sayfa için 5 kriter × 1-5 puan = ortalama ≥4.0 olmalı

**Çıktı:** `wiki/outputs/audit-director.md` — sayfa bazlı puan + onay/revizyon

#### 🎯 strategy-planner — Stratejik Tutarlılık
- [ ] Her sayfa hangi stratejik hedefe hizmet ediyor?
- [ ] Mesaj hiyerarşisi value pillar'larla uyumlu mu?
- [ ] Rakipten ayrışma her sayfada görünüyor mu?
- [ ] Hasta yolculuğu (faz 1-5) haritalaması sayfalarla uyumlu mu?
- [ ] Farklılaşma stratejisindeki 7 önerinin durumu? (3 tamam, 4 bekliyor)

**Çıktı:** `wiki/outputs/audit-strategy.md`

#### 📋 account-lead — Proje Durumu
- [ ] Sprint 1-2-3 hedefleri karşılandı mı?
- [ ] Bekleyen işler (doktor profili vs)
- [ ] Hangi özellikler production-ready değil?
- [ ] Placeholder'lar listesi ([Klinik Adresi], [Doktor Adı] vs)
- [ ] Timeline güncellemesi

**Çıktı:** `wiki/outputs/audit-account.md` — tamamlanma yüzdeleri + eksik listesi

---

### 🛠️ Üretim Ekibi (4 rol)

#### 🎨 ui-designer — Görsel Tasarım
- [ ] Renk kullanımı tutarlı mı (primary #e9c176, surface hierarchy)?
- [ ] Tipografi (Noto Serif heading, Manrope body) her sayfada mı?
- [ ] Spacing (8px grid) tutarlı mı?
- [ ] Component kullanımı (card, button, input) standart mı?
- [ ] Kontrast oranları WCAG AA (4.5:1)?
- [ ] Mobil görünüm düzgün mü?
- [ ] Dark mode tüm sayfalarda aynı mı?
- [ ] Material Symbols ikonları tutarlı (fill/weight) mi?

**Çıktı:** `wiki/outputs/audit-ui.md` — sayfa × kriter matrisi

#### 📐 ux-architect — Deneyim Tasarımı
- [ ] Navigation tutarlı mı (tüm sayfalarda aynı nav)?
- [ ] Breadcrumb doğru hiyerarşiyi gösteriyor mu?
- [ ] CTA her scroll derinliğinde var mı?
- [ ] Trust signal CTA'dan önce mi?
- [ ] Form friction minimum mu?
- [ ] Mobile-first çalışıyor mu?
- [ ] Touch target min 44x44px mi?
- [ ] 3-saniye kuralı her sayfada?
- [ ] Kullanıcı akışları (journey) kırık link yok mu?

**Çıktı:** `wiki/outputs/audit-ux.md` — flow diagramı + friction noktaları

#### ✍️ copywriter — Metin Kalitesi
- [ ] Hasta dili mi yoksa klinik jargon mu?
- [ ] Her cümle test'ten geçiyor mu (Bilgi/Trust/Action/Emotion)?
- [ ] Jenerik marketing speak yok mu? ("en iyi hizmet", "yenilikçi çözümler")
- [ ] Headline max 8 kelime?
- [ ] Meta description 155 karakter altı mı?
- [ ] Filler kelimeler ("aslında", "gerçekten") yok mu?
- [ ] Marka sesi tutarlı mı?
- [ ] Yazım ve gramer hataları?

**Çıktı:** `wiki/outputs/audit-copy.md` — sayfa × cümle düzeltme önerileri

#### 🔍 seo-geo-specialist — SEO + GEO + AEO
- [ ] Her sayfa canonical + meta description + H1 var mı? ✅ (önceki audit geçti)
- [ ] Title tag 60 karakter altı mı?
- [ ] Schema markup uygun tip mi? (MedicalClinic, MedicalProcedure, FAQPage, HowTo)
- [ ] OpenGraph + Twitter Card eksik sayfalar var mı?
- [ ] Image alt text tüm görseller için var mı?
- [ ] Internal linking yapısı tutarlı mı?
- [ ] AEO soru formatı H2'ler (People Also Ask)
- [ ] Keyword uyumu (over-stuffing yok mu?)
- [ ] URL yapısı SEO-friendly mi?
- [ ] Sitemap.xml yok (KRİTİK)
- [ ] robots.txt yok (KRİTİK)

**Çıktı:** `wiki/outputs/audit-seo.md` — sayfa skor tablosu + eksik listesi

---

### ⚙️ Teknik Ekip (3 rol)

#### 🏗️ tech-advisor — Mimari Değerlendirme
- [ ] Production-ready mi? (Tailwind CDN production'da yavaş)
- [ ] Hosting kararı (Vercel, Cloudflare Pages)
- [ ] Güvenlik: SSL, CSP, form koruması
- [ ] Analytics/tracking altyapısı hazır mı?
- [ ] Bakım planı

**Çıktı:** `wiki/outputs/audit-tech.md` — production readiness skoru

#### 💻 software-engineer — Kod Kalitesi
- [ ] Wizard JavaScript'leri bug-free mi? (test edildi: greft + fiyat)
- [ ] Event listener cleanup
- [ ] Form validation client-side
- [ ] Console errors yok mu?
- [ ] Cross-browser uyumluluk (Chrome, Safari, Firefox, Edge)

**Çıktı:** `wiki/outputs/audit-code.md`

#### 🌐 web-developer — Platform & Performance
- [ ] Core Web Vitals (LCP, FID, CLS, INP)
- [ ] Lighthouse skoru (hedef 90+)
- [ ] Image optimization (WebP, lazy loading)
- [ ] Font loading strategy
- [ ] CSS bundle size
- [ ] GTM/Analytics placeholder'ı gerçek ID ile
- [ ] Hosting + CDN konfigürasyonu
- [ ] 404 sayfası var mı?
- [ ] Favicon var mı?

**Çıktı:** `wiki/outputs/audit-webdev.md`

---

### 📊 Analiz & Büyüme (3 rol)

#### 🔍 researcher — Rakip ile Konum
- [ ] Uluslararası rakiplere göre eksiklerimiz nelerdir?
- [ ] Rakiplerin yeni yaptığı özellikler var mı?
- [ ] Sektör trendleri ile uyum?
- [ ] Bizim unique avantajımız görünür mü?

**Çıktı:** `wiki/outputs/audit-research.md`

#### 📈 performance-analyst — Ölçüm Hazırlığı
- [ ] GA4 kurulum: conversion event'leri tanımlı mı?
- [ ] GTM container eklendi mi?
- [ ] Conversion noktaları (form submit, WhatsApp click, call click)
- [ ] KPI baseline belirlendi mi?
- [ ] A/B test altyapısı planı

**Çıktı:** `wiki/outputs/audit-performance.md`

#### 📱 social-strategist — Sosyal Paylaşım
- [ ] OpenGraph her sayfada mı?
- [ ] Twitter Card
- [ ] Share button'lar (opsiyonel)
- [ ] Instagram feed embed planı
- [ ] Sosyal medya platformlarından site-e giriş akışı

**Çıktı:** `wiki/outputs/audit-social.md`

---

### 📚 Altyapı (1 rol)

#### 📖 wiki-ops — Bilgi Tabanı Sağlık
- [ ] index.md tüm sayfaları listeliyor mu?
- [ ] log.md güncel mi?
- [ ] Orphan sayfa var mı?
- [ ] Cross-link'ler çalışıyor mu?
- [ ] Frontmatter standartlara uygun mu?
- [ ] Çelişen bilgi var mı (saç ekimi ağrılı mı gibi sorulara aynı cevap her yerde mi)?

**Çıktı:** `wiki/outputs/audit-wiki.md` — lint raporu

---

## 3. Cross-Sayfa Tutarlılık Kontrolleri (Kritik)

Bu noktalarda **tüm sayfalar aynı bilgiyi vermeli:**

| Kontrol | Hedef Değer |
|---------|-------------|
| Saç ekimi başarı oranı | "%85-95 greft tutma oranı" — her yerde AYNI |
| Zaman çizelgesi | 2-4 hafta şok, 3-4 ay ilk çıkış, 6-8 ay yoğunlaşma, 12-18 ay nihai |
| Fiyat aralığı | €2.500 - €5.000 |
| FUE süre | 4-6 saat |
| DHI süre | 5-7 saat |
| İyileşme | 7-10 gün |
| Telefon | +90 553 978 42 42 |
| E-posta | info@altinsoy.com |
| Deneyim yılı | 15 yıl |
| Operasyon sayısı | 10.000+ |
| Ülke sayısı | 42 |
| Google rating | 4.9/5 |

**Kural:** Bir sayılar bir yerde değişirse her yerde değişmeli. Tutarsızlık = güven kaybı.

---

## 4. Link Bütünlüğü Kontrolü

Tüm internal linkler çalışıyor mu?

| Kaynak | Hedef | Durum |
|--------|-------|-------|
| Ana sayfa nav → tüm ana sayfalar | ✓ | ? |
| Ana sayfa footer → yasal sayfalar | ✓ | ? |
| Ana sayfa before/after kartları → vaka sayfaları | ✓ | ? |
| Ana sayfa teknik kartları → teknik sayfalar | ✓ | ? |
| Hub → teknik sayfalar | ✓ | ? |
| Teknik sayfalar → FUE vs DHI | ✓ | ? |
| Tüm sayfalar → sac-analizi | ✓ | ? |
| Greft hesap → fiyat hesap | ✓ | ? |
| Fiyat hesap → sac-analizi | ✓ | ? |
| Uygun-degil → sac-analizi | ✓ | ? |

**404 tarama:** Otomatik scripte gerek var mı, yoksa manuel tıklama yeterli mi?

---

## 5. Yasak Kelime Global Taraması

Tüm sayfalarda grep ile tarama:

```
indirim, kampanya, fırsat, özel teklif, avantaj, tasarruf
garantili, %100, kesin sonuç, en iyi, rakipsiz
ağrısız, acısız, tamamen iz, hiç iz, devrimsel, kesilmeden
```

**Beklenen:** 0 eşleşme

---

## 6. Mobil Uyumluluk Testi

| Cihaz/Boyut | Test |
|-------------|------|
| iPhone 12/13 (390px) | Nav, hero, kartlar, form |
| iPad (768px) | Grid layout'lar |
| Desktop (1440px) | Tam deneyim |
| Wide screen (1920px) | Container max-width |

---

## 7. Kalite Kapısı Sırası

Audit şu sırada yapılmalı (paralel olabilir ama bazıları sıralı):

```
1. PARALEL: trichologist + health-regulator + seo + ui + ux + copywriter
   (hepsinin sayfayı ayrı ayrı incelemesi gerekiyor)

2. SIRALI (1. sonrası):
   strategy-planner (strateji tutarlılığı — diğer denetimleri toplar)
   ↓
   agency-director (marka kalitesi — son söz)
   ↓
   account-lead (konsolide rapor)
```

---

## 8. Çıktı Formatı — Konsolide Rapor

Audit bittiğinde `wiki/outputs/audit-genel-rapor-YYYY-MM-DD.md`:

```markdown
# Genel Audit Raporu — [Tarih]

## Özet
- Denetlenen: 18 sayfa
- Kritik hata: X
- Yüksek öncelikli: X
- Orta/düşük: X

## Rol Bazlı Sonuçlar
| Rol | Sayfa Skoru Ortalama | Kritik Sorun | Durum |
|-----|----------------------|--------------|-------|
| trichologist | 5.0/5 | 0 | ✅ |
| health-regulator | ... | ... | ... |

## Kritik Sorunlar (Yayın bloker)
1. [Sayfa] — [Sorun] — [Öneri]

## Yüksek Öncelikli
...

## Cross-sayfa Tutarsızlıklar
...

## Broken Links
...

## Sonraki Adımlar
1. ...
```

---

## 9. Uygulama Planı — Nasıl Çalışacağız?

### Opsiyon A: Paralel Agent Dispatch (Hızlı, 30-45 dk)
8+ agent paralel — her biri bir rol. En hızlı.

### Opsiyon B: Sıralı Manual (Detaylı, 1-2 saat)
Her rolü sırayla çalıştırırım. Daha derinlik, ama yavaş.

### Opsiyon C: Önce Kritik Roller (Dengeli, 45 dk)
Önce kalite kapıları (tricho + regulator + director) sonra diğerleri.

---

## 10. Önceden Bilinen Eksikler (Audit'te çıkacaktır)

- [ ] Doktor profili bilgisi bekliyor
- [ ] [Klinik Adresi] placeholder
- [ ] sitemap.xml + robots.txt yok
- [ ] OpenGraph eksik birkaç sayfada
- [ ] GTM container ID placeholder
- [ ] Harita embed placeholder (iletişim)
- [ ] Blog hub yok
- [ ] /en/ versiyonu yok
- [ ] Hasta yorumları sayfası yok
- [ ] İyileşme merkezi sayfası yok

Bunları bilmek audit'in "kritik" ve "bilinen eksik" ayırt etmesine yardımcı olur.

---

_Bu plan [[komutan]] orkestrasyonu ile tüm ekibin katılımına açıktır._
