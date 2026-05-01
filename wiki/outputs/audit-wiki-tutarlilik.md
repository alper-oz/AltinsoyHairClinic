---
title: Wiki & Cross-Sayfa Tutarlılık Audit (Wiki-Ops + Account-Lead)
type: output
tags: [audit, wiki, consistency, account]
created: 2026-04-14
---

# Wiki & Tutarlılık Audit Raporu

## Özet

- **Wiki sağlığı:** 8/10 — güncel ama bazı cross-link eksikleri var
- **Cross-sayfa tutarlılık:** 5/10 — kritik sayılar tutarsız kullanılıyor
- **Proje durumu:** 11/24 sayfa tamamlandı (%46) + 4 interaktif araç + 1 farklılaşma sayfası

---

## 1. Wiki Sağlığı

### index.md
- ✅ Tüm skill'ler listelenmiş
- ✅ Son güncelleme tarihi mevcut
- ✅ Wiki dokümanlarına link var
- ⚠️ Sayfa sayımı (Toplam Wiki Sayfası: 4) — aslında `wiki/` altında 7 .md dosya var (strategy/ + outputs/)
- ⚠️ Son eklenen dokümanlar (ozellik-kiyaslamasi, organik-arama, kapsamli-kontrol) listeye ekli ama sayım güncel değil

### log.md
- ✅ Kronolojik sıra doğru
- ✅ Son eklemeler tamam (Sprint 3, fiyat/greft hesaplayıcı, uygun-degil)
- ⚠️ Audit kayıtları henüz yok (bu audit tamamlanınca eklenecek)

### Wiki dokümanları tam listesi
```
wiki/strategy/
├── 2026-04-14-sprint1-plan.md
├── 2026-04-14-sprint2-plan.md
├── 2026-04-14-sprint3-plan.md
├── kapsamli-kontrol-plani.md
├── organik-arama-hizlandirma.md
├── ozellik-kiyaslamasi-ve-farklilasma.md
├── site-haritasi.md
└── tasarim-revizyonu.md

wiki/outputs/
├── audit-icerik-marka.md
├── audit-regulator.md
├── audit-seo.md
├── audit-tasarim.md
├── audit-tibbi.md
├── audit-teknik.md (bu audit)
├── audit-analitik.md (bu audit)
└── audit-wiki-tutarlilik.md (bu dosya)

wiki/content/blog/
└── sac-ekimi-sonrasi-sok-dokulme.md
```

**Toplam: 17 wiki dokümanı** (index.md'deki "4 Toplam" yanlış)

### Orphan Sayfa
- `wiki/content/blog/sac-ekimi-sonrasi-sok-dokulme.md` — sadece log'da geçiyor, `index.md`'de yok

### Frontmatter Standardı
- Tüm wiki dokümanları YAML frontmatter içeriyor ✅
- `type` alanı standart kullanılmış (strategy/output)
- `created` ve `updated` tutarlı

---

## 2. CROSS-SAYFA TUTARLILIK TARAMASI (En Kritik Bulgu)

### Greft tutma oranı "%85-95"

| Sayfa | Var mı? | Not |
|-------|---------|-----|
| `sac-ekimi.html` | ✅ |
| `sac-ekimi-fue.html` | ✅ |
| `sac-ekimi-sapphire.html` | ✅ |
| `vaka-fue-3200-greft.html` | ✅ |
| `sac-ekimi-dhi.html` | ❌ **EKSİK** |
| `fue-vs-dhi.html` | ❌ EKSİK |
| `uygun-degil.html` | ❌ EKSİK |
| `index.html` | ❌ EKSİK |

**TUTARSIZ:** DHI sayfasında oran yok — FUE ve Sapphire'de var. Tıbbi Audit de bunu H1 bulgu olarak işaretledi.

### "12-18 ay" nihai sonuç

10 sayfada mevcut ✅ — Teknik sayfalar, hub, vaka, uygun-degil, oncesi-sonrasi, fue-vs-dhi, altinsoy (eski). Eksik: yasal sayfalar (normal — konu alakasız), iletisim, fiyat, araçlar (araçlarda gösterilmemiş ama ara kullanımda var).

### "4-6 saat" (FUE süresi)

7 sayfada mevcut ✅ — tutarlı.

### "15 yıl" deneyim

5 sayfada eşleşme:
- `index.html` — 7 eşleşme (hero, stats, doktor bölümü, footer)
- `sac-ekimi.html` — 1
- `iletisim.html` — 1
- `greft-hesaplama.html` — 1
- `altinsoy.html` — 8

⚠️ `sac-analizi.html`, `fiyat.html`, `fiyat-hesaplama.html`, `fue-vs-dhi.html`, `uygun-degil.html`, teknik sayfalar, vakalarda YOK. E-E-A-T için tutarlı olmalı — en azından footer'da.

### "10.000+" operasyon

- `index.html` — 7 eşleşme ✅
- `altinsoy.html` — 8 eşleşme (eski dosya)
- Diğer 16 sayfada YOK ❌

**KRİTİK:** Bu rakam marka güvenilirlik göstergesi. Hero'da var ama teknik sayfalarda, uygun-degil'de, araçlarda yok. Tutarsız.

### "42 ülkeden hasta"

- `index.html` — 7 eşleşme ✅
- Diğer sayfalarda YOK ❌

### "4.9/5" Google rating

- `index.html` — 7 eşleşme ✅
- Diğer sayfalarda YOK ❌

### Telefon "+90 553 978 42 42"

| Sayfa | Var |
|-------|-----|
| index.html | ✅ (6 yerde) |
| iletisim.html | ✅ (3 yerde) |
| Diğer tüm sayfalar | ✅ WhatsApp linkinde (wa.me/905539784242) |

**Tutarlı ✅** — Telefon numarası tek ve tutarlı. Yasal sayfalardaki e-posta (`kvkk@altinsoy.com`) farklı, ama bu kasıtlı (KVKK için ayrı kanal).

### E-posta

- `info@altinsoy.com` — iletisim, index, yasal sayfalar ✅
- `kvkk@altinsoy.com` — yasal sayfalar ✅ (kasıtlı ayrılık)

**Tutarlı.**

### Fiyat aralığı "€2.500-5.000"

- `fiyat.html` — tam aralık ✅
- `fiyat-hesaplama.html` — paket bazlı aralık ✅ (algoritma tutarlı)
- Diğer sayfalarda gösterilmemiş (normal, sadece fiyat sayfalarında)

**Tutarlı ✅**

---

## 3. KRİTİK TUTARSIZLIKLAR

| # | Değer | Sorun | Etkilenen Sayfalar |
|---|-------|-------|---------------------|
| 1 | **"%85-95 greft tutma"** | DHI sayfasında eksik (diğer teknik sayfalarında var) | `sac-ekimi-dhi.html` |
| 2 | **"10.000+ operasyon"** | Sadece index'te, teknik sayfalarda yok → marka güveni parça parça | 16 sayfa eksik |
| 3 | **"15 yıl deneyim"** | Tutarsız yayılım | Teknik + vaka + araç sayfaları |
| 4 | **"42 ülke"** | Sadece index'te | 16 sayfa eksik |
| 5 | **"4.9/5 rating"** | Sadece index'te | 16 sayfa eksik |
| 6 | **Türkçe karakter** (SEO audit'ten) | FUE/DHI/Sapphire sayfalarında title+H1'de "Sac", "Yapilir" (tutarsız encoding) | 3 teknik sayfa |
| 7 | **"Dr. [İsim Soyisim]"** (içerik audit'ten) | Placeholder | index.html, altinsoy.html |
| 8 | **"[Klinik Adresi]"** | Placeholder | gizlilik-politikasi, kvkk-aydinlatma |

---

## 4. Proje Durumu (Account-Lead)

### Site haritası hedefi: 24 sayfa

| Durum | Sayı |
|-------|------|
| ✅ Tamamlanan | 13 |
| ⏳ Bekleyen (bilgi bekliyor) | 1 (doktor profili) |
| ❌ Planlanmış ama üretilmedi | 10 |

### Tamamlanan (13)
1. Ana sayfa (`index.html`)
2. Saç ekimi hub (`sac-ekimi.html`)
3. FUE (`sac-ekimi-fue.html`)
4. DHI (`sac-ekimi-dhi.html`)
5. Sapphire (`sac-ekimi-sapphire.html`)
6. FUE vs DHI (`fue-vs-dhi.html`)
7. Öncesi/Sonrası galeri (`oncesi-sonrasi.html`)
8. 3 vaka detay sayfası
9. Fiyat (`fiyat.html`)
10. İletişim (`iletisim.html`)
11. Yasal 3 sayfa (gizlilik, kvkk, çerez)
12. Sac-analizi wizard
13. Uygun-degil (farklılaşma)

### Eksik (10)
- `/doktor/` — KRİTİK (E-E-A-T)
- `/sakal-ekimi/` — ORTA
- `/kas-ekimi/` — ORTA
- `/blog/` — KRİTİK (TOFU trafik)
- `/blog/*` — İlk 5-10 yazı
- `/en/` (İngilizce mirror) — KRİTİK
- `/hasta-yorumlari/` — YÜKSEK
- `/iyilesme-merkezi/` — YÜKSEK
- `/hakkimizda/` — ORTA
- `/prp-tedavisi/` — ORTA (trichologist önerisi)

### Bonus (Plan dışı yapılan)
- ✅ Greft hesaplama aracı
- ✅ Fiyat hesaplama aracı
- ✅ Chatbot widget UI (mock)
- ✅ Blog: Saç ekimi sonrası şok dökülme (draft)

### Sprint durumu
- **Sprint 1:** 3/4 tamam (doktor profili eksik — bilgi bekliyor)
- **Sprint 2:** 4/4 tamam ✅
- **Sprint 3:** 4/4 tamam ✅
- **Sprint 4 (planlı):** Başlanmadı (Blog, /en/, hasta-yorumlari, iyilesme-merkezi)
- **Sprint 5 (planlı):** Başlanmadı (sakal, kas, hakkimizda, prp)

### Farklılaşma Özellikleri (7 öneriden)
1. ✅ "Saç Ekimi Yapılmaz Kimler İçin"
2. ✅ Greft hesaplama (bonus)
3. ✅ Fiyat hesaplama (bonus)
4. ❌ Operasyon Günü PWA
5. ❌ "Hasta Seçiciliği" konumlandırma
6. ❌ Derin vaka çalışması standardı (başladı, 3 vaka var)
7. ❌ Altınsoy Research akademik katman
8. ❌ "5 Dakika Doktor" canlı yayın
9. ❌ "Greft Emanet" risk reversal

---

## 5. Bilinen Placeholder'lar

| Placeholder | Hangi Sayfa(lar) |
|-------------|-------------------|
| `Dr. [İsim Soyisim]` | index.html, altinsoy.html |
| `[Klinik Adresi]` | gizlilik-politikasi, kvkk-aydinlatma |
| `GTM-XXXXXX` | index.html |
| `iframe Google Maps` yok (harita embed) | iletisim.html |
| `og:image` yok | Tüm sayfalar |
| `favicon` yok | Tüm sayfalar |

---

## 6. Link Bütünlüğü

### Internal link taraması (örneklem)

- `index.html` nav → `sac-ekimi.html`, `oncesi-sonrasi.html`, `fiyat.html`, `iletisim.html`, `#sss` ✅
- `sac-ekimi.html` → FUE/DHI/Sapphire teknik sayfaları ✅
- Hub sayfa → `uygun-degil.html` linki ✅
- Vaka kartları (ana sayfa) → 3 vaka detay sayfası ✅
- Footer → Yasal sayfalar ✅
- `greft-hesaplama` → `fiyat-hesaplama` cross-link ✅
- `fiyat-hesaplama` → `sac-analizi` ✅

### Dead link'ler
- `index.html` satır 133: "Uzmanlık" nav linki = `href="#"`
- `index.html` TR/EN dil seçici = `href="#"`
- `sac-analizi.html` dil seçici = `href="#"`
- `altinsoy.html` (eski dosya) 13 dead link

**Toplam dead link (aktif sayfalarda):** 6 adet

---

## 7. Öneriler

### Kritik Tutarlılık Düzeltmeleri (1-2 saat işi)
1. **Tüm sayfa footer'larına** ortak bilgi barı: "15 yıl · 10.000+ operasyon · 42 ülke · 4.9/5" — brand strength signal consistency
2. **DHI sayfasına %85-95 greft tutma ekle** (diğerleriyle parite için)
3. **Türkçe karakter bug'ını düzelt** — FUE/DHI/Sapphire sayfalarında title+H1
4. **`altinsoy.html` eski dosyayı sil** veya `<meta name="robots" content="noindex">` ekle
5. **Dead link'leri fix et** (index.html'de 5 adet)

### Wiki Güncellemeleri
6. index.md sayfa sayımını düzelt ("Toplam Wiki Sayfası: 17")
7. index.md'ye blog/ altındaki şok dökülme yazısını ekle (orphan önle)
8. log.md'ye bu audit'i ekle

### Proje Tamamlama
9. Doktor profili için bilgi topla (blokaj)
10. Sprint 4'ü başlat: Blog + /en/ + hasta-yorumlari + iyilesme-merkezi

---

HANDOFF: Konsolide raporu hazırlayacak komutan için → tüm rol audit'leri birleştirilmeli.
