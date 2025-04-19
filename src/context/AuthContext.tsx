
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "../types";
import { useToast } from "@/components/ui/use-toast";
import { supabase, debugAuth, clearAuthState } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);
  const { toast } = useToast();

  // Helper function to fetch user profile with error handling and timeouts
  const fetchUserProfile = async (userId: string, sessionToken?: string): Promise<User | null> => {
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
        
        // Create and return the user object with profile data
        return {
          id: userId,
          email: session?.user?.email || '',
          name: profileData.name || '',
          role: profileData.role as UserRole,
          balance: profileData.balance || 0,
          createdAt: profileData.created_at,
        };
      }
      
      // If no profile data found but session exists, create basic user
      if (session?.user) {
        console.log("No profile found, creating basic user from session");
        return {
          id: userId,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || '',
          role: 'customer' as UserRole,
          balance: 0,
          createdAt: new Date().toISOString(),
        };
      }
      
      console.log("No valid profile or session data found");
      return null;
    } catch (err) {
      console.error("Error fetching profile:", err);
      return null;
    }
  };

  // Function to refresh the session and user data
  const refreshSession = async () => {
    try {
      setIsLoading(true);
      
      // First clear any potentially corrupted state
      setUser(null);
      
      // Get the current session
      const { data: { session: currentSession }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Session refresh error:", error);
        throw error;
      }
      
      if (!currentSession) {
        console.log("No active session found during refresh");
        setSession(null);
        setUser(null);
        setIsLoading(false);
        return;
      }
      
      console.log("Session refreshed:", currentSession.user.id);
      setSession(currentSession);
      
      // Fetch the user profile with the refreshed session
      if (currentSession.user) {
        const profileData = await fetchUserProfile(currentSession.user.id);
        if (profileData) {
          setUser(profileData);
        } else {
          console.warn("Could not fetch profile during refresh");
          setUser(null);
        }
      }
    } catch (error) {
      console.error("Session refresh failed:", error);
      // If refresh fails, clear auth state to prevent being stuck
      clearAuthState();
    } finally {
      setIsLoading(false);
    }
  };

  // Set up auth state listener
  useEffect(() => {
    console.log("Setting up auth state listener");
    let isMounted = true;
    let authTimeout: NodeJS.Timeout | null = null;
    let profileFetchTimeout: NodeJS.Timeout | null = null;
    setIsLoading(true);
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.id);
        
        if (!isMounted) return;
        
        // Update session state immediately
        setSession(currentSession);
        
        // Cancel any existing profile fetch timeouts
        if (profileFetchTimeout) {
          clearTimeout(profileFetchTimeout);
        }
        
        if (currentSession?.user) {
          try {
            // Fetch profile data for the authenticated user
            // We use setTimeout to avoid deadlock with onAuthStateChange
            profileFetchTimeout = setTimeout(async () => {
              if (!isMounted) return;
              
              const profileData = await fetchUserProfile(currentSession.user.id);
              if (isMounted) {
                if (profileData) {
                  setUser(profileData);
                  setIsLoading(false);
                } else {
                  console.error("Could not fetch user profile after auth change");
                  setUser(null);
                  setIsLoading(false);
                }
              }
            }, 0);
          } catch (error) {
            console.error("Error handling auth change:", error);
            if (isMounted) {
              setUser(null);
              setIsLoading(false);
            }
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
          if (isMounted) {
            setIsLoading(false);
            setAuthInitialized(true);
          }
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
          } finally {
            if (isMounted) {
              setIsLoading(false);
              setAuthInitialized(true);
            }
          }
        } else {
          if (isMounted) {
            setUser(null);
            setIsLoading(false);
            setAuthInitialized(true);
          }
        }
      } catch (err) {
        console.error("Session check error:", err);
        if (isMounted) {
          setUser(null);
          setIsLoading(false);
          setAuthInitialized(true);
        }
      }
      
      // Log auth state for debugging
      debugAuth();
    };
    
    // Run the initial session check
    checkSession();
    
    // Add a timeout to prevent infinite loading
    authTimeout = setTimeout(() => {
      if (isMounted && isLoading) {
        console.log("Auth timeout reached, forcing load completion");
        setIsLoading(false);
        setAuthInitialized(true);
        
        // If we timed out and have a session but no user, try one more refresh
        if (session && !user) {
          refreshSession().catch(err => console.error("Final refresh attempt failed:", err));
        }
      }
    }, 5000); // 5 second timeout

    // Clean up
    return () => {
      isMounted = false;
      if (authTimeout) clearTimeout(authTimeout);
      if (profileFetchTimeout) clearTimeout(profileFetchTimeout);
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
      
      // Clear any stored auth state to ensure a clean logout
      clearAuthState();
      
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
    sessionExists: !!session,
    authInitialized
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
        refreshSession
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
