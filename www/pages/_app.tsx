import React from "react";
import App, { Container } from "next/app";

export default class MyApp extends App {
  static async getInitialProps({
    Component,
    ctx,
  }: {
    Component: any;
    ctx: any;
  }) {
    const host = ctx.req.headers.host;
    let pageProps = { host };

    if (Component.getInitialProps) {
      pageProps = {
        ...pageProps,
        ...(await Component.getInitialProps(ctx)),
      };
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
