import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'

class Template extends React.Component {
  render () {
    const { location, children } = this.props
    let header
    if (location.pathname === prefixLink('/')) {
      header = (
        <header>
          <div className="section">
            <div className="inner">
              <h1>
                <Link
                  style={{
                    boxShadow: 'none',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                  to={prefixLink('/')}
                >
                  {config.blogTitle}
                </Link>
              </h1>
            </div>
          </div>
        </header>
      )
    } else {
      header = (
        <header>
          <div className="section">
            <div className="inner">
              <h3>
                <Link
                  style={{
                    boxShadow: 'none',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                  to={prefixLink('/')}
                >
                  {config.blogTitle}
                </Link>
              </h3>
            </div>
          </div>
        </header>
      )
    }

    const footer = (
      <footer>
        <div className="section">
          <div className="inner">
            © 2017 r-tamura
          </div>
        </div>
      </footer>
    )

    return (
      <div>
        {header}
        <div className="container section">
          <div className="inner">
            {children}
          </div>
        </div>
        {footer}
      </div>
    )
  }
}

Template.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
  route: PropTypes.object,
}

export default Template
