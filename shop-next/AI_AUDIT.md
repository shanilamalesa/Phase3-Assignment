<!-- ### app/page.js
- Classification: Server Component
- Reason: Fetches data; no state or event handlers.

### app/components/Counter.jsx
- Classification: Client Component
- Reason: Uses useState and onClick.

### app/layout.js
- Classification: Server Component
- Reason: No interactivity. -->


# AI_AUDIT.md — Week 14, Day 1

## AI Usage Log

### What I used AI for (allowed)
- Explaining how `loading.js` works in the App Router — that Next.js
  detects it by file name/location and wraps the page in a Suspense
  boundary automatically, with no imports needed.
- Understanding what a "route folder" means (any folder containing a
  `page.js`, where `app/` itself is the route folder for "/").
- Explaining what `metadata` is for (browser tab titles, SEO, link
  previews) and how layout metadata merges with per-page metadata,
  with the page overriding the layout.
- Clarifying that `metadata` can only be exported from Server
  Components, since the <head> is built on the server.


### What I did NOT use AI for (per the rules)
- Writing my first `page.js` and `layout.js` — typed from the
  assignment brief myself.
- Deciding which components are Server vs Client — all
  classifications below are my own reasoning.

### What I wrote manually
- `app/page.js`, `app/layout.js`, `app/about/page.js`,
  `app/loading.js`, `app/components/Counter.jsx`
- All metadata exports and the classification log below.

## Server/Client Classification Log

### app/page.js
- Classification: Server Component
- Reason: Fetches data; no state or event handlers.

### app/components/Counter.jsx
- Classification: Client Component
- Reason: Uses useState and onClick.

### app/layout.js
- Classification: Server Component
- Reason: No interactivity.

# AI Usage Log — Week 14, Day 2 (Leads page from Postgres)

## What I used AI for

### Concept explanations
- Understanding the big shift of Day 2: a Server Component can query
  Postgres directly (`pool.query`) with no Express API in between —
  the page component runs on the server and ships finished HTML.
- What the `@/` import alias means (project root, set up by
  create-next-app).
- Why the pool is stored on `globalThis` in `lib/db.js` (Next.js dev
  hot-reload would otherwise create a new connection pool on every
  reload and leak connections).
- Cache behaviour: what `revalidate = 0` and `dynamic = "force-dynamic"`
  do, why a CRM needs fresh data but a blog/about page benefits from
  caching, and what ISR is. I wrote my own explanations and AI
  reviewed them for accuracy.
- How `searchParams` works: passed to the page as a prop by Next.js,
  must be awaited in this Next.js version, and enables shareable /
  bookmarkable filter URLs.
- Why parameterized queries ($1 + values array) are required for URL
  input instead of string concatenation (SQL injection).
- Why `error.js` must be a Client Component while `loading.js` is not
  (server crashes must be caught in the browser; reset() is an onClick
  handler).
- The difference between loading.js (whole-route fallback) and
  <Suspense> (per-island streaming), and how to split a page into a
  fast shell + slow async table component.

### Debugging help (AI guided, I ran/fixed everything)
- "SASL: client password must be a string" → traced with a debug
  console.log to an env variable naming mismatch: db.js read PG_*
  variables while .env.local defined DB_* names. Renamed to match.
  Learned that .env.local is only read at server startup.
- "column source does not exist" → inspected the real schema with
  `\d leads` in psql; this database uses `channel` (whatsapp/ussd/web)
  instead of `source`. Fixed the SELECT and the JSX.
- "searchParams is not defined" → the prop was not destructured in the
  page function signature, and casing must be exactly `searchParams`.
- "Cannot read properties of undefined (reading 'map')" → I had mixed
  two unpacking styles (`const { rows } = result.rows`). Fixed to
  `const rows = result.rows`.
- Suspense refactor review: my first attempt put the test delay inside
  loading.js (which must render instantly), and my second attempt
  duplicated the query in both components without rendering
  <LeadsTable /> inside <Suspense>. AI explained the correct
  shell/island split and I restructured the file.

## What I did NOT use AI for
- Deciding Server vs Client classifications — all reasoning in the
  classification log is my own 
- Running all commands, SQL checks, and edits myself.

## What I wrote manually
- The cache behaviour written answers (revalidate = 0, when caching is
  wanted, ISR) — AI reviewed them afterwards.
- .env.local values, the classification log entries.


# AI Usage Log — Week 14, Day 3 (Products & Dynamic Routes)


## What I used AI for

### Content generation (declared)
- The 8 skincare seed products (names, descriptions, prices, stock
  values) and the image URL UPDATE statements. I chose the niche and
  ran/verified all SQL myself.

### Concept explanations
- What a "slug" is and why it must be UNIQUE (URL-friendly identifier
  used for lookup on the dynamic route).
- What "seeding" and a "niche" mean; why prices are stored as
  integer cents instead of decimals (floating point money errors).
- How dynamic routes work: the `[slug]` wildcard folder, one file
  serving a page per product; `params` vs `searchParams`.
- Why `notFound()` guards against slugs that match no product.
- `generateMetadata` (function) vs `metadata` (constant) for
  database-driven titles, and extending it with OpenGraph tags so
  shared links render preview cards on WhatsApp/social platforms.
- `next/image` vs plain `<img>`: automatic resizing, WebP, lazy
  loading, layout-shift prevention, mandatory width/height, and the
  remotePatterns allowlist in next.config.mjs.
- `object-cover` vs `object-contain` for product photos.
- Why OpenGraph previews cannot be tested from localhost (the
  platform's servers must be able to reach the URL).


## What I did NOT use AI for
- Choosing the niche and product theme.
- Running all SQL, git, and file operations myself.
- Server/Client classification decisions (log below is my reasoning).
