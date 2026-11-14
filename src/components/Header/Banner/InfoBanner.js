import React from "react";
import styled from "styled-components";
import useWebShare from "react-use-web-share";

import BannerContainer from "./BannerContainer";
import TwitterIcon from "../../../icons/social/twitter.svg";
import TelegramIcon from "../../../icons/social/telegram.svg";
import RedditIcon from "../../../icons/social/reddit.svg";

const NakedButton = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  background-color: transparent;
  box-shadow: none;
  border: none;
  text-decoration: none;

  & > svg {
    height: 3rem;
    margin: 0 1rem;
  }
`;

const Section = styled.p`
  margin: 2rem 0;
`;

function InfoBanner() {
  const { isSupported, share } = useWebShare();
  return (
    <BannerContainer>
      <Section>
        <span>Code is Open Source on </span>
        <a
          href="https://github.com/agneym/json-formatter"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </Section>
      <Section as="div">
        <span>Share </span>
        <NakedButton href="https://twitter.com/intent/tweet?url=https%3A%2F%2Ffree-json-formatter.web-free.site%2F&text=Free%20JSON%20Formatter%20-%20format%2C%20validate%20%26%20beautify%20JSON.">
          <TwitterIcon />
        </NakedButton>
        <NakedButton href="https://telegram.me/share/url?url=https%3A%2F%2Ffree-json-formatter.web-free.site&text=Free%20JSON%20Formatter">
          <TelegramIcon />
        </NakedButton>
        <NakedButton href="https://www.reddit.com/submit?url=https%3A%2F%2Ffree-json-formatter.web-free.site&title=Free%20JSON%20Formatter">
          <RedditIcon />
        </NakedButton>
        {isSupported && <NakedButton onClick={share}>Share</NakedButton>}
      </Section>
      <Section>
        <span>Made with </span>
        <span role="img" aria-label="Computer">
          💻
        </span>
        <span> by </span>
        <a href="https://agney.dev" target="_blank" rel="noopener noreferrer">
          Agney
        </a>
      </Section>
    </BannerContainer>
  );
}

export default InfoBanner;
