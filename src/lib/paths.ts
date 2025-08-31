const PUBLIC_PATHS = {
  ROOT: '/',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
} as const;

const APP_PATHS = {
  ADMIN: '/admin',
  DASHBOARD: '/dashboard',
  MEMORIES: {
    ROOT: '/memories',
    PHOTOS: '/memories/photos',
    VIDEOS: '/memories/videos',
    VHS: '/memories/vhs',
    MUSIC: '/memories/music',
    AUDIO: '/memories/audio',
    NOTES: '/memories/notes',
  },
  ALBUMS: {
    ROOT: '/albums',
  },
  PROFILE: '/profile',
  UPLOAD: '/upload',
} as const;


const collectPaths = (object: Record<string, unknown>): string[] => {
  return Object.values(object).flatMap(value => typeof value === 'string'
    ? [value]
    : value && typeof value === 'object'
      ? collectPaths(value as Record<string, unknown>)
      : []
  );
};

const AUTH_FLOW_PAGES = [PUBLIC_PATHS.LOGIN, PUBLIC_PATHS.FORGOT_PASSWORD];
const PUBLIC_PATH_VALUES = Object.values(PUBLIC_PATHS);
const APP_PATH_VALUES = collectPaths(APP_PATHS);

const isPublicPath = (path: string) => PUBLIC_PATH_VALUES.includes(path as typeof PUBLIC_PATH_VALUES[number]);
const isAppPath = (path: string) => APP_PATH_VALUES.some(p => path.startsWith(p));
const isAdminPath = (path: string) => path.startsWith(APP_PATHS.ADMIN);

export { PUBLIC_PATHS, APP_PATHS, AUTH_FLOW_PAGES, isPublicPath, isAppPath, isAdminPath };