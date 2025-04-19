
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { Loader2, RefreshCw } from "lucide-react";
import { debugAuth } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const Login = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [loadingTimeExceeded, setLoadingTimeExceeded] = useState(false);
  
  // Debug auth on mount
  useEffect(() => {
    debugAuth();
    console.log("Login page - Auth state:", { isAuthenticated, isLoading, user });
  }, [isAuthenticated, isLoading, user]);
  
  // Set a timeout to detect long loading times
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isLoading) {
      timeoutId = setTimeout(() => {
        setLoadingTimeExceeded(true);
      }, 3000); // 3 seconds
    } else {
      setLoadingTimeExceeded(false);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoading]);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      console.log("Login page - User authenticated, redirecting to dashboard", user);
      const redirectPath = user.role === "admin" ? "/admin" : "/dashboard";
      console.log("Redirecting to:", redirectPath);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate, isLoading]);

  // Handle manual refresh
  const handleRefresh = () => {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary-purple mb-4" />
            <p className="text-gray-600">Loading your account...</p>
            {loadingTimeExceeded && (
              <div className="mt-4 flex flex-col items-center">
                <p className="text-amber-600 text-sm mb-2">
                  Taking longer than expected. Try refreshing.
                </p>
                <Button 
                  onClick={handleRefresh} 
                  variant="outline"
                  className="flex items-center text-primary-purple border-primary-purple"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh page
                </Button>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-primary-soft-purple/20 to-transparent">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
};

export default Login;
