"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Menu, X, Heart, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/ui/cart-context"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cart } = useCart()

  const categories = [
    "Silk Sarees",
    "Cotton Sarees",
    "Linen Sarees",
    "Designer Sarees",
    "Bridal Collection",
    "Casual Wear",
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="Pavitra" width={32} height={32} />
            <span className="text-xl font-bold text-sky-950">Pavitra</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sky-950 hover:text-sky-600">
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sky-950 hover:text-sky-600">
                Categories <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem key={category}>
                    <Link href={`/sarees?category=${category.toLowerCase().replace(" ", "-")}`}>{category}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/about" className="text-sky-950 hover:text-sky-600">
              About
            </Link>
            <Link href="/contact" className="text-sky-950 hover:text-sky-600">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-sky-950 hover:text-sky-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-sky-950 hover:text-sky-600">
              <User className="h-5 w-5" />
            </Button>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="text-sky-950 hover:text-sky-600 relative">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-sky-600">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-sky-950 hover:text-sky-600 hover:bg-sky-50"
            >
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/sarees?category=${category.toLowerCase().replace(" ", "-")}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-sky-950 hover:text-sky-600 hover:bg-sky-50"
              >
                {category}
              </Link>
            ))}
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-sky-950 hover:text-sky-600 hover:bg-sky-50"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-sky-950 hover:text-sky-600 hover:bg-sky-50"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
