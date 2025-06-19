// Add new product to D1 database

import { D1Helper, D1Environment } from '../lib/d1'

interface ProductData {
  name: string
  description: string
  price: number
  image_url: string
  category: string
  in_stock: boolean
}

export const onRequestPost: PagesFunction<D1Environment> = async (context) => {
  try {
    const productData: ProductData = await context.request.json()

    // Validate required fields
    if (!productData.name || !productData.description || !productData.price || !productData.image_url || !productData.category) {
      return Response.json({
        success: false,
        error: 'Missing required fields: name, description, price, image_url, category'
      }, { status: 400 })
    }

    // Validate price
    if (typeof productData.price !== 'number' || productData.price <= 0) {
      return Response.json({
        success: false,
        error: 'Price must be a positive number'
      }, { status: 400 })
    }

    // Validate URL format
    try {
      new URL(productData.image_url)
    } catch {
      return Response.json({
        success: false,
        error: 'Invalid image URL format'
      }, { status: 400 })
    }

    const db = new D1Helper(context.env.DB)
    const product = await db.createProduct({
      name: productData.name.trim(),
      description: productData.description.trim(),
      price: productData.price,
      image_url: productData.image_url.trim(),
      category: productData.category,
      in_stock: productData.in_stock ?? true
    })

    return Response.json({
      success: true,
      message: 'Product added successfully',
      product
    }, { status: 201 })

  } catch (error) {
    console.error('Error adding product:', error)
    
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500 })
  }
}