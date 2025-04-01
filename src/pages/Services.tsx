
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneCall, Globe, Zap, Tv, CreditCard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ServiceCard = ({ icon: Icon, title, description, linkText, linkTo, className = "" }) => {
  return (
    <Card className={`glass-card card-hover ${className} backdrop-blur-xl bg-white/20 border border-white/30`}>
      <CardHeader>
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 rounded-full bg-primary-purple/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary-purple" />
          </div>
        </div>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link to={linkTo}>
          <Button variant="outline" className="border-primary-purple text-primary-purple hover:bg-primary-purple/10">
            {linkText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const Services = () => {
  const [networkProviders, setNetworkProviders] = useState([]);
  const [dataPlans, setDataPlans] = useState([]);
  const [electricityProviders, setElectricityProviders] = useState([]);
  const [cableProviders, setCableProviders] = useState([]);
  
  const { data: providersData } = useQuery({
    queryKey: ['networkProviders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('network_providers')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });
  
  const { data: dataPlansData } = useQuery({
    queryKey: ['dataPlans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('data_plans')
        .select('*, network_providers(*)')
        .order('amount');
      
      if (error) throw error;
      return data;
    }
  });
  
  const { data: electricityData } = useQuery({
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
  
  const { data: cableData } = useQuery({
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
  
  useEffect(() => {
    if (providersData) setNetworkProviders(providersData);
    if (dataPlansData) setDataPlans(dataPlansData);
    if (electricityData) setElectricityProviders(electricityData);
    if (cableData) setCableProviders(cableData);
  }, [providersData, dataPlansData, electricityData, cableData]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Purple gradient backdrop */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-soft-purple to-transparent pointer-events-none" />
        
        {/* Glass circles for background effect */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-light-purple/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-purple/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-primary-purple to-secondary-purple bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-gray-600">
              We provide a comprehensive range of digital services to meet all your needs in one convenient platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={PhoneCall}
              title="Airtime Recharge"
              description="Purchase airtime for all major networks including MTN, Airtel, Glo, and 9Mobile."
              linkText="Buy Airtime"
              linkTo="/dashboard/airtime"
            />
            <ServiceCard 
              icon={Globe}
              title="Data Bundles"
              description="Get internet data bundles for browsing, streaming, and downloads at the best prices."
              linkText="Buy Data"
              linkTo="/dashboard/data"
            />
            <ServiceCard 
              icon={Zap}
              title="Electricity Bills"
              description="Pay your electricity bills easily for all distribution companies across Nigeria."
              linkText="Pay Bills"
              linkTo="/dashboard/electricity"
            />
            <ServiceCard 
              icon={Tv}
              title="Cable TV Subscriptions"
              description="Renew your DSTV, GOTV, and StarTimes subscriptions seamlessly."
              linkText="Subscribe"
              linkTo="/dashboard/cable"
            />
            <ServiceCard 
              icon={CreditCard}
              title="Wallet Funding"
              description="Fund your wallet for quick and easy transactions on our platform."
              linkText="Fund Wallet"
              linkTo="/dashboard/wallet"
            />
            <ServiceCard 
              icon={Shield}
              title="Secure Payments"
              description="All transactions are secured with industry-standard encryption and security."
              linkText="Learn More"
              linkTo="/about"
            />
          </div>
        </div>
      </section>
      
      {/* Network Providers Section */}
      <section className="py-16 bg-primary-purple/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Supported Networks</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We support all major telecommunications networks in Nigeria.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {networkProviders.map((provider) => (
              <Card key={provider.id} className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4">
                    <img 
                      src={provider.logo_url} 
                      alt={`${provider.name} Logo`}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{provider.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Data Plans Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Data Plans</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our range of affordable data plans for all networks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataPlans.slice(0, 6).map((plan) => (
              <Card key={plan.id} className="backdrop-blur-xl bg-white/20 border border-white/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <img 
                        src={plan.network_providers?.logo_url} 
                        alt={`${plan.network_providers?.name} Logo`}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold">₦{plan.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Validity:</span>
                    <span>{plan.validity}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link to="/dashboard/data">
                    <Button size="sm" className="bg-primary-purple hover:bg-primary-purple/90">
                      Buy Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/dashboard/data">
              <Button variant="outline" className="border-primary-purple text-primary-purple hover:bg-primary-purple/10">
                View All Data Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
