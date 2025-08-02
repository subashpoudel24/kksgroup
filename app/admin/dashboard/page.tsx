"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Coffee,
  Package,
  FileText,
  ShoppingCart,
  Mail,
  LogOut,
  Plus,
  Eye,
  Users,
  Calendar,
  ArrowRight,
} from "lucide-react"

interface DashboardStats {
  products: number
  blogs: number
  orders: number
  contacts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({ products: 0, blogs: 0, orders: 0, contacts: 0 })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem("admin_logged_in")
    if (isLoggedIn !== "true") {
      router.push("/admin")
      return
    }
    // Fetch dashboard data
    fetchDashboardData()
  }, [router])

  const fetchDashboardData = async () => {
    try {
      // Fetch stats from APIs
      const [productsRes, blogsRes, ordersRes, contactsRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/blogs"),
        fetch("/api/orders"),
        fetch("/api/contacts"),
      ])
      const products = await productsRes.json()
      const blogs = await blogsRes.json()
      const orders = await ordersRes.json()
      const contacts = await contactsRes.json()

      setStats({
        products: products.length,
        blogs: blogs.length,
        orders: orders.length,
        contacts: contacts.length,
      })
      // Set recent orders (last 5)
      setRecentOrders(orders.slice(-5).reverse())
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in")
    router.push("/admin")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] to-[#FAF5F0] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#D7BFAE] border-t-[#D2691E] rounded-full animate-spin mx-auto mb-6"></div>
            <Coffee className="w-8 h-8 text-[#D2691E] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-[#2D2D2D] text-lg font-medium">Loading your dashboard...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait while we fetch your data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] to-[#FAF5F0]">
      {/* Header */}
      <header className="bg-[#FAF7F2]/90 backdrop-blur-md shadow-xl border-b border-[#D7BFAE] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-[#D2691E] to-[#C05A1B] rounded-xl flex items-center justify-center shadow-lg">
                  <Coffee className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#D2691E] rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-[#2D2D2D]">Admin Dashboard</h1>
                <p className="text-gray-600 text-sm">Welcome back, Administrator</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-[#C05A1B] text-[#C05A1B] hover:bg-[#F5EBDD] bg-transparent shadow-md hover:shadow-lg transition-all duration-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-white hover:shadow-2xl transition-all duration-300 group hover:scale-105 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D7BFAE]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Products</p>
                  <p className="text-3xl font-bold text-[#2D2D2D]">{stats.products}</p>
                  <p className="text-xs text-[#D2691E] mt-1 font-medium">+12% from last month</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-[#D2691E] to-[#C05A1B] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Package className="w-6 h-6 text-[#F5EBDD]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-white hover:shadow-2xl transition-all duration-300 group hover:scale-105 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D7BFAE]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Blog Posts</p>
                  <p className="text-3xl font-bold text-[#2D2D2D]">{stats.blogs}</p>
                  <p className="text-xs text-[#D2691E] mt-1 font-medium">+5% from last month</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-[#4B2E2B] to-[#2D2D2D] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6 text-[#F5EBDD]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-white hover:shadow-2xl transition-all duration-300 group hover:scale-105 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D7BFAE]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Orders</p>
                  <p className="text-3xl font-bold text-[#2D2D2D]">{stats.orders}</p>
                  <p className="text-xs text-[#D2691E] mt-1 font-medium">+23% from last month</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-[#D2691E] to-[#C05A1B] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <ShoppingCart className="w-6 h-6 text-[#F5EBDD]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-white hover:shadow-2xl transition-all duration-300 group hover:scale-105 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D7BFAE]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Messages</p>
                  <p className="text-3xl font-bold text-[#2D2D2D]">{stats.contacts}</p>
                  <p className="text-xs text-[#D2691E] mt-1 font-medium">+8% from last month</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-[#4B2E2B] to-[#2D2D2D] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-[#F5EBDD]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Quick Actions and Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-xl border-0 bg-white hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-[#D2691E] to-[#C05A1B] text-white rounded-t-lg border-b border-[#D7BFAE]">
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                Quick Actions
              </CardTitle>
              <CardDescription className="text-[#F5EBDD]">
                Streamline your workflow with these shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  asChild
                  className="h-24 flex-col bg-gradient-to-r from-[#D2691E] to-[#C05A1B] hover:from-[#C05A1B] hover:to-[#D2691E] border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link href="/admin/products/new">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">Add Product</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  className="h-24 flex-col bg-gradient-to-r from-[#4B2E2B] to-[#2D2D2D] hover:from-[#2D2D2D] hover:to-[#4B2E2B] border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link href="/admin/blogs/new">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">New Blog Post</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  className="h-24 flex-col bg-gradient-to-r from-[#D2691E] to-[#C05A1B] hover:from-[#C05A1B] hover:to-[#D2691E] border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link href="/admin/products">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Eye className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">View Products</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  className="h-24 flex-col bg-gradient-to-r from-[#4B2E2B] to-[#2D2D2D] hover:from-[#2D2D2D] hover:to-[#4B2E2B] border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link href="/admin/orders">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Eye className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">View Orders</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-xl border-0 bg-white hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-[#4B2E2B] to-[#2D2D2D] text-white rounded-t-lg border-b border-[#D7BFAE]">
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                Recent Orders
              </CardTitle>
              <CardDescription className="text-[#F5EBDD]">Latest customer orders and their status</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order, index) => (
                    <div
                      key={order._id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-[#FAF7F2] to-[#FAF5F0]/50 rounded-xl border border-[#D7BFAE]/50 hover:shadow-md transition-all duration-300 group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#D2691E] to-[#C05A1B] rounded-full flex items-center justify-center shadow-md">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#2D2D2D] group-hover:text-[#D2691E] transition-colors">
                            {order.fullName}
                          </p>
                          <p className="text-sm text-gray-600">{order.productName}</p>
                          <p className="text-xs text-gray-500 flex items-center mt-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={`mb-2 ${order.status === "completed"
                              ? "bg-[#D7BFAE] text-[#4B2E2B] border-[#C05A1B]"
                              : order.status === "confirmed"
                                ? "bg-[#F5EBDD] text-[#D2691E] border-[#C05A1B]"
                                : order.status === "cancelled"
                                  ? "bg-[#4B2E2B] text-[#F5EBDD] border-[#2D2D2D]"
                                  : "bg-[#FAF5F0] text-[#D2691E] border-[#D7BFAE]"
                            }`}
                        >
                          {order.status || "Pending"}
                        </Badge>
                        <p className="text-sm text-gray-600">
                          Qty: <span className="font-semibold text-[#2D2D2D]">{order.quantity}</span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-[#D7BFAE] mx-auto mb-4 opacity-50" />
                    <p className="text-gray-500 text-lg font-medium">No recent orders</p>
                    <p className="text-gray-400 text-sm">Orders will appear here once customers start purchasing</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Management Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:scale-105 transition-all duration-300 cursor-pointer border-0 bg-white shadow-lg hover:shadow-2xl group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D7BFAE]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Link href="/admin/products">
              <CardContent className="p-8 text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-[#D2691E] to-[#C05A1B] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Package className="w-8 h-8 text-[#F5EBDD]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2D2D2D] group-hover:text-[#D2691E] transition-colors">
                  Manage Products
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                  Add, edit, and organize your product catalog
                </p>
                <div className="mt-4 flex items-center justify-center text-[#D2691E] group-hover:text-[#C05A1B]">
                  <span className="text-sm font-medium">View Products</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Link>
          </Card>
          <Card className="hover:scale-105 transition-all duration-300 cursor-pointer border-0 bg-white shadow-lg hover:shadow-2xl group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D7BFAE]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Link href="/admin/blogs">
              <CardContent className="p-8 text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-[#4B2E2B] to-[#2D2D2D] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FileText className="w-8 h-8 text-[#F5EBDD]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2D2D2D] group-hover:text-[#4B2E2B] transition-colors">
                  Manage Blogs
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                  Create and publish engaging blog content
                </p>
                <div className="mt-4 flex items-center justify-center text-[#4B2E2B] group-hover:text-[#2D2D2D]">
                  <span className="text-sm font-medium">View Blogs</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Link>
          </Card>
          <Card className="hover:scale-105 transition-all duration-300 cursor-pointer border-0 bg-white shadow-lg hover:shadow-2xl group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D7BFAE]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Link href="/admin/orders">
              <CardContent className="p-8 text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-[#D2691E] to-[#C05A1B] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <ShoppingCart className="w-8 h-8 text-[#F5EBDD]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2D2D2D] group-hover:text-[#D2691E] transition-colors">
                  Manage Orders
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                  Process and track customer orders
                </p>
                <div className="mt-4 flex items-center justify-center text-[#D2691E] group-hover:text-[#C05A1B]">
                  <span className="text-sm font-medium">View Orders</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Link>
          </Card>
          <Card className="hover:scale-105 transition-all duration-300 cursor-pointer border-0 bg-white shadow-lg hover:shadow-2xl group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D7BFAE]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Link href="/admin/contacts">
              <CardContent className="p-8 text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-[#4B2E2B] to-[#2D2D2D] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Mail className="w-8 h-8 text-[#F5EBDD]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2D2D2D] group-hover:text-[#4B2E2B] transition-colors">
                  Contact Messages
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                  Review and respond to customer inquiries
                </p>
                <div className="mt-4 flex items-center justify-center text-[#4B2E2B] group-hover:text-[#2D2D2D]">
                  <span className="text-sm font-medium">View Messages</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 KKS Group Admin Dashboard. Built with ❤️ for coffee enthusiasts.
          </p>
        </div>
      </div>
    </div>
  )
}
