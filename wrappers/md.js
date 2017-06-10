import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Helmet from "react-helmet"
import { config } from 'config'
import Bio from 'components/Bio'
import Tags from 'components/Tags'
import Highlight from 'react-highlight'

import '../node_modules/musubii/docs/css/musubii.css'
import '../css/style.scss'

class MarkdownWrapper extends React.Component {
  render () {
    const { route } = this.props
    const post = route.page.data

    return (
      <article>
        <Helmet
          title={`${post.title} | ${config.blogTitle}`}
          link={[
            { "rel": "stylesheet", "href": "https://fonts.googleapis.com/css?family=Tauri" },
            {
              "rel": "stylesheet",
              "href": `//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/styles/${config.syntaxTheme || 'default'}.min.css` // eslint-disable-line
            },
          ]}
        />
        <h1 className="heading is-xxl is-strong">{post.title}</h1>
        <div
          style={{
            display: 'block',
            margin: '15px 0',
          }}
        >
          {moment(post.date).format('YYYY.MM.DD')}
        </div>
        {/* タグがある場合はタグを表示 */}
        <Tags tags={post.tags} />

        <Highlight innerHTML={true} className="wysiwyg">{post.body}</Highlight>
        <Bio />
      </article>
    )
  }
}

MarkdownWrapper.propTypes = {
  route: PropTypes.object,
}

export default MarkdownWrapper
