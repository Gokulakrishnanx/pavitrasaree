"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getSarees } from "@/lib/saree-service"
import type { Saree } from "@/lib/types"

export default function SareeList() {
  const [sarees, setSarees] = useState<Saree[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSarees() {
      try {
        const data = await getSarees()
        setSarees(data)
      } catch (error) {
        console.error("Failed to load sarees:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSarees()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
            <div className="h-64 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    )
  }

  if (sarees.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-600">No sarees found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 max-w-7xl">
      {sarees.map((saree) => (
        <div key={saree.id} className="bg-white rounded-xl shadow-lg overflow-hidden group transition-transform duration-200 hover:-translate-y-1" style={{ minHeight: 480 }}>
          <Link href={`/sarees/${saree.id}`} className="block relative h-72 overflow-hidden">
            <Image
              src={saree.imageUrl || "/placeholder.svg"}
              alt={saree.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {!saree.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive" className="text-lg py-1 px-3">
                  Out of Stock
                </Badge>
              </div>
            )}
          </Link>
          <div className="p-6">
            <Link href={`/sarees/${saree.id}`} className="block">
              <h3 className="text-lg font-semibold text-sky-950 mb-1 hover:text-sky-600 transition-colors">
                {saree.title}
              </h3>
            </Link>
            <p className="text-gray-500 text-sm mb-2 line-clamp-2">{saree.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-sky-600 font-bold">₹{saree.price.toLocaleString()}</p>
              <Button size="sm" disabled={!saree.inStock} className="bg-sky-600 hover:bg-sky-700">
                <ShoppingCart className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
