---
title: Sistem Stress Test Planı
type: output
tags: [test, quality, audit]
created: 2026-04-14
updated: 2026-04-14
sources: []
status: in-progress
---

# Altınsoy Dijital Ajans — Stress Test Planı

## Test Felsefesi
Her katmanı ayrı ayrı test et, sonra birlikte çalışmalarını test et. Tıpkı bir cerrahın önce her organı sonra sistemi kontrol etmesi gibi.

---

## TEST 1: Yapısal Bütünlük
**Ne test ediyoruz:** Dosya sistemi tutarlı mı? Eksik, fazla, bozuk dosya var mı?

- [ ] Tüm skill klasörlerinde SKILL.md var mı?
- [ ] YAML frontmatter geçerli mi (name, description)?
- [ ] Duplikasyon var mı (aynı dosya iki yerde)?
- [ ] Wiki klasör yapısı CLAUDE.md'deki şemayla uyumlu mu?
- [ ] index.md'deki her link gerçek bir dosyaya işaret ediyor mu?
- [ ] log.md kronolojik sırada mı?
- [ ] Gereksiz dosya var mı (Başlıksız.canvas gibi)?
- [ ] raw/ klasörleri boş ama mevcut mu?

## TEST 2: Skill Cross-Reference (Bağlantı Testi)
**Ne test ediyoruz:** Skill'ler birbirine doğru referans veriyor mu? Kırık link var mı?

- [ ] Her skill'deki [[wiki-link]]'ler gerçek dosyalara işaret ediyor mu?
- [ ] Komutan'daki rol listesi ile gerçek skill dizinleri eşleşiyor mu?
- [ ] index.md'deki skill listesi ile skills/ dizini eşleşiyor mu?
- [ ] using-superpowers'daki ajans kadrosu güncel mi?
- [ ] CLAUDE.md'deki skill listesi güncel mi?
- [ ] Orphan skill var mı (hiçbir yerden referans almayan)?
- [ ] Skill'lerin "Diğer Rollerle Etkileşim" bölümleri karşılıklı tutarlı mı?

## TEST 3: Komutan Orkestrasyon Testi
**Ne test ediyoruz:** Komutan doğru rolleri doğru sırada devreye alıyor mu?

Senaryo bazlı dry-run:
- [ ] "Hakkımızda sayfası oluştur" → Hangi roller, hangi sıra?
- [ ] "FUE tekniği blog yazısı yaz" → Tıbbi içerik kapısı devrede mi?
- [ ] "Rakip kliniği analiz et" → Araştırma pipeline doğru mu?
- [ ] "Google Ads metni yaz" → Platform regülasyonu kontrol ediliyor mu?
- [ ] "Web sitesi platformunu seç" → Tech advisor devrede mi?
- [ ] "Before/after galerisi tasarla" → Hasta onamı kontrolü var mı?

## TEST 4: Kalite Kapısı Testi
**Ne test ediyoruz:** 5 kalite kapısı gerçekten tetikleniyor mu? Atlanan var mı?

Her kapı için provokasyon:
- [ ] Trichologist: "Saç ekimi %100 başarılı" — yakalar mı?
- [ ] Patient Psychologist: "Hemen randevu al" (faz 1 hastaya) — uyarır mı?
- [ ] Agency Director: Jenerik, düşük kaliteli copy — reddeder mi?
- [ ] Health Regulator: "Kampanyalı fiyat", rakip adı — yakalar mı?
- [ ] SEO Specialist: Keyword'süz sayfa — uyarır mı?

## TEST 5: Senaryo Simülasyonları
**Ne test ediyoruz:** Gerçek dünya görevlerinde tüm sistem birlikte çalışıyor mu?

### Senaryo A: Landing Page (Tam Pipeline)
Görev: "FUE Saç Ekimi landing page'i oluştur"
Beklenen akış: Komutan → wiki-ops → patient-psych → seo → ux → ui → copy → tricho → regulator → director
Kontrol: Tüm roller devreye girdi mi? Sıra doğru mu? Kalite kapıları geçti mi?

### Senaryo B: Hızlı Görev
Görev: "Blog başlığı öner: saç ekimi sonrası bakım"
Beklenen: Komutan minimal orkestrasyon, seo + copy + tricho
Kontrol: Gereksiz roller devreye girmedi mi? Hız korundu mu?

### Senaryo C: Tehlikeli İçerik
Görev: "Rakip X klinikten neden daha iyiyiz metni yaz"
Beklenen: Health regulator BLOKE etmeli — karşılaştırmalı reklam YASAK
Kontrol: Regülatör yakaladı mı? Alternatif önerdi mi?

### Senaryo D: Teknik Karar
Görev: "Web sitesi WordPress mı Next.js mi olsun?"
Beklenen: Komutan → tech-advisor → software-engineer → seo → director
Kontrol: Veri destekli karar matrisi oluştu mu?

### Senaryo E: Wiki Operasyonu
Görev: Yeni bir makale raw/'a eklendi, "ingest et"
Beklenen: wiki-ops full pipeline (oku → tartış → kaydet → indexle → logla)
Kontrol: index ve log güncellendi mi? Cross-link oluştu mu?

---

## Başarı Kriterleri

| Kriter | Geçti | Kaldı |
|--------|-------|-------|
| Sıfır kırık link | | |
| Sıfır orphan skill | | |
| Sıfır duplikasyon | | |
| Komutan tüm senaryolarda doğru delege etti | | |
| Tüm kalite kapıları provokasyonda tetiklendi | | |
| Tehlikeli içerik bloke edildi | | |
| Wiki ops pipeline tam çalıştı | | |
| Gereksiz roller devreye girmedi | | |
