"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, Upload, Loader2, Coffee, Edit3, ImageIcon } from "lucide-react"

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

export default function EditBlogPage() {
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [imageUploading, setImageUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
  })
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem("admin_logged_in")
    if (isLoggedIn !== "true") {
      router.push("/admin")
      return
    }

    if (params.id) {
      fetchBlog(params.id as string)
    }
  }, [router, params.id])

  const fetchBlog = async (blogId: string) => {
    try {
      const response = await fetch(`/api/blogs/${blogId}`)
      if (response.ok) {
        const blog = await response.json()
        setFormData({
          title: blog.title,
          content: blog.content,
          author: blog.author,
          image: blog.image || "",
        })
      } else {
        throw new Error("Blog not found")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blog details",
        variant: "destructive",
      })
      router.push("/admin/blogs")
    } finally {
      setFetchLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageUploading(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      })

      if (response.ok) {
        const result = await response.json()
        setFormData((prev) => ({ ...prev, image: result.url }))
        toast({
          title: "Success! 🎉",
          description: "Image uploaded successfully",
        })
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setImageUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/blogs/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success! 🎉",
          description: "Blog post updated successfully",
        })
        router.push("/admin/blogs")
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update blog post")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update blog post",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
          <Coffee className="w-12 h-12 animate-pulse mx-auto mb-4 text-amber-600" />
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-600" />
          <p className="text-gray-700 text-lg font-medium">Loading blog details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Enhanced Header with Coffee Theme */}
      <header className="bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <div className="flex items-center">
              <Button
                variant="ghost"
                asChild
                className="mr-6 text-white hover:bg-white/20 hover:text-white border border-white/30"
              >
                <Link href="/admin/blogs">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Blog Posts
                </Link>
              </Button>
              <div className="flex items-center">
                <Coffee className="w-8 h-8 mr-3 text-amber-200" />
                <h1 className="text-4xl font-bold text-white">Edit Blog Post</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white rounded-t-lg">
            <div className="flex items-center">
              <Edit3 className="w-6 h-6 mr-3" />
              <div>
                <CardTitle className="text-3xl font-bold">Edit Blog Post</CardTitle>
                <CardDescription className="text-amber-100 text-lg mt-2">
                  Update your coffee blog content
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Title Section */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
                <Label htmlFor="title" className="text-amber-800 font-bold text-lg flex items-center mb-3">
                  <Coffee className="w-5 h-5 mr-2" />
                  Blog Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                  placeholder="Enter an engaging blog post title..."
                  className="h-14 text-lg border-2 border-amber-300 focus:border-orange-500 bg-white/80"
                />
              </div>

              {/* Author and Image Section */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Author Section */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
                  <Label htmlFor="author" className="text-orange-800 font-bold text-lg flex items-center mb-3">
                    <Edit3 className="w-5 h-5 mr-2" />
                    Author *
                  </Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    required
                    placeholder="Author name..."
                    className="h-14 text-lg border-2 border-orange-300 focus:border-amber-500 bg-white/80"
                  />
                </div>

                {/* Featured Image Section */}
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-200">
                  <Label htmlFor="image" className="text-yellow-800 font-bold text-lg flex items-center mb-3">
                    <ImageIcon className="w-5 h-5 mr-2" />
                    Featured Image
                  </Label>
                  <div className="space-y-4">
                    {/* Image URL Input */}
                    <div className="border-2 border-dashed border-yellow-300 rounded-lg p-4 bg-white/60">
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => handleInputChange("image", e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="h-12 border-2 border-yellow-200 focus:border-amber-500 bg-white/80"
                      />
                      {formData.image && (
                        <div className="mt-3 flex items-center space-x-3">
                          <img
                            src={formData.image || "/placeholder.svg"}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg shadow-md"
                          />
                          <span className="text-green-600 font-medium">✓ Image loaded</span>
                        </div>
                      )}
                    </div>

                    {/* OR Separator */}
                    <div className="flex items-center">
                      <div className="flex-1 border-t border-amber-300"></div>
                      <span className="px-4 text-amber-600 bg-white rounded-full font-medium">OR</span>
                      <div className="flex-1 border-t border-amber-300"></div>
                    </div>

                    {/* File Upload */}
                    <div className="border-2 border-dashed border-amber-400 rounded-lg p-6 bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transition-all duration-300">
                      <div className="text-center">
                        <Upload className="mx-auto h-10 w-10 text-amber-600 mb-3" />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <span className="text-amber-700 hover:text-orange-700 font-bold text-lg">
                            {imageUploading ? "Uploading..." : "Upload an image"}
                          </span>
                          <p className="text-amber-600 text-sm mt-1">PNG, JPG, GIF up to 10MB</p>
                          <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={imageUploading}
                            className="hidden"
                          />
                        </label>
                        {imageUploading && (
                          <div className="mt-3">
                            <Loader2 className="w-6 h-6 animate-spin mx-auto text-amber-600" />
                            <p className="text-amber-600 text-sm mt-1">Processing image...</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section with MDEditor */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
                <Label htmlFor="content" className="text-amber-800 font-bold text-lg flex items-center mb-4">
                  <Edit3 className="w-5 h-5 mr-2" />
                  Blog Content *
                </Label>
                <div className="border-2 border-amber-300 rounded-lg overflow-hidden bg-white">
                  <MDEditor
                    value={formData.content}
                    onChange={(value) => handleInputChange("content", value || "")}
                    preview="edit"
                    height={500}
                    data-color-mode="light"
                  />
                </div>
                <p className="text-amber-600 text-sm mt-2">
                  Use Markdown syntax to format your content. Preview available in the editor.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-6 pt-8 border-t-2 border-amber-200">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-10 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-3" />
                      Update Post
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="px-10 py-4 text-lg font-bold border-2 border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                >
                  <Link href="/admin/blogs">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
