import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Optimistic check (cookie exists). Real session validation happens in the pages.
export function proxy(request: NextRequest) {
  if (!getSessionCookie(request)) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    url.searchParams.set("reason", "protected");
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/product/:path*", "/profile/:path*"] };
