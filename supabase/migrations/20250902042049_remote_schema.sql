create type "public"."memory" as enum ('photo', 'video', 'vhs', 'audio', 'music', 'note');

create type "public"."user_family" as enum ('reyes', 'conklin', 'all', 'demo');

create type "public"."user_role" as enum ('admin', 'member', 'demo');


  create table "public"."album_memories" (
    "album_id" uuid not null,
    "memory_id" uuid not null,
    "added_at" timestamp with time zone not null default now(),
    "order" integer
      );


alter table "public"."album_memories" enable row level security;


  create table "public"."albums" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "name" text not null,
    "description" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."albums" enable row level security;


  create table "public"."memories" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null default auth.uid(),
    "title" text,
    "description" text,
    "memory_date" date,
    "type" memory not null,
    "file_name" text not null,
    "storage_path" text not null,
    "mime_type" text not null,
    "file_size" bigint,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."memories" enable row level security;


  create table "public"."memory_people" (
    "memory_id" uuid not null,
    "person_id" uuid not null,
    "assigned_at" timestamp with time zone not null default now(),
    "assigned_by" uuid not null
      );


alter table "public"."memory_people" enable row level security;


  create table "public"."memory_tags" (
    "memory_id" uuid not null,
    "tag_id" uuid not null,
    "assigned_at" timestamp with time zone not null default now(),
    "assigned_by" uuid not null
      );


alter table "public"."memory_tags" enable row level security;


  create table "public"."people" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_by" uuid default auth.uid(),
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."people" enable row level security;


  create table "public"."profiles" (
    "id" uuid not null default auth.uid(),
    "first_name" text not null default ''::text,
    "last_name" text not null default ''::text,
    "role" user_role not null,
    "family" user_family not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "avatar_url" text
      );


alter table "public"."profiles" enable row level security;


  create table "public"."tags" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_by" uuid default auth.uid(),
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."tags" enable row level security;

CREATE UNIQUE INDEX album_memories_pkey ON public.album_memories USING btree (album_id, memory_id);

CREATE UNIQUE INDEX albums_pkey ON public.albums USING btree (id);

CREATE UNIQUE INDEX memories_pkey ON public.memories USING btree (id);

CREATE UNIQUE INDEX memory_people_pkey ON public.memory_people USING btree (memory_id, person_id);

CREATE UNIQUE INDEX memory_tags_pkey ON public.memory_tags USING btree (memory_id, tag_id);

CREATE UNIQUE INDEX people_name_key ON public.people USING btree (name);

CREATE UNIQUE INDEX people_pkey ON public.people USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX tags_name_key ON public.tags USING btree (name);

CREATE UNIQUE INDEX tags_pkey ON public.tags USING btree (id);

alter table "public"."album_memories" add constraint "album_memories_pkey" PRIMARY KEY using index "album_memories_pkey";

alter table "public"."albums" add constraint "albums_pkey" PRIMARY KEY using index "albums_pkey";

alter table "public"."memories" add constraint "memories_pkey" PRIMARY KEY using index "memories_pkey";

alter table "public"."memory_people" add constraint "memory_people_pkey" PRIMARY KEY using index "memory_people_pkey";

alter table "public"."memory_tags" add constraint "memory_tags_pkey" PRIMARY KEY using index "memory_tags_pkey";

alter table "public"."people" add constraint "people_pkey" PRIMARY KEY using index "people_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."tags" add constraint "tags_pkey" PRIMARY KEY using index "tags_pkey";

alter table "public"."album_memories" add constraint "album_memories_album_id_fkey" FOREIGN KEY (album_id) REFERENCES albums(id) not valid;

alter table "public"."album_memories" validate constraint "album_memories_album_id_fkey";

alter table "public"."album_memories" add constraint "album_memories_memory_id_fkey" FOREIGN KEY (memory_id) REFERENCES memories(id) not valid;

alter table "public"."album_memories" validate constraint "album_memories_memory_id_fkey";

alter table "public"."albums" add constraint "albums_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."albums" validate constraint "albums_user_id_fkey";

alter table "public"."memories" add constraint "memories_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."memories" validate constraint "memories_user_id_fkey";

alter table "public"."memory_people" add constraint "memory_people_assigned_by_fkey" FOREIGN KEY (assigned_by) REFERENCES auth.users(id) not valid;

alter table "public"."memory_people" validate constraint "memory_people_assigned_by_fkey";

alter table "public"."memory_people" add constraint "memory_people_memory_id_fkey" FOREIGN KEY (memory_id) REFERENCES memories(id) not valid;

alter table "public"."memory_people" validate constraint "memory_people_memory_id_fkey";

alter table "public"."memory_people" add constraint "memory_people_person_id_fkey" FOREIGN KEY (person_id) REFERENCES people(id) not valid;

alter table "public"."memory_people" validate constraint "memory_people_person_id_fkey";

alter table "public"."memory_tags" add constraint "memory_tags_assigned_by_fkey" FOREIGN KEY (assigned_by) REFERENCES auth.users(id) not valid;

alter table "public"."memory_tags" validate constraint "memory_tags_assigned_by_fkey";

alter table "public"."memory_tags" add constraint "memory_tags_memory_id_fkey" FOREIGN KEY (memory_id) REFERENCES memories(id) not valid;

alter table "public"."memory_tags" validate constraint "memory_tags_memory_id_fkey";

alter table "public"."memory_tags" add constraint "memory_tags_tag_id_fkey" FOREIGN KEY (tag_id) REFERENCES tags(id) not valid;

alter table "public"."memory_tags" validate constraint "memory_tags_tag_id_fkey";

alter table "public"."people" add constraint "people_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."people" validate constraint "people_created_by_fkey";

alter table "public"."people" add constraint "people_name_key" UNIQUE using index "people_name_key";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."tags" add constraint "tags_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."tags" validate constraint "tags_created_by_fkey";

alter table "public"."tags" add constraint "tags_name_key" UNIQUE using index "tags_name_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  user_role text;
begin
  select role into user_role from profiles where id = user_id;
  return user_role;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  -- Insert a new profile record for the new user.
  -- It defaults 'role' to 'member' and 'family' to 'reyes'.
  -- You can change these defaults to whatever makes sense for your app.
  insert into public.profiles (id, role, family)
  values (new.id, 'member', 'reyes');
  return new;
end;
$function$
;


  create policy "admins can read all profiles"
  on "public"."profiles"
  as permissive
  for select
  to public
using ((( SELECT get_user_role(auth.uid()) AS get_user_role) = 'admin'::text));



  create policy "insert own profile"
  on "public"."profiles"
  as permissive
  for insert
  to public
with check ((auth.uid() = id));



  create policy "read own profile"
  on "public"."profiles"
  as permissive
  for select
  to public
using ((auth.uid() = id));



  create policy "update own profile"
  on "public"."profiles"
  as permissive
  for update
  to public
using ((auth.uid() = id))
with check ((auth.uid() = id));



