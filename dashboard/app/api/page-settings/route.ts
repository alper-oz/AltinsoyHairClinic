import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAllPageSettings } from "@/lib/page-settings";

// GET /api/page-settings — auth korumalı, admin için tüm satırları döner.
// ALL_PATHS'deki her path için DB'de satır yoksa varsayılan {active: true} döner.
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await getAllPageSettings();
  return NextResponse.json(settings);
}
