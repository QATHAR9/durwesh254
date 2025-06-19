// Cloudflare D1 Database Types and Helpers

export interface D1Product {
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

export interface D1Order {
  id: number
  items: string // JSON string
  total_price: number
  customer_name?: string
  phone_number?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface D1OrderItem {
  product_id: number
  product_name: string
  quantity: number
  price: number
}

export interface D1Environment {
  DB: D1Database
}

// Database helper functions
export class D1Helper {
  constructor(private db: D1Database) {}

  // Product operations
  async getAllProducts(): Promise<D1Product[]> {
    const result = await this.db
      .prepare('SELECT * FROM products ORDER BY created_at DESC')
      .all<D1Product>()
    
    return result.results || []
  }

  async getProductById(id: number): Promise<D1Product | null> {
    const result = await this.db
      .prepare('SELECT * FROM products WHERE id = ?')
      .bind(id)
      .first<D1Product>()
    
    return result || null
  }

  async createProduct(product: Omit<D1Product, 'id' | 'created_at' | 'updated_at'>): Promise<D1Product> {
    const now = new Date().toISOString()
    
    const result = await this.db
      .prepare(`
        INSERT INTO products (name, description, price, image_url, category, in_stock, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        RETURNING *
      `)
      .bind(
        product.name,
        product.description,
        product.price,
        product.image_url,
        product.category,
        product.in_stock,
        now,
        now
      )
      .first<D1Product>()

    if (!result) {
      throw new Error('Failed to create product')
    }

    return result
  }

  async updateProduct(id: number, updates: Partial<Omit<D1Product, 'id' | 'created_at'>>): Promise<D1Product> {
    const now = new Date().toISOString()
    
    // Build dynamic update query
    const fields = Object.keys(updates).filter(key => key !== 'id' && key !== 'created_at')
    const setClause = fields.map(field => `${field} = ?`).join(', ')
    const values = fields.map(field => updates[field as keyof typeof updates])
    
    const result = await this.db
      .prepare(`
        UPDATE products 
        SET ${setClause}, updated_at = ?
        WHERE id = ?
        RETURNING *
      `)
      .bind(...values, now, id)
      .first<D1Product>()

    if (!result) {
      throw new Error('Product not found or update failed')
    }

    return result
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await this.db
      .prepare('DELETE FROM products WHERE id = ?')
      .bind(id)
      .run()

    return result.success && result.changes > 0
  }

  async toggleProductStock(id: number): Promise<D1Product> {
    const now = new Date().toISOString()
    
    const result = await this.db
      .prepare(`
        UPDATE products 
        SET in_stock = NOT in_stock, updated_at = ?
        WHERE id = ?
        RETURNING *
      `)
      .bind(now, id)
      .first<D1Product>()

    if (!result) {
      throw new Error('Product not found')
    }

    return result
  }

  // Order operations
  async getAllOrders(): Promise<D1Order[]> {
    const result = await this.db
      .prepare('SELECT * FROM orders ORDER BY created_at DESC')
      .all<D1Order>()
    
    return result.results || []
  }

  async createOrder(order: {
    items: D1OrderItem[]
    total_price: number
    customer_name?: string
    phone_number?: string
  }): Promise<D1Order> {
    const now = new Date().toISOString()
    
    const result = await this.db
      .prepare(`
        INSERT INTO orders (items, total_price, customer_name, phone_number, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, 'pending', ?, ?)
        RETURNING *
      `)
      .bind(
        JSON.stringify(order.items),
        order.total_price,
        order.customer_name || null,
        order.phone_number || null,
        now,
        now
      )
      .first<D1Order>()

    if (!result) {
      throw new Error('Failed to create order')
    }

    return result
  }

  async updateOrderStatus(id: number, status: D1Order['status']): Promise<D1Order> {
    const now = new Date().toISOString()
    
    const result = await this.db
      .prepare(`
        UPDATE orders 
        SET status = ?, updated_at = ?
        WHERE id = ?
        RETURNING *
      `)
      .bind(status, now, id)
      .first<D1Order>()

    if (!result) {
      throw new Error('Order not found')
    }

    return result
  }
}