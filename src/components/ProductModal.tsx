import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, ChevronLeft } from 'lucide-react';
import { Perfume } from '../types';

interface ProductModalProps {
  product: Perfume;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (quantity: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ modal: true }, '', `#product-${product.id}`);

      const handlePopState = () => {
        onClose();
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isOpen, product.id, onClose]);

  if (!isOpen) return null;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

        <div className="inline-block w-full max-w-4xl my-4 md:my-8 text-left align-middle transition-all transform bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b bg-white rounded-t-lg">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors p-2"
              aria-label="Back to products"
            >
              <ChevronLeft size={20} />
              <span className="font-medium">Back</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-2"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <div className="aspect-square relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-6 py-3 rounded-sm font-medium text-lg">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full md:w-1/2 p-4 md:p-6">
              <div className="md:sticky md:top-20">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.category}</p>
                <p className="text-2xl font-bold mb-6">
                  KES {product.price.toLocaleString()}
                </p>

                {product.inStock ? (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <span className="text-gray-700 font-medium">Quantity:</span>
                      <div className="flex items-center border border-gray-300 rounded-md shadow-sm bg-white">
                        <button
                          onClick={() => handleQuantityChange(quantity - 1)}
                          className="p-3 md:px-4 md:py-2 hover:bg-gray-100 transition-colors rounded-l-md"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="px-4 md:px-6 py-2 border-x border-gray-300 min-w-[3rem] md:min-w-[4rem] text-center font-medium">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(quantity + 1)}
                          className="p-3 md:px-4 md:py-2 hover:bg-gray-100 transition-colors rounded-r-md"
                          aria-label="Increase quantity"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToCart(quantity)}
                      className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-4 md:py-3 rounded-md font-medium shadow-md hover:bg-green-700 transition-colors"
                    >
                      <ShoppingBag size={20} />
                      Add to Cart
                    </button>
                  </div>
                ) : (
                  <div className="mb-6">
                    <button 
                      disabled
                      className="w-full bg-gray-300 text-gray-600 px-6 py-4 md:py-3 rounded-md font-medium cursor-not-allowed"
                    >
                      Out of Stock
                    </button>
                  </div>
                )}

                <div className="mt-8">
                  <h3 className="font-semibold mb-2">Product Description</h3>
                  <p className="text-gray-600">
                    {product.description || 'Experience the luxurious blend of carefully selected ingredients that create this unique and captivating fragrance. Perfect for those who appreciate sophisticated and distinctive scents.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;