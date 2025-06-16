-- Create products table for DURWESH perfume store
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price REAL NOT NULL CHECK (price > 0),
  imageUrl TEXT NOT NULL,
  category TEXT NOT NULL,
  inStock INTEGER NOT NULL DEFAULT 1 CHECK (inStock IN (0, 1)),
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_inStock ON products(inStock);
CREATE INDEX IF NOT EXISTS idx_products_createdAt ON products(createdAt);

-- Insert sample data
INSERT OR IGNORE INTO products (id, name, description, price, imageUrl, category, inStock, createdAt, updatedAt) VALUES
('1', 'Wasim Akram 502', 'A bold and sophisticated fragrance for the modern gentleman.', 5900, 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'For Him', 1, datetime('now'), datetime('now')),
('2', 'Mika', 'Fresh and vibrant scent that captivates the senses.', 3000, 'https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Unisex', 1, datetime('now'), datetime('now')),
('3', 'Wasim Akram 502 For Her', 'Elegant and feminine fragrance for the modern woman.', 6100, 'https://images.pexels.com/photos/965991/pexels-photo-965991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'For Her', 1, datetime('now'), datetime('now')),
('4', 'Khumar', 'A mesmerizing blend of oriental notes.', 4300, 'https://images.pexels.com/photos/965992/pexels-photo-965992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'For Him', 1, datetime('now'), datetime('now'));