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
      hearings: {
        Row: {
          case_number: string
          client_email: string
          client_name: string
          court: string
          created_at: string
          date_time: string
          description: string
          id: string
          is_shared: boolean
          lawyer_id: string
          location: string
          notes: string | null
          share_token: string | null
          status: Database["public"]["Enums"]["hearing_status"]
          type: Database["public"]["Enums"]["hearing_type"]
          updated_at: string
        }
        Insert: {
          case_number: string
          client_email: string
          client_name: string
          court: string
          created_at?: string
          date_time: string
          description: string
          id?: string
          is_shared?: boolean
          lawyer_id: string
          location: string
          notes?: string | null
          share_token?: string | null
          status?: Database["public"]["Enums"]["hearing_status"]
          type: Database["public"]["Enums"]["hearing_type"]
          updated_at?: string
        }
        Update: {
          case_number?: string
          client_email?: string
          client_name?: string
          court?: string
          created_at?: string
          date_time?: string
          description?: string
          id?: string
          is_shared?: boolean
          lawyer_id?: string
          location?: string
          notes?: string | null
          share_token?: string | null
          status?: Database["public"]["Enums"]["hearing_status"]
          type?: Database["public"]["Enums"]["hearing_type"]
          updated_at?: string
        }
        Relationships: []
      }
      listings: {
        Row: {
          category: Database["public"]["Enums"]["listing_category"]
          created_at: string
          created_by: string
          description: string
          description_en: string | null
          id: string
          images: string[] | null
          price: number | null
          status: Database["public"]["Enums"]["listing_status"]
          title: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          category: Database["public"]["Enums"]["listing_category"]
          created_at?: string
          created_by: string
          description: string
          description_en?: string | null
          id?: string
          images?: string[] | null
          price?: number | null
          status?: Database["public"]["Enums"]["listing_status"]
          title: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["listing_category"]
          created_at?: string
          created_by?: string
          description?: string
          description_en?: string | null
          id?: string
          images?: string[] | null
          price?: number | null
          status?: Database["public"]["Enums"]["listing_status"]
          title?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      practice_areas: {
        Row: {
          created_at: string
          description: string
          description_en: string | null
          icon: string
          id: string
          keywords: string[] | null
          keywords_en: string[] | null
          long_description: string | null
          long_description_en: string | null
          order_index: number
          title: string
          title_en: string | null
        }
        Insert: {
          created_at?: string
          description: string
          description_en?: string | null
          icon: string
          id: string
          keywords?: string[] | null
          keywords_en?: string[] | null
          long_description?: string | null
          long_description_en?: string | null
          order_index?: number
          title: string
          title_en?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          description_en?: string | null
          icon?: string
          id?: string
          keywords?: string[] | null
          keywords_en?: string[] | null
          long_description?: string | null
          long_description_en?: string | null
          order_index?: number
          title?: string
          title_en?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          approved: boolean
          created_at: string
          email: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          approved?: boolean
          created_at?: string
          email: string
          id: string
          name: string
          updated_at?: string
        }
        Update: {
          approved?: boolean
          created_at?: string
          email?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          areas: string[] | null
          bio: string
          bio_en: string | null
          created_at: string
          education: string[] | null
          education_en: string[] | null
          email: string | null
          id: string
          main_area: string | null
          name: string
          order_index: number
          photo: string | null
          publications: string[] | null
          publications_en: string[] | null
          published: boolean
          role: string
          title: string
          title_en: string | null
          whatsapp: string | null
        }
        Insert: {
          areas?: string[] | null
          bio: string
          bio_en?: string | null
          created_at?: string
          education?: string[] | null
          education_en?: string[] | null
          email?: string | null
          id: string
          main_area?: string | null
          name: string
          order_index?: number
          photo?: string | null
          publications?: string[] | null
          publications_en?: string[] | null
          published?: boolean
          role: string
          title: string
          title_en?: string | null
          whatsapp?: string | null
        }
        Update: {
          areas?: string[] | null
          bio?: string
          bio_en?: string | null
          created_at?: string
          education?: string[] | null
          education_en?: string[] | null
          email?: string | null
          id?: string
          main_area?: string | null
          name?: string
          order_index?: number
          photo?: string | null
          publications?: string[] | null
          publications_en?: string[] | null
          published?: boolean
          role?: string
          title?: string
          title_en?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
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
      app_role: "admin" | "lawyer"
      hearing_status: "agendada" | "realizada" | "cancelada" | "adiada"
      hearing_type:
        | "Conciliação"
        | "Instrução"
        | "Julgamento"
        | "Inicial"
        | "Sentença"
        | "Outras"
      listing_category: "imoveis" | "precatorios" | "creditos" | "outros"
      listing_status: "available" | "pending" | "sold"
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
      app_role: ["admin", "lawyer"],
      hearing_status: ["agendada", "realizada", "cancelada", "adiada"],
      hearing_type: [
        "Conciliação",
        "Instrução",
        "Julgamento",
        "Inicial",
        "Sentença",
        "Outras",
      ],
      listing_category: ["imoveis", "precatorios", "creditos", "outros"],
      listing_status: ["available", "pending", "sold"],
    },
  },
} as const
