---
title: Analitik & Büyüme Audit (Researcher + Performance-Analyst + Social-Strategist)
type: output
tags: [audit, analytics, performance, social]
created: 2026-04-14
---

# Analitik, Performans & Sosyal Audit Raporu

## Özet

- **Ölçüm hazırlığı:** 1/10 — Hiçbir tracking aktif değil
- **Sosyal paylaşım optimizasyonu:** 2/10 — 3/18 sayfada OG var, og:image yok
- **Rakiplerle gap:** 15+ özellik (AI analiz, video konsültasyon, PWA, canlı chat, vs)
- **Conversion noktaları:** Var ama tracking yok

---

## 1. Ölçüm Altyapısı Durumu

| Araç | Durum | Not |
|------|-------|-----|
| **GA4** | ❌ Placeholder | `GTM-XXXXXX` yorum satırı, measurement ID yok |
| **GTM** | ❌ Placeholder | index.html satır ~534'te yorum satırı |
| **Meta Pixel** | ❌ Yok | — |
| **Google Ads Conversion** | ❌ Yok | — |
| **Microsoft Clarity** | ❌ Yok | Ücretsiz, hemen eklenebilir |
| **Hotjar** | ❌ Yok | — |
| **Session recording** | ❌ Yok | — |
| **CrazyEgg / heatmap** | ❌ Yok | — |

**Sonuç:** Site canlı olsa bile sıfır veri toplar. Hemen GA4 + GTM + Clarity en azından kurulmalı.

---

## 2. Conversion Noktaları Matrisi

| Sayfa | Form | WhatsApp | Phone | Email | Chat Widget | Total |
|-------|------|----------|-------|-------|-------------|-------|
| `index.html` | 1 (hero CTA'ya scroll) | 1 (float + footer) | 1 (footer) | 1 (footer) | 1 (chatbot) | 5 |
| `sac-analizi.html` | 1 (3-adım wizard) | 1 (success state) | 0 | 0 | 0 | 2 |
| `sac-ekimi.html` | 1 (CTA section) | 1 | 0 | 0 | 0 | 2 |
| `sac-ekimi-fue.html` | 1 | 1 | 0 | 0 | 0 | 2 |
| `sac-ekimi-dhi.html` | 1 | 1 | 0 | 0 | 0 | 2 |
| `sac-ekimi-sapphire.html` | 1 | 1 | 0 | 0 | 0 | 2 |
| `fue-vs-dhi.html` | 1 | 1 | 0 | 0 | 0 | 2 |
| `vaka-*` (3 sayfa) | 1 | 1 | 0 | 0 | 0 | 2 |
| `oncesi-sonrasi.html` | 1 | 1 | 0 | 0 | 0 | 2 |
| `fiyat.html` | 1 | 1 | 0 | 0 | 0 | 2 |
| `iletisim.html` | 1 (detaylı) | 1 | 1 | 1 | 0 | 4 |
| `greft-hesaplama.html` | 1 (sonuç CTA) | 1 | 0 | 0 | 0 | 2 |
| `fiyat-hesaplama.html` | 1 (sonuç CTA) | 1 | 0 | 0 | 0 | 2 |
| `uygun-degil.html` | 1 | 1 | 0 | 0 | 0 | 2 |
| Yasal sayfalar (3) | 0 | 0 | 0 | 0 | 0 | 0 |

**Toplam conversion fırsatı:** 33 tıklama noktası (18 sayfa × ortalama 2)
**Tracked olan:** 0
**Kritik gap:** Yasal sayfalar dead-end — CTA yok.

---

## 3. GTM dataLayer Event Önerisi (Hiçbiri tanımlı değil)

**Minimum tanımlanması gerekenler:**

```javascript
// Form submissions
dataLayer.push({ event: 'form_submit', form_name: 'consultation', page: '/' });

// WhatsApp click
dataLayer.push({ event: 'whatsapp_click', source: 'float_button', page: pathname });

// Phone click
dataLayer.push({ event: 'phone_click', source: 'footer', page: pathname });

// Tool completion
dataLayer.push({ event: 'tool_complete', tool: 'greft-calculator', result_range: '2500-3500' });

// Scroll depth
dataLayer.push({ event: 'scroll', depth: '75%' });

// Chatbot interaction
dataLayer.push({ event: 'chatbot_open', page: pathname });
```

---

## 4. Sosyal Paylaşım Durumu

### OpenGraph tag'leri

| Sayfa | og:title | og:description | og:url | og:type | og:image |
|-------|----------|----------------|--------|---------|----------|
| `index.html` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `sac-ekimi.html` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `sac-analizi.html` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `sac-ekimi-fue.html` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `sac-ekimi-dhi.html` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `sac-ekimi-sapphire.html` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `fue-vs-dhi.html` | ❌ | ❌ | ❌ | ❌ | ❌ |
| Vaka sayfaları (3) | ❌ | ❌ | ❌ | ❌ | ❌ |
| `oncesi-sonrasi.html` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `fiyat.html` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `iletisim.html` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `greft-hesaplama.html` | ✅ | ✅ | ❌ | ✅ | ❌ |
| `fiyat-hesaplama.html` | ✅ | ✅ | ❌ | ✅ | ❌ |
| `uygun-degil.html` | ✅ | ✅ | ✅ | ✅ | ❌ |
| Yasal sayfalar (3) | ❌ | ❌ | ❌ | ❌ | ❌ |

**Sonuç:** 15/18 sayfada OG **YOK**. 3 sayfada kısmi var ama **og:image hiçbirinde yok.**

### Twitter Card

- 18/18 sayfada Twitter Card **YOK**

**Kritik:** WhatsApp'a link paylaşıldığında veya Instagram Story'ye linklendiğinde preview kötü görünecek. Sosyal kanallardan gelen trafik için bu büyük engel.

---

## 5. Sosyal Medya Bağlantıları

| Kontrol | Durum |
|---------|-------|
| Instagram profil linki | ❌ Yok |
| Facebook profil linki | ❌ Yok |
| YouTube kanal linki | ❌ Yok |
| TikTok linki | ❌ Yok |
| LinkedIn linki | ❌ Yok |
| Footer social icons | ❌ Yok |
| Share button (blog/vaka sayfalarında) | ❌ Yok |
| Instagram feed embed | ❌ Yok |

**Sonuç:** Sosyal medya ile site tamamen kopuk. İnstagram'dan gelen hasta site'de kaybolur, tekrar sosyala gitmek zor.

---

## 6. Rakiplerle Özellik Gap'i

Ozellik-kiyaslamasi dokümanından:

### Eksik (rakiplerde var)
- AI saç analizi (Hims, Elithair)
- 3D saç simülasyonu (Elithair, Harley St.)
- Video konsültasyon (Bosley, Elithair, Farjo)
- Hasta portal (Smile Hair, Harley St.)
- 24/7 canlı chat (Hims, Smile Hair) — biz chatbot mock var
- Çoklu dil 10+ (Elithair) — biz TR only
- Online randevu takvimi (Bosley, Cal.com)
- Subscription ilaç (Hims) — yasal risk, uygulanamaz
- Post-op takip chatbot (Farjo)
- Hasta topluluk forumu (Elithair)
- Real-time operasyon sayacı (Este Garanti)
- Video testimonial mega galeri (Smile Hair)

### Biz yapıp rakiplerde olmayan
- ✅ "Saç Ekimi Yapılmaz Kimler İçin" sayfası (etik şeffaflık)
- ✅ Detaylı fiyat şeffaflığı (€2.500-5.000 açık)
- ✅ Vaka çalışması detayı (süreç anlatımı)
- ✅ Greft hesaplayıcı (görsel Norwood ile)
- ✅ Fair FUE vs DHI karşılaştırması (bias yok)

---

## 7. A/B Test Fırsatları

Veri toplamadığımız için henüz test yapılamıyor ama hazırlık:

| Test Alanı | Varyant A | Varyant B | Potansiyel Etki |
|------------|-----------|-----------|-----------------|
| Hero headline | "Görünmezlik Sanatı" (poetik) | "10.000+ Operasyon, 15 Yıl" (veri) | +20% form submit |
| CTA text | "Ücretsiz Analiz" | "60 Saniyede Kişisel Plan" | +15% click |
| Form alan sayısı (sac-analizi) | 3-adım wizard | Tek form (3 alan) | Düşük friction vs. engagement |
| Fiyat gösterimi | Aralık (€2.500-5.000) | "Konsültasyon sonrası" | Şeffaflık vs. esneklik |
| Before/after slider | Yan yana | Slider (drag) | Interaktiflik |
| Trust bar pozisyonu | Hero altı | Form öncesi | Güven timing'i |

---

## 8. KPI Baseline (henüz veri yok)

Takip edilmesi gereken KPI'lar (tracking kurulunca):

### Birincil (para ile ilintili)
- Konsültasyon form submit (haftalık)
- WhatsApp chat başlatma
- Telefon click
- Email click
- Ücretsiz analiz tool tamamlama oranı

### İkincil (davranış)
- Bounce rate (sayfa bazlı)
- Time on page (teknik sayfalar)
- Scroll depth
- FAQ engagement
- Kalkülatör (greft/fiyat) tamamlama oranı
- Chatbot interaction rate

### Trafik kaynak analizi
- Organic search
- Direct
- Referral
- Sosyal medya
- Paid (gelecek)

---

## 9. Sosyal Medya → Site Flow

**Şu an:** Kopuk. Instagram bio linkinden nereye?

**Öneri:**
- Instagram bio → `/sac-analizi/` (düşük friction wizard)
- Instagram Story swipe-up → kampanya-spesifik LP (henüz yok)
- YouTube video açıklaması → ilgili teknik sayfa
- TikTok bio → `/greft-hesaplama/` (interactive hook)

**Eksik sayfalar (campaign landing pages):**
- `/kampanya/` genel LP
- `/instagram/` sosyal özel LP
- `/youtube/` video destekli LP

---

## 10. Öncelik Listesi

### P0 — Yayın öncesi ZORUNLU
1. **GA4 + GTM kur**, gerçek ID ile — sıfır veri toplanıyor
2. **OG tag'ler + og:image** tüm sayfalara — sosyal paylaşım kritik
3. **GTM dataLayer event'leri tanımla** — form submit, WhatsApp click, phone click minimum
4. **Sosyal medya linkleri footer'a** ekle

### P1 — İlk hafta
5. **Microsoft Clarity** kur (ücretsiz, hemen) — heatmap + session recording
6. **Meta Pixel** — gelecek reklam için
7. **Instagram feed embed** (ana sayfa)
8. **Google Business Profile** optimize et

### P2 — İlk ay
9. A/B test altyapısı (GA4 experiments veya Optimizely)
10. Heatmap analizi ve ilk optimizasyonlar
11. Video testimonial altyapısı
12. Campaign landing page'ler (kampanya, instagram)

---

HANDOFF: `web-developer` (tracking kurulum) + `social-strategist` (OG image üretimi) → `performance-analyst` baseline kurulum → `agency-director`.
