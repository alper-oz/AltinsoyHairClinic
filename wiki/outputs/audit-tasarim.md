---
title: Tasarım & UX Audit
type: output
tags: [audit, ui, ux, design-system]
created: 2026-04-17
---

# Tasarım & UX Audit Raporu

**Denetim kapsamı:** `altınsoy/preview/` altındaki 18 HTML sayfa (altinsoy.html HARİÇ).
**Denetçi rolleri:** ui-designer + ux-architect.
**Metod:** Statik kod taraması + component/pattern karşılaştırması.

## Özet
- **Tasarım tutarsızlığı:** 7 adet (nav varyasyonu, footer farkı, trust-bar yazılım dili, breadcrumb dağınıklığı, spacing tutarsızlığı, CTA buton varyantları, copyright yazım dili)
- **UX sorunu:** 9 adet (mobilde hamburger YOK, breadcrumb 2/18 sayfada, "Uzmanlık" dead link, nav anchor karışıklığı, aktif-link işaretleme tutarsız, fiyat/greft hesaplama CTA eksik, dropdown "konu" alanı iletişimde, KVKK tüm formlarda olsa da metin tutarsız, iletişim formunda 5+ alan)
- **Kritik accessibility sorunu:** 3 (10-11px çok sık kullanılıyor — trust bar, footer copyright, fine print; text-on-surface/60 opaklıklarda kontrast marjinal; mobilde navigasyon eksikliği → tüm site mobil friksiyon)

## 1. Design System Tutarlılık Matrisi

| Element | Tutarlı? | Sayfa Sapmaları / Not |
|---|---|---|
| Tailwind config (primary #e9c176, bg #131313, surface #131313) | ✅ Evet | 18/18 sayfa aynı token seti (fiyat-hesaplama'da ek `btn-primary` gradient util tanımlı) |
| fontFamily: Noto Serif headline + Manrope body | ✅ Evet | 18/18 sayfada `fontFamily: { "headline":["Noto Serif"], "body":["Manrope"], "label":["Manrope"] }` |
| Google Fonts link seti | ✅ Evet | Aynı query string her sayfada |
| on-background #e5e2e1, on-primary #412d00 | ✅ Evet | Tüm token'lar identik |
| `primary-container #c5a059` | ⚠️ Kısmen | Legal sayfalarda (cerez, gizlilik, kvkk) tanımlanmamış — sadece `primary` var |
| `surface-dim`, `surface-container-lowest` token'ları | ❌ Tutarsız | index.html'de var, legal sayfalarda yok, vakada kısmen |
| H1 boyutu | ⚠️ Kısmen | index: `text-6xl md:text-8xl lg:text-9xl` / sac-analizi: `text-5xl md:text-7xl` / legal: `text-3xl md:text-4xl` — içerik türüne göre farklı, kabul edilebilir ama vaka sayfaları arasında eşit olmalı |
| CTA buton: `bg-primary text-on-primary px-6 py-2.5 uppercase tracking-widest` | ✅ Genel | İki varyant: `cta-premium` (index) ve standart (diğerleri). Görsel sonuç neredeyse aynı ama utility tekrar ediyor |
| Material Symbols (ikon seti) | ✅ Evet | Hepsinde `material-symbols-outlined` kullanılıyor |
| Icon fill/weight varyasyonu | ⚠️ Kısmen | sac-analizi'nde `font-variation-settings: 'FILL' 1, 'wght' 200` özel — diğer sayfalarda override yok, default dolu (FILL 0). Hover state'te tutarsızlık riski |
| Dark theme | ✅ Evet | 18/18 sayfa aynı #131313 bg, aynı #e5e2e1 on-surface |
| 8px grid spacing | ⚠️ Kısmen | Ağırlıklı 8px (py-16/20/24) ama `py-32` (sac-ekimi-dhi, sapphire 10 kez) ve gizli `gap-3/gap-4/gap-8` karışımı mevcut |
| Section padding pattern | ❌ Tutarsız | `py-16`, `py-20`, `py-24`, `py-32` hepsi kullanımda — tek bir section rhythm tanımlı değil |
| Border radius (rounded-sm default) | ✅ Evet | `rounded-sm` genel, `rounded-full` WhatsApp flotantta, `rounded-2xl` bazı kartlarda — niyet uyumlu |

### Tipografi Bulguları
- **Body font-size 16px (tailwind text-base) default** — OK, ama `text-sm` (14px) ve `text-xs` (12px) çok baskın içerik gövdesinde.
- **`text-[10px]`** ciddi biçimde yaygın: trust bar etiketleri, footer copyright, badges, step labels. 10px = WCAG AA body metin minimum sınırının altı.
- **`text-[11px]`** da sıkça (KVKK etiketleri, fine print). Okunabilirlik riski var.
- **`text-on-surface/60`, `/70`, `/80`** opaklık seviyeleri çoklu. `/60` + 11px kombinasyonu → kontrast oranı muhtemelen 4.5:1 altı (özellikle `text-on-surface-variant/60 text-[10px]` copyright satırı).

### Renk Kullanımı
- Primary `#e9c176` altın — güven + lüks hissi, sağlık sektörü için kabul edilebilir (kaçınılması gereken parlak sarı değil).
- `linear-gradient(135deg,#e9c176,#c5a059)` CTA ve floating'lerde standart.
- Hover: `hover:bg-primary-container` veya `hover:text-primary` — tutarlı.
- Status color: `#6ee7a0` (open), `#e0704f` (closed) — sadece iletişimde, başka sayfada tekrar yok; design token değil inline.

## 2. Navigation Analizi

| Sayfa | Nav var? | Nav link seti | Aktif link işaretli? | Breadcrumb | Logo → index? | Not |
|---|---|---|---|---|---|---|
| index.html | ✅ | Uzmanlık / Teknikler / Dönüşümler / Fiyat / SSS / İletişim + CTA | "Uzmanlık" (ama `href="#"` **DEAD LINK**) | ❌ | ❌ Logo `<div>` (link yok) | Sapma: nav link seti daha geniş. `#teknikler`, `#sss` anchor'ları sadece index'te çalışır |
| sac-analizi.html | ✅ | Teknikler / Sonuçlar / Analiz / İletişim | "Analiz" (primary + border-b) | ❌ | ✅ | Mobilde "← Ana Sayfa" inline link (hamburger yok) |
| iletisim.html | ✅ | Standart | ⚠️ Kontrol edilmedi detay | ❌ | ✅ | Touch-friendly but no mobile menu |
| fiyat.html | ✅ | Teknikler / Sonuçlar / Fiyat / İletişim | "Fiyat" (span, not link) | ❌ | ✅ | Nav link seti index'ten DAR (Uzmanlık/Dönüşümler/SSS yok) |
| sac-ekimi.html | ✅ | Standart | belirsiz | ❌ | ✅ | |
| sac-ekimi-fue.html | ✅ | Standart | belirsiz | ✅ | ✅ | **Tek breadcrumb'lı vaka + teknik sayfası** |
| sac-ekimi-dhi.html | ✅ | Standart | belirsiz | ❌ | ✅ | Breadcrumb eksik — olmalıydı |
| sac-ekimi-sapphire.html | ✅ | Standart | belirsiz | ❌ | ✅ | Breadcrumb eksik — olmalıydı |
| fue-vs-dhi.html | ✅ | Standart | belirsiz | ✅ | ✅ | Breadcrumb var |
| oncesi-sonrasi.html | ✅ | Standart | belirsiz | ❌ | ✅ | |
| greft-hesaplama.html | ✅ | Standart | belirsiz | ❌ | ✅ | |
| fiyat-hesaplama.html | ✅ | Standart | belirsiz | ❌ | ✅ | |
| vaka-fue-3200-greft.html | ✅ | Standart | belirsiz | ❌ | ✅ | Vaka sayfası — breadcrumb zorunluydu (Ana Sayfa > Sonuçlar > Vaka) |
| vaka-dhi-sakal-1800-greft.html | ✅ | Standart | belirsiz | ❌ | ✅ | Aynı |
| vaka-kas-restorasyonu-400-greft.html | ✅ | Standart | belirsiz | ❌ | ✅ | Aynı |
| uygun-degil.html | ✅ | Standart | belirsiz | ❌ | ✅ | Niş sayfa — yine de hiyerarşi gösterilmeli |
| kvkk-aydinlatma.html | ⚠️ Basit | Sadece logo + basit yapı | — | ❌ | ✅ | Legal footer de minimal |
| gizlilik-politikasi.html | ⚠️ Basit | Aynı | — | ❌ | ✅ | |
| cerez-politikasi.html | ⚠️ Basit | Aynı | — | ❌ | ✅ | |

**Kritik bulgular:**
- **index.html'de "Uzmanlık" link'i `href="#"`** — dead anchor. Sayfanın tepesine kaydırır, semantik hata.
- **index logosu `<div>` olarak yazılmış** (link değil). Diğer tüm sayfalar `<a href="index.html">`. Tutarsızlık.
- Nav link seti index ile diğer sayfalarda **FARKLI** (index 6 item, diğerleri 4 item). Kullanıcı bir iç sayfadan "Dönüşümler"e ulaşamaz — geri index'e dönmesi gerekir.
- `href="index.html#sonuclar"`, `href="index.html#iletisim"` gibi anchor-cross-page link'ler sac-analizi'nde var — `#sonuclar` index'te `#teknikler`/`#sss` mevcut ama `#sonuclar` var mı kontrol edilmeli (muhtemelen hash karmaşası).
- **Breadcrumb sadece 2/18 sayfada** (fue-vs-dhi.html, sac-ekimi-fue.html). Vaka sayfaları ve teknik alt sayfalar için standart olmalıydı.
- **Mobil navigasyon hamburger YOK.** Tüm sayfalarda `hidden md:flex` pattern nav link'leri gizler ama yerine hamburger/drawer yok. Mobilde kullanıcı sadece logo + CTA görür → tüm iç sayfa erişimi kapalı (sac-analizi'nde tek istisna "← Ana Sayfa" var).

## 3. Form Friction Analizi

| Form | Alan Sayısı | Zorunlu Alanlar | KVKK | UX Skoru | Not |
|---|---|---|---|---|---|
| **sac-analizi.html** (3 adım) | 4 (ad, tel, foto, kvkk) | ad + tel + kvkk | ✅ `kvkk-consent` checkbox | **9/10** | Adım yapısı mükemmel, 2 core alan, e-mail yok (doğru). Multi-step görsel (adım 01/03) iyi. Foto opsiyonel ama teşvik ediliyor |
| **iletisim.html** | 5 (ad, tel, email, konu dropdown, mesaj, foto) + kvkk | ad + tel + kvkk | ✅ `#kvkk` checkbox | **6/10** | **Çok fazla alan.** Email + konu dropdown + mesaj → SKILL'in "ASLA yapma: 5+ alan / dropdown konu" kurallarını **ihlal ediyor**. Dropdown "konu" analitikten takip edilmeli, hastaya sorulmamalı |
| **fiyat-hesaplama.html** | 0 (kalkülatör — sliders/buttons) | — | ❌ Yok (gerekmiyor) | **7/10** | Form değil hesap aracı. Sonuçta CTA/form köprü var mı kontrol edilmedi |
| **greft-hesaplama.html** | 0 (kalkülatör) | — | ❌ Yok (gerekmiyor) | **7/10** | Aynı — hesap aracı, form yok |

**Ek gözlemler:**
- KVKK metin tutarsızlığı: sac-analizi "KVKK Aydınlatma Metni + Gizlilik Politikası" kombine. iletişim aynı. Ama kvkk metin boyutu `text-[11px]` — marjinal okunabilirlik.
- iletişim formundaki alanlar `py-4` padding ile touch-friendly (≥44px efektif yükseklik). Sac-analizi aynı.
- iletisim'de "konu" dropdown → UX kuralına aykırı (analitik/URL referrer ile takip et).
- **uygun-degil.html** sayfasında form var mı? Kısa check gerekli; genellikle alternatif yönlendirme sayfası.

## 4. CTA Stratejisi

| Kontrol | Durum | Not |
|---|---|---|
| Her sayfada ≥1 net CTA | ✅ Genel | "Ücretsiz Analiz" CTA nav'da her içerik sayfasında sabit |
| CTA buton stili tutarlı | ⚠️ 2 varyant | `cta-premium` (animated, sadece index) + standart `bg-primary text-on-primary px-6 py-2.5 text-xs tracking-widest uppercase` |
| Primary CTA rengi | ✅ `bg-primary` + `linear-gradient` | Tutarlı altın gradient |
| Trust signal CTA'dan önce | ✅ Kısmen | index'te trust-bar CTA'dan sonra (hero-sub) ama hero-CTA için öncelik yanlış. sac-analizi'nde "KVKK uyumlu" badge var |
| WhatsApp floating button | ✅ index'te var | Sadece index.html'de `.wa-float` ve `.chat-toggle` var — **diğer 17 sayfada yok.** Kritik sapma. ux-architect SKILL "sağ alt floating button — her sayfada" diyor |
| Legal sayfalarda CTA | ❌ Yok | cerez, gizlilik, kvkk sayfalarında analiz/iletişim CTA yok — dead-end sayfalar |
| Vaka sayfalarında CTA | ⚠️ Kontrol gerekli | Vaka metinleri var, sonda form yönlendirmesi belirsiz |
| Hesaplama sayfalarında sonuç → form | ⚠️ Kontrol gerekli | Hesaplama bitince konsültasyon CTA olmalı — detay doğrulanmadı |

## 5. Mobile Kontrol

| Sayfa | `md:`/`lg:` kullanımı | Hamburger | Touch target (44x44) | Mobil Skoru |
|---|---|---|---|---|
| index.html | ✅ Zengin | ❌ YOK | ⚠️ CTA OK (py-5), nav link'ler mobilde gizli | 5/10 |
| sac-analizi.html | ✅ | ❌ YOK ("← Ana Sayfa" inline) | ✅ py-4 inputlar OK | 6/10 |
| iletisim.html | ✅ | ❌ YOK | ✅ py-4 inputlar | 5/10 |
| fiyat.html | ✅ | ❌ YOK | ✅ | 5/10 |
| sac-ekimi.html | ✅ | ❌ YOK | ✅ | 5/10 |
| sac-ekimi-fue/dhi/sapphire | ✅ | ❌ YOK | ✅ | 5/10 |
| fue-vs-dhi.html | ✅ | ❌ YOK | ✅ | 5/10 |
| oncesi-sonrasi.html | ✅ | ❌ YOK | ✅ | 5/10 |
| greft-hesaplama.html | ✅ | ❌ YOK | ⚠️ slider touch hedefi kontrol gerekli | 4/10 |
| fiyat-hesaplama.html | ✅ | ❌ YOK | ⚠️ aynı | 4/10 |
| vaka-* (3 sayfa) | ✅ | ❌ YOK | ✅ | 5/10 |
| uygun-degil.html | ✅ | ❌ YOK | ✅ | 5/10 |
| legal (3 sayfa) | ⚠️ Basit | ❌ YOK (gerek yok) | ✅ text-only | 6/10 |

**Pattern:** `hidden md:flex` nav her sayfada var — mobilde link'ler gizleniyor ama yerine menu/hamburger açılmıyor. Bu 18/18 sayfada eksik.

Font min 16px: body fontunda text-base default ama `text-sm` (14px) içerik gövdesinde baskın; `text-xs` ve `text-[10/11px]` çok yaygın. Skill kuralı "min 16px body" ihlal.

## 6. Footer Tutarlılığı

| Sayfa | Footer yapısı | Logo metin | Copyright |
|---|---|---|---|
| index.html | Tam footer (çok kolonlu) | "ALTINSOY HAIR CLINIC" (div) | — |
| İçerik sayfaları (fiyat, iletişim, sac-ekimi, vaka, vb.) | Orta ölçek footer | "ALTINSOY HAIR CLINIC" (link→index) | "© 2026 Altinsoy Hair Clinic" (Turkish `ı` YOK) |
| sac-analizi.html | Benzer footer | "ALTINSOY HAIR CLINIC" | belirsiz |
| Legal sayfalar (cerez/gizlilik/kvkk) | Minimal footer | "ALTINSOY HAIR CLINIC" (link) | "© 2026 Altınsoy Hair Clinic" (Turkish `ı` VAR) |

**Kritik:**
- Copyright yazım tutarsız: **"Altinsoy" (düz)** vs **"Altınsoy" (Türkçe ı)** aynı sitede karışık.
- Nav'da logo "ALTINSOY" (kısa), footer'da "ALTINSOY HAIR CLINIC" (uzun) — tutarlı kullanım ama iki yazım karmaşası brand integrity için risk.
- Legal sayfalarda `<footer>` stil minimal ve tam footer'dan farklı — kabul edilebilir ama CTA/WhatsApp link'i yok → dead-end.

## 7. Journey Flow

**Ana sayfadan erişim:**
- ✅ Teknikler genel (sac-ekimi.html) — index'te nav'da yok! Sadece `#teknikler` anchor var. Gerçek sayfa linki `Teknikler` olarak index nav'da yok → **Ana sayfadan sac-ekimi.html'e doğrudan tıklama yolu eksik**. Footer'da var (satır 573).
- ✅ FUE/DHI/Sapphire alt sayfaları — muhtemelen `sac-ekimi.html` üzerinden ya da footer'dan erişilir; index hero'dan direkt link yok.
- ✅ Dönüşümler → `oncesi-sonrasi.html` (index nav'da var).
- ✅ Fiyat → `fiyat.html` (index nav'da var).
- ⚠️ Fiyat hesaplama → index'te buton/link var mı kontrol edilmedi; muhtemelen sadece fiyat.html'den erişilir.
- ⚠️ Greft hesaplama → aynı şüphe.
- ✅ Analiz → sac-analizi.html (CTA her yerde).
- ✅ İletişim → iletisim.html.
- ❌ **Vaka sayfaları** — ana sayfada galeride mi? Link kontrolu gerekli. Eğer yoksa SEO/kullanıcı için kayıp.
- ❌ **uygun-degil.html** — bu sayfaya nereden yönlenilir? Muhtemelen analiz sonucu red kararından. Ana site navigasyonundan kopuk olmalı (doğru).
- ⚠️ **fue-vs-dhi.html** — index'te link yok; muhtemelen sac-ekimi.html veya blog tarafından. Breadcrumb var ama giriş yolu belirsiz.

**Dead-end analizi:**
- `cerez-politikasi.html`, `gizlilik-politikasi.html`, `kvkk-aydinlatma.html` → Footer'da birbirine link var ama CTA / WhatsApp yok. Kullanıcı geri dönmek için "ALTINSOY HAIR CLINIC" logosuna tıklamalı. KÜÇÜK dead-end.
- `uygun-degil.html` → İçerik kontrol edilmedi; alternatif yönlendirme (PRP, mezoterapi, başka klinik tipi) olmalı. Aksi halde → dead-end.

## KRİTİK UX Sorunları

1. **MOBİL NAVİGASYON YOK** (18/18 sayfa) — `hidden md:flex` ile masaüstü nav gizleniyor ama yerine hamburger/drawer açılmıyor. Mobilde kullanıcı iç sayfalara navigate edemez. Hedef kitle %70+ mobil (SKILL kuralı) → kritik conversion kaybı.
2. **WhatsApp floating button sadece index'te** — diğer 17 sayfada yok. SKILL kuralı "her sayfada sağ alt floating" ihlali. Hasta formdan çıktığında whatsapp yok.
3. **index.html "Uzmanlık" linki `href="#"`** — dead link, UX + SEO hatası.
4. **index logosu `<div>`** (link değil) — kullanıcı logoya tıklayıp ana sayfaya dönmeye çalışırsa çalışmaz (zaten anasayfada olsa bile keyboard nav ve muscle memory kırılır).
5. **Breadcrumb 2/18** — teknik ve vaka sayfalarında navigasyon hiyerarşisi yok.
6. **Nav link seti tutarsız** (index vs alt sayfalar) — alt sayfalardan "Uzmanlık" ve "SSS" erişilemez.
7. **iletişim formu 5+ alan + dropdown konu** — SKILL kuralı ihlali, friction yüksek.
8. **Küçük font ısrarı** (10-11px yaygın) — accessibility WCAG AA altı, 40+ yaş hasta demografisi için kritik.
9. **Legal sayfalardan ana akışa geri dönüş zayıf** (CTA/WhatsApp yok).

## KRİTİK Tasarım Sorunları (UI)

1. **Copyright yazım karmaşası**: "Altinsoy" vs "Altınsoy" aynı sitede. Brand integrity. Legal sayfalarda Türkçe karakter var, içerik sayfalarında yok.
2. **Nav varyasyonu**: index 6 item + "Uzmanlık" sekmesi, diğer sayfalar 4 item. Visual tutarlılık yok.
3. **Spacing ritmi tanımsız**: py-16 / py-20 / py-24 / py-32 hepsi karışık. Tek rhythm kuralı yok.
4. **CTA iki varyantı**: `cta-premium` (index-özgü animasyon) vs standart — developer el yapımı farklılıklar. Token'laştırılmamış.
5. **Icon fill state tutarsız**: Material Symbols default fill 0 (line), ama sac-analizi'nde selected state'te fill 1 force edilmiş. Diğer sayfalarda selected icon state yok veya farklı.
6. **Opacity overload**: `/60`, `/70`, `/80` çok yaygın → kontrast oranları sorgulanabilir. Özellikle `text-on-surface-variant/60 text-[10px]` — WCAG muhtemelen AA altı.
7. **Trust bar `text-[10px]` labels** — "Başarılı Operasyon / Google Rating / Ülkeden Hasta / Yıl Deneyim" — okunabilirlik düşük.

## Öneriler

### Öncelikli (P0 — yayın-önce düzelt)
1. **Hamburger menu + mobile drawer ekle** (tüm 18 sayfa). Shared component.
2. **WhatsApp floating button tüm sayfalara taşı** (shared snippet).
3. **index.html "Uzmanlık" href'ini düzelt** (ya kaldır ya `sac-ekimi.html`'e yönlendir).
4. **index logosunu `<a href="index.html">` yap** (diğer sayfalarla tutarlılık).
5. **Copyright yazımını birleştir**: "© 2026 Altınsoy Hair Clinic" standart (Türkçe karakter dahil).
6. **Nav link setini standartlaştır**: index = alt sayfalar aynı 5-6 item.

### Önemli (P1)
7. **Breadcrumb component**: sac-ekimi-* (3 teknik) ve vaka-* (3 vaka) sayfalarına ekle. Pattern: `Ana Sayfa > [Kategori] > [Sayfa]`.
8. **iletişim.html form sadeleştir**: email opsiyonel, "konu" dropdown kaldır, mesaj + foto öncelik. 2 zorunlu alan (ad+tel) hedefi.
9. **Legal sayfalara CTA bandı ekle**: alt bölüme "Hâlâ sorularınız mı var? WhatsApp ile yazın" benzeri — dead-end'i kır.
10. **Section spacing token**: `py-section-sm` (py-16), `py-section-md` (py-20), `py-section-lg` (py-24) tanımla, py-32 kaldır.

### İyileştirme (P2)
11. **Minimum font 12px kuralı**: `text-[10px]` → `text-[12px]`. Trust bar, footer, fine print.
12. **Kontrast audit aracı çalıştır**: `/60` opacity katmanlarını `/70` minimuma çek, kritik metinde `/80+`.
13. **CTA'yı tek component'a dönüştür**: `cta-premium` pattern'i her yerde kullan veya sadeleştir.
14. **Aktif nav link işaretleme kuralı**: tüm sayfalarda `text-primary border-b border-primary/30 pb-1` aynı şekilde uygulanmalı (şu an bazı sayfalarda `<a>`, bazılarında `<span>`).
15. **Icon fill state token'laştır**: seçili/aktif ikon için global rule.
16. **fiyat/greft hesaplama sonuç CTA'sı doğrula**: hesap bittikten sonra "Bu fiyatı sabitlemek için analiz et" gibi funnel pusher eklenmeli.
17. **uygun-degil.html ve vaka sayfalarına breadcrumb + CTA audit yap**.

### Not: Doğrulanamayan/ek kontrol gerektiren
- fiyat-hesaplama ve greft-hesaplama sonuç ekranı CTA akışı (kod detay inceleme gerekli)
- uygun-degil.html alternatif yönlendirme içeriği
- Index hero'dan FUE/DHI/Sapphire teknik kart link'leri (muhtemelen `#teknikler` anchor altındaki kartlardan)
- vaka sayfalarının index galerisinden erişilebilirliği
- WCAG AA tam kontrast audit (otomatik araç gerekli — axe/Lighthouse)

---

**Handoff:** 
- web-developer → P0 mobil nav + WhatsApp floating + logo/link düzeltmeleri
- ui-designer → section spacing token + minimum font policy + CTA component
- ux-architect → breadcrumb component spec + iletişim form sadeleştirme wireframe
- agency-director → copywright/yazım tutarlılığı onayı (Altinsoy vs Altınsoy)
