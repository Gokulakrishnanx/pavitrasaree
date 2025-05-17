"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  FileText,
  Printer,
  Mail,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  RotateCcw,
  Clock,
} from "lucide-react"
import { getOrderById, updateOrderStatus, updateTrackingNumber, addOrderNotes } from "@/lib/order-service"
import type { Order, OrderStatus } from "@/lib/types"
import { formatDate } from "@/lib/utils"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState("")
  const [notes, setNotes] = useState("")
  const [activeTab, setActiveTab] = useState("details")

  useEffect(() => {
    async function loadOrder() {
      try {
        setLoading(true)
        const data = await getOrderById(params.id)
        if (data) {
          setOrder(data)
          setTrackingNumber(data.trackingNumber || "")
          setNotes(data.notes || "")
        } else {
          router.push("/admin/orders")
        }
      } catch (error) {
        console.error("Failed to load order:", error)
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [params.id, router])

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!order) return

    try {
      setUpdating(true)
      const updatedOrder = await updateOrderStatus(order.id, newStatus)
      if (updatedOrder) {
        setOrder(updatedOrder)
      }
    } catch (error) {
      console.error("Failed to update order status:", error)
    } finally {
      setUpdating(false)
    }
  }

  const handleTrackingUpdate = async () => {
    if (!order) return

    try {
      setUpdating(true)
      const updatedOrder = await updateTrackingNumber(order.id, trackingNumber)
      if (updatedOrder) {
        setOrder(updatedOrder)
      }
    } catch (error) {
      console.error("Failed to update tracking number:", error)
    } finally {
      setUpdating(false)
    }
  }

  const handleNotesUpdate = async () => {
    if (!order) return

    try {
      setUpdating(true)
      const updatedOrder = await addOrderNotes(order.id, notes)
      if (updatedOrder) {
        setOrder(updatedOrder)
      }
    } catch (error) {
      console.error("Failed to update notes:", error)
    } finally {
      setUpdating(false)
    }
  }

  // Helper function to get status badge
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>
      case "shipped":
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Shipped</Badge>
      case "delivered":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
      case "returned":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Returned</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Helper function to get status icon
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Package className="h-5 w-5 text-yellow-600" />
      case "processing":
        return <Package className="h-5 w-5 text-blue-600" />
      case "shipped":
        return <Truck className="h-5 w-5 text-indigo-600" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "returned":
        return <RotateCcw className="h-5 w-5 text-orange-600" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <svg
          className="animate-spin h-8 w-8 text-sky-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700">Order not found</h2>
        <p className="text-gray-500 mt-2">The order you're looking for doesn't exist or has been removed.</p>
        <Button className="mt-4" onClick={() => router.push("/admin/orders")}>
          Back to Orders
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="text-sky-600 hover:text-sky-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-sky-950">Order {order.orderNumber}</h1>
            <p className="text-gray-500">Placed on {formatDate(order.createdAt)}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" /> Invoice
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" /> Print
          </Button>
          <Button variant="outline" className="gap-2">
            <Mail className="h-4 w-4" /> Email Customer
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border">
        <div className="p-2 rounded-full bg-gray-100">{getStatusIcon(order.status)}</div>
        <div>
          <p className="text-sm text-gray-500">Order Status</p>
          <div className="flex items-center gap-2">
            <p className="font-medium">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
            {getStatusBadge(order.status)}
          </div>
        </div>
        <div className="ml-auto">
          <Select
            value={order.status}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
            disabled={updating}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Change status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="returned">Returned</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger value="customer">Customer Info</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6 pt-4">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>
                {order.items.length} {order.items.length === 1 ? "item" : "items"} in this order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 relative mr-4">
                      <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₹{item.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-gray-500">Subtotal</p>
                  <p className="font-medium">₹{order.totalAmount.toLocaleString()}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500">Shipping</p>
                  <p className="font-medium">₹0.00</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500">Tax</p>
                  <p className="font-medium">Included</p>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-medium text-lg">
                    <p>Total</p>
                    <p>₹{order.totalAmount.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <p className="text-gray-500">Payment Method</p>
                    <p>{order.paymentMethod}</p>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <p className="text-gray-500">Payment Status</p>
                    <Badge
                      variant={order.paymentStatus === "paid" ? "outline" : "secondary"}
                      className={
                        order.paymentStatus === "paid"
                          ? "border-green-200 text-green-800 bg-green-50"
                          : order.paymentStatus === "refunded"
                            ? "border-orange-200 text-orange-800 bg-orange-50"
                            : ""
                      }
                    >
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer" className="space-y-6 pt-4">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Contact Information</h3>
                  <div className="space-y-1 text-gray-700">
                    <p className="font-medium">{order.customerInfo.name}</p>
                    <p>{order.customerInfo.email}</p>
                    <p>{order.customerInfo.phone}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <div className="space-y-1 text-gray-700">
                    <p>{order.customerInfo.address.street}</p>
                    <p>
                      {order.customerInfo.address.city}, {order.customerInfo.address.state}{" "}
                      {order.customerInfo.address.postalCode}
                    </p>
                    <p>{order.customerInfo.address.country}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="rounded-full bg-green-100 p-2">
                      <Clock className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="h-full w-px bg-gray-200 mt-2"></div>
                  </div>
                  <div>
                    <p className="font-medium">Order Placed</p>
                    <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Order #{order.orderNumber} was placed by {order.customerInfo.name}
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Package className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="h-full w-px bg-gray-200 mt-2"></div>
                  </div>
                  <div>
                    <p className="font-medium">Order Processing</p>
                    <p className="text-sm text-gray-500">{formatDate(order.updatedAt)}</p>
                    <p className="text-sm text-gray-700 mt-1">Order status updated to {order.status}</p>
                  </div>
                </div>

                {order.status === "shipped" && (
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="rounded-full bg-indigo-100 p-2">
                        <Truck className="h-4 w-4 text-indigo-600" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Order Shipped</p>
                      <p className="text-sm text-gray-500">{formatDate(order.updatedAt)}</p>
                      <p className="text-sm text-gray-700 mt-1">
                        Order has been shipped via {order.shippingMethod}
                        {order.trackingNumber && ` with tracking number ${order.trackingNumber}`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-6 pt-4">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Shipping Method</p>
                  <p>{order.shippingMethod}</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Tracking Number</p>
                  <div className="flex gap-2">
                    <Input
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Enter tracking number"
                    />
                    <Button
                      onClick={handleTrackingUpdate}
                      disabled={updating || trackingNumber === order.trackingNumber}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Order Notes</CardTitle>
              <CardDescription>Add internal notes about this order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this order"
                  rows={4}
                />
                <Button onClick={handleNotesUpdate} disabled={updating || notes === order.notes}>
                  Save Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
