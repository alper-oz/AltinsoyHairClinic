---
title: "Altınsoy Hair Clinic — Site Haritası & Eksik Sayfa Kritik Analizi"
type: strategy
tags: [sitemap, ux, seo, strategy, information-architecture]
created: 2026-04-14
updated: 2026-04-14
sources: [preview/index.html, wiki/strategy/tasarim-revizyonu.md, skills/seo-geo-specialist, skills/ux-architect, skills/patient-psychologist]
status: draft
---

# Altınsoy Hair Clinic — Site Haritası

## 1. Mevcut Durum (Sadece Ana Sayfa Var)

```
altinsoy.com/
  └── index.html (Ana Sayfa — tek sayfa)
        ├── #hero          — Hero section + CTA
        ├── #uzmanlık      — Felsefe bölümü
        ├── #teknikler     — FUE / DHI / Sapphire kartları
        ├── #cerrah        — Doktor profili
        ├── #sonuclar      — Before/after galeri (3 vaka)
        ├── #sss           — 8 SSS
        └── #iletisim      — Konsültasyon formu
```

**Footer'daki linkler → hepsi `href="#"` (hiçbiri çalışmıyor):**
- Saç Ekimi, Sakal Ekimi, Kaş Ekimi → sayfa yok
- Gizlilik Politikası, KVKK Aydınlatma, Çerez Politikası → sayfa yok
- EN dil seçeneği → sayfa yok

---

## 2. Hedef Site Haritası

### Rol Perspektifleri

**seo-geo-specialist:** Hub & spoke yapısı — ana sayfa hub, teknik sayfalar spoke. Her spoke kendi keyword kümesini hedefler. Blog TOFU trafik çeker, teknik sayfalar MOFU dönüştürür.

**ux-architect:** Hasta 3 tıkta istediği bilgiye ulaşmalı. Mobile-first. Her sayfa tek bir iş yapar.

**patient-psychologist:** Faz 1-5 hastaları farklı sayfalardan giriyor. Her fazın giriş noktası net olmalı.

---

### Tam Site Yapısı

```
altinsoy.com/
│
├── /                                    ← ANA SAYFA (Hub)
│   Keyword: "saç ekimi istanbul", "saç ekim merkezi"
│   Faz: Tüm fazlar — ilk izlenim, güven barı, yönlendirme
│   Durum: ✅ MEVCUT (preview/index.html)
│
├── /sac-ekimi/                          ← SAÇ EKİMİ HUB
│   Keyword: "saç ekimi", "saç ekimi nedir"
│   Faz: Faz 2 (araştırma)
│   İçerik: Genel bilgi, tekniklere yönlendirme, süreç özeti
│   Durum: ❌ EKSİK — KRİTİK
│   │
│   ├── /fue-sac-ekimi/                  ← FUE Teknik Sayfası
│   │   Keyword: "fue saç ekimi", "fue nedir"
│   │   Faz: Faz 2 (araştırma) + Faz 3 (karşılaştırma)
│   │   İçerik: Prosedür detay, avantaj/dezavantaj, süre, iyileşme, SSS
│   │   Durum: ❌ EKSİK — KRİTİK
│   │
│   ├── /dhi-sac-ekimi/                  ← DHI Teknik Sayfası
│   │   Keyword: "dhi saç ekimi", "dhi choi kalemi"
│   │   Durum: ❌ EKSİK — KRİTİK
│   │
│   ├── /sapphire-fue/                   ← Sapphire FUE Sayfası
│   │   Keyword: "sapphire fue", "safir saç ekimi"
│   │   Durum: ❌ EKSİK — YÜKSEK
│   │
│   └── /fue-vs-dhi/                     ← Karşılaştırma Sayfası
│       Keyword: "fue vs dhi", "fue mi dhi mi"
│       Faz: Faz 3 (karşılaştırma — yüksek karar niyeti)
│       Durum: ❌ EKSİK — YÜKSEK
│
├── /sakal-ekimi/                        ← SAKAL EKİMİ
│   Keyword: "sakal ekimi", "sakal ekimi istanbul"
│   Durum: ❌ EKSİK — ORTA
│
├── /kas-ekimi/                          ← KAŞ EKİMİ
│   Keyword: "kaş ekimi", "kaş ekimi istanbul"
│   Durum: ❌ EKSİK — ORTA
│
├── /oncesi-sonrasi/                     ← BEFORE/AFTER GALERİ
│   Keyword: "saç ekimi öncesi sonrası", "saç ekimi sonuçları"
│   Faz: Faz 3 (karşılaştırma — görsel kanıt)
│   İçerik: Filtrelenebilir galeri (teknik, greft, cinsiyet, ay bazlı)
│   Durum: ❌ EKSİK — KRİTİK (ana sayfadaki 3 vaka yetersiz)
│
├── /fiyat/                              ← FİYAT SAYFASI
│   Keyword: "saç ekimi fiyat", "saç ekimi fiyat 2026"
│   Faz: Faz 3-4 (yüksek karar niyeti)
│   İçerik: Paket bilgileri, neyin dahil olduğu, ödeme seçenekleri
│   Durum: ❌ EKSİK — KRİTİK
│   ⚠️ health-regulator: "İndirim" ifadesi YASAK, dikkatli dil gerekli
│
├── /doktor/                             ← DOKTOR PROFİLİ
│   Keyword: "altınsoy doktor", "saç ekimi doktor istanbul"
│   Faz: Faz 3 (güven — E-E-A-T sinyali)
│   İçerik: Tam biyografi, eğitim, sertifikalar, yayınlar, deneyim
│   Durum: ❌ EKSİK — KRİTİK (ana sayfadaki özet yetersiz)
│
├── /hasta-yorumlari/                    ← HASTA YORUMLARI
│   Keyword: "altınsoy yorumlar", "saç ekimi yorumları"
│   Faz: Faz 3 (sosyal kanıt)
│   İçerik: Video testimonial'lar, Google Reviews embed, yazılı yorumlar
│   Durum: ❌ EKSİK — YÜKSEK
│   ⚠️ health-regulator: Hasta onamı ZORUNLU
│
├── /iyilesme-merkezi/                   ← İYİLEŞME MERKEZİ
│   Keyword: "saç ekimi sonrası bakım", "saç ekimi iyileşme süreci"
│   Faz: Faz 5 (post-op)
│   İçerik: Timeline, bakım kuralları, şok dökülme rehberi, SSS
│   Kaynak: Stitch recovery hub dokümanı
│   Durum: ❌ EKSİK — YÜKSEK
│
├── /hakkimizda/                         ← HAKKIMIZDA
│   Keyword: "altınsoy saç ekim merkezi", "altınsoy klinik"
│   Faz: Faz 3 (güven)
│   İçerik: Klinik hikayesi, ekip, değerler, klinik fotoğrafları
│   Durum: ❌ EKSİK — ORTA
│
├── /iletisim/                           ← İLETİŞİM SAYFASI
│   Keyword: "altınsoy iletişim", "saç ekimi randevu"
│   Faz: Faz 4 (karar)
│   İçerik: Harita, adres, telefon, WhatsApp, detaylı form
│   Durum: ❌ EKSİK — YÜKSEK (ana sayfadaki form tek form)
│
├── /blog/                               ← BLOG HUB
│   Keyword: long-tail TOFU keywords
│   Faz: Faz 1-2 (farkındalık + araştırma)
│   Durum: ❌ EKSİK — KRİTİK (organik trafik kaynağı)
│   │
│   ├── /sac-ekimi-sonrasi-sok-dokulme/  ← İlk blog yazısı
│   │   Durum: ✅ MEVCUT (wiki/content/blog/ içinde draft)
│   │
│   ├── /sac-dokulme-nedenleri/          ← Planlanan
│   ├── /sac-ekimi-sonrasi-bakim/        ← Planlanan
│   ├── /fue-vs-dhi-karsilastirma/       ← Planlanan
│   └── /sac-ekimi-kac-greft-gerekli/    ← Planlanan
│
├── /en/                                 ← İNGİLİZCE VERSİYON
│   Keyword: "hair transplant turkey", "hair transplant istanbul"
│   Faz: Tüm (uluslararası hasta)
│   Durum: ❌ EKSİK — KRİTİK (gelirin büyük kısmı uluslararası)
│   │
│   ├── /en/hair-transplant/
│   ├── /en/fue-hair-transplant/
│   ├── /en/before-after/
│   ├── /en/pricing/
│   ├── /en/doctor/
│   └── /en/contact/
│
├── /gizlilik-politikasi/               ← GİZLİLİK POLİTİKASI
│   Durum: ❌ EKSİK — ZORUNLU (KVKK)
│
├── /kvkk-aydinlatma/                   ← KVKK AYDINLATMA METNİ
│   Durum: ❌ EKSİK — ZORUNLU (yasal)
│
└── /cerez-politikasi/                  ← ÇEREZ POLİTİKASI
    Durum: ❌ EKSİK — ZORUNLU (KVKK/GDPR)
```

---

## 3. Kritiklik Matrisi

### KRİTİK (Sitesiz yayına çıkamaz)

| Sayfa | Neden Kritik | Hedefleyen Faz |
|-------|-------------|----------------|
| `/sac-ekimi/` | Ana hub — tüm teknikler buradan dallanır, SEO temel taşı | Faz 2 |
| `/fue-sac-ekimi/` | En çok aranan teknik, en yüksek hacimli keyword | Faz 2-3 |
| `/dhi-sac-ekimi/` | İkinci en çok aranan teknik | Faz 2-3 |
| `/oncesi-sonrasi/` | Hasta kararının #1 etkeni — görsel kanıt | Faz 3 |
| `/fiyat/` | En yüksek karar niyetli keyword, bounce killer | Faz 3-4 |
| `/doktor/` | E-E-A-T sinyali, SEO + GEO için zorunlu | Faz 3 |
| `/blog/` | TOFU organik trafik kaynağı, GEO atıf noktası | Faz 1-2 |
| `/en/` | Uluslararası hasta — gelirin büyük kısmı | Tüm |
| `/gizlilik-politikasi/` | KVKK yasal zorunluluk | — |
| `/kvkk-aydinlatma/` | KVKK yasal zorunluluk | — |
| `/cerez-politikasi/` | KVKK/GDPR yasal zorunluluk | — |

### YÜKSEK (İlk 1 ay içinde olmalı)

| Sayfa | Neden | Faz |
|-------|-------|-----|
| `/sapphire-fue/` | Üçüncü teknik, arama hacmi artıyor | Faz 2-3 |
| `/fue-vs-dhi/` | Karşılaştırma keyword'ü — yüksek dönüşüm | Faz 3 |
| `/hasta-yorumlari/` | Sosyal kanıt sayfası — güven inşası | Faz 3 |
| `/iyilesme-merkezi/` | Post-op hasta desteği — sadakat | Faz 5 |
| `/iletisim/` | Ayrı sayfa — detaylı form + harita | Faz 4 |

### ORTA (İlk 3 ay içinde)

| Sayfa | Neden | Faz |
|-------|-------|-----|
| `/sakal-ekimi/` | Ek hizmet, ayrı keyword kümesi | Faz 2-3 |
| `/kas-ekimi/` | Ek hizmet, kadın kitle | Faz 2-3 |
| `/hakkimizda/` | Kurumsal güven | Faz 3 |

---

## 4. Hasta Journey → Sayfa Eşlemesi

**patient-psychologist perspektifi:**

```
FAZ 1 — "Saçım dökülüyor, ne yapmalıyım?"
  Giriş: /blog/sac-dokulme-nedenleri/
  Sonraki: /sac-ekimi/ (eğer ilgilenirse)
  CTA: "Daha fazla öğren" — satış yok

FAZ 2 — "Saç ekimi nasıl yapılıyor?"
  Giriş: /sac-ekimi/ → /fue-sac-ekimi/ veya /dhi-sac-ekimi/
  Sonraki: /oncesi-sonrasi/ (sonuçları gör)
  CTA: "Ücretsiz saç analizi"

FAZ 3 — "Hangi klinik, neden bu klinik?"
  Giriş: /oncesi-sonrasi/ → /doktor/ → /hasta-yorumlari/ → /fiyat/
  Sonraki: /iletisim/ veya WhatsApp
  CTA: "Online konsültasyon randevusu"

FAZ 4 — "Randevu alıyorum"
  Giriş: /iletisim/ veya /fiyat/
  Sonraki: WhatsApp onay → operasyon planlama
  CTA: "WhatsApp'tan yaz" + detaylı form

FAZ 5 — "Operasyon oldum, şimdi ne yapacağım?"
  Giriş: /iyilesme-merkezi/
  Sonraki: /blog/sac-ekimi-sonrasi-sok-dokulme/
  CTA: "Sonucunuzu paylaşın" (referans toplama)
```

---

## 5. Sayfa Öncelik Sırası (Geliştirme Yol Haritası)

### Sprint 1 — Yasal + Temel (Hafta 1-2)
1. `/gizlilik-politikasi/`
2. `/kvkk-aydinlatma/`
3. `/cerez-politikasi/`
4. `/doktor/` (tam profil)

### Sprint 2 — Teknik Sayfalar (Hafta 3-4)
5. `/sac-ekimi/` (hub)
6. `/fue-sac-ekimi/`
7. `/dhi-sac-ekimi/`
8. `/sapphire-fue/`

### Sprint 3 — Dönüşüm Sayfaları (Hafta 5-6)
9. `/oncesi-sonrasi/` (galeri)
10. `/fiyat/`
11. `/iletisim/` (ayrı sayfa)
12. `/fue-vs-dhi/`

### Sprint 4 — İçerik + Uluslararası (Hafta 7-10)
13. `/blog/` (hub + ilk 5 yazı)
14. `/en/` (İngilizce mirror — en azından ana sayfa + teknikler + fiyat)
15. `/hasta-yorumlari/`
16. `/iyilesme-merkezi/`

### Sprint 5 — Ek Hizmetler (Hafta 11-12)
17. `/sakal-ekimi/`
18. `/kas-ekimi/`
19. `/hakkimizda/`
20. `/prp-tedavisi/` (trichologist önerisi — kombine tedavi)

---

## 6. Roller Bazında Yapılacaklar

| Rol | Ne Üretecek |
|-----|-------------|
| **strategy-planner** | Bu doküman (site haritası + önceliklendirme) |
| **seo-geo-specialist** | Her sayfa için keyword brief + meta + schema + URL |
| **ux-architect** | Her sayfa wireframe + mobil adaptasyon |
| **ui-designer** | Component library + sayfa visual spec |
| **copywriter** | Her sayfa içeriği (SEO brief'e uygun) |
| **trichologist** | Teknik sayfalar + blog tıbbi doğrulama |
| **health-regulator** | Yasal sayfalar + fiyat sayfası dili + hasta onamları |
| **patient-psychologist** | Faz-sayfa uyumu + CTA tonu + journey doğrulama |
| **agency-director** | Her sprint sonunda kalite review |
| **web-developer** | Platform build + deploy |
| **performance-analyst** | Tracking planı — her sayfa conversion noktası |

---

_Bu doküman [[komutan]] orkestrasiyonuyla oluşturulmuştur. Devreye giren roller: wiki-ops, seo-geo-specialist, ux-architect, patient-psychologist, strategy-planner, trichologist (doğrulama bekliyor), agency-director (review bekliyor)._
