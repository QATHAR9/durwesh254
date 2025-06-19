import React, { useState, useEffect } from 'react'
import { Plus, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react'
import { Product, Order } from '../types'
import { api } from '../lib/api'
import ProductCard from '../components/ProductCard'
import ProductForm from '../components/ProductForm'
import OrderList from '../components/OrderList'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Toast from '../components/ui/Toast'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products')
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  const [toast, setToast] = useState<{
    type: 'success' | 'error' | 'warning'
    message: string
    visible: boolean
  }>({ type: 'success', message: '', visible: false })

  useEffect(() => {
    loadData()
    
    // Set up polling for real-time updates
    const interval = setInterval(loadData, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      if (products.length === 0 && orders.length === 0) setLoading(true)
      const [productsData, ordersData] = await Promise.all([
        api.getProducts(),
        api.getOrders()
      ])
      setProducts(productsData)
      setOrders(ordersData)
    } catch (error) {
      console.error('Error loading data:', error)
      showToast('error', 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const showToast = (type: 'success' | 'error' | 'warning', message: string) => {
    setToast({ type, message, visible: true })
  }

  const handleProductSubmit = async (data: any) => {
    try {
      setFormLoading(true)
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, data)
        showToast('success', 'Product updated successfully')
      } else {
        await api.createProduct(data)
        showToast('success', 'Product created successfully')
      }
      await loadData()
      setShowProductForm(false)
      setEditingProduct(null)
    } catch (error: any) {
      showToast('error', error.message || 'Failed to save product')
    } finally {
      setFormLoading(false)
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setShowProductForm(true)
  }

  const handleDeleteProduct = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return
    }

    try {
      await api.deleteProduct(product.id)
      showToast('success', 'Product deleted successfully')
      await loadData()
    } catch (error: any) {
      showToast('error', error.message || 'Failed to delete product')
    }
  }

  const handleToggleStock = async (product: Product) => {
    try {
      await api.toggleProductStock(product.id)
      showToast('success', `Product ${product.in_stock ? 'marked as out of stock' : 'marked as in stock'}`)
      await loadData()
    } catch (error: any) {
      showToast('error', error.message || 'Failed to update stock status')
    }
  }

  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      await api.updateOrderStatus(parseInt(orderId), status)
      showToast('success', 'Order status updated')
      await loadData()
    } catch (error: any) {
      showToast('error', error.message || 'Failed to update order status')
    }
  }

  const getStats = () => {
    const totalProducts = products.length
    const inStockProducts = products.filter(p => p.in_stock).length
    const totalOrders = orders.length
    const pendingOrders = orders.filter(o => o.status === 'pending').length
    const totalRevenue = orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + o.total_price, 0)

    return {
      totalProducts,
      inStockProducts,
      totalOrders,
      pendingOrders,
      totalRevenue
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">DURWESH Admin</h1>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Store
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Stock</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.inStockProducts}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pendingOrders}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">{formatPrice(stats.totalRevenue)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('products')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'products'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Products ({stats.totalProducts})
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'orders'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Orders ({stats.totalOrders})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Products</h2>
                  <Button
                    onClick={() => setShowProductForm(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Product
                  </Button>
                </div>

                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <Package size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                    <p className="text-gray-500 mb-4">Get started by adding your first product.</p>
                    <Button onClick={() => setShowProductForm(true)}>
                      Add Product
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isAdmin={true}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                        onToggleStock={handleToggleStock}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Orders</h2>
                </div>

                <OrderList
                  orders={orders}
                  onUpdateStatus={handleUpdateOrderStatus}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      <Modal
        isOpen={showProductForm}
        onClose={() => {
          setShowProductForm(false)
          setEditingProduct(null)
        }}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        size="xl"
      >
        <ProductForm
          initialData={editingProduct || undefined}
          onSubmit={handleProductSubmit}
          onCancel={() => {
            setShowProductForm(false)
            setEditingProduct(null)
          }}
          loading={formLoading}
        />
      </Modal>

      {/* Toast */}
      <Toast
        type={toast.type}
        message={toast.message}
        isVisible={toast.visible}
        onClose={() => setToast(prev => ({ ...prev, visible: false }))}
      />
    </div>
  )
}

export default AdminPage