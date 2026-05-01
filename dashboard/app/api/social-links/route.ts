import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { ALL_PLATFORMS } from "@/lib/social";

/** GET /api/social-links — public, tüm aktif linkleri döner */
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("social_links")
    .select("platform, url, active")
    .order("platform");

  if (error) return NextResponse.json({ error: "Veriler alınamadı." }, { status: 500 });
  return NextResponse.json(data ?? []);
}

/** PATCH /api/social-links — auth gerekli, tek platform günceller */
export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });

  const body = await request.json();
  const { platform, url, active } = body;

  if (!ALL_PLATFORMS.includes(platform)) {
    return NextResponse.json({ error: "Geçersiz platform." }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("social_links")
    .upsert({ platform, url: url ?? "", active: active ?? false, updated_at: new Date().toISOString() }, { onConflict: "platform" })
    .select("platform, url, active")
    .single();

  if (error) return NextResponse.json({ error: "Güncellenemedi." }, { status: 500 });
  return NextResponse.json(data);
}
