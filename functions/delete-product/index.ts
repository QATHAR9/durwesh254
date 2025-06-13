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
      if (request.method !== "DELETE") {
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

      // Extract product ID from URL path
      const url = new URL(request.url);
      const pathParts = url.pathname.split('/');
      const productId = pathParts[pathParts.length - 1];

      if (!productId) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: "Product ID is required" 
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

      // Check if product exists
      const existingProduct = await env.DB.prepare(`
        SELECT id FROM products WHERE id = ?
      `).bind(productId).first();

      if (!existingProduct) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: "Product not found" 
          }),
          {
            status: 404,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }

      // Delete product from database
      const result = await env.DB.prepare(`
        DELETE FROM products WHERE id = ?
      `).bind(productId).run();

      if (!result.success) {
        throw new Error("Failed to delete product from database");
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Product deleted successfully"
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
      console.error("Error deleting product:", error);
      
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