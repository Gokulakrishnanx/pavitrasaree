import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import FeaturedSarees from "@/components/featured-sarees"
import { ArrowRight, ShoppingBag } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sky-100 to-white py-16 px-4 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sky-950">
                Discover Elegance with <span className="text-sky-600">Pavitra</span> Sarees
              </h1>
              <p className="text-lg text-gray-700 max-w-xl">
                Explore our exquisite collection of handcrafted sarees, designed to bring out the beauty in every woman.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-sky-600 hover:bg-sky-700">
                  Shop Now <ShoppingBag className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-sky-600 text-sky-600 hover:bg-sky-50">
                  View Collections
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative h-[400px] w-full md:h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Elegant Saree Collection"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-sky-600 font-semibold">New Arrivals</p>
                <p className="text-gray-700">Exclusive Collection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sarees */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-sky-950">Featured Sarees</h2>
            <Link href="/sarees" className="text-sky-600 hover:text-sky-700 flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <FeaturedSarees />
        </div>
      </section>

      {/* Banner Section */}
      <section className="bg-sky-700 text-white py-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Discover Your Perfect Saree</h2>
          <p className="text-lg mb-8">Browse our collections and find a saree that speaks to your style.</p>
          <Link href="/sarees">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sky-700">
              Shop All Sarees
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-sky-950 mb-8 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md border border-sky-100">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/placeholder.svg?height=50&width=50"
                      alt="Customer"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Customer Name</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The quality and craftsmanship of Pavitra sarees are exceptional. I received so many compliments!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
