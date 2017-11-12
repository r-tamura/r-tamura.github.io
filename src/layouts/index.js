import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import Footer from '../components/Footer'

import './styles.scss'
import 'prismjs/themes/prism-okaidia.css'

class TemplateWrapper extends React.Component {
  
  render() {
    const { data, props, children, location } = this.props
    return (
      <div>
        <Helmet
          titleTemplate="%s | 技術忘備録"
          meta={[
            { name: 'description', content: 'r-tamura Tech Blog' },
            { name: 'keywords', content: 'Blog, Web, JavaScript, Browser' },
            { property: 'og:title', content: 'Home | 技術忘備録' },
            { property: 'og:type', content: 'blog' },
            { property: 'og:url', content: `https://rtam.xyz${location.pathname}` },
            { property: 'og:image', content: 'https://rtam.xyz/favicons/fox_48x48.png' },
            { property: 'og:description', content: 'r-tamura Tech Blog' },
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
  }
}

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
