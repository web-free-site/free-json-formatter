export const messages = {
  en: {
    siteName: "Free JSON Formatter",
    tagline: "Format, validate & beautify JSON in your browser",
    formatJson: "Format JSON",
    language: "Language",
    privacy: "Privacy",
    terms: "Terms",
    about: "About",
    contact: "Contact",
    howTo: "How to",
    faq: "FAQ",
    byHub: "More free tools at web-free.site",
    upstreamCredit: "Editor based on JSON Crew (MIT) by Agney Menon",
    clientSide: "Your JSON never leaves this browser unless you download or share it yourself.",
    sponsored: "Sponsored",
  },
  fr: {
    siteName: "Formateur JSON gratuit",
    tagline: "Formater, valider et embellir du JSON dans le navigateur",
    formatJson: "Formater le JSON",
    language: "Langue",
    privacy: "Confidentialité",
    terms: "Conditions",
    about: "À propos",
    contact: "Contact",
    howTo: "Mode d’emploi",
    faq: "FAQ",
    byHub: "Plus d’outils gratuits sur web-free.site",
    upstreamCredit: "Éditeur basé sur JSON Crew (MIT) par Agney Menon",
    clientSide: "Votre JSON ne quitte pas ce navigateur sauf si vous le téléchargez ou le partagez.",
    sponsored: "Sponsorisé",
  },
};

export function t(locale, key) {
  return messages[locale]?.[key] ?? messages.en[key] ?? key;
}

export function localeFromPath(pathname) {
  return pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
}