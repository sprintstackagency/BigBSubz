
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iqcbotozmhvaspkqiaik.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxY2JvdG96bWh2YXNwa3FpYWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDc1NzYsImV4cCI6MjA1OTA4MzU3Nn0.DJcKhlXxjiBh_jeIk_esxkdj1QRv_iRF0AXQ5Sra8sQ";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage,
    flowType: 'pkce',
  }
});
