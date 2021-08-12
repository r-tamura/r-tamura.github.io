import React from "react";
import * as styles from "./Bio.module.scss";

export default function Bio({
  authorName,
  authorDetail,
  twitterId,
  facebookId,
  githubId,
} = {}) {
  return (
    <div className={styles.bio}>
      <div className={styles.bioImage}>
        <img
          src="https://avatars3.githubusercontent.com/u/10696273?v=3&u=4c81348c8b4acb9b64396bd0ae13f34bcdf7bd0c&s=460"
          alt={`author ${authorName}`}
        />
      </div>
      <div className={styles.bioDetail}>
        <div>
          <span>{authorName}</span>
        </div>
        <div>{authorDetail}</div>
        <ul className={styles.bioSocialButtons}>
          {twitterId ? (
            <li>
              <a href={`https://twitter.com/${twitterId}`}>
                <i aria-label="twitter" className="fa fa-twitter"></i>
              </a>
            </li>
          ) : null}
          {facebookId ? (
            <li>
              <a href={`https://www.facebook.com/${facebookId}`}>
                <i aria-label="facebook" className="fa fa-facebook"></i>
              </a>
            </li>
          ) : null}
          {githubId ? (
            <li>
              <a href={`https://github.com/${githubId}`}>
                <i aria-label="github" className="fa fa-github"></i>
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
