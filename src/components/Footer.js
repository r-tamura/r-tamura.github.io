import PropTypes from 'prop-types'
import React from 'react'
import * as s from './Footer.module.css'


const Footer = ({
  copyright = new Date().getFullYear(),
} = {}) => {
  return (
      <footer className={`${s.footer}`}>
        <div className={`section main-column`}>
          <div className={`inner`}>
            <span>&copy; {copyright} r-tamura</span>
            <span>&emsp; Built using Gatsby.js</span>
            <span>&emsp;  Hosted on GitHub Pages</span>
            <span>&emsp; Using&nbsp;<a href="https://www.google.com/intl/ja/policies/privacy/partners/">google analytics</a></span>
          </div>
        </div>
      </footer>
    )
}

export default Footer

Footer.propTypes = {
  copyright: PropTypes.number,
}
