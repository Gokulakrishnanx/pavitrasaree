"use client"

import { useCart } from "@/components/ui/cart-context"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Saree } from "@/lib/types"

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="container mx-auto max-w-6xl py-16 px-4 text-center">
        <h1 className="text-3xl font-bold text-sky-950 mb-4">Your Cart</h1>
        <p className="text-gray-600 mb-8">Your cart is empty</p>
        <Link href="/sarees">
          <Button className="bg-sky-600 hover:bg-sky-700">Browse Sarees</Button>
        </Link>
      </div>
    )
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-sky-950">Your Cart</h1>
        <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center border-b pb-6 last:border-0 last:pb-0">
              <div className="h-24 w-24 rounded-md overflow-hidden bg-gray-100 relative mr-4">
                <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 line-clamp-1">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-2">Quantity: {item.quantity}</p>
                <p className="text-sky-600 font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Button size="icon" variant="ghost" className="text-gray-500 hover:text-red-600" onClick={() => removeFromCart(item.id)}>
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-100 rounded-lg p-6 space-y-6">
            <h2 className="text-2xl font-bold text-sky-950">Order Summary</h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-gray-950 text-lg border-t pt-4 mt-4">
                <span>Order Total</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>
            <Button className="w-full bg-sky-600 hover:bg-sky-700" size="lg">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 