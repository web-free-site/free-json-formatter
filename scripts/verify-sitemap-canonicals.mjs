import fs from "node:fs";
import path from "node:path";
import { HOST, SITEMAP_PATHS } from "./seo-data.mjs";

const dist = path.resolve("dist");

function htmlPathFor(sitemapPath) {
  if (sitemapPath === "/") return path.join(dist, "index.html");
  const slug = sitemapPath.replace(/^\//, "").replace(/\/$/, "");
  return path.join(dist, slug, "index.html");
}

function expectedUrl(sitemapPath) {
  return `${HOST}${sitemapPath === "/" ? "/" : sitemapPath}`;
}

let failed = false;

for (const sitemapPath of SITEMAP_PATHS) {
  const file = htmlPathFor(sitemapPath);
  const expected = expectedUrl(sitemapPath);
  if (!fs.existsSync(file)) {
    console.error(`MISSING HTML for ${sitemapPath}: ${file}`);
    failed = true;
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const canon = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  const og = html.match(/<meta\s+property="og:url"\s+content="([^"]+)"/i)?.[1];
  if (canon !== expected) {
    console.error(`${sitemapPath}: canonical expected ${expected}, got ${canon ?? "(none)"}`);
    failed = true;
  }
  if (og !== expected) {
    console.error(`${sitemapPath}: og:url expected ${expected}, got ${og ?? "(none)"}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log(`Verified canonical + og:url for ${SITEMAP_PATHS.length} sitemap URLs`);