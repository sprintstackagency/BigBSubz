
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
    <nav className="w-full py-4 bg-white/10 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-white/20">
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
              <DropdownMenuContent align="end" className="w-56 backdrop-blur-xl bg-white/90 border border-white/30">
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
                {user?.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="cursor-pointer w-full">
                      <User className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
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
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="backdrop-blur-xl bg-white/80 border-white/30 w-64">
              <SheetHeader className="mb-4">
                <SheetTitle>
                  <Link to="/" className="flex items-center">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary-purple to-secondary-purple bg-clip-text text-transparent">
                      BigBSubz
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-3 mt-4">
                <Link to="/" className="flex items-center p-3 hover:bg-gray-100 rounded-md">
                  <Home className="mr-3 h-5 w-5 text-primary-purple" />
                  <span>Home</span>
                </Link>
                <Link to="/services" className="flex items-center p-3 hover:bg-gray-100 rounded-md">
                  <Phone className="mr-3 h-5 w-5 text-primary-purple" />
                  <span>Services</span>
                </Link>
                <Link to="/pricing" className="flex items-center p-3 hover:bg-gray-100 rounded-md">
                  <Zap className="mr-3 h-5 w-5 text-primary-purple" />
                  <span>Pricing</span>
                </Link>
                <Link to="/about" className="flex items-center p-3 hover:bg-gray-100 rounded-md">
                  <HelpCircle className="mr-3 h-5 w-5 text-primary-purple" />
                  <span>About</span>
                </Link>
                <Link to="/contact" className="flex items-center p-3 hover:bg-gray-100 rounded-md">
                  <MessageSquare className="mr-3 h-5 w-5 text-primary-purple" />
                  <span>Contact</span>
                </Link>
                
                <div className="border-t border-gray-200 my-2 pt-2">
                  {isAuthenticated ? (
                    <>
                      <Link to="/dashboard" className="flex items-center p-3 hover:bg-gray-100 rounded-md">
                        <PieChart className="mr-3 h-5 w-5 text-primary-purple" />
                        <span>Dashboard</span>
                      </Link>
                      {user?.role === 'admin' && (
                        <Link to="/admin" className="flex items-center p-3 hover:bg-gray-100 rounded-md">
                          <User className="mr-3 h-5 w-5 text-primary-purple" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      <button 
                        className="w-full flex items-center p-3 hover:bg-gray-100 rounded-md text-left"
                        onClick={() => logout()}
                      >
                        <LogOut className="mr-3 h-5 w-5 text-primary-purple" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col space-y-2 p-3">
                      <Link to="/login">
                        <Button variant="outline" className="w-full border-primary-purple text-primary-purple">
                          Login
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button className="w-full bg-primary-purple hover:bg-primary-purple/90">
                          Register
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
