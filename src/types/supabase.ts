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
      definitions: {
        Row: {
          author_id: string | null
          created_at: string
          downvotes_count: number
          id: string
          text: string | null
          upvotes_count: number
          word_id: string
        }
        Insert: {
          author_id?: string | null
          created_at?: string
          downvotes_count?: number
          id?: string
          text?: string | null
          upvotes_count?: number
          word_id: string
        }
        Update: {
          author_id?: string | null
          created_at?: string
          downvotes_count?: number
          id?: string
          text?: string | null
          upvotes_count?: number
          word_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "definitions_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "definitions_word_id_fkey"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "words"
            referencedColumns: ["id"]
          },
        ]
      }
      votes: {
        Row: {
          created_at: string
          definition_id: string
          id: string
          user_id: string
          vote: Database["public"]["Enums"]["voteInt"]
        }
        Insert: {
          created_at?: string
          definition_id?: string
          id?: string
          user_id?: string
          vote: Database["public"]["Enums"]["voteInt"]
        }
        Update: {
          created_at?: string
          definition_id?: string
          id?: string
          user_id?: string
          vote?: Database["public"]["Enums"]["voteInt"]
        }
        Relationships: [
          {
            foreignKeyName: "votes_definition_id_fkey"
            columns: ["definition_id"]
            isOneToOne: false
            referencedRelation: "definitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      words: {
        Row: {
          author_id: string | null
          created_at: string
          id: string
          word: string
        }
        Insert: {
          author_id?: string | null
          created_at?: string
          id?: string
          word?: string
        }
        Update: {
          author_id?: string | null
          created_at?: string
          id?: string
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "words_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_downvote: {
        Args: {
          insert_definition_id: string
        }
        Returns: number
      }
      add_upvote: {
        Args: {
          insert_definition_id: string
        }
        Returns: number
      }
      remove_downvote: {
        Args: {
          insert_definition_id: string
        }
        Returns: number
      }
      remove_upvote: {
        Args: {
          insert_definition_id: string
        }
        Returns: number
      }
      replace_down_with_up: {
        Args: {
          insert_definition_id: string
        }
        Returns: undefined
      }
      replace_up_with_down: {
        Args: {
          insert_definition_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      voteInt: "up" | "down"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
