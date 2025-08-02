import { type NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { writeFile, unlink } from "fs/promises"
import { join } from "path"
import { tmpdir } from "os"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to buffer and save temporarily
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create temporary file
    const tempFilePath = join(tmpdir(), `upload_${Date.now()}_${file.name}`)
    await writeFile(tempFilePath, buffer)

    try {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(tempFilePath, {
        folder: "coffee-products",
        public_id: `file_${Date.now()}`,
        resource_type: "auto",
      })

      // Clean up temporary file
      await unlink(tempFilePath)

      return NextResponse.json({
        url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
      })
    } catch (uploadError) {
      // Clean up temporary file on error
      try {
        await unlink(tempFilePath)
      } catch (unlinkError) {
        console.error("Error cleaning up temp file:", unlinkError)
      }
      throw uploadError
    }
  } catch (error) {
    console.error("API /api/upload error:", error)
    return NextResponse.json(
      {
        error: "Upload failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
