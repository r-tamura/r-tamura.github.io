import React from 'react'
import propTypes from 'prop-types'
import ReactDisqusComments from 'react-disqus-comments'

export default ({ shortname, articleId, title }) => 
  <ReactDisqusComments
    shortname={"rtams-tech-blog"}
    identifier={articleId}
    title={title}
    category_id={'tech'}
  />