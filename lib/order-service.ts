import type { Order, OrderStatus } from "./types"

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: "ord-001",
    orderNumber: "ORD-20230501-001",
    customerId: "cust-001",
    customerInfo: {
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 98765 43210",
      address: {
        street: "123 Silk Road",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400001",
        country: "India",
      },
    },
    items: [
      {
        id: "item-001",
        sareeId: "1",
        title: "Kanchipuram Silk Saree",
        price: 15999,
        quantity: 1,
        imageUrl: "/placeholder.svg?height=400&width=300",
      },
      {
        id: "item-002",
        sareeId: "5",
        title: "Chanderi Silk Cotton Saree",
        price: 5999,
        quantity: 1,
        imageUrl: "/placeholder.svg?height=400&width=300",
      },
    ],
    totalAmount: 21998,
    status: "delivered",
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
    createdAt: "2023-05-01T10:30:00Z",
    updatedAt: "2023-05-05T14:20:00Z",
    shippingMethod: "Express Delivery",
    trackingNumber: "IND123456789",
    notes: "Gift wrapped as requested",
  },
  {
    id: "ord-002",
    orderNumber: "ORD-20230510-002",
    customerId: "cust-002",
    customerInfo: {
      name: "Rahul Patel",
      email: "rahul.patel@example.com",
      phone: "+91 87654 32109",
      address: {
        street: "456 Cotton Lane",
        city: "Delhi",
        state: "Delhi",
        postalCode: "110001",
        country: "India",
      },
    },
    items: [
      {
        id: "item-003",
        sareeId: "2",
        title: "Banarasi Silk Saree",
        price: 12999,
        quantity: 1,
        imageUrl: "/placeholder.svg?height=400&width=300",
      },
    ],
    totalAmount: 12999,
    status: "shipped",
    paymentMethod: "UPI",
    paymentStatus: "paid",
    createdAt: "2023-05-10T15:45:00Z",
    updatedAt: "2023-05-12T09:30:00Z",
    shippingMethod: "Standard Delivery",
    trackingNumber: "IND987654321",
  },
  {
    id: "ord-003",
    orderNumber: "ORD-20230515-003",
    customerId: "cust-003",
    customerInfo: {
      name: "Ananya Desai",
      email: "ananya.desai@example.com",
      phone: "+91 76543 21098",
      address: {
        street: "789 Linen Street",
        city: "Bangalore",
        state: "Karnataka",
        postalCode: "560001",
        country: "India",
      },
    },
    items: [
      {
        id: "item-004",
        sareeId: "4",
        title: "Cotton Handloom Saree",
        price: 3999,
        quantity: 2,
        imageUrl: "/placeholder.svg?height=400&width=300",
      },
      {
        id: "item-005",
        sareeId: "8",
        title: "Linen Saree",
        price: 4999,
        quantity: 1,
        imageUrl: "/placeholder.svg?height=400&width=300",
      },
    ],
    totalAmount: 12997,
    status: "processing",
    paymentMethod: "Net Banking",
    paymentStatus: "paid",
    createdAt: "2023-05-15T12:15:00Z",
    updatedAt: "2023-05-16T10:45:00Z",
    shippingMethod: "Standard Delivery",
  },
  {
    id: "ord-004",
    orderNumber: "ORD-20230520-004",
    customerId: "cust-004",
    customerInfo: {
      name: "Vikram Singh",
      email: "vikram.singh@example.com",
      phone: "+91 65432 10987",
      address: {
        street: "101 Designer Avenue",
        city: "Jaipur",
        state: "Rajasthan",
        postalCode: "302001",
        country: "India",
      },
    },
    items: [
      {
        id: "item-006",
        sareeId: "6",
        title: "Pochampally Ikat Saree",
        price: 7499,
        quantity: 1,
        imageUrl: "/placeholder.svg?height=400&width=300",
      },
    ],
    totalAmount: 7499,
    status: "pending",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "pending",
    createdAt: "2023-05-20T18:30:00Z",
    updatedAt: "2023-05-20T18:30:00Z",
    shippingMethod: "Standard Delivery",
  },
  {
    id: "ord-005",
    orderNumber: "ORD-20230525-005",
    customerId: "cust-005",
    customerInfo: {
      name: "Meera Kapoor",
      email: "meera.kapoor@example.com",
      phone: "+91 54321 09876",
      address: {
        street: "202 Silk Market",
        city: "Chennai",
        state: "Tamil Nadu",
        postalCode: "600001",
        country: "India",
      },
    },
    items: [
      {
        id: "item-007",
        sareeId: "1",
        title: "Kanchipuram Silk Saree",
        price: 15999,
        quantity: 1,
        imageUrl: "/placeholder.svg?height=400&width=300",
      },
    ],
    totalAmount: 15999,
    status: "cancelled",
    paymentMethod: "Credit Card",
    paymentStatus: "refunded",
    createdAt: "2023-05-25T09:15:00Z",
    updatedAt: "2023-05-26T14:30:00Z",
    shippingMethod: "Express Delivery",
    notes: "Customer requested cancellation due to change of mind",
  },
  {
    id: "ord-006",
    orderNumber: "ORD-20230601-006",
    customerId: "cust-006",
    customerInfo: {
      name: "Arjun Reddy",
      email: "arjun.reddy@example.com",
      phone: "+91 43210 98765",
      address: {
        street: "303 Cotton Road",
        city: "Hyderabad",
        state: "Telangana",
        postalCode: "500001",
        country: "India",
      },
    },
    items: [
      {
        id: "item-008",
        sareeId: "2",
        title: "Banarasi Silk Saree",
        price: 12999,
        quantity: 1,
        imageUrl: "/placeholder.svg?height=400&width=300",
      },
      {
        id: "item-009",
        sareeId: "4",
        title: "Cotton Handloom Saree",
        price: 3999,
        quantity: 1,
        imageUrl: "/placeholder.svg?height=400&width=300",
      },
    ],
    totalAmount: 16998,
    status: "delivered",
    paymentMethod: "UPI",
    paymentStatus: "paid",
    createdAt: "2023-06-01T11:45:00Z",
    updatedAt: "2023-06-05T16:20:00Z",
    shippingMethod: "Standard Delivery",
    trackingNumber: "IND567891234",
  },
  {
    id: "ord-007",
    orderNumber: "ORD-20230605-007",
    customerId: "cust-007",
    customerInfo: {
      name: "Neha Gupta",
      email: "neha.gupta@example.com",
      phone: "+91 32109 87654",
      address: {
        street: "404 Linen Lane",
        city: "Kolkata",
        state: "West Bengal",
        postalCode: "700001",
        country: "India",
      },
    },
    items: [
      {
        id: "item-010",
        sareeId: "8",
        title: "Linen Saree",
        price: 4999,
        quantity: 2,
        imageUrl: "/placeholder.svg?height=400&width=300",
      },
    ],
    totalAmount: 9998,
    status: "returned",
    paymentMethod: "Debit Card",
    paymentStatus: "refunded",
    createdAt: "2023-06-05T14:30:00Z",
    updatedAt: "2023-06-10T11:15:00Z",
    shippingMethod: "Express Delivery",
    trackingNumber: "IND345678912",
    notes: "Customer returned due to color mismatch",
  },
  {
    id: "ord-008",
    orderNumber: "ORD-20230610-008",
    customerId: "cust-008",
    customerInfo: {
      name: "Kiran Joshi",
      email: "kiran.joshi@example.com",
      phone: "+91 21098 76543",
      address: {
        street: "505 Designer Street",
        city: "Ahmedabad",
        state: "Gujarat",
        postalCode: "380001",
        country: "India",
      },
    },
    items: [
      {
        id: "item-011",
        sareeId: "5",
        title: "Chanderi Silk Cotton Saree",
        price: 5999,
        quantity: 1,
        imageUrl: "/placeholder.svg?height=400&width=300",
      },
      {
        id: "item-012",
        sareeId: "6",
        title: "Pochampally Ikat Saree",
        price: 7499,
        quantity: 1,
        imageUrl: "/placeholder.svg?height=400&width=300",
      },
    ],
    totalAmount: 13498,
    status: "processing",
    paymentMethod: "Net Banking",
    paymentStatus: "paid",
    createdAt: "2023-06-10T16:45:00Z",
    updatedAt: "2023-06-11T09:30:00Z",
    shippingMethod: "Standard Delivery",
  },
  {
    id: "ord-009",
    orderNumber: "ORD-20230615-009",
    customerId: "cust-009",
    customerInfo: {
      name: "Sanjay Mehta",
      email: "sanjay.mehta@example.com",
      phone: "+91 10987 65432",
      address: {
        street: "606 Silk Colony",
        city: "Lucknow",
        state: "Uttar Pradesh",
        postalCode: "226001",
        country: "India",
      },
    },
    items: [
      {
        id: "item-013",
        sareeId: "1",
        title: "Kanchipuram Silk Saree",
        price: 15999,
        quantity: 1,
        imageUrl: "/placeholder.svg?height=400&width=300",
      },
    ],
    totalAmount: 15999,
    status: "shipped",
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
    createdAt: "2023-06-15T10:15:00Z",
    updatedAt: "2023-06-17T14:30:00Z",
    shippingMethod: "Express Delivery",
    trackingNumber: "IND789123456",
  },
  {
    id: "ord-010",
    orderNumber: "ORD-20230620-010",
    customerId: "cust-010",
    customerInfo: {
      name: "Divya Nair",
      email: "divya.nair@example.com",
      phone: "+91 09876 54321",
      address: {
        street: "707 Cotton Market",
        city: "Pune",
        state: "Maharashtra",
        postalCode: "411001",
        country: "India",
      },
    },
    items: [
      {
        id: "item-014",
        sareeId: "4",
        title: "Cotton Handloom Saree",
        price: 3999,
        quantity: 3,
        imageUrl: "/placeholder.svg?height=400&width=300",
      },
    ],
    totalAmount: 11997,
    status: "pending",
    paymentMethod: "UPI",
    paymentStatus: "pending",
    createdAt: "2023-06-20T13:45:00Z",
    updatedAt: "2023-06-20T13:45:00Z",
    shippingMethod: "Standard Delivery",
  },
]

// Get all orders
export async function getOrders(): Promise<Order[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return [...mockOrders]
}

// Get recent orders (last 5)
export async function getRecentOrders(limit = 5): Promise<Order[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...mockOrders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

// Get order by ID
export async function getOrderById(id: string): Promise<Order | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const order = mockOrders.find((o) => o.id === id)
  return order || null
}

// Update order status
export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const index = mockOrders.findIndex((o) => o.id === id)
  if (index === -1) return null

  mockOrders[index] = {
    ...mockOrders[index],
    status,
    updatedAt: new Date().toISOString(),
  }

  return mockOrders[index]
}

// Update tracking number
export async function updateTrackingNumber(id: string, trackingNumber: string): Promise<Order | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const index = mockOrders.findIndex((o) => o.id === id)
  if (index === -1) return null

  mockOrders[index] = {
    ...mockOrders[index],
    trackingNumber,
    updatedAt: new Date().toISOString(),
  }

  return mockOrders[index]
}

// Add order notes
export async function addOrderNotes(id: string, notes: string): Promise<Order | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const index = mockOrders.findIndex((o) => o.id === id)
  if (index === -1) return null

  mockOrders[index] = {
    ...mockOrders[index],
    notes,
    updatedAt: new Date().toISOString(),
  }

  return mockOrders[index]
}

// Get order statistics
export async function getOrderStatistics(): Promise<{
  total: number
  pending: number
  processing: number
  shipped: number
  delivered: number
  cancelled: number
  returned: number
  totalRevenue: number
}> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    total: mockOrders.length,
    pending: mockOrders.filter((o) => o.status === "pending").length,
    processing: mockOrders.filter((o) => o.status === "processing").length,
    shipped: mockOrders.filter((o) => o.status === "shipped").length,
    delivered: mockOrders.filter((o) => o.status === "delivered").length,
    cancelled: mockOrders.filter((o) => o.status === "cancelled").length,
    returned: mockOrders.filter((o) => o.status === "returned").length,
    totalRevenue: mockOrders
      .filter((o) => o.paymentStatus === "paid")
      .reduce((sum, order) => sum + order.totalAmount, 0),
  }
}
