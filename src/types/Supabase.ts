export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      album_memories: {
        Row: {
          added_at: string
          album_id: string
          memory_id: string
          order: number | null
        }
        Insert: {
          added_at?: string
          album_id: string
          memory_id: string
          order?: number | null
        }
        Update: {
          added_at?: string
          album_id?: string
          memory_id?: string
          order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'album_memories_album_id_fkey'
            columns: ['album_id']
            isOneToOne: false
            referencedRelation: 'albums'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'album_memories_memory_id_fkey'
            columns: ['memory_id']
            isOneToOne: false
            referencedRelation: 'memories'
            referencedColumns: ['id']
          },
        ]
      }
      albums: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      memories: {
        Row: {
          created_at: string
          description: string | null
          file_name: string
          file_size: number | null
          id: string
          memory_date: string | null
          mime_type: string
          storage_path: string
          title: string | null
          type: Database['public']['Enums']['memory']
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_name: string
          file_size?: number | null
          id?: string
          memory_date?: string | null
          mime_type: string
          storage_path: string
          title?: string | null
          type: Database['public']['Enums']['memory']
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_name?: string
          file_size?: number | null
          id?: string
          memory_date?: string | null
          mime_type?: string
          storage_path?: string
          title?: string | null
          type?: Database['public']['Enums']['memory']
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      memory_people: {
        Row: {
          assigned_at: string
          assigned_by: string
          memory_id: string
          person_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by: string
          memory_id: string
          person_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string
          memory_id?: string
          person_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'memory_people_memory_id_fkey'
            columns: ['memory_id']
            isOneToOne: false
            referencedRelation: 'memories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'memory_people_person_id_fkey'
            columns: ['person_id']
            isOneToOne: false
            referencedRelation: 'people'
            referencedColumns: ['id']
          },
        ]
      }
      memory_tags: {
        Row: {
          assigned_at: string
          assigned_by: string
          memory_id: string
          tag_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by: string
          memory_id: string
          tag_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string
          memory_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'memory_tags_memory_id_fkey'
            columns: ['memory_id']
            isOneToOne: false
            referencedRelation: 'memories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'memory_tags_tag_id_fkey'
            columns: ['tag_id']
            isOneToOne: false
            referencedRelation: 'tags'
            referencedColumns: ['id']
          },
        ]
      }
      people: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          family: Database['public']['Enums']['family']
          first_name: string
          id: string
          last_name: string
          role: Database['public']['Enums']['roles']
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          family: Database['public']['Enums']['family']
          first_name?: string
          id?: string
          last_name?: string
          role: Database['public']['Enums']['roles']
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          family?: Database['public']['Enums']['family']
          first_name?: string
          id?: string
          last_name?: string
          role?: Database['public']['Enums']['roles']
          updated_at?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
    }
    Enums: {
      family: 'reyes' | 'conklin' | 'all' | 'demo'
      memory: 'photo' | 'video' | 'vhs' | 'audio' | 'music' | 'note'
      roles: 'admin' | 'member' | 'demo'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      family: ['reyes', 'conklin', 'all', 'demo'],
      memory: ['photo', 'video', 'vhs', 'audio', 'music', 'note'],
      roles: ['admin', 'member', 'demo'],
    },
  },
} as const
