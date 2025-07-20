'use server';

import { ActionState } from "@/app/actions";
import { createServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function logInAction(
  _prevState: ActionState | undefined,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error?.message === 'Invalid login credentials') {
    console.error(`actions.ts --> logInAction() --> ${error.message}`)
    return { error: `${error.message}. Please try again.` };
  }

  if (error) {
    console.error(`actions.ts --> logInAction() --> ${error.message}`)
    return { error: error.message };
  }

  return redirect("/dashboard");
};

async function anonymousLogInAction(
  _prevState: ActionState | undefined,
  formData: FormData
) {
  const captchaToken = formData.get('cf-turnstile-response') as string;
  console.log(`actions.ts --> anonymousLogInAction() --> Turnstile server token received: ${captchaToken}`);

  if (!captchaToken) {
    return { error: 'CAPTCHA response missing. Please try again.' };
  }

  const supabase = await createServerClient();
  const { error } = await supabase.auth.signInAnonymously({
    options: { captchaToken }
  });

  if (error) {
    console.error(`actions.ts --> anonymousLogInAction() --> Supabase anonymous sign-in error: ${error.message}`);
    return { error: `Login failed: ${error.message}` };
  }

  return redirect('/dashboard');
};

export { logInAction, anonymousLogInAction };