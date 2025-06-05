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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        {appConfig.isDemoMode && appConfig.isDemoModeEnabled && cloudflareConfig.turnstile.siteKey ? (
          <>
            <h1 className="text-2xl font-light">Login to anonymous account</h1>
            <p className="text-muted-foreground text-sm text-balance font-extralight">
              Complete the security check and click the anonymous log in button to enter
            </p>
          </>
        ) : appConfig.isDemoMode && !appConfig.isDemoModeEnabled ? (
          null
        ) : !appConfig.isDemoMode ? (
          <>
            <h1 className="text-2xl font-light">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance font-extralight">
              Enter your email below to login to your account
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
}
