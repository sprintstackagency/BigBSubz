
import { useAuth } from "@/context/AuthContext";
import { getUserTransactions } from "@/services/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  TrendingUp, 
  PhoneCall, 
  Database, 
  Zap, 
  Tv,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  const { user } = useAuth();
  
  // Get recent transactions
  const transactions = user ? getUserTransactions(user.id).slice(0, 5) : [];

  const quickActions = [
    { name: "Buy Airtime", icon: PhoneCall, href: "/dashboard/airtime", color: "bg-blue-100 text-blue-500" },
    { name: "Buy Data", icon: Database, href: "/dashboard/data", color: "bg-green-100 text-green-500" },
    { name: "Pay Electricity", icon: Zap, href: "/dashboard/electricity", color: "bg-yellow-100 text-yellow-500" },
    { name: "Cable Subscription", icon: Tv, href: "/dashboard/cable", color: "bg-purple-100 text-purple-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div>
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-gray-500">Manage your services and transactions</p>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="glass-card card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-primary-purple" />
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₦{user?.balance.toLocaleString()}</p>
            <Link to="/dashboard/wallet" className="inline-flex items-center text-sm text-primary-purple mt-2 hover:underline">
              Fund Wallet <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="glass-card card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary-purple" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{transactions.length}</p>
            <Link to="/dashboard/transactions" className="inline-flex items-center text-sm text-primary-purple mt-2 hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.name} to={action.href}>
              <Card className="glass-card h-full card-hover">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className={`${action.color} p-3 rounded-full mb-3`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <p className="font-medium">{action.name}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <Link to="/dashboard/transactions">
            <Button variant="link" className="text-primary-purple p-0">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Card className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center">
                        <span className="capitalize">{tx.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">₦{tx.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        tx.status === 'success' ? 'bg-green-100 text-green-800' : 
                        tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                      No transactions yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;
