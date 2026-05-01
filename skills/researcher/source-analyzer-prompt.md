---
title: Kaynak Analiz Şablonu
type: output
tags: [research, source, subagent]
created: 2026-04-14
updated: 2026-04-14
sources: []
status: final
---

# Kaynak Analiz — Subagent Şablonu

## Amaç
Yeni eklenen ham kaynakları analiz etmek. [[wiki-ops]] ingest sürecinde kullanır.

## Analiz Yapısı

1. Kaynağı tamamen oku
2. Şu bilgileri çıkar:
   - **Temel iddialar** — Kanıtıyla birlikte
   - **İstatistikler** — Sayılar, yüzdeler, veri noktaları
   - **Varlıklar** — Klinikler, doktorlar, teknikler, pazarlar
   - **Kavramlar** — Prosedürler, hasta yolculuğu aşamaları
   - **Rekabet bilgisi** — Rakiplerin farklı yaptıkları
   - **İçerik pattern'leri** — Headline, CTA, güven sinyali formatları
3. Alaka düzeyini puanla (1-5)
4. Mevcut wiki bilgisiyle çelişenleri belirle
5. 3 takip araştırma yönü öner

## İlgili Roller
- [[trichologist]] — Tıbbi iddiaları doğrular
- [[patient-psychologist]] — Hasta davranış insight'larını değerlendirir
- [[seo-geo-specialist]] — Keyword ve içerik fırsatlarını belirler

## Çıktı
`wiki/sources/[kaynak-adi].md` olarak dosyalanır.
[[index]] güncellenir, [[log]] kaydedilir.
