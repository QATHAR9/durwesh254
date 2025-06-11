import React, { useState } from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { Perfume } from '../types';
import ProductModal from './ProductModal';

interface ProductCardProps {
  perfume: Perfume;
  onAddToCart: (perfume: Perfume, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ perfume, onAddToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(perfume, 1);
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleAddToCartFromModal = (quantity: number) => {
    onAddToCart(perfume, quantity);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50" onClick={handleCardClick}>
          <img 
            src={perfume.imageUrl} 
            alt={perfume.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Eye size={20} className="text-gray-800" />
            </div>
          </div>

          {/* Stock Status */}
          {!perfume.inStock && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </div>
          )}

          {/* Quick View Button - Desktop */}
          <button 
            onClick={handleCardClick}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 hidden sm:flex items-center justify-center"
            aria-label="Quick view"
          >
            <Eye size={16} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          <div onClick={handleCardClick}>
            <h3 className="font-serif text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200 line-clamp-2">
              {perfume.name}
            </h3>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
              {perfume.category}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-gray-900">
              KES {perfume.price.toLocaleString()}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            disabled={!perfume.inStock}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-sm uppercase tracking-wide transition-all duration-300 ${
              perfume.inStock
                ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingBag size={16} />
            {perfume.inStock ? 'Add to Bag' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={perfume}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCartFromModal}
      />
    </>
  );
};

export default ProductCard;