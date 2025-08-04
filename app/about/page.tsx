"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Coffee, Users, Award, Globe, CheckCircle, ArrowRight, Star, Zap, Shield } from "lucide-react"
import Link from "next/link"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900"></div>
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg"
            alt="Coffee beans background"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <Badge variant="secondary" className="mb-8 bg-amber-100 text-amber-800 px-4 py-2 text-sm font-medium hover:bg-amber-200 transition-colors">
              ABOUT KKS GROUP
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 leading-tight">
              Your Trusted Partner in
              <span className="block font-medium bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Specialty Coffee
              </span>
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                Explore Equipment
                <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Professional Equipment Section */}
      <AnimateOnScroll animationType="fade-up">
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Badge variant="secondary" className="mb-8 bg-stone-100 text-stone-700 px-4 py-2 text-sm font-medium">
                PROFESSIONAL COFFEE EQUIPMENT
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-8 leading-tight">
                Built for Performance.
                <span className="block font-medium text-amber-600">Designed for Passion.</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mb-8 rounded-full"></div>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                We offer a wide range of commercial and home-use coffee equipment that combines innovation, precision,
                and durability. Whether you're launching a new café, upgrading your barista station, or perfecting your
                home brewing game, KKS Group provides equipment that meets the highest industry standards.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border shadow-sm">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-gray-700">Premium Quality</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border shadow-sm">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">High Performance</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border shadow-sm">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">Reliable Support</span>
                </div>
              </div>
{/* 
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                Learn More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button> */}
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur-lg opacity-20"></div>
                <Image
                  src="https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg"
                  alt="Professional Coffee Shop Interior"
                  width={700}
                  height={500}
                  className="rounded-2xl object-cover w-full shadow-2xl relative z-10 transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
      {/* Our Offerings Section */}
      <AnimateOnScroll animationType="fade-up">
      <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-20"></div>
                <Image
                  src="https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg"
                  alt="Professional Coffee Equipment"
                  width={700}
                  height={500}
                  className="rounded-2xl object-cover w-full shadow-2xl relative z-10 transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div>
              <Badge variant="secondary" className="mb-8 bg-stone-100 text-stone-700 px-4 py-2 text-sm font-medium">
                OUR COMPREHENSIVE OFFERINGS
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-8 leading-tight">
                Everything You Need for
                <span className="block font-medium text-blue-600">Perfect Coffee</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mb-10 rounded-full"></div>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4 group">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Commercial Espresso Machines & Grinders</h4>
                    <p className="text-gray-600">Professional-grade equipment for high-volume operations</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Single-Group & Home Espresso Setups</h4>
                    <p className="text-gray-600">Perfect solutions for small cafés and home enthusiasts</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Brewing Tools & Filtration Systems</h4>
                    <p className="text-gray-600">Complete accessories for the perfect brew every time</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Coffee Carts & Mobile Café Solutions</h4>
                    <p className="text-gray-600">Flexible options for pop-ups and mobile businesses</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <p className="text-gray-600 leading-relaxed font-medium">
                  Every product we supply is carefully selected to support quality, consistency, and efficiency in every
                  cup. We believe that great coffee starts with great equipment.
                </p>
              </div>
            </div>
          </div>
        </div>
        </section>
      </AnimateOnScroll>

      {/* Why Choose KKS Group */}
      <AnimateOnScroll animationType="fade-up">
      <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="text-center mb-20">
            <Badge variant="secondary" className="mb-8 bg-stone-100 text-stone-700 px-4 py-2 text-sm font-medium">
              WHY CHOOSE KKS GROUP?
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-8">
              The KKS Group
              <span className="block font-medium text-amber-600">Advantage</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We go beyond just selling equipment. We build lasting partnerships with comprehensive support and expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Global Trusted Brands</h3>
                <p className="text-gray-600 leading-relaxed">
                  We partner with internationally acclaimed manufacturers to bring you the best equipment from around the world.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Expert Technical Support</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our certified technicians provide comprehensive installation, training, and ongoing support services.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Fast & Reliable Delivery</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our efficient logistics network ensures your equipment arrives safely and on schedule, every time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group bg-gradient-to-br from-amber-50 to-amber-100">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Coffee className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Tailored Solutions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Custom equipment packages designed specifically for your business needs and budget requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        </section>
      </AnimateOnScroll>

      {/* Stats Section */}
      <AnimateOnScroll animationType="fade-up">
      <section className="py-24 bg-gradient-to-r from-gray-900 to-stone-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg"
            alt="Coffee equipment"
            fill
            className="object-cover opacity-10"
          />
        </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">500+</div>
              <div className="text-gray-300">Happy Clients</div>
            </div>
            <div className="group">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">15+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="group">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">50+</div>
              <div className="text-gray-300">Machines Installed</div>
            </div>
            <div className="group">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">24/7</div>
              <div className="text-gray-300">Support Available</div>
            </div>
          </div>
        </div>
        </section>
      </AnimateOnScroll>

      {/* Mission Statement */}
      <AnimateOnScroll animationType="fade-up">
      <section className="py-24 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg"
            alt="Coffee cup"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-light mb-8 text-white leading-tight">
            Let's Brew Success
            <span className="block font-medium">Together</span>
          </h2>
          <div className="w-24 h-1 bg-white/80 mx-auto mb-12 rounded-full"></div>
          <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-5xl mx-auto leading-relaxed">
            Whether you're a startup café, a growing restaurant, or a passionate home brewer, KKS Group is your reliable
            partner in building unforgettable coffee experiences. Let's work together to raise the standard of
            coffee—one machine, one cup, one customer at a time.
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-full font-semibold transition-all duration-300">
              Schedule Consultation
            </Button>
          </div> */}
        </div>
        </section>
      </AnimateOnScroll>
    </div>
  )
}