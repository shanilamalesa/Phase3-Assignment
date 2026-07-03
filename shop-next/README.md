# Mctaba Shop — Next.js (Week 14, Day 1)

Phase 3 of the Mctaba Labs Full-Stack Marathon. This week switches
from Vite + React to **Next.js 14 with the App Router**. Day 1 covers
scaffolding the project and understanding Server vs Client Components.

## What this project demonstrates

- **Server Component with data fetching** — the home page (`app/page.js`)
  fetches posts on the server with a plain `await fetch()`. No `useEffect`,
  no `useState`, no client-side loading logic. The data is already in the
  HTML when it reaches the browser.
- **Client Component boundary** — `app/components/Counter.jsx` is marked
  with `"use client"` because it uses `useState` and an `onClick` handler.
  It is rendered *inside* a Server Component.
- **File-based routing** — `app/about/page.js` becomes the `/about` route
  automatically. No router library needed.
- **Shared layout** — `app/layout.js` wraps every page with the same nav.
- **Loading state (stretch goal)** — `app/loading.js` renders automatically
  while the home page fetch is in flight. Next.js wires it up by file name.
- **Per-page metadata (stretch goal)** — each page exports its own
  `metadata` for unique browser tab titles, overriding the layout default.

## Project structure
shop-next/
└── app/
├── layout.js          # Root layout with nav (Server)
├── page.js            # Home — fetches posts (Server)
├── loading.js         # Loading state for home route
├── about/
│   └── page.js        # /about route (Server)
└── components/
└── Counter.jsx    # Interactive counter (Client)

## Running the project

```bash
cd shop-next
npm install
npm run dev
```

Open http://localhost:3000

## Tech stack

- Next.js 14 (App Router)
- React
- Tailwind CSS

## Author

Shanila Malesa — Mctaba Labs Full-Stack Marathon, Phase 3

See `AI_AUDIT.md` for the AI usage log and the Server/Client
classification log.
