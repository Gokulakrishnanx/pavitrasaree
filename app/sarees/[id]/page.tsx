"use client"

import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Share2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getSareeById } from "@/lib/saree-service"
import RelatedSarees from "@/components/related-sarees"
import { useCart } from "@/components/ui/cart-context"

export default async function SareeDetailPage({ params }: { params: { id: string } }) {
  const saree = await getSareeById(params.id)
  const { addToCart } = useCart()

  if (!saree) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <Link href="/sarees" className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Sarees
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-[500px] rounded-lg overflow-hidden border border-sky-100">
            <Image
              src={saree.imageUrl || "/placeholder.svg"}
              alt={saree.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="relative h-24 rounded-md overflow-hidden border border-sky-100 cursor-pointer hover:border-sky-400"
              >
                <Image
                  src={saree.imageUrl || "/placeholder.svg"}
                  alt={`${saree.title} view ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-sky-950 mb-2">{saree.title}</h1>
            <p className="text-gray-600 mb-4">{saree.description}</p>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="text-gray-500">(24 reviews)</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-sky-600">₹{saree.price.toLocaleString()}</span>
              {saree.inStock ? (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>
          </div>

          <div className="space-y-4 py-4 border-t border-b border-gray-200">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Color</h3>
              <div className="flex space-x-2">
                {["bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500"].map((color) => (
                  <div
                    key={color}
                    className={`${color} w-8 h-8 rounded-full cursor-pointer border-2 border-white ring-2 ring-transparent hover:ring-sky-300`}
                  ></div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Material</h3>
              <div className="flex flex-wrap gap-2">
                {["Silk", "Cotton", "Linen"].map((material) => (
                  <Badge key={material} variant="outline" className="cursor-pointer border-sky-200 hover:bg-sky-50">
                    {material}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-sky-600 hover:bg-sky-700 flex-1 sm:flex-none" 
              disabled={!saree.inStock}
              onClick={() => addToCart(saree)}
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="border-sky-600 text-sky-600 hover:bg-sky-50">
              <Heart className="mr-2 h-5 w-5" /> Wishlist
            </Button>
            <Button size="icon" variant="outline" className="border-sky-600 text-sky-600 hover:bg-sky-50">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4 pt-6">
            <h3 className="text-lg font-semibold text-sky-950">Product Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Material</p>
                <p className="font-medium">Pure Silk</p>
              </div>
              <div>
                <p className="text-gray-600">Length</p>
                <p className="font-medium">6.3 meters</p>
              </div>
              <div>
                <p className="text-gray-600">Blouse Piece</p>
                <p className="font-medium">Included</p>
              </div>
              <div>
                <p className="text-gray-600">Care</p>
                <p className="font-medium">Dry Clean Only</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-sky-950 mb-6">You May Also Like</h2>
        <RelatedSarees currentSareeId={saree.id} />
      </div>
    </div>
  )
}
