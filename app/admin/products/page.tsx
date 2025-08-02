"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Plus, Edit, Trash2, Search, Coffee, Zap, Cookie } from "lucide-react"

interface Product {
  _id: string
  name: string
  description: string
  images: string[]
  category: "beans" | "machines" | "bakery"
  slug: string
  price?: number
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem("admin_logged_in")
    if (isLoggedIn !== "true") {
      router.push("/admin")
      return
    }

    fetchProducts()
  }, [router])

  useEffect(() => {
    // Filter products based on search term
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }, [products, searchTerm])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      const data = await response.json()
      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Product deleted successfully",
        })
        fetchProducts()
      } else {
        throw new Error("Failed to delete product")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    }
  }

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
        return "Beans"
      case "machines":
        return "Machine"
      case "bakery":
        return "Bakery"
      default:
        return "Product"
    }
  }

  const getCategoryVariant = (category: string) => {
    switch (category) {
      case "beans":
        return "default"
      case "machines":
        return "secondary"
      case "bakery":
        return "secondary"
      default:
        return "default"
    }
  }

  const getPlaceholderQuery = (category: string) => {
    switch (category) {
      case "beans":
        return "coffee beans"
      case "machines":
        return "coffee machine"
      case "bakery":
        return "bakery items pastries"
      default:
        return "product"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Button variant="ghost" asChild className="mr-4">
                <Link href="/admin/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
            </div>
            <Button asChild>
              <Link href="/admin/products/new">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product._id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={
                      product.images[0] ||
                      `/placeholder.svg?height=200&width=300&query=${getPlaceholderQuery(product.category) || "/placeholder.svg"}`
                    }
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2" variant={getCategoryVariant(product.category) as any}>
                    {getCategoryIcon(product.category)}
                    {getCategoryName(product.category)}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  {/* <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p> */}
                  {product.price && <p className="text-2xl font-bold text-primary mb-4">${product.price}</p>}
                  <div className="flex gap-2">
                    <Button size="sm" asChild className="flex-1">
                      <Link href={`/admin/products/edit/${product._id}`}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(product._id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">No products found.</p>
              <Button asChild className="mt-4">
                <Link href="/admin/products/new">Add Your First Product</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
