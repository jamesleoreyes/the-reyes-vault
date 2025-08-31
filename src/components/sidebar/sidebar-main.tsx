'use client'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@src/components/ui/sidebar'
import { INavMain } from './app-sidebar'
import Link from 'next/link'

function SidebarMain({ items }: { items: INavMain[] }) {
  const { isMobile, setOpenMobile } = useSidebar();

  const handleNavigationClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Memories</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
          >
            <Link href={item.url} onClick={handleNavigationClick}>
              <SidebarMenuButton tooltip={item.title} className='cursor-pointer rounded-none'>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
};

export default SidebarMain;