import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          user_id: string | null;
          full_name: string;
          email: string;
          phone: string;
          address: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['customers']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['customers']['Insert']>;
      };
      couriers: {
        Row: {
          id: string;
          user_id: string | null;
          full_name: string;
          email: string;
          phone: string;
          vehicle_type: string;
          license_number: string;
          status: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['couriers']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['couriers']['Insert']>;
      };
      shipments: {
        Row: {
          id: string;
          tracking_number: string;
          customer_id: string;
          courier_id: string | null;
          sender_name: string;
          sender_phone: string;
          sender_address: string;
          recipient_name: string;
          recipient_phone: string;
          recipient_address: string;
          package_weight: number;
          package_dimensions: string;
          service_type: string;
          status: string;
          estimated_delivery: string | null;
          actual_delivery: string | null;
          price: number;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['shipments']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['shipments']['Insert']>;
      };
      tracking_events: {
        Row: {
          id: string;
          shipment_id: string;
          status: string;
          location: string;
          description: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['tracking_events']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['tracking_events']['Insert']>;
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          status: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['contact_messages']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['contact_messages']['Insert']>;
      };
    };
  };
};
