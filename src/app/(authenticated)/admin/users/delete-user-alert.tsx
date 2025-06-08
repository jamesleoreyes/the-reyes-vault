'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deleteUser } from './actions';
import { toast } from 'sonner';

interface DeleteUserAlertProps {
  profileId: string;
  isOpen: boolean;
  setIsOpenAction: (isOpen: boolean) => void;
}

export function DeleteUserAlert({
  profileId,
  isOpen,
  setIsOpenAction,
}: DeleteUserAlertProps) {
  const handleDelete = async () => {
    const formData = new FormData();
    formData.append('id', profileId);
    const result = await deleteUser(formData);
    if (result.message.startsWith('Error')) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpenAction}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            and all of their associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-400 text-white"
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}