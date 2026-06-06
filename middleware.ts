import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

/**
 * Locale routing strategy:
 *  - Dutch (default) is served WITHOUT a prefix: "/", "/#contact".
 *    Internally we REWRITE these to the "/nl/..." segment so a single
 *    app/(marketing)/[locale] tree renders both languages.
 *  - English is served at "/en/...". No rewrite needed.
 *  - "/nl/..." is REDIRECTED to the clean unprefixed path (canonical).
 *  - /admin, /api, static assets are excluded via the matcher below.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Canonicalize: never expose the explicit default-locale prefix.
  if (pathname === "/nl" || pathname.startsWith("/nl/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/nl/, "") || "/";
    return NextResponse.redirect(url);
  }

  // Non-default locale prefixes pass through to the [locale] tree as-is.
  const hasLocalePrefix = locales.some(
    (l) => l !== defaultLocale && (pathname === `/${l}` || pathname.startsWith(`/${l}/`)),
  );
  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  // Everything else is the default (Dutch): rewrite to /nl/... internally.
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Exclude admin, api, Next internals, and files with an extension (assets).
  matcher: ["/((?!admin|api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
