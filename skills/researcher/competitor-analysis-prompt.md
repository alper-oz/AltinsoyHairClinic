---
title: Rakip Analiz Şablonu
type: output
tags: [research, competitor, subagent]
created: 2026-04-14
updated: 2026-04-14
sources: []
status: final
---

# Rakip Analiz — Subagent Şablonu

## Amaç
Rakip kliniklerin dijital varlıklarını analiz etmek. [[researcher]] bu şablonu her rakip analizi için kullanır.

## Analiz Alanları

### 1. Web Sitesi & UX
- Sayfa sayısı, site haritası yapısı
- Mobil uyumluluk, hız
- [[ux-architect]] perspektifinden güçlü/zayıf yanlar

### 2. Mesaj & Konumlandırma
- Ana değer önerisi
- Farklılaşma stratejisi
- [[strategy-planner]] perspektifinden konum analizi

### 3. Güven Sinyalleri
- Doktor profilleri, sertifikalar
- Before/after sunum formatı
- Hasta yorumları (platform, sayı, skor)
- [[patient-psychologist]] perspektifinden güven değerlendirmesi

### 4. İçerik Stratejisi
- Blog konuları, yayın sıklığı
- İçerik derinliği ve kalitesi
- [[copywriter]] perspektifinden ton analizi

### 5. SEO
- Hedef keyword'ler (title, H1, meta'dan çıkarım)
- Site yapısı, URL pattern
- [[seo-geo-specialist]] perspektifinden fırsat analizi

### 6. Dönüşüm Elementleri
- CTA tipi ve yerleşimi
- Form tasarımı, alan sayısı
- İletişim kanalları (form, WhatsApp, chat, telefon)
- [[performance-analyst]] perspektifinden funnel değerlendirmesi

## Çıktı Formatı

```markdown
## Rakip Analiz: [Klinik Adı]

### Genel İzlenim
[2-3 cümle: güçlü mü, zayıf mı, ne öne çıkıyor?]

### Güçlü Yanları (Öğrenebileceğimiz)
1. [Spesifik güçlü yan + kanıt]

### Zayıf Yanları (Fırsatlarımız)
1. [Spesifik zayıf yan + nasıl değerlendiririz]

### Altınsoy İçin Aksiyon
1. [Somut öneri]
```

Çıktı: `wiki/comparisons/competitor-[isim].md` olarak dosyalanır.
[[index]] güncellenir, [[log]] kaydedilir.
