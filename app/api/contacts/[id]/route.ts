import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid contact ID" }, { status: 400 })
    }

    const contact = await db.collection("contacts").findOne({ _id: new ObjectId(params.id) })

    if (!contact) {
      return NextResponse.json({ error: "Contact message not found" }, { status: 404 })
    }

    const serializedContact = {
      ...contact,
      _id: contact._id.toString(),
    }

    return NextResponse.json(serializedContact)
  } catch (error) {
    console.error("Error fetching contact:", error)
    return NextResponse.json({ error: "Failed to fetch contact message" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid contact ID" }, { status: 400 })
    }

    body.updatedAt = new Date()

    const result = await db.collection("contacts").updateOne({ _id: new ObjectId(params.id) }, { $set: body })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Contact message not found" }, { status: 404 })
    }

    const updatedContact = await db.collection("contacts").findOne({ _id: new ObjectId(params.id) })

    const serializedContact = {
      ...updatedContact,
      _id: updatedContact._id.toString(),
    }

    return NextResponse.json(serializedContact)
  } catch (error) {
    console.error("Error updating contact:", error)
    return NextResponse.json({ error: "Failed to update contact message" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid contact ID" }, { status: 400 })
    }

    const result = await db.collection("contacts").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Contact message not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Contact message deleted successfully" })
  } catch (error) {
    console.error("Error deleting contact:", error)
    return NextResponse.json({ error: "Failed to delete contact message" }, { status: 500 })
  }
}
