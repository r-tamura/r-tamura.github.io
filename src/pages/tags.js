import React from 'react'
import PropTypes from 'prop-types'
import { countTags } from '../utils/markdown-utils';

class TagsPage extends React.Component {
  render() {

    const counts = countTags(this.props.data.allMarkdownRemark.edges);

    return (
      <div>
        {
          counts.map(count => <div key={count.name}>{count.name}: {count.count}</div>)
        }
      </div>
    )
  }
}

export default TagsPage

export const query = graphql`
query tagsQuery {
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          tags
        }
      }
    }
  }
}
`
