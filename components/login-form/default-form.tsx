'use client'

import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useActionState } from 'react';
import { toast } from 'sonner';
import { ActionErrorState, logInAction } from '@/app/actions';
import {
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '../submit-button';

interface DefaultLoginFormProps {
  initialFormState: ActionErrorState;
}

export function DefaultLoginForm({ initialFormState }: DefaultLoginFormProps) {
  const [email, setEmail] = useState('');
  const [normalLoginState, normalLoginAction] = useActionState(logInAction, initialFormState);

  useEffect(() => {
    if (normalLoginState?.error) {
      toast.error(normalLoginState.error);
    }
  }, [normalLoginState]);

  const isNormalLoginDisabled = false;

  return (
    <form action={normalLoginAction}>
      <CardContent>
        <div className='flex flex-col gap-6'>
          <div className='grid gap-2'>
            <Label htmlFor='email' className='text-base'>Email</Label>
            <Input
              id='email'
              type='email'
              name='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password' className='text-base'>Password</Label>
              <Link
                href='/forgot-password'
                className='ml-auto inline-block text-base text-muted-foreground underline-offset-4 hover:underline'
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id='password'
              type='password'
              name='password'
              required
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex-col items-stretch mt-6 gap-4'>
        <SubmitButton
          type='submit'
          className='w-full'
          pendingText='Logging In...'
          disabled={isNormalLoginDisabled}
        >
          <LogIn className='w-4 h-4 mr-2' /> Log in
        </SubmitButton>
      </CardFooter>
    </form>
  );
}