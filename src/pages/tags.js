import { graphql } from 'gatsby';
import React from 'react';
import { countTags } from '../utils/markdown-utils';

/**
 * 全ての記事で使用されているタグ一覧を表示するページ
 */
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
