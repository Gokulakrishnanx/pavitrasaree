export interface Saree {
  id: string
  title: string
  description: string
  price: number
  inStock: boolean
  imageUrl: string
  category?: string
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "returned"

export interface OrderItem {
  id: string
  sareeId: string
  title: string
  price: number
  quantity: number
  imageUrl: string
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerInfo: CustomerInfo
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  paymentMethod: string
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  createdAt: string
  updatedAt: string
  shippingMethod: string
  trackingNumber?: string
  notes?: string
}
