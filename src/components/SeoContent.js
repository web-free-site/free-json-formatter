import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Section = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.6rem 3rem;
  font-size: 1.5rem;
  line-height: 1.65;
  color: #1e293b;

  h1 {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.8rem;
    margin-top: 2rem;
  }

  details {
    margin-top: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 0.8rem 1rem;
    background: #f8fafc;
  }

  summary {
    cursor: pointer;
    font-weight: 600;
  }
`;

function SeoContent({ page }) {
  if (!page) return null;

  return (
    <Section id="seo-content" className="seo-prerender">
      <h1>{page.h1}</h1>
      {page.paragraphs?.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
      {page.faq?.length > 0 && (
        <>
          <h2>FAQ</h2>
          {page.faq.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </>
      )}
    </Section>
  );
}

SeoContent.propTypes = {
  page: PropTypes.shape({
    h1: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.string),
    faq: PropTypes.arrayOf(
      PropTypes.shape({
        q: PropTypes.string.isRequired,
        a: PropTypes.string.isRequired,
      }),
    ),
  }),
};

export default SeoContent;