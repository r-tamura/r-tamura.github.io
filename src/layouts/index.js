import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import Footer from '../components/Footer'

/*
 * Workaround
 * #001 本番向けビルド版でスタイルシート読み込みエラー
 * See: https://github.com/gatsbyjs/gatsby/issues/1086#issuecomment-324605081 
 */
// import './styles.css'
if (
  process.env.NODE_ENV === `development` ||
  (process.env.NODE_ENV === `production` && process.browser !== true)
) {
  require('./styles.css')
}

import 'prismjs/themes/prism-okaidia.css'

class TemplateWrapper extends React.Component {
  
  render() {
    const { data, props, children, location } = this.props
    const { title, twitterId }= data.site.siteMetadata
    return (
      <div className="page">
        <Helmet
          titleTemplate={`%s | ${title}`}
          meta={[
            { name: 'description', content: 'r-tamura Tech Blog' },
            { name: 'keywords', content: 'Blog, Web, JavaScript, Browser' },
            /* Open Graph */
            { property: 'og:title', content: `Home | ${title}` },
            { property: 'og:type', content: 'blog' },
            { property: 'og:url', content: `https://rtam.xyz${location.pathname}` },
            { property: 'og:image', content: 'https://rtam.xyz/favicons/fox_144x144.png' },
            { property: 'og:description', content: 'r-tamura Tech Blog' },

            /* Twitter Card 
             * 参考: https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started
             */
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: `@${twitterId}` },
            { name: 'twitter:creator', content: `@${twitterId}` },
          ]}
          link={[
            { "rel": "stylesheet", "href": "https://fonts.googleapis.com/earlyaccess/notosansjapanese.css" },
            { "rel": "icon", "type": "image/png", "href": "favicons/favicon.ico" },
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
      twitterId
    }
  }
}
`
