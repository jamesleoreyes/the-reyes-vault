'use client'

import { ActionState, forgotPasswordAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { SendIcon } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

interface ForgotPasswordFormProps {
  initialFormState: ActionState;
}

export function ForgotPasswordForm({ initialFormState }: ForgotPasswordFormProps) {
  const [normalForgotPasswordState, normalForgotPasswordAction] = useActionState(forgotPasswordAction, initialFormState);

  useEffect(() => {
    if (normalForgotPasswordState?.error) {
      toast.error(normalForgotPasswordState.error);
    }
    if (normalForgotPasswordState?.message) {
      toast.success(normalForgotPasswordState.message);
    }
  }, [normalForgotPasswordState]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-light">Reset your Password</h1>
        <p className="text-muted-foreground text-sm text-balance font-light">
          Enter your email below to reset your password. If you remember it, you can{" "}
          <Link className="text-primary hover:underline underline-offset-4" href="/login">
            log in here
          </Link>
          .
        </p>
      </div>

      <form action={normalForgotPasswordAction}>
        <CardContent className="p-0">
          <div className='grid gap-6'>
            <div className='grid gap-3'>
              <Label htmlFor="email">Email</Label>
              <Input
                id='email'
                type='email'
                name='email'
                required
                placeholder="you@example.com"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex-col items-stretch mt-6 gap-4 p-0'>
          <SubmitButton
            type='submit'
            className='w-full'
            pendingText='Sending reset link...'
          >
            <SendIcon className='w-4 h-4 mr-2' />
            Send Password Reset Link
          </SubmitButton>
        </CardFooter>
      </form>
    </div>
  )
}