import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import get from 'lodash/get'
import { prefixLink } from 'gatsby-helpers'
import Helmet from "react-helmet"
import { config } from 'config'
import include from 'underscore.string/include'
import Bio from 'components/Bio'
import moment from 'moment'

class BlogIndex extends React.Component {
  render () {
    // Sort pages.
    const sortedPages = sortBy(this.props.route.pages, 'data.date').reverse()
    // Posts are those with md extension that are not 404 pages OR have a date (meaning they're a react component post).
    const visiblePages = sortedPages.filter(page => (
      get(page, 'file.ext') === 'md' && !include(page.path, '/404') || get(page, 'data.date')
    ))
    return (
      <div className="index">
      <Helmet
        title={config.blogTitle}
        meta={[
          {"name": "description", "content": "Sample blog"},
          {"name": "keywords", "content": "blog, articles"},
        ]}
        link={[
          {"rel": "stylesheet", "href": "https://fonts.googleapis.com/css?family=Tauri"},
        ]}
      />
      <ul className="article-list">
          {visiblePages.map((page) => (
              <li
                key={page.path}
              >
                <div className="is-sm">{moment(page.data.date).format('YYYY.MM.DD')}</div>
                <Link className="text is-lg" style={{boxShadow: 'none'}} to={prefixLink(page.path)}>
                    {get(page, 'data.title', page.path)}
                </Link>
                <hr/>
              </li>
          ))}
        </ul>
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: PropTypes.object,
}

export default BlogIndex
