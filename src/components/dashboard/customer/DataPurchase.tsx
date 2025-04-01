
import { useState, useEffect } from "react";
import { networkProviders, getDataPlansByProvider } from "@/services/mockData";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { DataPlan } from "@/types";

const DataPurchase = () => {
  const { user } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [dataPlans, setDataPlans] = useState<DataPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedProvider) {
      const plans = getDataPlansByProvider(selectedProvider);
      setDataPlans(plans);
      setSelectedPlanId("");
    }
  }, [selectedProvider]);

  const selectedPlan = dataPlans.find(plan => plan.id === selectedPlanId);

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

    if (!selectedPlan) {
      toast({
        title: "Error",
        description: "Please select a data plan",
        variant: "destructive",
      });
      return;
    }

    if (user && selectedPlan.amount > user.balance) {
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
        title: "Data Purchase Successful",
        description: `${selectedPlan.name} data bundle sent to ${phoneNumber}`,
      });
      setIsLoading(false);
      setPhoneNumber("");
      setSelectedPlanId("");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Buy Data</h1>
        <p className="text-gray-500">Purchase data bundles for any Nigerian network</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Data Purchase</CardTitle>
          <CardDescription>Select network, enter number and choose a data plan</CardDescription>
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

            {/* Data Plans */}
            {selectedProvider && (
              <div className="space-y-2">
                <Label htmlFor="dataPlan">Select Data Plan</Label>
                <Select value={selectedPlanId} onValueChange={setSelectedPlanId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a data plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {dataPlans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.name} - ₦{plan.amount.toLocaleString()} ({plan.validity})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Plan Details */}
            {selectedPlan && (
              <div className="bg-gray-50 p-4 rounded-md space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-semibold">{selectedPlan.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Validity:</span>
                  <span>{selectedPlan.validity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">₦{selectedPlan.amount.toLocaleString()}</span>
                </div>
              </div>
            )}

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
              disabled={isLoading || !selectedPlanId}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Buy Data"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataPurchase;
