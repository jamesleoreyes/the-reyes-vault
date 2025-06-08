import { Profile } from "@/types/Profiles";
import { createServerClient } from "@/utils/supabase/server"
import { InfoIcon } from "lucide-react";
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Dashboard'
}

export default async function Page() {
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  const { data: userProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single() as { data: Profile };

  return (
    <div className="flex-1 w-full flex flex-col gap-2">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 text-foreground flex gap-3 items-center">
          <InfoIcon size={16} strokeWidth={2} />
          This is the protected dashboard page that you can only see as an authenticated user.
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl">Your user details</h2>
        <h2>Name: {userProfile.first_name} {userProfile.last_name}</h2>
        <h2>Email: {user?.email}</h2>
      </div>
    </div>
  );
}