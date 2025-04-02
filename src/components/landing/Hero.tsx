
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Nigeria's Premier <span className="bg-gradient-to-r from-primary-purple to-secondary-purple bg-clip-text text-transparent">Virtual Top-up</span> Platform
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-lg">
                Recharge airtime, buy data, pay electricity bills, and subscribe to your favorite TV channels - all in one place.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-primary-purple hover:bg-primary-purple/90 text-white">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-primary-purple text-primary-purple hover:bg-primary-purple/10">
                  Explore Services
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-700">Fast & Secure</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-700">24/7 Support</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-700">Best Rates</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-xl">
            <div className="p-2 bg-white rounded-xl shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="People using mobile phones for payments"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
