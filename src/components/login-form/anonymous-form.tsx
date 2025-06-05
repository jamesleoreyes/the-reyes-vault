'use client'

import { LogIn, AlertCircle, Loader2 } from 'lucide-react';
import { Turnstile } from 'next-turnstile';
import { useState, useEffect, useActionState } from 'react';
import { toast } from 'sonner';
import { appConfig } from '@/lib/config';
import { ActionState, anonymousLogInAction } from '@/app/actions';
import {
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { SubmitButton } from '../ui/submit-button';

interface AnonymousLoginFormProps {
  siteKey: string | undefined;
  isDemoModeEnabled: boolean;
  initialFormState: ActionState;
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

  const [anonymousLoginState, anonymousLoginActionTrigger] = useActionState<ActionState, FormData>(anonymousLogInAction, initialFormState);

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

  const showTurnstileSkeleton =
    turnstileStatus === 'loading' ||
    turnstileStatus === 'expired'

  return (
    <form action={anonymousLoginActionTrigger}>
      <CardContent>
        <div className='flex flex-col items-center gap-6'>
          {isDemoModeEnabled && siteKey && (
            <div className='flex flex-col items-center gap-4'>
              <div style={{ width: '300px', height: '65px' }}>
                {showTurnstileSkeleton && (
                  <div
                    className="flex justify-center items-center bg-[#232323] border border-[#797979]"
                    style={{ width: '100%', height: '100%' }}
                    aria-label='Loading security check...'
                  >
                    <Loader2 className='animate-spin mr-2' />
                  </div>
                )}
                <div style={{ display: showTurnstileSkeleton ? 'none' : 'block', width: '100%', height: '100%' }}>
                  <Turnstile
                    siteKey={siteKey}
                    onVerify={handleTurnstileVerify}
                    onError={handleTurnstileError}
                    onExpire={handleTurnstileExpire}
                    onLoad={handleTurnstileLoad}
                    retry='never'
                    refreshExpired='auto'
                    theme='auto'
                    appearance='always'
                    sandbox={process.env.NODE_ENV === 'development'}
                    className='mx-auto'
                  />
                </div>
              </div>
              {turnstileError && toast.error(turnstileError)}
            </div>
          )}
          {showAnonymousLoginUnavailableMessage && (
            <div className='flex items-center gap-2 text-base font-bold' aria-live='polite'>
              <AlertCircle size={16} />
              <span>Anonymous login is currently unavailable</span>
            </div>
          )}
          {showDemoModeDisabledMessage && (
            <div className='flex items-center gap-2 text-base font-bold' aria-live='polite'>
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
  );
}