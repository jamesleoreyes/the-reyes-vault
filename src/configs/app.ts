import type { IAppConfg, IUrlConfig, ISupabaseConfig, ICloudflareConfig, IAssetsConfig } from '@src/types';

const appConfig: IAppConfg = {
  isDemoMode: process.env['NEXT_PUBLIC_DEMO_MODE']?.toLowerCase() === 'true',
  isDemoModeEnabled: process.env['NEXT_PUBLIC_DEMO_MODE_ENABLED']?.toLowerCase() === 'true',
  sentry: {
    dsn: process.env['SENTRY_DSN'] ?? '',
  }
};

const urlConfig: IUrlConfig = {
  app: process.env['APP_URL'] ?? '',
  sitemap: process.env['SITEMAP_URL'] ?? '',
  supabase: process.env['NEXT_PUBLIC_SUPABASE_URL'] ?? '',
  cloudflare: {
    api: process.env['CLOUDFLARE_API_ENDPOINT'] ?? '',
  }
};

const supabaseConfig: ISupabaseConfig = {
  anonKey: process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] ?? '',
  serviceRoleKey: process.env['SUPABASE_SERVICE_ROLE_KEY'] ?? '',
};

const cloudflareConfig: ICloudflareConfig = {
  turnstile: {
    siteKey: process.env['NEXT_PUBLIC_TURNSTILE_SITE_KEY'] ?? '',
    secretKey: process.env['TURNSTILE_SECRET_KEY'] ?? '',
  },
  accountId: process.env['CLOUDFLARE_ACCOUNT_ID'] ?? '',
};

const assets: IAssetsConfig = {
  branding: {
    favicon: '/branding/favicon.ico',
    icons: {
      appleTouch: '/branding/apple-touch-icon.png',
      '192': '/branding/icon-192.png',
      '512': '/branding/icon-512.png',
    },
  },
  images: {
    og: '/images/og.png',
    placeholder: '/images/placeholder.svg',
  }
};

export { appConfig, urlConfig, supabaseConfig, cloudflareConfig, assets };