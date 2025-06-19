// Toggle product stock status in D1 database

import { D1Helper, D1Environment } from '../../lib/d1'

export const onRequestPatch: PagesFunction<D1Environment> = async (context) => {
  try {
    const productId = parseInt(context.params.id as string)
    
    if (isNaN(productId)) {
      return Response.json({
        success: false,
        error: 'Invalid product ID'
      }, { status: 400 })
    }

    const db = new D1Helper(context.env.DB)
    const product = await db.toggleProductStock(productId)

    return Response.json({
      success: true,
      message: `Product ${product.in_stock ? 'marked as in stock' : 'marked as out of stock'}`,
      product
    })

  } catch (error) {
    console.error('Error toggling stock:', error)
    
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to toggle stock status'
    }, { status: 500 })
  }
}