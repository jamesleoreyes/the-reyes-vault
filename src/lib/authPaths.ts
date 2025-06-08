export const ROOT_PATH = '/';
export const LOGIN_PATH = '/login';
export const FORGOT_PASSWORD_PATH = '/forgot-password';
export const RESET_PASSWORD_PATH = '/reset-password';
export const ADMIN_PATH = '/admin';
export const DASHBOARD_PATH = '/dashboard';
export const MEMORIES_ROOT_PATH = '/memories';
export const ALBUMS_ROOT_PATH = '/albums';
export const PROFILE_PATH = '/profile';
export const UPLOAD_PATH = '/upload';

export const PROTECTED_APP_PATHS = [
  ADMIN_PATH,
  MEMORIES_ROOT_PATH,
  ALBUMS_ROOT_PATH,
  RESET_PASSWORD_PATH,
  DASHBOARD_PATH,
  PROFILE_PATH,
  UPLOAD_PATH,
];

export const AUTH_FLOW_PAGES = [LOGIN_PATH, FORGOT_PASSWORD_PATH];
export const isAdminPath = (path: string) => path.startsWith(ADMIN_PATH);