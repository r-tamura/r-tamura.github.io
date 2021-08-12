import { graphql } from "gatsby";
import React from "react";
import ArticleList from "../components/ArticleList";
import Layout from "../layouts";

const IndexPage = ({ data, location }) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <Layout location={location}>
      <div>
        <ArticleList articles={edges} />
      </div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            tags
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt(pruneLength: 100)
        }
      }
    }
  }
`;
