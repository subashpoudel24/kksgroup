"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Coffee,
  Zap,
  ArrowLeft,
  Settings,
  FileText,
  Package,
  Star,
  CheckCircle,
  Heart,
  Share2,
  ShoppingCart,
  Award,
  Truck,
  Shield,
  Clock,
  Info,
  Sparkles,
  Gauge,
  Zap as Power,
  Ruler,
  Weight
} from "lucide-react"
import ReactMarkdown from "react-markdown"

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
  specifications: {
    [key: string]: string
  }
  features: string[]
  image?: string
  machineDetails?: MachineDetails
}

interface Product {
  _id: string
  name: string
  description: string
  images: string[]
  category: "beans" | "machines"
  slug: string
  price?: number
  models?: ProductModel[]
  brand?: string
  rating?: number
  reviews?: number
  inStock?: boolean
}

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedModel, setSelectedModel] = useState<ProductModel | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (params.slug) {
      fetchProduct(params.slug as string)
    }
  }, [params.slug])

  const fetchProduct = async (slug: string) => {
    try {
      const response = await fetch(`/api/products/${slug}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
        if (data.models && data.models.length > 0) {
          setSelectedModel(data.models[0])
        }
      }
    } catch (error) {
      console.error("Error fetching product:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const getMachineIcon = (key: string) => {
    switch (key.toLowerCase()) {
      case 'capacity':
        return <Gauge className="w-4 h-4 text-amber-500" />
      case 'power':
        return <Power className="w-4 h-4 text-amber-500" />
      case 'dimensions':
        return <Ruler className="w-4 h-4 text-amber-500" />
      case 'weight':
        return <Weight className="w-4 h-4 text-amber-500" />
      default:
        return <Settings className="w-4 h-4 text-amber-500" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="text-center space-y-4">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            <p className="text-lg text-gray-600 font-medium">Loading product details...</p>
          </div>

          {/* Enhanced Loading skeleton */}
          <div className="grid lg:grid-cols-2 gap-12 mt-12">
            <div className="space-y-4">
              <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <Package className="w-16 h-16 text-gray-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">Product Not Found</h1>
            <p className="text-gray-600 text-lg">The product you're looking for doesn't exist or has been removed.</p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const currentImage = selectedModel?.image ||
    product.images[currentImageIndex] ||
    `https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop`

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Enhanced Hero Section */}
            <section className="relative py-24 overflow-hidden">
              <div className="absolute inset-0 ">
                <Image
                  src="https://i.ibb.co/8L4ywdRk/coffee-hero-bg.jpg"
                  alt="KKS Group"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  />
              </div>
              <div className="absolute inset-0 bg-black/20"></div>
      
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
              </div>
      
              <div className="relative container mx-auto px-4 text-center text-white">
                <div className="max-w-4xl mx-auto space-y-8">
                  <h1 className="text-6xl md:text-7xl font-black tracking-tight">
                    Premium
                    <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                      Collection
                    </span>
                  </h1>
                  {/* <p className="text-xl md:text-2xl leading-relaxed text-white/90 max-w-3xl mx-auto">
                    Discover our carefully curated selection of professional coffee equipment, premium beans, and artisanal
                    bakery items from the world's finest craftsmen.
                  </p> */}
      
                  <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      Premium Quality
                    </Badge>
                    <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                      <Coffee className="w-4 h-4 mr-1" />
                      Freshly Roasted
                    </Badge>
                    <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                      <Zap className="w-4 h-4 mr-1" />
                      Professional Grade
                    </Badge>
                  </div>
                </div>
              </div>
            </section>
      {/* Enhanced Header with Breadcrumbs */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild className="hover:bg-amber-50 transition-colors duration-200">
              <Link href="/products" className="flex items-center text-gray-600 hover:text-amber-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Link>
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFavorite}
                className="hover:bg-amber-50 transition-colors duration-200"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
              </Button>
              {/* <Button variant="ghost" size="sm" className="hover:bg-amber-50 transition-colors duration-200">
                <Share2 className="w-5 h-5 text-gray-400" />
              </Button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Enhanced Product Images */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={currentImage}
                  alt={selectedModel ? `${product.name} - ${selectedModel.name}` : product.name}
                  width={600}
                  height={500}
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Enhanced Category Badge */}
                <Badge className={`absolute top-6 left-6 ${product.category === "beans"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500"
                    : "bg-gradient-to-r from-slate-500 to-gray-600"
                  } text-white border-0 shadow-lg font-semibold px-4 py-2`}>
                  {product.category === "beans" ? (
                    <>
                      <Coffee className="w-4 h-4 mr-2" />
                      Premium Coffee Beans
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Professional Machine
                    </>
                  )}
                </Badge>

                {/* Stock Status */}
                {product.inStock !== undefined && (
                  <Badge className={`absolute top-6 right-6 ${product.inStock ? 'bg-green-500' : 'bg-red-500'
                    } text-white border-0 shadow-lg font-semibold px-4 py-2`}>
                    {product.inStock ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        In Stock
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 mr-1" />
                        Out of Stock
                      </>
                    )}
                  </Badge>
                )}

                {/* Quality Badge for Beans */}
                {product.category === "beans" && (
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-semibold text-gray-700">Premium Quality</span>
                    </div>
                  </div>
                )}

                {/* Rating */}
                {product.rating && (
                  <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        {product.rating} {product.reviews && `(${product.reviews})`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-3 transition-all duration-300 ${currentImageIndex === index
                        ? "border-amber-400 shadow-lg scale-105"
                        : "border-gray-200 hover:border-amber-300 hover:shadow-md"
                      }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced Product Header Info */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  {product.brand && (
                    <p className="text-amber-600 font-semibold text-lg">{product.brand}</p>
                  )}
                  <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                    {product.name}
                  </h1>
                  {selectedModel && (
                    <p className="text-xl text-gray-600 font-medium">Model: {selectedModel.name}</p>
                  )}
                </div>
              </div>

              {/* Rating and Reviews */}
              {product.rating && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(product.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-700">
                      {product.rating}
                    </span>
                    {product.reviews && (
                      <span className="text-gray-500">({product.reviews} reviews)</span>
                    )}
                  </div>
                </div>
              )}

              {/* Price and Badges */}
              {product.price && (
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-black text-amber-600">
                    ${product.price}
                  </div>
                  <Badge variant="secondary" className="text-sm font-semibold">
                    <Truck className="w-3 h-3 mr-1" />
                    Free Shipping
                  </Badge>
                </div>
              )}
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <Shield className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <p className="font-semibold text-gray-800">Quality Guaranteed</p>
                  <p className="text-sm text-gray-600">Premium materials</p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <Award className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <p className="font-semibold text-gray-800">Expert Approved</p>
                  <p className="text-sm text-gray-600">Professional grade</p>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Order Button */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl font-bold text-lg py-6"
                asChild
              >
                <Link href={`/order?product=${product.slug}${selectedModel ? `&model=${encodeURIComponent(selectedModel.name)}` : ''}`}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Order {selectedModel ? selectedModel.name : product.name} Now
                </Link>
              </Button>

              <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  <span>Fast delivery</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>Quality guaranteed</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>Expert support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Product Details Tabs */}
        <div className="mt-20">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-2 border-0">
              <TabsTrigger
                value="description"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-semibold transition-all duration-300"
              >
                <FileText className="w-4 h-4 mr-2" />
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-semibold transition-all duration-300"
              >
                <Settings className="w-4 h-4 mr-2" />
                Specifications
              </TabsTrigger>
              {product.models && product.models.length > 0 && (
                <TabsTrigger
                  value="models"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-semibold transition-all duration-300"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Models ({product.models.length})
                </TabsTrigger>
              )}
            </TabsList>

            <div className="mt-8">
              <TabsContent value="description" className="space-y-6">
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                      <Info className="w-6 h-6 mr-3 text-amber-500" />
                      About This Product
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="prose max-w-none">
                      <div className="text-gray-700 leading-relaxed text-lg">
                        <ReactMarkdown>
                          {product.description}
                        </ReactMarkdown>
                      </div>
                    </div>

                    {selectedModel && selectedModel.features.length > 0 && (
                      <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                          {selectedModel.name} Key Features
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {selectedModel.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="space-y-6">
                {product.category === "machines" && selectedModel?.machineDetails && (
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                        <Zap className="w-6 h-6 mr-3 text-amber-500" />
                        Machine Specifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {Object.entries(selectedModel.machineDetails).map(([key, value]) => (
                          <div key={key} className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {getMachineIcon(key)}
                                <span className="font-semibold text-gray-700 capitalize text-lg">
                                  {key.replace(/([A-Z])/g, ' $1')}
                                </span>
                              </div>
                              <span className="text-gray-900 font-bold text-lg">{value}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedModel && Object.keys(selectedModel.specifications).length > 0 && (
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                        <Settings className="w-6 h-6 mr-3 text-amber-500" />
                        Additional Specifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(selectedModel.specifications).map(([key, value]) => (
                          <div key={key} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700 capitalize">
                                {key.replace(/([A-Z])/g, ' $1')}:
                              </span>
                              <span className="text-gray-900 font-bold">{value}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {(!selectedModel || (Object.keys(selectedModel.specifications).length === 0 && !selectedModel.machineDetails)) && (
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                    <CardContent className="text-center py-16">
                      <Settings className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No Specifications Available</h3>
                      <p className="text-gray-500">Specifications for this product are not currently available.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {product.models && product.models.length > 0 && (
                <TabsContent value="models" className="space-y-6">
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                        <Package className="w-6 h-6 mr-3 text-amber-500" />
                        Available Models
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        {product.models.map((model, index) => (
                          <Card
                            key={index}
                            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedModel?.name === model.name
                                ? "ring-2 ring-amber-400 bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg"
                                : "hover:bg-gray-50 border-gray-200"
                              }`}
                            onClick={() => setSelectedModel(model)}
                          >
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-4">
                                    <h4 className="font-bold text-xl text-gray-900">{model.name}</h4>
                                    {selectedModel?.name === model.name && (
                                      <Badge className="bg-amber-500 text-white">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Selected
                                      </Badge>
                                    )}
                                  </div>

                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {model.features.slice(0, 3).map((feature, idx) => (
                                      <Badge key={idx} variant="outline" className="text-sm px-3 py-1">
                                        {feature.length > 35 ? `${feature.substring(0, 35)}...` : feature}
                                      </Badge>
                                    ))}
                                    {model.features.length > 3 && (
                                      <Badge variant="secondary" className="text-sm px-3 py-1">
                                        +{model.features.length - 3} more features
                                      </Badge>
                                    )}
                                  </div>

                                  {model.machineDetails && (
                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                      <div className="flex items-center gap-2">
                                        <Gauge className="w-4 h-4 text-amber-500" />
                                        <span className="font-medium">Capacity:</span>
                                        <span>{model.machineDetails.capacity}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Power className="w-4 h-4 text-amber-500" />
                                        <span className="font-medium">Power:</span>
                                        <span>{model.machineDetails.power}</span>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <Button
                                  size="lg"
                                  variant={selectedModel?.name === model.name ? "default" : "outline"}
                                  className={`ml-4 ${selectedModel?.name === model.name
                                      ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg"
                                      : "border-amber-300 text-amber-600 hover:bg-amber-50"
                                    }`}
                                >
                                  {selectedModel?.name === model.name ? "Selected" : "Select Model"}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </div>
          </Tabs>
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 shadow-2xl rounded-2xl">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Order?</h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Get in touch with us to place your order. We'll provide personalized service and ensure you get exactly what you need.
              </p>
              <Button
                size="lg"
                className="bg-white text-amber-600 hover:bg-gray-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl font-bold text-lg px-12 py-4"
                asChild
              >
                <Link href={`/order?product=${product.slug}${selectedModel ? `&model=${encodeURIComponent(selectedModel.name)}` : ''}`}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Order Now
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}