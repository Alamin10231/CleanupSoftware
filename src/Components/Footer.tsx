import { assets } from "@/assets/assets";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white pt-16 pb-10 mt-20">
      <div className="container mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <img src={assets.logo} alt="Logo" className="w-32 mb-4" />
          <p className="text-gray-400 text-sm leading-relaxed">
            Providing professional cleaning & maintenance services to keep your space spotless and comfortable.
          </p>
          
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            <li><Link to="/home" className="hover:text-[#8241ED]">Home</Link></li>
            <li><a href="#section" className="hover:text-[#8241ED]">Services</a></li>
            <li><a href="#price" className="hover:text-[#8241ED]">Pricing</a></li>
            <li><Link to="/contact" className="hover:text-[#8241ED]">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Our Services</h3>
          <ul className="space-y-3 text-gray-400">
            <li>Regular Cleaning</li>
            <li>Deep Cleaning</li>
            <li>Maintenance</li>
            <li>Landscaping</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400 text-sm">📍 Dhaka, Bangladesh</p>
          <p className="text-gray-400 text-sm mt-2">📞 +880 1700 000 000</p>
          <p className="text-gray-400 text-sm mt-2">📧 support@cleanpro.com</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} CleanPro. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
