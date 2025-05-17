import type { Saree } from "./types"

// Mock data for sarees
const mockSarees: Saree[] = [
  {
    id: "1",
    title: "Kanchipuram Silk Saree",
    description: "Handwoven pure silk saree with intricate gold zari work, perfect for weddings and special occasions.",
    price: 15999,
    inStock: true,
    imageUrl: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "2",
    title: "Banarasi Silk Saree",
    description:
      "Traditional Banarasi silk saree with rich gold and silver brocade work, a timeless classic for your collection.",
    price: 12999,
    inStock: true,
    imageUrl: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "3",
    title: "Mysore Silk Saree",
    description: "Lightweight Mysore silk saree with a subtle sheen and elegant border, perfect for formal occasions.",
    price: 8999,
    inStock: false,
    imageUrl: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "4",
    title: "Cotton Handloom Saree",
    description: "Handwoven cotton saree with contemporary designs, comfortable for everyday wear.",
    price: 3999,
    inStock: true,
    imageUrl: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "5",
    title: "Chanderi Silk Cotton Saree",
    description: "Lightweight Chanderi silk-cotton blend with traditional motifs, perfect for semi-formal occasions.",
    price: 5999,
    inStock: true,
    imageUrl: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "6",
    title: "Pochampally Ikat Saree",
    description: "Handcrafted Pochampally Ikat saree with geometric patterns, a unique addition to your wardrobe.",
    price: 7499,
    inStock: true,
    imageUrl: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "7",
    title: "Tussar Silk Saree",
    description: "Natural Tussar silk saree with hand-painted traditional motifs, an eco-friendly choice.",
    price: 6999,
    inStock: false,
    imageUrl: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "8",
    title: "Linen Saree",
    description: "Premium linen saree with minimalist design, perfect for summer and casual wear.",
    price: 4999,
    inStock: true,
    imageUrl: "/placeholder.svg?height=400&width=300",
  },
]

// Get all sarees
export async function getSarees(): Promise<Saree[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return [...mockSarees]
}

// Get a saree by ID
export async function getSareeById(id: string): Promise<Saree | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const saree = mockSarees.find((s) => s.id === id)
  return saree || null
}

// Add a new saree
export async function addSaree(saree: Omit<Saree, "id">): Promise<Saree> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newSaree: Saree = {
    ...saree,
    id: Math.random().toString(36).substring(2, 9),
  }

  mockSarees.push(newSaree)
  return newSaree
}

// Update a saree
export async function updateSaree(id: string, saree: Partial<Saree>): Promise<Saree | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const index = mockSarees.findIndex((s) => s.id === id)
  if (index === -1) return null

  mockSarees[index] = { ...mockSarees[index], ...saree }
  return mockSarees[index]
}

// Delete a saree
export async function deleteSaree(id: string): Promise<boolean> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const index = mockSarees.findIndex((s) => s.id === id)
  if (index === -1) return false

  mockSarees.splice(index, 1)
  return true
}
