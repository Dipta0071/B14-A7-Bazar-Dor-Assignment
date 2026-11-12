
import ProductExplorer from "@/components/ProductExplorer";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  try {
    const products = await getProducts();

    return (
      <main className="min-h-screen bg-gray-50">
        <section className="mx-auto max-w-7xl px-4 py-12">

          {/* Hero */}
          <div className="mb-10">
            <p className="font-semibold text-green-700">
              আপনার প্রতিদিনের বাজারের সঙ্গী
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              আজকের বাজার দর
            </h1>

            <p className="mt-3 text-gray-600">
              নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর
              এক জায়গায় দেখুন।
            </p>
          </div>

          {/* Interactive product explorer */}
          <ProductExplorer products={products} />

        </section>
      </main>
    );
  } catch (error) {
    console.error("Product fetching error:", error);

    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-600">
            পণ্য লোড করা যায়নি
          </h1>

          <p className="mt-2 text-gray-600">
            অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।
          </p>
        </div>
      </main>
    );
  }
}
