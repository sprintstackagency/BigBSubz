
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "../types";
import { useToast } from "@/components/ui/use-toast";
import { supabase, debugAuth } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Helper function to fetch user profile
  const fetchUserProfile = async (userId: string): Promise<User | null> => {
    try {
      console.log("Fetching profile for user:", userId);
      
      // Use the security definer function to fetch profile
      const { data, error } = await supabase
        .rpc('get_profile_by_id', { user_id: userId });
        
      if (error) {
        console.error("Failed to fetch user profile:", error);
        return null;
      }
      
      if (data && data.length > 0) {
        const profileData = data[0];
        console.log("Profile data fetched successfully:", profileData);
        const userWithProfile: User = {
          id: userId,
          email: session?.user?.email || '',
          name: profileData.name || '',
          role: profileData.role as UserRole,
          balance: profileData.balance || 0,
          createdAt: profileData.created_at,
        };
        
        console.log("Constructed user object:", userWithProfile);
        return userWithProfile;
      }
      
      return null;
    } catch (err) {
      console.error("Error fetching profile:", err);
      return null;
    }
  };

  // Set up auth state listener
  useEffect(() => {
    console.log("Setting up auth state listener");
    let isMounted = true;
    setIsLoading(true);
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.id);
        
        if (!isMounted) return;
        
        // Update session state immediately
        setSession(currentSession);
        
        if (currentSession?.user) {
          try {
            // Fetch profile data for the authenticated user
            const profileData = await fetchUserProfile(currentSession.user.id);
            if (isMounted) {
              if (profileData) {
                setUser(profileData);
              } else {
                console.error("Could not fetch user profile after auth change");
                setUser(null);
              }
            }
          } catch (error) {
            console.error("Error handling auth change:", error);
            if (isMounted) setUser(null);
          } finally {
            if (isMounted) setIsLoading(false);
          }
        } else {
          if (isMounted) {
            setUser(null);
            setIsLoading(false);
          }
        }
      }
    );

    // Initial session check
    const checkSession = async () => {
      try {
        console.log("Checking for existing session");
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        console.log("Initial session check:", currentSession?.user?.id);
        
        if (error) {
          console.error("Session check error:", error);
          setIsLoading(false);
          return;
        }
        
        if (!isMounted) return;
        
        // Update session state
        setSession(currentSession);
        
        if (currentSession?.user) {
          try {
            // Fetch profile for the current session user
            const profileData = await fetchUserProfile(currentSession.user.id);
            if (isMounted) {
              if (profileData) {
                setUser(profileData);
              } else {
                console.error("Could not fetch user profile on initial check");
                setUser(null);
              }
            }
          } catch (error) {
            console.error("Error during initial profile fetch:", error);
            if (isMounted) setUser(null);
          }
        } else {
          if (isMounted) setUser(null);
        }
      } catch (err) {
        console.error("Session check error:", err);
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
      
      // Log auth state for debugging
      debugAuth();
    };
    
    // Run the initial session check
    checkSession();

    // Clean up
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("Attempting login for:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        throw error;
      }
      
      console.log("Login successful, session:", data.session);
      
      // Set session immediately
      setSession(data.session);
      
      // Fetch profile data after successful login
      if (data.session?.user) {
        const profileData = await fetchUserProfile(data.session.user.id);
        if (!profileData) {
          throw new Error("Could not retrieve user profile after login");
        }
        
        // Update user state with profile data
        setUser(profileData);
      }
      
      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });
      
      // Debug auth state
      debugAuth();
    } catch (error: any) {
      console.error("Login failed:", error.message);
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;
      
      toast({
        title: "Registration successful",
        description: `Welcome to BigBSubz!`,
      });
    } catch (error: any) {
      console.error("Registration error in context:", error);
      toast({
        title: "Registration failed",
        description: error.message || "Please try again with a different email",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const updateUserProfile = async (userData: Partial<User>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: userData.name,
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setUser(prev => prev ? { ...prev, ...userData } : null);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  console.log("Auth context state:", { 
    isAuthenticated: !!user && !!session, 
    isLoading, 
    user,
    sessionExists: !!session
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user && !!session,
        login,
        register,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
