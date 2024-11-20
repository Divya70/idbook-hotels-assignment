// export { auth as middleware } from "@/auth";

// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   pages: {
//     signIn: "/auth/signin",
//   },
// });

// export const config = {
//   // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
//   matcher: ["/protected/:path*", "/admin/:path*", "/user/:path*"],
// };

import { auth } from "@/auth";
import { getToken } from "next-auth/jwt";

export { auth as middleware } from "@/auth";

export default async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;
  const session = await auth();
  console.log({ session });
  // If the user is not logged in, redirect to the sign-in page
  if (!token) {
    const url = new URL("/auth/signin", req.url);
    return Response.redirect(url);
  }

  // If the user tries to access the dashboard without admin privileges, redirect
  if (
    pathname.startsWith("/dashboard") &&
    session?.user?.email !== "admin@gmail.com"
  ) {
    const url = new URL("/auth/signin", req.url);
    return Response.redirect(url);
  }

  // Allow the request if the above conditions are not met
  return Response.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect only dashboard route
};
