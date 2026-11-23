import fs from "node:fs";
import path from "node:path";
import { HOST, SITEMAP_PATHS } from "./seo-data.mjs";

const dist = path.resolve("dist");
const publicDir = path.resolve("public");

/** Sitemap paths that are static HTML guides under public/<slug>/index.html */
const GUIDE_PREFIX = "how-to-";

for (const sitemapPath of SITEMAP_PATHS) {
  if (sitemapPath === "/" || !sitemapPath.startsWith(`/${GUIDE_PREFIX}`)) continue;
  const slug = sitemapPath.replace(/^\//, "");
  const src = path.join(publicDir, slug, "index.html");
  if (!fs.existsSync(src)) {
    console.warn(`copy-guide-pages: missing ${src}`);
    continue;
  }
  const destDir = path.join(dist, slug);
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, path.join(destDir, "index.html"));
  const expected = `${HOST}${sitemapPath}`;
  const html = fs.readFileSync(path.join(destDir, "index.html"), "utf8");
  const canon = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  const og = html.match(/<meta\s+property="og:url"\s+content="([^"]+)"/i)?.[1];
  if (canon !== expected || og !== expected) {
    throw new Error(
      `Guide ${slug}: canonical/og:url must be ${expected} (got canonical=${canon}, og:url=${og})`,
    );
  }
}

console.log("Copied static guide pages into dist");