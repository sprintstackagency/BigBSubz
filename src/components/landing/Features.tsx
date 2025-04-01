
import { 
  PhoneCall, 
  Database, 
  Zap, 
  Tv, 
  CreditCard, 
  Shield, 
  Clock, 
  Gift 
} from "lucide-react";

const features = [
  {
    icon: PhoneCall,
    title: "Airtime Recharge",
    description: "Instant airtime recharge for all Nigerian networks: MTN, Airtel, Glo, and 9mobile."
  },
  {
    icon: Database,
    title: "Data Bundles",
    description: "Wide range of data bundles for all networks with the best rates in the market."
  },
  {
    icon: Zap,
    title: "Electricity Bills",
    description: "Pay electricity bills for all distribution companies across Nigeria."
  },
  {
    icon: Tv,
    title: "Cable TV",
    description: "Renew your DSTV, GOtv, and StarTimes subscriptions with just a few clicks."
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Multiple secure payment options to fund your wallet and make transactions."
  },
  {
    icon: Shield,
    title: "Safe & Reliable",
    description: "Your transactions are protected with bank-level security."
  },
  {
    icon: Clock,
    title: "24/7 Service",
    description: "Access our services anytime, anywhere. We never close."
  },
  {
    icon: Gift,
    title: "Rewards & Bonuses",
    description: "Earn points and get discounts on future transactions."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need for seamless utility payments and top-ups in one platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="bg-primary-soft-purple w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
