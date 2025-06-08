'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Profile } from '@/types/Profiles';
import { Badge } from '@/components/ui/badge';

interface UsersTableProps {
  profiles: Profile[];
}

export function UsersTable({ profiles }: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Family</TableHead>
          <TableHead>Joined At</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}