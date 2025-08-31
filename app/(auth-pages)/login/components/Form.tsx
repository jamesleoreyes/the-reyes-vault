'use client'

import { cn } from '@src/lib/styles';
import { appConfig, cloudflareConfig } from '@src/configs/app';
import { ActionState } from '@app/actions';
import AnonymousLoginForm from './AnonymousForm';
import DefaultLoginForm from './DefaultForm';

type LoginFormProps = React.ComponentPropsWithoutRef<'div'>

const initialFormState: ActionState = {
  error: undefined,
}

function LoginForm({
  className,
  ...props
}: LoginFormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <div className='flex flex-col items-center gap-2 text-center'>
        {appConfig.isDemoMode && appConfig.isDemoModeEnabled && cloudflareConfig.turnstile.siteKey ? (
          <>
            <h1 className='text-2xl font-light'>Log in to anonymous account</h1>
            <p className='text-muted-foreground text-sm text-balance font-light'>
              Complete the security check and click the anonymous log in button to enter
            </p>
          </>
        ) : appConfig.isDemoMode && !appConfig.isDemoModeEnabled ? (
          null
        ) : !appConfig.isDemoMode ? (
          <>
            <h1 className='text-2xl font-light'>Log in to your account</h1>
            <p className='text-muted-foreground text-sm text-balance font-light'>
              Enter your email below to log in to your account
            </p>
          </>
        ) : null}
      </div>
      {appConfig.isDemoMode ? (
        <AnonymousLoginForm
          siteKey={cloudflareConfig.turnstile.siteKey}
          isDemoModeEnabled={appConfig.isDemoModeEnabled}
          initialFormState={initialFormState}
        />
      ) : (
        <DefaultLoginForm initialFormState={initialFormState} />
      )}
    </div>
  );
};

export default LoginForm;