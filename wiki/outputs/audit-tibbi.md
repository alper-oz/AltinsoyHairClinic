---
title: Tıbbi & Hasta Psikolojisi Audit
type: output
tags: [audit, trichologist, patient-psych]
created: 2026-04-17
updated: 2026-04-17
status: final
auditors: [trichologist, patient-psychologist]
scope: 18 HTML sayfası (altınsoy/preview/)
---

# Tıbbi & Hasta Psikolojisi Audit Raporu

Denetçi: trichologist + patient-psychologist (çift imza)
Kapsam: 18 HTML sayfa (not: preview klasöründe ayrıca eski bir `altinsoy.html` mevcut — scope dışı ama paralel bulgular referans için paylaşıldı).

## Özet

- **Kırmızı çizgi ihlali (yayın bloker):** 0 — Denetlenen 18 sayfada hiçbir "garantili/ağrısız/hiç iz kalmaz/%100 başarı/kesilmeden ekim/tek seansta sınırsız/hemen sonuç" ihlali bulunmadı. Aksine bu ifadelerin her biri en az bir sayfada (`sac-ekimi-sapphire.html`, `fue-vs-dhi.html`, `sac-ekimi-fue.html`) aktif olarak **reddedilmiş** ve dürüst karşılıkları verilmiş.
- **Tutarsızlık (tıbbi):** 2 adet düşük-orta risk (bkz. Yüksek Öncelik).
- **Faz uyumsuzluğu:** 3 adet orta risk (Faz 1 ve Faz 5 kapsamı eksik).
- **Beklenti yönetimi:** 1 adet (index.html hero'da disclaimer zayıf) orta risk.
- **Genel tıbbi kalite:** **Yüksek.** Trichologist red-line listesinin her maddesi bilinçli şekilde içeride işlenmiş, rakiplerin yaptığı tipik yalanlar (devrimsel, ağrısız, kesilmeden ekim) aktif olarak çürütülmüş. Bu bir farklılaştırıcıdır.
- **Hasta psikolojisi:** Ton-akışı (empati → bilgi → CTA) büyük oranda kurulmuş; ama "Faz 5 post-op rahatlatma" hattı zayıf (blog yok), "Faz 1 inkâr" aşamasına yönelik eğitsel içerik de eksik.

---

## KRİTİK Bulgular (yayın bloker)

**Yok.** Hiçbir sayfa, trichologist'in 7 kırmızı çizgisinden birini ihlal etmiyor. Yayınlanabilir durumda.

Özellikle takdir edilmesi gereken pozitif sinyaller:

| Sayfa | İyi uygulama |
|---|---|
| `sac-ekimi-sapphire.html` (L176) | "Bazı klinikler Sapphire FUE'yi 'yeni nesil teknoloji' olarak pazarlar. Gerçekte sadece bıçak materyali farklıdır." — trichologist'in "Sapphire devrimsel değil" mesajı net. |
| `sac-ekimi-sapphire.html` (L447) | "'Ağrısız işlem' ifadesi tıbbi olarak doğru değildir." — red-line aktif reddediliyor. |
| `fue-vs-dhi.html` (L330) | "'FUE ağrısız' veya 'DHI ağrısız' iddiaları yanlıştır." — red-line aktif reddediliyor. |
| `sac-ekimi-fue.html` (L275) | "Tamamen iz kalmaz demek doğru değildir." — red-line aktif reddediliyor. |
| `uygun-degil.html` | Kontrendikasyonlar tıbbi olarak doğru: alopesi areata, 18 yaş altı, donor yetersiz, kontrolsüz diyabet, kan pıhtılaşma bozukluğu, keloid, otoimmun skatrizyel alopesi. Trichologist standardına uygun. |
| Tüm sayfalarda (şablon) | "Hiçbir teknik sonucu garanti edilemez / bireysel sonuçlar değişkenlik gösterebilir" disclaimer'ı footer-altı küçük metin olarak tutarlı. |

---

## YÜKSEK Öncelik

### H1. Greft tutma oranı — kullanım sıklığı düşük, iki yerde zımni absolute
- `sac-ekimi-fue.html` L279, `sac-ekimi.html` L265, `vaka-fue-3200-greft.html` L104, `sac-ekimi-sapphire.html` L373/L374'te "%85-95" doğru formülle geçiyor.
- Ancak **DHI sayfası** (`sac-ekimi-dhi.html`) içinde greft tutma oranı için SPESİFİK bir aralık verilmiyor — sadece "şok dökülme normal" açıklaması var. DHI hastası karşılaştırma yapamıyor.
- **Öneri:** DHI sayfasına da %85-95 aralığı + "bireysel değişir" notu eklenmeli. Teknikler arası eşit şeffaflık.

### H2. Vaka sayfalarında "Nihai Sonuç" süresi teknik şablonla uyumsuz
- `vaka-dhi-sakal-1800-greft.html` L247: "10-12 ay" — sakal için biyolojik olarak makul AMA genel şablon "12-18 ay" ile çelişiyor.
- `vaka-kas-restorasyonu-400-greft.html` L261: "8-12 ay" — kaş için makul.
- `vaka-fue-3200-greft.html` L240: "12-18 ay" — saç için doğru.
- **Trichologist verdikti:** Tıbben doğru (sakal/kaş kıl döngüsü saçtan farklı, daha kısa). Ama hasta **karşılaştırma yaptığında** kafa karışıklığı yaratabilir. Her vakada minik bir açıklama olmalı: *"Sakal kıl döngüsü saçtan daha kısadır — bu nedenle nihai sonuç süresi saç ekiminden farklıdır."* 
- **Verdikt:** YUMUŞAT — tek satır parentez eklemek yeter.

### H3. Faz 1 (İnkâr & Farkındalık) içeriği eksik
- Hiçbir sayfa saf **bilgilendirme/empati** odaklı değil. En "yumuşak" sayfa `sac-analizi.html` ama o bile form odaklı (Faz 4 ürünü gibi).
- Patient-psych skilline göre Faz 1'de "satış yok, bilgi + empati + normalleştirme" gerekir. "Saç dökülme nedenleri / Kadında saç dökülmesi / Stres ve saç dökülmesi / Saç döküldüğümü yeni fark ettim" blog/konsept sayfası yok.
- **Etki:** Faz 1 arama trafiği (en kalabalık grup) CTA'ya erken maruz kalıyor → kaçış.
- **Öneri (non-blocker):** Blog/rehber serisine 3-5 Faz 1 pillar içerik planla. Bu auditin scope'u 18 sayfa — ama eksiği işaretlemek görev.

### H4. Faz 5 (Post-Op) rahatlatma hattı zayıf
- Şok dökülme açıklaması 2-4 hafta formatında çok sayıda yerde **içerik içine gömülü** olarak geçiyor (iyi).
- Ancak **dedicated** bir "Post-op Yol Haritası / Şok Dökülme Paniği / 1. Ay Ne Beklemeli" sayfası yok. Ameliyat olmuş hastayı Google'a kaçırıyoruz.
- **Öneri (non-blocker):** Post-op timeline içeren rehber sayfası eklensin. Mevcut hastaları sadakat + referans kanalına çeviriyor.

### H5. index.html hero — disclaimer zayıf
- Hero'da "10.000+ başarılı operasyon, 4.9/5, ISHRS" gibi güçlü sosyal kanıt var — iyi.
- Ama ilk katlamada "bireysel sonuçlar değişkenlik gösterebilir" veya "saç ekimi cerrahi işlemdir, garanti edilemez" ifadesi YOK. Alt sayfalarda disclaimer footer'da küçük puntoyla var.
- **Verdikt (trichologist):** YUMUŞAT — fold üstü bir "ücretsiz analiz → kişisel değerlendirme" mikrokopya disclaimer-benzeri iş yapar ancak mevcut haliyle yetersiz. Health-regulator kalite kapısı muhtemelen flag basar.

---

## Tutarlılık Tablosu

| Değer | Beklenen (Trichologist) | Bulunan | Uyum Durumu | Sayfalar |
|---|---|---|---|---|
| Şok dökülme | 2-4 hafta | 2-4 hafta | ✅ TAM | index, sac-ekimi, sac-ekimi-fue, sac-ekimi-dhi, sac-ekimi-sapphire, oncesi-sonrasi, fue-vs-dhi, vaka-fue-3200, vaka-dhi-sakal, vaka-kas |
| İlk yeni çıkış | 3-4. ay | 3-4. ay | ✅ TAM | index, sac-ekimi, tüm teknik sayfaları, vakalar |
| Belirgin yoğunlaşma | 6-8. ay | 6-8. ay | ✅ TAM | index, sac-ekimi.*, oncesi-sonrasi |
| Nihai sonuç (saç) | 12-18 ay | 12-18 ay | ✅ TAM | index, sac-ekimi, fue, dhi, sapphire, fue-vs-dhi, oncesi-sonrasi, vaka-fue-3200 |
| Nihai sonuç (sakal) | ~10-12 ay (biyolojik olarak) | 10-12 ay | ✅ DOĞRU ama açıklama yok | vaka-dhi-sakal |
| Nihai sonuç (kaş) | ~8-12 ay | 8-12 ay | ✅ DOĞRU ama açıklama yok | vaka-kas |
| FUE süresi | 4-6 saat | 4-6 saat | ✅ TAM | fue-vs-dhi, sac-ekimi, sac-ekimi-fue, sac-ekimi-sapphire |
| DHI süresi | 5-7 saat | 5-7 saat | ✅ TAM | fue-vs-dhi, sac-ekimi, sac-ekimi-dhi |
| Greft tutma | %85-95 | %85-95 | ⚠️ KISMİ | FUE/Sapphire/vaka-FUE'de var; DHI sayfasında yok (H1) |
| Sapphire "devrimsel değil" mesajı | Korunmuş olmalı | Korunmuş + aktif çürütülmüş | ✅ GÜÇLÜ | sac-ekimi-sapphire L176, L471, sac-ekimi L184 |
| "Ağrısız" reddi | Tıbbi dille ret | Ret mevcut ve net | ✅ GÜÇLÜ | fue-vs-dhi L330, sac-ekimi-sapphire L447 |
| "Hiç iz kalmaz" reddi | Ret | Ret mevcut | ✅ | sac-ekimi-fue L275 |
| Kontrendikasyon listesi | 7 temel başlık | Hepsi + alt durumlar | ✅ TAM | uygun-degil |
| Güvenli üst sınır greft | ~4.500-5.500 | 4.500-5.500 | ✅ | greft-hesaplama L454 |
| 18 yaş altı ret | Kesin | Kesin | ✅ | uygun-degil L160 |

---

## Kırmızı Çizgi Global Tarama Sonucu

| Kelime/İfade | Eşleşme | Bağlam | Verdikt |
|---|---|---|---|
| "garantili" / "garanti" | 7 satır | Hepsinde "garanti edilemez / garanti değil / garanti niteliği taşımaz" — ret bağlamı | ✅ TEMİZ |
| "ağrısız" / "acısız" | 4 satır | Tümü "ağrısız iddiası yanlıştır / tıbbi olarak doğru değildir" — ret bağlamı | ✅ TEMİZ |
| "hiç iz" / "tamamen iz" | 1 satır | "tamamen iz kalmaz demek doğru değildir" — ret bağlamı | ✅ TEMİZ |
| "devrimsel" | 0 | — | ✅ TEMİZ |
| "kesilmeden ekim" | 0 | — | ✅ TEMİZ |
| "%100 başarı" / "%100" | 1 satır | "%100 normal" (şok dökülme hakkında — süreç tanımlaması, başarı iddiası değil) | ✅ TEMİZ (ama daha nötr "tamamen normal" ifadesi tercih edilebilir — düşük öncelikli stil notu) |
| "kesin sonuç" | 0 (farklı bağlamlarda "kesin fiyat" var, tıbbi iddia yok) | — | ✅ TEMİZ |
| "tek seansta sınırsız" | 0 | Aksine 4.500-5.500 üst sınır vurgulanmış | ✅ TEMİZ |
| "hemen sonuç" | 0 | Her yerde zaman çizelgesi var | ✅ TEMİZ |
| "mucize" | 0 | — | ✅ TEMİZ |

---

## Sayfa Bazlı Skorlar (1-5)

| Sayfa | Tıbbi Doğruluk | Hasta Uygunluğu | Hedef Faz | Faz Uyumu | Genel |
|---|---:|---:|---|---:|---:|
| index.html | 4 | 4 | 2-3-4 hibrit | 4 | **4.0** |
| sac-ekimi.html | 5 | 5 | 2 | 5 | **5.0** |
| sac-analizi.html | 5 | 5 | 3-4 | 5 | **5.0** |
| sac-ekimi-fue.html | 5 | 4 | 2-3 | 4 | **4.5** |
| sac-ekimi-dhi.html | 4 (H1: greft tutma yok) | 4 | 2-3 | 4 | **4.0** |
| sac-ekimi-sapphire.html | 5 (örnek gösterilecek kalite) | 5 | 3 | 5 | **5.0** |
| fue-vs-dhi.html | 5 | 5 | 3 | 5 | **5.0** |
| vaka-fue-3200-greft.html | 5 | 5 | 2-3 | 5 | **5.0** |
| vaka-dhi-sakal-1800-greft.html | 4 (H2: süre açıklaması yok) | 4 | 3 | 4 | **4.0** |
| vaka-kas-restorasyonu-400-greft.html | 4 (H2) | 4 | 3 | 4 | **4.0** |
| oncesi-sonrasi.html | 5 | 5 | 2-3 | 5 | **5.0** |
| fiyat.html | 5 | 5 | 3-4 | 5 | **5.0** |
| fiyat-hesaplama.html | 5 | 5 | 3-4 | 5 | **5.0** |
| iletisim.html | 5 | 4 (Faz 4 — frictionless OK, empati az) | 4 | 4 | **4.5** |
| greft-hesaplama.html | 5 | 4 | 2-3 | 4 | **4.5** |
| uygun-degil.html | 5 (örnek gösterilecek kalite) | 5 | 2 | 5 | **5.0** |
| gizlilik-politikasi.html | N/A (hukuki) | 5 | — | 5 | **5.0** |
| kvkk-aydinlatma.html | N/A (hukuki) | 5 | — | 5 | **5.0** |
| cerez-politikasi.html | N/A (hukuki) | 5 | — | 5 | **5.0** |
| **Ortalama (tıbbi 15 sayfa)** | **4.73** | **4.60** |  |  | **4.67** |

---

## Faz Haritası (Patient-Psychologist)

| Faz | Durum | Kapsayan sayfalar | Yeterlilik |
|---|---|---|---|
| **Faz 1 – İnkâr & Farkındalık** | Saç dökülmesi nedenleri, normalleştirme, empati — satış yok | Yok (en yakın: `sac-analizi.html` ama form odaklı) | ❌ Eksik (H3) |
| **Faz 2 – Araştırma** | Teknik bilgi, süreç, şeffaflık | `sac-ekimi.html`, `sac-ekimi-fue/dhi/sapphire.html`, `uygun-degil.html`, `greft-hesaplama.html` | ✅ Güçlü |
| **Faz 3 – Karşılaştırma** | Teknik kıyaslama, vakalar, fiyat | `fue-vs-dhi.html`, `oncesi-sonrasi.html`, 3 vaka, `fiyat.html`, `fiyat-hesaplama.html` | ✅ Güçlü |
| **Faz 4 – Karar** | Frictionless iletişim, son güven | `iletisim.html`, `sac-analizi.html`, WhatsApp CTA'lar | ✅ Yeterli |
| **Faz 5 – Post-op** | Şok dökülme paniği, 1. ay, rutin | Dedicated sayfa yok; gömülü FAQ'lar var | ⚠️ Zayıf (H4) |

**Ton-akışı değerlendirmesi:** Teknik sayfalarda (FUE, DHI, Sapphire, fue-vs-dhi, uygun-degil) "empati → bilgi → CTA" akışı düzgün kurulmuş. `uygun-degil.html` özellikle örnek gösterilecek düzeyde — "sizi ikna etmeye çalışmayız" cümlesi güven inşası için güçlü.

**Korku adresleme kontrolü:**
- Ağrı → Adresli (fue-vs-dhi L330, sac-ekimi-sapphire L447 + her sayfada lokal anestezi açıklaması)
- Doğallık → Adresli (index hero "Yapaylık korkusuna son", vaka-dhi-sakal "doğal yapıyı taklit")
- İz → Adresli (sac-ekimi-fue L275 "mikro izler kalır, tamamen iz kalmaz demek doğru değildir")
- Süre → Adresli (her teknik sayfasında 4-6 saat/5-7 saat, nihai 12-18 ay)
- Tutmazsa → Kısmen (FAQ'larda var, %85-95 geçiyor; DHI sayfasında eksik — H1)
- Pahalı mı → Adresli (`fiyat.html` şeffaf aralık, taksit, ücretsiz konsültasyon)

---

## Beklenti Yönetimi Kontrolü

| Kriter | Durum |
|---|---|
| "Gerçekçi beklenti" ifadeleri | ✅ Tutarlı (`greft-hesaplama`, `uygun-degil`, `sac-ekimi-sapphire`, `oncesi-sonrasi` sayfalarında geçiyor) |
| Abartılı vaat | ❌ Yok |
| "Bireysel sonuçlar değişkenlik gösterebilir" disclaimer | ✅ 14/15 tıbbi sayfada var; `index.html` hero'da zayıf (H5) |
| Zaman çizelgesi her teknik sayfasında | ✅ Var |
| "Saç ekimi yeni saç üretmez, mevcut kaynağı yeniden dağıtır" | ✅ `uygun-degil.html` L255 (kritik trichologist mesajı) |

---

## Öneriler

### Zorunlu (yayın öncesi)
Yok — KRİTİK bulgu olmadığı için yayın bloker yok.

### Yüksek öncelik (yayın sonrası ilk sprint)
1. **H1 – DHI sayfasına %85-95 greft tutma aralığı ekle.** FUE/Sapphire ile paritete getir.
2. **H5 – index.html hero/fold üstüne güven disclaimer kısaltması ekle.** Örn. *"Her saç ekimi kişiseldir — sonuçlar bireysel faktörlere bağlıdır."* CTA'nın altına mikrokopya olarak.
3. **H2 – Sakal/kaş vakalarına "bu bölgede nihai sonuç saç ekiminden farklı" parantezi ekle.** Şablon tutarlılığı.

### Orta öncelik (sonraki içerik sprinti)
4. **H3 – Faz 1 pillar içerik planı:** "Saç Dökülme Nedenleri", "Kadında Saç Dökülmesi", "Stres ve Saç", "Minoxidil ve Finasterid Nedir", "Saç Ekimi Zamanı mı — Ölçütler". Strategy-planner + copywriter handoff.
5. **H4 – Post-Op Yol Haritası sayfası:** "1. Hafta / 2-4. Hafta Şok Dökülme / 3. Ay / 6. Ay / 12. Ay Ne Beklenmeli". Mevcut hasta için sadakat, yeni hasta için güven sinyali.

### Düşük öncelik (stil/dil)
6. `vaka-fue-3200-greft.html` L213'teki "%100 normal" ifadesini "tamamen normal" ile değiştir. Red-line listesinde olmasa da "%100" ifadesi refleksle dikkat çekiyor; nötrleştirmek kolay.

---

## Handoff

```
HANDOFF: trichologist + patient-psychologist → agency-director
Dosya: wiki/outputs/audit-tibbi.md
Verdikt: KALİTE-KAPISI-GEÇTİ (koşulsuz yayın onayı)
Özet: 18 sayfada kırmızı çizgi ihlali yok; 5 yüksek/orta öncelik iyileştirme önerildi (H1-H5).
Aksiyon:
  - copywriter: H1 (DHI greft tutma), H2 (vaka parantezleri), H5 (index hero mikrokopya), Düşük-6 (%100 → tamamen)
  - strategy-planner + copywriter: H3 (Faz 1 pillar planı), H4 (Post-op rehber sayfa)
  - health-regulator: Kalan regülasyon kapısı için ayrı denetim (bu audit sadece tıbbi+psikolojik)
Flag: 
  - İstisnai pozitif: Sapphire "devrimsel değil" mesajı ve "ağrısız yanlıştır" dürüstlüğü sektörde nadir — bu farklılaşmayı marka mesaj mimarisine taşı.
  - Faz 1 ve Faz 5 içerik boşluğu stratejik fırsat, risk değil. Blog roadmap'e ekle.
```
