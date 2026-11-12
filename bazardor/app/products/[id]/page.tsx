
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/api";

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const changeColor =
    product.change.dir === "up"
      ? "text-red-600"
      : product.change.dir === "down"
        ? "text-green-600"
        : "text-gray-600";

  const changeLabel =
    product.change.dir === "up"
      ? "দাম বেড়েছে"
      : product.change.dir === "down"
        ? "দাম কমেছে"
        : "দামের পরিবর্তন নেই";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        <Link
          href="/"
          className="mb-8 inline-block font-medium text-green-700 hover:underline"
        >
          ← সব পণ্যে ফিরে যান
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

            <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-green-50 text-6xl">
              {product.image}
            </div>

            <div>
              <p className="text-sm font-semibold text-green-700">
                {product.categoryIcon} {product.categoryNameBn}
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-gray-500">
                প্রতি {product.unit}
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-xl bg-green-50 p-6">
            <p className="text-sm font-medium text-gray-600">
              আজকের বাজার দর
            </p>

            <p className="mt-2 text-4xl font-extrabold text-green-800">
              ৳{product.today}
            </p>

            <p className={`mt-3 font-semibold ${changeColor}`}>
              {changeLabel} ({product.change.pct}%)
            </p>
          </div>

          <h2 className="mt-10 text-xl font-bold text-gray-900">
            আগের দিনের দামের তুলনা
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">গতকাল</p>
              <p className="mt-2 text-xl font-bold">
                ৳{product.yesterday}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">গত সপ্তাহ</p>
              <p className="mt-2 text-xl font-bold">
                ৳{product.lastWeek}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">গত মাস</p>
              <p className="mt-2 text-xl font-bold">
                ৳{product.lastMonth}
              </p>
            </div>

          </div>

          <h2 className="mt-10 text-xl font-bold text-gray-900">
            বিভিন্ন বাজারে দাম
          </h2>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3">বাজার</th>
                  <th className="px-4 py-3">বিভাগ</th>
                  <th className="px-4 py-3">সর্বনিম্ন</th>
                  <th className="px-4 py-3">সর্বোচ্চ</th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="border-b border-gray-100"
                  >
                    <td className="px-4 py-4 font-medium">
                      {market.market}
                    </td>
                    <td className="px-4 py-4">
                      {market.division}
                    </td>
                    <td className="px-4 py-4 text-green-700">
                      ৳{market.min}
                    </td>
                    <td className="px-4 py-4 text-red-600">
                      ৳{market.max}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </main>
  );
}
