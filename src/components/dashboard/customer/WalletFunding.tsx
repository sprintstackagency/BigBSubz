
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const WalletFunding = () => {
  const { user, updateUserProfile } = useAuth();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isLoading, setIsLoading] = useState(false);

  const quickAmounts = [1000, 2000, 5000, 10000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue < 100) {
      toast({
        title: "Error",
        description: "Minimum amount is ₦100",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real application, this would call the Paystack edge function
      // For now, we'll simulate a successful payment
      
      setTimeout(() => {
        // Update the user's balance
        if (user) {
          updateUserProfile({
            ...user,
            balance: user.balance + amountValue
          });
        }
        
        toast({
          title: "Wallet Funded Successfully",
          description: `Your wallet has been credited with ₦${amountValue.toLocaleString()}`,
        });
        
        setIsLoading(false);
        setAmount("");
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Fund Your Wallet</h1>
        <p className="text-gray-500">Add money to your wallet to make quick purchases</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Wallet Funding</CardTitle>
          <CardDescription>Choose an amount and payment method</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Balance Info */}
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current Balance:</span>
                <span className="font-semibold">₦{user?.balance.toLocaleString() || 0}</span>
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                min={100}
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
                    ₦{quickAmount.toLocaleString()}
                  </Button>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <RadioGroupItem value="card" id="card" className="peer sr-only" />
                  <Label
                    htmlFor="card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary-purple [&:has([data-state=checked])]:border-primary-purple"
                  >
                    <CreditCard className="h-5 w-5 mb-2" />
                    <span className="font-medium">Card Payment</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
                  <Label
                    htmlFor="bank"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary-purple [&:has([data-state=checked])]:border-primary-purple"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                      <path d="M3 21.25h18v1.5H3v-1.5zm18-12H3v7.5h18v-7.5zm-18-1.5h18V5c0-.8-.7-1.5-1.5-1.5H4.5C3.7 3.5 3 4.2 3 5v2.75zM4.5 2h15C20.4 2 22 3.6 22 5v16.75H2V5c0-1.4 1.6-3 2.5-3z" fill="currentColor" />
                    </svg>
                    <span className="font-medium">Bank Transfer</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Info Alert */}
            <div className="flex items-start gap-2 rounded-md bg-blue-50 p-3 text-blue-700">
              <AlertCircle className="h-5 w-5 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Payment Information</p>
                <p className="text-xs">
                  Your wallet will be credited instantly after payment is confirmed. All transactions are secure and encrypted.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-primary-purple hover:bg-primary-purple/90"
              disabled={isLoading || !amount}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Fund Wallet"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletFunding;
