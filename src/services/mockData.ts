
import { 
  DataPlan, 
  Transaction, 
  CablePackage, 
  DiscoProvider, 
  NetworkProvider,
  CableProvider,
  User,
  AdminStats
} from "../types";

export const networkProviders: NetworkProvider[] = [
  {
    id: "1",
    name: "MTN",
    code: "mtn",
    logo: "/mtn-logo.png"
  },
  {
    id: "2",
    name: "Airtel",
    code: "airtel",
    logo: "/airtel-logo.png"
  },
  {
    id: "3",
    name: "Glo",
    code: "glo",
    logo: "/glo-logo.png"
  },
  {
    id: "4",
    name: "9mobile",
    code: "9mobile",
    logo: "/9mobile-logo.png"
  }
];

export const dataPlans: DataPlan[] = [
  {
    id: "1",
    provider: "mtn",
    name: "1GB (24 Hours)",
    amount: 300,
    validity: "1 day",
    description: "MTN 1GB Daily Plan"
  },
  {
    id: "2",
    provider: "mtn",
    name: "1.5GB (30 Days)",
    amount: 1000,
    validity: "30 days",
    description: "MTN 1.5GB Monthly Plan"
  },
  {
    id: "3",
    provider: "mtn",
    name: "3GB (30 Days)",
    amount: 1500,
    validity: "30 days",
    description: "MTN 3GB Monthly Plan"
  },
  {
    id: "4",
    provider: "mtn",
    name: "10GB (30 Days)",
    amount: 3000,
    validity: "30 days",
    description: "MTN 10GB Monthly Plan"
  },
  {
    id: "5",
    provider: "airtel",
    name: "1.5GB (30 Days)",
    amount: 1000,
    validity: "30 days",
    description: "Airtel 1.5GB Monthly Plan"
  },
  {
    id: "6",
    provider: "airtel",
    name: "3GB (30 Days)",
    amount: 1500,
    validity: "30 days",
    description: "Airtel 3GB Monthly Plan"
  },
  {
    id: "7",
    provider: "glo",
    name: "2GB (30 Days)",
    amount: 1000,
    validity: "30 days",
    description: "Glo 2GB Monthly Plan"
  },
  {
    id: "8",
    provider: "glo",
    name: "5GB (30 Days)",
    amount: 2000,
    validity: "30 days",
    description: "Glo 5GB Monthly Plan"
  },
  {
    id: "9",
    provider: "9mobile",
    name: "1GB (30 Days)",
    amount: 1000,
    validity: "30 days",
    description: "9mobile 1GB Monthly Plan"
  },
  {
    id: "10",
    provider: "9mobile",
    name: "3GB (30 Days)",
    amount: 2000,
    validity: "30 days",
    description: "9mobile 3GB Monthly Plan"
  }
];

export const discoProviders: DiscoProvider[] = [
  {
    id: "1",
    name: "Benin Electricity Distribution Company",
    code: "bedc",
    logo: "/bedc-logo.png"
  },
  {
    id: "2",
    name: "Eko Electricity Distribution Company",
    code: "ekdc",
    logo: "/ekdc-logo.png"
  },
  {
    id: "3",
    name: "Ikeja Electricity Distribution Company",
    code: "ikedc",
    logo: "/ikedc-logo.png"
  },
  {
    id: "4",
    name: "Ibadan Electricity Distribution Company",
    code: "ibedc",
    logo: "/ibedc-logo.png"
  }
];

export const cableProviders: CableProvider[] = [
  {
    id: "1",
    name: "DSTV",
    code: "dstv",
    logo: "/dstv-logo.png"
  },
  {
    id: "2",
    name: "GOtv",
    code: "gotv",
    logo: "/gotv-logo.png"
  },
  {
    id: "3",
    name: "StarTimes",
    code: "startimes",
    logo: "/startimes-logo.png"
  }
];

export const cablePackages: CablePackage[] = [
  {
    id: "1",
    provider: "dstv",
    name: "DStv Access",
    amount: 2000,
    duration: "1 month",
    description: "DStv Access Package"
  },
  {
    id: "2",
    provider: "dstv",
    name: "DStv Family",
    amount: 4000,
    duration: "1 month",
    description: "DStv Family Package"
  },
  {
    id: "3",
    provider: "dstv",
    name: "DStv Compact",
    amount: 7900,
    duration: "1 month",
    description: "DStv Compact Package"
  },
  {
    id: "4",
    provider: "dstv",
    name: "DStv Premium",
    amount: 18900,
    duration: "1 month",
    description: "DStv Premium Package"
  },
  {
    id: "5",
    provider: "gotv",
    name: "GOtv Lite",
    amount: 900,
    duration: "1 month",
    description: "GOtv Lite Package"
  },
  {
    id: "6",
    provider: "gotv",
    name: "GOtv Value",
    amount: 1900,
    duration: "1 month",
    description: "GOtv Value Package"
  },
  {
    id: "7",
    provider: "gotv",
    name: "GOtv Plus",
    amount: 3100,
    duration: "1 month",
    description: "GOtv Plus Package"
  },
  {
    id: "8",
    provider: "startimes",
    name: "StarTimes Basic",
    amount: 1700,
    duration: "1 month",
    description: "StarTimes Basic Package"
  },
  {
    id: "9",
    provider: "startimes",
    name: "StarTimes Classic",
    amount: 2500,
    duration: "1 month",
    description: "StarTimes Classic Package"
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: "tx1",
    userId: "user-123",
    type: "airtime",
    amount: 1000,
    reference: "AIR123456",
    status: "success",
    details: {
      provider: "mtn",
      phoneNumber: "08012345678"
    },
    createdAt: "2023-06-01T10:30:00Z"
  },
  {
    id: "tx2",
    userId: "user-123",
    type: "data",
    amount: 2000,
    reference: "DAT234567",
    status: "success",
    details: {
      provider: "airtel",
      phoneNumber: "09087654321",
      dataPlan: "3GB (30 Days)"
    },
    createdAt: "2023-06-02T14:20:00Z"
  },
  {
    id: "tx3",
    userId: "user-123",
    type: "electricity",
    amount: 5000,
    reference: "ELE345678",
    status: "success",
    details: {
      provider: "ikedc",
      meterNumber: "12345678901"
    },
    createdAt: "2023-06-03T09:15:00Z"
  },
  {
    id: "tx4",
    userId: "user-123",
    type: "cable",
    amount: 7900,
    reference: "CAB456789",
    status: "success",
    details: {
      provider: "dstv",
      decoderNumber: "7023456789",
      package: "DStv Compact"
    },
    createdAt: "2023-06-04T16:45:00Z"
  },
  {
    id: "tx5",
    userId: "user-123",
    type: "wallet",
    amount: 20000,
    reference: "WAL567890",
    status: "success",
    details: {
      description: "Wallet Funding"
    },
    createdAt: "2023-06-05T11:30:00Z"
  }
];

export const mockUsers: User[] = [
  {
    id: "user-123",
    email: "user@example.com",
    name: "John Doe",
    role: "customer",
    balance: 15000,
    createdAt: "2023-05-01T09:00:00Z"
  },
  {
    id: "admin-456",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    balance: 50000,
    createdAt: "2023-04-15T10:00:00Z"
  },
  {
    id: "user-789",
    email: "jane@example.com",
    name: "Jane Smith",
    role: "customer",
    balance: 7500,
    createdAt: "2023-05-10T14:30:00Z"
  }
];

export const adminStats: AdminStats = {
  totalUsers: 245,
  totalTransactions: 1289,
  totalSales: 4578900,
  providerBalances: {
    mtn: 250000,
    airtel: 180000,
    glo: 120000,
    "9mobile": 80000
  }
};

// Service functions

export function getDataPlansByProvider(providerCode: string): DataPlan[] {
  return dataPlans.filter(plan => plan.provider === providerCode);
}

export function getCablePackagesByProvider(providerCode: string): CablePackage[] {
  return cablePackages.filter(pkg => pkg.provider === providerCode);
}

export function getUserTransactions(userId: string): Transaction[] {
  return mockTransactions.filter(tx => tx.userId === userId);
}

export function getAdminDashboardStats(): AdminStats {
  return adminStats;
}

export function getAllUsers(): User[] {
  return mockUsers;
}
