-- DROP TABLE IF EXISTS products; -- Uncomment if you want to reset

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL CHECK (price > 0),
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  in_stock BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- Sample Data
INSERT INTO products (name, description, price, image_url, category, in_stock)
VALUES
('Wasim Akram 502', 'A bold and sophisticated fragrance for the modern gentleman.', 5900, 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg', 'For Him', TRUE),
('Mika', 'Fresh and vibrant scent that captivates the senses.', 3000, 'https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg', 'Unisex', TRUE),
('Wasim Akram 502 For Her', 'Elegant and feminine fragrance for the modern woman.', 6100, 'https://images.pexels.com/photos/965991/pexels-photo-965991.jpeg', 'For Her', TRUE),
('Khumar', 'A mesmerizing blend of oriental notes.', 4300, 'https://images.pexels.com/photos/965992/pexels-photo-965992.jpeg', 'For Him', TRUE);
