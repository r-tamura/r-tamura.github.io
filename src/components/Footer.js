import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

const Footer = ({
  copyright = 2017,
} = {}) => {
  return (
      <footer>
        <div className="section">
          <div className="inner">
            <span>&copy; {copyright} r-tamura</span>
            <span>&emsp; Built using Gatsby.js</span>
            <span>&emsp;  Hosted on GitHub Pages</span>
          </div>
        </div>
      </footer>
    )
}

export default Footer

Footer.propTypes = {
  copyright: PropTypes.number,
}
