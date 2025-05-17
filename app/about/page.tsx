import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Us | Pavitra",
  description: "Learn more about Pavitra and our mission.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
      <h1 className="text-4xl font-bold text-sky-950 mb-6">Our Story</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="prose lg:prose-xl max-w-none text-gray-700">
          <p>
            Pavitra is more than a clothing brand — it's a tribute to heritage, handcrafted with heart in the spiritual city of Varanasi. Our identity is rooted in preserving traditional Indian artistry while embracing the evolving spirit of modern womanhood.
          </p>
          <p>
            At Pavitra, we value authenticity, elegance, and individuality. Whether it's a ready-made bridal lehenga, a handwoven saree, or a fully customized ensemble designed from scratch — each piece is made to honor your story.
          </p>
          <p>
            We blend the richness of Banarasi craftsmanship with contemporary design sensibilities, creating outfits that feel personal, powerful, and timeless.
          </p>
          <p>
            For every bride, every occasion, every dream. Pavitra weaves culture into couture.
          </p>
        </div>
        <div className="relative h-96 w-full rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center shadow-lg">
           <Image src="/placeholder.svg" alt="About Us Image" fill className="object-cover opacity-50" />
           {/* Placeholder for an image */}
           <div className="z-10 text-gray-500">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
             </svg>
           </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mt-16 py-16 bg-sky-50">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-sky-950 mb-2">Our Values</h2>
          <p className="text-gray-600 mb-12">The principles that guide our craft and commitment</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value Card 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-left">
              <h3 className="text-xl font-semibold text-sky-950 mb-2">Artisanal Excellence</h3>
              <p className="text-gray-700">We work with skilled artisans who bring decades of experience and unparalleled craftsmanship to every piece we create.</p>
            </div>

            {/* Value Card 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-left">
              <h3 className="text-xl font-semibold text-sky-950 mb-2">Cultural Heritage</h3>
              <p className="text-gray-700">We preserve and celebrate traditional techniques while breathing new life into ancient art forms.</p>
            </div>

            {/* Value Card 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-left">
              <h3 className="text-xl font-semibold text-sky-950 mb-2">Ethical Production</h3>
              <p className="text-gray-700">We ensure fair wages and safe working conditions for all artisans, while minimizing our environmental impact.</p>
            </div>

            {/* Value Card 4 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-left">
              <h3 className="text-xl font-semibold text-sky-950 mb-2">Quality Materials</h3>
              <p className="text-gray-700">We source only the finest fabrics and materials, ensuring each garment is as luxurious as it is durable.</p>
            </div>

            {/* Value Card 5 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-left">
              <h3 className="text-xl font-semibold text-sky-950 mb-2">Customer Connection</h3>
              <p className="text-gray-700">We build lasting relationships with our customers, offering personalized service and bespoke creations.</p>
            </div>

            {/* Value Card 6 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-left">
              <h3 className="text-xl font-semibold text-sky-950 mb-2">Innovation</h3>
              <p className="text-gray-700">We continually evolve our designs to blend timeless traditions with contemporary aesthetics.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 