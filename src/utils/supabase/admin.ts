import { createClient } from '@supabase/supabase-js';
import { urlConfig, supabaseConfig } from '@/src/lib/config';

/**
 * Creates a Supabase admin client with service role key.
 * This client has elevated privileges and should be used with caution.
 * It uses the public Supabase URL and service role key from environment variables.
 *
 * @returns A Supabase admin client instance.
 */
export async function createAdminClint() {
  return createClient(
    urlConfig.supabase,
    supabaseConfig.serviceRoleKey,
  )
}