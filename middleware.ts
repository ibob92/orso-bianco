import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "gelateriaorsobianco.it";

// Redirect any request hitting the default *.vercel.app domain to the canonical
// custom domain. This prevents duplicate content in Google and consolidates
// domain authority. Custom domains (apex + www) are handled by Vercel directly.
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  if (host.endsWith(".vercel.app")) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = "https";
    // 308 = permanent redirect preserving method (better than 301 for SEO modern)
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on all paths except Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
