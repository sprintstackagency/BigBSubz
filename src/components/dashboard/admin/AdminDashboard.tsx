
import { AdminStats } from "@/types";
import { getAdminDashboardStats } from "@/services/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  Activity,
  BarChart3,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const AdminDashboard = () => {
  const stats: AdminStats = getAdminDashboardStats();

  // Mock chart data
  const salesData = [
    { name: "Jan", amount: 1234000 },
    { name: "Feb", amount: 2345000 },
    { name: "Mar", amount: 1876000 },
    { name: "Apr", amount: 2567000 },
    { name: "May", amount: 3456000 },
    { name: "Jun", amount: 3789000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Manage users and monitor sales</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary-purple" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
            <Link to="/admin/users" className="inline-flex items-center text-sm text-primary-purple mt-2 hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="glass-card card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary-purple" />
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalTransactions.toLocaleString()}</p>
            <Link to="/admin/transactions" className="inline-flex items-center text-sm text-primary-purple mt-2 hover:underline">
              View Details <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="glass-card card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-primary-purple" />
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₦{(stats.totalSales / 1000000).toFixed(2)}M</p>
            <Link to="/admin/sales" className="inline-flex items-center text-sm text-primary-purple mt-2 hover:underline">
              View Report <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="glass-card card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary-purple" />
              API Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₦{(Object.values(stats.providerBalances).reduce((a, b) => a + b, 0) / 1000).toFixed(1)}K</p>
            <Link to="/admin/api-balance" className="inline-flex items-center text-sm text-primary-purple mt-2 hover:underline">
              Check Details <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-primary-purple" />
              Monthly Sales
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  formatter={(value: number) => [`₦${value.toLocaleString()}`, "Amount"]}
                />
                <Bar dataKey="amount" fill="#9b87f5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>API Balance by Provider</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={Object.entries(stats.providerBalances).map(([provider, balance]) => ({
                  provider: provider.toUpperCase(),
                  balance,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="provider" />
                <YAxis 
                  tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  formatter={(value: number) => [`₦${value.toLocaleString()}`, "Balance"]}
                />
                <Bar dataKey="balance" fill="#7E69AB" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent activities */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Activities</span>
            <Button variant="link" className="text-primary-purple p-0">
              <Link to="/admin/transactions">View All</Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">User Registration</p>
                <p className="text-sm text-gray-500">New user registered: john@example.com</p>
              </div>
              <p className="text-sm text-gray-500">5 mins ago</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">Data Transaction</p>
                <p className="text-sm text-gray-500">User purchased MTN 10GB data: ₦3,000</p>
              </div>
              <p className="text-sm text-gray-500">15 mins ago</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">Wallet Funding</p>
                <p className="text-sm text-gray-500">User funded wallet with ₦10,000</p>
              </div>
              <p className="text-sm text-gray-500">38 mins ago</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">Electricity Payment</p>
                <p className="text-sm text-gray-500">User paid IKEDC bill: ₦5,000</p>
              </div>
              <p className="text-sm text-gray-500">1 hour ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
