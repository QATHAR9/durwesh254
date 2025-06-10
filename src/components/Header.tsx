import React, { useState, useEffect } from 'react';
import { Menu, ShoppingBag, Search } from 'lucide-react';
import { Link } from './Link';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-black p-2"
            aria-label="Menu"
          >
            <Menu size={24} />
            <span className="text-xs block mt-1">MENU</span>
          </button>

          <div className="flex items-center gap-6">
            <button className="text-black p-2" aria-label="Search">
              <Search size={24} />
              <span className="text-xs block mt-1">Search</span>
            </button>
            
            <button 
              onClick={onCartClick}
              className="text-black p-2 relative"
              aria-label="Cart"
            >
              <ShoppingBag size={24} />
              <span className="text-xs block mt-1">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl">Menu</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-black"
              >
                Close
              </button>
            </div>
            <nav>
              <ul className="space-y-4">
                {['Home', 'Products', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`#${item.toLowerCase()}`}
                      className="text-2xl hover:text-gray-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;