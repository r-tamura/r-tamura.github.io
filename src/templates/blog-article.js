import React from "react"
import Helmet from 'react-helmet';
import Bio from '../components/Bio'
import TagLinkList from '../components/TagLinkList'

import s from '../components/Article.module.css'

export default ({ data }) => {
  const post = data.markdownRemark
  const site = data.site
  return (
    <main className={`${s.article}`}>
      <Helmet
        meta={[
          { property: 'og:title', content: `${post.frontmatter.title} | ${site.title}` },
        ]}
      >
        <title>{post.frontmatter.title}</title>
      </Helmet>
      <div>{post.frontmatter.date}</div>
      <h1 className={`${s.articleTitle}`}>{post.frontmatter.title}</h1>
      <TagLinkList
        tags={ post.frontmatter.tags || ['No tags'] }
      />
      <div className="remark" dangerouslySetInnerHTML={{ __html: post.html }} />
      <div className={`${s.articleBioWrapper}`}>
        <Bio {...site.siteMetadata} />
      </div>
    </main>
  )
}

export const query = graphql`
  query BlogArticleQuery($slug: String!) {
    site {
      siteMetadata {
        title
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
