
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
import ElectricityPage from "./pages/ElectricityPage";
import CablePage from "./pages/CablePage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminTransactionsPage from "./pages/AdminTransactionsPage";
import AdminAPIBalancePage from "./pages/AdminAPIBalancePage";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
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
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Customer Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<CustomerDashboardPage />} />
                  <Route path="/dashboard/airtime" element={<AirtimePage />} />
                  <Route path="/dashboard/data" element={<DataPage />} />
                  <Route path="/dashboard/wallet" element={<WalletPage />} />
                  <Route path="/dashboard/electricity" element={<ElectricityPage />} />
                  <Route path="/dashboard/cable" element={<CablePage />} />
                  {/* Add other customer routes here */}
                </Route>
              </Route>
              
              {/* Admin Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} redirectPath="/unauthorized" />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  <Route path="/admin/users" element={<AdminUsersPage />} />
                  <Route path="/admin/transactions" element={<AdminTransactionsPage />} />
                  <Route path="/admin/api-balance" element={<AdminAPIBalancePage />} />
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
