import { SITE } from "../site";

export const SEO_PAGES = [
  {
    path: "/",
    locale: "en",
    title: "Free JSON Formatter — Beautify & Validate JSON Online | No Sign-Up",
    description:
      "Format messy JSON, validate syntax and JSON Schema, edit with Monaco, and download results. 100% in your browser. Free, no account.",
    h1: "Free JSON formatter, validator, and beautifier",
    keywords: "free json formatter, json beautifier, json validator, online json editor",
    paragraphs: [
      "Paste API responses, config files, or log snippets and prettify them instantly. Free JSON Formatter runs entirely in your browser with the Monaco editor — the same engine many IDEs use.",
      "Turn on validation to catch trailing commas, bad quotes, and schema mismatches before they reach production. Upload a file, load from a URL (when CORS allows), or type directly.",
      "No sign-up, no server-side storage. Optional peer-to-peer share uses WebRTC only when you choose it.",
    ],
    faq: [
      {
        q: "Is Free JSON Formatter really free?",
        a: "Yes. There is no subscription and no account. Formatting happens in your browser.",
      },
      {
        q: "Does my JSON get uploaded to a server?",
        a: "No. Processing stays on your device unless you explicitly download or use peer share.",
      },
      {
        q: "Can I validate JSON Schema?",
        a: "Yes. Enable validation in the sidebar and pick a schema from the catalog or paste a URL.",
      },
    ],
    tool: true,
  },
  {
    path: "/fr/",
    locale: "fr",
    title: "Formateur JSON gratuit — Embellir et valider en ligne | Sans inscription",
    description:
      "Formatez du JSON, validez la syntaxe et les schémas, éditez avec Monaco. 100 % dans le navigateur, gratuit.",
    h1: "Formateur et validateur JSON gratuit",
    keywords: "formateur json, json en ligne, valider json",
    paragraphs: [
      "Collez une réponse d’API ou un fichier de configuration et obtenez un JSON lisible en un clic. L’outil fonctionne entièrement dans votre navigateur.",
      "Activez la validation pour détecter les erreurs de syntaxe ou d’écart par rapport à un schéma JSON.",
      "Aucune inscription. Vos données restent sur votre appareil.",
    ],
    faq: [
      {
        q: "L’outil est-il gratuit ?",
        a: "Oui, sans compte obligatoire.",
      },
      {
        q: "Mes données sont-elles envoyées sur un serveur ?",
        a: "Non, sauf si vous téléchargez ou partagez vous-même.",
      },
    ],
    tool: true,
  },
  {
    path: "/json-beautifier-no-signup",
    locale: "en",
    title: "JSON Beautifier Online — No Sign-Up | Free JSON Formatter",
    description:
      "Beautify minified JSON for free in your browser. No account, instant formatting and download.",
    h1: "JSON beautifier with no sign-up",
    keywords: "json beautifier no sign up, prettify json",
    paragraphs: [
      "Developers often need a quick beautifier without pasting secrets into a random SaaS. This page opens the same client-side formatter focused on prettifying minified JSON.",
      "Works offline after the first load (PWA). Large files may take a moment because Monaco is powerful but heavy.",
    ],
    faq: [
      {
        q: "How do I beautify JSON?",
        a: "Paste your JSON, click Format, and copy or download the result.",
      },
    ],
    tool: true,
  },
  {
    path: "/json-validator-browser",
    locale: "en",
    title: "JSON Validator in the Browser — Free Schema Check",
    description:
      "Validate JSON syntax and optional JSON Schema in the browser. Free, private, no upload.",
    h1: "Browser-based JSON validator",
    keywords: "json validator browser, validate json online",
    paragraphs: [
      "Invalid JSON breaks APIs and configs. Paste your document, enable validation in the sidebar, and see errors inline in the editor.",
      "Schema validation uses public catalogs where possible; you can also point at your own schema URL.",
    ],
    faq: [
      {
        q: "Where are validation errors shown?",
        a: "Monaco underlines issues in the editor when validation is enabled.",
      },
    ],
    tool: true,
  },
  {
    path: "/privacy",
    locale: "en",
    title: "Privacy — Free JSON Formatter",
    description: "Privacy policy for Free JSON Formatter on web-free.site.",
    h1: "Privacy",
    paragraphs: [
      "Free JSON Formatter does not operate a user database. JSON you edit stays in your browser memory unless you download it.",
      "Adsterra ad codes may set cookies when enabled; refer to their policy for ad personalization.",
      "Contact gentil@quevvy.com for privacy questions.",
    ],
    faq: [],
    tool: false,
  },
  {
    path: "/terms",
    locale: "en",
    title: "Terms — Free JSON Formatter",
    description: "Terms of use for Free JSON Formatter.",
    h1: "Terms of use",
    paragraphs: [
      "This tool is provided as-is without warranty. You are responsible for data you paste, including secrets.",
      "Do not use the site for unlawful content.",
    ],
    faq: [],
    tool: false,
  },
  {
    path: "/about",
    locale: "en",
    title: "About — Free JSON Formatter",
    description: "About Free JSON Formatter and upstream JSON Crew (MIT).",
    h1: "About",
    paragraphs: [
      "Free JSON Formatter is a rebranded deployment of the open-source JSON Crew project (MIT) by Agney Menon, extended with SEO pages and hosting for web-free.site.",
      `More free tools: ${SITE.hubUrl}`,
    ],
    faq: [],
    tool: false,
  },
  {
    path: "/contact",
    locale: "en",
    title: "Contact — Free JSON Formatter",
    description: "Contact for Free JSON Formatter support.",
    h1: "Contact",
    paragraphs: [`Email ${SITE.contactEmail} for support or corrections.`],
    faq: [],
    tool: false,
  },
];

export function canonicalFor(path) {
  const normalized = path === "/" ? "/" : path.replace(/\/$/, "") || "/";
  if (normalized === "/") {
    return `${SITE.canonicalHost}/`;
  }
  return `${SITE.canonicalHost}${normalized.startsWith("/") ? normalized : `/${normalized}`}`;
}

export function findSeoPage(pathname) {
  if (pathname === "/fr") {
    return SEO_PAGES.find((p) => p.path === "/fr/");
  }
  return SEO_PAGES.find((p) => p.path === pathname) ?? SEO_PAGES[0];
}