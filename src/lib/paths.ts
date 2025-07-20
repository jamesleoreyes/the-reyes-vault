const PATHS = {
  ROOT: '/',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  ADMIN: '/admin',
  DASHBOARD: '/dashboard',
  MEMORIES_ROOT: '/memories',
  ALBUMS_ROOT: '/albums',
  PROFILE: '/profile',
  UPLOAD: '/upload',
} as const;

const PROTECTED_APP_PATHS = [
  PATHS.ADMIN,
  PATHS.MEMORIES_ROOT,
  PATHS.ALBUMS_ROOT,
  PATHS.RESET_PASSWORD,
  PATHS.DASHBOARD,
  PATHS.PROFILE,
  PATHS.UPLOAD,
];

const AUTH_FLOW_PAGES = [PATHS.LOGIN, PATHS.FORGOT_PASSWORD];
const isAdminPath = (path: string) => path.startsWith(PATHS.ADMIN);

export { PATHS, PROTECTED_APP_PATHS, AUTH_FLOW_PAGES, isAdminPath };