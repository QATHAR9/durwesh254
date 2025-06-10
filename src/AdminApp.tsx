import React, { useState, useEffect } from 'react';
import Admin from './components/Admin';
import { Perfume } from './types';
import { samplePerfumes } from './data';

function AdminApp() {
  const [products, setProducts] = useState<Perfume[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());
  
  const STORAGE_KEY = 'admin_password';
  const DEFAULT_PASSWORD = 'durwesh2025';

  useEffect(() => {
    // Initialize password if not set
    const storedPassword = localStorage.getItem(STORAGE_KEY);
    if (!storedPassword) {
      localStorage.setItem(STORAGE_KEY, DEFAULT_PASSWORD);
    }

    // Load products with timestamp check
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem(STORAGE_KEY) || DEFAULT_PASSWORD;
    if (password === storedPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    localStorage.setItem(STORAGE_KEY, newPassword);
    setIsChangingPassword(false);
    alert('Password changed successfully');
  };

  const handleAddProduct = (newProduct: Omit<Perfume, 'id'>) => {
    const product: Perfume = {
      ...newProduct,
      id: Date.now().toString(),
    };
    const updatedProducts = [...products, product];
    const timestamp = Date.now();
    
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    localStorage.setItem('products_timestamp', timestamp.toString());
    setLastUpdate(timestamp);
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    const timestamp = Date.now();
    
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    localStorage.setItem('products_timestamp', timestamp.toString());
    setLastUpdate(timestamp);
  };

  const handleUpdateProduct = (id: string, updatedProduct: Omit<Perfume, 'id'>) => {
    const updatedProducts = products.map(product => 
      product.id === id 
        ? { ...updatedProduct, id } 
        : product
    );
    const timestamp = Date.now();
    
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    localStorage.setItem('products_timestamp', timestamp.toString());
    setLastUpdate(timestamp);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="font-serif text-2xl font-semibold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-2 font-medium rounded-sm transition-colors duration-300 hover:bg-green-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isChangingPassword) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="font-serif text-2xl font-semibold mb-6 text-center">Change Password</h1>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
                minLength={6}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
                minLength={6}
              />
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setIsChangingPassword(false)}
                className="flex-1 bg-gray-500 text-white px-4 py-2 font-medium rounded-sm transition-colors duration-300 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white px-4 py-2 font-medium rounded-sm transition-colors duration-300 hover:bg-green-700"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="font-serif text-xl">DURWESH Admin</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsChangingPassword(true)}
            className="text-white hover:text-green-200 transition-colors"
          >
            Change Password
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-white hover:text-green-200 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
      <Admin
        onAddProduct={handleAddProduct}
        products={products}
        onDeleteProduct={handleDeleteProduct}
        onUpdateProduct={handleUpdateProduct}
      />
    </div>
  );
}

export default AdminApp;