import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from "react-helmet"
import { prefixLink } from 'gatsby-helpers'

const BUILD_TIME = new Date().getTime()

class Root extends Component {
  displayName = 'HTML'

  render () {
    const { body } = this.props
    const head = Helmet.rewind();

    let css
    if (process.env.NODE_ENV === 'production') {
      css = <style dangerouslySetInnerHTML={{ __html: require('!raw!./public/styles.css') }} />
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {css}
        </head>
        <body>
          <div id="react-mount" dangerouslySetInnerHTML={{ __html: body }} />
          <script src={prefixLink(`/bundle.js?t=${BUILD_TIME}`)} />
        </body>
      </html>
    )
  }
}

Root.propTypes = {
  body: PropTypes.string,
}


export default Root
