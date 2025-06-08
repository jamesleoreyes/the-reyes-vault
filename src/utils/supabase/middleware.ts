import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import {
  ROOT_PATH,
  SIGN_IN_PATH,
  DASHBOARD_PATH,
  PROTECTED_APP_PATHS,
  AUTH_FLOW_PAGES,
  isAdminPath,
} from "@/lib/authPaths";
import { supabaseConfig, urlConfig } from "@/lib/config";
import { Profile } from "@/types/Profiles";

export const updateSession = async (request: NextRequest) => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    urlConfig.supabase,
    supabaseConfig.anonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data: { user }, error } = await supabase.auth.getUser();
  const isUserAuthenticated = user !== null && error === null;
  const currentPath = request.nextUrl.pathname;

  if (currentPath === ROOT_PATH) {
    if (isUserAuthenticated) {
      return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url));
    } else {
      return NextResponse.redirect(new URL(SIGN_IN_PATH, request.url));
    }
  }

  if (!isUserAuthenticated && PROTECTED_APP_PATHS.some(path => currentPath.startsWith(path))) {
    return NextResponse.redirect(new URL(SIGN_IN_PATH, request.url));
  }

  if (isUserAuthenticated) {
    if (AUTH_FLOW_PAGES.includes(currentPath)) {
      return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url));
    }

    if (isAdminPath(currentPath)) {
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single() as { data: Profile };

      console.debug(`supabase/middleware.ts -> userProfile:\n${JSON.stringify(userProfile, null, 2)}`)

      if (userProfile?.role !== 'admin') {
        return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url));
      }
    }
  }

  return response;
};
