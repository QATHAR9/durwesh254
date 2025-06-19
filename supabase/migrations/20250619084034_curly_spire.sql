-- Cloudflare D1 Database Schema for DURWESH Perfume Store

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price REAL NOT NULL CHECK (price > 0),
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  items TEXT NOT NULL, -- JSON string of order items
  total_price REAL NOT NULL CHECK (total_price > 0),
  customer_name TEXT,
  phone_number TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Insert sample data
INSERT OR IGNORE INTO products (name, description, price, image_url, category, in_stock) VALUES
  ('Arabian Oud', 'A luxurious and captivating fragrance with rich oud notes', 5900, 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400', 'For Him', true),
  ('Rose Elegance', 'Delicate rose petals with a touch of sophistication', 4500, 'https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg?auto=compress&cs=tinysrgb&w=400', 'For Her', true),
  ('Musk Blossom', 'Fresh and floral with subtle musk undertones', 3800, 'https://images.pexels.com/photos/965991/pexels-photo-965991.jpeg?auto=compress&cs=tinysrgb&w=400', 'Unisex', true),
  ('Amber Nights', 'Warm amber with hints of vanilla and spice', 6200, 'https://images.pexels.com/photos/965992/pexels-photo-965992.jpeg?auto=compress&cs=tinysrgb&w=400', 'For Him', false),
  ('Jasmine Dreams', 'Intoxicating jasmine with citrus top notes', 4200, 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=400', 'For Her', true),
  ('Sandalwood Serenity', 'Creamy sandalwood with earthy undertones', 5500, 'https://images.pexels.com/photos/1190830/pexels-photo-1190830.jpeg?auto=compress&cs=tinysrgb&w=400', 'Unisex', true);