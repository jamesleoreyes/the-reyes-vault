import { MemoryEnum } from './enums';

interface Memory {
  id: string;
  user_id: string;
  title: string | null;
  description: string | null;
  memory_date: string | null;
  type: MemoryEnum;
  file_name: string;
  storage_path: string;
  mime_type: string;
  file_size: number | null;
  created_at: string;
  updated_at: string;
}

type CreateMemoryInput = Omit<Memory, 'id' | 'user_id' | 'created_at' | 'updated_at'>;

type UpdateMemoryInput = Partial<Pick<Memory, 'title' | 'description' | 'memory_date'>>;

export type {
  Memory,
  CreateMemoryInput,
  UpdateMemoryInput,
}