import React, { Component } from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { createGlobalStyle } from 'styled-components'
import DarkskyLink from '../components/DarkskyLink'
import PageLayout from './PageLayout'
import ContentLayout from './ContentLayout'
import Footer from '../components/Footer'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
    margin: 0px;
    * { box-sizing: border-box };
  }
`

export default class PageRoot extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = { title: 'wthr' }

  render() {
    const { title, children } = this.props
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta charSet="utf-8" />
          <link href="/static/css/weather-icons.css" rel="stylesheet" />
        </Head>
        <PageLayout>
          <GlobalStyle />
          <ContentLayout>{children}</ContentLayout>
          <Footer>
            <DarkskyLink />
          </Footer>
        </PageLayout>
      </>
    )
  }
}
