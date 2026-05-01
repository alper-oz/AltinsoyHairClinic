import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

// GET /api/faqs — public: visible only; ?page=homepage
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const all  = searchParams.get("all") === "1";

  if (all) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  let query = supabaseAdmin
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at",  { ascending: true });

  if (!all) query = query.eq("visible", true);
  if (page) query = query.eq("page", page);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: "Veriler alınamadı." }, { status: 500 });
  return NextResponse.json(data);
}

// POST /api/faqs — auth required
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });

  const body = await request.json();
  const {
    question, answer,
    question_en, question_ar,
    answer_en, answer_ar,
    page, sort_order, visible,
  } = body;

  if (!question || !answer) {
    return NextResponse.json({ error: "Soru ve cevap zorunludur." }, { status: 400 });
  }

  const trim = (v: unknown) =>
    typeof v === "string" && v.trim() !== "" ? v.trim() : null;

  const { data, error } = await supabaseAdmin
    .from("faqs")
    .insert([{
      question,
      answer,
      question_en:  trim(question_en),
      question_ar:  trim(question_ar),
      answer_en:    trim(answer_en),
      answer_ar:    trim(answer_ar),
      page:         page       ?? "homepage",
      sort_order:   sort_order ?? 0,
      visible:      visible    ?? true,
    }])
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: "Kayıt oluşturulamadı." }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
