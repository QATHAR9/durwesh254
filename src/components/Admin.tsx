import React, { useState, useEffect } from 'react';
import { Perfume } from '../types';
import { Menu, X, Plus, Pencil, Trash2, ChevronLeft, Upload, Eye, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminProps {
  onAddProduct: (product: Omit<Perfume, 'id'>) => void;
  products: Perfume[];
  onDeleteProduct: (id: string) => void;
  onUpdateProduct: (id: string, product: Omit<Perfume, 'id'>) => void;
}

const Admin: React.FC<AdminProps> = ({ onAddProduct, products: localProducts, onDeleteProduct, onUpdateProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Perfume | null>(null);
  const [products, setProducts] = useState<Perfume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    category: '',
    price: '',
    description: '',
    inStock: true
  });
  const [previewImage, setPreviewImage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const navigate = useNavigate();

  const categories = ['For Him', 'For Her', 'Unisex', 'Limited Edition', 'Classic'];

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  // Check if API is available
  const isApiAvailable = async () => {
    try {
      const response = await fetch('/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const contentType = response.headers.get('content-type');
      return contentType && contentType.includes('application/json');
    } catch {
      return false;
    }
  };

  // Fetch products from API with fallback
  const fetchProducts = async () => {
    try {
      setIsRefreshing(true);
      
      // Check if we're in development mode or if API is not available
      const isDevelopment = import.meta.env.DEV;
      const apiAvailable = await isApiAvailable();
      
      if (isDevelopment || !apiAvailable) {
        console.log('Using local storage for product management');
        // Use local products from localStorage or props
        setProducts(localProducts);
        setIsLoading(false);
        setIsRefreshing(false);
        return;
      }

      // Try to fetch from API in production
      const response = await fetch('/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      showNotification('error', 'API not available. Using local storage.');
      // Fallback to local products
      setProducts(localProducts);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, [localProducts]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price greater than 0';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Handle image URL preview
    if (field === 'imageUrl' && typeof value === 'string') {
      if (isValidUrl(value)) {
        setPreviewImage(value);
      } else {
        setPreviewImage('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotification('error', 'Please fix the errors below');
      return;
    }

    setIsSubmitting(true);

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        imageUrl: formData.imageUrl.trim(),
        category: formData.category,
        inStock: formData.inStock
      };

      // Check if API is available
      const apiAvailable = await isApiAvailable();
      
      if (apiAvailable) {
        // Try API first
        const response = await fetch('/api/add-product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          showNotification('success', editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
          resetForm();
          await fetchProducts();
          return;
        } else {
          throw new Error(result.error || 'Failed to save product');
        }
      } else {
        // Fallback to local storage
        if (editingProduct) {
          onUpdateProduct(editingProduct.id, productData);
        } else {
          onAddProduct(productData);
        }
        showNotification('success', editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
        resetForm();
        // Refresh local products
        setTimeout(() => {
          setProducts(localProducts);
        }, 100);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      showNotification('error', error instanceof Error ? error.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      imageUrl: '',
      category: '',
      price: '',
      description: '',
      inStock: true
    });
    setPreviewImage('');
    setEditingProduct(null);
    setErrors({});
    setIsOpen(false);
  };

  const handleEdit = (product: Perfume) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      imageUrl: product.imageUrl,
      category: product.category,
      price: product.price.toString(),
      description: product.description || '',
      inStock: product.inStock
    });
    setPreviewImage(product.imageUrl);
    setIsOpen(true);
  };

  const handleDelete = async (product: Perfume) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      // Check if API is available
      const apiAvailable = await isApiAvailable();
      
      if (apiAvailable) {
        const response = await fetch(`/api/delete-product/${product.id}`, {
          method: 'DELETE',
        });

        const result = await response.json();

        if (response.ok && result.success) {
          showNotification('success', 'Product deleted successfully!');
          await fetchProducts();
          return;
        } else {
          throw new Error(result.error || 'Failed to delete product');
        }
      } else {
        // Fallback to local storage
        onDeleteProduct(product.id);
        showNotification('success', 'Product deleted successfully!');
        // Refresh local products
        setTimeout(() => {
          setProducts(localProducts);
        }, 100);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      showNotification('error', error instanceof Error ? error.message : 'Failed to delete product. Please try again.');
    }
  };

  const handleRefresh = () => {
    fetchProducts();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-8 px-4 min-h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg max-w-md ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="flex-1">{notification.message}</span>
          <button 
            onClick={() => setNotification(null)}
            className="text-white hover:text-gray-200"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors p-2 rounded-lg hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
              <span className="font-medium">Back to Website</span>
            </button>
            <div>
              <h2 className="font-serif text-3xl font-bold text-gray-900">Product Management</h2>
              <p className="text-gray-600">Manage your perfume collection</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button 
              onClick={() => setIsOpen(true)}
              className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-md font-semibold"
            >
              <Plus size={20} />
              Add New Product
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900">{products.length}</h3>
            <p className="text-gray-600">Total Products</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-green-600">{products.filter(p => p.inStock).length}</h3>
            <p className="text-gray-600">In Stock</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-red-600">{products.filter(p => !p.inStock).length}</h3>
            <p className="text-gray-600">Out of Stock</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-blue-600">{new Set(products.map(p => p.category)).size}</h3>
            <p className="text-gray-600">Categories</p>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square relative bg-gray-50">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400?text=Image+Not+Found';
                    }}
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white transition-colors shadow-sm"
                      title="Edit product"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="bg-white/90 backdrop-blur-sm text-red-600 p-2 rounded-full hover:bg-white transition-colors shadow-sm"
                      title="Delete product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-serif text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                      {product.category}
                    </span>
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.inStock ? 'Available' : 'Out of Stock'}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 mb-3">KES {product.price.toLocaleString()}</p>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{product.description}</p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors font-medium"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition-colors font-medium"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Upload size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products yet</h3>
            <p className="text-gray-500 mb-6">Start by adding your first product to the collection.</p>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Add Your First Product
            </button>
          </div>
        )}

        {/* Product Form Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b bg-gray-50 rounded-t-2xl">
                <div className="flex items-center gap-4">
                  <button
                    onClick={resetForm}
                    className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors p-2 rounded-lg hover:bg-gray-100"
                  >
                    <ChevronLeft size={20} />
                    <span className="font-medium">Back</span>
                  </button>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-gray-900">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <p className="text-gray-600">
                      {editingProduct ? 'Update product information' : 'Fill in the details below'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Form Fields */}
                  <div className="space-y-6">
                    {/* Product Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Product Name *
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter product name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    
                    {/* Category */}
                    <div>
                      <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                          errors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>
                    
                    {/* Price */}
                    <div>
                      <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                        Price (KES) *
                      </label>
                      <input 
                        type="number" 
                        id="price"
                        min="0"
                        step="1"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                          errors.price ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter price"
                      />
                      {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                    </div>

                    {/* Stock Status */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Stock Status
                      </label>
                      <div className="flex items-center space-x-6">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio text-green-600 h-4 w-4"
                            name="availability"
                            checked={formData.inStock}
                            onChange={() => handleInputChange('inStock', true)}
                          />
                          <span className="ml-2 text-gray-700">In Stock</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio text-red-500 h-4 w-4"
                            name="availability"
                            checked={!formData.inStock}
                            onChange={() => handleInputChange('inStock', false)}
                          />
                          <span className="ml-2 text-gray-700">Out of Stock</span>
                        </label>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea 
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        maxLength={500}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-vertical ${
                          errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter product description"
                      />
                      {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                      <p className="text-gray-500 text-sm mt-1">
                        {formData.description.length}/500 characters
                      </p>
                    </div>
                  </div>

                  {/* Right Column - Image */}
                  <div className="space-y-6">
                    {/* Image URL */}
                    <div>
                      <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                        Image URL *
                      </label>
                      <input 
                        type="url" 
                        id="imageUrl"
                        value={formData.imageUrl}
                        onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                          errors.imageUrl ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="https://example.com/image.jpg"
                      />
                      {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
                      <p className="text-gray-500 text-sm mt-1">
                        Enter a direct link to the product image
                      </p>
                    </div>

                    {/* Image Preview */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Image Preview
                      </label>
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                        {previewImage ? (
                          <img 
                            src={previewImage} 
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/400?text=Invalid+Image+URL';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <div className="text-center">
                              <Eye size={48} className="mx-auto mb-2" />
                              <p>Image preview will appear here</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Form Actions */}
                <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t">
                  <button 
                    type="button"
                    onClick={resetForm}
                    className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {editingProduct ? 'Updating...' : 'Adding...'}
                      </>
                    ) : (
                      <>
                        <Plus size={20} />
                        {editingProduct ? 'Update Product' : 'Add Product'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Admin;