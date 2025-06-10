import React from 'react';
import { Perfume } from '../types';
import { MessageCircle } from 'lucide-react';

interface ProductCardProps {
  perfume: Perfume;
  onAddToCart: (perfume: Perfume, quantity: number) => void;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ perfume, onAddToCart, onClick }) => {
  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hi! I'm interested in ordering *${perfume.name}* (${perfume.category}) - KES ${perfume.price.toLocaleString()}. 

${perfume.description}

Please let me know about availability and delivery options.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/254706183308?text=${encodedMessage}`, '_blank');
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={perfume.imageUrl} 
          alt={perfume.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {!perfume.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold mb-1 line-clamp-2 group-hover:text-gold-600 transition-colors">
          {perfume.name}
        </h3>
        <p className="text-gray-500 text-sm mb-2">{perfume.category}</p>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {perfume.description}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-gray-900">
            KES {perfume.price.toLocaleString()}
          </span>
        </div>
        
        {perfume.inStock ? (
          <button 
            onClick={handleWhatsAppOrder}
            className="w-full bg-green-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageCircle size={18} />
            Order via WhatsApp
          </button>
        ) : (
          <button 
            disabled
            className="w-full bg-gray-300 text-gray-500 py-2.5 px-4 rounded-lg font-medium cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;