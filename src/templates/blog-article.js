import { graphql } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import * as styles from "../components/Article.module.scss";
import Bio from "../components/Bio";
import TagLinkList from "../components/TagLinkList";
import Layout from "../layouts";

export default function BlogArticle({ data, location }) {
  const { markdownRemark: article, site } = data;
  return (
    <Layout location={location}>
      <main className={styles.article}>
        <Helmet
          meta={[
            {
              property: "og:title",
              content: `${article.frontmatter.title} | ${site.title}`,
            },
          ]}
        >
          <title>{article.frontmatter.title}</title>
        </Helmet>
        <div>{article.frontmatter.date}</div>
        <h1 className={`${styles.articleTitle}`}>
          {article.frontmatter.title}
        </h1>
        <TagLinkList tags={article.frontmatter.tags || ["No tags"]} />
        <div
          className="remark"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
        <div className={`${styles.articleBioWrapper}`}>
          <Bio {...site.siteMetadata} />
        </div>
        {/* <Disqus siteUrl={site.siteMetadata.siteUrl} articleId={article.fields.slug} title={article.frontmatter.title}/> */}
      </main>
    </Layout>
  );
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
`;
