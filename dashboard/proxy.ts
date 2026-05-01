import createIntlMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { getActivePathMap, isLocked } from "./lib/page-settings";
import { resolveInternalPathname } from "./lib/resolve-pathname";

const intlMiddleware = createIntlMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Dashboard & Login: Supabase auth koruması ────────────────────
  if (pathname.startsWith("/dashboard") || pathname === "/login") {
    const response = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    let user = null;
    try {
      const { data } = await supabase.auth.getUser();
      user = data.user;
    } catch {
      console.error("[proxy] supabase.auth.getUser() failed — proceeding unauthenticated");
    }

    if (pathname.startsWith("/dashboard") && !user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (pathname === "/login" && user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return response;
  }

  // ── API rotaları: geç ────────────────────────────────────────────
  if (pathname.startsWith("/api")) {
    return NextResponse.next({ request });
  }

  // ── Public site: pasif sayfa kontrolü + i18n ─────────────────────
  // Internal pathname'i çöz (locale prefix'siz, routing.pathnames key'i)
  const resolved = resolveInternalPathname(pathname);
  if (resolved && !isLocked(resolved.internal)) {
    const activeMap = await getActivePathMap();
    if (activeMap[resolved.internal] === false) {
      // Pasif → 301 anasayfaya yönlendir (locale korunur)
      const homePrefix =
        resolved.locale === routing.defaultLocale ? "" : `/${resolved.locale}`;
      const redirectUrl = new URL(`${homePrefix || "/"}`, request.url);
      return NextResponse.redirect(redirectUrl, 301);
    }
  }

  const response = intlMiddleware(request);

  // Root layout'un lang/dir set etmesi için locale bilgisini header'a ekle
  const locale =
    pathname.startsWith("/en/") || pathname === "/en"
      ? "en"
      : pathname.startsWith("/ar/") || pathname === "/ar"
      ? "ar"
      : "tr";

  response.headers.set("x-locale", locale);
  return response;
}

export const config = {
  matcher: [
    // Statik dosyalar ve Next.js internal'ları hariç tüm rotalar
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)",
  ],
};
