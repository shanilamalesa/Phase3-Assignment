# Mctaba Shop — Next.js (Week 14)

Phase 3 of the Mctaba Labs Full-Stack Marathon. This week switches
from Vite + React to **Next.js with the App Router**. The project
connects a Next.js app directly to PostgreSQL — no Express API layer.

## Day 1 — Scaffold, Server & Client Components

- **Server Component with data fetching** — the home page (`app/page.js`)
  fetches posts on the server with a plain `await fetch()`. No
  `useEffect`, no `useState`. The data is already in the HTML.
- **Client Component boundary** — `app/components/Counter.jsx` is marked
  `"use client"` because it uses `useState` and `onClick`.
- **File-based routing** — `app/about/page.js` becomes `/about`
  automatically.
- **Shared layout** — `app/layout.js` wraps every page with a nav.
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
- **Dynamic product pages** — `app/products/[slug]/page.js` serves a
  page per product from one wildcard file; unknown slugs return
  `notFound()`.
- **Dynamic metadata + OpenGraph (stretch)** — `generateMetadata`
  builds the tab title and OpenGraph tags (title, description, image)
  per product from the database, so shared links render preview cards.
- **Image optimisation (stretch)** — `next/image` with a
  `remotePatterns` allowlist in `next.config.mjs`.
- **Related products (stretch)** — each product page shows 3 random
  other products ("You might also like").

## Project structure

```
shop-next/
├── app/
│   ├── layout.js              # Root layout with nav (Server)
│   ├── page.js                # Home — fetches posts (Server)
│   ├── loading.js             # Loading state for home route
│   ├── about/
│   │   └── page.js            # /about (Server)
│   ├── components/
│   │   └── Counter.jsx        # Interactive counter (Client)
│   ├── leads/
│   │   ├── page.js            # /leads — queries Postgres (Server)
│   │   ├── loading.js         # Loading state for leads route
│   │   └── error.js           # Error boundary (Client)
│   └── products/
│       ├── page.js            # /products grid (Server)
│       └── [slug]/
│           └── page.js        # Dynamic product page (Server)
├── lib/
│   └── db.js                  # pg connection pool
└── .env.local                 # PG_* credentials (not committed)
```
## Running the project

```bash
cd shop-next
npm install
```

Create `shop-next/.env.local` with your Postgres credentials:
PG_HOST=localhost
PG_PORT=5432
PG_USER=your_user
PG_PASSWORD=your_password
PG_DATABASE=your_database

Then:

```bash
npm run dev
```

Open http://localhost:3000/products — click any product for its
detail page. Also try /leads?status=new for filtering.

## Tech stack

- Next.js (App Router)
- React (Server + Client Components, Suspense)
- PostgreSQL via `pg`
- Tailwind CSS

## Author

Shanila Malesa — Mctaba Labs Full-Stack Marathon, Phase 3

See `AI_AUDIT.md` for the AI usage log and Server/Client
classification log.
