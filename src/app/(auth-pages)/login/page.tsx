import type { Metadata } from "next"
import { LoginForm } from "@/components/login-form/form";

export const metadata: Metadata = {
  title: 'Login',
  description: 'Log in to your account to access your memories from The Reyes Vault.'
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <LoginForm />
    </div>
  );
}
