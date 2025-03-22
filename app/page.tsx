"use client"

import { useState } from "react"
import { ContactForm } from "@/components/contact-form"
import { ProductCard } from "@/components/product-card"
import { ProductDetail } from "@/components/product-detail"
import { products } from "@/lib/products"
import { Link } from "lucide-react"

export default function Home() {
  const handleProductClick = (product) => {
    window.open(`/product/${product.id}`, "_blank");
  };
  

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nhựa Hoa Mai</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a  href="" className="text-xl font-medium hover:text-primary">
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
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Quality Products for You</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our selection of high-quality products. Click on any product to see more details.
          </p>
        </section>

        {/* Products Section */}
        <section id="products" className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Sản Phẩm Của Chúng Tôi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
            ))}
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

