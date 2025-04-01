
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, ShieldCheck, Zap, MessageSquare, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ValueCard = ({ icon: Icon, title, description }) => {
  return (
    <Card className="backdrop-blur-xl bg-white/20 border border-white/30 transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-purple/20 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-primary-purple" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-center sm:text-left">{title}</h3>
            <p className="text-gray-600 text-center sm:text-left">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TeamMember = ({ name, position, image }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 backdrop-blur-xl bg-white/20 border border-white/30 p-1">
        <img src={image} alt={name} className="w-full h-full object-cover rounded-full" />
      </div>
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-gray-600">{position}</p>
    </div>
  );
};

const AboutPage = () => {
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="bg-gradient-to-r from-primary-purple to-secondary-purple bg-clip-text text-transparent">BigBSubz</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                BigBSubz is a leading provider of virtual top-up services in Nigeria, revolutionizing the way people recharge airtime, buy data, pay bills, and make cable subscriptions.
              </p>
              <p className="text-gray-600 mb-8">
                Established in 2023, our mission is to simplify digital transactions, making them more accessible, affordable, and secure for everyone. We leverage innovative technology to create a seamless payment experience for our customers.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button className="bg-primary-purple hover:bg-primary-purple/90">
                    Contact Us
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" className="border-primary-purple text-primary-purple hover:bg-primary-purple/10">
                    Our Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <div className="backdrop-blur-xl bg-white/20 border border-white/30 p-6 rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                  alt="About BigBSubz"
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 bg-primary-purple/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At BigBSubz, our core values guide everything we do from how we build our product to how we serve our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ValueCard 
              icon={Users}
              title="Customer First"
              description="We prioritize our customers' needs in all our decisions, ensuring we provide the best possible service."
            />
            <ValueCard 
              icon={ShieldCheck}
              title="Security & Trust"
              description="We maintain the highest standards of security to protect our customers' data and transactions."
            />
            <ValueCard 
              icon={Zap}
              title="Innovation"
              description="We constantly evolve and improve our services to meet the changing needs of our customers."
            />
            <ValueCard 
              icon={MessageSquare}
              title="Transparency"
              description="We believe in clear communication and being open about our processes and fees."
            />
            <ValueCard 
              icon={Award}
              title="Excellence"
              description="We strive for excellence in everything we do, from our platform's performance to customer support."
            />
            <ValueCard 
              icon={Clock}
              title="Reliability"
              description="Our customers can count on us for consistent, dependable service around the clock."
            />
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="backdrop-blur-xl bg-white/20 border border-white/30 p-6 rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Our Story"
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                BigBSubz was born from a simple observation: Nigerians spent too much time and effort on basic utilities and services payments. We saw an opportunity to create a platform that would simplify these everyday transactions.
              </p>
              <p className="text-gray-600 mb-4">
                Starting with just airtime recharges, we've grown to offer a comprehensive suite of digital services including data bundles, electricity bill payments, and cable TV subscriptions.
              </p>
              <p className="text-gray-600 mb-4">
                Throughout our journey, we've remained committed to our founding principle: making digital transactions as simple and accessible as possible for everyone.
              </p>
              <p className="text-gray-600">
                Today, we serve thousands of satisfied customers across Nigeria, providing them with a reliable platform for all their digital service needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-16 bg-primary-purple/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind BigBSubz who work tirelessly to provide you with the best service.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <TeamMember 
              name="John Adeyemi" 
              position="CEO & Founder" 
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
            />
            <TeamMember 
              name="Sarah Okonkwo" 
              position="CTO" 
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80" 
            />
            <TeamMember 
              name="David Nnamdi" 
              position="Head of Operations" 
              image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
            />
            <TeamMember 
              name="Amina Bello" 
              position="Customer Success Lead" 
              image="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=922&q=80" 
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join the BigBSubz Community</h2>
            <p className="text-gray-600 mb-8">
              Experience the convenience of our digital services platform and join thousands of satisfied customers across Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-primary-purple hover:bg-primary-purple/90">
                  Create Account
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary-purple text-primary-purple hover:bg-primary-purple/10">
                  Contact Us
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

export default AboutPage;
