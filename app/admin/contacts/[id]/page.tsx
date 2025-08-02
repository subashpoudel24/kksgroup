"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Mail, Phone, MessageSquare, Calendar } from "lucide-react"

interface Contact {
  _id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status?: string
  createdAt: string
}

export default function ContactDetailPage() {
  const [contact, setContact] = useState<Contact | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem("admin_logged_in")
    if (isLoggedIn !== "true") {
      router.push("/admin")
      return
    }

    if (params.id) {
      fetchContact(params.id as string)
    }
  }, [router, params.id])

  const fetchContact = async (contactId: string) => {
    try {
      const response = await fetch(`/api/contacts/${contactId}`)
      if (response.ok) {
        const data = await response.json()
        setContact(data)
      } else {
        throw new Error("Contact not found")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch contact message",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (newStatus: string) => {
    if (!contact) return

    try {
      const response = await fetch(`/api/contacts/${contact._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setContact({ ...contact, status: newStatus })
        toast({
          title: "Success",
          description: "Status updated successfully",
        })
      } else {
        throw new Error("Failed to update status")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status = "new") => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" } = {
      new: "default",
      read: "secondary",
      replied: "default",
      archived: "secondary",
    }

    return <Badge variant={variants[status] || "default"}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading contact message...</div>
      </div>
    )
  }

  if (!contact) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Button variant="ghost" asChild className="mr-4">
                  <Link href="/admin/contacts">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Messages
                  </Link>
                </Button>
                <h1 className="text-2xl font-bold text-gray-900">Message Not Found</h1>
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">The requested message could not be found.</p>
              <Button asChild className="mt-4">
                <Link href="/admin/contacts">Back to Messages</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Button variant="ghost" asChild className="mr-4">
                <Link href="/admin/contacts">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Messages
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Contact Message Details</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Message Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    {contact.subject.charAt(0).toUpperCase() + contact.subject.slice(1).replace("-", " ")} Inquiry
                  </CardTitle>
                  {getStatusBadge(contact.status)}
                </div>
                <CardDescription>
                  Received on{" "}
                  {new Date(contact.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{contact.message}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg">{contact.name}</h4>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${contact.email}`} className="hover:text-primary">
                    {contact.email}
                  </a>
                </div>

                {contact.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${contact.phone}`} className="hover:text-primary">
                      {contact.phone}
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(contact.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Update Status</label>
                  <Select value={contact.status || "new"} onValueChange={updateStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" asChild>
                    <a
                      href={`mailto:${contact.email}?subject=Re: ${contact.subject}&body=Hi ${contact.name},%0D%0A%0D%0AThank you for contacting us.%0D%0A%0D%0ABest regards,%0D%0ACoffeeShop Team`}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Reply via Email
                    </a>
                  </Button>

                  {contact.phone && (
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <a href={`tel:${contact.phone}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call Customer
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
