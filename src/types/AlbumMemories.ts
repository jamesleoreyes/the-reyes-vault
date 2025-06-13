interface AlbumMemory {
  album_id: string;
  memory_id: string;
  added_at: string;
  order: number | null;
}

type CreateAlbumMemoryInput = Omit<AlbumMemory, 'added_at'>;

type UpdateAlbumMemoryInput = Partial<Pick<AlbumMemory, 'order'>>;

export type {
  AlbumMemory,
  CreateAlbumMemoryInput,
  UpdateAlbumMemoryInput,
}