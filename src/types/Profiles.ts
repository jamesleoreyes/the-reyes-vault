import { FamilyType, RolesType } from "./enums";

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: RolesType;
  family: FamilyType;
  created_at: string;
  updated_at: string;
}