import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import get from 'lodash/get'
import map from 'lodash/map'
import { prefixLink } from 'gatsby-helpers'
import Helmet from "react-helmet"
import { config } from 'config'
import include from 'underscore.string/include'
import Tags from 'components/Tags'
import moment from 'moment'

class BlogIndex extends React.Component {
  render () {
    // Sort pages.
    const sortedPages = sortBy(this.props.route.pages, 'data.date').reverse()
    // Posts are those with md extension that are not 404 pages OR have a date (meaning they're a react component post).
    const visiblePages =
      sortedPages
        .filter(page => get(page, 'file.ext') === 'md' && !include(page.path, '/404') || get(page, 'data.date'))

    return (
      <div>
      <Helmet
        title={config.blogTitle}
        meta={[
          { "name": "description", "content": "Sample blog" },
          { "name": "keywords", "content": "blog, articles" },
        ]}
        link={[
          { "rel": "stylesheet", "href": "https://fonts.googleapis.com/css?family=Tauri" },
        ]}
      />
      <ul className="article-list">
          {map(visiblePages, page => (
            <li
              className="article-list__item article"
              key={page.path}
            >
              <div className="is-sm">{moment(page.data.date).format('YYYY.MM.DD')}</div>
              <Link
                className="text is-lg is-strong article__title"
                style={{ boxShadow: 'none' }}
                to={prefixLink(page.path)}>
                  {get(page, 'data.title', page.path)}
              </Link>
              <Tags
                tags={page.data.tags || ['test']}
              />
              <p className="texts .is-md article__abstract">
                {page.data.body.match(/.*\n/)[0].replace(/<\/?p>/g,'')}
              </p>
              <div className="btns is-right artile__read-btns">
                <Link className="btn is-melt is-round" to={prefixLink(page.path)}>
                  {'READ'}
                </Link>
              </div>
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
