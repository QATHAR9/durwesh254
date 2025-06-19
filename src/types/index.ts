// Updated types for Cloudflare D1

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category: string
  in_stock: boolean
  created_at: string
  updated_at: string
}

export interface OrderItem {
  product_id: number
  product_name: string
  quantity: number
  price: number
}

export interface Order {
  id: number
  items: OrderItem[]
  total_price: number
  customer_name?: string
  phone_number?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface ProductFormData {
  name: string
  description: string
  price: number
  image_url: string
  category: string
  in_stock: boolean
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  error?: string
  data?: T
}

export interface ProductsResponse extends ApiResponse {
  products: Product[]
  count: number
}

export interface OrdersResponse extends ApiResponse {
  orders: Order[]
  count: number
}