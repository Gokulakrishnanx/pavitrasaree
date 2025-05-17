import { Suspense } from "react"
import SareeList from "@/components/saree-list"

export const metadata = {
  title: "Saree Collection | Pavitra",
  description: "Explore our exquisite collection of handcrafted sarees at Pavitra",
}

export default function SareesPage() {
  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <h1 className="text-3xl font-bold text-sky-950 mb-6">Our Saree Collection</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4">
          <Suspense fallback={<SareeListSkeleton />}>
            <SareeList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function SareeListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
