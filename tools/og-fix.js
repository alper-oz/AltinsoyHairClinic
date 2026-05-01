const fs = require('fs');
const path = require('path');

const baseDir = 'C:/Users/ayhan.DESKTOP-N8B524F/Desktop/Opsidian/altınsoy/preview';

const pageConfig = {
  'index.html': {
    title: 'Altınsoy Hair Clinic | Saç Ekimi İstanbul',
    ogTitle: 'Altınsoy Hair Clinic — Saç, Sakal & Kaş Restorasyonu',
    ogDesc: '15 yıl deneyim, 10.000+ operasyon. FUE, DHI, Sapphire saç ekimi. Ücretsiz online saç analizi.',
    ogUrl: 'https://altinsoy.com/',
    ogType: 'website'
  },
  'sac-ekimi.html': {
    title: 'Saç Ekimi Nedir? Teknikler ve Sonuçlar | Altınsoy',
    ogTitle: 'Saç Ekimi: Teknikler, Süreç ve Sonuçlar',
    ogDesc: 'FUE, DHI ve Sapphire teknikleri. İşlem, iyileşme ve sonuçlar.',
    ogUrl: 'https://altinsoy.com/sac-ekimi/',
    ogType: 'article'
  },
  'sac-analizi.html': {
    title: 'Ücretsiz Saç Analizi | Altınsoy Hair Clinic',
    ogTitle: 'Ücretsiz Saç Analizi — 60 Saniyede',
    ogDesc: 'Dökülme seviyenizi belirleyin, kişisel tedavi planınızı alın. Bağlayıcı değil.',
    ogUrl: 'https://altinsoy.com/sac-analizi/',
    ogType: 'website'
  },
  'sac-ekimi-fue.html': {
    title: 'FUE Saç Ekimi: Nasıl Yapılır, Sonuçlar | Altınsoy',
    ogTitle: 'FUE Saç Ekimi — Doğal Sonuçlar, Modern Teknik',
    ogDesc: 'FUE saç ekimi nasıl yapılır? İşlem süresi, iyileşme, sonuçlar.',
    ogUrl: 'https://altinsoy.com/fue-sac-ekimi/',
    ogType: 'article'
  },
  'sac-ekimi-dhi.html': {
    title: 'DHI Saç Ekimi: Choi Kalemi Tekniği | Altınsoy',
    ogTitle: 'DHI Saç Ekimi — Choi Kalemi Tekniği',
    ogDesc: 'DHI ile hassas açı kontrolü ve yüksek yoğunluk. Süreç, avantajlar ve sonuçlar.',
    ogUrl: 'https://altinsoy.com/dhi-sac-ekimi/',
    ogType: 'article'
  },
  'sac-ekimi-sapphire.html': {
    title: 'Sapphire FUE Saç Ekimi | Altınsoy Hair Clinic',
    ogTitle: 'Sapphire FUE — Safir Uçlu Saç Ekimi',
    ogDesc: 'FUE\u2019nin safir bıçakla uygulanan versiyonu. Daha küçük kesi, daha hızlı iyileşme.',
    ogUrl: 'https://altinsoy.com/sapphire-fue/',
    ogType: 'article'
  },
  'fue-vs-dhi.html': {
    title: 'FUE vs DHI: Hangi Teknik Size Uygun? | Altınsoy',
    ogTitle: 'FUE vs DHI — Fair Karşılaştırma',
    ogDesc: 'İki tekniğin gerçek farkları, bias olmadan. Hangi durumda hangi teknik idealdir?',
    ogUrl: 'https://altinsoy.com/fue-vs-dhi/',
    ogType: 'article'
  },
  'oncesi-sonrasi.html': {
    title: 'Saç Ekimi Öncesi Sonrası Galeri | Altınsoy',
    ogTitle: 'Saç Ekimi Öncesi Sonrası — Gerçek Sonuçlar',
    ogDesc: 'Şeffaf vaka galerisi. Teknik, greft, zaman bilgisi. Hasta onamıyla paylaşılmaktadır.',
    ogUrl: 'https://altinsoy.com/oncesi-sonrasi/',
    ogType: 'website'
  },
  'fiyat.html': {
    title: 'Saç Ekimi Fiyatları 2026 | Altınsoy',
    ogTitle: 'Saç Ekimi Fiyatları — Şeffaf Paketler',
    ogDesc: '€2.500 — €5.000 aralığında 3 paket. Neye dahil, neye dahil değil net.',
    ogUrl: 'https://altinsoy.com/fiyat/',
    ogType: 'website'
  },
  'iletisim.html': {
    title: 'İletişim & Randevu | Altınsoy Hair Clinic',
    ogTitle: 'Altınsoy — İletişim & Randevu',
    ogDesc: 'WhatsApp, telefon, e-posta, form. 7/24 ulaşın. İstanbul klinik adresi.',
    ogUrl: 'https://altinsoy.com/iletisim/',
    ogType: 'website'
  },
  'vaka-fue-3200-greft.html': {
    title: 'FUE Vaka: 3.200 Greft, 12 Ay | Altınsoy',
    ogTitle: 'FUE Saç Ekimi Sonucu — 3.200 Greft, 12 Ay',
    ogDesc: '34 yaşında erkek hastada Norwood III ön hat restorasyonu. Hasta onamıyla.',
    ogUrl: 'https://altinsoy.com/oncesi-sonrasi/fue-3200-greft/',
    ogType: 'article'
  },
  'vaka-dhi-sakal-1800-greft.html': {
    title: 'DHI Sakal Vaka: 1.800 Greft, 10 Ay | Altınsoy',
    ogTitle: 'DHI Sakal Ekimi Sonucu — 1.800 Greft, 10 Ay',
    ogDesc: '29 yaşında erkek hastada sakal yoğunlaştırma. Hasta onamıyla.',
    ogUrl: 'https://altinsoy.com/oncesi-sonrasi/dhi-sakal-1800-greft/',
    ogType: 'article'
  },
  'vaka-kas-restorasyonu-400-greft.html': {
    title: 'Kaş Vaka: 400 Greft, 8 Ay | Altınsoy',
    ogTitle: 'Kaş Restorasyonu — 400 Greft, 8 Ay',
    ogDesc: '38 yaşında kadın hastada simetri düzeltme ve doğal kavis. Hasta onamıyla.',
    ogUrl: 'https://altinsoy.com/oncesi-sonrasi/kas-restorasyonu-400-greft/',
    ogType: 'article'
  },
  'gizlilik-politikasi.html': {
    title: 'Gizlilik Politikası | Altınsoy Hair Clinic',
    ogTitle: 'Gizlilik Politikası — Altınsoy',
    ogDesc: 'KVKK ve GDPR kapsamında kişisel veri işleme politikamız.',
    ogUrl: 'https://altinsoy.com/gizlilik-politikasi/',
    ogType: 'website'
  },
  'kvkk-aydinlatma.html': {
    title: 'KVKK Aydınlatma Metni | Altınsoy',
    ogTitle: 'KVKK Aydınlatma Metni — Altınsoy',
    ogDesc: '6698 sayılı KVKK kapsamında aydınlatma metni.',
    ogUrl: 'https://altinsoy.com/kvkk-aydinlatma/',
    ogType: 'website'
  },
  'cerez-politikasi.html': {
    title: 'Çerez Politikası | Altınsoy Hair Clinic',
    ogTitle: 'Çerez Politikası — Altınsoy',
    ogDesc: 'Web sitemizde kullanılan çerezler ve yönetimi hakkında bilgi.',
    ogUrl: 'https://altinsoy.com/cerez-politikasi/',
    ogType: 'website'
  }
};

let updated = 0, skipped = 0;

for (const [f, cfg] of Object.entries(pageConfig)) {
  const filePath = path.join(baseDir, f);
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    content = content.replace(/<title>[^<]*<\/title>/, `<title>${cfg.title}</title>`);

    const ogBlock = [
      '',
      '<!-- OpenGraph -->',
      `<meta property="og:title" content="${cfg.ogTitle}"/>`,
      `<meta property="og:description" content="${cfg.ogDesc}"/>`,
      `<meta property="og:url" content="${cfg.ogUrl}"/>`,
      `<meta property="og:type" content="${cfg.ogType}"/>`,
      '<meta property="og:site_name" content="Altınsoy Hair Clinic"/>',
      '<meta property="og:locale" content="tr_TR"/>',
      '<meta property="og:image" content="https://altinsoy.com/og-image.jpg"/>',
      '<meta property="og:image:width" content="1200"/>',
      '<meta property="og:image:height" content="630"/>',
      '<!-- Twitter Card -->',
      '<meta name="twitter:card" content="summary_large_image"/>',
      `<meta name="twitter:title" content="${cfg.ogTitle}"/>`,
      `<meta name="twitter:description" content="${cfg.ogDesc}"/>`,
      '<meta name="twitter:image" content="https://altinsoy.com/og-image.jpg"/>',
      '<!-- Favicon -->',
      '<link rel="icon" type="image/svg+xml" href="favicon.svg"/>',
      '<link rel="apple-touch-icon" href="favicon.svg"/>',
      ''
    ].join('\n');

    // Temizle: mevcut OG/Twitter/favicon'ları kaldır
    content = content.replace(/<meta property="og:[^"]*" content="[^"]*"\s*\/?>\n?/g, '');
    content = content.replace(/<meta name="twitter:[^"]*" content="[^"]*"\s*\/?>\n?/g, '');
    content = content.replace(/<link rel="icon"[^>]*>\n?/g, '');
    content = content.replace(/<link rel="apple-touch-icon"[^>]*>\n?/g, '');
    content = content.replace(/<!--\s*OpenGraph\s*-->\s*\n?/gi, '');
    content = content.replace(/<!--\s*Twitter Card\s*-->\s*\n?/gi, '');
    content = content.replace(/<!--\s*Favicon\s*-->\s*\n?/gi, '');

    // Canonical sonrasına OG ekle
    content = content.replace(
      /(<link rel="canonical"[^>]*\/?>)/,
      `$1${ogBlock}`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`OK: ${f}`);
    updated++;
  } catch (e) {
    console.log(`ERROR: ${f} - ${e.message}`);
  }
}

console.log(`\n--- Updated: ${updated} ---`);
