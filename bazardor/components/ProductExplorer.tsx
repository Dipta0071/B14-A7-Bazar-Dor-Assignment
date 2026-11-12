
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import ProductGrid from "@/components/ProductGrid";

interface ProductExplorerProps {
  products: Product[];
}

export default function ProductExplorer({
  products,
}: ProductExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Create a unique list of categories from the products
  const categories = useMemo(() => {
    return Array.from(
      new Map(
        products.map((product) => [
          product.category,
          {
            id: product.category,
            name: product.categoryNameBn,
            icon: product.categoryIcon,
          },
        ])
      ).values()
    );
  }, [products]);

  // Filter products according to the search term
  const filteredProducts = products.filter((product) =>
    product.nameBn
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <section>
      {/* Search input */}
      <div className="mb-6">
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="পণ্যের নাম লিখে খুঁজুন..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
        />
      </div>

      {/* Category navigation */}
      <div className="mb-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-green-600 hover:bg-green-50"
        >
          সকল পণ্য
        </Link>

        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-green-600 hover:bg-green-50"
          >
            {category.icon} {category.name}
          </Link>
        ))}
      </div>

      {/* Product heading and count */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          সকল পণ্য
        </h2>

        <span className="text-sm text-gray-500">
          {filteredProducts.length}টি পণ্য
        </span>
      </div>

      {/* Product results */}
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="rounded-xl bg-white py-16 text-center">
          <p className="text-4xl">🔍</p>

          <h3 className="mt-4 text-lg font-bold text-gray-900">
            কোনো পণ্য পাওয়া যায়নি
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            অন্য নাম দিয়ে খুঁজে দেখুন।
          </p>

          <button
            onClick={() => setSearchTerm("")}
            className="mt-5 rounded-lg bg-green-700 px-5 py-2 font-semibold text-white transition hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </button>
        </div>
      )}
    </section>
  );
}
