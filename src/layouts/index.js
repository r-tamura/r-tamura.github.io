import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import Footer from '../components/Footer'

import './styles.css'
import 'prismjs/themes/prism-okaidia.css'

class TemplateWrapper extends React.Component {
  
  render() {
    const { data, props, children, location } = this.props
    const title = data.site.siteMetadata.title
    return (
      <div className="page">
        <Helmet
          titleTemplate={`%s | ${title}`}
          meta={[
            { name: 'description', content: 'r-tamura Tech Blog' },
            { name: 'keywords', content: 'Blog, Web, JavaScript, Browser' },
            /* OpenGraph */
            { property: 'og:title', content: `Home | ${title}` },
            { property: 'og:type', content: 'blog' },
            { property: 'og:url', content: `https://rtam.xyz${location.pathname}` },
            { property: 'og:image', content: 'https://rtam.xyz/favicons/fox_144x144.png' },
            { property: 'og:description', content: 'r-tamura Tech Blog' },

            /* Twitter Card 
             * 参考: https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started
             */
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: '@r_tamura' },
            { name: 'twitter:creator', content: '@r_tamura' },
          ]}
          link={[
            { "rel": "stylesheet", "href": "https://fonts.googleapis.com/earlyaccess/notosansjapanese.css" },
          ]}
        >
          <title>Home</title>
        </Helmet>
        <Header 
          title={title}
        />
        <div
          style={{
            margin: '0 auto',
            width: '95vw',
            maxWidth: '860px',
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
      title
      copyright
      description
    }
  }
}
`
