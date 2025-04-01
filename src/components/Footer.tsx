
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md pt-12 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-purple to-secondary-purple bg-clip-text text-transparent">
              BigBSubz
            </h3>
            <p className="text-gray-600 max-w-xs">
              Your one-stop solution for airtime, data, electricity bills, and cable subscriptions in Nigeria.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-primary-purple" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-primary-purple" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-primary-purple" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-purple">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary-purple">Services</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-primary-purple">Pricing</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary-purple">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary-purple">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/airtime" className="text-gray-600 hover:text-primary-purple">Airtime Recharge</Link>
              </li>
              <li>
                <Link to="/services/data" className="text-gray-600 hover:text-primary-purple">Data Bundles</Link>
              </li>
              <li>
                <Link to="/services/electricity" className="text-gray-600 hover:text-primary-purple">Electricity Bills</Link>
              </li>
              <li>
                <Link to="/services/cable" className="text-gray-600 hover:text-primary-purple">Cable Subscription</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary-purple mr-2 mt-0.5" />
                <span className="text-gray-600">support@bigbsubz.com</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary-purple mr-2 mt-0.5" />
                <span className="text-gray-600">+234 700 BIGBSUBZ</span>
              </div>
              <address className="text-gray-600 not-italic">
                123 Tech Avenue, <br />
                Lagos, Nigeria
              </address>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} BigBSubz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
