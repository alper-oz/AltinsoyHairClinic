import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { ALL_PATHS, isLocked } from "@/lib/page-settings";

// PATCH /api/page-settings/[path] — auth korumalı, toggle.
// Path URL-encoded geçer (admin frontend encodeURIComponent yapar).
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ path: string }> },
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { path: encodedPath } = await params;
  let path: string;
  try {
    path = decodeURIComponent(encodedPath);
  } catch {
    return NextResponse.json({ error: "Geçersiz path." }, { status: 400 });
  }

  if (!(ALL_PATHS as readonly string[]).includes(path)) {
    return NextResponse.json({ error: "Tanımlı sayfa değil." }, { status: 400 });
  }
  if (isLocked(path)) {
    return NextResponse.json({ error: "Bu sayfa kilitli ve pasifleştirilemez." }, { status: 400 });
  }

  const body = await request.json().catch(() => ({}));
  const active = body?.active;
  if (typeof active !== "boolean") {
    return NextResponse.json({ error: "active boolean olmalı." }, { status: 400 });
  }

  // Upsert: satır yoksa yarat, varsa güncelle
  const { data, error } = await supabaseAdmin
    .from("page_settings")
    .upsert({ path, active }, { onConflict: "path" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Public middleware cache'ini geçersiz kıl (Next.js 16: profile arg zorunlu)
  revalidateTag("page-settings", "max");

  return NextResponse.json(data);
}
