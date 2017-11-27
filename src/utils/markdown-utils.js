import * as H from './helper'

/**
 * 全ての記事内にあるタグの件数をタグ毎に集計します
 * @param {array} edges
 * @return {array<object>} 集計結果
 */
export function countTags(edges) {

  if(edges.length === 0) {
    return []
  }

  const acc = H.flatten(edges.map(edge => edge.node.frontmatter.tags))
    .reduce((acc, v) => {
      if (acc[v]) {
        acc[v] = acc[v] + 1
      } else {
        acc[v] = 1
      }
      return acc
    }, {})
  
  return Object.entries(acc).map(([name, count]) => ({name, count}))
}
