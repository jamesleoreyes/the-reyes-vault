import { createServerClient as supaServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { supabaseConfig, urlConfig } from '@/lib/config';
import { Database } from '@/types/Supabase';

/**
 * Creates a Supabase server client with cookie handling for SSR.
 * This client is intended for use in server components and API routes.
 * It uses the public Supabase URL and anonymous key from environment variables.
 *
 * @returns A Supabase server client instance.
 */
export async function createServerClient() {
  const cookieStore = await cookies()

  return supaServerClient<Database>(
    urlConfig.supabase,
    supabaseConfig.anonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    },
  );
};