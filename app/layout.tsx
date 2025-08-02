import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Premium Coffee Showcase",
  description: "Discover premium coffee beans and professional machines",
  openGraph: {
    title: "Premium Coffee Showcase",
    description: "Discover premium coffee beans and professional machines",
    url: "http://localhost:3000/",
    siteName: "Premium Coffee Showcase",
    images: [
      {
        url: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg",
        width: 1200,
        height: 630,
        alt: "Premium coffee beans and brewing equipment",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Coffee Showcase",
    description: "Discover premium coffee beans and professional machines",
    images: ["https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}