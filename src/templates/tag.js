import { graphql } from "gatsby";
import React from "react";
import ArticleList from "../components/ArticleList";

export default class TagTemplate extends React.Component {
  render() {
    const edges = this.props.data.allMarkdownRemark.edges;
    return (
      <div>
        <ArticleList articles={edges} />
      </div>
    );
  }
}

export const query = graphql`
  query TagQuery($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
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
