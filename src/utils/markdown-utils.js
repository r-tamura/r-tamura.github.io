/**
 * 全ての記事内にあるタグの件数をタグ毎に集計します
 * @param {*} edges 
 */
exports.countTags = function countTags(edges) {

  if(edges.length === 0) {
    return []
  }

  const acc = edges
    .map(edge => edge.node.frontmatter.tags)
    .reduce((acc, v) => [ ...acc, ...v ])
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
