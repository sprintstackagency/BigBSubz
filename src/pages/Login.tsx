
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const Login = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      console.log("Login page - User authenticated, redirecting to dashboard", user);
      const redirectPath = user.role === "admin" ? "/admin" : "/dashboard";
      console.log("Redirecting to:", redirectPath);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary-purple mb-4" />
            <p className="text-gray-600">Loading your account...</p>
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
