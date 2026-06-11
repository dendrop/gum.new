import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "gum.new";

export function middleware(request: NextRequest) {
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (process.env.VERCEL_ENV === "production" && host?.endsWith(".vercel.app")) {
    const url = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${CANONICAL_HOST}`);
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
