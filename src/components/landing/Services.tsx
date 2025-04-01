
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { networkProviders, discoProviders, cableProviders } from "@/services/mockData";

const Services = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of services designed to make your everyday payments simple and convenient
          </p>
        </div>

        {/* Airtime Recharge */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h3 className="text-2xl font-bold">Airtime Recharge</h3>
            <Link to="/services/airtime">
              <Button variant="link" className="text-primary-purple p-0 flex items-center">
                See All Options <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {networkProviders.map((provider) => (
              <div key={provider.id} className="glass-card p-6 text-center rounded-xl hover:shadow-md transition-all">
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  {/* In real app, this would show the actual logo */}
                  <span className="text-2xl font-bold text-primary-purple">
                    {provider.name[0]}
                  </span>
                </div>
                <h4 className="font-semibold mb-2">{provider.name}</h4>
                <p className="text-sm text-gray-500">Instant Recharge</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Bundles */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h3 className="text-2xl font-bold">Data Bundles</h3>
            <Link to="/services/data">
              <Button variant="link" className="text-primary-purple p-0 flex items-center">
                See All Options <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {networkProviders.map((provider) => (
              <div key={provider.id} className="glass-card p-6 text-center rounded-xl hover:shadow-md transition-all">
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-purple">
                    {provider.name[0]}
                  </span>
                </div>
                <h4 className="font-semibold mb-2">{provider.name} Data</h4>
                <p className="text-sm text-gray-500">All Data Plans</p>
              </div>
            ))}
          </div>
        </div>

        {/* Electricity Bills */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h3 className="text-2xl font-bold">Electricity Bills</h3>
            <Link to="/services/electricity">
              <Button variant="link" className="text-primary-purple p-0 flex items-center">
                See All Options <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discoProviders.map((provider) => (
              <div key={provider.id} className="glass-card p-6 text-center rounded-xl hover:shadow-md transition-all">
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-purple">
                    {provider.code.toUpperCase()}
                  </span>
                </div>
                <h4 className="font-semibold mb-2">{provider.code.toUpperCase()}</h4>
                <p className="text-sm text-gray-500">Pay Electricity Bills</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cable Subscriptions */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h3 className="text-2xl font-bold">Cable Subscriptions</h3>
            <Link to="/services/cable">
              <Button variant="link" className="text-primary-purple p-0 flex items-center">
                See All Options <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {cableProviders.map((provider) => (
              <div key={provider.id} className="glass-card p-6 text-center rounded-xl hover:shadow-md transition-all">
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-purple">
                    {provider.name.split(' ')[0]}
                  </span>
                </div>
                <h4 className="font-semibold mb-2">{provider.name}</h4>
                <p className="text-sm text-gray-500">Renew Subscription</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
