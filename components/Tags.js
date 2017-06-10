import React from 'react'
import PropTypes from 'prop-types'
import Tag from './Tag'
import map from 'lodash/map'

const Tags = ({ tags = [], styles = {}, className = '' } = {}) =>
    <ul className={'article-tags ' + className}>
      <li><i className="fa fa-tags" aria-hidden="true"></i></li>
      {
        tags.length > 0 ?
        map(tags, t =>
          <li key={t} style={styles}>
            <Tag>{t}</Tag>
          </li>
        )
        : <li><Tag key={'no-tag'} style={styles}>{'no-tag'}</Tag></li>
      }
    </ul>

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
}

export default Tags
