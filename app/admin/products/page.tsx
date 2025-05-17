"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Package, ArrowUpDown } from "lucide-react"
import { getSarees, deleteSaree } from "@/lib/saree-service"
import type { Saree } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

export default function AdminProductsPage() {
  const [sarees, setSarees] = useState<Saree[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadSarees()
  }, [])

  async function loadSarees() {
    try {
      setLoading(true)
      const data = await getSarees()
      setSarees(data)
    } catch (error) {
      console.error("Failed to load sarees:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSaree = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this saree?")) {
      try {
        await deleteSaree(id)
        setSarees(sarees.filter((saree) => saree.id !== id))
      } catch (error) {
        console.error("Failed to delete saree:", error)
      }
    }
  }

  const filteredSarees = sarees.filter(
    (saree) =>
      saree.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      saree.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-sky-950">Products</h1>
          <p className="text-gray-500">Manage your saree inventory</p>
        </div>
        <Button className="bg-sky-600 hover:bg-sky-700">
          <Plus className="mr-2 h-4 w-4" /> Add New Saree
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search sarees..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="sm:w-[150px]">
          <ArrowUpDown className="mr-2 h-4 w-4" /> Sort
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell">Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
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
            ) : filteredSarees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  No sarees found
                </TableCell>
              </TableRow>
            ) : (
              filteredSarees.map((saree) => (
                <TableRow key={saree.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-md overflow-hidden mr-3 bg-gray-100 relative">
                        <Package className="h-6 w-6 absolute inset-0 m-auto text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium">{saree.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{saree.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>₹{saree.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        saree.inStock
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {saree.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">Silk</TableCell>
                  <TableCell className="hidden md:table-cell">May 15, 2023</TableCell>
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
                          <Link href={`/admin/products/edit/${saree.id}`} className="flex items-center w-full">
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => handleDeleteSaree(saree.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
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
