import React, { useState, useEffect } from 'react'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { Product, CartItem } from '../types'
import { api } from '../lib/api'
import ProductCard from '../components/ProductCard'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Toast from '../components/ui/Toast'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)
  const [orderLoading, setOrderLoading] = useState(false)
  const [toast, setToast] = useState<{
    type: 'success' | 'error' | 'warning'
    message: string
    visible: boolean
  }>({ type: 'success', message: '', visible: false })

  useEffect(() => {
    loadProducts()
    
    // Set up polling for real-time updates
    const interval = setInterval(loadProducts, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadProducts = async () => {
    try {
      if (products.length === 0) setLoading(true)
      const data = await api.getProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error loading products:', error)
      showToast('error', 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const showToast = (type: 'success' | 'error' | 'warning', message: string) => {
    setToast({ type, message, visible: true })
  }

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    showToast('success', `${product.name} added to cart`)
  }

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== productId))
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      )
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const generateWhatsAppMessage = () => {
    const items = cart.map(item => 
      `- ${item.name} (Qty: ${item.quantity})`
    ).join('\n')
    
    const total = new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(getTotalPrice())

    return `Hi! I'm interested in:\n${items}\nTotal: ${total}`
  }

  const handleWhatsAppOrder = async () => {
    try {
      setOrderLoading(true)
      
      // Create order in database
      const orderData = {
        items: cart.map(item => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total_price: getTotalPrice(),
        phone_number: '254706183308'
      }

      await api.createOrder(orderData)

      // Generate WhatsApp message
      const message = generateWhatsAppMessage()
      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/254706183308?text=${encodedMessage}`
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank')
      
      // Clear cart
      setCart([])
      setCartOpen(false)
      showToast('success', 'Order sent via WhatsApp!')
      
    } catch (error) {
      console.error('Error creating order:', error)
      showToast('error', 'Failed to create order')
    } finally {
      setOrderLoading(false)
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
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">DURWESH</h1>
            <div className="flex items-center gap-4">
              <a
                href="/admin"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Admin
              </a>
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ShoppingCart size={24} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Collection</h2>
          <p className="text-gray-600">Discover our premium fragrances</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </main>

      {/* Cart Modal */}
      <Modal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        title="Shopping Cart"
        size="lg"
      >
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold">{formatPrice(getTotalPrice())}</span>
              </div>
              
              <Button
                onClick={handleWhatsAppOrder}
                loading={orderLoading}
                className="w-full"
                size="lg"
              >
                Order via WhatsApp
              </Button>
            </div>
          </div>
        )}
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

export default HomePage