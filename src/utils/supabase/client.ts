import { createBrowserClient as supaBrowserClient } from '@supabase/ssr';
import { urlConfig, supabaseConfig } from '@/configs/app';
import { Database } from '@/types';

/**
 * Creates a Supabase browser client using environment variables.
 * @returns A Supabase browser client instance.
 */
function createBrowserClient() {
  return supaBrowserClient<Database>(
    urlConfig.supabase,
    supabaseConfig.anonKey,
  );
};

export { createBrowserClient };