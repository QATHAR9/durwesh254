-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price > 0),
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  items JSONB NOT NULL,
  total_price DECIMAL(10,2) NOT NULL CHECK (total_price > 0),
  phone_number TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies for products table
-- Allow public read access to products
CREATE POLICY "Allow public read access to products" ON products
  FOR SELECT USING (true);

-- Allow authenticated users to manage products (admin only)
CREATE POLICY "Allow authenticated users to manage products" ON products
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for orders table
-- Allow public insert for orders (customers can create orders)
CREATE POLICY "Allow public insert for orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read and update orders (admin only)
CREATE POLICY "Allow authenticated users to manage orders" ON orders
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert some sample data
INSERT INTO products (name, price, image_url, description, category, in_stock) VALUES
  ('Arabian Oud', 5900, 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400', 'A luxurious and captivating fragrance with rich oud notes', 'For Him', true),
  ('Rose Elegance', 4500, 'https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg?auto=compress&cs=tinysrgb&w=400', 'Delicate rose petals with a touch of sophistication', 'For Her', true),
  ('Musk Blossom', 3800, 'https://images.pexels.com/photos/965991/pexels-photo-965991.jpeg?auto=compress&cs=tinysrgb&w=400', 'Fresh and floral with subtle musk undertones', 'Unisex', true),
  ('Amber Nights', 6200, 'https://images.pexels.com/photos/965992/pexels-photo-965992.jpeg?auto=compress&cs=tinysrgb&w=400', 'Warm amber with hints of vanilla and spice', 'For Him', false),
  ('Jasmine Dreams', 4200, 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=400', 'Intoxicating jasmine with citrus top notes', 'For Her', true),
  ('Sandalwood Serenity', 5500, 'https://images.pexels.com/photos/1190830/pexels-photo-1190830.jpeg?auto=compress&cs=tinysrgb&w=400', 'Creamy sandalwood with earthy undertones', 'Unisex', true)
ON CONFLICT (id) DO NOTHING;