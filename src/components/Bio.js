import React from 'react'
import PropTypes from 'prop-types'

import s from './Bio.module.scss'

const Bio = ({
  authorName,
  authorDetail,
  twitterId,
  facebookId,
  githubId,
} = {}) => (
  <div className={s.bio}>
    <div className={s.bioImage}>
      <img
        src="https://avatars3.githubusercontent.com/u/10696273?v=3&u=4c81348c8b4acb9b64396bd0ae13f34bcdf7bd0c&s=460"
        alt={`author ${authorName}`}
      />
    </div>
    <div className={s.bioDetail}>
      <div>
        <span>{authorName}</span>
      </div>
      <div>
        {authorDetail}
      </div>
      <ul className={s.bioSocialButtons}>
        {
          twitterId ?
          <li><a href={`https://twitter.com/${twitterId}`}><i className="fa fa-twitter"></i></a></li> : ""
        }
        {
          facebookId ?
          <li><a href={`https://www.facebook.com/${facebookId}`}><i className="fa fa-facebook"></i></a></li> : ""
        }
        {
          githubId ?
          <li><a href={`https://github.com/${githubId}`}><i className="fa fa-github"></i></a></li> : ""
        }
      </ul>
    </div>
  </div>
)

Bio.propTypes = {
  authorName: PropTypes.string.isRequired,
  authorDetail: PropTypes.string.isRequired,
  twitterId: PropTypes.string,
  facebookId: PropTypes.string,
  githubId: PropTypes.string,
}

export default Bio

