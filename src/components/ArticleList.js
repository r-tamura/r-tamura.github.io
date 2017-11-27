import React from 'react'
import ArticlePreview from '../components/ArticlePreview'

import s from './Article.module.css'

export default class ArticleList extends React.Component {
  render() {
    const { articles } = this.props
    
    if (articles.length === 0) {
      return null
    }

    return (
     <ul className={`${s.articleList}`}>
       {articles.map(({ node }) => (
         <li key={node.fields.slug}><ArticlePreview node={node} /></li>
       ))}
     </ul>
    )
  }
}
