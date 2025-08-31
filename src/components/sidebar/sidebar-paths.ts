import {
  AudioLines,
  Image,
  LucideIcon,
  Music,
  NotebookText,
  Video,
  Videotape,
} from 'lucide-react'
import { APP_PATHS } from '@src/lib/paths';

export interface INavItem {
  key: string;
  title: string;
  url: string;
  icon: LucideIcon;
}

const MEMORIES_NAV: Record<string, INavItem> = {
  PHOTOS: {
    key: 'PHOTOS',
    title: 'Photos',
    url: APP_PATHS.MEMORIES.PHOTOS,
    icon: Image,
  },
  VIDEOS: {
    key: 'VIDEOS',
    title: 'Videos',
    url: APP_PATHS.MEMORIES.VIDEOS,
    icon: Video,
  },
  VHS: {
    key: 'VHS',
    title: 'VHS Tapes',
    url: APP_PATHS.MEMORIES.VHS,
    icon: Videotape,
  },
  MUSIC: {
    key: 'MUSIC',
    title: 'Music',
    url: APP_PATHS.MEMORIES.MUSIC,
    icon: Music,
  },
  AUDIO: {
    key: 'AUDIO',
    title: 'Audio',
    url: APP_PATHS.MEMORIES.AUDIO,
    icon: AudioLines,
  },
  NOTES: {
    key: 'NOTES',
    title: 'Notes',
    url: APP_PATHS.MEMORIES.NOTES,
    icon: NotebookText,
  }
} as const;

export default MEMORIES_NAV;