# DURWESH Perfume Store - Cloudflare D1 Integration

This project has been enhanced with Cloudflare D1 database integration for the admin panel.

## Features

- **Admin Panel**: Full CRUD operations for product management
- **Cloudflare D1**: Serverless SQL database for product storage (production)
- **Local Storage Fallback**: Works in development without API
- **API Endpoints**: RESTful API for product operations
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Automatic refresh after operations

## Development vs Production

### Development Mode
- Uses sample data and localStorage for product management
- No API calls required
- Perfect for local development and testing

### Production Mode
- Attempts to use Cloudflare D1 API endpoints
- Falls back to localStorage if API is not available
- Seamless transition between modes

## API Endpoints

### GET /api/products
Fetches all products from the database.

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "id": "uuid",
      "name": "Product Name",
      "description": "Product description",
      "price": 5900,
      "imageUrl": "https://example.com/image.jpg",
      "category": "For Him",
      "inStock": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

### POST /api/add-product
Adds a new product to the database.

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 5900,
  "imageUrl": "https://example.com/image.jpg",
  "category": "For Him",
  "inStock": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product added successfully",
  "product": {
    "id": "generated-uuid",
    "name": "Product Name",
    "description": "Product description",
    "price": 5900,
    "imageUrl": "https://example.com/image.jpg",
    "category": "For Him",
    "inStock": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### DELETE /api/delete-product/{id}
Deletes a product from the database.

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

## Database Schema

The D1 database uses the following schema:

```sql
CREATE TABLE products (
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
```

## Setup Instructions

### Local Development

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd durwesh-perfume-store
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   The application will run in development mode using sample data and localStorage.

### Production Deployment with Cloudflare

#### 1. Create Cloudflare D1 Database

```bash
# Create a new D1 database
npx wrangler d1 create durwesh-perfumes

# Note the database ID from the output and update wrangler.toml
```

#### 2. Initialize Database Schema

```bash
# Apply the schema to your database
npx wrangler d1 execute durwesh-perfumes --file=./supabase/migrations/20250613085628_falling_hall.sql
```

#### 3. Update Configuration

Update your `wrangler.toml` with your actual domain and database IDs:

```toml
[[env.production.d1_databases]]
binding = "DB"
database_name = "durwesh-perfumes"
database_id = "your-actual-database-id"

[[env.production.routes]]
pattern = "yourdomain.com/api/*"
zone_name = "yourdomain.com"
```

#### 4. Deploy Functions

```bash
# Deploy to Cloudflare Pages
npm run build
npx wrangler pages deploy dist

# Or deploy functions separately
npx wrangler deploy
```

## Admin Panel Features

### Product Management
- ✅ Add new products with validation
- ✅ View all products in responsive grid
- ✅ Edit existing products
- ✅ Delete products with confirmation
- ✅ Real-time stock status
- ✅ Image preview functionality
- ✅ Form validation and error handling
- ✅ Success/error notifications
- ✅ Automatic list refresh after operations
- ✅ Fallback to localStorage when API unavailable

### Responsive Design
- ✅ Mobile-first approach
- ✅ Tablet and desktop optimized
- ✅ Touch-friendly interface
- ✅ Accessible form controls

### Data Validation
- ✅ Required field validation
- ✅ URL format validation for images
- ✅ Price validation (positive numbers)
- ✅ Character limits for descriptions
- ✅ Category selection validation

## Environment Detection

The application automatically detects the environment:

- **Development**: Uses sample data and localStorage
- **Production**: Attempts API calls, falls back to localStorage if needed

## Error Handling

The API includes comprehensive error handling:
- Input validation
- Database connection errors
- Missing resource errors (404)
- Method not allowed errors (405)
- Internal server errors (500)
- Graceful fallback to localStorage

All errors return a consistent JSON format:
```json
{
  "success": false,
  "error": "Error message description"
}
```

## CORS Support

All API endpoints include CORS headers to support cross-origin requests from your frontend application.

## Troubleshooting

### API Not Available
If you see "API not available. Using local storage." message:
1. Check if Cloudflare Functions are deployed
2. Verify wrangler.toml configuration
3. Ensure database is properly set up
4. The application will continue to work with localStorage

### Development Issues
- Ensure you're running `npm run dev`
- Check console for any errors
- Verify all dependencies are installed

### Production Issues
- Check Cloudflare dashboard for function logs
- Verify database connection
- Ensure proper routing configuration

The application is designed to be resilient and will always provide a working experience, even if the API is unavailable.