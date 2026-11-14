import React, { useEffect, Fragment, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import {
  GlobalStyle as BuffetGlobalStyles,
  Fonts as BuffetFonts,
} from "buffetjs";
import Peer from "peerjs";
import PropTypes from "prop-types";

import theme from "../utils/theme";
import GlobalStyles from "../utils/GlobalStyles";
import Header from "../components/Header";
import getEditor from "../utils/editor-actions";
import Sidebar from "../components/Sidebar";
import EditorView from "../components/Editors/EditorView";
import { EditorCtxProvider } from "../components/Editors/EditorContext";
import SeoContent from "../components/SeoContent";
import AdSlot from "../components/ads/AdSlot";
import { findSeoPage } from "../seo/pages";

const ToolRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  position: relative;
  flex: 1;
`;

const Main = styled.main`
  min-height: calc(100vh - ${(props) => props.theme.layout.navHeight} - 1rem);
  position: relative;
  flex: 1;
  min-width: 0;
`;

const AdRail = styled.aside`
  width: 170px;
  flex-shrink: 0;
  padding: 0.8rem 0.4rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @media (max-width: 900px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

function JsonFormatterPage({ seoPath }) {
  const editorConfig = getEditor();
  const page = findSeoPage(seoPath);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userLink = params.get("q");
    if (userLink) {
      const peer = new Peer();
      const connection = peer.connect(userLink);
      connection.on("open", () => {
        connection.on("data", (value) => {
          editorConfig.setValue(value);
        });
      });
    }
  }, [editorConfig]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 520px)");
    const update = () => setCompact(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <EditorCtxProvider value={editorConfig}>
        <Fragment>
          <Header />
          <AdSlot slot="betweenToolContent728x90" className="ad-center" />
          <ToolRow role="group">
            {!compact && <Sidebar editorConfig={editorConfig} />}
            <Main>
              <EditorView compact={compact} />
            </Main>
            <AdRail aria-label="Sponsored">
              <AdSlot slot="sidebar160x600" />
              <AdSlot slot="sidebar160x300" />
            </AdRail>
          </ToolRow>
          {compact && <Sidebar editorConfig={editorConfig} />}
          <SeoContent page={page} />
        </Fragment>
        <BuffetFonts />
        <BuffetGlobalStyles />
        <GlobalStyles />
      </EditorCtxProvider>
    </ThemeProvider>
  );
}

JsonFormatterPage.propTypes = {
  seoPath: PropTypes.string.isRequired,
};

export default JsonFormatterPage;