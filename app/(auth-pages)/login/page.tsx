import { LoginForm } from "@/components/login-form/form";
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Login',
  description: 'Log in to your account to access your memories from The Reyes Vault.'
}

export default function Login() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-start sm:justify-center gap-6 p-0 sm:p-6 md:p-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}
