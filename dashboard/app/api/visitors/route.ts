import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

/** POST — site ziyaretçisi heartbeat (public, auth yok) */
export async function POST(request: NextRequest) {
  try {
    const { session_id, page } = await request.json();
    if (!session_id) return new NextResponse(null, { status: 204 });

    await supabaseAdmin
      .from("visitors")
      .upsert(
        { session_id, page: page ?? "/", last_seen: new Date().toISOString() },
        { onConflict: "session_id" }
      );
  } catch {
    // sessizce geç — ziyaretçi takibi kritik değil
  }
  return new NextResponse(null, { status: 204 });
}

/** GET — admin: son 5 dakikadaki aktif ziyaretçi sayısı (auth gerekli) */
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ count: 0 });

    const since = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { count, error } = await supabaseAdmin
      .from("visitors")
      .select("*", { count: "exact", head: true })
      .gte("last_seen", since);

    if (error) return NextResponse.json({ count: 0 });
    return NextResponse.json({ count: count ?? 0 });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
