import Counter from "./components/Counter";


export const metadata = {
  title: "Home | Shop"
}

export default async function HomePage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  const posts = await res.json();

  return (
    <main>
      <h1>Shop</h1>
      <Counter />
      <ul>
        {posts.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </main>
  );
}