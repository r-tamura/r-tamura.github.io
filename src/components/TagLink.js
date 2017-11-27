import React from 'react'
import Link from 'gatsby-link'

import s from  './Tag.module.css'

const TagLink = ({ children = '', to } = {}) =>
  <Link to={to} className={s.articleTag}>
    {children}
  </Link>

export default TagLink
