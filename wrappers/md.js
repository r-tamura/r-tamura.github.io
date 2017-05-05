import React from 'react'
import moment from 'moment'
import Helmet from "react-helmet"
import { config } from 'config'
import Bio from 'components/Bio'
import Tag from 'components/Tag'
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
            {"rel": "stylesheet", "href": "https://fonts.googleapis.com/css?family=Tauri"},
            {"rel": "stylesheet", "href": `//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.10.0/styles/${config.syntaxTheme || 'default'}.min.css`},
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
        <div>
          {
            post.tags.map(t => <Tag key={t}>{t}</Tag>)
          }
        </div>
        <Highlight innerHTML={true} className="wysiwyg">{post.body}</Highlight>
        <Bio />
      </article>
    )
  }
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object,
}

export default MarkdownWrapper
