require("babel-register")
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { kebabCase } = require('./src/utils/helper')


exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    // ページのデータにslug(ページのパス)を追加
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  
  return new Promise((resolve, reject) => {
    const blogTemplate = path.resolve(`./src/templates/blog-article.js`)
    const tagTemplate = path.resolve(`./src/templates/tag.js`)
    const tagSet = new Set()
    resolve(graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
              }
            }
          }
        }
      }
    `).then(result => {

        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          node.frontmatter.tags.forEach(tag => tagSet.add(tag))

          createPage({
            path: node.fields.slug,
            component: blogTemplate,
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              slug: node.fields.slug,
            },
          })
        })

        Array.from(tagSet).forEach(tag => {
          createPage({
            path: `/tags/${kebabCase(tag)}`,
            component: tagTemplate,
            context: {
              tag: tag,
            }
          })
        })
      })
    )
  })
}
