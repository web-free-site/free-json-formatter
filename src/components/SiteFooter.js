import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { SITE } from "../site";
import { t } from "../i18n/messages";
import { SponsoredSmartlink } from "./ads/AdSlot";

const Footer = styled.footer`
  background: #1a2332;
  color: #e8eef7;
  padding: 1.6rem 2rem 3rem;
  font-size: 1.4rem;
  line-height: 1.6;

  a {
    color: #9ec5ff;
  }

  p {
    margin: 0.6rem 0;
  }

  .muted {
    color: #9aa7b8;
    font-size: 1.3rem;
  }
`;

function SiteFooter({ locale }) {
  return (
    <Footer className="site-footer">
      <p>
        <a href={SITE.hubUrl} rel="noopener noreferrer">
          {t(locale, "byHub")}
        </a>
        {" · "}
        <a href={SITE.upstreamRepo} rel="noopener noreferrer">
          {t(locale, "upstreamCredit")}
        </a>
      </p>
      <p>
        <Link to="/privacy">{t(locale, "privacy")}</Link>
        {" · "}
        <Link to="/terms">{t(locale, "terms")}</Link>
        {" · "}
        <Link to="/about">{t(locale, "about")}</Link>
        {" · "}
        <Link to="/contact">{t(locale, "contact")}</Link>
        {" · "}
        <Link to="/json-beautifier-no-signup">Beautifier</Link>
        {" · "}
        <Link to="/json-validator-browser">Validator</Link>
      </p>
      <p className="muted">{t(locale, "clientSide")}</p>
      <SponsoredSmartlink />
    </Footer>
  );
}

SiteFooter.propTypes = {
  locale: PropTypes.oneOf(["en", "fr"]).isRequired,
};

export default SiteFooter;