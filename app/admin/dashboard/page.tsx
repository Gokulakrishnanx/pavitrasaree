"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Package,
  AlertTriangle,
  ShoppingCart,
  Truck,
  CheckCircle,
  XCircle,
  RotateCcw,
} from "lucide-react"
import { getSarees } from "@/lib/saree-service"
import { getOrderStatistics, getRecentOrders } from "@/lib/order-service"
import type { Saree, Order } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

export default function AdminDashboardPage() {
  const [sarees, setSarees] = useState<Saree[]>([])
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [orderStats, setOrderStats] = useState<{
    total: number
    pending: number
    processing: number
    shipped: number
    delivered: number
    cancelled: number
    returned: number
    totalRevenue: number
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [sareesData, ordersData, statsData] = await Promise.all([
          getSarees(),
          getRecentOrders(5),
          getOrderStatistics(),
        ])

        setSarees(sareesData)
        setRecentOrders(ordersData)
        setOrderStats(statsData)
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Calculate stats
  const totalProducts = sarees.length
  const outOfStock = sarees.filter((saree) => !saree.inStock).length

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-sky-950">Dashboard</h1>
        <p className="text-gray-500">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Products</CardTitle>
            <ShoppingBag className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : totalProducts}</div>
            <p className="text-xs text-gray-500">
              <span className="text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> 12% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : outOfStock}</div>
            <p className="text-xs text-gray-500">
              <span className="text-red-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> 2 more than last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : orderStats?.total || 0}</div>
            <p className="text-xs text-gray-500">
              <span className="text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> 18% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : `₹${orderStats?.totalRevenue.toLocaleString() || 0}`}
            </div>
            <p className="text-xs text-gray-500">
              <span className="text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> 7% from last month
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Order Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="p-2 bg-yellow-100 rounded-full mb-2">
                <Package className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="text-xl font-bold">{loading ? "..." : orderStats?.pending || 0}</div>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="p-2 bg-blue-100 rounded-full mb-2">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-xl font-bold">{loading ? "..." : orderStats?.processing || 0}</div>
              <p className="text-sm text-gray-500">Processing</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="p-2 bg-indigo-100 rounded-full mb-2">
                <Truck className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="text-xl font-bold">{loading ? "..." : orderStats?.shipped || 0}</div>
              <p className="text-sm text-gray-500">Shipped</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="p-2 bg-green-100 rounded-full mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-xl font-bold">{loading ? "..." : orderStats?.delivered || 0}</div>
              <p className="text-sm text-gray-500">Delivered</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="p-2 bg-red-100 rounded-full mb-2">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div className="text-xl font-bold">{loading ? "..." : orderStats?.cancelled || 0}</div>
              <p className="text-sm text-gray-500">Cancelled</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="p-2 bg-orange-100 rounded-full mb-2">
                <RotateCcw className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-xl font-bold">{loading ? "..." : orderStats?.returned || 0}</div>
              <p className="text-sm text-gray-500">Returned</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your customers</CardDescription>
          </div>
          <Link href="/admin/orders" className="text-sm text-sky-600 hover:text-sky-700">
            View All
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium p-2 pl-0">Order ID</th>
                  <th className="text-left font-medium p-2">Customer</th>
                  <th className="text-left font-medium p-2">Date</th>
                  <th className="text-left font-medium p-2">Amount</th>
                  <th className="text-left font-medium p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
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
                    </td>
                  </tr>
                ) : recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3 pl-0">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="font-medium text-sky-600 hover:text-sky-700"
                        >
                          {order.orderNumber}
                        </Link>
                      </td>
                      <td className="py-3">{order.customerInfo.name}</td>
                      <td className="py-3">{formatDate(order.createdAt)}</td>
                      <td className="py-3">₹{order.totalAmount.toLocaleString()}</td>
                      <td className="py-3">{getStatusBadge(order.status)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Products</CardTitle>
            <CardDescription>You have {loading ? "..." : totalProducts} products in your inventory</CardDescription>
          </div>
          <Link href="/admin/products" className="text-sm text-sky-600 hover:text-sky-700">
            View All
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium p-2 pl-0">Product</th>
                  <th className="text-left font-medium p-2">Price</th>
                  <th className="text-left font-medium p-2">Stock</th>
                  <th className="text-left font-medium p-2">Added</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
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
                    </td>
                  </tr>
                ) : sarees.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No products found
                    </td>
                  </tr>
                ) : (
                  sarees.slice(0, 5).map((saree) => (
                    <tr key={saree.id} className="border-b">
                      <td className="py-3 pl-0">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-md overflow-hidden mr-3 bg-gray-100 relative">
                            <Package className="h-6 w-6 absolute inset-0 m-auto text-gray-400" />
                          </div>
                          <span className="font-medium">{saree.title}</span>
                        </div>
                      </td>
                      <td className="py-3">₹{saree.price.toLocaleString()}</td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            saree.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {saree.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="py-3">May 15, 2023</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
