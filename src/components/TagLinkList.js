import React from "react";
import { kebabCase } from "../utils/helper";
import * as styles from "./Tag.module.scss";
import TagLink from "./TagLink";

export default function TagLinkList({ tags = [], className = "" } = {}) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className={`${styles.articleTagLinkList} ${className}`}>
      <li className={styles.articleTagIcon}>
        <i className="fa fa-tags" aria-hidden="true"></i>
      </li>
      {tags.map((tag) => (
        <li key={tag} style={styles}>
          <div className={styles.articleTagLinkWrapper}>
            <TagLink to={`/tags/${kebabCase(tag)}`}>{tag}</TagLink>
          </div>
        </li>
      ))}
    </ul>
  );
}
