import { auth } from "@/auth";
import { getSession } from "next-auth/react";

export default async function ProtectedPage() {
  // const session = await getSession();
  const session = await auth();
  return (
    <div className="p-8">
      <h1>Welcome, {session?.user.email}</h1>
      <p>Your role is: {session?.user.role}</p>
    </div>
  );
}
