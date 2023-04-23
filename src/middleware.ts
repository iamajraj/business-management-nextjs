import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "./lib/jwtService";

export async function middleware(request: NextRequest) {
  let token = request.cookies.get("token")?.value;
  let verifiedToken;
  if (token) {
    verifiedToken = await verify(token);
  }

  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname === "/"
  ) {
    if (verifiedToken) {
      let user_type = (verifiedToken as any).user_type;
      if (user_type == "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      } else {
        return NextResponse.redirect(new URL("/employee", request.url));
      }
    }
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  } else if (request.nextUrl.pathname.startsWith("/admin")) {
    if (verifiedToken) {
      if (verifiedToken.user_type === "admin") {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/employee", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else if (request.nextUrl.pathname.startsWith("/employee")) {
    if (verifiedToken) {
      if (verifiedToken.user_type !== "admin") {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/login/:path*", "/admin/:path*", "/employee/:path*"],
};
