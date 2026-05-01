import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

// GET — Auth korumalı: tüm bannerları döner (tüm locale sütunlarıyla)
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from("banners")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST — Auth korumalı: yeni banner oluştur
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const {
    title, body: bannerBody, cta_label,
    title_en, title_ar,
    body_en, body_ar,
    cta_label_en, cta_label_ar,
    cta_url, position,
  } = body;

  if (!title?.trim()) {
    return NextResponse.json({ error: "Başlık zorunludur." }, { status: 400 });
  }

  const trim = (v: unknown) =>
    typeof v === "string" && v.trim() !== "" ? v.trim() : null;

  const { data, error } = await supabaseAdmin
    .from("banners")
    .insert([{
      title:         title.trim(),
      body:          trim(bannerBody),
      cta_label:     trim(cta_label),
      title_en:      trim(title_en),
      title_ar:      trim(title_ar),
      body_en:       trim(body_en),
      body_ar:       trim(body_ar),
      cta_label_en:  trim(cta_label_en),
      cta_label_ar:  trim(cta_label_ar),
      cta_url:       trim(cta_url),
      position:      position || "top",
      active:        false,
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
