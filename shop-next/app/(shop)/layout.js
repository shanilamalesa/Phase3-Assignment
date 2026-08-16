import Link from "next/link";

export default function ShopLayout({ children }) {
  return (
    <div>
     <header className="bg-gray-900 text-white dark:bg-black p-4">
        <div className="max-w-6xl mx-auto flex justify-between">
          <Link href="/" className="font-bold">Shop</Link>
          <nav className="space-x-4">
            <Link href="/products">All products</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
      </header>
      <div className="max-w-6xl mx-auto p-4">{children}</div>
      <footer className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200 p-4 text-center">Mctaba Shop</footer>
    </div>
  );
}