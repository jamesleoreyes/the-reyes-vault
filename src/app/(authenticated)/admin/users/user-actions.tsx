'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Profile } from '@/types/Profiles';
import { UpdateUserDialog } from './update-user-dialog';
import { DeleteUserAlert } from './delete-user-alert';
import { useState } from 'react';

interface UserActionsProps {
  profile: Profile;
}

export function UserActions({ profile }: UserActionsProps) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <UpdateUserDialog
        profile={profile}
        isOpen={isUpdateOpen}
        setIsOpenAction={setIsUpdateOpen}
      />
      <DeleteUserAlert
        profileId={profile.id}
        isOpen={isDeleteOpen}
        setIsOpenAction={setIsDeleteOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => setIsUpdateOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant='destructive'
            onClick={() => setIsDeleteOpen(true)}          
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}