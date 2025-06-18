import React from 'react'
import { Clock, Package, CheckCircle, XCircle } from 'lucide-react'
import { Order } from '../types'
import Button from './ui/Button'

interface OrderListProps {
  orders: Order[]
  onUpdateStatus?: (orderId: string, status: Order['status']) => void
  loading?: boolean
}

const OrderList: React.FC<OrderListProps> = ({
  orders,
  onUpdateStatus,
  loading = false
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className="text-yellow-600" />
      case 'confirmed':
        return <Package size={16} className="text-blue-600" />
      case 'completed':
        return <CheckCircle size={16} className="text-green-600" />
      case 'cancelled':
        return <XCircle size={16} className="text-red-600" />
    }
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
    }
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-500">Orders will appear here when customers place them.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Order #{order.id.slice(-8)}
              </h3>
              <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
              {order.phone_number && (
                <p className="text-sm text-gray-600 mt-1">
                  Phone: {order.phone_number}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(order.status)}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Items:</h4>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.product_name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="text-lg font-semibold">
              Total: {formatPrice(order.total_price)}
            </div>
            
            {onUpdateStatus && order.status !== 'completed' && order.status !== 'cancelled' && (
              <div className="flex gap-2">
                {order.status === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => onUpdateStatus(order.id, 'confirmed')}
                      disabled={loading}
                    >
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => onUpdateStatus(order.id, 'cancelled')}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                {order.status === 'confirmed' && (
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => onUpdateStatus(order.id, 'completed')}
                    disabled={loading}
                  >
                    Complete
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderList