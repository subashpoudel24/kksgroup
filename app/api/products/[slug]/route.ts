import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { db } = await connectToDatabase()

    // Try to find by slug first, then by ObjectId if slug doesn't work
    let product = await db.collection("products").findOne({ slug: params.slug })

    if (!product && ObjectId.isValid(params.slug)) {
      product = await db.collection("products").findOne({ _id: new ObjectId(params.slug) })
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const serializedProduct = {
      ...product,
      _id: product._id.toString(),
    }

    return NextResponse.json(serializedProduct)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    // Create slug from name if name is being updated
    if (body.name) {
      body.slug = body.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "")
    }

    body.updatedAt = new Date()

    let result
    if (ObjectId.isValid(params.slug)) {
      result = await db.collection("products").updateOne({ _id: new ObjectId(params.slug) }, { $set: body })
    } else {
      result = await db.collection("products").updateOne({ slug: params.slug }, { $set: body })
    }

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Fetch updated product
    let updatedProduct
    if (ObjectId.isValid(params.slug)) {
      updatedProduct = await db.collection("products").findOne({ _id: new ObjectId(params.slug) })
    } else {
      updatedProduct = await db.collection("products").findOne({ slug: params.slug })
    }

    const serializedProduct = {
      ...updatedProduct,
      _id: updatedProduct._id.toString(),
    }

    return NextResponse.json(serializedProduct)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { db } = await connectToDatabase()

    let result
    if (ObjectId.isValid(params.slug)) {
      result = await db.collection("products").deleteOne({ _id: new ObjectId(params.slug) })
    } else {
      result = await db.collection("products").deleteOne({ slug: params.slug })
    }

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
