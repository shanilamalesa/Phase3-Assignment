import pool from "@/lib/db";

export default async function sitemap() {
  const { rows: products } = await pool.query(
    "SELECT slug, created_at FROM products"
  );

  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const productUrls = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: p.created_at,
  }));

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/products`, lastModified: new Date() },
    ...productUrls,
  ];
}
