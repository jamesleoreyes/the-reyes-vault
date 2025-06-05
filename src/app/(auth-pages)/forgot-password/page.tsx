import { Message } from "@/components/form-message";
import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/forgot-password-form";

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Forgot your password? Enter your email address and we will send you a password reset link.'
}

export default async function ForgotPasswordPage(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="w-full max-w-md">
      <ForgotPasswordForm searchParams={searchParams} />
    </div>
  );
}
