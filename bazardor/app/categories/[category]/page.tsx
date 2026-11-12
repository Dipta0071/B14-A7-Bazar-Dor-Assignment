
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;
  const allProducts = await getProducts();

  const categoryProducts = allProducts.filter(
    (product) => product.category === category
  );

  if (categoryProducts.length === 0) {
    notFound();
  }

  const categoryName = categoryProducts[0].categoryNameBn;
  const categoryIcon = categoryProducts[0].categoryIcon;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-8 inline-block font-medium text-green-700 hover:underline"
        >
          ← সব পণ্যে ফিরে যান
        </Link>

        <div className="mb-8">
          <p className="font-semibold text-green-700">
            {categoryIcon} পণ্যের ক্যাটাগরি
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
            {categoryName}
          </h1>

          <p className="mt-2 text-gray-600">
            এই ক্যাটাগরির {categoryProducts.length}টি পণ্যের বর্তমান বাজার দর।
          </p>
        </div>

        <ProductGrid products={categoryProducts} />
      </div>
    </main>
  );
}
