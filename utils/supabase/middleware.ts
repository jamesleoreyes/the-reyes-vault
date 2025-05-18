import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import {
  ROOT_PATH,
  SIGN_IN_PATH,
  DASHBOARD_PATH,
  PROTECTED_APP_PATHS,
  AUTH_FLOW_PAGES,
} from "@/lib/authPaths";

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

  if (isUserAuthenticated && AUTH_FLOW_PAGES.includes(currentPath)) {
    return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url));
  }

  return response;
};
