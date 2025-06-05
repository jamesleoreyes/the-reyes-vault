"use client"

import * as React from "react"
import {
  AudioLines,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Image,
  Library,
  LucideIcon,
  Music,
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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <SidebarUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
