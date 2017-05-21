import React from 'react'

const Tag = ({children = ''} = {}) =>
  <div className={'article-tag'}>
    {children}
  </div>

export default Tag
