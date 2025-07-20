'use server';

import { ActionState } from "@/app/actions";
import { createServerClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

async function forgotPasswordAction(
  _prevState: ActionState | undefined,
  formData: FormData
) {
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

export { forgotPasswordAction };