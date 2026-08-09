---
title: Agent discovery edge configuration
---

# Agent discovery edge configuration

The discovery documents in `static/.well-known` are deployed by GitHub Pages.
GitHub Pages cannot attach the response headers or perform content negotiation
needed by agent clients, so configure them in the Cloudflare zone for
`icodex.me`.

## Link headers

Create a Cloudflare **Modify Response Header** transform rule that matches:

```
http.request.uri.path eq "/"
```

Set the `Link` header to this single comma-separated value:

```
</.well-known/api-catalog>; rel="api-catalog", </.well-known/content-api.openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json;version=3.1", </.well-known/content-api.md>; rel="service-doc"; type="text/markdown", </.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"
```

Create a second response-header rule matching:

```
http.request.uri.path eq "/.well-known/api-catalog"
```

Set `Content-Type` to:

```
application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"
```

The latter is necessary because the static `api-catalog` file has no `.json`
extension, while RFC 9727 requires the Linkset media type.

## Markdown negotiation

In the Cloudflare dashboard, open **icodex.me → AI Crawl Control** and enable
**Markdown for Agents**. It preserves browser HTML by default and returns
`text/markdown` only when the request includes `Accept: text/markdown`.

If the setting should apply only to public articles and documentation, use a
Cloudflare Configuration Rule for the `/` path instead of enabling it for the
whole zone.

## DNS-AID

Do not publish DNS-AID records until icodex operates an agent protocol endpoint
with a documented ALPN value and transport. The blog's content-discovery API is
a static HTTP resource, not an A2A or MCP service. Publishing speculative SVCB
or HTTPS records would direct agents to a service that does not exist.

When an agent service is introduced, publish its DNS-AID records in the domain
DNS provider and enable DNSSEC for the zone; this is domain infrastructure, not
a GitHub Pages artifact.

## WebMCP

`src/theme/Root.tsx` registers two browser tools when WebMCP is available:

- `search_icodex_articles` opens the existing Algolia search route for a query.
- `discover_icodex_content` returns the public RSS feed, sitemap, API catalog,
  and Agent Skills index.

Unsupported browsers continue to render the site normally because registration
is guarded by feature detection. Tool registrations are removed with an
`AbortController` when the root component unmounts.

## Authentication and MCP

This site has no protected API, account system, or MCP server. `/auth.md`
therefore truthfully documents unauthenticated public access. Add OAuth/OIDC
metadata, protected-resource metadata, or an MCP Server Card only together with
the corresponding real service.

## Verify after deployment

```bash
curl -sSI https://icodex.me/ | grep -i '^link:'
curl -sSI https://icodex.me/.well-known/api-catalog | grep -i '^content-type:'
curl -sS -D - -o /dev/null -H 'Accept: text/markdown' https://icodex.me/ \
  | grep -Ei '^(content-type|vary|x-markdown-tokens):'
curl -fsS https://icodex.me/.well-known/agent-skills/index.json
```

The final HTTP checks require both the GitHub Pages deployment and the
Cloudflare changes above to be live.
