import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { db } = await connectToDatabase()

    let blog = await db.collection("blogs").findOne({ slug: params.slug })

    if (!blog && ObjectId.isValid(params.slug)) {
      blog = await db.collection("blogs").findOne({ _id: new ObjectId(params.slug) })
    }

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    const serializedBlog = {
      ...blog,
      _id: blog._id.toString(),
    }

    return NextResponse.json(serializedBlog)
  } catch (error) {
    console.error("Error fetching blog:", error)
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    if (body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "")
    }

    body.updatedAt = new Date()

    let result
    if (ObjectId.isValid(params.slug)) {
      result = await db.collection("blogs").updateOne({ _id: new ObjectId(params.slug) }, { $set: body })
    } else {
      result = await db.collection("blogs").updateOne({ slug: params.slug }, { $set: body })
    }

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    let updatedBlog
    if (ObjectId.isValid(params.slug)) {
      updatedBlog = await db.collection("blogs").findOne({ _id: new ObjectId(params.slug) })
    } else {
      updatedBlog = await db.collection("blogs").findOne({ slug: params.slug })
    }

    const serializedBlog = {
      ...updatedBlog,
      _id: updatedBlog._id.toString(),
    }

    return NextResponse.json(serializedBlog)
  } catch (error) {
    console.error("Error updating blog:", error)
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { db } = await connectToDatabase()

    let result
    if (ObjectId.isValid(params.slug)) {
      result = await db.collection("blogs").deleteOne({ _id: new ObjectId(params.slug) })
    } else {
      result = await db.collection("blogs").deleteOne({ slug: params.slug })
    }

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Blog deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}
