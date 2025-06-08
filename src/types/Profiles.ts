import { Family, Role } from "./enums";

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: Role;
  family: Family;
  created_at: string;
  updated_at: string;
}