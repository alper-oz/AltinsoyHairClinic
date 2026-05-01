import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

// GET /api/cases — public: visible cases only (site); auth: all cases (admin)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "1";

  if (all) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  let query = supabaseAdmin
    .from("case_studies")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (!all) query = query.eq("visible", true);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: "Veriler alınamadı." }, { status: 500 });
  return NextResponse.json(data);
}

// POST /api/cases — auth required
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });

  const body = await request.json();
  const {
    title, procedure, technique, notes,
    title_en, title_ar,
    procedure_en, procedure_ar,
    technique_en, technique_ar,
    notes_en, notes_ar,
    grafts, duration, age, gender,
    before_url, after_url, visible, sort_order,
  } = body;

  if (!title || !procedure || !technique) {
    return NextResponse.json({ error: "Başlık, prosedür ve teknik zorunludur." }, { status: 400 });
  }

  const trim = (v: unknown) =>
    typeof v === "string" && v.trim() !== "" ? v.trim() : null;

  const { data, error } = await supabaseAdmin
    .from("case_studies")
    .insert([{
      title,
      procedure,
      technique,
      notes:          notes || null,
      title_en:       trim(title_en),
      title_ar:       trim(title_ar),
      procedure_en:   trim(procedure_en),
      procedure_ar:   trim(procedure_ar),
      technique_en:   trim(technique_en),
      technique_ar:   trim(technique_ar),
      notes_en:       trim(notes_en),
      notes_ar:       trim(notes_ar),
      grafts:         grafts     ?? null,
      duration:       duration   || null,
      age:            age        ?? null,
      gender:         gender     || "erkek",
      before_url:     before_url || null,
      after_url:      after_url  || null,
      visible:        visible    ?? false,
      sort_order:     sort_order ?? 0,
    }])
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: "Kayıt oluşturulamadı." }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
