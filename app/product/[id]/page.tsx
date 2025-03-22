"use client"

import { ContactForm } from "@/components/contact-form"
import { ProductCard } from "@/components/product-card"
import { ProductDetail } from "@/components/product-detail"
import { products } from "@/lib/products"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function Home() {
  const { id } = useParams()
  const product = products.find((p) => p.id == id)

  if (!product) {
    return <div className="text-center py-10 text-red-500">Sản phẩm không tồn tại!</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nhựa Hoa Mai</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="/" className="text-xl font-medium hover:text-primary">
                  Trang Chủ
                </a>
              </li>
              <li>
                <p className="text-xl font-medium hover:text-primary">
                  Liên hệ trực tiếp qua:  0962023819 / 0934641558
                </p>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4 md:px-6">
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Quality Products for You</h2>
        </section>

        <section id="products" className="mb-16">
          <ProductDetail product={product} />
          <div className="mt-24 py-16 flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold mb-12">Liên Hệ Với Chúng Tôi</h1>
            <div className="max-w-xl w-full">
              <ContactForm productName={product.name} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t mt-12">
        <div className="container mx-auto py-6 px-4 md:px-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nhựa Hoa Mai . All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

