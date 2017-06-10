import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'

const Header = ({
  title = 'NO TITLE',
} = {}) => {
  return (
    <header className="app-bar">
      <div className="section">
        <div className="inner">
          <h1>
            <Link
              className="app-header__title"
              to={prefixLink('/')}
            >
              {title}
            </Link>
          </h1>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header
