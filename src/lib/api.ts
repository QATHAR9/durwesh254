// API client for Cloudflare D1 backend

import { Product, Order, ProductFormData, OrderItem } from '../types'

const API_BASE = '/functions'

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }))
      throw new Error(error.error || `HTTP ${response.status}`)
    }

    return response.json()
  }

  // Product API methods
  async getProducts(): Promise<Product[]> {
    const response = await this.request<{ products: Product[] }>('/products')
    return response.products
  }

  async createProduct(product: ProductFormData): Promise<Product> {
    const response = await this.request<{ product: Product }>('/add-product', {
      method: 'POST',
      body: JSON.stringify(product),
    })
    return response.product
  }

  async updateProduct(id: number, updates: Partial<ProductFormData>): Promise<Product> {
    const response = await this.request<{ product: Product }>(`/update-product/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
    return response.product
  }

  async deleteProduct(id: number): Promise<void> {
    await this.request(`/delete-product/${id}`, {
      method: 'DELETE',
    })
  }

  async toggleProductStock(id: number): Promise<Product> {
    const response = await this.request<{ product: Product }>(`/toggle-stock/${id}`, {
      method: 'PATCH',
    })
    return response.product
  }

  // Order API methods
  async getOrders(): Promise<Order[]> {
    const response = await this.request<{ orders: Order[] }>('/orders')
    return response.orders
  }

  async createOrder(orderData: {
    items: OrderItem[]
    total_price: number
    customer_name?: string
    phone_number?: string
  }): Promise<Order> {
    const response = await this.request<{ order: Order }>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
    return response.order
  }

  async updateOrderStatus(id: number, status: Order['status']): Promise<Order> {
    const response = await this.request<{ order: Order }>(`/update-order-status/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
    return response.order
  }
}

export const api = new ApiClient()