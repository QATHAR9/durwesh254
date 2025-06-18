export interface Product {
  id: string
  name: string
  price: number
  image_url: string
  description: string
  category: string
  in_stock: boolean
  created_at: string
  updated_at: string
}

export interface OrderItem {
  product_id: string
  product_name: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  items: OrderItem[]
  total_price: number
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
  price: number
  image_url: string
  description: string
  category: string
  in_stock: boolean
}