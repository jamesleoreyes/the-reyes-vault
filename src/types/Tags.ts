interface Tag {
  id: string;
  name: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

type CreateTagInput = Omit<Tag, 'id' | 'created_at' | 'updated_at'>;

type UpdateTagInput = Partial<Pick<Tag, 'name'>>;

export type {
  Tag,
  CreateTagInput,
  UpdateTagInput,
}