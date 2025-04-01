
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const CablePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  const [smartCardNumber, setSmartCardNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Fetch cable providers
  const { data: providers, isLoading: isLoadingProviders } = useQuery({
    queryKey: ['cableProviders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cable_providers')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch packages when provider is selected
  const { data: packages, isLoading: isLoadingPackages } = useQuery({
    queryKey: ['cablePackages', selectedProvider],
    queryFn: async () => {
      if (!selectedProvider) return [];
      
      const provider = providers?.find(p => p.code === selectedProvider);
      if (!provider) return [];
      
      const { data, error } = await supabase
        .from('cable_packages')
        .select('*')
        .eq('provider_id', provider.id)
        .order('amount');
      
      if (error) throw error;
      return data;
    },
    enabled: !!selectedProvider && !!providers
  });

  const selectedPackageDetails = packages?.find(pkg => pkg.id === selectedPackage);

  // Simulate smart card verification
  const verifySmartCard = () => {
    if (!smartCardNumber || !selectedProvider) {
      toast({
        title: "Error",
        description: "Please enter a smart card number and select a provider",
        variant: "destructive",
      });
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsVerifying(false);
      setCustomerName("John Viewer");
      toast({
        title: "Smart Card Verified",
        description: "Customer details retrieved successfully",
      });
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!smartCardNumber || !selectedProvider || !selectedPackage || !customerName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setProcessing(true);
    
    try {
      // Generate a unique reference
      const reference = `CB-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      
      // Call the cable subscription edge function
      const functionUrl = import.meta.env.VITE_SUPABASE_URL || 'https://iqcbotozmhvaspkqiaik.supabase.co';
      const response = await fetch(`${functionUrl}/functions/v1/pay-cable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionData.session.access_token}`,
        },
        body: JSON.stringify({
          packageId: selectedPackage,
          smartCardNumber,
          customerName,
          reference
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to process cable subscription");
      }
      
      toast({
        title: "Subscription Successful",
        description: `Your subscription to ${result.data.package} has been activated`,
      });
      
      // Reset form
      setSmartCardNumber("");
      setCustomerName("");
      setSelectedPackage("");
      
    } catch (error) {
      console.error("Cable subscription error:", error);
      toast({
        title: "Subscription Failed",
        description: error.message || "An error occurred while processing your subscription",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };
  
  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Cable TV Subscription</h1>
      
      <Card className="backdrop-blur-xl bg-white/20 border border-white/30">
        <CardHeader>
          <CardTitle>TV Subscription</CardTitle>
          <CardDescription>Renew your cable TV subscription quickly and securely</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Select Provider</Label>
              <Select
                value={selectedProvider}
                onValueChange={(value) => {
                  setSelectedProvider(value);
                  setSelectedPackage("");
                }}
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
              <Label htmlFor="smartcard">Smart Card Number</Label>
              <div className="flex gap-2">
                <Input
                  id="smartcard"
                  placeholder="Enter your smart card number"
                  value={smartCardNumber}
                  onChange={(e) => setSmartCardNumber(e.target.value)}
                  className="bg-white/50"
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={verifySmartCard}
                  disabled={isVerifying || !smartCardNumber || !selectedProvider}
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
              <Label htmlFor="package">Select Package</Label>
              <Select
                value={selectedPackage}
                onValueChange={setSelectedPackage}
                disabled={isLoadingPackages || !selectedProvider}
              >
                <SelectTrigger id="package">
                  <SelectValue placeholder="Select a package" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingPackages ? (
                    <SelectItem value="loading" disabled>Loading packages...</SelectItem>
                  ) : (
                    packages?.map(pkg => (
                      <SelectItem key={pkg.id} value={pkg.id}>
                        {pkg.name} - ₦{pkg.amount.toFixed(2)} ({pkg.duration})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            
            {selectedPackageDetails && (
              <div className="p-4 rounded-md bg-primary-purple/10">
                <h3 className="font-medium mb-2">Package Details:</h3>
                <p className="text-sm mb-1">Price: ₦{selectedPackageDetails.amount.toFixed(2)}</p>
                <p className="text-sm mb-1">Duration: {selectedPackageDetails.duration}</p>
                <p className="text-sm">{selectedPackageDetails.description}</p>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            onClick={handleSubmit}
            disabled={processing || !customerName || !selectedPackage || !smartCardNumber || !selectedProvider}
            className="w-full bg-primary-purple hover:bg-primary-purple/90"
          >
            {processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Subscribe Now"
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

export default CablePage;
