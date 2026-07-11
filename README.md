# Mctaba Shop — Next.js (Week 14)

Phase 3 of the Mctaba Labs Full-Stack Marathon. This week switches
from Vite + React to **Next.js with the App Router**. The project
connects a Next.js app directly to PostgreSQL — no Express API layer.

## Day 1 — Scaffold, Server & Client Components

- **Server Component with data fetching** — the home page
  (`app/page.js`) fetches posts on the server with a plain
  `await fetch()`. No `useEffect`, no `useState`. The data is already
  in the HTML when it reaches the browser.
- **Client Component boundary** — `app/components/Counter.jsx` is
  marked `"use client"` because it uses `useState` and `onClick`.
- **File-based routing** — `app/about/page.js` becomes `/about`
  automatically.
- **Shared layout** — `app/layout.js` wraps every page with a nav.
- **Stretch goals** — `loading.js` for the home route, per-page
  `metadata` exports for unique tab titles.

## Day 2 — Leads page from Postgres

- **Direct database access from a Server Component** —
  `app/leads/page.js` queries the `leads` table via `pg` with a shared
  connection pool (`lib/db.js`). The pool is cached on `globalThis` so
  dev hot-reloads don't leak connections.
- **Cache behaviour** — the leads route exports
  `dynamic = "force-dynamic"` because CRM data must always be fresh.
  Static pages (about) stay cached by default.
- **URL filters** — `/leads?status=new` reads `searchParams` in the
  Server Component and filters with a parameterized query
  (`WHERE status = $1`) to prevent SQL injection.
- **Error boundary (stretch)** — `app/leads/error.js` is a Client
  Component with a `reset()` retry button; it catches rendering/query
  crashes.
- **Suspense streaming (stretch)** — the page is split into a fast
  shell (heading renders instantly) and an async `LeadsTable` island
  inside `<Suspense>`, which streams in when the query completes.

## Project structure

shop-next/
├── app/
│   ├── layout.js              # Root layout with nav (Server)
│   ├── page.js                # Home — fetches posts (Server)
│   ├── loading.js             # Loading state for home route
│   ├── about/
│   │   └── page.js            # /about (Server)
│   ├── components/
│   │   └── Counter.jsx        # Interactive counter (Client)
│   └── leads/
│       ├── page.js            # /leads — queries Postgres (Server)
│       ├── loading.js         # Loading state for leads route
│       └── error.js           # Error boundary (Client)
├── lib/
│   └── db.js                  # pg connection pool
└── .env.local                 # PG_* credentials (not committed)

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

Open http://localhost:3000/leads — try `/leads?status=new` for
filtering.

## Tech stack

- Next.js (App Router)
- React (Server + Client Components, Suspense)
- PostgreSQL via `pg`
- Tailwind CSS

## Author

Shanila Malesa — Mctaba Labs Full-Stack Marathon, Phase 3


