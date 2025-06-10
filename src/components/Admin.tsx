import React, { useState } from 'react';
import { Perfume } from '../types';
import { Menu, X, Plus, Pencil, Trash2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminProps {
  onAddProduct: (product: Omit<Perfume, 'id'>) => void;
  products: Perfume[];
  onDeleteProduct: (id: string) => void;
  onUpdateProduct: (id: string, product: Omit<Perfume, 'id'>) => void;
}

const Admin: React.FC<AdminProps> = ({ onAddProduct, products, onDeleteProduct, onUpdateProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Perfume | null>(null);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState(true);
  const [previewImage, setPreviewImage] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !imageUrl || !category || !price || !description) {
      alert('Please fill in all required fields');
      return;
    }
    
    const productData = {
      name,
      imageUrl,
      category,
      price: parseFloat(price),
      description,
      inStock
    };

    if (editingProduct) {
      onUpdateProduct(editingProduct.id, productData);
    } else {
      onAddProduct(productData);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setImageUrl('');
    setCategory('');
    setPrice('');
    setDescription('');
    setInStock(true);
    setPreviewImage('');
    setEditingProduct(null);
    setIsOpen(false);
  };

  const handleEdit = (product: Perfume) => {
    setEditingProduct(product);
    setName(product.name);
    setImageUrl(product.imageUrl);
    setCategory(product.category);
    setPrice(product.price.toString());
    setDescription(product.description || '');
    setInStock(product.inStock);
    setPreviewImage(product.imageUrl);
    setIsOpen(true);
  };

  const handleImageUrlChange = (url: string) => {
    setImageUrl(url);
    setPreviewImage(url);
  };
  
  return (
    <section className="py-8 px-4 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <ChevronLeft size={20} />
              Back to Website
            </button>
            <h2 className="font-serif text-2xl font-semibold">Manage Products</h2>
          </div>
          <button 
            onClick={() => setIsOpen(true)}
            className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-sm flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-md"
          >
            <Plus size={20} />
            Add New Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="aspect-square mb-4 rounded overflow-hidden bg-gray-100 relative">
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
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
              <h3 className="font-serif text-xl mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <p className="text-lg font-semibold mb-2">KES {product.price.toLocaleString()}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium">Status:</span>
                <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                  {product.inStock ? 'Available' : 'Out of Stock'}
                </span>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 bg-green-600 text-white px-3 py-2 rounded-sm flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                >
                  <Pencil size={16} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this product?')) {
                      onDeleteProduct(product.id);
                    }
                  }}
                  className="flex-1 bg-red-500 text-white px-3 py-2 rounded-sm flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-8">
              <div className="flex justify-between items-center p-6 border-b">
                <div className="flex items-center gap-4">
                  <button
                    onClick={resetForm}
                    className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                  >
                    <ChevronLeft size={20} />
                    Back
                  </button>
                  <h2 className="font-serif text-2xl font-semibold">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                </div>
                <button 
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Perfume Name *
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter perfume name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <input 
                        type="text" 
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter category"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Price (KES) *
                      </label>
                      <input 
                        type="number" 
                        id="price"
                        min="0"
                        step="1"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter price"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Availability
                      </label>
                      <div className="flex items-center space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio text-green-600"
                            name="availability"
                            checked={inStock}
                            onChange={() => setInStock(true)}
                          />
                          <span className="ml-2">Available</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio text-red-500"
                            name="availability"
                            checked={!inStock}
                            onChange={() => setInStock(false)}
                          />
                          <span className="ml-2">Out of Stock</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL *
                      </label>
                      <input 
                        type="url" 
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => handleImageUrlChange(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter image URL"
                        required
                      />
                      {previewImage && (
                        <div className="mt-2 relative aspect-square w-32 rounded overflow-hidden bg-gray-100">
                          <img 
                            src={previewImage} 
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/400?text=Invalid+Image+URL';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea 
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={12}
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter product description"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
                  <button 
                    type="button"
                    onClick={resetForm}
                    className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-sm font-medium hover:bg-green-700 transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <Plus size={20} />
                    {editingProduct ? 'Update Product' : 'Add Product'}
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