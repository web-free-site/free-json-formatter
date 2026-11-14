# Free JSON Formatter

Client-side JSON formatter, validator, and editor for [free-json-formatter.web-free.site](https://free-json-formatter.web-free.site).

Based on [agneym/json-formatter](https://github.com/agneym/json-formatter) (JSON Crew, MIT). See `LICENSE`.

## Develop

```bash
bun install
bun run start
```

## Build

```bash
bun run build
```

Output: `dist/` (includes prerendered SEO shells, `sitemap.xml`, and `ads.json`).

## Deploy

Deployment is handled outside this repo (Cloudflare Workers static assets via `wrangler.toml`).