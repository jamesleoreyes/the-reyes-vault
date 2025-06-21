import * as Sentry from "@sentry/nextjs";
import { appConfig } from "@/lib/config";

Sentry.init({
  dsn: appConfig.sentry.dsn,
  integrations: [
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;