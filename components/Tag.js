import React from 'react'
import PropTypes from 'prop-types'
import './Tag.css'

const Tag = ({children = ''} = {}) => (
  <div className={'tag'}>
    {children}
  </div>
)

export default Tag
