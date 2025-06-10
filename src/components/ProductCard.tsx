import React from 'react';
import { Perfume } from '../types';

interface ProductCardProps {
  perfume: Perfume;
  onAddToCart: (perfume: Perfume, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ perfume, onAddToCart }) => {
  return (
    <div className="flex flex-col">
      <div className="aspect-square mb-4 overflow-hidden">
        <img 
          src={perfume.imageUrl} 
          alt={perfume.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="text-lg uppercase mb-2">{perfume.name}</h3>
      <p className="text-lg font-bold mb-4">KES {perfume.price.toLocaleString()}</p>
      <button 
        onClick={() => onAddToCart(perfume, 1)}
        className="bg-green-600 text-white py-3 w-full hover:bg-green-700 transition-colors uppercase tracking-wider"
      >
        ADD TO BAG
      </button>
    </div>
  );
};

export default ProductCard;