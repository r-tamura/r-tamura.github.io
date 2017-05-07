import React from 'react'
import PropTypes from 'prop-types'

const Tag = ({children = ''} = {}) => (
  <div className={'post-tag'}>
    {children}
  </div>
)

export default Tag
