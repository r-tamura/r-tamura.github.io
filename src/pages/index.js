import React from 'react'
import Link from 'gatsby-link'
import Tags from '../components/Tags'

const IndexPage = ({data}) => 
  <div>
    <ul className="article-list">
      {data.allMarkdownRemark.edges.map(({node}) => 
        <li
          className="article-list__item article"
          key={node.fields.slug}
        >
          <div className="is-sm">{node.frontmatter.date}</div>
          <h3 style={{ marginTop: "10px", marginBottom: "10px" }}>
            <Link
              className="text is-lg is-strong article__title"
              style={{ boxShadow: 'none' }}
              to={node.fields.slug}
            >
                {node.frontmatter.title}
            </Link>
          </h3>
          <Tags
            tags={node.frontmatter.tags || ['test']}
          />
          <p className="article__abstract">
            {node.excerpt}
          </p>
          <div className="btns is-right artile__read-btns">
            <Link className="btn is-melt is-round" to={node.fields.slug}>
              {'READ'}
            </Link>
          </div>
        </li>
      )}
    </ul>
  </div>

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
