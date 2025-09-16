import { NextRequest, NextResponse } from "next/server";
import { Session } from "better-auth";

const authRoutes = ["/sign-in", "/sign-up"];
const protectedRoutes = ["/habits", "/feed", "/leaderboard"];

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Identify Route Type
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check Auth Session
  const session: Session = await fetch(`${origin}/api/auth/get-session`, {
    headers: request.headers,
  }).then((res) => res.json());

  // Redirect logged-in users away from auth routes
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/habits", request.url));
  }

  // Redirect unauthenticated users from protected routes
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)"],
};
