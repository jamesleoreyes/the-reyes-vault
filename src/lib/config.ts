import type { IAppConfg, IUrlConfig, ISupabaseConfig, ICloudflareConfig } from '@/types/Config';

export const appConfig: IAppConfg = {
  isDemoMode: process.env['NEXT_PUBLIC_DEMO_MODE']?.toLowerCase() === 'true',
  isDemoModeEnabled: process.env['NEXT_PUBLIC_DEMO_MODE_ENABLED']?.toLowerCase() === 'true',
}

export const urlConfig: IUrlConfig = {
  app: process.env['APP_URL'] ?? '',
  supabase: process.env['NEXT_PUBLIC_SUPABASE_URL'] ?? '',
  cloudflare: {
    api: process.env['CLOUDFLARE_API_ENDPOINT'] ?? '',
  }
}

export const supabaseConfig: ISupabaseConfig = {
  anonKey: process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] ?? '',
  serviceRoleKey: process.env['SUPABASE_SERVICE_ROLE_KEY'] ?? '',
}

export const cloudflareConfig: ICloudflareConfig = {
  turnstile: {
    siteKey: process.env['NEXT_PUBLIC_TURNSTILE_SITE_KEY'] ?? '',
    secretKey: process.env['TURNSTILE_SECRET_KEY'] ?? '',
  },
  accountId: process.env['CLOUDFLARE_ACCOUNT_ID'] ?? '',
  r2: {
    endpoint: process.env['CLOUDFLARE_R2_ENDPOINT'] ?? '',
    accessKeyId: process.env['CLOUDFLARE_R2_ACCESS_KEY_ID'] ?? '',
    secretAccessKey: process.env['CLOUDFLARE_R2_SECRET_ACCESS_KEY'] ?? '',
    bucketName: process.env['CLOUDFLARE_R2_BUCKET_NAME'] ?? '',
    publicUrl: process.env['CLOUDFLARE_R2_PUBLIC_URL'] ?? '',
  }
}