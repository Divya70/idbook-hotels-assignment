import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { signInSchema } from "./lib/zod";
import { users } from "@/mock/user";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github,
    // Credentials({
    //   credentials: {
    //     email: { label: "Email", type: "email", placeholder: "Email" },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //       placeholder: "Password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     let user = null;

    //     // validate credentials
    //     const parsedCredentials = signInSchema.safeParse(credentials);
    //     if (!parsedCredentials.success) {
    //       console.error("Invalid credentials:", parsedCredentials.error.errors);
    //       return null;
    //     }
    //     // get user

    //     user = {
    //       id: "1",
    //       name: "Divya Namdev",
    //       email: "divyanamdev@gmail.com",
    //       role: "admin",
    //     };

    //     if (!user) {
    //       console.log("Invalid credentials");
    //       return null;
    //     }

    //     return user;
    //   },
    // }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = users.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );
        if (user) {
          return { email: user.email, role: user.role };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      const role = auth?.user.role || "user";
      if (pathname.startsWith("/auth/signin") && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      // if (pathname.startsWith("/dashboard") && role !== "admin") {
      //   return Response.redirect(new URL("/auth/signin", nextUrl));
      // }
      return !!auth;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Default sign-in page
  },
  // Redirect to home page if no callbackUrl is provided
  callbacks: {
    redirect({ url, baseUrl }) {
      // Redirect to baseUrl (home page) if callbackUrl is not defined
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
});
