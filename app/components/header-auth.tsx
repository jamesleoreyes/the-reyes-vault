import { signOutAction } from "@/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { LogIn, LogOut } from "lucide-react";
import { SubmitButton } from "./submit-button";

export default async function HeaderAuth() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form>
        <SubmitButton pendingText="Signing out..." formAction={signOutAction}>
          <LogOut size={16} className="mr-2" />Sign out
        </SubmitButton>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm">
        <Link href="/sign-in">
          <LogIn size={16} className="mr-2" />Sign in
        </Link>
      </Button>
    </div>
  );
}
