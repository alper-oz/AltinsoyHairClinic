-- Sitemap admin paneli için sayfa aktif/pasif yönetimi.
-- Path: routing.pathnames'deki internal pathname (örn. "/sac-ekimi"). Locale prefix YOK.
-- Pasif sayfalar middleware tarafından "/" anasayfaya 301 redirect edilir.
-- Kilitli sayfalar (anasayfa + 3 yasal) UI'da toggle'sız ama tabloda yine var.
--
-- Çalıştırma:
--   1. Supabase Dashboard → SQL Editor → New query
--   2. Bu dosyanın tamamını yapıştır → Run
--   3. Idempotent — yeniden çalıştırılması güvenlidir.

CREATE TABLE IF NOT EXISTS page_settings (
  path        text PRIMARY KEY,
  active      boolean NOT NULL DEFAULT true,
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Seed: routing.pathnames'deki tüm internal pathname'ler.
-- ON CONFLICT DO NOTHING — mevcut kayıtların active değerine dokunmaz.
INSERT INTO page_settings (path, active) VALUES
  ('/', true),
  ('/sac-ekimi', true),
  ('/sac-ekimi/fue', true),
  ('/sac-ekimi/dhi', true),
  ('/sac-ekimi/sapphire', true),
  ('/sakal-ekimi', true),
  ('/kas-ekimi', true),
  ('/fue-vs-dhi', true),
  ('/sac-analizi', true),
  ('/fiyat', true),
  ('/fiyat-hesaplama', true),
  ('/greft-hesaplama', true),
  ('/oncesi-sonrasi', true),
  ('/iletisim', true),
  ('/uygun-degil', true),
  ('/vaka/dhi-sakal-1800-greft', true),
  ('/vaka/fue-3200-greft', true),
  ('/vaka/kas-restorasyonu-400-greft', true),
  ('/kvkk-aydinlatma', true),
  ('/gizlilik-politikasi', true),
  ('/cerez-politikasi', true),
  ('/client-data', true)
ON CONFLICT (path) DO NOTHING;

-- Önceden seed edilmiş /altinsoy varsa kaldır (route artık mevcut değil).
DELETE FROM page_settings WHERE path = '/altinsoy';

-- updated_at otomatik trigger
CREATE OR REPLACE FUNCTION page_settings_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS page_settings_updated_at_trigger ON page_settings;
CREATE TRIGGER page_settings_updated_at_trigger
  BEFORE UPDATE ON page_settings
  FOR EACH ROW
  EXECUTE FUNCTION page_settings_set_updated_at();
