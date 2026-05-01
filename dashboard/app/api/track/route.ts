import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, utm_source, utm_medium, utm_campaign, referrer } = body;

    if (!page) return new NextResponse(null, { status: 204 });

    // Dashboard sayfalarını sayma
    if (page.startsWith("/dashboard") || page.startsWith("/api") || page.startsWith("/login")) {
      return new NextResponse(null, { status: 204 });
    }

    await supabaseAdmin.from("page_views").insert([{
      page,
      utm_source:   utm_source   || null,
      utm_medium:   utm_medium   || null,
      utm_campaign: utm_campaign || null,
      referrer:     referrer     || null,
    }]);

    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 }); // Hata olsa da 204 dön
  }
}
