"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Coffee, Lock, Eye, EyeOff } from "lucide-react"

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Check if already logged in
    const isLoggedIn = localStorage.getItem("admin_logged_in")
    if (isLoggedIn === "true") {
      router.push("/admin/dashboard")
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simple authentication (in production, use proper JWT/session management)
    if (credentials.username === "kksgroup" && credentials.password === "kksgroup@2025") {
      localStorage.setItem("admin_logged_in", "true")
      toast({
        title: "Login Successful! 🎉",
        description: "Welcome to the KKS Group admin panel!",
      })
      router.push("/admin/dashboard")
    } else {
      toast({
        title: "Login Failed ❌",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
              <Coffee className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">KKS Group Admin</h1>
          <p className="text-gray-600">Sign in to access the admin dashboard</p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="bg-amber-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Lock className="w-6 h-6" />
              Admin Login
            </CardTitle>
            <CardDescription className="text-amber-100">
              Enter your credentials to continue to the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="username" className="text-gray-700 font-semibold">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                  className="mt-2 h-12 border-2 border-gray-200 focus:border-amber-500"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-700 font-semibold">
                  Password
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                    className="h-12 border-2 border-gray-200 focus:border-amber-500 pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In to Dashboard"}
              </Button>
            </form>

            
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Need help? Contact support at{" "}
            <a href="mailto:support@kksgroup.com" className="text-amber-600 hover:underline">
              support@kksgroup.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
