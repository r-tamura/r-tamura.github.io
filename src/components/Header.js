import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import s from './Header.module.scss'

const Header = ({
  title = 'NO TITLE',
} = {}) => {
  return (
    <header className={s.appBar}>
      <div className={`${s.section} main-column`}>
        <div className={s.inner}>
          <Link
            className={`${s.title} pointable`}
            to={'/'}
          >
            {title}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header 

Header.propTypes = {
  title: PropTypes.string,
}
