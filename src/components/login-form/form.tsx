'use client'

import { cn } from '@/lib/utils';
import { appConfig, cloudflareConfig } from '@/lib/config';
import { ActionErrorState } from '@/app/actions';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AnonymousLoginForm } from './anonymous-form';
import { DefaultLoginForm } from './default-form';

type LoginFormProps = React.ComponentPropsWithoutRef<'div'>

const initialFormState: ActionErrorState = {
  error: undefined,
}

export function LoginForm({
  className,
  ...props
}: LoginFormProps) {
  return (
    <div className={cn('flex flex-col w-full max-w-xl', className)} {...props}>
      <Card className='bg-transparent border-none shadow-none'>
        <CardHeader className='px-0'>
          <CardTitle className='text-2xl text-center text-black'>Welcome to The Reyes Vault</CardTitle>
          {appConfig.isDemoMode && appConfig.isDemoModeEnabled && cloudflareConfig.turnstile.siteKey ? (
            <CardDescription className='text-center text-base text-slate-600'>
              Complete the security check and click the anonymous log in button to enter
            </CardDescription>
          ) : appConfig.isDemoMode && !appConfig.isDemoModeEnabled ? (
            null
          ) : !appConfig.isDemoMode ? (
            <CardDescription className='text-center text-base text-muted'>
              Enter your email below to login to your account
            </CardDescription>
          ) : null
          }
        </CardHeader>
        {appConfig.isDemoMode ? (
          <AnonymousLoginForm
            siteKey={cloudflareConfig.turnstile.siteKey}
            isDemoModeEnabled={appConfig.isDemoModeEnabled}
            initialFormState={initialFormState}
          />
        ) : (
          <DefaultLoginForm initialFormState={initialFormState} />
        )}
      </Card>
    </div >
  );
}
