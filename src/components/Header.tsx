import React, { useState } from 'react';
import { Menu, ShoppingBag, Search, X } from 'lucide-react';
import { Link } from './Link';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-1">
              <Link href="#home" className="font-serif text-2xl lg:text-3xl font-bold text-black hover:text-gray-700 transition-colors">
                DURWESH
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              {['Home', 'Products', 'About', 'Contact'].map((item) => (
                <Link 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-black font-medium transition-colors duration-200 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4 flex-1 justify-end">
              {/* Search Button - Hidden on mobile */}
              <button className="hidden sm:flex items-center justify-center w-10 h-10 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-200" aria-label="Search">
                <Search size={20} />
              </button>
              
              {/* Cart Button */}
              <button 
                onClick={onCartClick}
                className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-200 relative"
                aria-label="Shopping Cart"
              >
                <ShoppingBag size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsOpen(true)}
                className="lg:hidden flex items-center justify-center w-10 h-10 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-200"
                aria-label="Open Menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-serif text-xl font-bold">Menu</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-200"
                aria-label="Close Menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-4">
                {['Home', 'Products', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`#${item.toLowerCase()}`}
                      className="block text-lg font-medium text-gray-700 hover:text-black py-2 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Mobile Search */}
              <div className="mt-8 pt-4 border-t">
                <button className="flex items-center gap-3 text-gray-700 hover:text-black py-2 transition-colors duration-200">
                  <Search size={20} />
                  <span>Search Products</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;