interface MemoryTag {
  memory_id: string;
  tag_id: string;
  assigned_at: string;
  assigned_by: string;
}

type CreateMemoryTagInput = Omit<MemoryTag, 'assigned_at'>;

type UpdateMemoryTagInput = Partial<Pick<MemoryTag, 'assigned_by'>>;

export type {
  MemoryTag,
  CreateMemoryTagInput,
  UpdateMemoryTagInput,
}