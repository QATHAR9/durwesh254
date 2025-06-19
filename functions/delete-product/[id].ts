// Delete product from D1 database

import { D1Helper, D1Environment } from '../../lib/d1'

export const onRequestDelete: PagesFunction<D1Environment> = async (context) => {
  try {
    const productId = parseInt(context.params.id as string)
    
    if (isNaN(productId)) {
      return Response.json({
        success: false,
        error: 'Invalid product ID'
      }, { status: 400 })
    }

    const db = new D1Helper(context.env.DB)
    const deleted = await db.deleteProduct(productId)

    if (!deleted) {
      return Response.json({
        success: false,
        error: 'Product not found'
      }, { status: 404 })
    }

    return Response.json({
      success: true,
      message: 'Product deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting product:', error)
    
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete product'
    }, { status: 500 })
  }
}