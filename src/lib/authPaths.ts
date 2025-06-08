export const ROOT_PATH = '/';
export const SIGN_IN_PATH = '/login';
export const DASHBOARD_PATH = '/dashboard';
export const ADMIN_PATH = '/admin';

export const PROTECTED_APP_PATHS = [
  DASHBOARD_PATH,
  '/profile',
  '/upload',
  '/albums',
  '/reset-password',
  ADMIN_PATH,
];

export const AUTH_FLOW_PAGES = [SIGN_IN_PATH, '/forgot-password'];
export const isAdminPath = (path: string) => path.startsWith(ADMIN_PATH);