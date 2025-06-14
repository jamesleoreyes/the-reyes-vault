interface Person {
  id: string;
  name: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type { Person }