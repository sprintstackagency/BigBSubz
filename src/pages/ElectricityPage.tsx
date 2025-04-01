
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const ElectricityPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  const [meterNumber, setMeterNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Fetch electricity providers
  const { data: providers, isLoading: isLoadingProviders } = useQuery({
    queryKey: ['electricityProviders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('electricity_providers')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  // Simulate meter number verification
  const verifyMeterNumber = () => {
    if (!meterNumber || !selectedProvider) {
      toast({
        title: "Error",
        description: "Please enter a meter number and select a provider",
        variant: "destructive",
      });
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsVerifying(false);
      setCustomerName("John Customer");
      toast({
        title: "Meter Verified",
        description: "Customer details retrieved successfully",
      });
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!meterNumber || !selectedProvider || !amount || !customerName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }
    
    const parsedAmount = parseFloat(amount);
    setProcessing(true);
    
    try {
      // Generate a unique reference
      const reference = `EL-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      
      // Call the electricity payment edge function
      const functionUrl = import.meta.env.VITE_SUPABASE_URL || 'https://iqcbotozmhvaspkqiaik.supabase.co';
      const response = await fetch(`${functionUrl}/functions/v1/pay-electricity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionData.session.access_token}`,
        },
        body: JSON.stringify({
          provider: selectedProvider,
          meterNumber,
          amount: parsedAmount,
          customerName,
          reference
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to process electricity payment");
      }
      
      toast({
        title: "Payment Successful",
        description: `Your electricity token is: ${result.data.token}`,
      });
      
      // Reset form
      setMeterNumber("");
      setCustomerName("");
      setAmount("");
      setSelectedProvider("");
      
    } catch (error) {
      console.error("Electricity payment error:", error);
      toast({
        title: "Payment Failed",
        description: error.message || "An error occurred while processing your payment",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };
  
  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Pay Electricity Bill</h1>
      
      <Card className="backdrop-blur-xl bg-white/20 border border-white/30">
        <CardHeader>
          <CardTitle>Electricity Bill Payment</CardTitle>
          <CardDescription>Pay your electricity bill quickly and securely</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Select Provider</Label>
              <Select
                value={selectedProvider}
                onValueChange={setSelectedProvider}
                disabled={isLoadingProviders}
              >
                <SelectTrigger id="provider">
                  <SelectValue placeholder="Select a provider" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingProviders ? (
                    <SelectItem value="loading" disabled>Loading providers...</SelectItem>
                  ) : (
                    providers?.map(provider => (
                      <SelectItem key={provider.id} value={provider.code}>
                        {provider.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="meter-number">Meter Number</Label>
              <div className="flex gap-2">
                <Input
                  id="meter-number"
                  placeholder="Enter your meter number"
                  value={meterNumber}
                  onChange={(e) => setMeterNumber(e.target.value)}
                  className="bg-white/50"
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={verifyMeterNumber}
                  disabled={isVerifying || !meterNumber || !selectedProvider}
                  className="flex-shrink-0"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying
                    </>
                  ) : (
                    "Verify"
                  )}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customer-name">Customer Name</Label>
              <Input
                id="customer-name"
                placeholder="Customer name will appear here after verification"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                readOnly={true}
                className="bg-white/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                type="number"
                min="100"
                step="100"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white/50"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            onClick={handleSubmit}
            disabled={processing || !customerName || !amount || !meterNumber || !selectedProvider}
            className="w-full bg-primary-purple hover:bg-primary-purple/90"
          >
            {processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Pay Now"
            )}
          </Button>
          <p className="text-xs text-gray-500 text-center">
            Your payment will be deducted from your wallet balance. Ensure you have sufficient funds.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ElectricityPage;
