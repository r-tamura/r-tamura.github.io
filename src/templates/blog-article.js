import React from "react"
import Helmet from 'react-helmet';
import Bio from '../components/Bio'
import Tags from '../components/Tags'

export default ({ data }) => {
  const post = data.markdownRemark
  const site = data.site
  return (
    <div className="article">
      <Helmet
        meta={[
          { property: 'og:title', content: `${post.frontmatter.title} | 技術忘備録` },
        ]}
      >
        <title>{post.frontmatter.title}</title>
      </Helmet>
      <div>{post.frontmatter.date}</div>
      <h1 className="article__title">{post.frontmatter.title}</h1>
      <Tags
        tags={ post.frontmatter.tags || ['No tags'] }
      />
      <div className="remark" dangerouslySetInnerHTML={{ __html: post.html }} />
      <div className={`article-bio-wrapper`}>
        <Bio {...site.siteMetadata} />
      </div>
    </div>
  )
}

export const query = graphql`
  query BlogArticleQuery($slug: String!) {
    site {
      siteMetadata {
        authorName
        authorDetail
        githubId
        twitterId
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        tags
        title
        date(formatString: "DD MMMM, YYYY")
      }
    }
  }
  `
