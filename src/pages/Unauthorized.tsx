
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Unauthorized = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md glass-card">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        <div className="space-y-4">
          <Button asChild className="bg-primary-purple hover:bg-primary-purple/90">
            <Link to={user?.role === "admin" ? "/admin" : "/dashboard"}>
              Return to Dashboard
            </Link>
          </Button>
          <div>
            <Link to="/" className="text-primary-purple hover:underline">
              Go to Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
