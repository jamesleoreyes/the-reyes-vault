import { redirect } from "next/navigation";
import { appConfig } from "@/lib/config";
import { Profile } from "@/types/Profiles";
import { generateDemoProfile } from "./demo";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

/**
 * Retrieves a user's profile from Supabase or generates a demo profile.
 * 
 * In demo mode, returns a consistently generated demo profile based on the `userId`.
 * 
 * In normal mode, fetches the actual profile from the Supabase database.
 * 
 * @param {SupabaseClient} supabase - The Supabase client instance
 * @param {string} userId - The user's ID
 * @returns {Promise<Profile | null>} The user's profile or null if not found
 * @see {@link generateDemoProfile} for demo profile generation
 */
export async function getUserProfile(supabase: SupabaseClient, userId: string): Promise<Profile | null> {
  if (appConfig.isDemoMode) {
    return generateDemoProfile(userId);
  }

  const { data: userProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single() as { data: Profile };

  return userProfile;
}