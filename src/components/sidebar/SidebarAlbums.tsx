'use client'

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { IAlbum } from './AppSidebar'

function SidebarAlbums({ albums }: { albums: IAlbum[] }) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>Albums</SidebarGroupLabel>
      <SidebarMenu>
        {albums.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild className='rounded-none'>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className='sr-only'>More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-48 shadow-lg'
                side={isMobile ? 'bottom' : 'right'}
                align={isMobile ? 'end' : 'start'}
              >
                <DropdownMenuItem>
                  <Folder size={16} className='text-muted-foreground mr-2' />
                  <span>View Album</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward size={16} className='text-muted-foreground mr-2' />
                  <span>Share Album</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 size={16} className='text-muted-foreground mr-2' />
                  <span>Delete Album</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
};

export default SidebarAlbums;