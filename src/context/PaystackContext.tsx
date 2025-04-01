
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Configure Paystack public key
const PAYSTACK_PUBLIC_KEY = "pk_test_your_paystack_public_key";

interface PaystackContextType {
  isInitializingPayment: boolean;
  initializePayment: (amount: number, callbackFn?: () => void) => Promise<void>;
  verifyPayment: (reference: string) => Promise<void>;
}

const PaystackContext = createContext<PaystackContextType | undefined>(undefined);

export const PaystackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitializingPayment, setIsInitializingPayment] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

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
      // Generate a reference
      const reference = `bigbsubz-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
      
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Error",
          description: "Your session has expired. Please log in again.",
          variant: "destructive",
        });
        setIsInitializingPayment(false);
        return;
      }
      
      // Call the Paystack edge function
      const { data, error } = await supabase.functions.invoke("paystack", {
        body: { 
          amount, 
          email: user.email, 
          reference,
          callbackUrl: window.location.origin + "/dashboard/wallet?reference=" + reference
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.status) {
        throw new Error(data.message || "Payment initialization failed");
      }

      // Open Paystack checkout
      // @ts-ignore - Paystack types are not available
      window.open(data.data.authorization_url, "_blank");
      
      // Call the callback function if provided
      if (callbackFn) callbackFn();
      
      toast({
        title: "Payment Initialized",
        description: "Please complete your payment in the new window",
      });
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "Something went wrong with your payment",
        variant: "destructive",
      });
    } finally {
      setIsInitializingPayment(false);
    }
  };

  const verifyPayment = async (reference: string) => {
    try {
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Error",
          description: "Your session has expired. Please log in again.",
          variant: "destructive",
        });
        return;
      }
      
      // Call the verify payment edge function
      const { data, error } = await supabase.functions.invoke("verify-payment", {
        body: { reference },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.status) {
        throw new Error(data.message || "Payment verification failed");
      }

      toast({
        title: "Payment Successful",
        description: `Your wallet has been credited with ₦${data.data.amount.toLocaleString()}`,
      });
      
      // Reload user data to reflect new balance
      await supabase.auth.refreshSession();
      
      return data;
    } catch (error: any) {
      toast({
        title: "Verification Error",
        description: error.message || "Failed to verify your payment",
        variant: "destructive",
      });
    }
  };

  return (
    <PaystackContext.Provider
      value={{
        isInitializingPayment,
        initializePayment,
        verifyPayment,
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
