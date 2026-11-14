import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { canonicalFor, findSeoPage } from "./pages";

function upsertMeta(attr, name, content) {
  const selector =
    attr === "name"
      ? `meta[name="${name}"]`
      : `meta[property="${name}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    if (attr === "name") el.setAttribute("name", name);
    else el.setAttribute("property", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function RouteMeta() {
  const location = useLocation();
  const page = findSeoPage(location.pathname);
  const canonical =
    location.pathname === "/fr"
      ? canonicalFor("/fr/")
      : canonicalFor(page.path);

  useEffect(() => {
    document.title = page.title;
    document.documentElement.lang = page.locale;
    upsertMeta("name", "description", page.description);
    upsertMeta("name", "keywords", page.keywords || "");
    upsertLink("canonical", canonical);
    upsertMeta("property", "og:title", page.title);
    upsertMeta("property", "og:description", page.description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:type", "website");
  }, [location.pathname, page, canonical]);

  return null;
}