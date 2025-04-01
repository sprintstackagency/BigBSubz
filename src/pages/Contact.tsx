
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactInfoItem = ({ icon: Icon, title, content }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-primary-purple/20 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-primary-purple" />
      </div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

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
              Get in <span className="bg-gradient-to-r from-primary-purple to-secondary-purple bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-gray-600">
              We're here to help with any questions or concerns you might have about our services.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Info & Form Section */}
      <section className="py-16 -mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-2">
              <Card className="h-full backdrop-blur-xl bg-white/20 border border-white/30">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Reach out to us through any of these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ContactInfoItem 
                    icon={MapPin} 
                    title="Our Office" 
                    content="123 Victoria Island, Lagos, Nigeria" 
                  />
                  <ContactInfoItem 
                    icon={Phone} 
                    title="Phone Number" 
                    content="+234 812 345 6789" 
                  />
                  <ContactInfoItem 
                    icon={Mail} 
                    title="Email Address" 
                    content="support@bigbsubz.com" 
                  />
                  <ContactInfoItem 
                    icon={Clock} 
                    title="Working Hours" 
                    content="Monday - Friday: 8am - 8pm" 
                  />
                  <ContactInfoItem 
                    icon={MessageSquare} 
                    title="Social Media" 
                    content="@bigbsubz on all platforms" 
                  />
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="backdrop-blur-xl bg-white/20 border border-white/30">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Your Name
                        </label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="John Doe" 
                          required 
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-white/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          placeholder="johndoe@example.com" 
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-white/50" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input 
                        id="subject" 
                        name="subject" 
                        placeholder="How can we help you?" 
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="bg-white/50"  
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        placeholder="Your message here..." 
                        rows={5} 
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-white/50"  
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary-purple hover:bg-primary-purple/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden backdrop-blur-xl bg-white/20 border border-white/30">
            <CardContent className="p-0">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63427.97620267909!2d3.3792124501364383!3d6.4478756240401055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53aec4dd92d%3A0x5e34fe6a84cdbb53!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1690368863396!5m2!1sen!2sng" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="BigBSubz Office Location"
              ></iframe>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-primary-purple/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our services and support.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="backdrop-blur-xl bg-white/20 border border-white/30">
              <CardHeader>
                <CardTitle>What are your customer service hours?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our customer service team is available Monday through Friday from 8am to 8pm, and Saturday from 10am to 4pm. For urgent matters outside these hours, please email us, and we'll respond as soon as possible.</p>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-xl bg-white/20 border border-white/30">
              <CardHeader>
                <CardTitle>How quickly do you respond to inquiries?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>We aim to respond to all inquiries within 24 hours. For urgent matters or technical issues with transactions, we typically respond within 2-4 hours during business hours.</p>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-xl bg-white/20 border border-white/30">
              <CardHeader>
                <CardTitle>Do you offer business solutions?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Yes, we offer specialized solutions for businesses including bulk purchases, API integration, and custom pricing plans. Please contact our sales team for more information.</p>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-xl bg-white/20 border border-white/30">
              <CardHeader>
                <CardTitle>How do I report a failed transaction?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>If you experience a failed transaction, please email us at support@bigbsubz.com with your transaction reference number, or call our support line. Our team will investigate and resolve the issue promptly.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
