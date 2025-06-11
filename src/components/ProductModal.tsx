import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, ChevronLeft, MessageCircle } from 'lucide-react';
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
      document.body.style.overflow = 'hidden';
      window.history.pushState({ modal: true }, '', `#product-${product.id}`);

      const handlePopState = () => {
        onClose();
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, product.id, onClose]);

  if (!isOpen) return null;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleOrderWhatsApp = () => {
    const message = `Hi! I'm interested in ordering:

*${product.name}*
Category: ${product.category}
Quantity: ${quantity}
Price: KES ${product.price.toLocaleString()}/item
Total: KES ${(product.price * quantity).toLocaleString()}

Please let me know about availability and delivery options.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/254706183308?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

        <div className="inline-block w-full max-w-6xl my-4 md:my-8 text-left align-middle transition-all transform bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 z-10 flex justify-between items-center p-4 lg:p-6 border-b bg-white/95 backdrop-blur-sm">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors p-2 rounded-lg hover:bg-gray-100"
              aria-label="Back to products"
            >
              <ChevronLeft size={20} />
              <span className="font-medium hidden sm:inline">Back</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-square relative bg-gray-50">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold text-lg">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2 p-6 lg:p-8">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Product Info */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide">
                      {product.category}
                    </span>
                    {product.inStock && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        In Stock
                      </span>
                    )}
                  </div>
                  <h1 className="font-serif text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h1>
                  <p className="text-3xl font-bold text-gray-900 mb-6">
                    KES {product.price.toLocaleString()}
                  </p>
                </div>

                {/* Quantity and Actions */}
                {product.inStock ? (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <span className="text-gray-700 font-semibold">Quantity:</span>
                      <div className="flex items-center border-2 border-gray-200 rounded-lg bg-white shadow-sm">
                        <button
                          onClick={() => handleQuantityChange(quantity - 1)}
                          className="p-3 hover:bg-gray-50 transition-colors rounded-l-lg"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="px-6 py-3 border-x-2 border-gray-200 min-w-[4rem] text-center font-semibold text-lg">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(quantity + 1)}
                          className="p-3 hover:bg-gray-50 transition-colors rounded-r-lg"
                          aria-label="Increase quantity"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => onAddToCart(quantity)}
                        className="w-full flex items-center justify-center gap-3 bg-green-600 text-white px-6 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <ShoppingBag size={20} />
                        Add to Cart
                      </button>
                      
                      <button
                        onClick={handleOrderWhatsApp}
                        className="w-full flex items-center justify-center gap-3 bg-green-500 text-white px-6 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <MessageCircle size={20} />
                        Order via WhatsApp
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-xl">
                          KES {(product.price * quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <button 
                      disabled
                      className="w-full bg-gray-300 text-gray-600 px-6 py-4 rounded-lg font-semibold text-lg cursor-not-allowed"
                    >
                      Out of Stock
                    </button>
                    <button
                      onClick={() => {
                        const message = `Hi! I'm interested in the ${product.name}. When will it be back in stock?`;
                        const encodedMessage = encodeURIComponent(message);
                        window.open(`https://wa.me/254706183308?text=${encodedMessage}`, '_blank');
                      }}
                      className="w-full flex items-center justify-center gap-3 border-2 border-green-600 text-green-600 px-6 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors"
                    >
                      <MessageCircle size={20} />
                      Ask About Availability
                    </button>
                  </div>
                )}

                {/* Product Description */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description || 'Experience the luxurious blend of carefully selected ingredients that create this unique and captivating fragrance. Perfect for those who appreciate sophisticated and distinctive scents that leave a lasting impression.'}
                  </p>
                </div>

                {/* Additional Info */}
                <div className="border-t pt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Availability:</span>
                    <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
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