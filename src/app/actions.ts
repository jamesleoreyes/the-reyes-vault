"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { encodedRedirect } from "@/utils/utils";
import { createServerClient } from "@/utils/supabase/server";

export interface ActionState {
  error?: string;
  message?: string;
}

export const logInAction = async (
  _prevState: ActionState | undefined,
  formData: FormData
) => {
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

export const anonymousLogInAction = async (
  _prevState: ActionState | undefined,
  formData: FormData
) => {
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
}

export const logOutAction = async () => {
  const supabase = await createServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(`actions.ts --> logOutAction() --> Failed to log out user: ${error}`);
    return { error: `Failed to log out: ${error}` }
  }

  return redirect("/login");
};

export const forgotPasswordAction = async (
  _prevState: ActionState | undefined,
  formData: FormData
) => {
  const email = formData.get("email")?.toString();
  const supabase = await createServerClient();
  const origin = (await headers()).get("origin");

  if (!email) {
    return { error: "Email is required" };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return { error: error.message }
  }

  return { message: "Check your email for a link to reset your password." };
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createServerClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  return encodedRedirect("success", "/protected/reset-password", "Password updated");
};
