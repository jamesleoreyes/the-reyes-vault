'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@src/components/ui/table';
import { Profile } from '@supabase/types';
import { Badge } from '@src/components/ui/badge';
import { UserActions } from './user-actions';

interface UsersTableProps {
  profiles: Profile[];
  currentUserId?: string;
}

export function UsersTable({ profiles, currentUserId }: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Family</TableHead>
          <TableHead>Joined At</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {profiles.map((profile) => (
          <TableRow key={profile.id}>
            <TableCell>
              {profile.id}
            </TableCell>
            <TableCell>
              {profile.first_name} {profile.last_name}
            </TableCell>
            <TableCell>
              <Badge variant={profile.role === 'admin' ? 'default' : 'secondary'}>
                {profile.role[0]?.toUpperCase() + profile.role.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>{profile.family[0]?.toUpperCase() + profile.family.slice(1)}</TableCell>
            <TableCell>
              {new Date(profile.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <UserActions profile={profile} currentUserId={currentUserId} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}