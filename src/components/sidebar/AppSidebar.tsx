'use client';

import * as React from 'react'
import {
  AudioLines,
  Image,
  Library,
  LucideIcon,
  Music,
  NotebookText,
  Video,
  Videotape,
} from 'lucide-react'
import { User } from '@supabase/supabase-js'
import SidebarMain from './SidebarMain'
import SidebarAlbums from './SidebarAlbums'
import SidebarUser from './SidebarUser'
import SidebarLogo from './SidebarLogo'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@src/components/ui/sidebar'
import { Profile } from '@src/types'

export interface INavMain {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
}

export interface IAlbum {
  name: string;
  url: string;
  icon: LucideIcon;
}

const navMain: INavMain[] = [
  {
    title: 'Photos',
    url: '/memories/photos',
    icon: Image,
    isActive: true,
  },
  {
    title: 'Videos',
    url: '/memories/videos',
    icon: Video,
    isActive: false,
  },
  {
    title: 'VHS Tapes',
    url: '/memories/vhs',
    icon: Videotape,
    isActive: false,
  },
  {
    title: 'Music',
    url: '/memories/music',
    icon: Music,
    isActive: false,
  },
  {
    title: 'Audio',
    url: '/memories/audio',
    icon: AudioLines,
    isActive: false,
  },
  {
    title: 'Notes',
    url: '/memories/notes',
    icon: NotebookText,
    isActive: false,
  }
]

const albums: IAlbum[] = [
  {
    name: 'Christmas 2025',
    url: '#',
    icon: Library
  },
  {
    name: 'Cousins Meetup',
    url: '#',
    icon: Library
  },
  {
    name: 'Europe 2024',
    url: '#',
    icon: Library
  },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  isAdmin?: boolean;
  user: User;
  profile: Profile;
}

function AppSidebar({
  isAdmin = false,
  user,
  profile,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain items={navMain} />
        <SidebarAlbums albums={albums} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={user} profile={profile} isAdmin={isAdmin} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;