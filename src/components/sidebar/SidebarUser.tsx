'use client'

import {
  ChevronsUpDown,
  Library,
  LogOut,
  Settings,
  Sparkles,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { User as SupaUser } from '@supabase/supabase-js'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { logOutAction } from '@/app/actions';
import { DemoAwareNav } from '@/components/DemoAwareNav'
import { Profile } from '@/types'

function SidebarUser({
  user,
  profile,
  isAdmin = false,
}: {
  user: SupaUser,
  profile: Profile,
  isAdmin?: boolean
}) {
  const { isMobile, setOpenMobile } = useSidebar();
  const fullName = `${profile.first_name} ${profile.last_name}`
  const initials = `${profile.first_name[0]?.toUpperCase()}${profile.last_name[0]?.toUpperCase()}`

  const handleLogOut = async () => {
    handleNavigationClick();
    await logOutAction();
    toast.success('You have been logged out successfully');
  };

  const handleNavigationClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    };
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer rounded-none'
            >
              <Avatar className='h-8 w-8'>
                <AvatarImage src={profile.avatar_url!} alt={fullName} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{fullName}</span>
                <span className='truncate text-xs'>{user.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src={profile.avatar_url!} alt={fullName} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>{fullName}</span>
                  <span className='truncate text-xs'>{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href='/profile' onClick={handleNavigationClick} className='cursor-pointer'>
                  <User size={16} className='mr-2' />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/memories' onClick={handleNavigationClick} className='cursor-pointer'>
                  <Sparkles size={16} className='mr-2' />
                  Memories
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/albums' onClick={handleNavigationClick} className='cursor-pointer'>
                  <Library size={16} className='mr-2' />
                  Albums
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            {/* Admin Section - Only show for admin users and when admin features are enabled */}
            <DemoAwareNav adminOnly>
              {isAdmin && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href='/admin' onClick={handleNavigationClick} className='cursor-pointer'>
                        <Settings size={16} className='mr-2' />
                        Admin
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              )}
            </DemoAwareNav>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogOut}
              className='cursor-pointer'
              variant='destructive'
            >
              <LogOut size={16} className='mr-2' />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
};

export default SidebarUser;