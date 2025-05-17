import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-sky-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="relative h-10 w-10 mr-2 bg-white rounded-full p-1">
                <Image src="/placeholder.svg?height=40&width=40" alt="Pavitra Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold">Pavitra</span>
            </div>
            <p className="text-sky-200 mb-4">
              Discover the elegance of traditional Indian sarees with our exquisite collection of handcrafted pieces.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-sky-200 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-sky-200 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-sky-200 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-sky-200 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sarees" className="text-sky-200 hover:text-white">
                  All Sarees
                </Link>
              </li>
              <li>
                <Link href="/category/silk-sarees" className="text-sky-200 hover:text-white">
                  Silk Sarees
                </Link>
              </li>
              <li>
                <Link href="/category/cotton-sarees" className="text-sky-200 hover:text-white">
                  Cotton Sarees
                </Link>
              </li>
              <li>
                <Link href="/category/designer-sarees" className="text-sky-200 hover:text-white">
                  Designer Sarees
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sky-200 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sky-200 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-sky-200 hover:text-white">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-2 text-sky-200 shrink-0" />
                <span className="text-sky-200">123 Silk Street, Fashion District, Mumbai, India - 400001</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 mr-2 text-sky-200 shrink-0" />
                <Link href="tel:+919876543210" className="text-sky-200 hover:text-white">
                  +91 98765 43210
                </Link>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-2 text-sky-200 shrink-0" />
                <Link href="mailto:info@pavitra.com" className="text-sky-200 hover:text-white">
                  info@pavitra.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sky-900 mt-12 pt-6 text-center text-sky-300 text-sm">
          <p>© {new Date().getFullYear()} Pavitra. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/shipping-policy" className="hover:text-white">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
