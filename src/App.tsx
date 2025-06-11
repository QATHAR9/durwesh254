import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { Perfume, CartItem } from './types';
import { samplePerfumes } from './data';

function App() {
  const [products, setProducts] = useState<Perfume[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  useEffect(() => {
    // Load initial products
    const loadProducts = () => {
      const storedProducts = localStorage.getItem('products');
      const storedTimestamp = localStorage.getItem('products_timestamp');
      
      if (storedProducts && storedTimestamp) {
        const timestamp = parseInt(storedTimestamp, 10);
        if (timestamp > lastUpdate) {
          setProducts(JSON.parse(storedProducts));
          setLastUpdate(timestamp);
        }
      } else {
        setProducts(samplePerfumes);
        const timestamp = Date.now();
        localStorage.setItem('products', JSON.stringify(samplePerfumes));
        localStorage.setItem('products_timestamp', timestamp.toString());
        setLastUpdate(timestamp);
      }
    };

    loadProducts();

    // Listen for changes in other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'products' && e.newValue) {
        const timestamp = parseInt(localStorage.getItem('products_timestamp') || '0', 10);
        if (timestamp > lastUpdate) {
          setProducts(JSON.parse(e.newValue));
          setLastUpdate(timestamp);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Poll for updates every 30 seconds
    const interval = setInterval(loadProducts, 30000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [lastUpdate]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Perfume, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    const message = `*New Order from DURWESH*

*Order Details:*
${cartItems
  .map(
    item => `• ${item.name} (${item.category})
  Quantity: ${item.quantity}
  Price: KES ${item.price.toLocaleString()}/item
  Subtotal: KES ${(item.price * item.quantity).toLocaleString()}`
  )
  .join('\n\n')}

*Order Summary:*
Total Items: ${cartItems.reduce((sum, item) => sum + item.quantity, 0)}
*Total Amount: KES ${cartItems
  .reduce((sum, item) => sum + item.price * item.quantity, 0)
  .toLocaleString()}*

Please confirm availability and provide delivery details.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/254706183308?text=${encodedMessage}`, '_blank');
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <div className="font-sans">
      <Header 
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      <main>
        <Hero />
        <Products products={products} onAddToCart={handleAddToCart} />
        <About />
        <Contact />
      </main>
      <Footer />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default App;