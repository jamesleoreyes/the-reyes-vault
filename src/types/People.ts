interface Person {
  id: string;
  name: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

type CreatePersonInput = Omit<Person, 'id' | 'created_at' | 'updated_at'>;

type UpdatePersonInput = Partial<Pick<Person, 'name'>>;

export type {
  Person,
  CreatePersonInput,
  UpdatePersonInput,
}