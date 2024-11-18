"use client";
import { useSession } from "next-auth/react";

export default function About() {
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
      <h1>Anyone can access this page.</h1>
    </>
  );
}
