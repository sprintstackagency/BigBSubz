
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  CreditCard, 
  History, 
  PhoneCall, 
  Database, 
  Zap, 
  Tv, 
  Users, 
  Activity,
  Settings,
  LogOut,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  closeSidebar?: () => void;
}

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAdmin = user?.role === "admin";

  const customerLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Wallet", href: "/dashboard/wallet", icon: CreditCard },
    { name: "Transactions", href: "/dashboard/transactions", icon: History },
    { name: "Buy Airtime", href: "/dashboard/airtime", icon: PhoneCall },
    { name: "Buy Data", href: "/dashboard/data", icon: Database },
    { name: "Pay Electricity", href: "/dashboard/electricity", icon: Zap },
    { name: "Cable Subscription", href: "/dashboard/cable", icon: Tv },
    { name: "Settings", href: "/dashboard/settings", icon: Settings }
  ];

  const adminLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Transactions", href: "/admin/transactions", icon: History },
    { name: "API Balance", href: "/admin/api-balance", icon: Database },
    { name: "Sales Report", href: "/admin/sales", icon: Activity },
    { name: "Settings", href: "/admin/settings", icon: Settings }
  ];

  const links = isAdmin ? adminLinks : customerLinks;

  const handleLogout = () => {
    logout();
    closeSidebar?.();
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Sidebar header */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-primary-purple to-secondary-purple bg-clip-text text-transparent">
            BigBSubz
          </span>
        </Link>
        {closeSidebar && (
          <Button variant="ghost" size="icon" onClick={closeSidebar}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation links */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link 
                key={link.name} 
                to={link.href}
                onClick={closeSidebar}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary-soft-purple text-primary-purple" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <link.icon className={cn("mr-3 h-5 w-5", isActive ? "text-primary-purple" : "text-gray-500")} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout button */}
      <div className="p-4 border-t">
        <button 
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-500" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
