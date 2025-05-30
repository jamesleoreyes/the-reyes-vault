import { createBrowserClient as supaBrowserClient } from "@supabase/ssr";
import { urlConfig, supabaseConfig } from '@/src/lib/config';

/**
 * Creates a Supabase browser client using environment variables.
 * @returns A Supabase browser client instance.
 */
export function createBrowserClient() {
  supaBrowserClient(
    urlConfig.supabase,
    supabaseConfig.anonKey,
  );
}
