const fs = require('fs');
const path = require('path');

const baseDir = 'C:/Users/ayhan.DESKTOP-N8B524F/Desktop/Opsidian/altınsoy/preview';

// Kelime bazlı replacement — sadece spesifik Türkçe karakter hataları
// Sıra önemli: önce uzun kalıplar, sonra kısa
const fixes = [
  // Teknik terimler
  ['Sac Ekimi', 'Saç Ekimi'],
  ['sac ekimi', 'saç ekimi'],
  ['Sac ekimi', 'Saç ekimi'],
  ['Nasil Yapilir', 'Nasıl Yapılır'],
  ['nasil yapilir', 'nasıl yapılır'],
  ['Sonuclar ve Surec', 'Sonuçlar ve Süreç'],
  ['Sonuclar ve Surecleri', 'Sonuçlar ve Süreçleri'],
  ['Sonuclar', 'Sonuçlar'],
  ['Surec', 'Süreç'],
  ['Islem', 'İşlem'],
  ['Ucretsiz', 'Ücretsiz'],
  ['ucretsiz', 'ücretsiz'],
  ['Safir Uclu', 'Safir Uçlu'],
  ['safir uclu', 'safir uçlu'],
  ['Uclu Teknik', 'Uçlu Teknik'],
  ['Istanbul', 'İstanbul'],
  ['istanbul', 'istanbul'],
  ['Sonucu:', 'Sonucu:'],
  ['Sure', 'Süre'],
  ['Greft Sonucu', 'Greft Sonucu'],
  ['Altinsoy', 'Altınsoy'],
  ['altinsoy', 'altınsoy'],
  ['Oncesi Sonrasi', 'Öncesi Sonrası'],
  ['oncesi sonrasi', 'öncesi sonrası'],
  ['Kas Restorasyonu', 'Kaş Restorasyonu'],
  ['kas restorasyonu', 'kaş restorasyonu'],
  ['Kas Ekimi', 'Kaş Ekimi'],
  ['kas ekimi', 'kaş ekimi'],
  ['Kadin,', 'Kadın,'],
  ['Teknigi', 'Tekniği'],
  ['teknigi', 'tekniği'],
  ['Teknigininin', 'Tekniğinin'],
  ['Gelistirilmis', 'Geliştirilmiş'],
  ['gelistirilmis', 'geliştirilmiş'],
  ['Avantajlar ve Sonuclar', 'Avantajlar ve Sonuçlar'],
  ['Dogal', 'Doğal'],
  ['dogal', 'doğal'],
  ['Cerezler', 'Çerezler'],
  ['Follikuler', 'Folliküler'],
  ['follikuler', 'folliküler'],
  ['Uniteler', 'Üniteler'],
  ['uniteler', 'üniteler'],
  ['Unite', 'Ünite'],
  ['Direkt Implantasyon', 'Direkt İmplantasyon'],
  ['agrisiz', 'ağrısız'],
  ['agrili', 'ağrılı'],
  ['ekimi agrili', 'ekimi ağrılı'],
  ['agrili mi', 'ağrılı mı'],
  ['agri', 'ağrı'],
  ['Agri', 'Ağrı'],
  ['tutma', 'tutma'],
  ['gorulur', 'görülür'],
  ['Gorulur', 'Görülür'],
  ['donor', 'donor'],
  ['sok dokulme', 'şok dökülme'],
  ['Sok Dokulme', 'Şok Dökülme'],
  ['dokulme', 'dökülme'],
  ['Dokulme', 'Dökülme'],
  ['basari', 'başarı'],
  ['Basari', 'Başarı'],
  ['basarili', 'başarılı'],
  ['yogun', 'yoğun'],
  ['Yogun', 'Yoğun'],
  ['sure', 'süre'],
  ['surecte', 'süreçte'],
  ['sureli', 'süreli'],
  ['acisiz', 'acısız'],
  ['Istanbulda', 'İstanbulda'],
  ['gorusulur', 'görüşülür'],
  ['Gorusulur', 'Görüşülür'],
  ['konustugu', 'konuştuğu'],
  ['gozonune', 'göz önüne'],
  ['Goz', 'Göz'],
  ['Goruntu', 'Görüntü'],
  ['goruntu', 'görüntü'],
  ['ozgu', 'özgü'],
  ['ozel', 'özel'],
  ['Ozel', 'Özel'],
  ['uzerine', 'üzerine'],
  ['uzerinde', 'üzerinde'],
  ['cikacak', 'çıkacak'],
  ['cikislar', 'çıkışlar'],
  ['Cikislar', 'Çıkışlar'],
  ['ciki', 'çıkı'],  // tehlikeli olabilir
];

const files = [
  'sac-ekimi-fue.html',
  'sac-ekimi-dhi.html',
  'sac-ekimi-sapphire.html',
  'vaka-fue-3200-greft.html',
  'vaka-dhi-sakal-1800-greft.html',
  'vaka-kas-restorasyonu-400-greft.html'
];

let totalReplacements = 0;

for (const f of files) {
  const filePath = path.join(baseDir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  let fileReplacements = 0;

  for (const [from, to] of fixes) {
    if (from === to) continue; // noop
    const before = content.length;
    // Sadece tek başına kelime olarak değiştir — ama biz zaten burada kısıtlı bir kelime setine bakıyoruz
    // Direkt string replace yapalım
    const parts = content.split(from);
    if (parts.length > 1) {
      content = parts.join(to);
      fileReplacements += parts.length - 1;
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`${f}: ${fileReplacements} replacements`);
  totalReplacements += fileReplacements;
}

console.log(`\n--- Total: ${totalReplacements} replacements ---`);
