import React from 'react'
import Link from 'gatsby-link'
import TagLinkList from '../components/TagLinkList'
import ArticleList from '../components/ArticleList'

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <div>
      <ArticleList articles={edges} />
    </div>
  )
}

export default IndexPage

export const query = graphql`
query IndexQuery {
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
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
`
