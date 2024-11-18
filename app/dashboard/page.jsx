"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, update } = useSession();
  return (
    <>
      <button
        onClick={() => {
          session?.user && update({ ...session.user, name: "namdev divya" });
        }}
      >
        Update session
      </button>
      <h1>Can only be accessed by admin user.</h1>;
    </>
  );
}
