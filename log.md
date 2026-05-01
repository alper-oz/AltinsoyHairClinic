---
title: Activity Log
type: log
---

# Altinsoy Wiki — Activity Log

Kronolojik islem kaydi. Her ingest, query ve lint islemi burada loglanir.

---

## [2026-04-27] build | Site → Next.js 16 Tam Dönüşüm Tamamlandı
- Görev: 23 statik HTML sayfasının tamamı Next.js App Router'a dönüştürüldü
- Route group: `app/(site)/` — shared layout (Navbar, Footer, ChatWidget, CookieBanner, WhatsAppFloat, GsapProvider)
- Tamamlanan rotalar (26): `/`, `/sac-ekimi`, `/sac-ekimi/fue`, `/sac-ekimi/dhi`, `/sac-ekimi/sapphire`, `/sakal-ekimi`, `/kas-ekimi`, `/fiyat`, `/fiyat-hesaplama`, `/greft-hesaplama`, `/fue-vs-dhi`, `/iletisim`, `/sac-analizi`, `/client-data`, `/oncesi-sonrasi`, `/uygun-degil`, `/vaka/fue-3200-greft`, `/vaka/dhi-sakal-1800-greft`, `/vaka/kas-restorasyonu-400-greft`, `/cerez-politikasi`, `/gizlilik-politikasi`, `/kvkk-aydinlatma`, `/login`, `/dashboard/*`
- Pattern: Server component (metadata) + Client component (useState) — metadata/use client çakışması çözüldü
- Schema: Her sayfada JSON-LD (MedicalProcedure, FAQPage, MedicalClinic, vb.)
- Build: `npx next build` — 26 rota statik olarak üretildi, hata yok
- Server: `npm run dev --port 3001` → tüm rotalar HTTP 200
- Durum: ✔️ TAMAM

## [2026-04-27] build | Dashboard — Next.js 16 + Tailwind v4
- Görev: Web sitesine entegre admin dashboard inşası
- Stack: Next.js 16.2.4, React 19, Tailwind v4, TypeScript
- Konum: `altınsoy/dashboard/`
- Sayfalar: `/login`, `/dashboard/leads`, `/dashboard/banner`, `/dashboard/trafik`
- Bileşenler: `Sidebar`, `Header`, `EmptyState`
- Design: Mevcut site ile birebir uyumlu — `#131313` zemin, `#e9c176` altın, Noto Serif + Manrope
- Auth: Placeholder (Supabase entegrasyonu sonraki adım)
- Server: `npm run dev` → `http://localhost:3001`
- Durum: ✔️ TAMAM — login + 3 sekme çalışıyor

---

## [2026-04-18] audit | Mobil Uyumluluk Denetimi (360/390/768)
- Kapsam: 21 aktif HTML sayfa × 3 kirilim = 63 kombinasyon
- Yontem: Claude Preview MCP + programatik denetim (overflow, touch target, input font, hamburger varlik/etkilesim)
- Rapor: `wiki/outputs/audit-mobil-2026-04-18.md`
- **Kritik bulgular (2):**
  - K1: 4 sayfada hamburger + mobile-menu YOK (`sac-analizi`, `gizlilik-politikasi`, `kvkk-aydinlatma`, `cerez-politikasi`) → mobilde ana nav erisilemiyor
  - K2: Form inputlari 14px font → iOS otomatik zoom (index 3 alan, iletisim 5 alan)
- **Orta (2):** Tablet 768 index 6px overflow (nav gap), touch target <44px yaygin
- **Dusuk (3):** Material Symbols, uzun sayfa sticky CTA ihtiyaci, screenshot timeout
- **Yayin karari:** MEVCUT HALIYLE YAYINA HAZIR DEGIL (K1+K2 bloker)
- **Klinik-uzmanlar kapisi:** Ic rapor — yayina gitmez. Tutarlilik kontrolunden gecti (bulgular icerikle celiskili degil, yasak ifade yok, hasta hakki risk yok).
- Sonraki adim: Dalga 3 fix sprint — kullanici onayi bekleniyor

## [2026-04-18] skill | Klinik Uzmanlar — Hukuki Son Imza Kapisi Eklendi
- Yeni skill olusturuldu: `skills/klinik-uzmanlar/SKILL.md`
- Rol: Kliniğin hukuki danisma kurulu (avukat + KVKK uzmani + hasta haklari danismani)
- Kapsam: KVKK/GDPR derinlemesine, reklam yasasi 2. okuma, hasta haklari, sozlesmeler & yazili teklif, diger kapi ciktilarinin hukuki dogrulamasi
- Pozisyon: 6. kalite kapisi — yayin oncesi ZORUNLU son imza
- Komutan entegrasyonu: Kapi 6 eklendi, icerik/web/sosyal zincirlerine son adim olarak baglandi, bagimlilik haritasi guncellendi, Ilgili Roller listesine eklendi
- CLAUDE.md: routing tablosuna eklendi, 15. kural ("Klinik Uzmanlar son kapi — hicbir icerik bu kapidan gecmeden yayinlanamaz") eklendi
- Handoff tablolari: health-regulator, agency-director, copywriter, social-strategist → klinik-uzmanlar alici olarak eklendi
- index.md: Sektor Uzmanlari listesine eklendi
- Sonuc: Yayinlanacak HER icerik 5 kapidan sonra Klinik Uzmanlar'dan gecer. Son soz bu kapida.

---

## [2026-04-14] init | Wiki Kurulumu
- Dizin yapisi olusturuldu: raw/, wiki/, alt klasorler
- Schema dosyasi (CLAUDE.md) yazildi
- index.md ve log.md olusturuldu
- Wiki kullanima hazir — ilk kaynak bekleniyor

## [2026-04-14] setup | Obsidian Plugin Rehberi
- Core plugin'ler aktif edildi (slides, webviewer, workspaces, footnotes, markdown-importer, slash-command)
- Plugin kurulum rehberi olusturuldu: wiki/outputs/plugin-kurulum-rehberi.md
- Oncelikli eklentiler: Dataview, Web Clipper, Templater, Marp, Kanban, Calendar

## [2026-04-14] setup | Superpowers Skill Sistemi Kurulumu
- obra/superpowers repo klonlandi: .claude/superpowers/
- 8 yazilim-spesifik skill silindi (TDD, debugging, git worktrees, code review)
- 6 genel skill korundu (brainstorming, dispatching, verification, using-superpowers, writing-plans, writing-skills)
- writing-plans skill'i icerik planlama icin adapte edildi
- 5 yeni wiki skill olusturuldu:
  - wiki-ingest (kaynak isleme pipeline)
  - wiki-query (wiki uzerinden Q&A)
  - wiki-lint (saglik kontrolu)
  - wiki-content (icerik uretimi + brand voice guide + reviewer)
  - wiki-research (web arastirma + rakip analiz)
- using-superpowers skill'i wiki odakli guncellendi
- CLAUDE.md'ye superpowers entegrasyonu eklendi

## [2026-04-14] restructure | Ajans Rol Yapısı Kurulumu
- Wiki operasyon skill'leri (5) yerine ajans rol yapısı kuruldu (12 uzman)
- Sektör uzmanları: trichologist (tıbbi doğruluk), patient-psychologist (hasta davranış)
- Strateji: agency-director, strategy-planner, account-lead
- Üretim: ux-architect, copywriter, seo-geo-specialist, web-developer
- Analiz: researcher, performance-analyst, social-strategist
- Altyapı: wiki-ops (ingest/query/lint birleştirildi)
- Her skill sektöre özel derin uzmanlıkla yazıldı
- using-superpowers ajans kadrosu ile güncellendi
- CLAUDE.md ajans yapısına göre yeniden yazıldı
- Toplam: 12 ajans rolü + 5 core superpowers skill = 17 aktif skill

## [2026-04-14] audit | Yapısal Sağlık Kontrolü & Düzeltmeler
- .claude/superpowers/ duplikasyonu silindi — skills/ tek master
- Kayıp subagent dosyaları geri yazıldı (brand-voice-guide, content-reviewer, competitor-analysis, source-analyzer)
- Gereksiz platform dosyaları temizlendi (visual-companion, codex/copilot/gemini references)
- overview.md ajans yapısına göre yeniden yazıldı (12 rol + 6 faz timeline)
- index.md skill'leri listeleyecek şekilde güncellendi
- Skill dosyalarına wiki-linkler eklendi (graf bağlantıları)
- CLAUDE.md dizin yapısına skills/ eklendi
- Başlıksız.canvas silindi

## [2026-04-14] ingest | Mevcut Site Tasarımı (Clinical Atelier)
- Source: raw/references/site-tasarim/stitch_luxury_hair_clinic_design/
- 6 sayfa tasarımı + Onyx & Gilt design system incelendi
- 7 kritik sorun tespit edildi
- wiki/strategy/tasarim-revizyonu.md oluşturuldu (7 sorun, 7 çözüm)
- Key insight: Lüks görünüm hasta güvenini inşa etmiyor, "Güvenilir Uzman" yönüne dönülmeli

## [2026-04-14] audit | Skill Sistemi Derin Audit
- 24 skill 6 kriterde puanlandı (tetikleme, checklist, handoff, çıktı, kalite kapısı, bağımlılık)
- 10 kritik zayıflık tespit edildi
- En zayıf: çıktı formatı (2.8/5), kalite kapısı (2.7/5)
- En güçlü: tetikleme kuralları (4.5/5)

## [2026-04-14] refactor | Skill Sistemi Refactoring Başlatıldı
- 4 fazlı plan onaylandı ve uygulanmaya başlandı
- FAZ 0 tamamlandı: using-superpowers komutan ile birleştirildi (redirect stub)

## [2026-04-14] refactor | FAZ 1 — Skill Kontrat Sistemi
- 17 domain skill'e 4 standart bölüm eklendi: Ön Koşul, Çıktı Spec, Self-Review, Handoff
- 68 yeni bölüm toplam
- Sıra: strategy-planner → patient-psych → seo → copywriter → ux → researcher → tricho → regulator → director → ui → tech → sw-eng → web-dev → account → perf → social → wiki-ops

## [2026-04-14] refactor | FAZ 2 — Core Skill Adaptasyonu
- 5 core skill Altınsoy'a adapte edildi
- brainstorming: wiki yolları, roller entegrasyonu
- writing-plans: kalite kapıları tablo, handoff formatı
- dispatching-parallel-agents: Altınsoy paralel iş kalıpları (rakip analiz, çok dilli, araştırma)
- verification-before-completion: kalite kapıları doğrulama matrisi
- writing-skills: Altınsoy konvansiyonları (dizin, frontmatter, handoff, komutan entegrasyonu)

## [2026-04-14] refactor | FAZ 3 — Bağımlılık Motoru
- Komutan'a bağımlılık motoru eklendi (Adım 3: DELEGE bölümüne)
- Ön koşul kontrol mekanizması: her rol devreye alınmadan Ön Koşul bölümü taranıyor
- Bağımlılık haritası: roller arası giriş-çıkış akışı görselleştirildi
- Paralel/sıralı karar kuralı tanımlandı
- Sunum formatı güncellendi: zincir + kapı + handoff log

## [2026-04-14] refactor | FAZ 4 — CLAUDE.md & Doğrulama
- CLAUDE.md'ye Skill Kontrat Sistemi bölümü eklendi
- 4 yeni kural eklendi: ön koşul kontrol, handoff zorunlu, self-review zorunlu, kalite kapısı atlanamaz
- Kuru test yapıldı (hero section copy senaryosu — 8 handoff, 3 kalite kapısı, 1 revizyon döngüsü)
- Wiki dizin uyumluluk denetimi: 4 eksik alt dizin oluşturuldu (blog, ads, email, social)
- index.md güncellendi (skill sayısı 24, content alt dizinleri, core skills listesi)

## [2026-04-14] fix | Sistem Sağlığı — Routing & Okuma Protokolü
- Tespit: Skill'ler pasif doküman, aktif routing yok — Claude CLAUDE.md okuyor ama skill dosyalarını otomatik okumuyor
- Tespit: Subagent yapısı tanımlı ama hiç kullanılmıyor
- Tespit: Routing tablosu eksik — hangi mesaj hangi skill'e gitmeli belirsiz
- Çözüm: CLAUDE.md'ye "Zorunlu Okuma Protokolü" eklendi (7 adımlı, HER mesajda)
- Çözüm: Hızlı Routing Tablosu eklendi (20+ anahtar kelime → skill eşlemesi)
- Çözüm: Subagent Kullanım Kuralı eklendi (2+ bağımsız iş → paralel dispatch zorunlu)

## [2026-04-14] fix | Footer "Hizmetler" Linkleri — Sakal & Kaş Ekimi Sayfaları
- Kullanıcı tespiti: Footer'daki "Sakal Ekimi" ve "Kaş Ekimi" linkleri aynı sac-ekimi.html'e gidiyordu — hub sayfasında "sakal" veya "kaş" kelimesi bile yoktu (patient-psych: yanlış yere gelme bozukluğu, SEO: kayıp keyword)
- 2 yeni teknik sayfa üretildi:
  * sakal-ekimi.html: DHI odaklı, çene/yanak/bıyık/tam sakal 4 bölge, 30-45° açı anlatımı, 3-5 saat işlem, 1500-2500 greft, vaka referansı (DHI sakal 1800)
  * kas-ekimi.html: FUE+DHI kombinasyonu, tek köklü greftler, 10-15° yatık açı KRİTİK (saç/sakal/kaş açı karşılaştırma tablosu ekledik), 2-3 saat, 300-500 greft, kırpma notu, vaka referansı (kaş 400)
- Trichologist verisi:
  * Sakal: greft tutma %85-90, çene 800-1500, yanak 400-800, bıyık 300-600
  * Kaş: açı 10-15° (en kritik), tek köklü greft zorunlu, ense kıllı saç gibi uzadığı için kırpma gerekli
- Tüm standart bölümler: Hero + AEO direct answer + kimler için uygun + nasıl yapılır + süreç tablosu + vaka referansı + FAQ + CTA + disclaimer + WhatsApp float
- Schema (her sayfada 2): MedicalProcedure + FAQPage (5 soru)
- OG + Twitter Card + favicon + mobil nav + KVKK uyumlu tüm pattern'ler
- Footer linkleri düzeltildi: index.html "Hizmetler" bölümü → sakal-ekimi.html + kas-ekimi.html
- sitemap.xml güncellendi: +2 URL (priority 0.8, monthly)
- Preview doğrulama: sakal 200 OK, kaş 200 OK, sitemap eşleşme var
- Site sayfa sayısı: 19 → 21 (aktif)

## [2026-04-14] fix | Dalga 1 — Quick Win SEO & UX Düzeltmeleri
- 7 yüksek öncelikli madde çözüldü, preview fetch ile doğrulandı (sitemap/robots/favicon: 200 OK):
  1. **sitemap.xml**: 19 URL, priority ve changefreq tanımlı (ana sayfa 1.0 → yasal 0.3)
  2. **robots.txt**: Allow: /, Disallow: altinsoy.html, GPTBot/ClaudeBot/PerplexityBot/Google-Extended/anthropic-ai/CCBot whitelist (GEO stratejisi), Sitemap referansı
  3. **favicon.svg**: Altın "A" harfi, #131313 arka plan, Noto Serif — brand-uyumlu, 64x64 SVG
  4. **OG + Twitter Card (16 sayfa)**: Node.js script ile toplu eklendi — og:title/description/url/type/site_name/locale + og:image + twitter:card summary_large_image. Favicon linkleri de dahil.
  5. **Title 60 karakter fix**: 13 sayfanın title'ı kısaltıldı (ör. DHI sayfası 80→52 karakter). Brand "| Altınsoy" veya "| Altınsoy Hair Clinic" suffix tutarlı.
  6. **Türkçe karakter bug (478 replacement)**: 6 sayfada (FUE/DHI/Sapphire/3 vaka) ASCII-ye dönüşmüş Türkçe karakterler restore edildi. Script-based: 100+ pattern. "Sac" → "Saç", "Ucretsiz" → "Ücretsiz", "Yapilir" → "Yapılır" vb. Title + H1 + tüm body content.
  7. **Dead link fix**: index.html 5 adet `href="#"` → gerçek hedefe veya `<span>` (aktif/disabled). sac-analizi.html 1 adet aynı şekilde.
  8. **Medical disclaimer (8 sayfa)**: Footer'dan önce zorunlu "tıbbi tavsiye yerine geçmez" uyarısı. Ana sayfa + analizi + iletişim + araçlar: tam metin. Yasal 3 sayfa: kısa versiyon.
- 3 Node.js script üretildi (tools/): og-fix.js, turkish-fix.js, add-disclaimer.js — yeniden kullanılabilir.
- Audit skor iyileşmesi: SEO altyapı (sitemap/robots/favicon eksik) → TAMAMLANDI, OG sosyal paylaşım preview → TÜM SAYFA DESTEKLİ, Türkçe karakter tutarsızlığı → TEMİZ, dead link → 0.
- Kalan Dalga 1 maddesi: Tüm sayfa footer'larına brand signal barı (15y · 10K+ op · 42 ülke · 4.9/5) — opsiyonel
- Bir sonraki dalga: Dalga 2 (GA4 + GTM + Clarity + Tailwind production build + image lazy load)

## [2026-04-14] fix | Dalga 0 — Audit Kritik Düzeltmeleri Tamamlandı
- 5 kritik madde çözüldü, preview doğrulandı:
  1. **K1 (KVKK — BLOCK):** index.html hero formu `<form>` wrapper'a alındı + KVKK checkbox (required) + aydınlatma linkleri eklendi → Regulator BLOCK kaldırıldı
  2. **K2 (Doktor placeholder):** "Dr. [İsim Soyisim]" → "Altınsoy Klinik Ekibi / Kurucu Ekip" geçici metni. Physician schema yerine MedicalClinic.medicalSpecialty + memberOf ISHRS. Gerçek doktor bilgisi geldiğinde güncellenecek.
  3. **K3 (altinsoy.html eski):** noindex + nofollow meta + 0-sn refresh redirect → index.html. Canonical index'e → SEO çakışması engellendi.
  4. **Mobil navigasyon (15 sayfa):** Hamburger button + absolute overlay panel. Node.js script ile 14 sayfaya toplu eklendi + index.html manuel. Yasal 3 sayfa atlandı (basit nav gerektirmiyor). Pattern: `md:hidden` hamburger, `<nav>` `relative`, toggle JS inline onclick.
  5. **WhatsApp float (18 sayfa):** 17 sayfaya Node.js script ile toplu ekleme (index zaten vardı). Inline style bloğu + SVG icon + `rel="noopener noreferrer"`. Yasal 3 sayfa DAHİL (her yerden erişilebilir).
- Preview doğrulama: hamburger + mobile-menu + wa-float + KVKK checkbox hepsi DOM'da, kontrast ve stil sağlıklı
- Audit genel rapor skorları: Regulator 1 BLOCK → GEÇTİ, UX mobile nav kritik → ÇÖZÜLDÜ, içerik/marka placeholder → KAPATILDI
- Kalan yüksek öncelikli (Dalga 1): sitemap.xml, robots.txt, favicon, OG/Twitter meta, Türkçe karakter bug (3 teknik sayfada), dead link'ler
- Konsolide rapor: wiki/outputs/audit-genel-rapor-2026-04-14.md (güncellenebilir)

## [2026-04-14] audit | Kapsamlı Ekip Audit — 17 Rol Perspektifi
- 8 agent paralel dispatch edildi (5 başarılı, 3 rate-limit → manuel tamamlandı)
- 18 HTML sayfa + 8 wiki dokümanı denetlendi
- 8 alt rapor + 1 konsolide rapor üretildi (wiki/outputs/audit-*)
- Özet bulgular:
  * Tıbbi (trichologist): 4.73/5 — KALİTE KAPISI GEÇTİ, 0 kırmızı çizgi ihlali
  * Regülasyon: 3.5/5 — 1 BLOCK (index form KVKK checkbox eksik)
  * İçerik & Marka: 3.1/5 — REVİZYON GEREKLİ (altinsoy.html eski, placeholder'lar)
  * SEO/GEO/AEO: 3.5/5 — Altyapı eksik (sitemap, robots, favicon, OG image)
  * Tasarım & UX: 3.5/5 — Mobil nav YOK, WhatsApp float sadece index'te
  * Teknik: 4/10 — Tailwind CDN, placeholder'lar, backend yok
  * Analitik: 1/10 — Sıfır tracking aktif
  * Wiki tutarlılık: 8/10 — güncel, ufak sayım hatası
- Yasak kelime taraması: TÜM SAYFALAR TEMİZ (0 ihlal)
- 3 KRİTİK (yayın bloker) bulgu: KVKK checkbox, placeholder doktor, altinsoy.html eski
- 18 YÜKSEK öncelikli, 28 ORTA, 24 DÜŞÜK bulgu
- Cross-sayfa tutarsızlık: %85-95 greft tutma DHI'da eksik, 10.000+/42 ülke/4.9 sadece index'te
- Konsolide rapor: wiki/outputs/audit-genel-rapor-2026-04-14.md
- Sonraki adım: Kullanıcı Dalga 0 (kritik), Dalga 1 (quick win), Dalga 2 (ölçüm) seçimi bekleniyor

## [2026-04-14] feature | Farklılaşma #3 — Fiyat Hesaplama Aracı (İnteraktif)
- Dosya: preview/fiyat-hesaplama.html
- Zincir: komutan → health-regulator (fiyat sayfası disiplini — yasak kelime denetimi) + trichologist (teknik fiyat çarpanı mantığı) + strategy-planner (fiyat sayfasıyla uyum) + patient-psych (güven dili) + ux-architect (wizard) + seo-geo-aeo (3 schema) → copywriter → regulator review (0 yasak kelime doğrulandı) → tricho review (0 ihlal) → director (ONAYLANDI) → web-dev → wiki-ops
- 4 adım wizard: teknik → greft aralığı → paket → sonuç
- Fiyat algoritması:
  * Teknik çarpanı: FUE 1.0x, Sapphire 1.10x, DHI 1.20x
  * Greft çarpanı: small 0.90, medium 1.0, large 1.10, xlarge 1.15
  * Paket baz fiyatları: Standart €2.500-3.000, Premium €3.500-4.000, Uluslararası €4.500-4.800
  * Paket cap: Standart max €3.500, Premium max €4.500, Uluslararası max €5.000
- 5 test senaryosu doğrulandı (tümünde min ≤ max, €2.250-5.000 aralığında, fiyat sayfasıyla uyumlu)
- Bug fix: Yüksek teknik+greft kombinasyonunda min > max oluyordu — cap logic düzeltildi
- Regulator KRİTİK kontrol: 0 yasak kelime (indirim/kampanya/fırsat/tasarruf/avantaj hiçbiri yok)
- "Yazılı teklif" dili her yerde vurgulu — "gizli ücret çıkmaz" mesajı
- KVKK: Client-side hesaplama, sunucuya veri gönderilmez
- Schema (3): MedicalWebPage + HowTo (4 adım) + FAQPage (4 soru)
- Keyword: "saç ekimi fiyat hesaplama", "saç ekimi maliyet", "fue fiyat", "dhi fiyat"
- Cross-linking:
  * Greft hesaplama aracı → sonuç ekranına "Fiyat Hesapla" butonu eklendi (doğal akış)
  * Fiyat sayfası → CTA'ya "Fiyat Hesapla" butonu eklendi
  * Hero'da "Greft Hesaplama" aracına yönlendirme (tip box)
- Paket içerik listesi dinamik: seçilen paketin tüm dahil hizmetleri sonuç ekranında listelenir
- Ödeme seçenekleri gösterimi: nakit, kredi kartı, SWIFT transfer

## [2026-04-14] feature | Farklılaşma #2 — Greft Hesaplama Aracı (İnteraktif)
- Dosya: preview/greft-hesaplama.html
- Zincir: komutan → trichologist (greft formülü + Norwood/Ludwig verisi) + patient-psych (ton) + ux-architect (4-adım wizard) + ui-designer (SVG Norwood çizimleri) + seo-geo-aeo (schema) → copywriter → tricho review (0 ihlal) → regulator (teşhis iddiası yok, güçlü disclaimer) → director (ONAYLANDI 5/5) → web-dev → wiki-ops
- 4 adım wizard: alan (saç/sakal/kaş) → seviye (Norwood I-VII ya da Ludwig I-III ya da sakal/kaş alt seçenek) → yoğunluk → sonuç
- SVG Norwood/Ludwig illüstrasyonları (inline, primary renkli) — rakiplerden görsel ayrışma
- Greft tahminleri trichologist verisine birebir uyumlu:
  * Norwood II: 1500-2500, N3: 2500-3500, N4: 3500-4500, N5: 4500-5500, N6: 5500-7000, N7: 7000-8000
  * Ludwig I: 1500-2500, L2: 2500-3500, L3: 3500-4500
  * Sakal: çene 800-1500, yanak 400-800, bıyık 300-600, tam 1500-2500
  * Kaş: tam çift 300-500, simetri 150-300
- Yoğunluk çarpanı (sadece saç için): doğal 0.85x, orta 1.0x, yüksek 1.2x
- Otomatik paket önerisi (dinamik): ≤3500 → Standart, ≤5000 → Premium, >5000 → Uluslararası/Çoklu seans
- Test sonuçları (preview doğrulamalı):
  * Norwood III + orta yoğunluk → 2.500-3.500 → Standart Paket ✓
  * Norwood VI + yüksek yoğunluk → 6.600-8.400 → Çoklu Seans ✓
  * Kaş tam restorasyon → 300-500 ✓
- KVKK: Tamamen client-side hesaplama, sunucuya veri gönderilmez
- Kalite kapıları:
  * Trichologist: 0 kırmızı çizgi ihlali (garantili/ağrısız/%100 yok)
  * Health-regulator: "tahmin" dili her yerde, "tıbbi teşhis değildir" bold disclaimer, KVKK uyumlu
  * Agency-director: 5/5 — farklılaşma stratejisinin ikinci somut ürünü
- Schema (3 adet): MedicalWebPage + HowTo (4 adım) + FAQPage (3 soru)
- Keyword hedefleri: "saç ekimi kaç greft", "greft hesaplama", "norwood 3 kaç greft"
- Linkleme: sac-ekimi.html hub CTA bölümüne 3. buton olarak eklendi
- Rakip gap: Rakiplerin çoğunda basit input form var; bizde görsel SVG Norwood + dinamik paket önerisi
- AEO avantajı: SVG görseller + tablo + FAQPage schema = AI Overview için ideal format

## [2026-04-14] content | Farklılaşma #1 — "Saç Ekimi Kimler İçin Uygun Değildir" Sayfası
- Farklılaşma stratejisi fark #1 uygulandı: etik şeffaflık sayfası
- Dosya: preview/uygun-degil.html
- Zincir: komutan → trichologist (kontrendikasyonlar data) + patient-psych (empati tonu) + seo-geo-aeo (keyword + schema) → copywriter → tricho review (0 ihlal) → regulator (teşhis iddiası yok, disclaimer güçlü) → director (ONAYLANDI 4.8/5) → web-dev → wiki-ops
- İçerik yapısı:
  * Hero: cesur başlık "herkes için uygun değildir"
  * AEO kısa cevap box
  * 7 mutlak kontrendikasyon (alopesi areata, yetersiz donor, 18 yaş altı, kan pıhtılaşma, kronik hastalık, cilt hastalığı, trikotillomani)
  * 4 görece yasak (sigara, keloid, otoimmun, erken dönem)
  * 4 beklenti/psikolojik uygunsuzluk kriteri
  * 3 alternatif yol (medikal, PRP, SMP)
  * 5 FAQ (yaş, kadın, diyabet, tekrar ekim, karar süreci)
  * Güçlü disclaimer
- SEO keyword: "saç ekimi yapılmaz kimler" (düşük rekabet, yüksek intent)
- Schema: MedicalWebPage + FAQPage
- OpenGraph meta eklendi
- Link: sac-ekimi.html hub sayfasındaki "Uygun Olmayabilir" bölümünden link verildi
- Rakip gap: Hiçbir uluslararası/TR klinikte bu detayda şeffaflık yok → AI citation + SEO avantajı

## [2026-04-14] strategy | Özellik Kıyaslaması & Farklılaşma Stratejisi
- Uluslararası 10 lider klinik (TR: Smile Hair, ASMED, Elithair, Cinik, Este Garanti; Global: Hims, Bosley, Harley Street, DHI Global, Farjo) özellik envanteri çıkarıldı
- 8 kategoride 50+ özellik kıyaslandı (AI/teknoloji, video, iletişim, rezervasyon, ek ürün, sosyal kanıt, güven/garanti, dijital deneyim)
- Altınsoy durumu: temeller sağlam, katmanlı özellikler eksik (rakiplerden 2-3 katman geride)
- 7 fark yaratan öneri (kopya değil, yenilikçi):
  1. "Saç Ekimi Yapılmaz Kimler İçin" etik şeffaflık sayfası
  2. "Hasta Seçiciliği" lüks konumlandırma
  3. Operasyon Günü PWA
  4. Derin vaka çalışması standardı (5-10 derin > 100 yüzey)
  5. "Altınsoy Research" akademik katman
  6. "5 Dakika Doktor" canlı yayın serisi
  7. "Greft Emanet" risk-reversal programı
- 4 dalga önceliklendirme (2 hafta / 6 hafta / 3 ay / 6 ay)
- Hemen bu hafta yapılabilir 4 özellik belirlendi: uygun değil sayfası, greft hesaplayıcı, fiyat kalkülatörü, uygunluk testi
- Dosya: wiki/strategy/ozellik-kiyaslamasi-ve-farklilasma.md

## [2026-04-14] component | Chatbot Widget — UI Mock
- Ana sayfaya floating chatbot widget eklendi (sağ alt köşe)
- WhatsApp butonu bottom:28px → bottom:96px konumuna taşındı (çakışma çözüldü)
- Chatbot toggle: 56x56px gold gradient + pulse animation
- Panel: 380x600px, glassmorphic dark theme (Onyx & Gilt uyumlu)
- Features:
  * Header (avatar + "Altınsoy Asistan" + çevrimiçi status dot + close)
  * Welcome messages (disclaimer + karşılama)
  * 5 hızlı soru butonu (fiyat, FUE vs DHI, ağrı, sonuç süresi, analiz)
  * Input area (textarea auto-resize + send button)
  * Typing indicator (3 dot bounce animation)
  * Smooth slide-in mesaj animasyonları
- Mock cevaplar: 5 hazır yanıt (link'li, wiki sayfalarına yönlendirme)
- Default response: cevap bulunamadıysa WhatsApp + analiz formu öner
- Health-regulator: Disclaimer ("tıbbi teşhis yerine geçmez") her sohbette görünür
- Trichologist: Tıbbi iddia yok, beklenti yönetimi (%85-95 yerine yok, uzman konsültasyonu yönlendirme)
- Test: Preview'da toggle + mesaj gönderimi doğrulandı
- Sadece index.html'de — diğer sayfalara isteğe bağlı eklenebilir
- Gelecek: Mock yerine gerçek AI (OpenAI/Claude) entegrasyonu için JS'deki getResponse fonksiyonu değiştirilebilir

## [2026-04-14] content | Sprint 3 — Dönüşüm Sayfaları Üretildi
- 4 HTML sayfa: oncesi-sonrasi.html, fiyat.html, iletisim.html, fue-vs-dhi.html
- Zincir: komutan → writing-plans (sprint3 plan) → 3 paralel agent (galeri + iletişim + karşılaştırma) + 1 manual (fiyat — regulator kritik)
- Galeri: filtre UI (teknik/bölge/ay), 9 kart (3 aktif + 6 placeholder), AEO soru formatı
- Fiyat: ŞEFFAFLIK odaklı, 3 paket (€2.5K-5K), "indirim" türevi 0 kelime, disclaimer zorunlu
- İletişim: 4 iletişim metodu (WhatsApp highlight), çalışma saatleri, form, KVKK checkbox, dinamik açık/kapalı status
- FUE vs DHI: 10 kriterli fair karşılaştırma tablosu, pazarlama yalanları reddedildi, "hiçbir teknik daha iyi değil" disclaimer
- Regulator kapısı: Fiyat sayfası el ile yazıldı ve denetlendi (yasak kelime 0)
- Galeri link düzeltmesi: vaka sayfa adları düzeltildi (-greft.html suffix ekle)
- Ana sayfa nav güncellendi: Dönüşümler → galeri, Cerrah → Fiyat değiştirildi, İletişim → iletisim.html
- Ana sayfa footer: WhatsApp ve e-posta linkleri bağlandı
- Sprint 2 ve 3 planları index.md'ye eklendi

## [2026-04-14] content | Saç Analizi v2 — Stitch + Bizim Birleştirme
- sac-analizi.html tamamen yeniden yazıldı: Stitch görsel kalitesi + bizim KVKK/içerik düzeltmeleri
- Stitch'ten: sidebar progress nav, cinematic loading, glass panel, editorial hero, tonal layering
- Bizimden: 3 adım (5 değil), KVKK checkbox, fotoğraf opsiyonel, "emin değilim", disclaimer, WhatsApp CTA
- DESIGN.md kuralları uygulandı: no-line rule, ghost border, cta-gold gradient, ambient shadow, tonal depth
- Wizard JS: adım geçişleri, sidebar senkronizasyonu, loading animasyonu, success state

## [2026-04-14] content | Ücretsiz Saç Analizi Sayfası (Yeniden Tasarım)
- Stitch YZ Portal konsepti tamamen yeniden tasarlandı
- Stitch sorunları: "YZ analiz" abartısı, 5 adımlı karmaşık form, KVKK eksik, tıbbi iddia riski
- Yeni tasarım: 3 adımlı wizard (alan seç → profil seç → iletişim), hasta odaklı, KVKK uyumlu
- Trichologist: "YZ folikül analizi" → "ön değerlendirme" (web'de gerçek analiz yapılamaz)
- Health-regulator: KVKK açık rıza checkbox + aydınlatma linki eklendi, fotoğraf opsiyonel
- Patient-psychologist: empati tonu, "emin değilim" profil seçeneği, düşük risk CTA
- AEO: Schema (MedicalWebPage), disclaimer
- Nav CTA "Ücretsiz Analiz" → sac-analizi.html linkine bağlandı
- Dosya: preview/sac-analizi.html

## [2026-04-14] content | Vaka Detay Sayfaları — SEO+GEO+AEO
- 3 vaka sayfası oluşturuldu: vaka-fue-3200-greft.html, vaka-dhi-sakal-1800-greft.html, vaka-kas-restorasyonu-400-greft.html
- Üçlü optimizasyon: SEO (keyword, schema) + GEO (atıflanabilir veri, E-E-A-T) + AEO (soru formatı H2, doğrudan cevap, tablo)
- Ana sayfadaki before/after kartları tıklanabilir link yapıldı (div → a)
- seo-geo-specialist skill'e AEO bölümü eklendi (taktikler, soru formatı, üçlü strateji tablosu)
- Kırmızı çizgi kontrolü: 0 ihlal

## [2026-04-14] skill-update | SEO Skill'e AEO Eklendi
- seo-geo-specialist skill'i SEO+GEO+AEO üçlü yapıya güncellendi
- AEO taktikleri: soru-cevap blokları, ilk paragrafta doğrudan cevap, tablo/liste formatı, orijinal veri noktaları
- Çıktı spec'e AEO soru listesi + GEO citation hedefi eklendi
- Self-review'a AEO kontrol maddeleri eklendi

## [2026-04-14] content | Sprint 2 — Teknik Sayfalar Üretildi
- 4 HTML sayfa oluşturuldu: sac-ekimi.html (hub), sac-ekimi-fue.html, sac-ekimi-dhi.html, sac-ekimi-sapphire.html
- Hub: ~460 satır, 3 teknik karta link, süreç akışı, 4 SSS, Schema (MedicalProcedure + FAQ)
- FUE: ~462 satır, tam prosedür, avantaj/limit tablosu, 5 SSS
- DHI: ~494 satır, Choi kalemi detayı, DHI vs FUE karşılaştırma, 5 SSS
- Sapphire: ~506 satır, şeffaf yaklaşım ("dramatik fark yok"), FUE karşılaştırma
- Trichologist kırmızı çizgi kontrolü: 0 ihlal (garanti, ağrısız, devrimsel ifade yok)
- Health-regulator: 0 ihlal (disclaimer var, karşılaştırma yok, abartı yok)
- Ana sayfa teknik kartları tıklanabilir link yapıldı (div → a)
- Ana sayfa footer "Saç Ekimi" linki bağlandı
- FUE + DHI + Sapphire paralel agent ile üretildi (dispatching-parallel-agents kalıbı)

## [2026-04-14] content | Sprint 1 — Yasal Sayfalar Üretildi
- 3 HTML sayfa oluşturuldu: gizlilik-politikasi.html, kvkk-aydinlatma.html, cerez-politikasi.html
- Tümü aynı Onyx & Gilt design system ile
- Health-regulator: 3/3 GEÇTİ
- Footer linkleri bağlandı (ana sayfa → yasal sayfalar)
- Form altı KVKK linki bağlandı
- Cookie banner linki bağlandı
- Placeholder: [Klinik Adresi] gerçek adresle değiştirilmeli
- Sprint 1 doktor profili → kullanıcıdan bilgi bekleniyor

## [2026-04-14] strategy | Site Haritası & Eksik Sayfa Kritik Analizi
- Zincir: wiki-ops → seo-geo-specialist + ux-architect + patient-psychologist (paralel) → strategy-planner → trichologist (ONAYLA + PRP önerisi) → agency-director (ONAYLANDI)
- Dosya: wiki/strategy/site-haritasi.md
- Mevcut: 1 sayfa (ana sayfa)
- Hedef: 20 sayfa, 5 sprint, 12 hafta
- 11 KRİTİK sayfa tespit (3 yasal + 8 içerik)
- 5 YÜKSEK, 4 ORTA öncelikli sayfa
- Hasta journey → sayfa eşlemesi (Faz 1-5 giriş noktaları)
- Trichologist ek öneri: PRP tedavisi sayfası (Sprint 5'e eklendi)

## [2026-04-14] content | Blog: Saç Ekimi Sonrası Şok Dökülme
- Zincir: wiki-ops → patient-psychologist + seo-geo-specialist (paralel) → copywriter → trichologist (3 düzeltme) → health-regulator (GEÇTİ) → agency-director (ONAYLANDI)
- Dosya: wiki/content/blog/sac-ekimi-sonrasi-sok-dokulme.md
- Hasta fazı: Faz 5 (post-op)
- Birincil keyword: "saç ekimi sonrası şok dökülme"
- Trichologist düzeltmeleri: telogen effluvium eşitleme kaldırıldı, oran eklendi (%85-95), PRP iddiası yumuşatıldı
- Status: draft → review geçti → yayına hazır (görseller eklendiğinde final)

## [2026-04-14] milestone | Skill Refactoring TAMAMLANDI
- 24 skill üretim hazır (17 domain + 6 core + 1 redirect)
- Kontrat sistemi aktif (ön koşul → çıktı spec → self-review → handoff)
- Bağımlılık motoru aktif (komutan ön koşul kontrolü ile)
- Kalite kapısı zinciri tanımlı (trichologist → health-regulator → agency-director)
