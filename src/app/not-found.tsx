import { DASHBOARD_PATH, LOGIN_PATH } from '@/lib/authPaths';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function NotFound() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(DASHBOARD_PATH);
  }

  redirect(LOGIN_PATH);
}