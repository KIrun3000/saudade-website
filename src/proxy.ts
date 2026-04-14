import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { defaultLocale, locales } from "@/i18n/config";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|images|fonts|favicon.ico|.*\\..*).*)"],
};
