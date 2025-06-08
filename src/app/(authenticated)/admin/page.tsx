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

export default async function AdminUsersPage() {
  const supabase = await createServerClient();

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
        <CardHeader>
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              View, create, and manage user accounts.
            </CardDescription>
          </div>
          <CreateUserDialog />
        </CardHeader>
        <CardContent>
          <UsersTable profiles={profiles ?? []} />
        </CardContent>
      </Card>
    </div>
  )
}