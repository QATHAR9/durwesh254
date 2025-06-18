# DURWESH Perfume Store Admin Panel

A modern, mobile-responsive perfume store admin panel built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### 🛍️ **Customer Features**
- Browse premium perfume collection
- Add products to cart
- Order via WhatsApp integration
- Responsive design for all devices

### 🔧 **Admin Features**
- Secure authentication with Supabase
- Complete product management (CRUD operations)
- Order tracking and status management
- Real-time dashboard with statistics
- Mobile-responsive admin interface

### 🏗️ **Technical Features**
- TypeScript for type safety
- Supabase for backend and authentication
- Tailwind CSS for styling
- React Hook Form for form handling
- Modular component architecture

## Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd perfume-store-admin
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the migration file `supabase/migrations/create_tables.sql`

This will create:
- `products` table with sample data
- `orders` table for order tracking
- Proper indexes and RLS policies

### 4. Admin User Setup

1. Go to Authentication > Users in your Supabase dashboard
2. Create a new user with email/password
3. This user will have admin access to the panel

### 5. Run the Application

```bash
npm run dev
```

Visit:
- `http://localhost:5173/` - Customer store
- `http://localhost:5173/admin` - Admin panel

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   └── LoadingSpinner.tsx
│   ├── ProductCard.tsx     # Product display component
│   ├── ProductForm.tsx     # Product add/edit form
│   └── OrderList.tsx       # Order management component
├── pages/
│   ├── index.tsx          # Customer store page
│   └── admin.tsx          # Admin dashboard
├── types/
│   └── index.ts           # TypeScript type definitions
└── App.tsx                # Main app component

lib/
└── supabase.ts            # Supabase client and API functions

supabase/
└── migrations/
    └── create_tables.sql  # Database schema
```

## API Functions

### Products API
- `productAPI.getAll()` - Fetch all products
- `productAPI.getById(id)` - Get single product
- `productAPI.create(data)` - Create new product
- `productAPI.update(id, data)` - Update product
- `productAPI.delete(id)` - Delete product
- `productAPI.toggleStock(id)` - Toggle stock status

### Orders API
- `orderAPI.create(data)` - Create new order
- `orderAPI.getAll()` - Fetch all orders
- `orderAPI.updateStatus(id, status)` - Update order status

### Auth API
- `authAPI.signIn(email, password)` - Admin login
- `authAPI.signOut()` - Admin logout
- `authAPI.getCurrentUser()` - Get current user
- `authAPI.onAuthStateChange(callback)` - Listen to auth changes

## Database Schema

### Products Table
```sql
- id (UUID, Primary Key)
- name (TEXT, Required)
- price (DECIMAL, Required, > 0)
- image_url (TEXT, Required)
- description (TEXT, Required)
- category (TEXT, Required)
- in_stock (BOOLEAN, Default: true)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

### Orders Table
```sql
- id (UUID, Primary Key)
- items (JSONB, Required) - Array of order items
- total_price (DECIMAL, Required, > 0)
- phone_number (TEXT, Optional)
- status (TEXT, Default: 'pending')
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

## WhatsApp Integration

When customers click "Order via WhatsApp":
1. Order is saved to the database
2. WhatsApp message is generated with order details
3. Customer is redirected to WhatsApp with pre-filled message
4. Cart is cleared after successful order

Example WhatsApp message:
```
Hi! I'm interested in:
- Arabian Oud (Qty: 2)
- Musk Blossom (Qty: 1)
Total: KES 5,000
```

## Security

- Row Level Security (RLS) enabled on all tables
- Public read access to products
- Authenticated access required for admin operations
- CORS properly configured
- Input validation on both client and server

## Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interface
- Optimized for all screen sizes

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Connect your repository
2. Set environment variables
3. Deploy the `dist` folder

### Environment Variables for Production
```env
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details