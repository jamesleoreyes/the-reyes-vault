import { createServerClient } from "@src/utils/supabase/server";
import { redirect } from "next/navigation";
import { APP_PATHS } from "@src/lib/paths";
import { Unauthorized } from "@/src/components/unauthorized";
import { Profile } from "@src/types";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect(APP_PATHS.DASHBOARD);
  }

  const { data: userData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single() as { data: Profile };

  const isAdmin = userData?.role === 'admin';

  // This should never happen due to middleware upstream, but better safe than sorry
  if (!isAdmin) {
    return <Unauthorized />;
  }

  return <>{children}</>;
}