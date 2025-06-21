import * as Sentry from "@sentry/nextjs";
import { appConfig } from "@/lib/config";

Sentry.init({
  dsn: appConfig.sentry.dsn,
  tracesSampleRate: 1,
  debug: false,
});