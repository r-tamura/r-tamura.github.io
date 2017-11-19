import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import s from './Header.module.css'

const Header = ({
  title = 'NO TITLE',
} = {}) => {
  return (
    <header className={`${s.appBar} list--horizon`}>
      <div className={`${s.inner} main-column`}>
        <Link
          className={`${s.title} pointable`}
          to={'/'}
        >
          {title}
        </Link>
        <a href="/rss.xml" target="_brank" className={s.navIcon} title="RSSへ登録">
          <i className="fa fa-rss" aria-hidden="true"></i>
        </a>
      </div>
    </header>
  )
}

export default Header 

Header.propTypes = {
  title: PropTypes.string,
}
