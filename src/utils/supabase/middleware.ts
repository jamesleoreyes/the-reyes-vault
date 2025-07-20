import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import {
  PATHS,
  PROTECTED_APP_PATHS,
  AUTH_FLOW_PAGES,
  isAdminPath,
} from '@/lib/paths';
import { appConfig, supabaseConfig, urlConfig } from '@/configs/app';
import { getUserProfile } from '../utils';
import { Database } from '@/types';

async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const currentPath = request.nextUrl.pathname;

  // Block ALL admin routes in demo mode - no exceptions
  if (appConfig.isDemoMode && isAdminPath(currentPath)) {
    return NextResponse.redirect(new URL(PATHS.DASHBOARD, request.url));
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

  if (currentPath === PATHS.ROOT) {
    if (isUserAuthenticated) {
      return NextResponse.redirect(new URL(PATHS.DASHBOARD, request.url));
    } else {
      return NextResponse.redirect(new URL(PATHS.LOGIN, request.url));
    }
  }

  if (!isUserAuthenticated && PROTECTED_APP_PATHS.some(path => currentPath.startsWith(path))) {
    return NextResponse.redirect(new URL(PATHS.LOGIN, request.url));
  }

  if (isUserAuthenticated) {
    if (AUTH_FLOW_PAGES.includes(currentPath as typeof AUTH_FLOW_PAGES[number])) {
      return NextResponse.redirect(new URL(PATHS.DASHBOARD, request.url));
    }

    if (!appConfig.isDemoMode && isAdminPath(currentPath)) {
      const userProfile = await getUserProfile(supabase, user.id);
      if (userProfile.role !== 'admin') {
        return NextResponse.redirect(new URL(PATHS.DASHBOARD, request.url));
      }
    }
  }

  return response;
};

export { updateSession };