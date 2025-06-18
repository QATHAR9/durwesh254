import React from 'react'
import { ShoppingBag, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { Product } from '../types'
import Button from './ui/Button'

interface ProductCardProps {
  product: Product
  isAdmin?: boolean
  onAddToCart?: (product: Product) => void
  onEdit?: (product: Product) => void
  onDelete?: (product: Product) => void
  onToggleStock?: (product: Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isAdmin = false,
  onAddToCart,
  onEdit,
  onDelete,
  onToggleStock
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(price)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <div className="relative aspect-square">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/400x400?text=No+Image'
          }}
        />
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            {product.category}
          </p>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.in_stock 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.in_stock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Actions */}
        {isAdmin ? (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEdit?.(product)}
              className="flex-1"
            >
              <Edit size={16} className="mr-1" />
              Edit
            </Button>
            <Button
              variant={product.in_stock ? "secondary" : "success"}
              size="sm"
              onClick={() => onToggleStock?.(product)}
            >
              {product.in_stock ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete?.(product)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ) : (
          <Button
            variant={product.in_stock ? "primary" : "secondary"}
            disabled={!product.in_stock}
            onClick={() => product.in_stock && onAddToCart?.(product)}
            className="w-full"
          >
            <ShoppingBag size={16} className="mr-2" />
            {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        )}
      </div>
    </div>
  )
}

export default ProductCard