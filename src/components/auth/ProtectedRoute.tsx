
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { debugAuth } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface ProtectedRouteProps {
  allowedRoles?: Array<"customer" | "admin">;
  redirectPath?: string;
}

const ProtectedRoute = ({
  allowedRoles = ["customer", "admin"],
  redirectPath = "/login",
}: ProtectedRouteProps) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [loadingTimeExceeded, setLoadingTimeExceeded] = useState(false);
  
  // Debug auth state on mount and when auth state changes
  useEffect(() => {
    debugAuth();
    console.log("ProtectedRoute - Auth State:", { isAuthenticated, isLoading, user, allowedRoles });
  }, [isAuthenticated, isLoading, user, allowedRoles]);
  
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
  
  // Handle manual refresh
  const handleRefresh = () => {
    window.location.reload();
  };
  
  // Show loading state while auth is being checked
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-purple mb-4" />
          <p className="text-gray-600">Authenticating...</p>
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
      </div>
    );
  }
  
  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    console.log("User not authenticated. Redirecting to:", redirectPath);
    return <Navigate to={redirectPath} replace />;
  }
  
  // Check if user has required role
  if (!allowedRoles.includes(user.role)) {
    console.log("User doesn't have required role. Redirecting to unauthorized.");
    return <Navigate to="/unauthorized" replace />;
  }
  
  // User is authenticated and has allowed role, render the child routes
  console.log("User authenticated and authorized, rendering protected content");
  return <Outlet />;
};

export default ProtectedRoute;
