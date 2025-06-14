import { FamilyEnum, RoleEnum } from "./enums";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  role: RoleEnum;
  family: FamilyEnum;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export type { Profile }