import { APP_PATHS, PUBLIC_PATHS } from '@src/lib/paths';
import { createServerClient } from '@src/utils/supabase/server';
import { redirect } from 'next/navigation';

async function NotFound() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(APP_PATHS.DASHBOARD);
  }

  redirect(PUBLIC_PATHS.LOGIN);
};

export default NotFound;