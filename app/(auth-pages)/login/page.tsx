import { GradientBackground } from "@/components/animate-ui/backgrounds/gradient";
import { LoginForm } from "@/components/login-form/form";
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Login',
  description: 'Log in to your account to access your memories from The Reyes Vault.'
}

export default function Login() {
  return (
    <GradientBackground>
      <div className="relative z-10 flex min-h-svh w-full flex-col items-center justify-center p-4 sm:p-6 md:p-10">
        <LoginForm />
      </div>
    </GradientBackground >
  )
}
