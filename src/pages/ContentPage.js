import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { findSeoPage } from "../seo/pages";
import AdSlot from "../components/ads/AdSlot";
import { SITE } from "../site";

const Article = styled.article`
  max-width: 760px;
  margin: 0 auto;
  padding: 2.4rem 1.6rem 3rem;
  font-size: 1.6rem;
  line-height: 1.7;

  h1 {
    font-size: 2.4rem;
  }

  a {
    color: #1d4ed8;
  }
`;

function ContentPage({ seoPath }) {
  const page = findSeoPage(seoPath);
  const paragraphs = [...(page.paragraphs || [])];

  if (seoPath === "/about") {
    paragraphs.push(
      `Upstream source: JSON Crew by ${SITE.upstreamAuthor} — ${SITE.upstreamRepo} (MIT).`,
    );
  }

  return (
    <Article className="legal-page">
      <h1>{page.h1}</h1>
      {paragraphs.map((p) => (
        <p key={p.slice(0, 48)}>{p}</p>
      ))}
      <AdSlot slot="content300x250" className="ad-center" />
      <AdSlot slot="content468x60" className="ad-center" />
    </Article>
  );
}

ContentPage.propTypes = {
  seoPath: PropTypes.string.isRequired,
};

export default ContentPage;