import React from 'react'
import PropTypes from 'prop-types'
import TagLink from './TagLink'
import { kebabCase } from '../utils/helper'

import s from  './Tag.module.css'

const TagLinkList = ({ tags = [], styles = {}, className = '' } = {}) => {

    if(tags.length === 0) {
      return null
    }

    return (
      <ul className={`${s.articleTagLinkList} ${className}`}>
        <li className={s.articleTagIcon}><i className="fa fa-tags" aria-hidden="true"></i></li>
        {
          tags.map(tag =>
            <li key={tag} style={styles}>
              <div className={`${s.articleTagLinkWrapper}`}>
                <TagLink to={`/tags/${kebabCase(tag)}`}>{tag}</TagLink>
              </div>
            </li>
          )
        }
      </ul>
    )
  }

TagLinkList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
}

export default TagLinkList
