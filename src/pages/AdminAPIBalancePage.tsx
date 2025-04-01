
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, RefreshCcw } from "lucide-react";
import { useState } from 'react';

const AdminAPIBalancePage = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [topupAmount, setTopupAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { data: networkProviders, isLoading: isLoadingNetworks, refetch: refetchNetworks } = useQuery({
    queryKey: ['network-providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('network_providers')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });
  
  const { data: electricityProviders, isLoading: isLoadingElectricity, refetch: refetchElectricity } = useQuery({
    queryKey: ['electricity-providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('electricity_providers')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });
  
  const { data: cableProviders, isLoading: isLoadingCable, refetch: refetchCable } = useQuery({
    queryKey: ['cable-providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cable_providers')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });
  
  const isLoading = isLoadingNetworks || isLoadingElectricity || isLoadingCable;
  
  const handleRefresh = () => {
    refetchNetworks();
    refetchElectricity();
    refetchCable();
    
    toast({
      title: "Refreshed",
      description: "API balances have been refreshed",
    });
  };
  
  const handleOpenTopupDialog = (provider, type) => {
    setSelectedProvider({...provider, type});
    setDialogOpen(true);
  };
  
  const handleTopup = async () => {
    if (!selectedProvider || !topupAmount || isNaN(Number(topupAmount)) || Number(topupAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const amount = parseFloat(topupAmount);
      let table;
      
      switch (selectedProvider.type) {
        case 'network':
          table = 'network_providers';
          break;
        case 'electricity':
          table = 'electricity_providers';
          break;
        case 'cable':
          table = 'cable_providers';
          break;
        default:
          throw new Error("Invalid provider type");
      }
      
      const { data, error } = await supabase
        .from(table)
        .update({ 
          api_balance: selectedProvider.api_balance + amount 
        })
        .eq('id', selectedProvider.id)
        .select();
        
      if (error) throw error;
      
      toast({
        title: "Top-up Successful",
        description: `Successfully added ₦${amount.toFixed(2)} to ${selectedProvider.name}'s API balance`,
      });
      
      // Refetch all providers
      refetchNetworks();
      refetchElectricity();
      refetchCable();
      
    } catch (error) {
      console.error("Error topping up:", error);
      toast({
        title: "Top-up Failed",
        description: error.message || "An error occurred during top-up",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setDialogOpen(false);
      setTopupAmount("");
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">API Balance Management</h1>
        <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          Refresh Balances
        </Button>
      </div>
      
      {isLoading ? (
        <div className="py-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-purple" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {/* Network Providers */}
          <Card className="backdrop-blur-xl bg-white/20 border border-white/30">
            <CardHeader>
              <CardTitle>Network Providers</CardTitle>
              <CardDescription>API balance for mobile network service providers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>API Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {networkProviders?.map(provider => (
                    <TableRow key={provider.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {provider.logo_url && (
                            <img
                              src={provider.logo_url}
                              alt={provider.name}
                              className="w-6 h-6 object-contain"
                            />
                          )}
                          {provider.name}
                        </div>
                      </TableCell>
                      <TableCell>{provider.code}</TableCell>
                      <TableCell>₦{provider.api_balance.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className={`w-2 h-2 rounded-full ${provider.status ? 'bg-green-500' : 'bg-red-500'} inline-block mr-2`}></div>
                        {provider.status ? 'Active' : 'Inactive'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenTopupDialog(provider, 'network')}
                        >
                          Top-up
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Electricity Providers */}
          <Card className="backdrop-blur-xl bg-white/20 border border-white/30">
            <CardHeader>
              <CardTitle>Electricity Providers</CardTitle>
              <CardDescription>API balance for electricity service providers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>API Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {electricityProviders?.map(provider => (
                    <TableRow key={provider.id}>
                      <TableCell>{provider.name}</TableCell>
                      <TableCell>{provider.code}</TableCell>
                      <TableCell>₦{provider.api_balance.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className={`w-2 h-2 rounded-full ${provider.status ? 'bg-green-500' : 'bg-red-500'} inline-block mr-2`}></div>
                        {provider.status ? 'Active' : 'Inactive'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenTopupDialog(provider, 'electricity')}
                        >
                          Top-up
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Cable Providers */}
          <Card className="backdrop-blur-xl bg-white/20 border border-white/30">
            <CardHeader>
              <CardTitle>Cable Providers</CardTitle>
              <CardDescription>API balance for cable TV service providers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>API Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cableProviders?.map(provider => (
                    <TableRow key={provider.id}>
                      <TableCell>{provider.name}</TableCell>
                      <TableCell>{provider.code}</TableCell>
                      <TableCell>₦{provider.api_balance.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className={`w-2 h-2 rounded-full ${provider.status ? 'bg-green-500' : 'bg-red-500'} inline-block mr-2`}></div>
                        {provider.status ? 'Active' : 'Inactive'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenTopupDialog(provider, 'cable')}
                        >
                          Top-up
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Top-up Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Top-up API Balance</DialogTitle>
            <DialogDescription>
              {selectedProvider && `Add funds to ${selectedProvider.name}'s API balance`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="current-balance" className="text-sm font-medium">Current Balance</label>
              <Input 
                id="current-balance"
                value={selectedProvider ? `₦${selectedProvider.api_balance.toFixed(2)}` : ''}
                disabled
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="topup-amount" className="text-sm font-medium">Top-up Amount (₦)</label>
              <Input 
                id="topup-amount"
                type="number"
                placeholder="Enter amount"
                value={topupAmount}
                onChange={(e) => setTopupAmount(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button onClick={handleTopup} disabled={isProcessing} className="bg-primary-purple hover:bg-primary-purple/90">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Top-up Balance"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAPIBalancePage;
