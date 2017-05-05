import React, { PropTypes } from 'react'
import './Tag.css'

const Tag = ({children = ''} = {}) => (
  <div className={'tag'}>
    {children}
  </div>
)

export default Tag
