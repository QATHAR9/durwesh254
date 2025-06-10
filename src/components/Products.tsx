import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Perfume } from '../types';

interface ProductsProps {
  products: Perfume[];
  onAddToCart: (perfume: Perfume, quantity: number) => void;
}

const Products: React.FC<ProductsProps> = ({ products, onAddToCart }) => {
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');

  return (
    <section id="products\" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-12">
          <button 
            className="border border-black px-8 py-2 w-full sm:w-[200px] text-center hover:bg-black hover:text-white transition-colors"
            onClick={() => setFilterBy(filterBy ? '' : 'show')}
          >
            SHOP BY
          </button>
          
          <button 
            className="border border-black px-8 py-2 w-full sm:w-[200px] text-center hover:bg-black hover:text-white transition-colors"
            onClick={() => setSortBy(sortBy ? '' : 'show')}
          >
            SORT BY
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8">
          {products.map((perfume) => (
            <ProductCard 
              key={perfume.id} 
              perfume={perfume} 
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;