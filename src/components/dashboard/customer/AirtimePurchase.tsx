
import { useState } from "react";
import { networkProviders } from "@/services/mockData";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const AirtimePurchase = () => {
  const { user } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProvider) {
      toast({
        title: "Error",
        description: "Please select a network provider",
        variant: "destructive",
      });
      return;
    }

    if (!phoneNumber || phoneNumber.length !== 11) {
      toast({
        title: "Error",
        description: "Please enter a valid 11-digit phone number",
        variant: "destructive",
      });
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue < 50) {
      toast({
        title: "Error",
        description: "Minimum amount is ₦50",
        variant: "destructive",
      });
      return;
    }

    if (user && amountValue > user.balance) {
      toast({
        title: "Insufficient Balance",
        description: "Please fund your wallet and try again",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // In a real application, this would call an edge function
    setTimeout(() => {
      toast({
        title: "Airtime Purchase Successful",
        description: `₦${amount} airtime sent to ${phoneNumber}`,
      });
      setIsLoading(false);
      setPhoneNumber("");
      setAmount("");
    }, 2000);
  };

  const quickAmounts = [100, 200, 500, 1000, 2000];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Buy Airtime</h1>
        <p className="text-gray-500">Purchase airtime for any Nigerian network</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Airtime Purchase</CardTitle>
          <CardDescription>Select network, enter number and amount</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Network Selection */}
            <div className="space-y-2">
              <Label>Select Network</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {networkProviders.map((provider) => (
                  <Button
                    key={provider.id}
                    type="button"
                    variant="outline"
                    className={`h-auto p-4 ${
                      selectedProvider === provider.code
                        ? "border-primary-purple bg-primary-soft-purple"
                        : ""
                    }`}
                    onClick={() => setSelectedProvider(provider.code)}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-8 w-8 flex items-center justify-center bg-white rounded-full">
                        {/* In a real app, this would display the provider logo */}
                        <span className="text-lg font-bold text-primary-purple">
                          {provider.name[0]}
                        </span>
                      </div>
                      <span>{provider.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                placeholder="08012345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 11))}
                maxLength={11}
              />
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                min={50}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* Quick Amounts */}
            <div className="space-y-2">
              <Label>Quick Select</Label>
              <div className="flex flex-wrap gap-2">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(quickAmount.toString())}
                    className={amount === quickAmount.toString() ? "border-primary-purple bg-primary-soft-purple" : ""}
                  >
                    ₦{quickAmount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Balance Info */}
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Wallet Balance:</span>
                <span className="font-semibold">₦{user?.balance.toLocaleString() || 0}</span>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-primary-purple hover:bg-primary-purple/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Buy Airtime"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AirtimePurchase;
