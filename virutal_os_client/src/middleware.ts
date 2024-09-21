import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Check if the request is already targeting the login or api page, avoid infinite loops
  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/register" ||
    req.nextUrl.pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }
  const accessToken = req.cookies.get("access-token")?.value;
  if (!accessToken) {
    console.log("redirecting");
    // If the token is missing, redirect to the login page
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const validateTokenUrl = new URL(
    "/api/auth/validate-token?token=" + accessToken,
    req.url
  );

  const response = await fetch(validateTokenUrl.toString(), {
    method: "GET",
  });
  const decodedData = await response.json();
  if (!response.ok) {
    // If the token validation fails, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // prepare headers with user data
  if (!decodedData.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const headers = new Headers(req.headers);
  headers.set("token-payload", JSON.stringify(decodedData.user));

  // If everything is fine, proceed with the request
  return NextResponse.next({
    headers,
  });
}

export const config = {
  matcher: [
    // Match all routes except /api/auth and its sub-routes
    "/((?!api/auth/.*|_next/static|_next/image|favicon.ico|static).*)",
  ],
};
