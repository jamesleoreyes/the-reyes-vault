import { PATHS } from '@/lib/paths';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

async function NotFound() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(PATHS.DASHBOARD);
  }

  redirect(PATHS.LOGIN);
};

export default NotFound;