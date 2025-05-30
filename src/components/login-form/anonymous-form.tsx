'use client'

import { LogIn, AlertCircle, Loader2 } from 'lucide-react';
import { Turnstile } from 'next-turnstile';
import { useState, useEffect, useActionState } from 'react';
import { toast } from 'sonner';
import { appConfig } from '@/lib/config';
import { ActionErrorState, anonymousLogInAction } from '@/app/actions';
import {
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { SubmitButton } from '../submit-button';

interface AnonymousLoginFormProps {
  siteKey: string | undefined;
  isDemoModeEnabled: boolean;
  initialFormState: ActionErrorState;
}

export function AnonymousLoginForm({
  siteKey,
  isDemoModeEnabled,
  initialFormState,
}: AnonymousLoginFormProps) {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileStatus, setTurnstileStatus] = useState<
    'loading' | 'success' | 'error' | 'expired' | 'required'
  >('loading');
  const [turnstileError, setTurnstileError] = useState<string | null>(null);

  const [anonymousLoginState, anonymousLoginActionTrigger] = useActionState(anonymousLogInAction, initialFormState);

  useEffect(() => {
    if (anonymousLoginState?.error) {
      toast.error(anonymousLoginState.error);
    }
  }, [anonymousLoginState]);

  const handleTurnstileVerify = (token: string) => {
    setTurnstileToken(token);
    setTurnstileStatus('success');
    setTurnstileError(null);
  };

  const handleTurnstileError = () => {
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

  if (appConfig.isDemoMode && isDemoModeEnabled && !siteKey) {
    console.error('Anonymous login is currently unavailable');
  }

  const showAnonymousLoginButton = isDemoModeEnabled && !!siteKey;
  const showAnonymousLoginUnavailableMessage = isDemoModeEnabled && !siteKey;
  const showDemoModeDisabledMessage = !isDemoModeEnabled;
  const isAnonymousLoginButtonDisabled = showAnonymousLoginButton && (turnstileStatus !== 'success' || !turnstileToken);

  return (
    <form action={anonymousLoginActionTrigger}>
      <CardContent>
        <div className='flex flex-col items-center gap-6'>
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
                <p className='text-sm text-muted-foreground'>
                  <Loader2 className='w-4 h-4 animate-spin' />
                </p>
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
            variant={'outline'}
            className='w-full'
            disabled={isAnonymousLoginButtonDisabled}
            pendingText='Logging In...'
          >
            <LogIn className='w-4 h-4 mr-2' /> Log in Anonymously
          </SubmitButton>
        )}
      </CardFooter>
    </form>
  );
}