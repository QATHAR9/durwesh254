// Update product in D1 database

import { D1Helper, D1Environment } from '../../lib/d1'

export const onRequestPut: PagesFunction<D1Environment> = async (context) => {
  try {
    const productId = parseInt(context.params.id as string)
    
    if (isNaN(productId)) {
      return Response.json({
        success: false,
        error: 'Invalid product ID'
      }, { status: 400 })
    }

    const updates = await context.request.json()
    
    const db = new D1Helper(context.env.DB)
    const product = await db.updateProduct(productId, updates)

    return Response.json({
      success: true,
      message: 'Product updated successfully',
      product
    })

  } catch (error) {
    console.error('Error updating product:', error)
    
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update product'
    }, { status: 500 })
  }
}