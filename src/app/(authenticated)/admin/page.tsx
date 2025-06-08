import { createServerClient } from "@/utils/supabase/server";
import { UsersTable } from './users/users-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CreateUserDialog } from "./users/create-user-dialog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Admin'
}

export default async function AdminUsersPage() {
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching profiles: ${error}`);
    return <div>Error loading users.</div>;
  }

  return (
    <div className="p-4 sm:p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              View, create, and manage user accounts.
            </CardDescription>
          </div>
          <CreateUserDialog />
        </CardHeader>
        <CardContent>
          <UsersTable profiles={profiles ?? []} currentUserId={user?.id} />
        </CardContent>
      </Card>
    </div>
  )
}