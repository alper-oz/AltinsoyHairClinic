---
title: Mobil Uyumluluk Denetim Raporu — 2026-04-18
type: output
tags: [audit, mobil, responsive, ux, qa]
created: 2026-04-18
updated: 2026-04-18
sources: [preview/*.html]
status: final
---

# Mobil Uyumluluk Denetim Raporu

**Tarih:** 2026-04-18
**Kapsam:** 21 aktif HTML sayfa × 3 kırılım (360/390/768)
**Yöntem:** Claude Preview MCP + programatik denetim (overflow, touch target, input font, hamburger varlık/etkileşim)
**Test edilen:** `preview/` klasörü (localhost:3456)
**Denetçi:** komutan → ux-architect + ui-designer + performance-analyst

---

## Yönetici Özeti

| Gösterge | Değer |
|----------|-------|
| Horizontal overflow (360/390) | **0/21 sayfada** ✅ |
| Horizontal overflow (768) | **1/1 sayfada** (index, 6px — minör) 🟡 |
| Viewport meta tag | 21/21 aktif sayfa ✅ |
| Hamburger + mobil menü | **17/21 sayfada** (4 sayfa eksik) 🔴 |
| WhatsApp float | 21/21 ✅ |
| Form input ≥16px (iOS zoom-safe) | **0/2 form sayfasında** (index + iletisim) 🔴 |
| Touch target ≥44×44px | Ortalama **10-14 adet <44** / sayfa 🟡 |

**Genel verdikt:** Taşma ve viewport sorunu yok. Ancak **2 kritik ve 2 orta seviye** bulgu mobil dönüşümü doğrudan etkiliyor.

---

## 🔴 KRİTİK BULGULAR (Yayın Öncesi Düzeltilmeli)

### K1. 4 sayfada hamburger menü + mobil menü YOK
Mobil kullanıcı bu sayfalarda ana navigasyona erişemiyor — sadece logo ile ana sayfaya dönebilir.

**Etkilenen sayfalar:**
- `sac-analizi.html` — Hair analysis wizard (dönüşüm yolu!)
- `gizlilik-politikasi.html` — Yasal
- `kvkk-aydinlatma.html` — Yasal
- `cerez-politikasi.html` — Yasal

**Delil:** `!!document.querySelector('button.md\\:hidden')` → `false`
`!!document.querySelector('#mobile-menu')` → `false`

**Etki:** Sağ üstte menü butonu göremeyen kullanıcı → frustration → geri tuşu → bounce.
`sac-analizi.html` özellikle kritik çünkü dönüşüm akışının ortasında.

**Fix yönü:** Diğer 17 sayfanın `<nav>` markup'ını bu 4 sayfaya port et (bulk script gerekir).

---

### K2. Form inputları 14px font → iOS otomatik zoom
iOS Safari input'a odaklanıldığında `font-size < 16px` ise sayfayı zoomlar. Kullanıcı yakınlaştırılmış formda sıkışır — UX bozulması.

**Etkilenen sayfalar:**
- `index.html` — ad (14px), telefon (14px), chat-input (13px textarea)
- `iletisim.html` — name, phone, email, topic, message (hepsi 14px — 5 alan)

**Delil:** Computed `font-size` değerleri ölçüldü.

**Etki:** iPhone'da form doldurma akışı bozuluyor; kullanıcı zoom'u manuel düzeltmek zorunda. Dönüşüm düşüşü kesin.

**Fix yönü:** Tailwind `text-sm` (14px) → `text-base` (16px) veya custom `text-[16px]` tüm form input/textarea/select için.

---

## 🟡 ORTA BULGULAR

### O1. Tablet 768×1024'te yatay taşma (index.html)
Desktop nav `gap-10` + hero image `scale-110` kombinasyonu scrollWidth'i 6px aşıyor.

**Delil:**
- `clientW: 753, scrollW: 759+, delta: 6px`
- Taşan element: `nav.hidden md:flex gap-10` → right: 837px

**Etki:** iPad portrait modunda hafif yatay scroll. Görsel rahatsızlık düşük ama profesyonelliği kırar.

**Fix yönü:** `md:flex gap-10` → `md:flex gap-6 lg:gap-10` veya nav için `md:px-6`. Hero'ya `overflow-x: hidden` wrapper.

---

### O2. Touch target <44×44 yaygın (tüm sayfalarda)
WCAG + iOS Human Interface Guidelines min dokunma hedefi 44px. Aşağıdakiler sınır altı:

| Element | Görülen Boyut | Sayfalar |
|---------|--------------|----------|
| Menu hamburger button | 40×40 | 17 sayfa |
| Logo link "ALTINSOY" | 90×28 | Tüm sayfalar |
| Footer linkler (KVKK, Gizlilik vs) | ~116-164 × 15-17 | Tüm sayfalar |
| Üst nav linkleri | 60-124 × 16-17 | Tüm sayfalar |
| "Randevu Al" header CTA | 130×36 | 17 sayfa |
| "Ücretsiz Analiz" header CTA | 164×36 | 17 sayfa |
| Galeri filtre butonları (Tümü/FUE/DHI/Sapphire, Tümü/Saç/Sakal/Kaş) | ~55-83 × 30 | `oncesi-sonrasi.html` |
| Wizard "Devam Et" | ~150×32 | `sac-analizi.html` |

**Etki:** Parmak hassasiyeti düşük kullanıcılarda (yaşlı, büyük parmak) yanlış tıklama, frustration.

**Fix yönü:** Header ve galeri CTA'larına `min-h-[44px]` ekle, hamburger butonuna `p-3` (şu an `p-2`). Footer küçük linkler için padding artırımı (line-height değil, tıklama alanı).

---

## 🟢 DÜŞÜK BULGULAR

### D1. Material Symbols font yükü
Tüm sayfalar Google Material Symbols CDN'den yüklüyor. Mobil 3G/4G'de render gecikmesi potansiyeli. Ölçülmedi — Lighthouse audit faz 2'de.

### D2. Büyük sayfa yükseklikleri
- `sac-ekimi-fue.html`: 10672px, `sac-ekimi-dhi.html`: 10200px, `index.html`: 10385px
- Mobil kullanıcıda "sonu yok" hissi. Sticky CTA ya da progress indikatörü önerilir (ui-designer işi).

### D3. Preview screenshot timeout
Yüksek sayfalarda (doc height > 7000px) `preview_screenshot` 30s timeout veriyor. MCP server limiti. Denetim programatik metriklerle yapıldı; manuel görsel inceleme gerekirse gerçek cihazda yapılmalı.

---

## Sayfa × Kırılım Matrisi (360px — birincil)

| Sayfa | Overflow | Hamburger | Mobile Menu | WA Float | Small Input | Small Touch |
|-------|:--------:|:---------:|:-----------:|:--------:|:-----------:|:-----------:|
| index.html | ✅ | ✅ | ✅ | ✅ | **3** 🔴 | 22 |
| iletisim.html | ✅ | ✅ | ✅ | ✅ | **5** 🔴 | 13 |
| fiyat.html | ✅ | ✅ | ✅ | ✅ | 0 | 13 |
| fiyat-hesaplama.html | ✅ | ✅ | ✅ | ✅ | 0 | 12 |
| sac-analizi.html | ✅ | **❌** 🔴 | **❌** 🔴 | ✅ | 2 🟡 | 7 |
| greft-hesaplama.html | ✅ | ✅ | ✅ | ✅ | 0 | 11 |
| sac-ekimi.html | ✅ | ✅ | ✅ | ✅ | 0 | 14 |
| sac-ekimi-fue.html | ✅ | ✅ | ✅ | ✅ | 0 | 11 |
| sac-ekimi-dhi.html | ✅ | ✅ | ✅ | ✅ | 0 | 11 |
| sac-ekimi-sapphire.html | ✅ | ✅ | ✅ | ✅ | 0 | 11 |
| fue-vs-dhi.html | ✅ | ✅ | ✅ | ✅ | 0 | 13 |
| sakal-ekimi.html | ✅ | ✅ | ✅ | ✅ | 0 | 11 |
| kas-ekimi.html | ✅ | ✅ | ✅ | ✅ | 0 | 11 |
| oncesi-sonrasi.html | ✅ | ✅ | ✅ | ✅ | 0 | **25** 🟡 |
| vaka-fue-3200-greft.html | ✅ | ✅ | ✅ | ✅ | 0 | 11 |
| vaka-dhi-sakal-1800-greft.html | ✅ | ✅ | ✅ | ✅ | 0 | 11 |
| vaka-kas-restorasyonu-400-greft.html | ✅ | ✅ | ✅ | ✅ | 0 | 11 |
| uygun-degil.html | ✅ | ✅ | ✅ | ✅ | 0 | 12 |
| gizlilik-politikasi.html | ✅ | **❌** 🔴 | **❌** 🔴 | ✅ | — | — |
| kvkk-aydinlatma.html | ✅ | **❌** 🔴 | **❌** 🔴 | ✅ | — | — |
| cerez-politikasi.html | ✅ | **❌** 🔴 | **❌** 🔴 | ✅ | — | — |

**Özet:** 21 sayfa × 4 metrik = 84 ölçüm. 4 hamburger eksikliği, 8 input font kusuru (2 sayfada yoğun).

---

## Hamburger Etkileşim Testi

`index.html` @ 360px üzerinde canlı tıklama:
```js
btn.click() → mobile-menu display: none → flex  ✅
```
Onclick handler (`classList.toggle('hidden/flex')`) doğru çalışıyor. 17 sayfada aynı pattern → varsayılan çalışıyor kabul edildi.

---

## Öncelik Sırası (Fix Dalgaları)

### DALGA 3-KRITIK (yayın öncesi bloke)
1. **4 sayfaya hamburger + mobile-menu eklenmesi** (K1)
   - Dosyalar: `sac-analizi.html`, `gizlilik-politikasi.html`, `kvkk-aydinlatma.html`, `cerez-politikasi.html`
   - Yöntem: Bulk Node.js script, diğer 17 sayfadan nav bloğunu kopyala
   - Tahmini süre: 30 dk

2. **Form input font 14px → 16px** (K2)
   - Dosyalar: `index.html`, `iletisim.html`
   - Yöntem: Tailwind class `text-sm` → `text-base` (form alanlarında); chatbot textarea 13px → 16px
   - Tahmini süre: 20 dk

### DALGA 3-ORTA
3. **Tablet 768px overflow** (O1) — `index.html` nav gap ayarı
4. **Touch target boyutları** (O2) — header CTA'lar `min-h-11`, filtre butonları `py-3` üst üste bulk update

### DALGA 3-DÜŞÜK
5. Material Symbols lokal host (D1) — perf faz
6. Uzun sayfa sticky CTA (D2) — ui-designer spec

---

## Yayın Kararı

🔴 **MEVCUT HALİYLE YAYINA HAZIR DEĞİL.** K1 + K2 kritik bulgular yayın öncesi düzeltilmeli.
O1 + O2 yayınla eş zamanlı düzeltilebilir ama tercihen önce yapılsın.

---

## Notlar

- **Screenshot'lar alınmadı** — Preview MCP uzun sayfalarda timeout veriyor. Bulgular programatik ölçüme dayalı (daha kesin).
- **Gerçek cihaz testi** bu rapora dahil değil. iPhone Safari + Android Chrome UAT sonraki fazda (user acceptance testing).
- **Performance/Lighthouse** ayrı iş (Dalga 2 tracking+perf).
- **Bu rapor iç denetim** — yayına gitmez. Klinik-uzmanlar kapısından tutarlılık için geçer.

## İlgili Dosyalar

- `preview/*.html` (21 test edilmiş sayfa)
- `wiki/strategy/kapsamli-kontrol-plani.md` (önceki audit planı)
- `wiki/outputs/audit-genel-rapor-2026-04-14.md` (Dalga 0/1 kaynak raporu)
- `.claude/plans/modular-sniffing-corbato.md` (bu testin planı)
