
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const priceDirection =
    product.change.dir === "up"
      ? "text-red-600"
      : product.change.dir === "down"
      ? "text-green-600"
      : "text-gray-500";

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block rounded-xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-24 items-center justify-center rounded-lg bg-gray-50 text-5xl">
        {product.image}
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-green-700">
          {product.categoryNameBn}
        </p>

        <h3 className="mt-1 text-lg font-bold text-gray-900">
          {product.nameBn}
        </h3>

        <p className="mt-3 text-sm text-gray-500">
          আজকের বাজারদর
        </p>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="text-xl font-bold text-gray-900">
            ৳{product.today}
            <span className="ml-1 text-xs font-normal text-gray-500">
              / {product.unit}
            </span>
          </p>

          <span className={`text-sm font-semibold ${priceDirection}`}>
            {product.change.dir === "up"
              ? "↑"
              : product.change.dir === "down"
              ? "↓"
              : "—"}
            {" "}
            {Math.abs(product.change.pct)}%
          </span>
        </div>

        <p className="mt-3 text-sm font-semibold text-green-700 group-hover:underline">
          বিস্তারিত দেখুন →
        </p>
      </div>
    </Link>
  );
}
