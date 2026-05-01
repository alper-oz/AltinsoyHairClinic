import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

// ─── POST /api/leads ─── Public: Formdan yeni lead oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, phone, email, interest, hair_loss, source, consent, photo_url,
            utm_source, utm_medium, utm_campaign, notes } = body;

    // Zorunlu alan kontrolü
    if (!name || !phone || !consent) {
      return NextResponse.json(
        { error: "Ad, telefon ve KVKK onayı zorunludur." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("leads")
      .insert([{
        name, phone, email, interest, hair_loss,
        source: source ?? "homepage",
        photo_url, consent,
        notes:        notes        || null,
        utm_source:   utm_source   || null,
        utm_medium:   utm_medium   || null,
        utm_campaign: utm_campaign || null,
      }])
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Lead insert error:", error);
      return NextResponse.json({ error: "Kayıt oluşturulamadı." }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }
}

// ─── GET /api/leads ─── Auth korumalı: Lead listesi
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const limit = parseInt(searchParams.get("limit") ?? "100");

  let query = supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "Veriler alınamadı." }, { status: 500 });
  }

  return NextResponse.json(data);
}
