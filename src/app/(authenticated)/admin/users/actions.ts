'use server';

import { family, roles } from "@/types/enums";
import { createAdminClient } from "@/utils/supabase/admin";
import { revalidatePath } from "next/cache";
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
  first_name: z.string().min(1, { message: 'First name is required.' }),
  last_name: z.string().min(1, { message: 'Last name is required.' }),
  role: z.enum(roles),
  family: z.enum(family),
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