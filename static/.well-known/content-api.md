# icodex Content Discovery API

This public, read-only endpoint advertises the resources used to discover
content published by icodex. It requires no credentials and supports only
`GET` requests.

## Endpoint

`GET https://icodex.me/.well-known/content-api.json`

The response lists the RSS feed, sitemap, and crawl policy with absolute URLs
and media types. Its OpenAPI description is available at
`/.well-known/content-api.openapi.json`; the health document is
`/.well-known/content-api-status.json`.
