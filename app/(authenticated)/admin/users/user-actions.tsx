'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@src/components/ui/dropdown-menu';
import { Button } from '@src/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Profile } from '@src/types';
import { UpdateUserDialog } from './update-user-dialog';
import { DeleteUserAlert } from './delete-user-alert';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@src/components/ui/tooltip';

interface UserActionsProps {
  profile: Profile;
  currentUserId?: string;
}

export function UserActions({ profile, currentUserId }: UserActionsProps) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const isCurrentUser = profile.id === currentUserId;

  const handleDeleteClick = () => {
    if (isCurrentUser) return;
    setIsDeleteOpen(true);
  }

  const DeleteMenuItem = (
    <DropdownMenuItem
      variant="destructive"
      onClick={handleDeleteClick}
      disabled={isCurrentUser}
    >
      Delete
    </DropdownMenuItem>
  );

  return (
    <>
      <UpdateUserDialog
        profile={profile}
        isOpen={isUpdateOpen}
        setIsOpenAction={setIsUpdateOpen}
        currentUserId={currentUserId}
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
          {isCurrentUser ? (
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <span className="w-full">{DeleteMenuItem}</span>
              </TooltipTrigger>
              <TooltipContent side='left' sideOffset={5}>
                <p>You cannot delete your own account.</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            DeleteMenuItem
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}