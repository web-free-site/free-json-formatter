import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { t } from "../i18n/messages";
import AdSlot, { useAdScripts } from "./ads/AdSlot";
import SiteFooter from "./SiteFooter";

const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TopAd = styled.div`
  display: flex;
  justify-content: center;
  background: #f3f6fb;
  padding: 0.4rem 0;
`;

const BrandBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 0.8rem 1.6rem;
  background: #fff;
  border-bottom: 1px solid #dce3ef;
  font-size: 1.4rem;

  .brand {
    text-decoration: none;
    color: #1a2332;
    font-weight: 600;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem 1.2rem;
    align-items: center;

    a {
      color: #334155;
      text-decoration: none;
    }

    a.active {
      font-weight: 600;
      color: #1d4ed8;
    }
  }
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function SiteChrome({ locale, children, showMidAds }) {
  useAdScripts();
  const location = useLocation();
  const enHome = location.pathname === "/";
  const frHome = location.pathname === "/fr" || location.pathname === "/fr/";

  return (
    <Shell className="site-shell">
      <TopAd>
        <AdSlot slot="header728x90" label={t(locale, "sponsored")} />
      </TopAd>
      <BrandBar>
        <Link to={locale === "fr" ? "/fr/" : "/"} className="brand">
          {t(locale, "siteName")}
        </Link>
        <nav aria-label="Main">
          <Link to={locale === "fr" ? "/fr/" : "/"}>{t(locale, "formatJson")}</Link>
          <Link to="/json-beautifier-no-signup">Beautifier</Link>
          <Link to="/json-validator-browser">Validator</Link>
          <Link to="/about">{t(locale, "about")}</Link>
          <Link to={enHome ? "/fr/" : "/"} className={frHome ? "active" : ""}>
            FR
          </Link>
          <Link to={frHome ? "/" : "/"} className={enHome ? "active" : ""}>
            EN
          </Link>
        </nav>
      </BrandBar>
      {(enHome || frHome) && (
        <TopAd>
          <AdSlot slot="homeTop728x90" label={t(locale, "sponsored")} />
        </TopAd>
      )}
      <Body>
        {children}
        {showMidAds ? (
          <aside className="content-ads" aria-label="Sponsored">
            <AdSlot slot="betweenToolContent728x90" className="ad-center" />
            <AdSlot slot="content468x60" className="ad-center" />
            <AdSlot slot="nativeBelowResult" className="ad-center" />
            <AdSlot slot="content300x250" className="ad-center" />
          </aside>
        ) : null}
      </Body>
      <SiteFooter locale={locale} />
      <AdSlot slot="mobileSticky320x50" className="ad-mobile-sticky" label={t(locale, "sponsored")} />
    </Shell>
  );
}

SiteChrome.propTypes = {
  locale: PropTypes.oneOf(["en", "fr"]).isRequired,
  children: PropTypes.node.isRequired,
  showMidAds: PropTypes.bool,
};

SiteChrome.defaultProps = {
  showMidAds: false,
};

export default SiteChrome;