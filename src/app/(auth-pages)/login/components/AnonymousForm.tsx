'use client'

import { LogIn, AlertCircle, Loader2 } from 'lucide-react';
import { Turnstile } from 'next-turnstile';
import { useEffect, useActionState } from 'react';
import { toast } from 'sonner';
import { appConfig } from '@/configs/app';
import { ActionState } from '@/app/actions';
import { anonymousLogInAction } from '../actions';
import {
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { SubmitButton } from '@/components/ui/submit-button';
import { useTurnstile } from '@/hooks/useTurnstile';

interface AnonymousLoginFormProps {
  siteKey: string | undefined;
  isDemoModeEnabled: boolean;
  initialFormState: ActionState;
}

function AnonymousLoginForm({
  siteKey,
  isDemoModeEnabled,
  initialFormState,
}: AnonymousLoginFormProps) {
  const {
    turnstileToken,
    turnstileStatus,
    turnstileError,
    showTurnstileSkeleton,
    verify,
    error,
    expire,
    load,
  } = useTurnstile();
  const [anonymousLoginState, anonymousLoginActionTrigger] = useActionState<ActionState, FormData>(anonymousLogInAction, initialFormState);

  useEffect(() => {
    if (anonymousLoginState?.error) {
      toast.error(anonymousLoginState.error);
    }
  }, [anonymousLoginState]);

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
                    onVerify={verify}
                    onError={error}
                    onExpire={expire}
                    onLoad={load}
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
};

export default AnonymousLoginForm;