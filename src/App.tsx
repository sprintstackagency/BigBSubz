
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PaystackProvider } from "@/context/PaystackContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboardPage from "./pages/CustomerDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AirtimePage from "./pages/AirtimePage";
import DataPage from "./pages/DataPage";
import WalletPage from "./pages/WalletPage";
import Unauthorized from "./pages/Unauthorized";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PaystackProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Customer Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<CustomerDashboardPage />} />
                  <Route path="/dashboard/airtime" element={<AirtimePage />} />
                  <Route path="/dashboard/data" element={<DataPage />} />
                  <Route path="/dashboard/wallet" element={<WalletPage />} />
                  {/* Add other customer routes here */}
                </Route>
              </Route>
              
              {/* Admin Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} redirectPath="/unauthorized" />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  {/* Add other admin routes here */}
                </Route>
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PaystackProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
