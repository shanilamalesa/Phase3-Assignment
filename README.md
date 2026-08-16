# Mctaba Shop — Next.js (Week 14)

Phase 3 of the Mctaba Labs Full-Stack Marathon. This week switches
from Vite + React to **Next.js with the App Router**. The project
connects a Next.js app directly to PostgreSQL — no Express API layer.

## Day 1 — Scaffold, Server & Client Components

- **Server Component with data fetching** — the home page fetches
  posts on the server with a plain `await fetch()`. No `useEffect`,
  no `useState`. The data is already in the HTML.
- **Client Component boundary** — `app/components/Counter.jsx` is marked
  `"use client"` because it uses `useState` and `onClick`.
- **File-based routing** — `about/page.js` becomes `/about` automatically.
- **Shared layout** — `app/layout.js` provides the html shell, global
  CSS and font.
- **Stretch goals** — `loading.js` for the home route, per-page
  `metadata` exports for unique tab titles.

## Day 2 — Leads page from Postgres

- **Direct database access from a Server Component** — `app/leads/page.js`
  queries the `leads` table via `pg` with a shared connection pool
  (`lib/db.js`), cached on `globalThis` so dev hot-reloads don't leak
  connections.
- **Cache behaviour** — the leads route exports `dynamic = "force-dynamic"`
  because CRM data must always be fresh.
- **URL filters** — `/leads?status=new` reads `searchParams` and filters
  with a parameterized query (`WHERE status = $1`).
- **Error boundary (stretch)** — `app/leads/error.js` is a Client
  Component with a `reset()` retry button.
- **Suspense streaming (stretch)** — fast shell + async `LeadsTable`
  island inside `<Suspense>`.

## Day 3 — Products catalogue & dynamic routes

- **Products table & seed** — `products` in `phase_db` with UUID ids,
  unique slugs, integer `price_cents`, stock counts (8 skincare
  products).
- **Listing page** — `/products` renders a responsive Tailwind grid,
  each card linking to its detail page via `<Link>`.
- **Dynamic product pages** — `products/[slug]/page.js` serves a page
  per product from one wildcard file; unknown slugs return `notFound()`.
  `generateStaticParams` supplies the slug list so pages can be
  pre-rendered at build time.
- **Dynamic metadata + OpenGraph (stretch)** — `generateMetadata`
  builds the tab title and OpenGraph tags per product from the database.
- **Image optimisation (stretch)** — `next/image` with a
  `remotePatterns` allowlist in `next.config.mjs`.
- **Related products (stretch)** — each product page shows 3 random
  other products ("You might also like").

## Day 4 — Layouts, Tailwind polish & SEO

- **Route group layout** — `app/(shop)/layout.js` wraps the home,
  products and about pages with a shared header and footer. The
  parentheses group routes without adding a URL segment, so
  `/products` stays `/products`. `/leads` is deliberately left
  outside the group.
- **Tailwind polish** — responsive product grid (1 column mobile,
  2 tablet, 4 desktop), card hover lift and shadow, consistent
  typography and max-width containers.
- **Per-page metadata** — home, products list and each product page
  export their own title, description and OpenGraph tags.
- **Sitemap** — `app/sitemap.js` generates `/sitemap.xml` from the
  database, listing every product URL with `created_at` as
  `lastModified`. The base URL comes from `NEXT_PUBLIC_SITE_URL`
  rather than being hardcoded.
- **Robots (stretch)** — `app/robots.js` allows crawling of the shop,
  disallows `/leads`, and points crawlers to the sitemap.
- **Self-hosted font (stretch)** — `next/font` bundles the Google font
  at build time, so visitors never request it from Google.
- **Dark mode (stretch)** — Tailwind `dark:` variants across the
  layout, cards and detail pages, following the system colour scheme.

## Project structure

```
shop-next/
├── app/
│   ├── layout.js              # Root layout: html, global CSS, font
│   ├── loading.js             # Loading state for home route
│   ├── sitemap.js             # Generates /sitemap.xml from the DB
│   ├── robots.js              # Generates /robots.txt
│   ├── components/
│   │   └── Counter.jsx        # Interactive counter (Client)
│   ├── leads/
│   │   ├── page.js            # /leads — queries Postgres (Server)
│   │   ├── loading.js         # Loading state for leads route
│   │   └── error.js           # Error boundary (Client)
│   └── (shop)/                # Route group — no URL segment
│       ├── layout.js          # Shared header + footer
│       ├── page.js            # Home "/"
│       ├── about/
│       │   └── page.js        # /about
│       └── products/
│           ├── page.js        # /products grid
│           └── [slug]/
│               └── page.js    # Dynamic product page
├── lib/
│   └── db.js                  # pg connection pool
└── .env.local                 # Credentials (not committed)
```

## Running the project

```bash
cd shop-next
npm install
```

Create `shop-next/.env.local`:

```
PG_HOST=localhost
PG_PORT=5432
PG_USER=your_user
PG_PASSWORD=your_password
PG_DATABASE=your_database
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Then:

```bash
npm run dev
```

Open http://localhost:3000/products — click any product for its
detail page. Also try `/leads?status=new`, `/sitemap.xml` and
`/robots.txt`.

## Tech stack

- Next.js (App Router)
- React (Server + Client Components, Suspense)
- PostgreSQL via `pg`
- Tailwind CSS

## Author

Shanila Malesa — Mctaba Labs Full-Stack Marathon, Phase 3

See `AI_AUDIT.md` for the AI usage log and Server/Client
classification log.