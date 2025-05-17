import type { Metadata } from "next"
import { getSareeById } from "@/lib/saree-service"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const saree = await getSareeById(params.id)

  if (!saree) {
    return {
      title: "Saree Not Found | Pavitra",
    }
  }

  return {
    title: `${saree.title} | Pavitra Sarees`,
    description: saree.description,
  }
} 