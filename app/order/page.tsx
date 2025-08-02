"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  ShoppingCart,
  User,
  Package,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Truck,
  Star,
  CheckCircle,
  AlertCircle,
  Coffee,
  Award,
  HeadphonesIcon
} from "lucide-react"
import Image from "next/image"

interface Product {
  _id: string
  name: string
  slug: string
  price?: number
  category?: string
}

export default function OrderPage() {
  const searchParams = useSearchParams()
  const productSlug = searchParams.get("product")
  const { toast } = useToast()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    productName: "",
    quantity: "1",
    contactMethod: "email",
    urgency: "standard",
    message: "",
  })

  useEffect(() => {
    if (productSlug) {
      fetchProduct(productSlug)
    }
  }, [productSlug])

  const fetchProduct = async (slug: string) => {
    try {
      const response = await fetch(`/api/products/${slug}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
        setFormData((prev) => ({ ...prev, productName: data.name }))
      }
    } catch (error) {
      console.error("Error fetching product:", error)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Order Submitted Successfully! 🎉",
          description: "We'll contact you within 24 hours to confirm your order details.",
        })

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          zipCode: "",
          country: "",
          productName: product?.name || "",
          quantity: "1",
          contactMethod: "email",
          urgency: "standard",
          message: "",
        })
      } else {
        throw new Error("Failed to submit order")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const calculateEstimatedTotal = () => {
    if (!product?.price) return null
    const quantity = parseInt(formData.quantity) || 1
    const subtotal = product.price * quantity
    const shipping = subtotal > 500 ? 0 : 50 // Free shipping over $500
    return { subtotal, shipping, total: subtotal + shipping }
  }

  const estimatedTotal = calculateEstimatedTotal()

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white overflow-hidden">
        <Image
          src="https://i.ibb.co/35BhjHYz/tim-mossholder-YC6-RVdo-Tt-Ik-unsplash.jpg"
                  alt="KKS Group blog"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
         
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            SECURE ORDER PROCESS</h1>
          {/* <p className="text-xl max-w-3xl mx-auto leading-relaxed mb-8 opacity-90">
            Ready to elevate your coffee experience? Fill out our secure order form and our team will contact you
            within 24 hours to confirm details and arrange delivery.
          </p> */}

          {/* Trust indicators */}
          <div className="grid md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Shield className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <h3 className="font-semibold mb-1">Secure Process</h3>
              <p className="text-sm opacity-80">SSL encrypted</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <h3 className="font-semibold mb-1">Quick Response</h3>
              <p className="text-sm opacity-80">24-hour confirmation</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Truck className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <h3 className="font-semibold mb-1">Fast Delivery</h3>
              <p className="text-sm opacity-80">Worldwide shipping</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <HeadphonesIcon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <h3 className="font-semibold mb-1">Expert Support</h3>
              <p className="text-sm opacity-80">Professional guidance</p>
            </div>
          </div>
        </div>
      </section>
      <AnimateOnScroll animationType="fade-up">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Package className="w-6 h-6" />
                  Order Information
                </CardTitle>
                <CardDescription className="text-amber-100">
                  Please provide your details and we'll contact you to finalize your order
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <User className="w-5 h-5 text-amber-500" />
                      <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName" className="text-gray-700 font-semibold">
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          required
                          className="mt-2 h-12 border-2 border-gray-200 focus:border-amber-500 transition-colors"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-gray-700 font-semibold">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="mt-2 h-12 border-2 border-gray-200 focus:border-amber-500 transition-colors"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-semibold">
                        Contact Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                        className="mt-2 h-12 border-2 border-gray-200 focus:border-amber-500 transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <MapPin className="w-5 h-5 text-amber-500" />
                      <h3 className="text-xl font-semibold text-gray-900">Shipping Address</h3>
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-gray-700 font-semibold">
                        Street Address *
                      </Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        required
                        rows={3}
                        className="mt-2 border-2 border-gray-200 focus:border-amber-500 transition-colors resize-none"
                        placeholder="Enter your complete address"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-gray-700 font-semibold">
                          City *
                        </Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          required
                          className="mt-2 h-12 border-2 border-gray-200 focus:border-amber-500 transition-colors"
                          placeholder="City"
                        />
                      </div>

                      <div>
                        <Label htmlFor="zipCode" className="text-gray-700 font-semibold">
                          ZIP Code *
                        </Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          required
                          className="mt-2 h-12 border-2 border-gray-200 focus:border-amber-500 transition-colors"
                          placeholder="12345"
                        />
                      </div>

                      <div>
                        <Label htmlFor="country" className="text-gray-700 font-semibold">
                          State *
                        </Label>
                          <Select value={formData.country} onValueChange={(value) => handleInputChange("State", value)}>
                          <SelectTrigger className="mt-2 h-12 border-2 border-gray-200 focus:border-amber-500">
                              <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="ks">Koshi</SelectItem>
                              <SelectItem value="ma">Madhesh</SelectItem>
                              <SelectItem value="bg">Bagmati</SelectItem>
                              <SelectItem value="ga">Gandaki</SelectItem>
                              <SelectItem value="lu">Lumbini</SelectItem>
                              <SelectItem value="ka">Karnali</SelectItem>
                              <SelectItem value="su">Sudurpashchim</SelectItem>
                            
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Product Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <Coffee className="w-5 h-5 text-amber-500" />
                      <h3 className="text-xl font-semibold text-gray-900">Product Information</h3>
                    </div>

                    <div>
                      <Label htmlFor="productName" className="text-gray-700 font-semibold">
                        Product Name *
                      </Label>
                      <Input
                        id="productName"
                        value={formData.productName}
                        onChange={(e) => handleInputChange("productName", e.target.value)}
                        required
                        className="mt-2 h-12 border-2 border-gray-200 focus:border-amber-500 transition-colors"
                        placeholder="Enter product name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="quantity" className="text-gray-700 font-semibold">
                          Quantity *
                        </Label>
                        <Select value={formData.quantity} onValueChange={(value) => handleInputChange("quantity", value)}>
                          <SelectTrigger className="mt-2 h-12 border-2 border-gray-200 focus:border-amber-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 10, 15, 20, 25, 50].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "unit" : "units"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="urgency" className="text-gray-700 font-semibold">
                          Delivery Urgency
                        </Label>
                        <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                          <SelectTrigger className="mt-2 h-12 border-2 border-gray-200 focus:border-amber-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard (10-12 days)</SelectItem>
                            <SelectItem value="express">Express (4-7 days)</SelectItem>
                            <SelectItem value="urgent">Urgent (1-2 day)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Contact Preferences */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <Phone className="w-5 h-5 text-amber-500" />
                      <h3 className="text-xl font-semibold text-gray-900">Contact Preferences</h3>
                    </div>

                    <div>
                      <Label className="text-gray-700 font-semibold">
                        Preferred Contact Method *
                      </Label>
                      <RadioGroup
                        value={formData.contactMethod}
                        onValueChange={(value) => handleInputChange("contactMethod", value)}
                        className="mt-3 space-y-3"
                      >
                        <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <RadioGroupItem value="email" id="email-contact" />
                          <Label htmlFor="email-contact" className="flex items-center gap-2 cursor-pointer">
                            <Mail className="w-4 h-4 text-blue-500" />
                            Email (Recommended)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <RadioGroupItem value="call" id="call-contact" />
                          <Label htmlFor="call-contact" className="flex items-center gap-2 cursor-pointer">
                            <Phone className="w-4 h-4 text-green-500" />
                            Phone Call
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <RadioGroupItem value="both" id="both-contact" />
                          <Label htmlFor="both-contact" className="flex items-center gap-2 cursor-pointer">
                            <HeadphonesIcon className="w-4 h-4 text-purple-500" />
                            Both Email & Phone
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-700 font-semibold">
                        Additional Message (Optional)
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        rows={4}
                        className="mt-2 border-2 border-gray-200 focus:border-amber-500 transition-colors resize-none"
                        placeholder="Any special requests, questions, or additional information..."
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white h-14 text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing Order...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Submit Order Request
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Information */}
          <div className="space-y-6">
            {/* Order Summary */}
            {product && estimatedTotal && (
              <Card className="shadow-lg border-0 sticky top-6">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-amber-500" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {formData.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${estimatedTotal.subtotal.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${estimatedTotal.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>
                          {estimatedTotal.shipping === 0 ? (
                            <span className="text-green-600 font-semibold">FREE</span>
                          ) : (
                            `$${estimatedTotal.shipping}`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Estimated Total:</span>
                        <span className="text-amber-600">${estimatedTotal.total.toLocaleString()}</span>
                      </div>
                    </div>

                    {estimatedTotal.subtotal >= 500 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-semibold">Free shipping applied!</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Process Information */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  What Happens Next?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Order Review</h4>
                      <p className="text-sm text-gray-600">We'll review your order within 2 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Confirmation Call</h4>
                      <p className="text-sm text-gray-600">Our team will contact you to confirm details</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Payment & Shipping</h4>
                      <p className="text-sm text-gray-600">Secure payment and fast delivery</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-500" />
                  Why Choose Us?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">Premium Quality Guarantee</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Fast Worldwide Shipping</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <HeadphonesIcon className="w-5 h-5 text-purple-500" />
                    <span className="text-sm">24/7 Expert Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm">5-Star Customer Reviews</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Secure & Private</h4>
                  <p className="text-sm text-blue-700">
                    Your information is protected with SSL encryption and will never be shared with third parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </AnimateOnScroll>
    </div>
  )
}