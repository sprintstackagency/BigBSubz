
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X,
  User,
  LogOut,
  Home,
  PieChart,
  Phone,
  Tv,
  Zap,
  MessageSquare,
  HelpCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full py-4 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary-purple to-secondary-purple bg-clip-text text-transparent">
            BigBSubz
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-primary-purple">Home</Link>
          <Link to="/services" className="text-gray-700 hover:text-primary-purple">Services</Link>
          <Link to="/pricing" className="text-gray-700 hover:text-primary-purple">Pricing</Link>
          <Link to="/about" className="text-gray-700 hover:text-primary-purple">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-primary-purple">Contact</Link>
        </div>

        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-primary-purple text-primary-purple hover:bg-primary-purple/10">
                  <User className="mr-2 h-4 w-4" />
                  {user?.name || "My Account"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <p className="font-medium">{user?.name || "User"}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer w-full">
                    <PieChart className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer w-full">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="border-primary-purple text-primary-purple hover:bg-primary-purple/10">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-primary-purple hover:bg-primary-purple/90">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-md z-40 p-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center p-3 hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>
              <Home className="mr-3 h-5 w-5 text-primary-purple" />
              <span>Home</span>
            </Link>
            <Link to="/services" className="flex items-center p-3 hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>
              <Phone className="mr-3 h-5 w-5 text-primary-purple" />
              <span>Services</span>
            </Link>
            <Link to="/pricing" className="flex items-center p-3 hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>
              <Zap className="mr-3 h-5 w-5 text-primary-purple" />
              <span>Pricing</span>
            </Link>
            <Link to="/about" className="flex items-center p-3 hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>
              <HelpCircle className="mr-3 h-5 w-5 text-primary-purple" />
              <span>About</span>
            </Link>
            <Link to="/contact" className="flex items-center p-3 hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>
              <MessageSquare className="mr-3 h-5 w-5 text-primary-purple" />
              <span>Contact</span>
            </Link>
            
            <div className="border-t border-gray-200 my-2 pt-2">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="flex items-center p-3 hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>
                    <PieChart className="mr-3 h-5 w-5 text-primary-purple" />
                    <span>Dashboard</span>
                  </Link>
                  <Link to="/profile" className="flex items-center p-3 hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>
                    <User className="mr-3 h-5 w-5 text-primary-purple" />
                    <span>Profile</span>
                  </Link>
                  <button 
                    className="w-full flex items-center p-3 hover:bg-gray-100 rounded-md text-left"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-3 h-5 w-5 text-primary-purple" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 p-3">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-primary-purple text-primary-purple">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-primary-purple hover:bg-primary-purple/90">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
