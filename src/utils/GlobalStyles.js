import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    font-size: 10px;
  }
  body {
    margin: 0;
    font-family: ${(props) => props.theme.fonts.main};
    font-size: 1.6rem;
    box-sizing: border-box;
    padding: 0;
  }

  ::-webkit-scrollbar-track {
	  border: 0.1rem solid black;
	  background-color: #F5F5F5;
  }

  ::-webkit-scrollbar {
	  width: 0.6rem;
	  background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb {
	  background-color: #555555;
  }

  .ad-slot {
    text-align: center;
    margin: 0.4rem auto;
  }

  .ad-slot__label {
    font-size: 1rem;
    color: #64748b;
    margin-bottom: 0.2rem;
  }

  .ad-slot__frame {
    display: block;
    margin: 0 auto;
    background: transparent;
  }

  .ad-center {
    display: flex;
    justify-content: center;
    padding: 0.8rem;
  }

  .content-ads {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    padding: 0.8rem 0 1.6rem;
    background: #f8fafc;
  }

  .ad-mobile-sticky {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 900;
    background: #fff;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.12);
    padding: 0.2rem 0;
    display: none;
  }

  @media (max-width: 768px) {
    .ad-mobile-sticky {
      display: block;
    }
  }

  @media (min-width: 769px) {
    .ad-mobile-sticky {
      display: none !important;
    }
  }

  .ad-smartlink {
    font-size: 1.2rem;
    margin: 0.4rem 0;
  }

  #seo-prerender {
    max-width: 900px;
    margin: 0 auto;
    padding: 1.2rem 1.6rem;
    font-size: 1.5rem;
    line-height: 1.55;
  }

  #seo-prerender:has(+ #root:not(:empty)) {
    display: none;
  }
`;

export default GlobalStyles;
