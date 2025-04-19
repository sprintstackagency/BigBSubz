
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

// Add a debug helper to log auth state
export const debugAuth = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    console.log("Current session:", data.session);
    console.log("Session error:", error);

    if (data.session?.user) {
      console.log("User ID:", data.session.user.id);
      
      // Use our security definer function to fetch profile
      const { data: profileData, error: profileError } = await supabase
        .rpc('get_profile_by_id', { user_id: data.session.user.id });
        
      console.log("Profile data:", profileData);
      console.log("Profile error:", profileError);
    }

    const { data: userData } = await supabase.auth.getUser();
    console.log("Current user:", userData.user);
  } catch (err) {
    console.error("Debug auth error:", err);
  }
};
