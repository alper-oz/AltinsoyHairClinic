# Sprint 1 — Yasal Sayfalar + Doktor Profili

**Goal:** Siteyi yasal olarak yayına hazır hale getirmek (KVKK/GDPR zorunlulukları) + doktor profiliyle E-E-A-T sinyali oluşturmak

**Target Audience:** 
- Yasal sayfalar: Tüm ziyaretçiler (KVKK zorunluluğu)
- Doktor profili: Faz 3 hastası (klinik karşılaştırıyor, doktor güveni arıyor)

**Content Type:** Statik sayfa (4 adet)

**Tone:** 
- Yasal sayfalar: Resmi, net, jargonsuz Türkçe
- Doktor profili: Profesyonel ama sıcak, güven inşa eden

**Key Messages:**
1. Verileriniz güvende — şeffaf veri politikası
2. Uluslararası standartlarda klinik — doktor credential'ları
3. Deneyim ve sonuçlarla kanıtlanmış uzmanlık

**SEO/GEO Keywords:**
- Yasal: Doğrudan SEO hedefi yok (yasal zorunluluk)
- Doktor: "altınsoy doktor", "saç ekimi uzmanı istanbul", "[doktor adı] saç ekimi"

**Wiki References:**
- `skills/health-regulator/SKILL.md` — KVKK/GDPR gereksinimleri
- `wiki/strategy/site-haritasi.md` — Sayfa yapısı
- `wiki/strategy/tasarim-revizyonu.md` — Doktor bölümü kritikleri

---

## Sayfa 1: Gizlilik Politikası (`/gizlilik-politikasi/`)

### Task 1.1: Araştırma — KVKK gizlilik politikası gereksinimleri
- [ ] `skills/health-regulator/SKILL.md` → KVKK bölümünü oku
- [ ] KVKK md. 10 aydınlatma yükümlülüğü maddelerini listele
- [ ] Sağlık sektörü özel nitelikli veri kurallarını not et
- [ ] GDPR (uluslararası hastalar için) ek gereksinimlerini listele

### Task 1.2: İçerik yapısı belirle
- [ ] Zorunlu bölümler:
  - Veri sorumlusunun kimliği (Altınsoy Hair Clinic)
  - Toplanan kişisel veriler listesi
  - Veri işleme amaçları
  - Veri işlemenin hukuki dayanağı
  - Verilerin aktarıldığı taraflar
  - Veri saklama süreleri
  - Veri güvenliği önlemleri
  - Kişisel veri sahibinin hakları (KVKK md. 11)
  - Başvuru yöntemleri
  - İletişim bilgileri

### Task 1.3: Draft yaz
- [ ] Her bölüm için içerik yaz — Altınsoy'a özelleştirilmiş
- [ ] Sağlık verisi = özel nitelikli veri vurgusunu ekle
- [ ] GDPR ek paragrafları (EU/UK hastaları için)
- [ ] Dil: resmi ama anlaşılır Türkçe (jargon az)

### Task 1.4: Health-regulator review
- [ ] KVKK uyumu kontrol listesi uygula
- [ ] GDPR uyumu kontrol et
- [ ] Eksik madde var mı?

### Task 1.5: Dosyala
- [ ] `preview/gizlilik-politikasi.html` olarak kaydet
- [ ] Ana sayfadaki footer linkini bağla
- [ ] Wiki'ye kaydet: `wiki/content/gizlilik-politikasi.md`

---

## Sayfa 2: KVKK Aydınlatma Metni (`/kvkk-aydinlatma/`)

### Task 2.1: Araştırma — Aydınlatma metni gereksinimleri
- [ ] KVKK md. 10 — aydınlatma yükümlülüğü spesifik maddeleri
- [ ] Konsültasyon formu veri akışını haritalandır (form → hangi sistemler → kim erişiyor)
- [ ] Hasta fotoğrafı işleme sürecini belirle

### Task 2.2: İçerik yapısı belirle
- [ ] Zorunlu bölümler:
  - Veri sorumlusu bilgisi
  - Hangi veriler toplanıyor (form: ad, telefon, fotoğraf)
  - İşleme amacı (konsültasyon)
  - Hukuki dayanak (açık rıza)
  - Aktarım (varsa 3. taraf)
  - Saklama süresi
  - Haklar ve başvuru

### Task 2.3: Draft yaz
- [ ] Gizlilik politikasından farklılaştır (aydınlatma = form bazlı, kısa)
- [ ] Form'a entegre edilecek kısa versiyon da hazırla

### Task 2.4: Health-regulator review
- [ ] Kontrol listesi uygula

### Task 2.5: Dosyala
- [ ] `preview/kvkk-aydinlatma.html`
- [ ] Footer linkini bağla
- [ ] Form'un altındaki linki çalışır hale getir

---

## Sayfa 3: Çerez Politikası (`/cerez-politikasi/`)

### Task 3.1: Araştırma — Çerez gereksinimleri
- [ ] Mevcut sitede kullanılan çerezleri tespit et (GA4, Tailwind CDN, vs.)
- [ ] KVKK çerez kuralları
- [ ] GDPR çerez onay gereksinimleri (opt-in, pre-checked YASAK)

### Task 3.2: İçerik yapısı
- [ ] Zorunlu bölümler:
  - Çerez nedir (kısa açıklama)
  - Kullanılan çerez türleri (tablo: isim, amaç, süre, tür)
  - Zorunlu çerezler vs tercihsel çerezler
  - Çerez yönetimi (nasıl kapatılır)
  - İletişim

### Task 3.3: Draft yaz
- [ ] Çerez tablosunu doldur (gerçek çerezler)
- [ ] Cookie banner'daki linkle uyumlu olsun

### Task 3.4: Health-regulator review

### Task 3.5: Dosyala
- [ ] `preview/cerez-politikasi.html`
- [ ] Footer + cookie banner linklerini bağla

---

## Sayfa 4: Doktor Profili (`/doktor/`)

### Task 4.1: Wiki + mevcut veri tarama
- [ ] Ana sayfadaki mevcut doktor bölümünü incele (#cerrah section)
- [ ] `wiki/strategy/tasarim-revizyonu.md` → Sorun 2'deki doktor kritiklerini oku
- [ ] Eksik bilgileri listele (klinik adı, doktor adı, credential'lar — kullanıcıdan istenmeli)

### Task 4.2: Kullanıcıdan bilgi topla
- [ ] Doktor adı, unvanı
- [ ] Eğitim geçmişi (üniversite, uzmanlık)
- [ ] Sertifikalar (ISHRS, JCI, diğer)
- [ ] Deneyim yılı ve operasyon sayısı
- [ ] Uzmanlık alanları (FUE, DHI, sakal, kaş)
- [ ] Varsa yayınlar, konuşmalar, ödüller
- [ ] Profesyonel fotoğraf (mevcut mu?)

### Task 4.3: SEO brief oluştur
- [ ] seo-geo-specialist perspektifi:
  - Primary keyword: "altınsoy doktor", "[isim] saç ekimi"
  - Schema: Physician + MedicalClinic
  - E-E-A-T sinyalleri yapısı

### Task 4.4: Hasta psikolojisi perspektifi
- [ ] patient-psychologist: Faz 3 hastası ne görmek istiyor?
  - Deneyim kanıtı (sayılar)
  - İnsan tarafı (kısa hikaye/felsefe)
  - Erişilebilirlik (randevu almak kolay)

### Task 4.5: Wireframe
- [ ] ux-architect perspektifi:
  - Hero: fotoğraf + isim + unvan + 1 cümle
  - Credential bar: yıl, operasyon, ülke, sertifika
  - Biyografi bölümü
  - Uzmanlık alanları (kartlar)
  - Hasta yorumu (1-2 seçme)
  - CTA: "Doktorla Online Görüşme"

### Task 4.6: Copy yaz
- [ ] copywriter perspektifi:
  - Hero headline + sub
  - Biyografi (3. tekil şahıs, profesyonel ama insani)
  - Credential listesi
  - Hasta dilinde uzmanlık açıklamaları
  - CTA metni

### Task 4.7: Trichologist review
- [ ] Credential'lar doğru mu?
- [ ] Uzmanlık ifadeleri tıbbi olarak doğru mu?

### Task 4.8: Health-regulator review
- [ ] Unvan kullanımı doğru mu (ruhsatsız unvan YASAK)?
- [ ] Abartı/garanti ifadesi var mı?

### Task 4.9: Agency-director review
- [ ] Marka kalitesi
- [ ] E-E-A-T sinyali yeterli mi?

### Task 4.10: Build + dosyala
- [ ] `preview/doktor.html` olarak build et
- [ ] Footer'dan ve #cerrah bölümünden link ver
- [ ] Wiki'ye kaydet

---

## Altınsoy Kalite Kapıları

| Kapı | Sayfa 1-3 (Yasal) | Sayfa 4 (Doktor) |
|------|-------------------|-------------------|
| Trichologist | N/A | Credential doğrulama |
| Health-regulator | KVKK/GDPR uyumu — KRİTİK | Unvan + ifade kontrolü |
| Patient-psychologist | N/A | Güven sinyali yeterli mi? |
| SEO-geo-specialist | N/A | Physician schema + keyword |
| Agency-director | Format kontrolü | Tam kalite review |

---

## Bağımlılıklar

```
Sayfa 1-3 (yasal): Bağımsız — paralel üretilebilir
Sayfa 4 (doktor): Kullanıcıdan bilgi gerekli (Task 4.2)
```

**Blokaj noktası:** Doktor profili için gerçek bilgiler (isim, credential, fotoğraf) kullanıcıdan alınmalı. Yasal sayfalar beklemeden başlanabilir.

---

HANDOFF: writing-plans → komutan
Dosya: wiki/strategy/2026-04-14-sprint1-plan.md
Özet: Sprint 1 planı — 4 sayfa, 22 task, yasal + doktor profili
Roller: health-regulator (ağırlıklı), copywriter, seo-geo-specialist, ux-architect, trichologist, patient-psychologist, agency-director
İlk adım: Yasal sayfalar paralel üretim + doktor bilgileri toplama
