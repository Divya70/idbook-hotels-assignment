// export default function About() {
//   return <h1>Can only be accessed by admin user.</h1>;
// }
"use client";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null; // Prevent flashing content before redirect
  }

  return (
    <div>
      <h1>Welcome to the Dashboard, {session.user.name}!</h1>
      <p>Only logged-in users can access this page.</p>
    </div>
  );
}
