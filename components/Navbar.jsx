import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { handleSignOut } from "@/app/actions/authActions";
export default async function Navbar() {
  const session = await auth();
  console.log({ session });
  return (
    <nav className="flex justify-between items-center py-3 px-4 bg-white shadow-md ">
      {/* Logo Text */}
      <Link href="/" className="text-xl font-bold">
        Idbook Hotels
      </Link>
      {/* Signin and signout buttons */}
      {!session ? (
        <Link href="/auth/signin">
          <Button
            variant="default"
            className="bg-blue-600 rounded-full hover:bg-blue-500"
          >
            Sign In
          </Button>
        </Link>
      ) : (
        <form action={handleSignOut}>
          <Button
            variant="default"
            type="submit"
            className="bg-blue-600 rounded-full hover:bg-blue-500"
          >
            Sign Out
          </Button>
        </form>
      )}
    </nav>
  );
}
