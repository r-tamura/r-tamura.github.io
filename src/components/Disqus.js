import React from 'react'
import propTypes from 'prop-types'
import ReactDisqusComments from 'react-disqus-comments'

export default ({ siteUrl, articleId }) => 
  <ReactDisqusComments
    shortname={"rtams-tech-blog"}
    identifier={articleId}
    category_id={'tech'}
  />