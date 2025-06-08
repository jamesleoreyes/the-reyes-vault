'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateUser } from './actions';
import { useEffect, useState, useMemo, useActionState } from 'react';
import { toast } from 'sonner';
import { Profile } from '@/types/Profiles';
import { Family, Role } from '@/types/enums';

const initialState = {
  message: '',
  errors: {},
};

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || disabled}>
      {pending ? 'Updating...' : 'Save Changes'}
    </Button>
  );
}

interface UpdateUserDialogProps {
  profile: Profile;
  isOpen: boolean;
  setIsOpenAction: (isOpen: boolean) => void;
}

export function UpdateUserDialog({
  profile,
  isOpen,
  setIsOpenAction,
}: UpdateUserDialogProps) {
  const [state, formAction] = useActionState(updateUser, initialState);
  const [formData, setFormData] = useState(profile);

  const hasChanged = useMemo(() => {
    return (
      formData.first_name !== profile.first_name ||
      formData.last_name !== profile.last_name ||
      formData.role !== profile.role ||
      formData.family !== profile.family
    );
  }, [formData, profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: 'role' | 'family') => (value: string) => {
    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    if (!isOpen) return;
    if (state.message) {
      if (state.errors) {
        toast.error(state.message);
      } else {
        toast.success(state.message);
        setIsOpenAction(false);
      }
    }
  }, [state, isOpen, setIsOpenAction]);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpenAction}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Make changes to the user's profile. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <input type="hidden" name="id" value={profile.id} />
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="first_name" className="text-right">
                First Name
              </Label>
              <Input
                id="first_name"
                name="first_name"
                value={formData.first_name || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="last_name" className="text-right">
                Last Name
              </Label>
              <Input
                id="last_name"
                name="last_name"
                value={formData.last_name || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select
                name="role"
                value={formData.role}
                onValueChange={handleSelectChange('role')}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Role.MEMBER}>Member</SelectItem>
                  <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="family" className="text-right">
                Family
              </Label>
              <Select
                name="family"
                value={formData.family}
                onValueChange={handleSelectChange('family')}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a family" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Family.REYES}>Reyes</SelectItem>
                  <SelectItem value={Family.CONKLIN}>Conklin</SelectItem>
                  <SelectItem value={Family.ALL}>All</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <SubmitButton disabled={!hasChanged} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}