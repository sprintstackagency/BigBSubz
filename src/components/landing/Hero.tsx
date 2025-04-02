
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 overflow-hidden" style={{ 
      backgroundImage: `url('https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1987&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {/* Glass circles for background effect - removed purple overlay */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-light-purple/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-purple/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-white">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Nigeria's Premier <span className="bg-gradient-to-r from-white to-primary-light-purple bg-clip-text text-transparent">Virtual Top-up</span> Platform
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-lg">
                Recharge airtime, buy data, pay electricity bills, and subscribe to your favorite TV channels - all in one place.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-primary-purple hover:bg-white/90">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Explore Services
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-300 mr-2" />
                <span className="text-white/90">Fast & Secure</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-300 mr-2" />
                <span className="text-white/90">24/7 Support</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-300 mr-2" />
                <span className="text-white/90">Best Rates</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-xl">
            <div className="glass-card p-6">
              <div className="rounded-xl overflow-hidden bg-white/80 backdrop-blur shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                  alt="Mobile phone with payment application"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
