import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy singleton — module yüklendiğinde değil, ilk kullanıldığında oluşturulur.
// Bu sayede module-level throw Next.js SSG/route init'ini kırmaz.
let _client: SupabaseClient | null = null;

function getAdminClient(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      `Supabase admin client oluşturulamadı. Eksik env: ${!url ? "NEXT_PUBLIC_SUPABASE_URL" : "SUPABASE_SERVICE_ROLE_KEY"}`
    );
  }

  _client = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  return _client;
}

// Proxy — tüm property erişimlerini lazy client'a yönlendirir.
// Kullanım: `supabaseAdmin.from(...)` — mevcut kodlar değişmez.
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getAdminClient();
    const value = (client as unknown as Record<string | symbol, unknown>)[prop];
    return typeof value === "function" ? value.bind(client) : value;
  },
});
