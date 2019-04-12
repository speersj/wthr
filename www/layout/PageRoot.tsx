import Head from "next/head";
import React, { Component, ReactNode } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Provider } from "unstated";

import theme from "../lib/theme";
import PageLayout from "./PageLayout";
import ContentLayout from "./ContentLayout";

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0px;
  }
  body {
    background-color: #282A36;
    * { box-sizing: border-box };
  }
`;

interface Props {
  title: string;
  children: ReactNode;
}

export default class PageRoot extends Component<Props> {
  static defaultProps = { title: "wthr" };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider>
          <Head>
            <title>{this.props.title}</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <meta charSet="utf-8" />
            <link href="/static/css/weather-icons.css" rel="stylesheet" />
          </Head>
          <PageLayout>
            <GlobalStyle />
            <ContentLayout>{this.props.children}</ContentLayout>
          </PageLayout>
        </Provider>
      </ThemeProvider>
    );
  }
}
