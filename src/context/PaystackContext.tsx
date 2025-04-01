
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface PaystackContextType {
  isInitializingPayment: boolean;
  initializePayment: (amount: number, callbackFn?: () => void) => void;
}

const PaystackContext = createContext<PaystackContextType | undefined>(undefined);

export const PaystackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitializingPayment, setIsInitializingPayment] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // This function would normally call the Paystack edge function
  const initializePayment = async (amount: number, callbackFn?: () => void) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to continue",
        variant: "destructive",
      });
      return;
    }

    setIsInitializingPayment(true);

    try {
      // Mock implementation - in real app, this would call a Supabase edge function
      // The edge function would initialize a Paystack transaction and return the authorization URL
      
      setTimeout(() => {
        toast({
          title: "Payment Successful",
          description: `Your wallet has been credited with ₦${amount.toLocaleString()}`,
        });
        
        // Call the callback function if provided
        if (callbackFn) callbackFn();
        
        setIsInitializingPayment(false);
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "Something went wrong with your payment",
        variant: "destructive",
      });
      setIsInitializingPayment(false);
    }
  };

  return (
    <PaystackContext.Provider
      value={{
        isInitializingPayment,
        initializePayment,
      }}
    >
      {children}
    </PaystackContext.Provider>
  );
};

export const usePaystack = () => {
  const context = useContext(PaystackContext);
  if (context === undefined) {
    throw new Error("usePaystack must be used within a PaystackProvider");
  }
  return context;
};
