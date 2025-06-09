"use client"

import * as React from "react"
import {
  AudioLines,
  Image,
  Library,
  LucideIcon,
  Music,
  NotebookText,
  Video,
  Videotape,
} from "lucide-react"

import { SidebarMain } from "@/components/sidebar/sidebar-main"
import { SidebarAlbums } from "@/components/sidebar/sidebar-albums"
import { SidebarUser } from "@/components/sidebar/sidebar-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SidebarLogo } from "./sidebar-logo"
import { Profile } from "@/types/Profiles"
import { User } from "@supabase/supabase-js"

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
    name: "Christmas 2025",
    url: "#",
    icon: Library
  },
  {
    name: "Cousins Meetup",
    url: "#",
    icon: Library
  },
  {
    name: "Europe 2024",
    url: "#",
    icon: Library
  },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  isAdmin?: boolean;
  user: User;
  profile: Profile;
}

export function AppSidebar({
  isAdmin = false,
  user,
  profile,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
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
  )
}
