import { InfoIcon } from "lucide-react";
import type { Metadata } from "next"
import { appConfig } from "@/lib/config";
import { createServerClient } from "@/utils/supabase/server"
import { getUserProfile } from "@/utils/utils";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'Dashboard'
}

export default async function Page() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>Please log in to access the dashboard.</div>;
  }

  const profile = await getUserProfile(supabase, user.id);

  return (
    <div className={cn('flex-1 w-full flex flex-col', !appConfig.isDemoMode ? 'gap-2' : '')}>
      <div className="w-full">
        {appConfig.isDemoMode ? (
          null
        ) : (
          <div className="bg-accent text-sm p-3 text-foreground flex gap-3 items-center">
            <InfoIcon size={16} strokeWidth={2} />
            <>This is the protected dashboard page that you can only see as an authenticated user.</>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between h-full">
        <h2 className="font-bold text-2xl">Hi, {profile.first_name}!</h2>
        <div className="flex flex-col gap-2">
          {appConfig.isDemoMode && (
            <p className="text-sm text-muted-foreground mt-2">
              * Demo data is auto-generated and not persistent
            </p>
          )}
        </div>
      </div>
    </div>
  );
}