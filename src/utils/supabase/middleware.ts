import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import {
  PUBLIC_PATHS,
  APP_PATHS,
  isAdminPath,
  isAppPath,
  isPublicPath
} from '@src/lib/paths';
import { appConfig, supabaseConfig, urlConfig } from '@src/configs/app';
import { getUserProfile } from '../utils';
import { Database } from '@src/types';

async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const currentPath = request.nextUrl.pathname;

  // Block ALL admin routes in demo mode - no exceptions
  if (appConfig.isDemoMode && isAdminPath(currentPath)) {
    return NextResponse.redirect(new URL(APP_PATHS.DASHBOARD, request.url));
  }

  const supabase = createServerClient<Database>(
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

  if (currentPath === PUBLIC_PATHS.ROOT) {
    if (isUserAuthenticated) {
      return NextResponse.redirect(new URL(APP_PATHS.DASHBOARD, request.url));
    } else {
      return NextResponse.redirect(new URL(PUBLIC_PATHS.LOGIN, request.url));
    }
  }

  if (!isUserAuthenticated && isAppPath(currentPath)) {
    return NextResponse.redirect(new URL(PUBLIC_PATHS.LOGIN, request.url));
  }

  if (isUserAuthenticated) {
    if (isPublicPath(currentPath)) {
      return NextResponse.redirect(new URL(APP_PATHS.DASHBOARD, request.url));
    }

    if (!appConfig.isDemoMode && isAdminPath(currentPath)) {
      const userProfile = await getUserProfile(supabase, user.id);
      if (userProfile.role !== 'admin') {
        return NextResponse.redirect(new URL(APP_PATHS.DASHBOARD, request.url));
      }
    }
  }

  return response;
};

export { updateSession };