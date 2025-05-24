import { createBrowserClient as supaBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase browser client using environment variables.
 * @returns A Supabase browser client instance.
 */
export const createBrowserClient = () =>
  supaBrowserClient(
    process.env["NEXT_PUBLIC_SUPABASE_URL"]!,
    process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"]!,
  );
