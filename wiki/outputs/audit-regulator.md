---
title: Regülasyon Audit
type: output
tags: [audit, regulator, kvkk, gdpr]
created: 2026-04-14
---

# Regülasyon Uyum Audit Raporu

**Denetleyen:** health-regulator skill
**Kapsam:** 19 HTML sayfa (`altınsoy/preview/` altında)
**Referans:** Sağlık Hizmetleri Tanıtım Yönetmeliği (2011) + KVKK 6698 + GDPR + Google/Meta Ads politikaları
**Duyuru:** Sağlık regülasyonu uzmanı olarak devreye giriyorum — Altınsoy sitesinin final regülasyon kapısı kontrolü.

---

## Özet

| Metrik | Değer |
|--------|-------|
| Yasak kelime ihlali (ağır) | 0 |
| Yasak kelime ihlali (orta) | 0 |
| "Riskli" ifade (bağlam uyumlu ama dikkatli) | 3 |
| Disclaimer eksik sayfa | 2 |
| KVKK kritik sorun | **1 (index.html form)** |
| Rakip klinik adı | 0 |
| Ünlü/şöhret kullanımı | 0 (1 kez "ünlü saçı beklentisi" uyarı bağlamında — GEÇTİ) |
| Before/after manipülasyon ihlali | 0 |
| Taksit/kredi kartı aşırı teşvik | 0 |

### Sonuç: **REVİZYON GEREKLİ**

Genel uyum yüksek. Site büyük ölçüde regülasyon dostu yazılmış (negasyon kullanımı örn. "en iyi teknik yoktur", "ağrısız iddiaları yanlıştır" dikkat çekici derecede olumlu). Ancak **index.html üzerindeki konsültasyon formunda KVKK açık rıza checkbox'ı bulunmuyor** — bu tek başına yayın önünde engel teşkil eder (KVKK md. 5/1 ve md. 6/2 ihlali, İdari para cezası riski).

---

## 1. Yasak Kelime Tarama Sonucu

### 1.1 Promosyon Dili
| Kelime | Eşleşme | Değerlendirme |
|--------|---------|---------------|
| indirim | 0 | GEÇTİ |
| kampanya | 1 — `cerez-politikasi.html:131` ("reklam kampanyalarının etkinliğini ölçer") | GEÇTİ — çerez açıklaması, promosyon değil |
| fırsat | 0 | GEÇTİ |
| özel teklif | 1 — `oncesi-sonrasi.html:350` ("size özel teknik") — aslında "özel teklif" değil, tarama false-positive | GEÇTİ |
| avantaj | Çoklu (teknik avantaj bağlamı, FUE/DHI karşılaştırma) | GEÇTİ — medikal karşılaştırma, teşvik değil |
| tasarruf | 0 | GEÇTİ |
| ucuza | 0 | GEÇTİ |
| uygun fiyat | 0 | GEÇTİ |

**Yorum:** "Avantaj" kelimesi yoğun kullanılmış (~20 eşleşme) ama tamamı medikal-teknik karşılaştırma (DHI avantajı, FUE avantajı) bağlamında. Promosyonel kullanım yok. GEÇTİ.

### 1.2 Abartı/Garanti Dili
| Kelime | Eşleşme | Değerlendirme |
|--------|---------|---------------|
| garantili / garanti | Disclaimer'larda "garanti edilemez", "garanti niteliği taşımaz" — **ters yönlü kullanım** | GEÇTİ (+) Pozitif |
| kesin sonuç | 0 | GEÇTİ |
| %100 başarı | 0 | GEÇTİ |
| en iyi | 2 sayfada "\"En iyi teknik\" yoktur" — **negasyon** | GEÇTİ (+) Örnek uyum |
| rakipsiz | 0 | GEÇTİ |
| tek klinik / tek merkez | 0 | GEÇTİ |

**Yorum:** Site'nin "en iyi teknik yoktur" gibi anti-iddia dili regülasyon açısından örnek gösterilebilir. GEÇTİ.

### 1.3 Yanlış Tıbbi İfadeler
| Kelime | Eşleşme | Değerlendirme |
|--------|---------|---------------|
| ağrısız | `fue-vs-dhi.html:330` — "FUE ağrısız veya DHI ağrısız **iddiaları yanlıştır**" | GEÇTİ (+) Doğrulayıcı kullanım |
| acısız | 0 | GEÇTİ |
| hiç iz | 0 | GEÇTİ |
| izsiz | 0 | GEÇTİ |
| tamamen doğal görünmez | 0 | GEÇTİ |

### 1.4 Ünlü / Şöhret
| Arama | Sonuç |
|-------|-------|
| Ünlü isimleri (Ronaldo, Messi, Elon, vb.) | 0 |
| "ünlü" kelimesi | `uygun-degil.html:254` — "Ünlü saçı / 20'li yaş yoğunluğu bekleyenler" (beklenti yönetim uyarısı) |
| futbolcu/oyuncu/şarkıcı | 0 |

**Yorum:** `uygun-degil.html`'deki tek geçiş, gerçekçi beklenti yönetimi uyarısı ("ünlülerin saçı gibi görünmeyi bekleyen hastalar aday değildir") — bir kişi tanıtımı DEĞİLDİR. GEÇTİ.

### 1.5 Rakip Klinik Adı
| Arama | Sonuç |
|-------|-------|
| Smile Hair / ASMED / Elithair / Cinik / Bosley / Hims / Estenove / Istanbul Aesthetic / Clinic Center / Dr. Serkan / Dr. Koray / Dr. Levent | **0 eşleşme** |

GEÇTİ — karşılaştırmalı reklam ihlali yok.

---

## 2. KVKK / GDPR Kontrolü

### 2.1 Politika Sayfaları
| Sayfa | Durum | Not |
|-------|-------|-----|
| `gizlilik-politikasi.html` | GEÇTİ | Veri sorumlusu, saklama süreleri (md. 7 bölümü), KVKK md. 11 hakları bölümü mevcut. Aydınlatma yükümlülüğü (KVKK md. 10) yeterli kapsamda. |
| `kvkk-aydinlatma.html` | GEÇTİ | Form bazlı aydınlatma var. KVKK md. 5/1 (açık rıza) ve md. 6/2 (sağlık verisi için açık rıza) açıkça belirtilmiş. Fotoğraf özel nitelikli veri vurgusu mevcut. |
| `cerez-politikasi.html` | GEÇTİ | Çerez türleri (zorunlu / analitik / pazarlama) ayrılmış. GDPR opt-in vurgusu (satır 168) mevcut. "Reddet" seçeneği belirtilmiş. |

### 2.2 Formlu Sayfalarda KVKK Checkbox
| Sayfa | Form var mı? | KVKK Checkbox | Link Doğru mu? | Durum |
|-------|-------------|---------------|----------------|-------|
| `iletisim.html` | Evet | **VAR** (id=kvkk, required, JS validation) | Evet (`kvkk-aydinlatma.html`, `gizlilik-politikasi.html`) | GEÇTİ |
| `sac-analizi.html` | Evet (fotoğraf dahil) | **VAR** (id=kvkk-consent, required) | Evet | GEÇTİ |
| `index.html` (iletişim bölümü, satır 528-555) | Evet (isim + telefon input'ları) | **YOK** — sadece info metin: "Detaylar için Gizlilik Politikamızı inceleyebilirsiniz" | Linkler var ama CHECKBOX YOK | **KALDI — KRİTİK** |
| `greft-hesaplama.html` | Hayır (yalnızca araç + CTA) | N/A | N/A | N/A |
| `fiyat-hesaplama.html` | Hayır (yalnızca araç + CTA) | N/A | N/A | N/A |

### 2.3 KRİTİK BULGU — index.html
**Satır 543-555:** Anasayfanın "Kişisel saç analizinizi başlatın" CTA bölümünde `<input type="tel">` ve isim inputu var; form gönderilebiliyor ancak **açık rıza (KVKK md. 5/1) checkbox'ı yok**. Kişisel veri toplanan HER formda açık rıza mekanizması zorunludur. "Bilgi verildi" ifadesi "rıza alındı" yerine geçmez.

**Risk:** KVKK Kurul Kararı ile **idari para cezası** (1.000.000 TL seviyesine ulaşabilir — 2026 tarifesi). Ayrıca form hedef kitle EU/UK vatandaşlarını içeriyorsa GDPR md. 7 ihlali.

**Düzeltme:** `iletisim.html:253-255` kalıbını index.html'deki form'a eklemek.

---

## 3. Disclaimer Matrisi

| Sayfa | Tıbbi Teşhis Değil | Bireysel Sonuç | Hasta Onamı Notu | Konsültasyon Vurgusu | Durum |
|-------|:------------------:|:--------------:|:----------------:|:--------------------:|-------|
| `index.html` | Kısmen (chat widget'ında) | Yok (ana sayfa genel) | N/A | Var | ORTA — ana footer'da disclaimer eksik |
| `sac-ekimi.html` | VAR | VAR | N/A | VAR | GEÇTİ |
| `sac-analizi.html` | VAR | VAR | N/A | VAR | GEÇTİ |
| `sac-ekimi-fue.html` | VAR | VAR | N/A | VAR | GEÇTİ |
| `sac-ekimi-dhi.html` | VAR | VAR | N/A | VAR | GEÇTİ |
| `sac-ekimi-sapphire.html` | VAR | VAR | N/A | VAR | GEÇTİ |
| `fue-vs-dhi.html` | VAR | VAR | N/A | VAR | GEÇTİ |
| `vaka-fue-3200-greft.html` | VAR | VAR | VAR (hasta yazılı onamı) | VAR | GEÇTİ |
| `vaka-dhi-sakal-1800-greft.html` | VAR | VAR | VAR | VAR | GEÇTİ |
| `vaka-kas-restorasyonu-400-greft.html` | VAR | VAR | VAR | VAR | GEÇTİ |
| `oncesi-sonrasi.html` | VAR | VAR | VAR + "manipüle edilmemiş" | VAR | GEÇTİ (+) Örnek uyum |
| `fiyat.html` | Yok (uzman hekim vurgusu var ama "tıbbi tavsiye değil" cümlesi yok) | Yok | N/A | VAR | ORTA — genel disclaimer eklenebilir |
| `fiyat-hesaplama.html` | Kısmen ("tıbbi değerlendirme" geçer) | Yok | N/A | VAR | ORTA |
| `iletisim.html` | Kısmen | Yok | N/A | VAR | ORTA |
| `greft-hesaplama.html` | VAR | VAR | N/A | VAR | GEÇTİ |
| `uygun-degil.html` | VAR | VAR (kriterler değişir) | N/A | VAR | GEÇTİ |
| `gizlilik-politikasi.html` | N/A | N/A | N/A | N/A | GEÇTİ (politika sayfası) |
| `kvkk-aydinlatma.html` | N/A | N/A | N/A | N/A | GEÇTİ |
| `cerez-politikasi.html` | N/A | N/A | N/A | N/A | GEÇTİ |

**Disclaimer özeti:** 13/19 sayfada tam disclaimer var. 3 sayfada (fiyat, fiyat-hesaplama, iletisim) "tıbbi tavsiye yerine geçmez" ifadesi **eklenmeli** (zayıf — kritik değil ama best practice).

---

## 4. Before/After (Vaka Sayfaları) Kontrolü

| Sayfa | "Manipüle edilmemiş" | "Yazılı onam" | Zaman Bilgisi | Temsilî Uyarı |
|-------|:--------------------:|:-------------:|:-------------:|:-------------:|
| `vaka-fue-3200-greft.html` | Üst metinde açık değil, ancak oncesi-sonrasi.html ana sayfası "manipüle edilmemiş" garantili | VAR (satır 148, 156, 297) | VAR | — |
| `vaka-dhi-sakal-1800-greft.html` | Aynı | VAR | VAR | — |
| `vaka-kas-restorasyonu-400-greft.html` | Aynı | VAR | VAR | — |
| `oncesi-sonrasi.html` (galeri) | **VAR** — "manipüle edilmemiş, doğal ışık koşullarında çekilmiştir" (satır 43, 336) | VAR | VAR (takvim) | — |
| `sac-ekimi-sapphire.html` disclaimer (satır 487) | — | — | — | "Görseller temsilidir" VAR |

**Not:** Vaka sayfalarının üstünde placeholder ("Gercek hasta fotograflari hasta onami ile yayinlanacaktir") kullanılmış — yayın öncesi gerçek görsel eklenince, her vaka sayfasına "manipüle edilmemiş" ifadesi de eklenmeli. Şu an galeri ana sayfası (`oncesi-sonrasi.html`) bu garantiyi merkezi olarak veriyor — kabul edilebilir ama ideal değil.

**Durum:** GEÇTİ (dikkatli gözlemle). Gerçek görseller eklendiğinde her vaka sayfasına "manipüle edilmemiş" ifadesinin kopyalanması ÖNERİLİR.

---

## 5. Fiyat Sayfaları Özel Kontrol

### `fiyat.html`
| Kontrol | Durum |
|---------|-------|
| "Yazılı teklif" dili | VAR — satır 106, 113, 209, 287, 300, 303, 337, 344 (güçlü vurgu) |
| "Konsültasyon sonrası kesin fiyat" | VAR — "Kişisel fiyat konsültasyon sonrası belirlenir" |
| Ek ücret şeffaflığı | VAR — "Yazılı teklif sonrası ek ücret çıkmaz" |
| Taksit teşvik dili | ORTA — "Kredi kartı ile taksit seçenekleri mevcuttur. Detaylar konsültasyonda." → Tarafsız ve kısa. Sağlık hizmetinde taksit teşvik edici bir şekilde öne çıkarılmamış. GEÇTİ. |
| Disclaimer | VAR |

**Durum:** GEÇTİ.

### `fiyat-hesaplama.html`
| Kontrol | Durum |
|---------|-------|
| "Yazılı teklif" dili | VAR — çoklu, CTA butonu: "Yazılı Teklif Al" |
| "Tahmini / bilgi amaçlı" uyarısı | VAR — 139, 324, 388, 465 |
| Taksit bilgisi | VAR (tarafsız) |
| Kredi kartı görseli/teşvik | ORTA — satır 363-373 "Ödeme seçenekleri" bölümü var, ancak aşırı pazarlama yok. GEÇTİ. |
| Disclaimer | VAR |

**Durum:** GEÇTİ.

---

## 6. Platform Uyumluluğu Notu

### Google Ads — Site üzerinde landing page kullanımı
| Kural | Durum | Not |
|-------|-------|-----|
| Landing page'de before/after | `oncesi-sonrasi.html` ve vaka sayfaları var | **UYARI:** Google Ads'in saç ekimi kategorisinde LP'de before/after izinlidir ancak **reklam görseli ve metninde** before/after kullanılamaz. Ads kampanyası `oncesi-sonrasi.html`'e ya da vaka sayfalarına DİREKT LP olarak gönderilmemeli. Tercihen `sac-ekimi.html`, `fiyat.html`, `sac-analizi.html` LP olarak kullanılsın. |
| Garanti ifadesi yok | GEÇTİ | Tüm sayfalarda "garanti edilemez" negasyon dili var |
| Yanıltıcı bilgi | GEÇTİ | Şeffaf teknik açıklamalar |
| Sağlık sertifikası gereksinimi | TEDAVİDE gerekebilir | İstanbul saç ekimi klinikleri için Google Healthcare-related advertisers sertifikasyonu gerekmez (tıbbi cihaz/ilaç değil), ancak "Sağlıkla İlgili Hizmetler" politikası geçerli. Uyum iyi görünüyor. |

### Meta (Facebook/Instagram)
| Kural | Durum | Not |
|-------|-------|-----|
| Before/after reklam | **DİKKAT** | Meta saç ekimi reklamlarında before/after hassas. Reklam görseli için AYRI, sonra göstermeyen (sadece sonraki durumu gösteren) görsel kullanılmalı. LP için before/after kabul edilebilir. |
| "Saçınız mı dökülüyor?" formatı | Sitede yok | GEÇTİ |
| Hasta mahremiyeti | Onam vurgusu var | GEÇTİ |
| Kişisel sağlık sorusu | Chat widget'ta risk var | UYARI: Chat widget sağlık sorusu alıyorsa rıza metni gerekir (zaten disclaimer var) |

### TikTok
- Prosedür video'su varsa grafik cerrahi görüntü kullanılmamalı (şu an sitede video yok — N/A).

---

## 7. KRİTİK Bulgular (Aksiyon Listesi)

### [1] KVKK Açık Rıza — index.html Form (BLOCK)
- **Sayfa:** `index.html`, satır 528-555 (iletişim bölümü)
- **Sorun:** Form açık rıza checkbox içermiyor. Sadece bilgilendirme metni var.
- **Risk:** KVKK md. 5/1 + md. 10 ihlali. İdari para cezası riski.
- **Düzeltme:** `iletisim.html:253-256` kalıbı eklenmeli:
  ```html
  <input id="kvkk" name="kvkk" type="checkbox" required .../>
  <label for="kvkk">* Kişisel verilerimin işlenmesine ilişkin <a href="kvkk-aydinlatma.html">KVKK Aydınlatma Metni</a>'ni ve <a href="gizlilik-politikasi.html">Gizlilik Politikası</a>'nı okudum, onay veriyorum.</label>
  ```
- **Durum:** **YAYINLANAMAZ** (bu düzeltme yapılana kadar anasayfa formu aktif olmamalı)

### [2] İspat edilmesi gereken istatistiksel iddialar
- **"10.000+ başarılı operasyon"** — `index.html`, `altinsoy.html` (meta + metinde): Bu rakam doğrulanabilir olmalı (kayıt/belge). Reklam Kurulu denetiminde somut belge istenebilir. **Aksiyon:** Klinik bu rakamı destekleyecek operasyon kayıt kanıtını hazır bulundurmalı.
- **"15 yıllık cerrahi deneyim"** — Aynı şekilde hekim diploma/deneyim belgesi ile doğrulanabilir olmalı.
- **"%85-95 greft tutma oranı"** — `sac-ekimi.html:265`, `sac-ekimi-fue.html:279`, `vaka-fue-3200-greft.html:38`: Genel literatüre uygun ama siteye özgü istatistik gibi algılanabilir. "Genel tıp literatürüne göre" / "klinik çalışmalarda" gibi atıf eklenmesi tavsiye edilir. ORTA risk.

### [3] Disclaimer Genişletme
- `fiyat.html`, `fiyat-hesaplama.html`, `iletisim.html`: "Bu sayfa genel bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez" ibaresi footer-disclaimer alanına eklenmeli.
- `index.html`: Sayfa genel disclaimer'ı (sadece chat widget disclaimer var). Footer'a genel bilgilendirme notu eklenmesi yerinde olur.

### [4] Before/After Vaka Sayfalarına "Manipüle Edilmemiş" İfadesi
- `vaka-fue-3200-greft.html`, `vaka-dhi-sakal-1800-greft.html`, `vaka-kas-restorasyonu-400-greft.html`: Gerçek görseller eklendiğinde `oncesi-sonrasi.html`'deki "manipüle edilmemiş, doğal ışık koşullarında" ifadesi her vaka sayfasına kopyalanmalı.

### [5] Hekim Unvanı / İsim Placeholder
- `index.html:39, 358` ve `altinsoy.html`'de "Dr. [İsim Soyisim]" placeholder mevcut. Yayından önce **gerçek hekim adı + ISHRS/Tabip Odası kaydı doğrulanmış unvan** yazılmalı. Ruhsatsız unvan kullanımı cezai işlem nedeni.

---

## 8. Sayfa Bazlı Durum

| Sayfa | Durum | Kritik Not |
|-------|-------|-----------|
| `index.html` | **REVİZYON** | Form KVKK checkbox'ı eksik (BLOCK). Dr. placeholder. Genel disclaimer zayıf. |
| `sac-ekimi.html` | GEÇTİ | Tam uyumlu |
| `sac-analizi.html` | GEÇTİ | KVKK checkbox var, disclaimer var |
| `sac-ekimi-fue.html` | GEÇTİ | Tam uyumlu |
| `sac-ekimi-dhi.html` | GEÇTİ | Tam uyumlu |
| `sac-ekimi-sapphire.html` | GEÇTİ | "Görseller temsilidir" iyi bir ek |
| `fue-vs-dhi.html` | GEÇTİ (+) | "Ağrısız iddiaları yanlıştır" örnek uyum |
| `vaka-fue-3200-greft.html` | GEÇTİ* | Gerçek görsel + "manipüle edilmemiş" ibaresi eklenmeli (yayın öncesi) |
| `vaka-dhi-sakal-1800-greft.html` | GEÇTİ* | Aynı |
| `vaka-kas-restorasyonu-400-greft.html` | GEÇTİ* | Aynı |
| `oncesi-sonrasi.html` | GEÇTİ (+) | Galeri sayfası örnek uyum — "manipüle edilmemiş" merkezi garanti |
| `fiyat.html` | GEÇTİ | Küçük: tıbbi disclaimer eklenebilir |
| `iletisim.html` | GEÇTİ | KVKK checkbox var, JS validation var |
| `greft-hesaplama.html` | GEÇTİ | Form yok, disclaimer var |
| `fiyat-hesaplama.html` | GEÇTİ | Yazılı teklif vurgusu güçlü |
| `uygun-degil.html` | GEÇTİ (+) | Beklenti yönetimi örnek |
| `gizlilik-politikasi.html` | GEÇTİ | Yeterli |
| `kvkk-aydinlatma.html` | GEÇTİ | Özel nitelikli veri vurgusu iyi |
| `cerez-politikasi.html` | GEÇTİ | GDPR opt-in vurgusu var |

---

## 9. Öneriler (Öncelik Sırasıyla)

1. **[BLOCK]** `index.html` formu için KVKK checkbox EKLE (yayın öncesi zorunlu).
2. **[YÜKSEK]** `index.html` ve `altinsoy.html`'deki "Dr. [İsim Soyisim]" placeholder'ı gerçek, doğrulanmış hekim bilgisiyle değiştir.
3. **[YÜKSEK]** "10.000+ başarılı operasyon" ve "15 yıllık deneyim" rakamlarını belgeleyecek dosyayı klinik arşivinde hazır bulundur (Reklam Kurulu denetim belgesi).
4. **[ORTA]** `fiyat.html`, `fiyat-hesaplama.html`, `iletisim.html`, `index.html` footer'larına tıbbi disclaimer cümlesi ekle.
5. **[ORTA]** Vaka sayfalarına gerçek görsel eklenirken "manipüle edilmemiş" ifadesini kopyala.
6. **[DÜŞÜK]** "%85-95 greft tutma oranı" iddialarına literatür atıfı ekle ("genel tıp literatürüne göre").
7. **[DÜŞÜK]** Google Ads kullanılacaksa landing page olarak `sac-analizi.html` / `fiyat.html` / `sac-ekimi.html` tercih et — vaka sayfaları reklam LP olarak kullanılmasın.
8. **[DÜŞÜK]** Meta reklamları için before/after görseli içermeyen ayrı reklam creative'i hazırla; LP olarak sitenin herhangi bir sayfası kullanılabilir.

---

## 10. HANDOFF

```
HANDOFF: health-regulator → web-developer (öncelik) + copywriter (ikincil)
Sonuç: REVİZYON GEREKLİ (1 BLOCK madde)
Özet: Site genelinde regülasyon uyumu yüksek; index.html formunda KVKK checkbox eksikliği tek kritik engel.
Aksiyon:
  - web-developer: index.html satır 528-555'e KVKK checkbox ekle (iletisim.html kalıbı)
  - web-developer: Dr. [İsim Soyisim] placeholder'ını gerçek değerle güncelle (index.html, altinsoy.html)
  - copywriter: fiyat.html / fiyat-hesaplama.html / iletisim.html / index.html footer'larına "genel bilgilendirme amaçlıdır, tıbbi tavsiye yerine geçmez" cümlesi
  - account-lead: 10.000+ operasyon + 15 yıl deneyim rakamları için klinikten belge iste
Flag: index.html formu düzeltilmeden yayına çıkmasın — KVKK idari para cezası riski.
Sonraki kapı: agency-director final onay.
```

---

## 11. Self-Review

- [x] Tanıtım Yönetmeliği maddeleri kontrol edildi (karşılaştırma, garanti, abartı, istatistik, indirim, ünlü)
- [x] Hasta hakları (onam, mahremiyet) vaka sayfalarında doğrulandı
- [x] KVKK md. 5/1, md. 6/2, md. 10, md. 11 gereksinimleri karşılanıyor (1 istisna: index.html form)
- [x] GDPR opt-in mekanizması kontrol edildi (cerez-politikasi.html GEÇTİ)
- [x] Platform (Google Ads, Meta) politikaları değerlendirildi
- [x] Her "KALDI" maddesi için somut düzeltme önerisi verildi
- [x] "Bireysel sonuçlar değişkenlik gösterebilir" disclaimer'ı gerekli sayfalarda kontrol edildi
- [x] Hiçbir düzeltme YAPILMADI (yalnızca denetim raporu üretildi)
