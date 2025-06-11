import React from 'react';
import { Phone, Mail, MapPin, Instagram, MessageCircle, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Story', href: '#about' },
      { name: 'Contact', href: '#contact' },
    ],
    products: [
      { name: 'For Him', href: '#products' },
      { name: 'For Her', href: '#products' },
      { name: 'Unisex', href: '#products' },
    ],
    support: [
      { name: 'FAQ', href: '#contact' },
      { name: 'Shipping Info', href: '#contact' },
      { name: 'Returns', href: '#contact' },
    ]
  };

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/durwesh25?igsh=MTB4OHBybzltZmdkNA==',
      icon: Instagram
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/254706183308',
      icon: MessageCircle
    }
  ];

  const contactInfo = [
    {
      icon: Phone,
      text: '+254706183308',
      href: 'tel:+254706183308'
    },
    {
      icon: MessageCircle,
      text: 'WhatsApp',
      href: 'https://wa.me/254706183308'
    },
    {
      icon: Mail,
      text: 'info@durwesh.com',
      href: 'mailto:info@durwesh.com'
    },
    {
      icon: MapPin,
      text: 'Mombasa, Kenya',
      href: null
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl lg:text-3xl font-bold mb-4">DURWESH</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Crafting luxury scents for the discerning individual. Experience perfection in every bottle with our carefully curated collection of premium fragrances.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
                    aria-label={social.name}
                  >
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/admin"
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Admin
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                const content = item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.text}
                  </a>
                ) : (
                  <span className="text-gray-300">{item.text}</span>
                );

                return (
                  <li key={index} className="flex items-start gap-3">
                    <IconComponent size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                    {content}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} DURWESH. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Made with <Heart size={14} className="text-red-400" /> in Kenya
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;