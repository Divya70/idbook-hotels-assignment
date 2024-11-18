export { auth as middleware } from "@/auth";

import { getToken } from "next-auth/jwt";

export default async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // If the user is not logged in and tries to access the dashboard
  if (pathname.startsWith("/dashboard") && !token) {
    return Response.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
