# DURWESH Perfume Store - Cloudflare D1 Integration

This project has been enhanced with Cloudflare D1 database integration for the admin panel.

## Database Configuration

**Database Name**: `durwesh-db`  
**Database ID**: `c5d9b184-af24-4cf1-a388-a96b45b60776`

## Features

- **Admin Panel**: Full CRUD operations for product management
- **Cloudflare D1**: Serverless SQL database for product storage (production)
- **Local Storage Fallback**: Works in development without API
- **API Endpoints**: RESTful API for product operations
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Automatic refresh after operations

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server (uses sample data)
npm run dev
```

### Database Setup

```bash
# Initialize the database with sample data
npm run db:migrate

# For local development database
npm run db:migrate:local
```

### Production Deployment

```bash
# Build and deploy to Cloudflare Pages
npm run deploy

# Or deploy functions separately
npm run deploy:functions
```

## Development vs Production

### Development Mode
- Uses sample data and localStorage for product management
- No API calls required
- Perfect for local development and testing

### Production Mode
- Uses Cloudflare D1 database via API endpoints
- Falls back to localStorage if API is not available
- Seamless transition between modes

## API Endpoints

### GET /api/products
Fetches all products from the D1 database.

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
Adds a new product to the D1 database.

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

### DELETE /api/delete-product/{id}
Deletes a product from the D1 database.

## Database Schema

The D1 database (`durwesh-db`) uses the following schema:

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

## Deployment Steps

### 1. Database Initialization
The database has been configured with ID: `c5d9b184-af24-4cf1-a388-a96b45b60776`

Run the migration to set up tables and sample data:
```bash
npm run db:migrate
```

### 2. Deploy Functions
Deploy the Cloudflare Functions that handle API requests:
```bash
npm run deploy:functions
```

### 3. Deploy Frontend
Build and deploy the React application:
```bash
npm run deploy
```

### 4. Configure Routes
Ensure your Cloudflare Pages project has the correct function routes configured for `/api/*` endpoints.

## Admin Panel Features

### Product Management
- ✅ Add new products with validation
- ✅ View all products in responsive grid
- ✅ Edit existing products (localStorage fallback)
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
- **Production**: Uses Cloudflare D1 database, falls back to localStorage if needed

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run deploy` - Build and deploy to Cloudflare Pages
- `npm run deploy:functions` - Deploy Cloudflare Functions only
- `npm run db:migrate` - Run database migration
- `npm run db:migrate:local` - Run migration on local database

## Error Handling

The application includes comprehensive error handling:
- Input validation
- Database connection errors
- Missing resource errors (404)
- Method not allowed errors (405)
- Internal server errors (500)
- Graceful fallback to localStorage

## CORS Support

All API endpoints include CORS headers to support cross-origin requests.

## Troubleshooting

### Database Connection Issues
1. Verify the database ID in `wrangler.toml` matches your D1 database
2. Run `npm run db:migrate` to ensure tables exist
3. Check Cloudflare dashboard for database status

### API Not Available
If you see "API not available. Using local storage." message:
1. Ensure Cloudflare Functions are deployed
2. Check function logs in Cloudflare dashboard
3. Verify routing configuration
4. The application will continue to work with localStorage

### Development Issues
- Ensure you're running `npm run dev`
- Check console for any errors
- Verify all dependencies are installed with `npm install`

The application is designed to be resilient and will always provide a working experience, even if the database is unavailable.