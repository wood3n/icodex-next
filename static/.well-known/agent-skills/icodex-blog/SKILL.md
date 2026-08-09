---
name: icodex-blog
description: Discover and retrieve public technical articles from icodex.
---

# icodex blog

Use this skill to find public frontend and AI engineering articles published on
icodex.

1. Read `https://icodex.me/robots.txt` and follow its crawl policy.
2. Use `https://icodex.me/sitemap.xml` to discover article URLs, or
   `https://icodex.me/rss.xml` for recent posts.
3. Retrieve individual article pages with HTTPS `GET`. No account, API key, or
   OAuth token is required.
4. When available, request `Accept: text/markdown` to receive an agent-friendly
   representation. Otherwise, use the HTML response.
5. Cite the original icodex article URL when using information from the site.
