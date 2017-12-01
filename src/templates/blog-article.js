import React from "react"
import Helmet from 'react-helmet';
import Bio from '../components/Bio'
import TagLinkList from '../components/TagLinkList'
import Disqus from '../components/Disqus'

import s from '../components/Article.module.css'

export default ({ data }) => {
  const article = data.markdownRemark
  const site = data.site
  return (
    <main className={`${s.article}`}>
      <Helmet
        meta={[
          { property: 'og:title', content: `${article.frontmatter.title} | ${site.title}` },
        ]}
      >
        <title>{article.frontmatter.title}</title>
      </Helmet>
      <div>{article.frontmatter.date}</div>
      <h1 className={`${s.articleTitle}`}>{article.frontmatter.title}</h1>
      <TagLinkList
        tags={ article.frontmatter.tags || ['No tags'] }
      />
      <div className="remark" dangerouslySetInnerHTML={{ __html: article.html }} />
      <div className={`${s.articleBioWrapper}`}>
        <Bio {...site.siteMetadata} />
      </div>
      <Disqus siteUrl={site.siteMetadata.siteUrl} articleId={article.fields.slug} title={article.frontmatter.title}/>
    </main>
  )
}

export const query = graphql`
  query BlogArticleQuery($slug: String!) {
    site {
      siteMetadata {
        siteUrl
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
      fields {
        slug
      }
    }
  }
  `
