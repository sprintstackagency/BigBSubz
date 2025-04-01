
export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  balance: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'airtime' | 'data' | 'electricity' | 'cable' | 'wallet';
  amount: number;
  reference: string;
  status: 'pending' | 'success' | 'failed';
  details: {
    provider?: string;
    phoneNumber?: string;
    meterNumber?: string;
    decoderNumber?: string;
    dataPlan?: string;
    [key: string]: any;
  };
  createdAt: string;
}

export interface DataPlan {
  id: string;
  provider: string;
  name: string;
  amount: number;
  validity: string;
  description: string;
}

export interface CablePackage {
  id: string;
  provider: string;
  name: string;
  amount: number;
  duration: string;
  description: string;
}

export interface DiscoProvider {
  id: string;
  name: string;
  code: string;
  logo: string;
}

export interface NetworkProvider {
  id: string;
  name: string;
  code: string;
  logo: string;
}

export interface CableProvider {
  id: string;
  name: string;
  code: string;
  logo: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'bank' | 'ussd' | 'transfer';
  logo: string;
}

export interface AdminStats {
  totalUsers: number;
  totalTransactions: number;
  totalSales: number;
  providerBalances: {
    [provider: string]: number;
  }
}
