import pool from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { rows } = await pool.query("SELECT name FROM products WHERE slug = $1", [slug]);
  const product = rows[0];

  if (!product ) return { title: "Not found"};

  return { 
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image_url],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const { rows } = await pool.query("SELECT * FROM products WHERE slug = $1", [slug]);
  const product = rows[0];
  if (!product) notFound();

  const { rows: related } = await pool.query(
  "SELECT slug, name, price_cents, image_url FROM products WHERE slug != $1 ORDER BY RANDOM() LIMIT 3",
  [slug]
);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <Image src={product.image_url} alt={product.name} width={400} height={400} className="w-full max-w-md" />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>KES {(product.price_cents / 100).toLocaleString()}</p>
      <p>{product.in_stock > 0 ? `${product.in_stock} in stock` : "Out of stock"}</p>

      <h2 className="mt-8 font-bold">You might also like</h2>
    <div className="grid grid-cols-3 gap-4">
      {related.map((p) => (
        <Link key={p.slug} href={`/products/${p.slug}`}>
          <div className="border rounded p-4">
            <Image src={p.image_url} alt={p.name} width={300} height={300} className="w-full h-32 object-cover" />
            <h3>{p.name}</h3>
            <p>KES {(p.price_cents / 100).toLocaleString()}</p>
          </div>
        </Link>
      ))}
    </div>
    </main>
  );
}

export async function generateStaticParams() {
  const { rows } = await pool.query("SELECT slug FROM products");
  return rows.map((row) => ({ slug: row.slug }));
}