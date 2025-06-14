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

export type { Memory }