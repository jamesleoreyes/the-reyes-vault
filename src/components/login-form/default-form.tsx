'use client'

import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useActionState } from 'react';
import { toast } from 'sonner';
import { ActionState, logInAction } from '@/app/actions';
import {
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/ui/submit-button';

interface DefaultLoginFormProps {
  initialFormState: ActionState;
}

export function DefaultLoginForm({ initialFormState }: DefaultLoginFormProps) {
  const [email, setEmail] = useState('');
  const [normalLoginState, normalLoginAction, isPending] = useActionState<ActionState, FormData>(logInAction, initialFormState);

  useEffect(() => {
    if (normalLoginState?.error) {
      toast.error(normalLoginState.error);
    }
  }, [normalLoginState]);

  const isNormalLoginDisabled = false;

  return (
    <form action={normalLoginAction}>
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
              disabled={isPending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='grid gap-3'>
            <div className='flex items-center'>
              <Label htmlFor="password">Password</Label>
              <Link
                href='/forgot-password'
                className="ml-auto text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id='password'
              type='password'
              name='password'
              required
              disabled={isPending}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex-col items-stretch mt-6 gap-4 p-0'>
        <SubmitButton
          type='submit'
          className='w-full'
          pendingText='Logging in...'
          disabled={isNormalLoginDisabled}
        >
          <LogIn className='w-4 h-4 mr-2' /> Log in
        </SubmitButton>
      </CardFooter>
    </form>
  );
}