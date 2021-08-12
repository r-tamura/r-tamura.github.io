import { graphql, StaticQuery } from "gatsby";
import "prismjs/themes/prism-okaidia.css";
import React from "react";
import Helmet from "react-helmet";
import Footer from "../components/Footer";
import Header from "../components/Header";

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
  require("./styles.scss");
}

export default function Layout({ children, location }) {
  return (
    <StaticQuery
      query={query}
      render={(data) => (
        <div className="page">
          <Helmet
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              { name: "description", content: "r-tamura Tech Blog" },
              { name: "keywords", content: "Blog, Web, JavaScript, Browser" },
              /* Open Graph */
              {
                property: "og:title",
                content: `Home | ${data.site.siteMetadata.title}`,
              },
              { property: "og:type", content: "blog" },
              {
                property: "og:url",
                content: `https://rtam.xyz${location.pathname}`,
              },
              {
                property: "og:image",
                content: "https://rtam.xyz/favicons/fox_144x144.png",
              },
              { property: "og:description", content: "r-tamura Tech Blog" },

              /* Twitter Card
               * 参考: https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started
               */
              { name: "twitter:card", content: "summary" },
              {
                name: "twitter:site",
                content: `@${data.site.siteMetadata.twitterId}`,
              },
              {
                name: "twitter:creator",
                content: `@${data.site.siteMetadata.twitterId}`,
              },
            ]}
            link={[
              {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/earlyaccess/notosansjapanese.css",
              },
              { rel: "icon", type: "image/png", href: "/favicons/favicon.ico" },
            ]}
          >
            <title>Home</title>
          </Helmet>
          <Header title={data.site.siteMetadata.title} />
          <div
            style={{
              margin: "0 auto",
              width: "95vw",
              maxWidth: "860px",
              paddingTop: 0,
            }}
          >
            {children}
          </div>
          <Footer copyRight={data.site.siteMetadata.copyright} />
        </div>
      )}
    />
  );
}

const query = graphql`
  query titleQuery {
    site {
      siteMetadata {
        title
        copyright
        description
        twitterId
      }
    }
  }
`;
