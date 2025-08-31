'use client'

import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useActionState } from 'react';
import { toast } from 'sonner';
import { ActionState } from '@app/actions';
import { logInAction } from '@app/(auth-pages)/login/actions';
import {
  CardContent,
  CardFooter,
} from '@src/components/ui/card';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import { SubmitButton } from '@src/components/ui/submit-button';

interface DefaultLoginFormProps {
  initialFormState: ActionState;
}

function DefaultLoginForm({ initialFormState }: DefaultLoginFormProps) {
  const [email, setEmail] = useState('');
  const [normalLoginState, normalLoginAction, isPending] = useActionState<ActionState, FormData>(logInAction, initialFormState);

  useEffect(() => {
    if (normalLoginState?.error) {
      toast.error(normalLoginState.error);
    }
  }, [normalLoginState]);


  return (
    <form action={normalLoginAction}>
      <CardContent className='p-0'>
        <div className='grid gap-6'>
          <div className='grid gap-3'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              name='email'
              required
              placeholder='you@example.com'
              disabled={isPending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='grid gap-3'>
            <div className='flex items-center'>
              <Label htmlFor='password'>Password</Label>
              <Link
                href='/forgot-password'
                className={`ml-auto text-sm ${isPending ? 'opacity-50 pointer-events-none' : 'text-muted-foreground hover:text-foreground underline-offset-4 hover:underline'}`}
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
          disabled={isPending}
        >
          <LogIn className='w-4 h-4 mr-2' /> Log in
        </SubmitButton>
      </CardFooter>
    </form>
  );
};

export default DefaultLoginForm;