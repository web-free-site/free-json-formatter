import fs from "node:fs";
import path from "node:path";
import { HOST, PRERENDER_PAGES } from "./seo-data.mjs";

const dist = path.resolve("dist");
const baseHtml = fs.readFileSync(path.join(dist, "index.html"), "utf8");

function jsonLdFor(page) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free JSON Formatter",
        url: `${HOST}${page.path === "/" ? "/" : page.path}`,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: page.description,
        inLanguage: page.locale,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is Free JSON Formatter free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Formatting runs in your browser with no account.",
            },
          },
        ],
      },
    ],
  });
}

function buildPage(page) {
  const url = HOST + (page.path === "/" ? "/" : page.path);
  let html = baseHtml;
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${page.locale}"`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${page.description}" />`,
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${url}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${page.title}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${page.description}" />`,
  );
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">${jsonLdFor(page)}</script>`,
  );

  const seoBlock = `<section id="seo-prerender" class="seo-prerender"><h1>${page.h1}</h1>${page.snippet}</section>`;
  if (html.includes('id="seo-prerender"')) {
    html = html.replace(
      /<section id="seo-prerender"[\s\S]*?<\/section>/,
      seoBlock,
    );
  } else {
    html = html.replace('<div id="root"></div>', `${seoBlock}<div id="root"></div>`);
  }

  return html;
}

for (const page of PRERENDER_PAGES) {
  const dir = path.join(dist, page.path.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), buildPage(page));
}

const frOnly = path.join(dist, "fr", "index.html");
if (fs.existsSync(frOnly)) {
  fs.writeFileSync(
    path.join(dist, "fr.html"),
    fs.readFileSync(frOnly, "utf8"),
  );
}

console.log("Prerendered", PRERENDER_PAGES.length, "route shells");