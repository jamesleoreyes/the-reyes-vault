interface IAppConfg {
  isDemoMode: boolean;
  isDemoModeEnabled: boolean;
  sentry: {
    dsn: string;
  };
  demoFeatures?: {
    hideAdminRoutes: boolean;
    generateFakeUserData: boolean;
    limitFileUploads: boolean;
  };
}

interface IUrlConfig {
  app: string;
  sitemap: string;
  supabase: string;
  cloudflare: {
    api: string;
  };
}

interface ISupabaseConfig {
  anonKey: string;
  serviceRoleKey: string;
}

interface ICloudflareConfig {
  turnstile: {
    siteKey: string;
    secretKey: string;
  };
  accountId: string;
}

interface IAssetsConfig {
  branding: {
    favicon: string;
    icons: {
      appleTouch: string;
      '192': string;
      '512': string;
    };
  };
  images: {
    og: string;
    placeholder: string;
  };
};

export type {
  IAppConfg,
  IUrlConfig,
  ISupabaseConfig,
  ICloudflareConfig,
  IAssetsConfig
};