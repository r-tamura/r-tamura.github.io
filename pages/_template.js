import React from 'react'
import PropTypes from 'prop-types'
import { config } from 'config'
import Header from 'components/Header'

class Template extends React.Component {
  render () {
    const { children } = this.props
    const header = <Header title={config.blogTitle} />

    const footer = (
      <footer>
        <div className="section">
          <div className="inner">
            &copy; 2017 r-tamura
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
