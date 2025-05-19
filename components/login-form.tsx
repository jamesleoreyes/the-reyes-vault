'use client'

import { LogIn, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Turnstile } from 'next-turnstile';
import { useState, useEffect, useActionState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { isDemoMode, isDemoModeEnabled } from '@/lib/config';
import { ActionErrorState, anonymousLogInAction, logInAction } from '@/app/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from './submit-button';

interface LoginFormProps extends React.ComponentPropsWithoutRef<'div'> { }

const initialFormState: ActionErrorState = {
  error: undefined,
}

export function LoginForm({
  className,
  ...props
}: LoginFormProps) {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileStatus, setTurnstileStatus] = useState<
    'loading' | 'success' | 'error' | 'expired' | 'required'
  >('loading');
  const [turnstileError, setTurnstileError] = useState<string | null>(null);

  const [email, setEmail] = useState('');

  const [normalLoginState, normalLoginAction] = useActionState(logInAction, initialFormState);
  const [anonymousLoginState, anonymousLoginActionTrigger] = useActionState(anonymousLogInAction, initialFormState);


  useEffect(() => {
    if (normalLoginState?.error) {
      toast.error(normalLoginState.error);
    }
  }, [normalLoginState]);

  useEffect(() => {
    if (anonymousLoginState?.error) {
      toast.error(anonymousLoginState.error);
    }
  }, [anonymousLoginState]);


  const siteKey = process.env['NEXT_PUBLIC_TURNSTILE_SITE_KEY'];
  if (isDemoMode && isDemoModeEnabled && !siteKey) {
    console.error('Anonymous login is currently unavailable');
  }

  const handleTurnstileVerify = (token: string) => {
    setTurnstileToken(token);
    setTurnstileStatus('success');
    setTurnstileError(null);
  };

  const handleTurnstileError = (err?: any) => {
    setTurnstileToken(null);
    setTurnstileStatus('error');
    setTurnstileError('Security check failed. Please try refreshing the page.');
  };

  const handleTurnstileExpire = () => {
    setTurnstileToken(null);
    setTurnstileStatus('expired');
    setTurnstileError('Security check expired. Please verify again.');
  };

  const handleTurnstileLoad = () => {
    setTurnstileStatus('required');
    setTurnstileError(null);
  }

  const showAnonymousLoginButton = isDemoModeEnabled && isDemoMode && !!siteKey;
  const showAnonymousLoginUnavailableMessage = isDemoModeEnabled && isDemoMode && !siteKey;
  const showDemoModeDisabledMessage = !isDemoModeEnabled && isDemoMode;
  const isAnonymousLoginButtonDisabled = showAnonymousLoginButton && (turnstileStatus !== 'success' || !turnstileToken);
  const isNormalLoginDisabled = false;

  return (
    <div className={cn('flex flex-col min-w-md', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Log in</CardTitle>
          {isDemoMode && isDemoModeEnabled ? (
            <CardDescription >
              Complete the security check and click the anonymous log in button to enter
            </CardDescription>
          ) : isDemoMode && !isDemoModeEnabled ? (
            null
          ) : (
            <CardDescription >
              Enter your email below to login to your account
            </CardDescription>
          )}
        </CardHeader>
        {isDemoMode ? (
          <form action={anonymousLoginActionTrigger}>
            <CardContent>
              <div className='flex flex-col gap-6'>
                {isDemoModeEnabled && siteKey && (
                  <div className='flex flex-col items-center gap-4'>
                    <Turnstile
                      siteKey={siteKey}
                      onVerify={handleTurnstileVerify}
                      onError={handleTurnstileError}
                      onExpire={handleTurnstileExpire}
                      onLoad={handleTurnstileLoad}
                      retry='auto'
                      refreshExpired='auto'
                      sandbox={process.env.NODE_ENV === 'development'}
                      className='mx-auto'
                    />
                    {turnstileError && (
                      <div
                        className='flex items-center gap-2 text-red-500 text-sm'
                        aria-live='polite'
                      >
                        <AlertCircle size={16} />
                        <span>{turnstileError}</span>
                      </div>
                    )}
                    {(turnstileStatus === 'loading' && !turnstileError) && (
                      <p className='text-sm text-muted-foreground'>Loading security check...</p>
                    )}
                  </div>
                )}
                {showAnonymousLoginUnavailableMessage && (
                  <div className='flex items-center gap-2 text-red-500 text-sm' aria-live='polite'>
                    <AlertCircle size={16} />
                    <span>Anonymous login is currently unavailable</span>
                  </div>
                )}
                {showDemoModeDisabledMessage && (
                  <div className='flex items-center gap-2 text-orange-500 text-sm' aria-live='polite'>
                    <AlertCircle size={16} />
                    <span>Anonymous login is temporarily disabled</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className='flex-col items-stretch mt-6 gap-4'>
              {showAnonymousLoginButton && (
                <SubmitButton
                  type='submit'
                  className='w-full'
                  disabled={isAnonymousLoginButtonDisabled}
                  pendingText='Logging In...'
                >
                  <LogIn className='w-4 h-4 mr-2' /> Log in Anonymously
                </SubmitButton>
              )}
            </CardFooter>
          </form>
        ) : (
          <form action={normalLoginAction}>
            <CardContent>
              <div className='flex flex-col gap-6'>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    name='email'
                    placeholder='you@example.com'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>Password</Label>
                    <Link
                      href='/forgot-password'
                      className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id='password'
                    type='password'
                    name='password'
                    placeholder='Your password'
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
        )}
      </Card>
    </div >
  );
}
