// Get all orders from D1 database

import { D1Helper, D1Environment } from '../lib/d1'

export const onRequestGet: PagesFunction<D1Environment> = async (context) => {
  try {
    const db = new D1Helper(context.env.DB)
    const orders = await db.getAllOrders()

    // Parse JSON items for each order
    const ordersWithParsedItems = orders.map(order => ({
      ...order,
      items: JSON.parse(order.items)
    }))

    return Response.json({
      success: true,
      orders: ordersWithParsedItems,
      count: orders.length
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch orders',
      orders: []
    }, { status: 500 })
  }
}

export const onRequestPost: PagesFunction<D1Environment> = async (context) => {
  try {
    const orderData = await context.request.json()

    // Validate required fields
    if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
      return Response.json({
        success: false,
        error: 'Order must contain at least one item'
      }, { status: 400 })
    }

    if (!orderData.total_price || orderData.total_price <= 0) {
      return Response.json({
        success: false,
        error: 'Total price must be greater than 0'
      }, { status: 400 })
    }

    const db = new D1Helper(context.env.DB)
    const order = await db.createOrder({
      items: orderData.items,
      total_price: orderData.total_price,
      customer_name: orderData.customer_name,
      phone_number: orderData.phone_number
    })

    return Response.json({
      success: true,
      message: 'Order created successfully',
      order: {
        ...order,
        items: JSON.parse(order.items)
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating order:', error)
    
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create order'
    }, { status: 500 })
  }
}