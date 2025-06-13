interface Album {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

type CreateAlbumInput = Omit<Album, 'id' | 'user_id' | 'created_at' | 'updated_at'>;

type UpdateAlbumInput = Partial<Pick<Album, 'name' | 'description'>>;

export type {
  Album,
  CreateAlbumInput,
  UpdateAlbumInput,
}