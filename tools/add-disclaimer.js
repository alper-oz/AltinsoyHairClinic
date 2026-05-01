const fs = require('fs');
const path = require('path');

const baseDir = 'C:/Users/ayhan.DESKTOP-N8B524F/Desktop/Opsidian/altınsoy/preview';

// Disclaimer metni — footer'dan ÖNCE eklenecek
const disclaimer = `
<!-- Medical Disclaimer -->
<div class="px-6 py-8 text-center border-t border-outline-variant/10">
  <p class="text-[10px] text-on-surface/50 leading-relaxed max-w-3xl mx-auto">
    Bu web sitesindeki içerik genel bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez. Kişisel durumunuza uygun değerlendirme ancak uzman hekim konsültasyonu ile yapılabilir. Bireysel sonuçlar değişkenlik gösterebilir.
  </p>
</div>
`;

// Yasal sayfalarda zaten kendi disclaimer'ları var (KVKK, gizlilik konuları) — ama genel medikal disclaimer yine de footer öncesi ekleme mantıklı. Kısa versiyon.
const legalDisclaimer = `
<!-- Medical Notice -->
<div class="px-6 py-6 text-center border-t border-outline-variant/10">
  <p class="text-[10px] text-on-surface/50 leading-relaxed max-w-2xl mx-auto">
    Bu sayfa yasal bilgilendirme içerir. Tıbbi konsültasyon için uzman hekimle iletişime geçiniz.
  </p>
</div>
`;

const files = {
  'index.html': disclaimer,
  'sac-analizi.html': disclaimer,
  'iletisim.html': disclaimer,
  'greft-hesaplama.html': disclaimer,
  'fiyat-hesaplama.html': disclaimer,
  'gizlilik-politikasi.html': legalDisclaimer,
  'kvkk-aydinlatma.html': legalDisclaimer,
  'cerez-politikasi.html': legalDisclaimer
};

let added = 0;

for (const [f, block] of Object.entries(files)) {
  const filePath = path.join(baseDir, f);
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('Medical Disclaimer') || content.includes('Medical Notice')) {
      console.log(`SKIP (already has disclaimer): ${f}`);
      continue;
    }

    // Footer'dan ÖNCE ekle
    const footerStart = content.indexOf('<footer');
    if (footerStart === -1) {
      console.log(`WARN (no footer found): ${f}`);
      continue;
    }

    content = content.slice(0, footerStart) + block + '\n' + content.slice(footerStart);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`OK: ${f}`);
    added++;
  } catch (e) {
    console.log(`ERROR: ${f} - ${e.message}`);
  }
}

console.log(`\n--- Added: ${added} ---`);
