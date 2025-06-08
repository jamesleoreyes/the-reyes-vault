'use server';

import { Family, Role } from "@/types/enums";
import { createAdminClient } from "@/utils/supabase/admin";
import { createServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
  first_name: z.string().min(1, { message: 'First name is required.' }),
  last_name: z.string().min(1, { message: 'Last name is required.' }),
  role: z.nativeEnum(Role),
  family: z.nativeEnum(Family),
});

const UpdateUserSchema = z.object({
  id: z.string().uuid({ message: "Invalid user ID." }),
  first_name: z.string().min(1, { message: 'First name is required.' }),
  last_name: z.string().min(1, { message: 'Last name is required.' }),
  role: z.nativeEnum(Role),
  family: z.nativeEnum(Family),
});

export async function createUser(prevState: any, formData: FormData) {
  const validatedFields = UserSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check the form fields.',
    };
  }

  const {
    email,
    password,
    first_name,
    last_name,
    role,
    family
  } = validatedFields.data;
  const supabaseAdmin = await createAdminClient();

  const { data: authData, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (authError) {
    console.error(`Error creating user (auth): ${authError}`);
    return { message: `Error creating user: ${authError.message}` };
  }

  if (!authData.user) {
    return { message: `Error: User was not created.` };
  }
  const userId = authData.user.id;

  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .update({
      first_name,
      last_name,
      role,
      family,
    })
    .eq('id', userId);

  if (profileError) {
    console.error(`Error updating profile: ${profileError}`);
    return { message: `User created, but failed to update profile: ${profileError.message}` };
  }

  revalidatePath('/admin/users');
  return { message: `Successfully created user ${email}.` };
}

export async function updateUser(prevState: any, formData: FormData) {
  const validatedFields = UpdateUserSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    console.error(`Validation failed: ${JSON.stringify(validatedFields.error.flatten().fieldErrors, null, 2)}`)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check the form fields.',
    };
  }

  const { id, ...profileData } = validatedFields.data;
  const supabaseAdmin = await createAdminClient();
  const supabaseServer = await createServerClient();

  const { data: { user: authUser } } = await supabaseServer.auth.getUser();

  if (authUser && authUser.id === id && profileData.role !== Role.ADMIN) {
    const { data: userToUpdate } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', id)
      .single();

    if (userToUpdate?.role === Role.ADMIN) {
      const { count } = await supabaseAdmin
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', Role.ADMIN);

      if (count === 1) {
        return {
          message: 'Error: Cannot revoke privileges from the only admin account.',
        };
      }
    }
  }

  const fullName = `${profileData.first_name} ${profileData.last_name}`;

  const { error } = await supabaseAdmin
    .from('profiles')
    .update(profileData)
    .eq('id', id);

  if (error) {
    console.error(`Error updating profile: ${error}`);
    return { message: `Error updating profile: ${error.message}` };
  }

  revalidatePath('/admin/users');
  return { message: `Successfully updated user ${fullName}` }
}

export async function deleteUser(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) {
    return { message: 'Error: User ID is missing.' };
  }

  const supabaseAdmin = await createAdminClient();

  const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
  if (error) {
    console.error(`Error deleting user: ${error}`);
    return { message: `Error deleting user: ${error.message}` };
  }

  revalidatePath('/admin/users');
  return { message: `Successfully deleted user.` }
}