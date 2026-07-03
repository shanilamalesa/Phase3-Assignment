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