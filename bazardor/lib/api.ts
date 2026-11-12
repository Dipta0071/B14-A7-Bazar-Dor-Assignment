
import { Product } from "@/types/product";

const API_URL = "https://api.api-store.workers.dev/api/bazardor";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const result: unknown = await response.json();

  // API may return an array directly or an object containing products.
  if (Array.isArray(result)) {
    return result as Product[];
  }

  if (
    result &&
    typeof result === "object" &&
    "products" in result &&
    Array.isArray(result.products)
  ) {
    return result.products as Product[];
  }

  if (
    result &&
    typeof result === "object" &&
    "data" in result &&
    Array.isArray(result.data)
  ) {
    return result.data as Product[];
  }

  throw new Error("API response format is not recognized");
}
export async function getProductById(id: string): Promise<Product | null> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const result: unknown = await response.json();

  if (!result || typeof result !== "object") {
    throw new Error("Invalid API response");
  }

  if ("product" in result && result.product) {
    return result.product as Product;
  }

  if ("data" in result && result.data) {
    return result.data as Product;
  }

  return result as Product;
}