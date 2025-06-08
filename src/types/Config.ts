interface IAppConfg {
  isDemoMode: boolean;
  isDemoModeEnabled: boolean;
  demoFeatures?: {
    hideAdminRoutes: boolean;
    generateFakeUserData: boolean;
    limitFileUploads: boolean;
  };
}

interface IUrlConfig {
  app: string;
  supabase: string;
  cloudflare: {
    api: string;
  }
}

interface ISupabaseConfig {
  anonKey: string;
  serviceRoleKey: string;
}

interface ICloudflareConfig {
  turnstile: {
    siteKey: string;
    secretKey: string;
  }
  accountId: string;
}

export type {
  IAppConfg,
  IUrlConfig,
  ISupabaseConfig,
  ICloudflareConfig
};