'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@src/components/ui/sidebar'
import { cn } from '@src/lib/styles';
import MEMORIES_NAV from './sidebar-paths';

function SidebarMain() {
  const { isMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;

  const handleNavigationClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Memories</SidebarGroupLabel>
      <SidebarMenu>
        {Object.values(MEMORIES_NAV).map(item => (
          <SidebarMenuItem
            key={item.key}
          >
            <Link
              href={item.url}
              onClick={handleNavigationClick}
            >
              <SidebarMenuButton
                tooltip={item.title}
                className={cn(
                  'cursor-pointer rounded-none',
                  isActive(item.url) && 'bg-accent'
                )}>
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