---
title: "Altınsoy Hair Clinic — Kapsamlı Audit Genel Raporu"
type: output
tags: [audit, qa, pre-launch, consolidated]
created: 2026-04-14
updated: 2026-04-14
status: final
sources: [audit-tibbi.md, audit-regulator.md, audit-seo.md, audit-tasarim.md, audit-icerik-marka.md, audit-teknik.md, audit-analitik.md, audit-wiki-tutarlilik.md]
---

# Kapsamlı Audit Raporu — 2026-04-14

17 uzman rolün perspektifinden 18 sayfa, 4 interaktif araç ve 8 wiki dokümanı denetlendi. Bu rapor 8 alt audit dosyasının konsolide sentezidir.

---

## 1. Yönetici Özeti

**Genel Sonuç: REVİZYON GEREKLİ** — yayına hazırlık seviyesi %75. 3 yayın-bloker kritik madde, ~20 yüksek öncelikli düzeltme.

| Alan | Skor | Durum |
|------|------|-------|
| Tıbbi doğruluk (trichologist) | 4.73/5 | ✅ KALİTE KAPISI GEÇTİ |
| Regülasyon (KVKK/Sağlık) | 3.5/5 | ⚠️ REVİZYON GEREKLİ (1 BLOCK) |
| İçerik & Marka | 3.7/5 | ⚠️ REVİZYON GEREKLİ |
| Tasarım & UX | 3.5/5 | ⚠️ Mobil nav kritik |
| SEO/GEO/AEO | 3.5/5 | ⚠️ Altyapı eksik |
| Teknik (Production) | 4/10 | ⚠️ Tailwind CDN, placeholder'lar |
| Analitik & Büyüme | 1/10 | ❌ Sıfır tracking aktif |
| Wiki & Tutarlılık | 8/10 | ✅ Güncel, tutarsızlık var |

**Toplam bulgu:** 73
- **KRİTİK (yayın bloker):** 3
- **YÜKSEK (1-2 hafta içinde çözülmeli):** 18
- **ORTA:** 28
- **DÜŞÜK:** 24

---

## 2. KRİTİK Bulgular (Yayına Engel)

### 🚨 K1: index.html formunda KVKK checkbox YOK
**Kaynak:** regulator audit
**Sorun:** Ana sayfadaki hero/alt iletişim formu (satır 528-555) isim + telefon alıyor ama **açık rıza checkbox'ı yok**, sadece bilgilendirme metni. KVKK md. 5/1 ihlali. İdari para cezası riski.
**Kanıt:** `iletisim.html` ve `sac-analizi.html`'de doğru mekanizma var, kopyalanmamış.
**Çözüm:** iletisim.html'deki checkbox kalıbını index.html formuna uygula (30 dk iş).

### 🚨 K2: "Dr. [İsim Soyisim]" placeholder yayında
**Kaynak:** regulator + içerik + SEO audit (3 ayrı role tespit)
**Sorun:** `index.html` ve `altinsoy.html`'de placeholder görünür durumda. Ruhsatsız unvan yanlış kullanımı riski + E-E-A-T sıfır + marka güven kaybı.
**Çözüm:** Kullanıcıdan gerçek doktor bilgileri alınmalı (isim, unvan, credential, fotoğraf). Bu aynı zamanda **Sprint 1'in bekleyen görevi.**

### 🚨 K3: `altinsoy.html` eski tasarım aktif
**Kaynak:** içerik + marka audit
**Sorun:** Reddedilen "lüks poetik" yön (`altinsoy.html` — "Görünmezlik Sanatı") hâlâ yayında. Yeni "otoriter şeffaflık" yönüyle (`index.html`) çelişiyor. 1.258 satır, 13 dead link, 8 rakamsal veri referansı.
**Çözüm:** Dosyayı sil veya `<meta name="robots" content="noindex">` ekle + `index.html`'e 301.

---

## 3. YÜKSEK Öncelikli (18 adet)

### SEO / Altyapı
1. **sitemap.xml + robots.txt yok** — Google crawl'ı etkili değil
2. **Favicon yok** — marka tanımlanmayı etkiliyor, "unverified" görünüm
3. **15/18 sayfada OpenGraph eksik** — sosyal paylaşım preview kötü
4. **og:image hiçbir sayfada yok** — paylaşımlarda görsel boş
5. **Twitter Card 18/18 sayfada yok**
6. **13/18 sayfada title 60 karakter sınırını aşıyor** (en kötü: DHI ~80 char)
7. **Physician schema'da placeholder** (Dr. [İsim] yerine gerçek data)

### Tıbbi Tutarlılık
8. **DHI sayfasında %85-95 greft tutma yok** (FUE, Sapphire'de var — parite eksik)
9. **"10.000+ operasyon" sadece index'te** — 16 sayfada yok (marka güveni parçalı)
10. **"42 ülke", "4.9/5", "15 yıl" yayılımı tutarsız**

### Tasarım / UX
11. **Mobil navigasyon YOK** (18/18 sayfada) — `hidden md:flex` ile masaüstü nav gizleniyor ama hamburger açılmıyor
12. **WhatsApp floating button sadece index.html'de** (diğer 17 sayfada yok)
13. **Kontrast sorunu** — `text-[10px]` ve `text-[11px]` trust bar/footer/fine print'te WCAG AA altı

### Regülasyon / Hasta
14. **Footer'larda "tıbbi tavsiye yerine geçmez" disclaimer eksik** (fiyat, iletisim, index)
15. **"[Klinik Adresi]" placeholder** gizlilik ve kvkk sayfalarında

### Teknik
16. **Tailwind CDN kullanılıyor** (cdn.tailwindcss.com) — 19 sayfada, production'da yavaş, console warning
17. **GTM/GA4 placeholder** — sıfır tracking aktif, yayına çıksa veri toplanmaz
18. **Türkçe karakter bug'ı** — FUE/DHI/Sapphire title + H1'de "Sac", "Yapilir" (tutarsız encoding)

---

## 4. ORTA Öncelikli (28 madde özeti)

- 6 sayfada dead link (`href="#"`) — index.html 5, sac-analizi.html 1
- AEO "Kısa cevap" kutusu sadece 3/18 sayfada (fiyat, fue-vs-dhi, uygun-degil)
- oncesi-sonrasi + 3 vaka sayfasında hiç `<img>` yok (placeholder div'lerle duruyor)
- Footer copyright yazımı tutarsız: "Altinsoy" vs "Altınsoy"
- Nav item sayısı: index 6, alt sayfalar 4 — tutarsız
- Breadcrumb sadece 2/18 sayfada
- Section padding tutarsız: py-16/20/24/32 karışık
- `iletisim.html` formunda 5+ alan (SKILL kuralı: max 3 ideal)
- Sakal (10-12 ay) ve kaş (8-12 ay) vaka "neden farklı?" açıklaması yok
- Hasta yolculuğu Faz 1 (İnkâr/Farkındalık) içeriği sitede yok
- Sosyal medya linkleri footer'da yok (Instagram, YouTube vs)
- 404 sayfası yok
- 18 eksik `loading="lazy"` (görseller için)
- `rel="noopener noreferrer"` external link'lerde eksik
- CSP header yok
- PWA manifest yok
- Microsoft Clarity / heatmap yok
- A/B test altyapısı yok
- GTM dataLayer event'leri tanımlı değil
- Meta Pixel yok
- Form backend yok (sadece client-side success state)
- Campaign landing page'ler yok
- llms.txt yok (AI bot direktifleri)
- Instagram feed embed yok
- Video testimonial altyapısı yok
- Wiki index.md sayfa sayımı hatalı (4 yerine 17)
- Blog yazısı orphan (index.md'de listelenmemiş)
- Font preload yok

---

## 5. DÜŞÜK Öncelikli (24 madde özeti)

- Brand naming tutarsızlığı ("Saç Ekim Merkezi" vs "Hair Clinic")
- CTA buton varyantı çokluğu (cta-premium vs standart)
- İkon fill state tutarsız
- Trust bar stil farkı sayfalar arası
- Logo `<div>` kullanılmış (link değil — clickable ama semantic değil)
- Apple-touch-icon yok
- TR/EN dil seçici dead link (EN versiyonu yok)
- vs.

---

## 6. Cross-Sayfa Tutarsızlıklar (Kritik tablo)

| Değer | Tutarlı? | Sorun |
|-------|----------|-------|
| Greft tutma %85-95 | ❌ | DHI sayfasında yok |
| Şok dökülme 2-4 hafta | ✅ | Tüm ilgili sayfalarda tutarlı |
| 12-18 ay nihai sonuç | ✅ | 10 sayfada tutarlı |
| FUE 4-6 saat | ✅ | Tutarlı |
| DHI 5-7 saat | ✅ | Tutarlı |
| 7-10 gün iyileşme | ✅ | Tutarlı |
| Fiyat aralığı €2.500-5.000 | ✅ | Fiyat sayfalarında tutarlı |
| Telefon +90 553 978 42 42 | ✅ | Her sayfada aynı |
| E-posta info@altinsoy.com | ✅ | Tutarlı |
| 15 yıl deneyim | ⚠️ | 5 sayfada var, 13 sayfada yok |
| 10.000+ operasyon | ⚠️ | Sadece index'te |
| 42 ülke | ⚠️ | Sadece index'te |
| 4.9/5 rating | ⚠️ | Sadece index'te |

---

## 7. Yasak Kelime Tarama Sonucu

**TÜM SAYFALAR TEMİZ** ✅
- "indirim", "kampanya", "fırsat", "özel teklif", "avantaj", "tasarruf": **0 eşleşme**
- "garantili", "%100", "en iyi", "rakipsiz": **0 eşleşme**
- "ağrısız", "acısız", "hiç iz", "devrimsel", "kesilmeden": **0 eşleşme**
- Rakip klinik adı: **0 eşleşme**
- Ünlü kişi ismi: **0 eşleşme**

Bu regulator disiplininin büyük başarısı — üretim süresince bu kelimelerden kaçınıldı.

---

## 8. Olumlu Tespit Özeti (Ne İyi Çalışıyor)

1. **Tıbbi kırmızı çizgiler:** 7 kırmızı çizginin hiçbiri ihlal edilmemiş. "Ağrısız yanlıştır", "devrimsel değildir" gibi anti-iddia dili markanın farklılaştırıcısı.
2. **Tutarlı zaman çizelgeleri:** Şok dökülme, iyileşme, nihai sonuç süreleri tüm sayfalarda aynı.
3. **Fiyat şeffaflığı:** Rakiplerin %90'ı gizli, bizde paket bazlı aralık + "yazılı teklif" dili tutarlı.
4. **Farklılaşma başarısı:** `uygun-degil.html` (etik şeffaflık), `fue-vs-dhi.html` (fair karşılaştırma), `sac-ekimi-sapphire.html` (dramatik fark yok dürüstlüğü) — sektörde nadir kalitede.
5. **Schema altyapısı:** 15/18 sayfada FAQPage, doğru MedicalClinic/MedicalProcedure/MedicalWebPage tipleri.
6. **Jenerik marketing speak:** Çok az — "en iyi hizmet", "yenilikçi çözümler" vb. tuzaklarına düşülmemiş.
7. **Strateji mimarisi:** Faz karışıklığı yok, satış baskısı yanlış fazda değil.

### Portföyden 4 yıldız sayfa (Awwwards yakın kalite)
- `uygun-degil.html`
- `fue-vs-dhi.html`
- `sac-ekimi-sapphire.html`
- `fiyat.html`

---

## 9. Rol Bazlı Özet Tablosu

| Rol | Genel Skor | Ana Bulgu | Durum |
|-----|------------|-----------|-------|
| trichologist | 4.73/5 | DHI greft tutma parite eksik, sakal/kaş "neden farklı" yok | KAPIDA GEÇTİ |
| patient-psych | 4.60/5 | Faz 1 ve Faz 5 content eksik | YÜKSEK |
| health-regulator | 3.5/5 | index form KVKK eksik, placeholder'lar | REVİZYON GEREKLİ (BLOCK) |
| agency-director | 3.1/5 | altinsoy.html eski yön, placeholder'lar | REVİZYON GEREKLİ |
| strategy-planner | 4.2/5 | 13/24 sayfa tamam, /doktor/ kritik | İLERLEME YÜKSEK |
| copywriter | 4.0/5 | Türkçe karakter bug, filler yok, kalite yüksek | ÖRNEK SEVİYE |
| ux-architect | 3.0/5 | Mobil nav, WhatsApp float tutarsızlığı | KRİTİK FIX |
| ui-designer | 4.0/5 | Design system tutarlı, ufak sapmalar | İYİ |
| seo-geo-specialist | 3.5/5 | Sitemap, robots, OG eksik | ALTYAPI EKSİK |
| tech-advisor | 4/10 | Tailwind CDN, placeholder'lar, favicon yok | PRODUCTION EKSİK |
| software-engineer | 8/10 | Wizard'lar çalışıyor, JS bug yok | İYİ |
| web-developer | 2/10 | Altyapı eksik, tracking yok | MAJOR WORK |
| researcher | — | 15+ özellik gap, 7 farklılaşmadan 3 tam | İLERLEME SÜRÜYOR |
| performance-analyst | 1/10 | Sıfır tracking, sıfır veri | KRİTİK EKSİK |
| social-strategist | 2/10 | OG eksik, sosyal link yok, feed yok | EKSİK |
| wiki-ops | 8/10 | Güncel, ufak sayım hatası, 1 orphan | İYİ |
| account-lead | — | 13/24 sayfa (%54), Sprint 4 bekliyor | BEKLİYOR |

---

## 10. Bilinen Eksikler (Audit öncesinden)

Bu maddeler zaten biliniyordu — audit "yeni keşif" değil, doğrulama:

- [ ] Doktor profili sayfası (bilgi bekleniyor)
- [ ] [Klinik Adresi] placeholder
- [ ] sitemap.xml + robots.txt yok
- [ ] GTM/GA4 container ID placeholder
- [ ] Harita embed placeholder (iletisim.html)
- [ ] Blog hub yok
- [ ] /en/ versiyonu yok
- [ ] Hasta yorumları sayfası yok
- [ ] İyileşme merkezi sayfası yok
- [ ] Favicon yok

---

## 11. Önerilen Aksiyon Planı (Kullanıcı Kararı İçin)

### 🚨 Dalga 0: KRİTİK (yayın öncesi — 1-2 gün)
1. index.html formuna KVKK checkbox ekle (K1)
2. `altinsoy.html` dosyasını kaldır veya noindex (K3)
3. Doktor bilgilerini kullanıcıdan topla → placeholder'ları değiştir (K2)
4. Mobil navigasyon (hamburger) ekle
5. WhatsApp float'ı tüm sayfalara kopyala

### ⚡ Dalga 1: Quick Win (3-5 gün)
6. sitemap.xml + robots.txt üret
7. Favicon + apple-touch-icon ekle
8. OpenGraph tag'leri tüm sayfalara (og:image için tek sefer görsel üretimi)
9. Twitter Card meta'ları
10. Title tag'lerini 60 karakter altına indir (13 sayfa)
11. Türkçe karakter bug'ını fix (3 teknik sayfa)
12. Dead link'leri fix (index.html)
13. Footer'lara "tıbbi tavsiye değildir" disclaimer
14. DHI sayfasına %85-95 greft tutma ekle
15. Tüm sayfa footer'larına brand signal barı (15y · 10K+ op · 42 ülke · 4.9/5)

### 📊 Dalga 2: Ölçüm + Production (1 hafta)
16. GA4 + GTM gerçek ID
17. Microsoft Clarity kurulum
18. GTM dataLayer event'leri tanımla (form submit, WhatsApp click, phone)
19. Tailwind production build (CDN'den vazgeç)
20. Image lazy loading + alt text

### 🏗️ Dalga 3: Yapısal (2-4 hafta)
21. /doktor/ sayfası
22. Blog hub + ilk 5 yazı
23. /en/ İngilizce mirror
24. /hasta-yorumlari/ sayfası
25. /iyilesme-merkezi/ sayfası
26. Form backend (Formspree veya custom)
27. 404 custom sayfası

### 🎯 Dalga 4: Farklılaşma Devamı (4-8 hafta)
28. "Hasta Seçiciliği" konumlandırma kampanyası (fark #2)
29. Operasyon Günü PWA (fark #3)
30. Derin vaka çalışması standardı geliştirme (fark #4)

---

## 12. Kritik Soru — Kullanıcıya

**Önce hangisini yapalım?**

**Seçenek A (Tavsiye):** Dalga 0'ı hemen bitir — 4-5 saat iş. Site temel yayın-ready hale gelir. Doktor bilgisini bekletmekten kaçınırsak "Kurucu ekip" gibi genel bir profil yazılabilir (geçici).

**Seçenek B:** Dalga 0 + Dalga 1 birlikte — 1-2 gün. Daha solid yayın. SEO altyapısı + sosyal paylaşım hazır.

**Seçenek C:** Dalga 2'ye de geçerek ölçüm kur — yayından önce tracking hazır, veri toplanır.

---

## 13. Denetim Yöntemi Notu

- 8 paralel agent dispatch edildi (5 başarılı, 3 rate-limit)
- Rate limit'e takılan 3 audit (teknik, analitik, wiki-tutarlılık) manuel yapıldı (grep + inspect)
- Toplam süre: ~50 dakika (paralel + manuel)
- Toplam token: ~500K (agent'lar + manuel)
- Tüm bulgular 8 ayrı rapor dosyasında detaylı + bu konsolide rapor

---

## 14. Sonraki Adım (Komutan Notu)

Kullanıcı karar verdi: **Önce rapor, sonra düzeltme kararı.** Bu rapor tamamlandı. Kullanıcı artık:
1. Dalga 0/1/2/3 arasında seçim yapabilir
2. Belirli kritik maddeleri öncelik listesinden çıkarabilir (örn. doktor bilgisi beklenirken "genel ekip" yazısı yeterli olabilir)
3. Paralel düzeltme için agent dispatch isteyebilir

Beklemede: **Kullanıcı kararı.**

---

_Rapor: komutan orkestrasyonu, 17 uzman rolün perspektifi, 8 alt audit dosyasının sentezi. Detaylar için `audit-*.md` dosyalarına bakınız._
