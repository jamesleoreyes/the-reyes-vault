import { InfoIcon } from "lucide-react";
import type { Metadata } from "next"
import { appConfig } from "@/lib/config";
import { createServerClient } from "@/utils/supabase/server"
import { getUserProfile } from "@/utils/utils";

export const metadata: Metadata = {
  title: 'Dashboard'
}

export default async function Page() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>Please log in to access the dashboard.</div>;
  }

  const userProfile = await getUserProfile(supabase, user.id);

  return (
    <div className="flex-1 w-full flex flex-col gap-2">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 text-foreground flex gap-3 items-center">
          <InfoIcon size={16} strokeWidth={2} />
          {appConfig.isDemoMode ? (
            <>This is a demo environment. You&apos;re logged in anonymously with limited features.</>
          ) : (
            <>This is the protected dashboard page that you can only see as an authenticated user.</>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl">Your user details</h2>
        <h2>Name: {userProfile?.first_name} {userProfile?.last_name}</h2>
        <h2>Email: {appConfig.isDemoMode ? 'demo@example.com' : user?.email}</h2>
        {appConfig.isDemoMode && (
          <p className="text-sm text-muted-foreground mt-2">
            * Demo data is auto-generated and not persistent
          </p>
        )}
      </div>
    </div>
  );
}