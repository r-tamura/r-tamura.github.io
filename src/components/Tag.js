import React from 'react'
import s from  './Tag.module.scss'

const Tag = ({ children = '' } = {}) =>
  <div className={s.articleTag}>
    {children}
  </div>

export default Tag
