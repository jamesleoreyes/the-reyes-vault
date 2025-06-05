import type { Metadata } from "next"
import { GalleryVerticalEnd, Vault } from "lucide-react"
import { LoginForm } from "@/components/login-form/form";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Login',
  description: 'Log in to your account to access your memories from The Reyes Vault.'
}

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href='/' className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 mr-1 items-center justify-center">
              <Vault className="size-4" />
            </div>
            <h1 className="text-2xl font-light">The Reyes Vault</h1>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
