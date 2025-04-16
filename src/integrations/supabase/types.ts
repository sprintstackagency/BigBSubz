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
      cable_packages: {
        Row: {
          amount: number
          code: string
          created_at: string
          description: string | null
          duration: string
          id: string
          name: string
          provider_id: string
          status: boolean | null
        }
        Insert: {
          amount: number
          code: string
          created_at?: string
          description?: string | null
          duration: string
          id?: string
          name: string
          provider_id: string
          status?: boolean | null
        }
        Update: {
          amount?: number
          code?: string
          created_at?: string
          description?: string | null
          duration?: string
          id?: string
          name?: string
          provider_id?: string
          status?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "cable_packages_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "cable_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      cable_providers: {
        Row: {
          api_balance: number | null
          code: string
          created_at: string
          id: string
          logo_url: string | null
          name: string
          status: boolean | null
        }
        Insert: {
          api_balance?: number | null
          code: string
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          status?: boolean | null
        }
        Update: {
          api_balance?: number | null
          code?: string
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          status?: boolean | null
        }
        Relationships: []
      }
      data_plans: {
        Row: {
          amount: number
          code: string
          created_at: string
          description: string | null
          id: string
          name: string
          provider_id: string
          status: boolean | null
          validity: string
        }
        Insert: {
          amount: number
          code: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          provider_id: string
          status?: boolean | null
          validity: string
        }
        Update: {
          amount?: number
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          provider_id?: string
          status?: boolean | null
          validity?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_plans_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "network_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      electricity_providers: {
        Row: {
          api_balance: number | null
          code: string
          created_at: string
          id: string
          logo_url: string | null
          name: string
          status: boolean | null
        }
        Insert: {
          api_balance?: number | null
          code: string
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          status?: boolean | null
        }
        Update: {
          api_balance?: number | null
          code?: string
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          status?: boolean | null
        }
        Relationships: []
      }
      network_providers: {
        Row: {
          api_balance: number | null
          code: string
          created_at: string
          id: string
          logo_url: string | null
          name: string
          status: boolean | null
        }
        Insert: {
          api_balance?: number | null
          code: string
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          status?: boolean | null
        }
        Update: {
          api_balance?: number | null
          code?: string
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          status?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          balance: number
          created_at: string
          email: string
          id: string
          name: string | null
          role: string
          updated_at: string
        }
        Insert: {
          balance?: number
          created_at?: string
          email: string
          id: string
          name?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          balance?: number
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          details: Json | null
          id: string
          provider: string | null
          recipient: string | null
          reference: string
          status: string
          type: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          details?: Json | null
          id?: string
          provider?: string | null
          recipient?: string | null
          reference: string
          status?: string
          type: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          details?: Json | null
          id?: string
          provider?: string | null
          recipient?: string | null
          reference?: string
          status?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_profile_by_id: {
        Args: { user_id: string }
        Returns: {
          balance: number
          created_at: string
          email: string
          id: string
          name: string | null
          role: string
          updated_at: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
