# auth.md

## Access for agents

icodex is a public, read-only technical blog. Its articles, RSS feed, sitemap,
and discovery documents are available without registration, an API key, or an
OAuth access token.

There are no protected APIs and no agent provisioning or registration endpoint.
Agents should use ordinary HTTPS `GET` requests and respect the crawl policy at
[`/robots.txt`](https://icodex.me/robots.txt).

## Machine-readable resources

- API catalog: <https://icodex.me/.well-known/api-catalog>
- Agent Skills index: <https://icodex.me/.well-known/agent-skills/index.json>
- RSS feed: <https://icodex.me/rss.xml>
- Sitemap: <https://icodex.me/sitemap.xml>
