import pool from "@/lib/db";
import Link from "next/link";
import Image from "next/image";

export default async function ProductsPage() {
  const { rows: products } = await pool.query(
    "SELECT id, slug, name, price_cents, image_url FROM products ORDER BY name"
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold mb-6">All Products</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {products.map((p) => (
      <Link key={p.id} href={`/products/${p.slug}`}>
        <div className="border dark:border-gray-700 rounded-lg p-4 h-full transition hover:shadow-lg hover:-translate-y-1 dark:hover:shadow-gray-700">
          <Image
            src={p.image_url}
            alt={p.name}
            width={300}
            height={300}
            className="w-full h-40 object-contain mb-3"
          />
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">{p.name}</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">KES {(p.price_cents / 100).toLocaleString()}</p>
        </div>
      </Link>
    ))}
  </div>
</main>
  );
}