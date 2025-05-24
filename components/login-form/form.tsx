'use client'

import { cn } from '@/lib/utils';
import { isDemoMode, isDemoModeEnabled } from '@/lib/config';
import { ActionErrorState } from '@/app/actions';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AnonymousLoginForm } from './anonymous-form';
import { DefaultLoginForm } from './default-form';

interface LoginFormProps extends React.ComponentPropsWithoutRef<'div'> { }

const initialFormState: ActionErrorState = {
  error: undefined,
}

export function LoginForm({
  className,
  ...props
}: LoginFormProps) {
  const siteKey = process.env['NEXT_PUBLIC_TURNSTILE_SITE_KEY'];

  return (
    <div className={cn('flex flex-col', className)} {...props}>
      <Card className='bg-background border-none shadow-none'>
        <CardHeader>
          <CardTitle className='text-2xl text-center'>Welcome to The Reyes Vault</CardTitle>
          {isDemoMode && isDemoModeEnabled ? (
            <CardDescription className='text-center text-base'>
              Complete the security check and click the anonymous log in button to enter
            </CardDescription>
          ) : isDemoMode && !isDemoModeEnabled ? (
            null
          ) : (
            <CardDescription className='text-center text-base'>
              Enter your email below to login to your account
            </CardDescription>
          )}
        </CardHeader>
        {isDemoMode ? (
          <AnonymousLoginForm
            siteKey={siteKey}
            isDemoModeEnabled={isDemoModeEnabled}
            initialFormState={initialFormState}
          />
        ) : (
          <DefaultLoginForm initialFormState={initialFormState} />
        )}
      </Card>
    </div >
  );
}
