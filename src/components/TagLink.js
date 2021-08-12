import Link from "gatsby-link";
import React from "react";
import * as styles from "./Tag.module.scss";

const TagLink = ({ children = null, to } = {}) => (
  <Link to={to} className={styles.articleTag}>
    {children}
  </Link>
);

export default TagLink;
