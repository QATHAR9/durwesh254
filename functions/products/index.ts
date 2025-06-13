export interface Env {
  DB: D1Database;
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
      if (request.method !== "GET") {
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

      // Fetch all products from database
      const result = await env.DB.prepare(`
        SELECT id, name, description, price, imageUrl, category, inStock, createdAt, updatedAt
        FROM products
        ORDER BY createdAt DESC
      `).all();

      if (!result.success) {
        throw new Error("Failed to fetch products from database");
      }

      // Transform the data to match the expected format
      const products = result.results.map((row: any) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        price: row.price,
        imageUrl: row.imageUrl,
        category: row.category,
        inStock: Boolean(row.inStock),
        createdAt: row.createdAt,
        updatedAt: row.updatedAt
      }));

      return new Response(
        JSON.stringify({ 
          success: true, 
          products,
          count: products.length
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );

    } catch (error) {
      console.error("Error fetching products:", error);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: error instanceof Error ? error.message : "Internal server error",
          products: []
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