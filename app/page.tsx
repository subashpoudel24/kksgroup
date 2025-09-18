"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coffee, UtensilsCrossed, Leaf, Award, Truck } from "lucide-react"
import { CheckCircle } from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll" // Use the new component name

import { useState, useEffect } from "react" // Import useState and useEffect for parallax

export default function HomePage() {
  const [offsetY, setOffsetY] = useState(0)
  const handleScroll = () => setOffsetY(window.scrollY)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section (Full Width Banner) */}
      <section className="relative min-h-screen flex items-center justify-center md:justify-start overflow-hidden">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${offsetY * 0.3}px)` }}
        >
          <img
            src="https://i.ibb.co/nxJSS6Q/Untitled-1550-x-850-px.png"
            alt="Cozy coffee and pastries"
            className="w-full h-full object-cover md:object-fill"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent md:from-black/70 md:via-black/30 md:to-transparent"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="text-center md:text-left md:max-w-2xl lg:max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight" style={{ color: "#F5EBDD" }}>
              Your Daily Brew & Freshly Baked Goodness
            </h1>
            <p className="text-lg sm:text-xl md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto md:mx-0" style={{ color: "rgba(245, 235, 221, 0.9)" }}>
              From premium beans to freshly baked delights – we bring the café to you.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center md:items-start">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg" style={{ backgroundColor: "#4B2E2B", color: "#F5EBDD" }}>
                <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />
                Explore Coffee
              </button>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg" style={{ backgroundColor: "#D7BFAE", color: "#4B2E2B" }}>
                <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5" />
                See Bakery
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Category Highlights (Main Focus Section) */}
      <AnimateOnScroll animationType="fade-up">
        <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#2D2D2D" }}>
                Discover Our Delights
              </h2>
              <p className="text-lg max-w-3xl mx-auto" style={{ color: "#2D2D2D" }}>
                Explore our curated selection of premium coffee and freshly baked goods.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
              <Card className="border-0 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="relative h-60">
                  <Image
                    src="https://i.ibb.co/G3n4VHvS/mockup.jpg" // Original coffee beans image
                    alt="Coffee Beans"
                    fill
                    className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: "#2D2D2D" }}>
                    Coffee Beans
                  </h3>
                  <p className="mb-6" style={{ color: "#2D2D2D" }}>
                    Finest single-origin and blended beans.
                  </p>
                  <Link href="/products">
                    <Button
                      className="w-full rounded-lg font-semibold hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#D2691E", color: "#F5EBDD" }}
                    >
                      Shop Beans
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="border-0 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="relative h-60">
                  <Image
                    src="https://i.ibb.co/ycSQ2kxp/ACM-tecnika-dettagio-1-2.jpg" // Original espresso machine image
                    alt="Coffee Machines"
                    fill
                    className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: "#2D2D2D" }}>
                    Coffee Machines
                  </h3>
                  <p className="mb-6" style={{ color: "#2D2D2D" }}>
                    Professional and home espresso machines.
                  </p>
                  <Link href="/products">
                    <Button
                      className="w-full rounded-lg font-semibold hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#4B2E2B", color: "#F5EBDD" }}
                    >
                      See Machines
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="border-0 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="relative h-60">
                  <Image
                    src="https://i.ibb.co/B2kWCVNN/yeh-xintong-go3-DT3-Pp-Iw4-unsplash.jpg" // New bakery image
                    alt="Bakery Items"
                    fill
                    className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: "#2D2D2D" }}>
                    Bakery Items
                  </h3>
                  <p className="mb-6" style={{ color: "#2D2D2D" }}>
                    Freshly baked croissants, pastries, and more.
                  </p>
                  <Link href="/products">
                    <Button
                      className="w-full rounded-lg font-semibold hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#D2691E", color: "#F5EBDD" }}
                    >
                      See Bakery
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* About Us Section (Brand Story) */}
      <AnimateOnScroll animationType="fade-up">
        <section className="py-20" style={{ backgroundColor: "#FAF5F0" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <Image
                  src="https://i.ibb.co/fdVBftGm/Untitled-design-3.png" // New cafe/bakery image
                  alt="Our Cafe & Bakery"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-lg object-cover w-full"
                />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#2D2D2D" }}>
                  Our Passion for Coffee & Baking
                </h2>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: "#2D2D2D" }}>
                  At KKS Group, we believe in crafting perfect moments, one cup and one bite at a time. Our journey
                  began with a deep love for exceptional coffee and the comforting aroma of freshly baked goods. We
                  meticulously source the finest beans and ingredients, ensuring every product delivers an unparalleled
                  experience.
                </p>
                <Link href="/about">
                  <Button
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "#4B2E2B", color: "#F5EBDD" }}
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Why Choose Us Section */}
      <AnimateOnScroll animationType="fade-up">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
            <div className="text-center mb-16">
              <Badge className="mb-6 px-4 py-2" style={{ backgroundColor: "#D2691E", color: "#F5EBDD" }}>
                Why Choose Us
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#2D2D2D" }}>
                Why KKS Group is Your Best Choice
              </h2>
              <p className="text-lg max-w-3xl mx-auto" style={{ color: "#2D2D2D" }}>
                Experience the difference with our commitment to quality, freshness, and exceptional service.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "#4B2E2B" }}
                >
                  <Leaf className="w-10 h-10" style={{ color: "#F5EBDD" }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: "#2D2D2D" }}>
                  Freshly Sourced Beans
                </h3>
                <p className="leading-relaxed" style={{ color: "#2D2D2D" }}>
                  Directly from sustainable farms to your cup, ensuring peak flavor.
                </p>
              </div>
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "#D2691E" }}
                >
                  <Award className="w-10 h-10" style={{ color: "#F5EBDD" }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: "#2D2D2D" }}>
                  High-Quality Machines
                </h3>
                <p className="leading-relaxed" style={{ color: "#2D2D2D" }}>
                  Durable and precise equipment for the perfect brew every time.
                </p>
              </div>
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "#4B2E2B" }}
                >
                  <UtensilsCrossed className="w-10 h-10" style={{ color: "#F5EBDD" }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: "#2D2D2D" }}>
                  Daily Fresh Bakery
                </h3>
                <p className="leading-relaxed" style={{ color: "#2D2D2D" }}>
                  Baked fresh daily with premium ingredients for delightful taste.
                </p>
              </div>
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "#D2691E" }}
                >
                  <Truck className="w-10 h-10" style={{ color: "#F5EBDD" }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: "#2D2D2D" }}>
                  Fast Delivery
                </h3>
                <p className="leading-relaxed" style={{ color: "#2D2D2D" }}>
                  Quick and reliable delivery right to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Proudly Part of KKS Group Section */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#2D2D2D" }}>
              Proudly Part of KKS Group
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: "#2D2D2D" }}>
              Our commitment to excellence extends across all our brands, bringing you the best in coffee and bakery.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Aveda Wellness */}
            <AnimateOnScroll animationType="fade-scale" delay={0}>
              <Link href="https://avedawellness.com/" className="block">
                <Card className="border-0 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer">
                  <CardContent className="flex flex-col items-center text-center p-6">
                    <Image
                      src="https://i.ibb.co/XrqvhHnP/IMG-2677.jpg"
                      alt="Aveda Wellness Logo"
                      width={170}
                      height={170}
                      className="rounded-full aspect-square object-cover mb-4"
                    />
                    <h3 className="text-2xl font-bold mb-2" style={{ color: "#2D2D2D" }}>
                      Aveda Wellness
                    </h3>
                    <p className="text-md" style={{ color: "#2D2D2D" }}>
                      Healthy Body, Healthy Mind.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </AnimateOnScroll>
            {/* Discover Nepal*/}
            <AnimateOnScroll animationType="fade-scale" delay={150}>
              <Link href="https://www.instagram.com/krishna_raj_shrestha" className="block">
                <Card className="border-0 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer">
                  <CardContent className="flex flex-col items-center text-center p-6">
                    <Image
                      src="https://i.ibb.co/6RNvbvk0/9087bf39-f3c0-4918-8b96-5c24df254413.png"
                      alt="Discover Nepal Logo"
                      width={170}
                      height={170}
                      className="rounded-full aspect-square object-cover mb-4"
                    />
                    <h3 className="text-2xl font-bold mb-2" style={{ color: "#2D2D2D" }}>
                      Discover Nepal
                    </h3>
                    <p className="text-md" style={{ color: "#2D2D2D" }}>
                      Discover New Things.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </AnimateOnScroll>
            {/* De Coffee First */}
            <AnimateOnScroll animationType="fade-scale" delay={300}>
              <Link href="/" className="block">
                <Card className="border-0 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer">
                  <CardContent className="flex flex-col items-center text-center p-6">
                    <Image
                      src="https://i.ibb.co/hFYqZ0Qq/8b4cc28b-0c9f-461b-8d9b-0f86147fd145.png"
                      alt="De Coffee First Logo"
                      width={170}
                      height={170}
                      className="rounded-full aspect-square object-cover mb-4"
                    />
                    <h3 className="text-2xl font-bold mb-2" style={{ color: "#2D2D2D" }}>
                      De Coffee First
                    </h3>
                    <p className="text-md" style={{ color: "#2D2D2D" }}>
                      Fresh Coffee, every day.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Training Classes Section */}
      <AnimateOnScroll animationType="fade-up">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#2D2D2D" }}>
                  Master Your Craft with Our Training Classes
                </h2>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: "#2D2D2D" }}>
                  Elevate your coffee and baking skills with our expert-led training programs. Whether you're a beginner
                  looking to learn the basics or a seasoned professional aiming to refine your techniques, our classes
                  offer hands-on experience and in-depth knowledge.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 mt-1" style={{ color: "#D2691E" }} />
                    <div>
                      <h4 className="font-semibold" style={{ color: "#2D2D2D" }}>
                        Barista Fundamentals
                      </h4>
                      <p className="text-sm" style={{ color: "#2D2D2D" }}>
                        Learn espresso extraction, milk frothing, and latte art.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 mt-1" style={{ color: "#4B2E2B" }} />
                    <div>
                      <h4 className="font-semibold" style={{ color: "#2D2D2D" }}>
                        Advanced Brewing Techniques
                      </h4>
                      <p className="text-sm" style={{ color: "#2D2D2D" }}>
                        Explore pour-over, AeroPress, and cold brew methods.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 mt-1" style={{ color: "#D2691E" }} />
                    <div>
                      <h4 className="font-semibold" style={{ color: "#2D2D2D" }}>
                        Bakery Masterclass
                      </h4>
                      <p className="text-sm" style={{ color: "#2D2D2D" }}>
                        From sourdough to pastries, perfect your baking skills.
                      </p>
                    </div>
                  </li>
                </ul>
                <Link href="/training">
                  <Button
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "#D2691E", color: "#F5EBDD" }}
                  >
                    View All Classes
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <Image
                  src="https://i.ibb.co/zHh8b6Tv/2O2A4615.jpg"
                  alt="Coffee Training Class"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-lg object-cover w-full"
                />
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Newsletter Signup */}
      <AnimateOnScroll animationType="fade-up">
        <section className="py-20 text-center" style={{ backgroundColor: "#FAF7F2" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#2D2D2D" }}>
              {"☕ Stay Updated on Fresh Bakes & New Brews!"}
            </h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: "#2D2D2D" }}>
              Sign up for our newsletter to get exclusive offers, new product announcements, and coffee tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: "rgba(45, 45, 45, 0.2)",
                  backgroundColor: "#FFFFFF",
                  color: "#2D2D2D",
                  outlineColor: "#D2691E",
                }}
              />
              <Button
                size="lg"
                className="px-8 py-4 text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#D2691E", color: "#F5EBDD" }}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </AnimateOnScroll>
    </div>
  )
}
