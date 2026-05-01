---
title: Tasarım Revizyonu — 7 Sorun, 7 Çözüm
type: strategy
tags: [tasarim, revizyon, strateji, ux, ui]
created: 2026-04-14
updated: 2026-04-14
sources: [raw/references/site-tasarim/stitch_luxury_hair_clinic_design]
status: draft
---

# Tasarım Revizyonu: Mevcut Sorunlar ve Çözümler

Kaynak: Mevcut "Clinical Atelier" tasarım çalışması (6 sayfa + Onyx & Gilt design system)

---

## Sorun 1: Lüks Otel Sitesi, Klinik Sitesi Değil

### Problem
→ [[patient-psychologist]] perspektifi:

Koyu tema + altın = "burası pahalı" algısı. Saç ekimi hastası araştırma fazında **güven** arıyor, **lüks** değil. Mevcut tasarım hastanın şu sorusuna cevap vermiyor: "Bu klinik beni iyi edecek mi?" Bunun yerine "Bu klinik pahalı mı?" sorusunu tetikliyor.

Hasta psikolojisi verileri:
- Faz 2-3 hastası klinik seçerken 1. kriter: **doktor yetkinliği** (%78)
- 2. kriter: **gerçek hasta sonuçları** (%71)
- 3. kriter: **şeffaflık** (%64)
- "Lüks görünüm" karar kriterlerinde **son sıralarda** (%12)

### Çözüm
→ [[agency-director]] + [[strategy-planner]] yönlendirmesi:

**Yeni yön: "Güvenilir Uzman" — lüks değil, otoritatif.**

```
ESKİ: "Biz lüksüz, özeliz, farklıyız"
YENİ: "Biz kanıtlarımızla konuşuruz, sonuçlarımız ortada"
```

| Lüks Otel Yaklaşımı (Mevcut) | Güvenilir Uzman Yaklaşımı (Yeni) |
|-------------------------------|----------------------------------|
| Koyu + altın = pahalı hissi | Temiz + sıcak = profesyonel hissi |
| Poetik headline "Görünmezlik Sanatı" | Somut headline "12 Ayda Doğal Sonuç" |
| Görsel ağırlıklı, metin az | Veri + görsel dengesi |
| Galeri tarzı layout | Bilgi mimarisi odaklı layout |
| Marka ego'su ön planda | Hasta sonucu ön planda |

**Korunacak:** Editorial kalite hissi, tipografi disiplini, detay hassasiyeti. Bunlar atılmamalı — sadece "lüks" yerine "uzmanlık" mesajına yönlendirilmeli.

---

## Sorun 2: İçerik Yok, Sadece Görsel

### Problem
→ [[copywriter]] + [[trichologist]] perspektifi:

"Görünmezlik Sanatı" poetik ama hasta bunu okuduğunda **ne yapıldığını anlamıyor**. Mevcut hero bölümünde:
- Teknik bilgi yok (FUE nedir? DHI nedir?)
- Prosedür süresi yok
- Greft sayısı/fiyat aralığı yok
- Doktor credential detayı yok
- Somut sonuç verisi yok

### Çözüm

Her bölüm için **bilgi katmanı** tanımla:

### Ana Sayfa — Her Bölümün İçerik Gereksinimi
```
HERO:
  ESKİ:  "Görünmezlik Sanatı" (poetik, belirsiz)
  YENİ:  "[Somut sayı] Başarılı Operasyon. Doğal Sonuç." 
         + Alt başlık: teknik + güven sinyali
         + CTA: "Ücretsiz Saç Analizi Yaptır"

GÜVEN BARI:
  ESKİ:  Yok
  YENİ:  [X yıl] | [X operasyon] | [X ülke] | [X% memnuniyet]
         + Sertifika logoları (ISHRS, JCI)

TEKNİKLER:
  ESKİ:  Sadece görsel kartlar
  YENİ:  Her kart: Teknik adı + 1 cümle açıklama + süre + iyileşme
         + "Detaylı Bilgi" linki (teknik landing page'e)

DOKTOR:
  ESKİ:  Fotoğraf + isim
  YENİ:  Fotoğraf + isim + unvan + deneyim yılı 
         + uzmanlık alanı + 2 satır credential

SONUÇLAR:
  ESKİ:  Artistik galeri
  YENİ:  Before/After + teknik + greft sayısı + ay bilgisi
         + hasta yaşı/cinsiyeti

SSS:
  ESKİ:  Yok
  YENİ:  En sık 5 soru — [[trichologist]] doğrulamalı, 
         [[health-regulator]] uyumlu
```

---

## Sorun 3: SEO İçin Kötü Yapı

### Problem
→ [[seo-geo-specialist]] perspektifi:

- Görsel ağırlıklı, metin az = crawl edilecek içerik yok
- Heading hiyerarşisi (H1 → H2 → H3) belirsiz
- Keyword hedeflemesi yok
- Alt text yok (görsellerde)
- İç linkleme yapısı yok
- Schema markup planı yok
- AI arama motorları için yapısal cevap yok

### Çözüm

**Her sayfa için SEO kontrat'ı:**

```
ANA SAYFA:
  H1: "Altınsoy Saç Ekim Merkezi — [Ana keyword]"
  Primary keyword: "saç ekimi istanbul"
  Secondary: "fue saç ekimi", "dhi saç ekimi"
  Min metin: 800 kelime (görsel + metin dengeli)
  Schema: MedicalClinic + AggregateRating + FAQ
  Internal links: Her teknik sayfaya, galeri, doktor, blog

TEKNİK SAYFA (ör: FUE):
  H1: "FUE Saç Ekimi — [benefit keyword]"
  Primary keyword: "fue saç ekimi"
  Long-tail: "fue saç ekimi sonuçları", "fue kaç saat sürer"
  Min metin: 1500 kelime
  Schema: MedicalProcedure + FAQ + HowTo
  
BLOG:
  Her yazı bir long-tail keyword hedefler
  Min 1000 kelime
  Schema: Article + FAQ
  Internal link: ilgili teknik sayfaya + galeri
```

**GEO (AI Arama) gereksinimleri:**
- Her sayfada soru-cevap formatında bölümler (AI cevap üretebilsin)
- Spesifik, atıflanabilir veri noktaları ("15 yıl", "10.000+ operasyon")
- Doktor E-E-A-T sinyalleri (yayınlar, sertifikalar, konuşmalar)
- Kaynak gösterilen istatistikler

---

## Sorun 4: Mobil Deneyim Riskli

### Problem
→ [[ux-architect]] perspektifi:

- Glassmorphism + overlay'ler mobilde render sorunları
- Koyu tema + ince font = güneş altında okunamaz
- Büyük görseller + animasyon = yavaş yükleme
- Overlapping text layout'u küçük ekranda çakışma riski
- Touch target'lar belirsiz

### Çözüm

**Mobile-first tasarım kuralları:**

```
1. PERFORMANS:
   - First Contentful Paint < 1.5s (mobil 4G)
   - Toplam sayfa ağırlığı < 2MB
   - Görseller: WebP + lazy load + srcset
   - Glassmorphism: Sadece desktop, mobilde solid background

2. OKUNABILIRLIK:
   - Body font: minimum 16px (asla küçültme)
   - Heading: minimum 24px
   - Satır uzunluğu: max 75 karakter
   - Kontrast: WCAG AA minimum (4.5:1)

3. DOKUNMA:
   - Tüm butonlar: minimum 48x48px
   - Butonlar arası boşluk: minimum 8px
   - CTA: ekranın alt yarısında (thumb zone)
   - Sticky CTA bar: scroll'da sabit "Ücretsiz Analiz" butonu

4. LAYOUT:
   - Desktop: çok sütunlu, editorial
   - Mobil: tek sütun, lineer akış
   - Overlapping text: mobilde devre dışı
   - Before/after slider: tam genişlik, kolay kaydırma
```

---

## Sorun 5: Dönüşüm Noktaları Zayıf

### Problem
→ [[performance-analyst]] + [[patient-psychologist]] perspektifi:

- CTA belirsiz ("Konsültasyon" — ne olacak belli değil)
- Form akışı yok
- WhatsApp entegrasyonu yok
- Güven pekiştirmesi CTA öncesinde yok
- Aciliyet yok (ama yapay aciliyet de yasak — [[health-regulator]])

### Çözüm

**3 katlı dönüşüm sistemi:**

```
KATMAN 1: DÜŞÜK RİSK (Her sayfada)
  → "60 Saniyede Ücretsiz Saç Analizi"
  → Form: sadece Ad + Telefon + Fotoğraf (opsiyonel)
  → Veya WhatsApp butonu: "Fotoğrafını Gönder, Planını Al"

KATMAN 2: ORTA RİSK (Teknik/galeri sayfalarında)
  → "Online Video Konsültasyon — Ücretsiz"
  → Doktor ile 15 dk görüşme vaadi
  → Takvim seçimi (Calendly/Cal.com)

KATMAN 3: YÜKSEK NİYET (Fiyat sayfası, form sayfası)
  → Detaylı form: Ad + Tel + Fotoğraf + Norwood + Beklenti
  → "Kişisel tedavi planınız 24 saat içinde hazır"

HER CTA'DAN HEMEN ÖNCE:
  → Güven sinyali: "10.000+ hasta bize güvendi"
  → Risk azaltma: "Ücretsiz, bağlayıcı değil"
  → Sosyal kanıt: ★★★★★ 4.9/5 (Google Reviews)
```

**WhatsApp entegrasyonu:**
- Floating buton: sağ alt, her sayfada
- Pre-filled mesaj: "Merhaba, saç ekimi hakkında bilgi almak istiyorum"
- Mesai dışı otomatik yanıt

---

## Sorun 6: Hasta Yolculuğuyla Uyumsuz

### Problem
→ [[patient-psychologist]] perspektifi:

Tüm sayfalar aynı tonda. Faz 1 hastası (henüz araştıran, korkmuş) ile Faz 4 hastası (klinik seçmiş, randevu almak istiyor) aynı deneyimi yaşıyor.

### Çözüm

**Faz bazlı sayfa haritalama:**

```
FAZ 1 — FARKINDALIK (bilgi arıyor):
  Sayfalar: Blog, rehberler, "Saç dökülmesi nedir?"
  Ton: Eğitici, empati, normalleştirme
  CTA: "Daha fazla bilgi" veya "Ücretsiz rehber indir"
  SATIŞ YOK — güven inşa et

FAZ 2 — ARAŞTIRMA (saç ekimini öğreniyor):
  Sayfalar: Teknik sayfalar (FUE, DHI), SSS, prosedür detayı
  Ton: Bilgilendirici, şeffaf, detaylı
  CTA: "Ücretsiz saç analizi yaptır"
  ŞEFFAFLIK — risk ve sonucu birlikte göster

FAZ 3 — KARŞILAŞTIRMA (klinik seçiyor):
  Sayfalar: Hakkımızda, doktor profili, galeri, yorumlar, fiyat
  Ton: Güven pekiştirme, farklılaşma, kanıt
  CTA: "Online konsültasyon randevusu al"
  KANITLA — neden biz?

FAZ 4 — KARAR (son tereddüt):
  Sayfalar: İletişim, konsültasyon formu, paket detayları
  Ton: Net, basit, engelsiz
  CTA: "WhatsApp'tan hemen yaz" + "Formu doldur"
  KOLAYLAŞTIR — friction sıfırla

FAZ 5 — POST-OP (operasyon sonrası):
  Sayfalar: İyileşme merkezi, bakım rehberi, takip
  Ton: Destekleyici, sakinleştirici, eğitici
  CTA: "Sonucunuzu paylaşın" (referans/yorum toplama)
  SAHİPLEN — sadakat inşa et
```

---

## Sorun 7: Accessibility — Koyu Tema Riski

### Problem
→ [[ui-designer]] + [[ux-architect]] perspektifi:

- Koyu arka plan + ince font = uzun okuma zorlaşır
- 40+ yaş hasta kitlesi (saç ekimi ana demografik) görme zorluğu
- Güneşli ortamda mobil ekranda kontrast düşer
- WCAG AA standardı bazı yerlerde karşılanmıyor olabilir

### Çözüm

**İki katmanlı yaklaşım:**

```
SEÇENEK A: Açık tema (Tavsiye)
  - Beyaz/krem arka plan + koyu metin
  - Altın aksanlar CTA ve vurgu için
  - Koyu tema sadece belirli bölümlerde (hero, galeri)
  - Okunabilirlik maksimum

SEÇENEK B: Hibrit tema
  - Hero + galeri: koyu (dramatic etki)
  - Bilgi bölümleri: açık (okunabilirlik)
  - Form + CTA alanları: açık (güven)
  - Geçişler yumuşak (koyu → açık gradient)

SEÇENEK C: Koyu tema (mevcut) + accessibility düzeltmeleri
  - Font kalınlığı artır (thin → regular)
  - Kontrast oranları düzelt (minimum 4.5:1)
  - Font boyutu artır (+2px tüm metin)
  - Açık tema toggle (kullanıcı seçimi)
```

**Kontrast kontrol listesi:**
- Heading on dark: minimum #E5E2E1 (Onyx'te uyumlu)
- Body on dark: minimum #D1C5B4 (mevcut — KONTROL ET)
- CTA buton metni: siyah on gold (yüksek kontrast ✓)
- Küçük metin (label, caption): minimum #B0A89E

---

## Sonraki Adım

Bu 7 çözüm onaylandıktan sonra:
1. [[strategy-planner]] → Yeni marka konumlandırma
2. [[ux-architect]] → Yeni wireframe'ler (çözümler entegre)
3. [[ui-designer]] → Revize design system
4. [[copywriter]] → Her bölüm için gerçek içerik
5. [[trichologist]] + [[health-regulator]] → Doğrulama

---

_Bu doküman [[komutan]] orkestrasiyonuyla, [[agency-director]], [[patient-psychologist]], [[ux-architect]], [[ui-designer]], [[seo-geo-specialist]], [[copywriter]], [[trichologist]], [[performance-analyst]] ve [[health-regulator]] perspektiflerinden oluşturulmuştur._
