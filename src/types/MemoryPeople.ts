interface MemoryPerson {
  memory_id: string;
  person_id: string;
  assigned_at: string;
  assigned_by: string;
}

type CreateMemoryPersonInput = Omit<MemoryPerson, 'assigned_at'>;

type UpdateMemoryPersonInput = Partial<Pick<MemoryPerson, 'assigned_by'>>;

export type {
  MemoryPerson,
  CreateMemoryPersonInput,
  UpdateMemoryPersonInput,
}