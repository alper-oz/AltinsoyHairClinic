---
title: Obsidian Plugin Kurulum Rehberi
type: output
tags: [setup, obsidian, plugins]
created: 2026-04-14
updated: 2026-04-14
sources: []
status: final
---

# Obsidian Plugin Kurulum Rehberi

## Nasil Kurulur?
1. Obsidian'i ac
2. Settings (Ctrl+,) → Community plugins → Turn on community plugins
3. Browse → Plugin adini ara → Install → Enable

---

## Oncelik 1: Mutlaka Kur (Wiki icin kritik)

### Dataview
- **Ne yapar:** Wiki sayfalarina YAML frontmatter uzerinden dinamik tablolar ve listeler ekler
- **Neden lazim:** index.md'yi canli tutmak, tag bazli filtreleme, kaynak sayimi
- **Ara:** "Dataview"

### Obsidian Web Clipper (Tarayici Eklentisi)
- **Ne yapar:** Web sayfalarini tek tikla markdown'a cevirir
- **Neden lazim:** Rakip siteleri, makale ve referanslari raw/ klasorune hizlica eklemek
- **Kur:** Obsidian icinden degil, tarayicidan → [obsidian.md/clipper](https://obsidian.md/clipper)
- **Ayar:** Clip sonrasi hedef klasoru `raw/articles` olarak ayarla

### Templater
- **Ne yapar:** Gelismis sablonlar olusturur (degiskenler, tarih otomasyonu)
- **Neden lazim:** Yeni wiki sayfalari icin standart frontmatter sablonu
- **Ara:** "Templater"

---

## Oncelik 2: Cok Faydali

### Marp Slides
- **Ne yapar:** Markdown'dan sunum slaytlari olusturur
- **Neden lazim:** Wiki iceriginden hizlica sunum uretmek (strateji, rakip analiz)
- **Ara:** "Marp Slides"

### Kanban
- **Ne yapar:** Markdown dosyalarini kanban board olarak gosterir
- **Neden lazim:** Icerik uretim pipeline'ini yonetmek (draft → review → final)
- **Ara:** "Kanban"

### Calendar
- **Ne yapar:** Takvim gorunumu ve daily notes entegrasyonu
- **Neden lazim:** Editorial takvim ve icerik planlama
- **Ara:** "Calendar"

---

## Oncelik 3: Opsiyonel ama Guzel

### Style Settings
- **Ne yapar:** Tema renklerini ve tipografiyi ozellestirir
- **Neden lazim:** Wiki'yi gorsel olarak daha okunaklı yapmak

### Excalidraw
- **Ne yapar:** Obsidian icinde cizim ve diyagram
- **Neden lazim:** Hasta yolculugu haritalari, funnel diyagramlari

### Image Toolkit
- **Ne yapar:** Gorselleri buyutme, dondurme, galeri gorunumu
- **Neden lazim:** raw/assets/ icindeki referans gorselleri incelemek

---

## Tarayici Eklentisi Ayarlari (Web Clipper)

Kurduktan sonra:
1. Web Clipper ayarlarina git
2. **Default vault:** altinsoy
3. **Default folder:** raw/articles
4. **Download images:** ON (gorselleri raw/assets/'e indir)

## Obsidian Hotkey Ayari

Settings → Hotkeys → Ara: "Download attachments"
→ `Ctrl+Shift+D` ata
→ Bir makale clip'ledikten sonra bu kisayolla tum gorseller lokale iner

---

_Bu rehber wiki kurulum surecinin parcasidir. Plugin'ler kurulduktan sonra bu sayfa arsivlenebilir._
