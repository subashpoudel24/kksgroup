"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Phone, Mail, Clock, Send, Coffee, Star, Users, Award, Zap } from "lucide-react"

export default function ContactPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Message Sent Successfully! ✉️",
          description: "We'll get back to you within 24 hours.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white overflow-hidden">
        <Image
          src="https://i.ibb.co/7xDhHxXF/premium-photo-1675435646793-f6ceb239b064.jpg"
          alt="KKS Group contact"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">Get In Touch</h1>
          {/* <p className="text-xl max-w-3xl mx-auto leading-relaxed mb-8 opacity-90">
            Have questions about our premium coffee equipment or need expert guidance?
            We're here to help you find your perfect brewing solution.
          </p> */}

          {/* Feature highlights */}
          <div className="grid md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <h3 className="font-semibold mb-1">Expert Support</h3>
              <p className="text-sm opacity-80">Professional guidance</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <h3 className="font-semibold mb-1">Quick Response</h3>
              <p className="text-sm opacity-80">24-hour reply guarantee</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Users className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <h3 className="font-semibold mb-1">Personal Service</h3>
              <p className="text-sm opacity-80">Tailored solutions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Award className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <h3 className="font-semibold mb-1">Quality Assured</h3>
              <p className="text-sm opacity-80">Premium equipment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <AnimateOnScroll animationType="fade-up">
      <section className="py-16 bg-white">
        
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="shadow-2xl border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Send className="w-6 h-6" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription className="text-amber-100">
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-700 font-semibold">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
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
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="mt-2 h-12 border-2 border-gray-200 focus:border-amber-500 transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-gray-700 font-semibold">
                        Subject *
                      </Label>
                      <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                        <SelectTrigger className="mt-2 h-12 border-2 border-gray-200 focus:border-amber-500">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="product">Product Question</SelectItem>
                          <SelectItem value="order">Order Support</SelectItem>
                          <SelectItem value="wholesale">Wholesale Inquiry</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-700 font-semibold">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                        rows={5}
                        placeholder="Tell us how we can help you..."
                        className="mt-2 border-2 border-gray-200 focus:border-amber-500 transition-colors resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white h-12 text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Location with Map */}
              <Card className="shadow-lg border-0 overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <MapPin className="w-6 h-6 text-amber-500" />
                    Visit Our Store
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6 pb-4">
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-lg">Main Location</h4>
                      <p className="text-gray-600 leading-relaxed">
                        De Coffee First<br />
                        Kumaripati,Lalitpur 44600<br />
                        Nepal
  
                      </p>
                    </div>
                  </div>

                  {/* Interactive Map */}
                  <div className="h-64 w-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.466208323681!2d85.32253229999999!3d27.6719822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19060c939edb%3A0x3636c1fe01d16cca!2sDe%20Coffee%20First!5e0!3m2!1sen!2snp!4v1753864019528!5m2!1sen!2snp" 
                        height="100%"
                        width={"100%"}
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Store Location"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Phone</h4>
                          <p className="text-gray-600">+977-9763452754 <br />+977-9841754744</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Email</h4>
                        <p className="text-gray-600">info@kksgroup.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Store Hours */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-500" />
                    Store Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium">Sunday to Friday:</span>
                        <span className="text-gray-600 font-semibold">8 am - 7 pm</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium">Saturday:</span>
                        <span className="text-gray-600 font-semibold">Upon Request</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium">Public Holidays:</span>
                        <span className="text-gray-600 font-semibold">Opened</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      {/* FAQ Section */}
      <AnimateOnScroll animationType="fade-up">
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our products and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-amber-500" />
                  How fresh are your coffee beans?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All our coffee beans are roasted to order and shipped within 24-48 hours of roasting. We recommend
                  consuming within 2-4 weeks of the roast date for optimal flavor.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Do you offer wholesale pricing?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! We offer competitive wholesale pricing for cafés, restaurants, and retailers. Contact us with
                  "Wholesale Inquiry" as the subject for more information.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">What's your return policy?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase,
                  contact us for a full refund or exchange.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Do you provide equipment training?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! We offer training sessions for espresso machines and brewing equipment. Our certified baristas
                  can provide on-site or virtual training sessions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        </section>
      </AnimateOnScroll>
    </div>
  )
}