export interface Env {
  DB: D1Database;
}

interface ProductData {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    try {
      if (request.method !== "POST") {
        return new Response(
          JSON.stringify({ success: false, error: "Method not allowed" }),
          {
            status: 405,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }

      const productData: ProductData = await request.json();

      // Validate required fields
      if (!productData.name || !productData.description || !productData.price || !productData.imageUrl || !productData.category) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: "Missing required fields: name, description, price, imageUrl, category" 
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }

      // Validate price
      if (typeof productData.price !== 'number' || productData.price <= 0) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: "Price must be a positive number" 
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }

      // Validate URL format
      try {
        new URL(productData.imageUrl);
      } catch {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: "Invalid image URL format" 
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }

      // Generate unique ID
      const id = crypto.randomUUID();
      const createdAt = new Date().toISOString();

      // Insert product into database
      const result = await env.DB.prepare(`
        INSERT INTO products (id, name, description, price, imageUrl, category, inStock, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        id,
        productData.name.trim(),
        productData.description.trim(),
        productData.price,
        productData.imageUrl.trim(),
        productData.category,
        productData.inStock ? 1 : 0,
        createdAt,
        createdAt
      ).run();

      if (!result.success) {
        throw new Error("Failed to insert product into database");
      }

      // Return the created product
      const createdProduct = {
        id,
        name: productData.name.trim(),
        description: productData.description.trim(),
        price: productData.price,
        imageUrl: productData.imageUrl.trim(),
        category: productData.category,
        inStock: productData.inStock,
        createdAt,
        updatedAt: createdAt
      };

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Product added successfully",
          product: createdProduct
        }),
        {
          status: 201,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );

    } catch (error) {
      console.error("Error adding product:", error);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: error instanceof Error ? error.message : "Internal server error" 
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
  },
};