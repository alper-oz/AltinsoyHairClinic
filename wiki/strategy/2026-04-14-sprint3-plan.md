# Sprint 3 — Dönüşüm Sayfaları: Galeri + Fiyat + İletişim + Karşılaştırma

**Goal:** Hasta kararını hızlandıran 4 dönüşüm sayfasını yayına hazır hale getirmek. Faz 3 (karşılaştırma) ve Faz 4 (karar) hastalarının friction noktalarını kaldırmak.

**Target Audience:** 
- Faz 3 hastası (klinik seçiyor — galeri + fiyat + karşılaştırma)
- Faz 4 hastası (randevu alıyor — iletişim)

**Content Type:** 4 statik sayfa

**Tone:** 
- Galeri: Kanıt odaklı, şeffaf (zaman + teknik + greft bilgisi)
- Fiyat: Şeffaf, net, "hidden fee yok" vurgusu
- İletişim: Davetkar, düşük friction
- Karşılaştırma: Objektif, hiçbir tekniği övmeden/yermeden

**Key Messages:**
1. Şeffaflık — rakiplerden ayrışma #1
2. Gerçek sonuç, gerçek hasta (hasta onamı ile)
3. Fiyat gizli değil (indirim ifadesi YASAK)
4. İletişim engelsiz (WhatsApp, telefon, form, harita)

**SEO/GEO/AEO Keywords:**
- Galeri: "saç ekimi öncesi sonrası", "saç ekimi sonuçları galeri"
- Fiyat: "saç ekimi fiyat", "saç ekimi fiyat 2026", "saç ekimi paket"
- İletişim: "altınsoy iletişim", "saç ekimi randevu istanbul"
- Karşılaştırma: "fue vs dhi", "fue mi dhi mi", "hangi teknik daha iyi"

**Wiki References:**
- `skills/health-regulator/SKILL.md` — Tanıtım yönetmeliği (indirim yasak, onam, karşılaştırma)
- `skills/trichologist/SKILL.md` — FUE/DHI objektif teknik verileri
- `skills/patient-psychologist/SKILL.md` — Faz 3-4 hasta korkuları
- `skills/ux-architect/SKILL.md` — Galeri filtreleme, form friction
- `skills/seo-geo-specialist/SKILL.md` — AEO soru formatı

---

## Sayfa 1: Öncesi / Sonrası Galeri (`/oncesi-sonrasi/`)

**Rol:** Hasta kararının #1 etkeni — görsel kanıt. Ana sayfadaki 3 vaka yetersiz, filtrelenebilir galeri lazım.

### Task 1.1: Health-regulator brief
- [ ] Her before/after için hasta onamı DURUMU belirt (şablonda)
- [ ] "Bireysel sonuçlar değişkenlik gösterebilir" disclaimer zorunlu
- [ ] Fotoğraf manipülasyon yasak — makyaj/ışık tutarlı olmalı
- [ ] Her vaka için: teknik + greft + ay + yaş/cinsiyet zorunlu metadata

### Task 1.2: UX brief (ux-architect)
- [ ] Grid layout: 3 sütun desktop, 2 tablet, 1 mobile
- [ ] Filtre bar: Teknik (FUE/DHI/Sapphire/Kaş/Sakal) + Bölge (Norwood aşaması) + Zaman (3/6/12/18 ay)
- [ ] Her kart: thumbnail + teknik badge + ay badge + hover'da detay
- [ ] Kart tıklanınca → mevcut vaka detay sayfaları açılır (vaka-fue-3200-greft vb.)
- [ ] Placeholder 9 vaka (3 mevcut + 6 yeni placeholder)

### Task 1.3: AEO optimizasyonu (seo-geo-specialist)
- [ ] H1: "Saç Ekimi Öncesi Sonrası Galeri | Gerçek Hasta Sonuçları"
- [ ] H2 soru formatı: "Bu sonuçlar gerçek mi?", "Ne kadar sürede çıktı?", "Kimler için uygun?"
- [ ] İlk paragrafta doğrudan cevap: şeffaflık, onam, zaman çizelgesi
- [ ] Schema: MedicalProcedure + ImageGallery

### Task 1.4: Copy (copywriter)
- [ ] Hero: "Sonuçlarımız konuşsun."
- [ ] Altbaşlık: Onam + zaman çizelgesi şeffaflığı
- [ ] Filtre açıklamaları
- [ ] Her vaka kartı: teknik + greft + ay + hasta profili
- [ ] Alt section: "Sizin de dönüşümünüz mümkün" CTA

### Task 1.5: Health-regulator review
- [ ] Tüm vakalarda "hasta onamıyla paylaşılmaktadır" not var mı?
- [ ] Disclaimer tüm sayfada mı?
- [ ] Karşılaştırma/rakip ifadesi yok mu?

### Task 1.6: Build HTML
- [ ] `preview/oncesi-sonrasi.html`
- [ ] 3 mevcut vakaya link + 6 placeholder kart
- [ ] Ana sayfa galeri carousel'inden "Tüm Sonuçlar" linki bağla
- [ ] Teknik sayfalarından link

---

## Sayfa 2: Fiyat (`/fiyat/`)  — REGULATOR KRİTİK

**Rol:** En yüksek karar niyetli keyword. Rakiplerin %90'ı "fiyat gizliyor" — biz şeffaflıkla ayrışırız.

### Task 2.1: Health-regulator brief (KRİTİK)
- [ ] **YASAK ifadeler:** "indirim", "kampanya", "özel teklif", "fırsat", "%X avantaj"
- [ ] **İzin verilen:** Gerçek fiyat aralıkları, paket içerikleri, ödeme seçenekleri
- [ ] Hekimlik Meslek Etiği — fiyat bilgisi dikkatli, teşvik edici dil yok
- [ ] Net fiyat ver (gerçek değer) veya "konsültasyon sonrası kesin fiyat" formatı

### Task 2.2: Fiyat yapısı (strategy-planner)
- [ ] 3 paket yapısı:
  - **Standart:** FUE, 3000-4000 greft, temel paket (konaklama hariç)
  - **Premium:** DHI/Sapphire, 3500-4500 greft, konaklama + transfer dahil
  - **Uluslararası:** Tam paket, çeviri hizmeti, VIP karşılama, 5 gün bakım
- [ ] Her pakette neyin DAHİL neyin HARİÇ olduğu NET
- [ ] Fiyat aralığı: "€X - €Y" formatı (kesin fiyat yasal risk taşıyor)
- [ ] Ödeme seçenekleri: nakit, kart, taksit, uluslararası transfer

### Task 2.3: AEO soruları (seo-geo-specialist)
- [ ] "Saç ekimi fiyatı ne kadar?"
- [ ] "Fiyata neler dahil?"
- [ ] "Taksit seçeneği var mı?"
- [ ] "Yurt dışından gelirsem ek ücret var mı?"
- [ ] Her H2 soru + ilk paragrafta direkt cevap

### Task 2.4: Patient-psychology (patient-psychologist)
- [ ] Korku adresleme: "Gizli ücret çıkar mı?" → "Her şey konsültasyonda net"
- [ ] Trust signal: "Konsültasyon sonrası yazılı fiyat teklifi" garantisi
- [ ] Risk azaltma: "Ücretsiz ön değerlendirme, fiyatı sonra konuşalım"

### Task 2.5: Copy (copywriter)
- [ ] Hero: "Şeffaf fiyatlandırma, sürprizsiz süreç."
- [ ] 3 paket kart (karşılaştırma tablosu formatında)
- [ ] "Fiyata ne dahil?" accordion (uzun liste)
- [ ] "Fiyata ne dahil değil?" — dürüst liste
- [ ] SSS (4 soru)
- [ ] CTA: "Size Uygun Paketi Öğrenin" (ücretsiz analiz)

### Task 2.6: Health-regulator review (ZORUNLU İKİNCİ KONTROL)
- [ ] "İndirim" türevi hiçbir kelime yok
- [ ] Abartı yok
- [ ] Karşılaştırma yok

### Task 2.7: Agency-director review
### Task 2.8: Build HTML (`preview/fiyat.html`)

---

## Sayfa 3: İletişim (`/iletisim/`)

**Rol:** Faz 4 hastası için friction'ı sıfırla. Çoklu kanal sun.

### Task 3.1: UX brief (ux-architect)
- [ ] Hero: İletişim metodları grid (telefon, WhatsApp, e-posta, form)
- [ ] Harita: Google Maps embed (klinik konumu)
- [ ] Detaylı form: Ad + telefon + mesaj + fotoğraf (opsiyonel)
- [ ] Çalışma saatleri tablosu
- [ ] Mesai dışı otomatik yanıt notu

### Task 3.2: Copy (copywriter)
- [ ] Hero: "Size nasıl yardımcı olabiliriz?"
- [ ] Her iletişim metodunun kısa açıklaması + hangi durumda ideal
  - WhatsApp: "Hızlı soru, fotoğraf paylaşımı" (en hızlı)
  - Telefon: "Detaylı konuşma, randevu"
  - Form: "Zaman istiyorsanız, detaylı bilgi verin"
  - E-posta: "Belge paylaşımı, uluslararası"

### Task 3.3: KVKK (health-regulator)
- [ ] Formda KVKK onay checkbox
- [ ] Aydınlatma metni linki

### Task 3.4: Build HTML (`preview/iletisim.html`)

---

## Sayfa 4: FUE vs DHI Karşılaştırma (`/fue-vs-dhi/`)

**Rol:** Yüksek karar niyetli keyword. Rakiplerin çoğu biased ("DHI daha iyi" veya "FUE daha iyi") — fair karşılaştırma ile güven kazanırız.

### Task 4.1: Trichologist brief (KRİTİK — FAIR)
- [ ] Hiçbir teknik "daha iyi" değildir — duruma göre uygun olan vardır
- [ ] Teknik veriler (aynı skill'deki gerçek bilgi):
  ```
  FUE: 4-6 saat | 7-10 gün iyileşme | 3000-5000 greft | geniş alan ideal
  DHI: 5-7 saat | 7-10 gün iyileşme | 2000-3500 greft | hassas açı/yoğunluk ideal
  ```
- [ ] Pazarlama yalanları ELİMINE: "DHI kesilmeden" (punch keser), "FUE ağrısız"
- [ ] Kırmızı çizgi: rakip klinik adı kullanma

### Task 4.2: Karşılaştırma matrisi (strategy-planner + trichologist)
- [ ] 10 kriter tablosu:
  1. İşlem süresi
  2. İyileşme süresi
  3. Greft kapasitesi
  4. Açı/yön kontrolü
  5. Mevcut saç arası ekim
  6. Donor alanda iz
  7. Operasyon konforu
  8. Fiyat farkı
  9. Nihai sonuç süresi
  10. Kimler için ideal
- [ ] Her satır: FUE / DHI / KAZANAN yok (duruma göre)

### Task 4.3: AEO (seo-geo-specialist)
- [ ] H1: "FUE vs DHI: Hangi Saç Ekimi Tekniği Size Uygun?"
- [ ] H2 soru formatı: "Hangisi daha iyi?", "Hangisi ağrısız?", "Hangisi daha hızlı?"
- [ ] İlk paragrafta **fair cevap**: "Hiçbiri daha iyi değil — durumunuza uygun olan var"
- [ ] Karşılaştırma tablosu AEO için ideal

### Task 4.4: Copy (copywriter)
- [ ] Hero: "FUE vs DHI — Hangi teknik size uygun?"
- [ ] Hasta dili: "Sık sorulan sorunuz: hangisi daha iyi? Kısa cevap: ikisi de iyi, siz hangi durumdasınız?"
- [ ] Karşılaştırma tablosu
- [ ] "Hangi durumda FUE" bölümü (karar ağacı)
- [ ] "Hangi durumda DHI" bölümü
- [ ] "Nasıl karar verilir" — "Ücretsiz konsültasyonda size uygun olan belirlenir"

### Task 4.5: Trichologist review
- [ ] Tablo verileri doğru mu?
- [ ] Bias yok mu?
- [ ] Pazarlama yalanı girmemiş mi?

### Task 4.6: Health-regulator review
### Task 4.7: Build HTML (`preview/fue-vs-dhi.html`)

---

## Üretim Sırası

```
1. Fiyat (en yüksek karar niyeti + regulator kritik)
2. Galeri (hasta kararının #1 etkeni)
3. FUE vs DHI (karar kolaylaştırıcı)
4. İletişim (friction azaltma)
```

---

## Link Güncellemeleri

Her sayfa tamamlandığında:
- **Ana sayfa footer:** /fiyat/, /iletisim/, /oncesi-sonrasi/ linklerini bağla
- **sac-ekimi.html:** /fue-vs-dhi/ linki ekle
- **FUE + DHI teknik sayfaları:** /fue-vs-dhi/ linki ekle
- **Galeri:** mevcut 3 vaka sayfasına link + 6 placeholder

---

HANDOFF: writing-plans → komutan
Dosya: wiki/strategy/2026-04-14-sprint3-plan.md
Özet: Sprint 3 planı — 4 dönüşüm sayfası, 24 task
Roller: health-regulator (ağırlıklı — fiyat + galeri kritik), trichologist (karşılaştırma), patient-psych, ux-architect, copywriter, agency-director
İlk adım: Fiyat sayfası (regulator + strateji önce)
Flag: Fiyat sayfası YASAL RİSK — "indirim" türevi hiçbir kelime yasak
