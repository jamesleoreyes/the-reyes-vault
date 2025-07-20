import { createServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { PATHS } from "@/lib/paths";
import { Unauthorized } from "@/components/ui/unauthorized";
import { Profile } from "@/types";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect(PATHS.DASHBOARD);
  }

  const { data: userData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single() as { data: Profile };

  const isAdmin = userData?.role === 'admin';

  if (!isAdmin) {
    return <Unauthorized />;
  }

  return <>{children}</>;
}