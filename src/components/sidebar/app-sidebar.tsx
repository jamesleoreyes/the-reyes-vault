'use client';

import * as React from 'react'
import {
  Library,
  LucideIcon,
} from 'lucide-react'
import { User } from '@supabase/supabase-js'
import SidebarMain from './sidebar-main'
import SidebarAlbums from './sidebar-albums'
import SidebarUser from './sidebar-user'
import SidebarLogo from './sidebar-logo'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@src/components/ui/sidebar'
import { Profile } from '@supabase/types'

export interface IAlbum {
  name: string;
  url: string;
  icon: LucideIcon;
}

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
        <SidebarMain />
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