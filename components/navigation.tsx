"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Coffee, Menu, X, ShoppingCart, Phone, Mail } from 'lucide-react'
import Image from "next/image" // Added Image component

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/blog", label: "Blog" },
    { href: "/training", label: "Training" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Top Bar */}
      <div className="py-2 text-sm" style={{ background: 'linear-gradient(to right, #D2691E, #C05A1B)', color: "#F5EBDD" }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span><a href="tel:+977-9763452754">+977-9763452754</a>&nbsp; &nbsp; <a href="tel:+977-9841754744">+977-9841754744</a></span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span><a href="mailto:info@kksgroup.com">info@kksgroup.com</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Main Navigation */}
      <nav
        className={`border-b sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg backdrop-blur-sm" : "shadow-sm"
          }`}
        style={{ backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "#FFFFFF", borderColor: scrolled ? "rgba(45, 45, 45, 0.1)" : "rgba(45, 45, 45, 0.05)" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo - Larger size */}
            <Link href="/" className="flex items-center">
              <div className="relative w-56 h-20"> {/* Increased size */}
                <Image
                  src="https://i.ibb.co/jZ4VQSZ8/KKS-Group-final-logo-1-1.png"
                  alt="KKS Group Logo"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive(item.href)
                      ? "font-semibold"
                      : "hover:opacity-80"
                    }`}
                  style={{
                    color: isActive(item.href) ? "#D2691E" : "#2D2D2D",
                    backgroundColor: isActive(item.href) ? "rgba(210, 105, 30, 0.1)" : "transparent",
                  }}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: "#D2691E" }}></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                asChild
                variant="outline"
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
                style={{ borderColor: "#D2691E", color: "#D2691E", backgroundColor: "transparent" }}
              >
                <Link href="/order">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Order Now
                </Link>
              </Button>
              <Button
                asChild
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: "#D2691E", color: "#F5EBDD" }}
              >
                <Link href="/contact">Get Quote</Link>
              </Button>
            </div>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: "#2D2D2D" }}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80" style={{ backgroundColor: "#FAF7F2" }}>
                <div className="flex items-center justify-between mb-8">
                  {/* Mobile Logo - Larger size */}
                  <div className="flex items-center">
                    <div className="relative w-48 h-20"> {/* Increased size */}
                      <Image
                        src="https://i.ibb.co/jZ4VQSZ8/KKS-Group-final-logo-1-1.png"
                        alt="KKS Group Logo"
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="hover:opacity-80"
                    style={{ color: "#2D2D2D" }}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActive(item.href)
                          ? "font-semibold border-l-4"
                          : "hover:opacity-80"
                        }`}
                      style={{
                        color: isActive(item.href) ? "#D2691E" : "#2D2D2D",
                        backgroundColor: isActive(item.href) ? "rgba(210, 105, 30, 0.1)" : "transparent",
                        borderColor: isActive(item.href) ? "#D2691E" : "transparent",
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t" style={{ borderColor: "rgba(45, 45, 45, 0.1)" }}>
                  <div className="space-y-3">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
                      style={{ borderColor: "#D2691E", color: "#D2691E", backgroundColor: "transparent" }}
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/order">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Order Now
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
                      style={{ backgroundColor: "#D2691E", color: "#F5EBDD" }}
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/contact">Get Quote</Link>
                    </Button>
                  </div>
                </div>
                {/* Mobile Contact Info */}
                <div className="mt-8 pt-8 border-t" style={{ borderColor: "rgba(45, 45, 45, 0.1)" }}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3" style={{ color: "#2D2D2D" }}>
                      <Phone className="w-5 h-5" style={{ color: "#D2691E" }} />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-3" style={{ color: "#2D2D2D" }}>
                      <Mail className="w-5 h-5" style={{ color: "#D2691E" }} />
                      <span>info@kksgroup.com</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  )
}