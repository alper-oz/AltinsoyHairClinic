# Sprint 2 — Teknik Sayfalar: Saç Ekimi Hub + FUE + DHI + Sapphire

**Goal:** Saç ekimi tekniklerinin her biri için SEO odaklı, tıbbi olarak doğru, Faz 2-3 hastasını dönüştüren landing page'ler üretmek

**Target Audience:** Faz 2 (araştırma) + Faz 3 (karşılaştırma) hastası

**Content Type:** Landing page (4 adet)

**Tone:** Bilgilendirici, şeffaf, otoriter ama hasta dilinde. Satış baskısı yok, veri + güven odaklı.

**Key Messages:**
1. Her teknik farklı durumlara uygundur — "en iyi" yoktur
2. Gerçekçi beklenti yönetimi (süre, ağrı, sonuç)
3. Altınsoy'un farkı: kişiselleştirilmiş teknik seçimi

**SEO/GEO Keywords:**
- Hub: "saç ekimi", "saç ekimi nedir", "saç ekimi teknikleri"
- FUE: "fue saç ekimi", "fue nedir", "fue sonuçları"
- DHI: "dhi saç ekimi", "dhi choi kalemi", "dhi sonuçları"
- Sapphire: "sapphire fue", "safir saç ekimi", "sapphire fue farkı"

**Wiki References:**
- `skills/trichologist/SKILL.md` — Teknik detaylar, kırmızı çizgiler, zaman çizelgesi
- `skills/seo-geo-specialist/SKILL.md` — Site yapısı, keyword stratejisi
- `skills/patient-psychologist/SKILL.md` — Faz 2-3 hasta duygu/korku haritası
- `skills/health-regulator/SKILL.md` — Tanıtım yönetmeliği yasakları
- `skills/copywriter/SKILL.md` — Hasta dili kuralı, CTA formülleri
- `wiki/strategy/tasarim-revizyonu.md` — Teknik kart kritikleri

---

## Sayfa Yapısı (4 sayfa ortak şablon)

Her teknik sayfası aynı wireframe'den türetilir:

```
[Nav — ALTINSOY + teknikler menü + CTA]
[Hero — Teknik adı + 1 cümle fayda + CTA]
[Nedir? — Hasta dilinde açıklama + görsel/diagram]
[Nasıl Yapılır? — Adım adım süreç (3-5 adım)]
[Avantajlar & Limitler — Şeffaf tablo (abartısız)]
[Kimler İçin Uygun? — Norwood/Ludwig rehberi]
[Süreç Bilgileri — İşlem süresi, iyileşme, nihai sonuç tablosu]
[Before/After — 2-3 vaka (bu teknik özelinde)]
[SSS — 4-5 soru (FAQ schema)]
[CTA — Ücretsiz saç analizi formu]
[Footer]
```

---

## Sayfa 1: Saç Ekimi Hub (`/sac-ekimi/`)

**Rol:** Tüm tekniklerin üst sayfası. SEO hub — keyword gücünü dağıtır.

### Task 1.1: SEO brief
- [ ] Primary: "saç ekimi", "saç ekimi nedir"
- [ ] Secondary: "saç ekimi teknikleri", "saç ekimi istanbul"
- [ ] Schema: MedicalProcedure + FAQPage
- [ ] Internal link planı: → FUE, DHI, Sapphire, galeri, doktor, fiyat

### Task 1.2: Patient-psychologist perspektifi
- [ ] Faz 2 hastası: "saç ekimi nedir, nasıl yapılır, acır mı?"
- [ ] Ton: eğitici, empati, abartısız
- [ ] Korkular: ağrı, doğallık, iz kalması

### Task 1.3: İçerik draft
- [ ] Hero: "Saç Ekimi Nedir? Teknikler, Süreç ve Sonuçlar" (H1)
- [ ] Genel açıklama (saç ekimi nedir, kim için uygun)
- [ ] 3 teknik kartı (FUE, DHI, Sapphire) — kısa özet + "Detaylı bilgi →" link
- [ ] Genel süreç akışı (konsültasyon → plan → operasyon → iyileşme → sonuç)
- [ ] Kim uygundur / kim değildir
- [ ] Genel SSS (4-5 soru)
- [ ] CTA: "Hangi teknik size uygun? Ücretsiz saç analizi"
- [ ] Min 1000 kelime

### Task 1.4: Trichologist review
### Task 1.5: Health-regulator review
### Task 1.6: Build HTML

---

## Sayfa 2: FUE Saç Ekimi (`/fue-sac-ekimi/`)

### Task 2.1: SEO brief
- [ ] Primary: "fue saç ekimi"
- [ ] Long-tail: "fue saç ekimi sonuçları", "fue kaç saat sürer", "fue ağrılı mı"
- [ ] Schema: MedicalProcedure + FAQPage + HowTo

### Task 2.2: Trichologist veri tabanı
- [ ] Gerçek avantaj: İz bırakmaz, hızlı iyileşme
- [ ] Gerçek limit: Geniş alanlarda uzun sürer
- [ ] Pazarlama yalanı: "Ağrısız" → gerçek: lokal anestezi acır
- [ ] İşlem süresi: 4-6 saat
- [ ] İyileşme: 7-10 gün
- [ ] Nihai sonuç: 12-18 ay
- [ ] Greft kapasitesi: tek seansta 3000-5000 greft

### Task 2.3: Patient-psychologist perspektifi
- [ ] "FUE nasıl yapılır" arayan: detay + güven istiyor
- [ ] Korkular: ağrı, iz, doğallık
- [ ] Trust signal'lar: süreç şeffaflığı, gerçekçi beklenti

### Task 2.4: İçerik draft
- [ ] H1: "FUE Saç Ekimi: Nasıl Yapılır, Sonuçlar ve Süreç"
- [ ] FUE nedir (hasta dilinde)
- [ ] Nasıl yapılır (adım adım: anestezi → alım → kanal açma → yerleştirme → kapanış)
- [ ] Avantajlar (bullet, somut)
- [ ] Limitler (şeffaf — rakiplerden ayırıcı)
- [ ] Kimler için uygun / uygun değil
- [ ] Süreç tablosu (işlem, iyileşme, sonuç)
- [ ] Before/after placeholder (2-3 vaka)
- [ ] SSS (5 soru — "FUE ağrılı mı?", "Kaç greft?", "FUE vs DHI farkı?", "İz kalır mı?", "Ne kadar sürer?")
- [ ] CTA: "FUE size uygun mu? Ücretsiz analiz"
- [ ] Min 1500 kelime

### Task 2.5: Trichologist review (kırmızı çizgi kontrolü)
### Task 2.6: Health-regulator review
### Task 2.7: Agency-director review
### Task 2.8: Build HTML

---

## Sayfa 3: DHI Saç Ekimi (`/dhi-sac-ekimi/`)

### Task 3.1: SEO brief
- [ ] Primary: "dhi saç ekimi"
- [ ] Long-tail: "dhi choi kalemi nedir", "dhi sonuçları", "dhi fue farkı"

### Task 3.2: Trichologist veri
- [ ] Avantaj: Açı/yön kontrolü iyi, yoğunluk
- [ ] Limit: Geniş alanlarda yavaş, daha pahalı
- [ ] Pazarlama yalanı: "Kesilmeden ekim" → gerçek: punch keser
- [ ] İşlem: 5-7 saat
- [ ] İyileşme: 7-10 gün
- [ ] Nihai sonuç: 12-18 ay

### Task 3.3: İçerik draft
- [ ] H1: "DHI Saç Ekimi: Choi Kalemi Tekniği, Avantajlar ve Sonuçlar"
- [ ] Yapı: Hub ile aynı wireframe
- [ ] Min 1500 kelime

### Task 3.4-3.7: Review zinciri (trichologist → regulator → director → build)

---

## Sayfa 4: Sapphire FUE (`/sapphire-fue/`)

### Task 4.1: SEO brief
- [ ] Primary: "sapphire fue", "safir saç ekimi"
- [ ] Long-tail: "sapphire fue farkı", "sapphire fue avantajları"

### Task 4.2: Trichologist veri
- [ ] Avantaj: Daha küçük kesi, daha hızlı iyileşme
- [ ] Limit: Temel FUE'den dramatik fark yok
- [ ] Pazarlama yalanı: "Devrimsel teknoloji" → gerçek: sadece bıçak farklı
- [ ] İşlem: 4-6 saat
- [ ] İyileşme: 5-7 gün
- [ ] Nihai sonuç: 12-18 ay
- [ ] ⚠️ Şeffaflık notu: "Sapphire FUE, FUE'nin bir varyasyonudur" — abartmamak güven kazandırır

### Task 4.3: İçerik draft
- [ ] H1: "Sapphire FUE: Safir Uçlu Saç Ekimi Tekniği"
- [ ] Min 1200 kelime

### Task 4.4-4.7: Review zinciri

---

## Üretim Sırası

```
1. Hub sayfası ÖNCE (diğer 3'ün ana sayfası)
2. FUE (en yüksek hacimli keyword)
3. DHI (ikinci)
4. Sapphire (üçüncü)
```

Her sayfa tamamlandığında:
- Trichologist review
- Health-regulator review  
- Agency-director review
- Build HTML
- Ana sayfadaki teknik kartlardan link ver
- Footer'a hizmetler linklerini bağla

---

HANDOFF: writing-plans → komutan
Dosya: wiki/strategy/2026-04-14-sprint2-plan.md
Özet: Sprint 2 planı — 4 teknik sayfa, ~28 task
Roller: trichologist (ağırlıklı), seo, patient-psych, copywriter, health-regulator, agency-director
İlk adım: Hub sayfası → sırayla FUE → DHI → Sapphire
