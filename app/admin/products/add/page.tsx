"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Upload, X } from "lucide-react"
import { addSaree } from "@/lib/saree-service"
import Link from "next/link"

export default function AddSareePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    inStock: true,
    category: "",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, inStock: checked }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required"
    } else if (isNaN(Number.parseFloat(formData.price)) || Number.parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number"
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required"
    }

    if (!imagePreview) {
      newErrors.image = "Image is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // In a real app, you would upload the image to a storage service
      // and get back a URL to store in the database
      const imageUrl = imagePreview || "/placeholder.svg"

      const newSaree = {
        title: formData.title,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        inStock: formData.inStock,
        category: formData.category,
        imageUrl,
      }

      await addSaree(newSaree)
      router.push("/admin/products")
    } catch (error) {
      console.error("Failed to add saree:", error)
      setErrors({ submit: "Failed to add saree. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="text-sky-600 hover:text-sky-700">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-sky-950">Add New Saree</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={5}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">
                        Price (₹) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        className={errors.price ? "border-red-500" : ""}
                      />
                      {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={errors.category ? "border-red-500" : ""}
                      />
                      {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="inStock" checked={formData.inStock} onCheckedChange={handleSwitchChange} />
                    <Label htmlFor="inStock">In Stock</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Image Upload */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <Label>
                      Product Image <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-2">
                      {imagePreview ? (
                        <div className="relative rounded-md overflow-hidden border border-gray-200">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-48 object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={handleRemoveImage}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div
                          className={`border-2 border-dashed rounded-md p-6 text-center ${
                            errors.image ? "border-red-500" : "border-gray-300"
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <Upload className="h-10 w-10 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600 mb-1">Drag and drop an image, or click to browse</p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                            <Input
                              id="image"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              className="mt-4"
                              onClick={() => document.getElementById("image")?.click()}
                            >
                              Browse Files
                            </Button>
                          </div>
                        </div>
                      )}
                      {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image}</p>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{errors.submit}</div>
        )}

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
            Cancel
          </Button>
          <Button type="submit" className="bg-sky-600 hover:bg-sky-700" disabled={loading}>
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Saving...
              </div>
            ) : (
              "Save Saree"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
