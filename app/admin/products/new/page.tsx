"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, Upload, X, Loader2, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

const MDEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.default), { ssr: false })

interface MachineDetails {
  type: string
  capacity: string
  power: string
  voltage: string
  dimensions: string
  weight: string
}

interface ProductModel {
  name: string
  specifications: { [key: string]: string }
  features: string[]
  image?: string
  machineDetails?: MachineDetails
}

export default function NewProductPage() {
  const [loading, setLoading] = useState(false)
  const [uploadingImages, setUploadingImages] = useState<boolean[]>([false])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    images: [""],
    models: [] as ProductModel[],
  })
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem("admin_logged_in")
    if (isLoggedIn !== "true") {
      router.push("/admin")
      return
    }
  }, [router])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData((prev) => ({ ...prev, images: newImages }))
  }

  const handleFileUpload = async (index: number, file: File) => {
    const newUploadingImages = [...uploadingImages]
    newUploadingImages[index] = true
    setUploadingImages(newUploadingImages)

    try {
      const uploadFormData = new FormData()
      uploadFormData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      })

      const result = await response.json()

      if (response.ok) {
        handleImageChange(index, result.url)
        toast({
          title: "Success! 🎉",
          description: "Image uploaded successfully to Cloudinary",
        })
      } else {
        throw new Error(result.message || result.error || "Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload Error",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      const newUploadingImages = [...uploadingImages]
      newUploadingImages[index] = false
      setUploadingImages(newUploadingImages)
    }
  }

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }))
    setUploadingImages([...uploadingImages, false])
  }

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    const newUploadingImages = uploadingImages.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, images: newImages }))
    setUploadingImages(newUploadingImages)
  }

  const addModel = () => {
    const model: ProductModel = {
      name: "",
      specifications: {},
      features: [""],
      image: "",
      machineDetails:
        formData.category === "machines"
          ? {
            type: "",
            capacity: "",
            power: "",
            voltage: "",
            dimensions: "",
            weight: "",
          }
          : undefined,
    }
    setFormData((prev) => ({ ...prev, models: [...prev.models, model] }))
  }

  const removeModel = (index: number) => {
    const newModels = formData.models.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, models: newModels }))
  }

  const updateModel = (index: number, field: keyof ProductModel, value: any) => {
    const models = [...formData.models]
    switch (field) {
      case "name":
        models[index].name = value
        break
      case "specifications":
        models[index].specifications = value
        break
      case "features":
        models[index].features = value
        break
      case "image":
        models[index].image = value
        break
      case "machineDetails":
        models[index].machineDetails = value
        break
      default:
        break
    }
    setFormData((prev) => ({ ...prev, models }))
  }

  const updateModelMachineDetail = (modelIndex: number, field: keyof MachineDetails, value: string) => {
    const models = [...formData.models]
    if (!models[modelIndex].machineDetails) return
    models[modelIndex].machineDetails![field] = value
    setFormData((prev) => ({ ...prev, models }))
  }

  const addModelFeature = (modelIndex: number) => {
    const models = [...formData.models]
    models[modelIndex].features.push("")
    setFormData((prev) => ({ ...prev, models }))
  }

  const updateModelFeature = (modelIndex: number, featureIndex: number, value: string) => {
    const models = [...formData.models]
    models[modelIndex].features[featureIndex] = value
    setFormData((prev) => ({ ...prev, models }))
  }

  const removeModelFeature = (modelIndex: number, featureIndex: number) => {
    const models = [...formData.models]
    models[modelIndex].features = models[modelIndex].features.filter((_, i) => i !== featureIndex)
    setFormData((prev) => ({ ...prev, models }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const productData = {
        ...formData,
        price: formData.price ? Number.parseFloat(formData.price) : undefined,
        images: formData.images.filter((img) => img.trim() !== ""),
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        toast({
          title: "Success! 🎉",
          description: "Product created successfully",
        })
        router.push("/admin/products")
      } else {
        throw new Error("Failed to create product")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create product",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Button variant="ghost" asChild className="mr-4 hover:bg-amber-50">
                <Link href="/admin/products">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Link>
              </Button>
              <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="shadow-2xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Basic Information</CardTitle>
              <CardDescription className="text-amber-100">
                Fill in the basic details for the new product
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-semibold">
                    Product Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="mt-2 h-12 border-2 border-gray-200 focus:border-amber-500"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-gray-700 font-semibold">
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="mt-2 h-12 border-2 border-gray-200 focus:border-amber-500">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beans">Coffee Beans</SelectItem>
                      <SelectItem value="machines">Coffee Machines</SelectItem>
                      <SelectItem value="bakery">Bakery Items</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="price" className="text-gray-700 font-semibold">
                  Price (Optional)
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="0.00"
                  className="mt-2 h-12 border-2 border-gray-200 focus:border-amber-500"
                />
              </div>

              <div>
                <Label className="text-gray-700 font-semibold">Description *</Label>
                <div className="mt-2" data-color-mode="light">
                  <MDEditor
                    value={formData.description}
                    onChange={(val) => handleInputChange("description", val || "")}
                    height={300}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="shadow-2xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Product Images</CardTitle>
              <CardDescription className="text-blue-100">Upload or add URLs for product images</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="space-y-3 p-4 border-2 border-dashed border-blue-200 rounded-lg">
                    <div className="flex gap-3">
                      <Input
                        placeholder="Image URL (optional)"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        className="h-12 border-2 border-gray-200 focus:border-blue-500"
                      />
                      {formData.images.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => removeImageField(index)}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="text-center text-gray-500 text-sm font-medium">OR UPLOAD FILE</div>

                    <div className="flex items-center gap-3">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleFileUpload(index, file)
                          }
                        }}
                        className="h-12 border-2 border-dashed border-blue-300 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        disabled={uploadingImages[index]}
                      />
                      {uploadingImages[index] && (
                        <div className="flex items-center text-blue-600">
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          <span className="text-sm font-medium">Uploading...</span>
                        </div>
                      )}
                    </div>

                    {image && !uploadingImages[index] && (
                      <div className="flex justify-center">
                        <div className="relative w-32 h-32 border-2 border-gray-200 rounded-lg overflow-hidden">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Product image ${index + 1}`}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=128&width=128&text=Image+Error"
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addImageField}
                  className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Add Another Image
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Product Models */}
          <Card className="shadow-2xl border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Product Models</CardTitle>
              <CardDescription className="text-green-100">
                Add different variants or models of this product
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {formData.models.map((model, modelIndex) => (
                <Card key={modelIndex} className="border-2 border-green-200 bg-green-50">
                  <CardHeader className="bg-green-100 border-b border-green-200">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg text-green-800">Model {modelIndex + 1}</CardTitle>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeModel(modelIndex)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-700 font-semibold">Model Name</Label>
                        <Input
                          placeholder="e.g., Premium Blend, Deluxe Machine"
                          value={model.name}
                          onChange={(e) => updateModel(modelIndex, "name", e.target.value)}
                          className="mt-2 border-2 border-gray-200 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700 font-semibold">Model Image URL</Label>
                        <Input
                          placeholder="Image URL for this model"
                          value={model.image || ""}
                          onChange={(e) => updateModel(modelIndex, "image", e.target.value)}
                          className="mt-2 border-2 border-gray-200 focus:border-green-500"
                        />
                      </div>
                    </div>

                    {/* Machine Details - Only for machines category */}
                    {formData.category === "machines" && (
                      <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <Label className="text-blue-800 font-semibold text-lg">Machine Specifications</Label>
                        <div className="grid md:grid-cols-2 gap-4">
                          {["type", "capacity", "power", "voltage", "dimensions", "weight"].map((field) => (
                            <div key={field}>
                              <Label className="text-gray-700 font-medium capitalize">{field}</Label>
                              <Input
                                placeholder={`Enter ${field}`}
                                value={model.machineDetails?.[field as keyof MachineDetails] || ""}
                                onChange={(e) =>
                                  updateModelMachineDetail(modelIndex, field as keyof MachineDetails, e.target.value)
                                }
                                className="mt-1 border-2 border-gray-200 focus:border-blue-500"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features */}
                    <div className="space-y-3">
                      <Label className="text-gray-700 font-semibold">Features</Label>
                      {model.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex gap-2">
                          <Input
                            placeholder="Enter a feature"
                            value={feature}
                            onChange={(e) => updateModelFeature(modelIndex, featureIndex, e.target.value)}
                            className="border-2 border-gray-200 focus:border-green-500"
                          />
                          {model.features.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeModelFeature(modelIndex, featureIndex)}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addModelFeature(modelIndex)}
                        className="border-green-300 text-green-600 hover:bg-green-50"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Feature
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addModel}
                className="border-green-300 text-green-600 hover:bg-green-50 bg-transparent w-full py-3"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product Model
              </Button>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              disabled={loading || uploadingImages.some(Boolean)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Create Product
                </>
              )}
            </Button>
            <Button type="button" variant="outline" asChild className="px-8 py-3 text-lg bg-transparent">
              <Link href="/admin/products">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
