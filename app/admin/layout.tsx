"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, Menu, X, ShoppingCart } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("pavitra_admin_auth")
      setIsAuthenticated(auth === "true")
      setLoading(false)
    }

    checkAuth()
  }, [])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [isAuthenticated, loading, pathname, router])

  // If on login page or loading, just render children
  if (pathname === "/admin/login" || loading) {
    return <>{children}</>
  }

  // If not authenticated, don't render anything (will redirect)
  if (!isAuthenticated) {
    return null
  }

  const handleLogout = () => {
    localStorage.removeItem("pavitra_admin_auth")
    router.push("/admin/login")
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <Image src="/placeholder.svg?height=32&width=32" alt="Pavitra Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold text-sky-950">Pavitra</span>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm rounded-md ${
                    isActive ? "bg-sky-100 text-sky-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-sky-700" : "text-gray-500"}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-4">
          <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="ml-auto flex items-center space-x-2">
            <Link href="/" className="text-sm text-sky-600 hover:text-sky-700">
              View Site
            </Link>
            <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-medium">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
