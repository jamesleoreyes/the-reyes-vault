import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env["NEXT_PUBLIC_SUPABASE_URL"]!,
    process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"]!,
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

  const authInfo = await supabase.auth.getUser();
  const isUserAuthenticated = authInfo.data.user !== null && authInfo.error === null;
  const currentPath = request.nextUrl.pathname;

  const rootPath = '/';
  const signInPath = '/sign-in';
  const dashboardPath = '/dashboard';
  const protectedAppPaths = [
    dashboardPath,
    '/profile',
    '/upload',
    '/albums',
    '/reset-password'
  ];

  const authFlowPages = [signInPath, '/forgot-password'];

  if (currentPath === rootPath) {
    if (isUserAuthenticated) {
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    } else {
      return NextResponse.redirect(new URL(signInPath, request.url));
    }
  }

  if (!isUserAuthenticated && protectedAppPaths.some(path => currentPath.startsWith(path))) {
    return NextResponse.redirect(new URL(signInPath, request.url));
  }

  if (isUserAuthenticated && authFlowPages.includes(currentPath)) {
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  return response;
};
