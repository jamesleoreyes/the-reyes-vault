import { Enums, Tables } from './Supabase';

export type AlbumMemory = Tables<"album_memories">
export type Album = Tables<"albums">
export type Memory = Tables<"memories">
export type MemoryPerson = Tables<"memory_people">
export type MemoryTag = Tables<"memory_tags">
export type Person = Tables<"people">
export type Profile = Tables<"profiles">
export type Tag = Tables<"tags">

export type RoleEnum = Enums<"roles">
export type FamilyEnum = Enums<"family">
export type MemoryEnum = Enums<"memory">

export * from './Supabase';