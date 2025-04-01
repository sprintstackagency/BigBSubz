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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
