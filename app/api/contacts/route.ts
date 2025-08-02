import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const contacts = await db.collection("contacts").find({}).sort({ createdAt: -1 }).toArray()

    const serializedContacts = contacts.map((contact) => ({
      ...contact,
      _id: contact._id.toString(),
    }))

    return NextResponse.json(serializedContacts)
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "email", "subject", "message"]
    const missingFields = requiredFields.filter((field) => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 })
    }

    const newContact = {
      ...body,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("contacts").insertOne(newContact)

    const createdContact = {
      ...newContact,
      _id: result.insertedId.toString(),
    }

    return NextResponse.json(
      {
        message: "Contact message submitted successfully",
        contactId: createdContact._id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating contact:", error)
    return NextResponse.json({ error: "Failed to submit contact message" }, { status: 500 })
  }
}
