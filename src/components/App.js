import React, { useMemo } from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";

import { localeFromPath } from "../i18n/messages";
import RouteMeta from "../seo/RouteMeta";
import SiteChrome from "./SiteChrome";
import JsonFormatterPage from "../pages/JsonFormatterPage";
import ContentPage from "../pages/ContentPage";

const TOOL_PATHS = [
  "/",
  "/fr/",
  "/json-beautifier-no-signup",
  "/json-validator-browser",
];

function AppRoutes() {
  const location = useLocation();
  const locale = useMemo(() => localeFromPath(location.pathname), [location.pathname]);
  const isTool = TOOL_PATHS.some(
    (p) => location.pathname === p || (p === "/fr/" && location.pathname === "/fr"),
  );

  return (
  <>
      <RouteMeta />
      <SiteChrome locale={locale} showMidAds={!isTool}>
        <Switch>
          <Route exact path="/">
            <JsonFormatterPage seoPath="/" />
          </Route>
          <Route path={["/fr", "/fr/"]}>
            <JsonFormatterPage seoPath="/fr/" />
          </Route>
          <Route path="/json-beautifier-no-signup">
            <JsonFormatterPage seoPath="/json-beautifier-no-signup" />
          </Route>
          <Route path="/json-validator-browser">
            <JsonFormatterPage seoPath="/json-validator-browser" />
          </Route>
          <Route path="/privacy">
            <ContentPage seoPath="/privacy" />
          </Route>
          <Route path="/terms">
            <ContentPage seoPath="/terms" />
          </Route>
          <Route path="/about">
            <ContentPage seoPath="/about" />
          </Route>
          <Route path="/contact">
            <ContentPage seoPath="/contact" />
          </Route>
          <Route>
            <JsonFormatterPage seoPath="/" />
          </Route>
        </Switch>
      </SiteChrome>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;