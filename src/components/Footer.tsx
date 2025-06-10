import React from 'react';
import { Phone, Mail, MapPin, Instagram, Apple as WhatsApp } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black-500 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-4">DURWESH</h3>
            <p className="mb-4 text-gray-300">
              Crafting luxury scents for the discerning individual. Experience perfection in every bottle.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/durwesh25?igsh=MTB4OHBybzltZmdkNA==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-gold-400 transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://wa.me/254706183308" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-gold-400 transition-colors duration-300"
              >
                <WhatsApp size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Products', 'About', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-gold-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="/admin" 
                  className="text-gray-300 hover:text-gold-400 transition-colors duration-300"
                >
                  Admin
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1 text-gold-400" />
                <a 
                  href="tel:+254706183308"
                  className="hover:text-gold-400 transition-colors duration-300"
                >
                  +254706183308
                </a>
              </li>
              <li className="flex items-start">
                <WhatsApp size={18} className="mr-2 mt-1 text-gold-400" />
                <a 
                  href="https://wa.me/254706183308"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-400 transition-colors duration-300"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 text-gold-400" />
                <span>info@durwesh.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-gold-400" />
                <span>Mombasa, Kenya</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DURWESH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;