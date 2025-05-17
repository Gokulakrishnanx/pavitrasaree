"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

export default function SareeFilters() {
  const [priceRange, setPriceRange] = useState([1000, 20000])

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={["category", "price", "availability"]}>
        <AccordionItem value="category">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {["Silk", "Cotton", "Linen", "Chiffon", "Georgette", "Designer"].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category}`} />
                  <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sky-950">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                defaultValue={[1000, 20000]}
                min={500}
                max={50000}
                step={500}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger className="text-sky-950">Availability</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="in-stock" defaultChecked />
                <Label htmlFor="in-stock" className="text-sm cursor-pointer">
                  In Stock
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="out-of-stock" />
                <Label htmlFor="out-of-stock" className="text-sm cursor-pointer">
                  Out of Stock
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator />

      <div className="flex gap-2">
        <Button className="w-full bg-sky-600 hover:bg-sky-700">Apply Filters</Button>
        <Button variant="outline" className="border-sky-600 text-sky-600 hover:bg-sky-50">
          Reset
        </Button>
      </div>
    </div>
  )
}
