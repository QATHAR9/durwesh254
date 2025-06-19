# DURWESH Perfume Store - Cloudflare D1 Edition

A fully edge-native perfume store built with React, Vite, Tailwind CSS, and Cloudflare D1 database. Ultra-low latency with global edge deployment.

## 🚀 **Tech Stack**

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Cloudflare Workers + Pages Functions
- **Database**: Cloudflare D1 (SQLite at the edge)
- **Hosting**: Cloudflare Pages
- **Real-time**: Polling-based updates (5s intervals)

## 🏗️ **Architecture**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React App     │───▶│  Pages Functions │───▶│   D1 Database   │
│  (Cloudflare    │    │   (API Layer)    │    │   (SQLite)      │
│     Pages)      │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 📦 **Features**

### **Customer Store**
- ✅ Browse products with real-time stock updates
- ✅ Add to cart with quantity management
- ✅ WhatsApp integration for orders
- ✅ Responsive design for all devices
- ✅ Auto-refresh every 5 seconds

### **Admin Panel**
- ✅ Product management (CRUD operations)
- ✅ Order tracking and status updates
- ✅ Real-time dashboard with statistics
- ✅ Image URL validation with preview
- ✅ Stock status toggle

### **Database Schema**
```sql
products:
- id (INTEGER PRIMARY KEY)
- name, description, price
- image_url, category
- in_stock (BOOLEAN)
- created_at, updated_at

orders:
- id (INTEGER PRIMARY KEY)
- items (JSON string)
- total_price, customer_name, phone_number
- status (pending/confirmed/completed/cancelled)
- created_at, updated_at
```

## 🚀 **Quick Start**

### 1. **Setup Cloudflare D1 Database**

```bash
# Create D1 database
npm run db:create

# This will output your database ID - copy it to wrangler.toml
```

### 2. **Configure wrangler.toml**

Update `wrangler.toml` with your database ID:

```toml
[[d1_databases]]
binding = "DB"
database_name = "perfume-db"
database_id = "your-database-id-here"  # Replace with actual ID
```

### 3. **Initialize Database**

```bash
# Run migrations
npm run db:migrate

# For local development
npm run db:migrate:local
```

### 4. **Development**

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Visit http://localhost:5173
```

### 5. **Deploy to Production**

```bash
# Build and deploy
npm run deploy

# Your site will be live at: https://your-project.pages.dev
```

## 📁 **Project Structure**

```
├── functions/                 # Cloudflare Pages Functions (API)
│   ├── _middleware.ts        # CORS middleware
│   ├── products.ts           # GET /functions/products
│   ├── add-product.ts        # POST /functions/add-product
│   ├── update-product/[id].ts # PUT /functions/update-product/123
│   ├── delete-product/[id].ts # DELETE /functions/delete-product/123
│   ├── toggle-stock/[id].ts  # PATCH /functions/toggle-stock/123
│   ├── orders.ts             # GET/POST /functions/orders
│   └── update-order-status/[id].ts # PATCH /functions/update-order-status/123
├── lib/
│   ├── d1.ts                 # D1 database helpers
│   └── api.ts                # Frontend API client
├── src/
│   ├── components/           # React components
│   ├── pages/               # Route pages
│   ├── types/               # TypeScript types
│   └── lib/                 # Utilities
├── schema.sql               # Database schema
├── wrangler.toml           # Cloudflare configuration
└── package.json
```

## 🔧 **API Endpoints**

### **Products**
- `GET /functions/products` - List all products
- `POST /functions/add-product` - Create product
- `PUT /functions/update-product/[id]` - Update product
- `DELETE /functions/delete-product/[id]` - Delete product
- `PATCH /functions/toggle-stock/[id]` - Toggle stock status

### **Orders**
- `GET /functions/orders` - List all orders
- `POST /functions/orders` - Create order
- `PATCH /functions/update-order-status/[id]` - Update order status

## 🌐 **Real-time Updates**

The app uses polling-based real-time updates:

- **Frontend polls every 5 seconds** for product/order changes
- **Optimistic updates** for immediate UI feedback
- **Error handling** with automatic retry
- **Loading states** during operations

## 💰 **Cost Optimization**

This setup is designed for **Cloudflare's Free Tier**:

- **Pages**: 500 builds/month, unlimited bandwidth
- **Workers**: 100,000 requests/day
- **D1**: 5 million reads, 100,000 writes/day
- **Global edge deployment** included

## 🔐 **Security Features**

- ✅ **Input validation** on all endpoints
- ✅ **CORS headers** properly configured
- ✅ **SQL injection protection** with prepared statements
- ✅ **Type safety** with TypeScript
- ✅ **Error handling** with proper status codes

## 📱 **Mobile Optimization**

- ✅ **Touch-friendly** interface
- ✅ **Responsive grid** layouts
- ✅ **Fast loading** with edge caching
- ✅ **Offline-ready** with service worker (optional)

## 🚀 **Performance**

- **Sub-100ms response times** globally
- **Edge caching** for static assets
- **Optimized bundle** with code splitting
- **Real-time updates** without WebSockets

## 🛠️ **Development Commands**

```bash
# Database operations
npm run db:create          # Create D1 database
npm run db:migrate         # Run migrations (production)
npm run db:migrate:local   # Run migrations (local)

# Development
npm run dev               # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Deployment
npm run deploy           # Deploy to Cloudflare Pages
```

## 🌍 **Global Edge Deployment**

Your perfume store will be deployed to **200+ cities worldwide** with:

- **Ultra-low latency** (sub-100ms globally)
- **99.9% uptime** SLA
- **Automatic scaling** to handle traffic spikes
- **DDoS protection** included
- **SSL/TLS** encryption by default

## 📊 **Monitoring**

Monitor your store with Cloudflare Analytics:

- **Real-time traffic** metrics
- **Performance insights**
- **Error tracking**
- **Geographic distribution**

Perfect for a modern, scalable perfume store with global reach! 🌟