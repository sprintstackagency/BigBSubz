
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  allowedRoles?: Array<"customer" | "admin">;
  redirectPath?: string;
}

const ProtectedRoute = ({
  allowedRoles = ["customer", "admin"],
  redirectPath = "/login",
}: ProtectedRouteProps) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  
  console.log("ProtectedRoute - Auth State:", { isAuthenticated, isLoading, user });
  
  // Show loading state while auth is being checked
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary-purple" />
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
