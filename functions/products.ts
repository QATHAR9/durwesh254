// Get all products from D1 database

import { D1Helper, D1Environment } from '../lib/d1'

export const onRequestGet: PagesFunction<D1Environment> = async (context) => {
  try {
    const db = new D1Helper(context.env.DB)
    const products = await db.getAllProducts()

    return Response.json({
      success: true,
      products,
      count: products.length
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch products',
      products: []
    }, { status: 500 })
  }
}