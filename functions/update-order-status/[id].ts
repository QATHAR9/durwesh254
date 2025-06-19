// Update order status in D1 database

import { D1Helper, D1Environment } from '../../lib/d1'

export const onRequestPatch: PagesFunction<D1Environment> = async (context) => {
  try {
    const orderId = parseInt(context.params.id as string)
    
    if (isNaN(orderId)) {
      return Response.json({
        success: false,
        error: 'Invalid order ID'
      }, { status: 400 })
    }

    const { status } = await context.request.json()
    
    if (!status || !['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return Response.json({
        success: false,
        error: 'Invalid status. Must be one of: pending, confirmed, completed, cancelled'
      }, { status: 400 })
    }

    const db = new D1Helper(context.env.DB)
    const order = await db.updateOrderStatus(orderId, status)

    return Response.json({
      success: true,
      message: 'Order status updated successfully',
      order: {
        ...order,
        items: JSON.parse(order.items)
      }
    })

  } catch (error) {
    console.error('Error updating order status:', error)
    
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update order status'
    }, { status: 500 })
  }
}