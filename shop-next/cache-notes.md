## Revalidate = 0 means
--> This tells Next.js to completely disable the cache for a specific page as it enforces the server to render to render the page on every single incoming request.

## When would you NOT want fresh data (e.g., a blog post)
--> We would not want a fresh data e.g for a blog post on  every incoming request for pages when the content rarely changes. As fetching data from a database or API on every hit takes time and the server processing power.

## What is ISR (Incremental Static Regeneration) and when is it the sweet spot?
--> ISR (Incremental Static Regeneration) is a feature that lets you update static pages after you have buld without needing to rebuild the entire website. Sweet spot  is when the site has a lot of pages containing content that changes occassionally, but does not need to be live second by second.