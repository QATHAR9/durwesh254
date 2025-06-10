import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { Perfume } from '../types';
import { ChevronDown } from 'lucide-react';

interface ProductsProps {
  products: Perfume[];
  onAddToCart: (perfume: Perfume, quantity: number) => void;
}

const Products: React.FC<ProductsProps> = ({ products, onAddToCart }) => {
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Perfume | null>(null);

  const categories = [...new Set(products.map(p => p.category))];
  
  const filteredProducts = products.filter(product => {
    if (!filterBy) return true;
    return product.category === filterBy;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleProductClick = (product: Perfume) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (quantity: number) => {
    if (selectedProduct) {
      onAddToCart(selectedProduct, quantity);
      setSelectedProduct(null);
    }
  };

  return (
    <section id="products" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Our Collection</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Discover our curated selection of luxury fragrances, each crafted to perfection.
          </p>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <div className="relative">
            <button 
              className="w-full sm:w-48 bg-white border border-gray-300 px-6 py-3 rounded-lg flex items-center justify-between hover:border-gray-400 transition-colors shadow-sm"
              onClick={() => {
                setShowFilterDropdown(!showFilterDropdown);
                setShowSortDropdown(false);
              }}
            >
              <span className="font-medium">
                {filterBy ? `Category: ${filterBy}` : 'Shop by Category'}
              </span>
              <ChevronDown size={20} className={`transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showFilterDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setFilterBy('');
                    setShowFilterDropdown(false);
                  }}
                >
                  All Products
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-t border-gray-100"
                    onClick={() => {
                      setFilterBy(category);
                      setShowFilterDropdown(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              className="w-full sm:w-48 bg-white border border-gray-300 px-6 py-3 rounded-lg flex items-center justify-between hover:border-gray-400 transition-colors shadow-sm"
              onClick={() => {
                setShowSortDropdown(!showSortDropdown);
                setShowFilterDropdown(false);
              }}
            >
              <span className="font-medium">
                {sortBy ? `Sort: ${sortBy === 'price-low' ? 'Price Low' : sortBy === 'price-high' ? 'Price High' : 'Name'}` : 'Sort by'}
              </span>
              <ChevronDown size={20} className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showSortDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setSortBy('');
                    setShowSortDropdown(false);
                  }}
                >
                  Default
                </button>
                <button
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-t border-gray-100"
                  onClick={() => {
                    setSortBy('price-low');
                    setShowSortDropdown(false);
                  }}
                >
                  Price: Low to High
                </button>
                <button
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-t border-gray-100"
                  onClick={() => {
                    setSortBy('price-high');
                    setShowSortDropdown(false);
                  }}
                >
                  Price: High to Low
                </button>
                <button
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-t border-gray-100"
                  onClick={() => {
                    setSortBy('name');
                    setShowSortDropdown(false);
                  }}
                >
                  Name A-Z
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {sortedProducts.map((perfume) => (
            <ProductCard 
              key={perfume.id} 
              perfume={perfume} 
              onAddToCart={onAddToCart}
              onClick={() => handleProductClick(perfume)}
            />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </section>
  );
};

export default Products;