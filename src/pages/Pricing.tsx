
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PricingCard = ({ title, description, price, features, buttonText, buttonLink, highlighted = false }) => {
  return (
    <Card className={`relative overflow-hidden transition-all card-hover ${highlighted 
      ? "backdrop-blur-xl bg-primary-purple/20 border-primary-light-purple/50" 
      : "backdrop-blur-xl bg-white/20 border border-white/30"}`}>
      {highlighted && (
        <div className="absolute top-0 right-0 bg-primary-purple text-white text-xs font-bold uppercase py-1 px-3 tracking-wider transform translate-x-2 -translate-y-0">
          Popular
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <span className="text-4xl font-bold">₦{price}</span>
          <span className="text-sm opacity-70">per transaction</span>
        </div>
        <ul className="space-y-2 w-full">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link to={buttonLink} className="w-full">
          <Button className={`w-full ${highlighted 
            ? "bg-primary-purple hover:bg-primary-purple/90" 
            : "bg-secondary-purple hover:bg-secondary-purple/90"}`}>
            {buttonText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const ComparisonTable = () => {
  return (
    <div className="overflow-x-auto backdrop-blur-xl bg-white/20 border border-white/30 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Feature
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Basic Fee
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-primary-purple uppercase tracking-wider bg-primary-purple/10">
              Standard Fee
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Premium Fee
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              Airtime Recharge
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
              0.5% of amount
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium bg-primary-purple/5">
              0.3% of amount
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
              Free
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              Data Bundle Purchase
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
              ₦50
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium bg-primary-purple/5">
              ₦25
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
              Free
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              Electricity Bill Payment
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
              ₦100
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium bg-primary-purple/5">
              ₦50
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
              ₦25
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              Cable TV Subscription
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
              ₦100
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium bg-primary-purple/5">
              ₦50
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
              ₦25
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              Wallet Funding
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
              Free
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium bg-primary-purple/5">
              Free
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
              Free
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              Monthly Transaction Limit
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
              ₦50,000
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium bg-primary-purple/5">
              ₦500,000
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
              Unlimited
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Pricing = () => {
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
              Simple, Transparent <span className="bg-gradient-to-r from-primary-purple to-secondary-purple bg-clip-text text-transparent">Pricing</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-gray-600">
              We offer competitive transaction fees with no hidden charges or subscription costs. Only pay when you make transactions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard 
              title="Basic"
              description="Perfect for occasional users"
              price="0 - 100"
              features={[
                "All services available",
                "Regular transaction fees",
                "Standard customer support",
                "Normal transaction processing speed",
                "₦50,000 monthly transaction limit"
              ]}
              buttonText="Get Started"
              buttonLink="/register"
            />
            
            <PricingCard 
              title="Standard"
              description="Ideal for regular users"
              price="0 - 50"
              features={[
                "All services available",
                "Reduced transaction fees",
                "Priority customer support",
                "Faster transaction processing",
                "₦500,000 monthly transaction limit"
              ]}
              buttonText="Get Started"
              buttonLink="/register"
              highlighted={true}
            />
            
            <PricingCard 
              title="Premium"
              description="For high-volume users"
              price="0 - 25"
              features={[
                "All services available",
                "Minimal to no transaction fees",
                "24/7 dedicated customer support",
                "Instant transaction processing",
                "Unlimited monthly transactions"
              ]}
              buttonText="Get Started"
              buttonLink="/register"
            />
          </div>
        </div>
      </section>
      
      {/* Detailed Pricing Table */}
      <section className="py-16 bg-primary-purple/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Detailed Fee Structure</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Here's a breakdown of our fees for each service category.
            </p>
          </div>
          
          <ComparisonTable />
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>* All fees subject to change with prior notice to users</p>
            <p>* Premium tier available only for users with verified business accounts</p>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="backdrop-blur-xl bg-white/20 border border-white/30">
              <CardHeader>
                <CardTitle>Are there any hidden fees?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>No, we pride ourselves on transparency. All our fees are clearly displayed before you confirm any transaction.</p>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-xl bg-white/20 border border-white/30">
              <CardHeader>
                <CardTitle>How do I upgrade my account tier?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Your account automatically qualifies for better rates based on your transaction volume. The more you use our platform, the better your rates become.</p>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-xl bg-white/20 border border-white/30">
              <CardHeader>
                <CardTitle>Do transaction fees apply to wallet funding?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>No, funding your wallet is completely free across all account tiers.</p>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-xl bg-white/20 border border-white/30">
              <CardHeader>
                <CardTitle>Are there any monthly subscription fees?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>No, we don't charge any monthly or annual subscription fees. You only pay for the transactions you make.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-purple/10 relative overflow-hidden">
        <div className="absolute -top-40 right-40 w-96 h-96 bg-primary-light-purple/20 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-8">
              Create your free account today and enjoy our competitive rates for all your digital services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-primary-purple hover:bg-primary-purple/90">
                  Create Account
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary-purple text-primary-purple hover:bg-primary-purple/10">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Pricing;
