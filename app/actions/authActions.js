"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

// Credentails login logic
export async function handleCredentialsSignin({ email, password }) {
  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };
        default:
          return {
            message: "Something went wrong.",
          };
      }
    }
    throw error;
  }
}

// Github login logic
export async function handleGithubSignin() {
  await signIn("github", { redirectTo: "/" });
}

// Signout logic
export async function handleSignOut() {
  await signOut();
}
