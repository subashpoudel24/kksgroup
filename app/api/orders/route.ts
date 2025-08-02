import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const orders = await db.collection("orders").find({}).sort({ createdAt: -1 }).toArray()

    const serializedOrders = orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
    }))

    return NextResponse.json(serializedOrders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["fullName", "email", "phone", "address", "productName", "quantity", "contactMethod"]
    const missingFields = requiredFields.filter((field) => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 })
    }

    const newOrder = {
      ...body,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("orders").insertOne(newOrder)

    const createdOrder = {
      ...newOrder,
      _id: result.insertedId.toString(),
    }

    return NextResponse.json(
      {
        message: "Order submitted successfully",
        orderId: createdOrder._id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to submit order" }, { status: 500 })
  }
}
