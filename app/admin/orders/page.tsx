"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MoreHorizontal,
  ArrowUpDown,
  Eye,
  FileText,
  Truck,
  CheckCircle,
  XCircle,
  Package,
  RotateCcw,
} from "lucide-react"
import { getOrders } from "@/lib/order-service"
import type { Order, OrderStatus } from "@/lib/types"
import { formatDate } from "@/lib/utils"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    try {
      setLoading(true)
      const data = await getOrders()
      setOrders(data)
    } catch (error) {
      console.error("Failed to load orders:", error)
    } finally {
      setLoading(false)
    }
  }

  // Filter and sort orders
  const filteredOrders = orders
    .filter((order) => {
      // Status filter
      if (statusFilter !== "all" && order.status !== statusFilter) {
        return false
      }

      // Search filter
      const searchLower = searchQuery.toLowerCase()
      return (
        searchQuery === "" ||
        order.orderNumber.toLowerCase().includes(searchLower) ||
        order.customerInfo.name.toLowerCase().includes(searchLower) ||
        order.customerInfo.email.toLowerCase().includes(searchLower)
      )
    })
    .sort((a, b) => {
      // Sort by date
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

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
        return <Package className="h-4 w-4 text-yellow-600" />
      case "processing":
        return <Package className="h-4 w-4 text-blue-600" />
      case "shipped":
        return <Truck className="h-4 w-4 text-indigo-600" />
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "returned":
        return <RotateCcw className="h-4 w-4 text-orange-600" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-sky-950">Orders</h1>
          <p className="text-gray-500">Manage and track customer orders</p>
        </div>
        <Button className="bg-sky-600 hover:bg-sky-700">
          <FileText className="mr-2 h-4 w-4" /> Export Orders
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as OrderStatus | "all")}>
          <SelectTrigger className="sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="returned">Returned</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          className="sm:w-[150px]"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          {sortOrder === "asc" ? "Oldest First" : "Newest First"}
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  <div className="flex justify-center">
                    <svg
                      className="animate-spin h-6 w-6 text-sky-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link href={`/admin/orders/${order.id}`} className="font-medium text-sky-600 hover:text-sky-700">
                      {order.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customerInfo.name}</div>
                      <div className="text-sm text-gray-500">{order.customerInfo.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>₹{order.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      {getStatusBadge(order.status)}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
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
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href={`/admin/orders/${order.id}`} className="flex items-center w-full">
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/admin/orders/${order.id}/invoice`} className="flex items-center w-full">
                            <FileText className="mr-2 h-4 w-4" /> View Invoice
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
