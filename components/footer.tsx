import Link from "next/link"
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react"
import Image from "next/image" // Import Image component

export default function Footer() {
  return (
    <footer className="relative py-16" style={{ backgroundColor: "#2D2D2D" }}>
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5">
        <Image src="/images/footer-texture.png" alt="Subtle background texture" fill className="object-cover" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Brand Section */}
          <Link href="/" className="block">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-56 h-20">
                <Image src=" https://i.ibb.co/jZ4VQSZ8/KKS-Group-final-logo-1-1.png" alt="KKS Group Logo"
                  width={120}
                  height={120}
                  className="rounded-full aspect-square object-cover mb-4" />
              </div>
              {/* <span className="font-bold text-xl" style={{ color: "#F5EBDD" }}>
                KKS Group
              </span> */}
            </div>
            <br />
            <p className="mb-6 leading-relaxed" style={{ color: "rgba(245, 235, 221, 0.8)" }}>
              Your trusted partner in specialty coffee equipment and solutions. Elevating coffee experiences worldwide.
            </p>
            </div>
          </Link>
          {/* Company Links */}
          <div>
            <h3 className="font-bold mb-6 text-lg" style={{ color: "#D2691E" }}>
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Our Story", href: "/story" },
                { name: "Blog & Insights", href: "/blog" },
                { name: "FAQ", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:opacity-80"
                    style={{ color: "rgba(245, 235, 221, 0.8)" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Services Links */}
          <div>
            <h3 className="font-bold mb-6 text-lg" style={{ color: "#D2691E" }}>
              Services
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Equipment Sales", href: "/products" },
                { name: "Training", href: "/contact" },
                { name: "Support", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:opacity-80"
                    style={{ color: "rgba(245, 235, 221, 0.8)" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact Information */}
          <div>
            <h3 className="font-bold mb-6 text-lg" style={{ color: "#D2691E" }}>
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: "#4B2E2B" }}>
                  <Mail className="h-4 w-4" style={{ color: "#D2691E" }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: "rgba(245, 235, 221, 0.7)" }}>
                    Email us
                  </p>
                  <p className="font-medium" style={{ color: "#F5EBDD" }}>
                    <a href="mailto:info@kksgroup.com">info@kksgroup.com</a>
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: "#4B2E2B" }}>
                  <Phone className="h-4 w-4" style={{ color: "#D2691E" }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: "rgba(245, 235, 221, 0.7)" }}>
                    Call us
                  </p>
                  <p className="font-medium" style={{ color: "#F5EBDD" }}>
                    <a href="tel:+977-9763452754">+977-9763452754</a>
                    <br />
                    <a href="tel:+977-9841754744">+977-9841754744</a>
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: "#4B2E2B" }}>
                  <MapPin className="h-4 w-4" style={{ color: "#D2691E" }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: "rgba(245, 235, 221, 0.7)" }}>
                    Location
                  </p>
                  <p className="font-medium" style={{ color: "#F5EBDD" }}>
                    De Coffee First <br />
                    Kumaripati,Lalitpur 44600
                  </p>
                  <p className="font-medium" style={{ color: "#F5EBDD" }}>
                    Nepal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="border-t mt-16 pt-8" style={{ borderColor: "rgba(210, 105, 30, 0.3)" }}>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <p className="text-sm" style={{ color: "rgba(245, 235, 221, 0.7)" }}>
                © 2024 KKS Group. All rights reserved.
              </p>
              
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium" style={{ color: "rgba(245, 235, 221, 0.7)" }}>
                Follow Us
              </span>
              <div className="flex items-center space-x-3">
                {[
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-lg transition-all duration-200 hover:opacity-80"
                    style={{
                      backgroundColor: "#4B2E2B",
                      color: "rgba(245, 235, 221, 0.8)",
                    }}
                  >
                    <social.icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
