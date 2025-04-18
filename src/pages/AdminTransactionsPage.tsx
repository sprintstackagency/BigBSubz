
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Loader2, Search, FileDown, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Transaction = {
  id: string;
  type: string;
  amount: number;
  status: string;
  reference: string;
  recipient: string;
  provider: string;
  created_at: string;
  details: any;
  user_id: string;
};

type UserProfile = {
  id: string;
  email: string;
  name: string;
};

const ITEMS_PER_PAGE = 10;

const AdminTransactionsPage = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [userProfiles, setUserProfiles] = useState<Record<string, UserProfile>>({});

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["admin-transactions"],
    queryFn: async () => {
      // Get all transactions as admin
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching transactions:", error);
        throw new Error("Failed to fetch transactions");
      }

      // Get unique user IDs from transactions
      const userIds = [...new Set(data.map(tx => tx.user_id).filter(Boolean))];
      
      if (userIds.length) {
        // Fetch user profiles
        const { data: profiles, error: profileError } = await supabase
          .from("profiles")
          .select("id, email, name")
          .in("id", userIds);
        
        if (profiles) {
          const profileMap: Record<string, UserProfile> = {};
          profiles.forEach(profile => {
            profileMap[profile.id] = profile;
          });
          setUserProfiles(profileMap);
        }
      }
      
      return data as Transaction[];
    },
  });

  const filteredTransactions = transactions?.filter((tx) => {
    const matchesSearch =
      search === "" ||
      tx.reference.toLowerCase().includes(search.toLowerCase()) ||
      tx.recipient?.toLowerCase().includes(search.toLowerCase()) ||
      tx.provider?.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === "" || tx.type === typeFilter;
    const matchesStatus = statusFilter === "" || tx.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination logic
  const totalPages = filteredTransactions
    ? Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE)
    : 0;
  
  const paginatedTransactions = filteredTransactions?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "success":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const exportToCsv = () => {
    if (!filteredTransactions?.length) return;
    
    const headers = ["Date", "User", "Email", "Type", "Amount", "Status", "Reference", "Recipient", "Provider"];
    const rows = filteredTransactions.map((tx) => {
      const user = userProfiles[tx.user_id];
      return [
        formatDate(tx.created_at),
        user?.name || "Unknown",
        user?.email || "Unknown",
        tx.type,
        tx.amount,
        tx.status,
        tx.reference,
        tx.recipient || "",
        tx.provider || "",
      ];
    });
    
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `admin-transactions-${new Date().toISOString().split("T")[0]}.csv`);
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">All Transactions</h1>
        <Button
          onClick={exportToCsv}
          disabled={!filteredTransactions?.length}
          className="flex items-center gap-2 bg-primary-purple hover:bg-primary-purple/90"
        >
          <FileDown className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Transaction Management</CardTitle>
          <CardDescription>
            View and manage all user transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search by reference, recipient, or provider..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All types</SelectItem>
                  <SelectItem value="airtime">Airtime</SelectItem>
                  <SelectItem value="data">Data</SelectItem>
                  <SelectItem value="electricity">Electricity</SelectItem>
                  <SelectItem value="cable">Cable TV</SelectItem>
                  <SelectItem value="funding">Wallet Funding</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary-purple" />
            </div>
          ) : !paginatedTransactions?.length ? (
            <div className="py-8 text-center">
              <p className="text-gray-500">No transactions found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Reference</TableHead>
                      <TableHead className="hidden lg:table-cell">Recipient</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedTransactions.map((tx) => {
                      const user = userProfiles[tx.user_id];
                      return (
                        <TableRow key={tx.id}>
                          <TableCell>{formatDate(tx.created_at)}</TableCell>
                          <TableCell>{user?.name || "Unknown"}</TableCell>
                          <TableCell className="capitalize">{tx.type}</TableCell>
                          <TableCell>{formatAmount(tx.amount)}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                tx.status
                              )}`}
                            >
                              {tx.status}
                            </span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell font-mono text-xs">
                            {tx.reference.substring(0, 8)}...
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {tx.recipient || "-"}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedTx(tx)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <div className="mt-4 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            onClick={() => setCurrentPage(i + 1)}
                            isActive={currentPage === i + 1}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedTx} onOpenChange={(open) => !open && setSelectedTx(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Complete information about this transaction
            </DialogDescription>
          </DialogHeader>
          {selectedTx && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p>{formatDate(selectedTx.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Amount</p>
                  <p>{formatAmount(selectedTx.amount)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Type</p>
                  <p className="capitalize">{selectedTx.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedTx.status
                    )}`}
                  >
                    {selectedTx.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">User</p>
                  <p>{userProfiles[selectedTx.user_id]?.name || "Unknown"}</p>
                  <p className="text-xs text-gray-500">
                    {userProfiles[selectedTx.user_id]?.email || "Unknown"}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">Reference</p>
                  <p className="font-mono text-xs break-all">{selectedTx.reference}</p>
                </div>
                {selectedTx.recipient && (
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500">Recipient</p>
                    <p>{selectedTx.recipient}</p>
                  </div>
                )}
                {selectedTx.provider && (
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500">Provider</p>
                    <p>{selectedTx.provider}</p>
                  </div>
                )}
                {selectedTx.details && Object.keys(selectedTx.details).length > 0 && (
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500">Additional Details</p>
                    <pre className="mt-1 whitespace-pre-wrap rounded bg-gray-50 p-2 text-xs">
                      {JSON.stringify(selectedTx.details, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTransactionsPage;
