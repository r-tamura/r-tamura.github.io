import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import Footer from '../components/Footer'

import './styles.scss'
import 'prismjs/themes/prism-okaidia.css'

const TemplateWrapper = ({ data, children }) => (
  <div>
    <Helmet
      titleTemplate="%s | 技術忘備録"
      meta={[
        { name: 'description', content: 'r-tamura Tech Blog' },
        { name: 'keywords', content: 'Blog, Web, JavaScript, Browser' },
      ]}
      link={[
        { "rel": "stylesheet", "href": "https://fonts.googleapis.com/earlyaccess/notosansjapanese.css" },
      ]}
    >
      <title>Home</title>
    </Helmet>
    <Header 
      title={data.site.siteMetadata.blogTitle}
    />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 860,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
    <Footer
      copyRight={data.site.siteMetadata.copyright}
    />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const query = graphql`
query  titleQuery {
  site {
    siteMetadata {
      blogTitle
      copyright
    }
  }
}
`
