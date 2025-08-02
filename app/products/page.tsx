"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coffee, Zap, Cookie, Star, Heart, Search, X } from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"


interface Product {
  _id: string
  name: string
  description: string
  images: string[]
  category: "beans" | "machines" | "bakery"
  slug: string
  price?: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<"all" | "beans" | "machines" | "bakery">("all")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")

  // Helper functions moved to top to avoid reference errors
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "beans":
        return <Coffee className="w-3 h-3 mr-1" />
      case "machines":
        return <Zap className="w-3 h-3 mr-1" />
      case "bakery":
        return <Cookie className="w-3 h-3 mr-1" />
      default:
        return <Coffee className="w-3 h-3 mr-1" />
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "beans":
        return "Coffee Beans"
      case "machines":
        return "Coffee Machines"
      case "bakery":
        return "Bakery Items"
      default:
        return "Product"
    }
  }

  const getCategoryColors = (category: string) => {
    switch (category) {
      case "beans":
        return "from-amber-500 to-orange-500"
      case "machines":
        return "from-slate-500 to-gray-600"
      case "bakery":
        return "from-rose-400 to-pink-500"
      default:
        return "from-amber-500 to-orange-500"
    }
  }

  const getPlaceholderQuery = (category: string) => {
    switch (category) {
      case "beans":
        return "premium coffee beans in bag"
      case "machines":
        return "professional espresso machine"
      case "bakery":
        return "fresh baked pastries and croissants"
      default:
        return "coffee product"
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory
    const matchesSearch = searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getCategoryName(product.category).toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const clearSearch = () => {
    setSearchQuery("")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center space-y-4">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            <p className="text-lg text-gray-600 font-medium">Brewing the perfect selection...</p>
          </div>
          {/* Loading skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Enhanced Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 ">
          <Image
            src="https://i.ibb.co/FLVkgbZf/mike-kenneally-t-NALo-IZhq-VM-unsplash.jpg"
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
      <AnimateOnScroll animationType="fade-up">
      <div className="container mx-auto px-4 py-16">
        {/* Enhanced Category Tabs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Browse by Category</h2>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products, categories, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400 focus:outline-none bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="mt-3 text-center">
                <p className="text-gray-600">
                  {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found for "{searchQuery}"
                </p>
              </div>
            )}
          </div>

          <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as any)} className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-2 border-0">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-semibold transition-all duration-300"
              >
                All Products
              </TabsTrigger>
              <TabsTrigger
                value="beans"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-semibold transition-all duration-300"
              >
                <Coffee className="w-4 h-4 mr-2" />
                Beans
              </TabsTrigger>
              <TabsTrigger
                value="machines"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-500 data-[state=active]:to-gray-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-semibold transition-all duration-300"
              >
                <Zap className="w-4 h-4 mr-2" />
                Machines
              </TabsTrigger>
              <TabsTrigger
                value="bakery"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-400 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-semibold transition-all duration-300"
              >
                <Cookie className="w-4 h-4 mr-2" />
                Bakery
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Enhanced Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <Card
              key={product._id}
              className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="p-0 relative">
                <div className="relative overflow-hidden">
                  <Image
                    src={
                      product.images[0] ||
                      `https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop`
                    }
                    alt={product.name}
                    width={400}
                    height={250}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Category badge */}
                  <Badge className={`absolute top-4 left-4 bg-gradient-to-r ${getCategoryColors(product.category)} text-white border-0 shadow-lg font-semibold`}>
                    {getCategoryIcon(product.category)}
                    {getCategoryName(product.category)}
                  </Badge>

                  {/* Favorite button */}
                  <button
                    onClick={() => toggleFavorite(product._id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 group-hover:scale-110"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${favorites.has(product._id)
                          ? 'text-red-500 fill-current scale-110'
                          : 'text-gray-600 hover:text-red-500'
                        }`}
                    />
                  </button>

                  {/* Rating stars */}
                  <div className="absolute bottom-4 left-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors duration-300">
                    {product.name}
                  </CardTitle>
                  {/* <CardDescription className="text-gray-600 line-clamp-2 leading-relaxed">
                    {product.description}
                  </CardDescription> */}
                </div>

                {product.price && (
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-black text-amber-600">
                      ${product.price}
                    </div>
                    <Badge variant="secondary" className="text-xs font-semibold">
                      Free Shipping
                    </Badge>
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-semibold"
                  >
                    <Link href={`/products/${product.slug}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                {searchQuery ? <Search className="w-16 h-16 text-gray-400" /> : <Coffee className="w-16 h-16 text-gray-400" />}
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-700">
                  {searchQuery ? `No results for "${searchQuery}"` : "No products found"}
                </h3>
                <p className="text-gray-500 text-lg">
                  {searchQuery
                    ? "Try adjusting your search terms or browse our categories below."
                    : "We couldn't find any products in this category. Try browsing other categories or check back later."
                  }
                </p>
              </div>
              <div className="flex gap-4 justify-center">
                {searchQuery && (
                  <Button
                    onClick={clearSearch}
                    variant="outline"
                    className="px-8 py-3 rounded-xl font-semibold border-2 border-amber-200 hover:bg-amber-50 transition-all duration-300"
                  >
                    Clear Search
                  </Button>
                )}
                <Button
                  onClick={() => {
                    setActiveCategory("all")
                    setSearchQuery("")
                  }}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View All Products
                </Button>
              </div>
            </div>
          </div>
        )}
        </div>
      </AnimateOnScroll>
    </div>
  )
}