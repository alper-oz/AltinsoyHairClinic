import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

// GET — public: site hero verisini okur (tüm locale sütunlarıyla)
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("hero_config")
    .select("*")
    .limit(1)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// PUT — auth korumalı: hero config'i güncelle (singleton pattern)
export async function PUT(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const {
    eyebrow, headline, headline_italic, body: heroBody, cta_label,
    eyebrow_en, eyebrow_ar,
    headline_en, headline_ar,
    headline_italic_en, headline_italic_ar,
    body_en, body_ar,
    cta_label_en, cta_label_ar,
    cta_href, image_url,
  } = body;

  if (!headline?.trim()) {
    return NextResponse.json({ error: "Ana başlık zorunludur." }, { status: 400 });
  }

  const { data: existing } = await supabaseAdmin
    .from("hero_config")
    .select("id")
    .limit(1)
    .single();

  if (!existing) {
    return NextResponse.json({ error: "Hero config kaydı bulunamadı." }, { status: 404 });
  }

  const trim = (v: unknown) =>
    typeof v === "string" && v.trim() !== "" ? v.trim() : null;

  const { data, error } = await supabaseAdmin
    .from("hero_config")
    .update({
      eyebrow:              trim(eyebrow),
      headline:             headline.trim(),
      headline_italic:      trim(headline_italic),
      body:                 trim(heroBody),
      cta_label:            trim(cta_label),
      eyebrow_en:           trim(eyebrow_en),
      eyebrow_ar:           trim(eyebrow_ar),
      headline_en:          trim(headline_en),
      headline_ar:          trim(headline_ar),
      headline_italic_en:   trim(headline_italic_en),
      headline_italic_ar:   trim(headline_italic_ar),
      body_en:              trim(body_en),
      body_ar:              trim(body_ar),
      cta_label_en:         trim(cta_label_en),
      cta_label_ar:         trim(cta_label_ar),
      cta_href:             trim(cta_href),
      image_url:            trim(image_url),
      updated_at:           new Date().toISOString(),
    })
    .eq("id", existing.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
