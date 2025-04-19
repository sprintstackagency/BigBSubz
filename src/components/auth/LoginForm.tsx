
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, RefreshCw } from "lucide-react";
import { debugAuth, clearAuthState } from "@/integrations/supabase/client";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, isAuthenticated, user, isLoading, refreshSession } = useAuth();
  const navigate = useNavigate();
  const [refreshAttempted, setRefreshAttempted] = useState(false);

  // Debug auth state when component mounts and when auth state changes
  useEffect(() => {
    debugAuth();
    console.log("LoginForm - Auth state:", { isAuthenticated, isLoading, user });
    
    // Auto-attempt one refresh if session exists but not authenticated
    if (!isLoading && !isAuthenticated && !refreshAttempted) {
      console.log("Session exists but not authenticated, attempting auto-refresh");
      setRefreshAttempted(true);
      refreshSession().catch(err => {
        console.error("Auto-refresh failed:", err);
      });
    }
  }, [isAuthenticated, isLoading, user, refreshAttempted, refreshSession]);

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      console.log("LoginForm - User authenticated, redirecting to dashboard", user);
      const redirectPath = user.role === "admin" ? "/admin" : "/dashboard";
      console.log("Redirecting to:", redirectPath);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFormLoading(true);

    try {
      console.log("Submitting login form for:", email);
      await login(email, password);
      console.log("Login submitted successfully");
      // Debug auth state after login
      debugAuth();
      // Login success - the auth state change will trigger the useEffect for redirect
    } catch (error: any) {
      console.error("Login form error:", error.message);
      setError(error.message || "Failed to login. Please check your credentials.");
    } finally {
      setFormLoading(false);
    }
  };
  
  // Handle manual refresh
  const handleRefresh = async () => {
    setError("");
    try {
      await refreshSession();
    } catch (error: any) {
      console.error("Manual refresh failed:", error);
      setError("Refresh failed: " + (error.message || "Unknown error"));
    }
  };
  
  // Handle full page reload
  const handleFullReload = () => {
    clearAuthState();
    window.location.reload();
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Login to access your BigBSubz account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-sm text-primary-purple hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
              {error}
              <div className="mt-2 flex gap-2">
                <Button 
                  type="button"
                  onClick={handleRefresh} 
                  variant="outline"
                  size="sm"
                  className="flex items-center text-primary-purple border-primary-purple"
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  Refresh
                </Button>
                <Button 
                  type="button"
                  onClick={handleFullReload} 
                  variant="destructive"
                  size="sm"
                  className="flex items-center"
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  Reset
                </Button>
              </div>
            </div>
          )}
          <Button 
            type="submit" 
            className="w-full bg-primary-purple hover:bg-primary-purple/90"
            disabled={formLoading || isLoading}
          >
            {formLoading || isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {formLoading ? "Logging in..." : "Loading..."}
              </>
            ) : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary-purple hover:underline">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
