import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const blogs = await db.collection("blogs").find({}).sort({ createdAt: -1 }).toArray()

    const serializedBlogs = blogs.map((blog) => ({
      ...blog,
      _id: blog._id.toString(),
    }))

    return NextResponse.json(serializedBlogs)
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["title", "content", "author"]
    const missingFields = requiredFields.filter((field) => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 })
    }

    // Create slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "")

    const newBlog = {
      ...body,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("blogs").insertOne(newBlog)

    const createdBlog = {
      ...newBlog,
      _id: result.insertedId.toString(),
    }

    return NextResponse.json(createdBlog, { status: 201 })
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}
