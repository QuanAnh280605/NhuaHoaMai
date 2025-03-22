import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Heart, Share2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function ProductDetail({ product }) {

  const [selectedImage, setSelectedImage] = useState(product.image || "/placeholder.svg")

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="aspect-square relative rounded-lg overflow-hidden border">
          <Image src={selectedImage} alt={product.name} fill className="object-cover" />
        </div>

        {product.gallery && (
          <div className="grid grid-cols-4 gap-2">
            {product.gallery.map((img, index) => (
              <div
                key={index}
                className="aspect-square relative rounded-md overflow-hidden border cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${product.name} - view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
    </div>

      <div className="space-y-6">
        <div>
          {product.isNew && <Badge className="mb-2">New Arrival</Badge>}
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="font-bold text-2xl">Giá: {product.price}</div>
            {product.oldPrice && (
              <div className="text-muted-foreground line-through">${product.oldPrice.toFixed(2)}</div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl">Mô Tả: </h3>
          <p className="text-muted-foreground">{product.fullDescription || product.description}</p>
        </div>

        {product.features && (
          <div className="space-y-2">
            <h3 className="font-medium">Features</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        <Separator />
      </div>
    </div>
  )
}

