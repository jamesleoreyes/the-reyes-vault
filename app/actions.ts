'use server';

import { redirect } from 'next/navigation';
import { createServerClient } from '@src/utils/supabase/server';

interface ActionState {
  error?: string;
  message?: string;
}

async function logOutAction() {
  const supabase = await createServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(`actions.ts --> logOutAction() --> Failed to log out user: ${error}`);
    return { error: `Failed to log out: ${error}` }
  }

  return redirect('/login');
};

export type { ActionState };
export { logOutAction };