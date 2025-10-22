export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      creator_portfolios: {
        Row: {
          alias_name: string | null
          bio: string | null
          budget_max: number | null
          budget_min: number | null
          categories: string[] | null
          created_at: string | null
          experience_years: number | null
          first_name: string | null
          hourly_rate: number | null
          id: string
          is_published: boolean | null
          last_name: string | null
          location: string | null
          major_occupation: string | null
          minor_occupation: string | null
          portfolio_files: string[] | null
          skills: string[] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          alias_name?: string | null
          bio?: string | null
          budget_max?: number | null
          budget_min?: number | null
          categories?: string[] | null
          created_at?: string | null
          experience_years?: number | null
          first_name?: string | null
          hourly_rate?: number | null
          id?: string
          is_published?: boolean | null
          last_name?: string | null
          location?: string | null
          major_occupation?: string | null
          minor_occupation?: string | null
          portfolio_files?: string[] | null
          skills?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          alias_name?: string | null
          bio?: string | null
          budget_max?: number | null
          budget_min?: number | null
          categories?: string[] | null
          created_at?: string | null
          experience_years?: number | null
          first_name?: string | null
          hourly_rate?: number | null
          id?: string
          is_published?: boolean | null
          last_name?: string | null
          location?: string | null
          major_occupation?: string | null
          minor_occupation?: string | null
          portfolio_files?: string[] | null
          skills?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      creator_ratings: {
        Row: {
          client_id: string
          created_at: string | null
          creator_id: string
          id: string
          rating: number
          review_text: string | null
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          creator_id: string
          id?: string
          rating: number
          review_text?: string | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          creator_id?: string
          id?: string
          rating?: number
          review_text?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "creator_ratings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creator_ratings_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      project_claims: {
        Row: {
          claimed_at: string
          client_notes: string | null
          creator_id: string
          id: string
          project_id: string
          status: string
        }
        Insert: {
          claimed_at?: string
          client_notes?: string | null
          creator_id: string
          id?: string
          project_id: string
          status?: string
        }
        Update: {
          claimed_at?: string
          client_notes?: string | null
          creator_id?: string
          id?: string
          project_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_claims_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          budget: string
          company_name: string | null
          contact_email: string | null
          contact_instagram: string | null
          contact_linkedin: string | null
          created_at: string
          description: string
          freelancer_type: string[]
          id: string
          location: string
          location_type: Database["public"]["Enums"]["location_type"]
          project_name: string
          tags: string[] | null
          timeline: string
          updated_at: string
          user_id: string
        }
        Insert: {
          budget: string
          company_name?: string | null
          contact_email?: string | null
          contact_instagram?: string | null
          contact_linkedin?: string | null
          created_at?: string
          description: string
          freelancer_type?: string[]
          id?: string
          location: string
          location_type?: Database["public"]["Enums"]["location_type"]
          project_name: string
          tags?: string[] | null
          timeline: string
          updated_at?: string
          user_id: string
        }
        Update: {
          budget?: string
          company_name?: string | null
          contact_email?: string | null
          contact_instagram?: string | null
          contact_linkedin?: string | null
          created_at?: string
          description?: string
          freelancer_type?: string[]
          id?: string
          location?: string
          location_type?: Database["public"]["Enums"]["location_type"]
          project_name?: string
          tags?: string[] | null
          timeline?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "client" | "creator" | "admin"
      location_type: "onsite" | "remote"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["client", "creator", "admin"],
      location_type: ["onsite", "remote"],
    },
  },
} as const
