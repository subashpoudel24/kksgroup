"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { CalendarDays, User, Coffee, Search, BookOpen, TrendingUp, Award, Users, Clock, ArrowRight } from "lucide-react"

interface Blog {
  _id: string
  title: string
  content: string
  image: string
  author: string
  createdAt: string
  slug: string
  category?: string
  readTime?: number
  featured?: boolean
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs")
      const data = await response.json()
      setBlogs(data)
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || blog.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(blogs.map(blog => blog.category).filter(Boolean)))]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mb-4"></div>
            <p className="text-xl text-gray-600">Loading our latest coffee insights...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20  text-white overflow-hidden">
        <Image
          src="https://i.ibb.co/Pvzyq2Lm/janko-ferlic-h9-Iq22-JJl-Gk-unsplash.jpg"
          alt="KKS Group blog"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* <Badge className="mb-6 bg-white/20 text-white border-white/30 text-lg px-6 py-3 backdrop-blur-sm">
            <Coffee className="w-5 h-5 mr-2" />
            COFFEE INSIGHTS & EXPERTISE
          </Badge> */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">COFFEE INSIGHTS & EXPERTISE</h1>
          {/* <p className="text-xl max-w-3xl mx-auto leading-relaxed mb-8 opacity-90">
            Discover the latest insights, brewing tips, and stories from the world of coffee.
            Explore the art and science of exceptional coffee.
          </p> */}

          {/* Feature highlights */}
          
          <div className="grid md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <h3 className="font-semibold mb-1">Expert Guides</h3>
              <p className="text-sm opacity-80">Professional insights</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <h3 className="font-semibold mb-1">Latest Trends</h3>
              <p className="text-sm opacity-80">Industry updates</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Award className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <h3 className="font-semibold mb-1">Quality Content</h3>
              <p className="text-sm opacity-80">Curated articles</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Users className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <h3 className="font-semibold mb-1">Community</h3>
              <p className="text-sm opacity-80">Coffee enthusiasts</p>
            </div>
          </div>
        </div>
      </section>
      
      <AnimateOnScroll animationType="fade-up">
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-2 border-gray-200 focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category ?? "all")}
                  className={`${selectedCategory === category
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                    : "hover:bg-amber-50 hover:border-amber-300"
                    } transition-all duration-300`}
                >
                  {category === "all" ? "All Articles" : category}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Featured Article */}
        {filteredBlogs.find(blog => blog.featured) && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Featured Article</h2>
            {(() => {
              const featuredBlog = filteredBlogs.find(blog => blog.featured)!
              return (
                <Card className="overflow-hidden shadow-2xl border-0 bg-white max-w-4xl mx-auto">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <Image
                        src={
                          featuredBlog.image ||
                          "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                        }
                        alt={featuredBlog.title}
                        width={600}
                        height={400}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-8">
                      <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-200">
                        Featured Article
                      </Badge>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">{featuredBlog.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {featuredBlog.content.substring(0, 200)}...
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {featuredBlog.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarDays className="w-4 h-4" />
                          {new Date(featuredBlog.createdAt).toLocaleDateString()}
                        </div>
                        {featuredBlog.readTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {featuredBlog.readTime} min read
                          </div>
                        )}
                      </div>
                      <Link
                        href={`/blog/${featuredBlog.slug}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </Card>
              )
            })()}
          </div>
        )}

        {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          {filteredBlogs.filter(blog => !blog.featured).map((blog, index) => (
            <Card
              key={blog._id}
              className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={
                      blog.image ||
                      "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
                    }
                    alt={blog.title}
                    width={400}
                    height={250}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Category Badge */}
                  {blog.category && (
                    <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800 shadow-lg backdrop-blur-sm">
                      {blog.category}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {blog.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
                  {blog.readTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {blog.readTime}m
                    </div>
                  )}
                </div>

                <CardTitle className="mb-4 line-clamp-2 text-xl group-hover:text-amber-600 transition-colors duration-300">
                  {blog.title}
                </CardTitle>

                <CardDescription className="mb-6 line-clamp-3 text-gray-600 leading-relaxed">
                  {blog.content.substring(0, 150)}...
                </CardDescription>

                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-all duration-300 group-hover:gap-3"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Articles Found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery
                  ? `No articles match "${searchQuery}" in the selected category.`
                  : "No articles found in the selected category."
                }
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
                className="bg-amber-500 hover:bg-amber-600"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}

        {/* Article Count */}
        {filteredBlogs.length > 0 && (
          <div className="text-center mt-12 py-8 border-t border-gray-200">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-amber-600">{filteredBlogs.length}</span>
              {filteredBlogs.length === 1 ? " article" : " articles"}
              {selectedCategory !== "all" && (
                <span> in <span className="font-semibold">{selectedCategory}</span></span>
              )}
              {searchQuery && (
                <span> matching "<span className="font-semibold">{searchQuery}</span>"</span>
              )}
            </p>
          </div>
        )}

        {/* Newsletter Subscription */}
        <section className="mt-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-12 text-white text-center">
          <Coffee className="w-16 h-16 mx-auto mb-6 text-yellow-200" />
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Coffee Insights</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get the latest brewing tips, industry news, and exclusive content delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 bg-white text-gray-900 border-0"
            />
            <Button className="bg-white text-amber-600 hover:bg-gray-100 h-12 px-8 font-semibold">
              Subscribe
            </Button>
          </div>
        </section>
        </div>
      </AnimateOnScroll>
    </div>
  )
}