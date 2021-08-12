import Link from "gatsby-link";
import PropTypes from "prop-types";
import React from "react";
import * as styles from "./Header.module.scss";

const Header = ({ title = "NO TITLE" } = {}) => {
  return (
    <header className={`${styles.appBar} list--horizon`}>
      <div className={`${styles.inner} main-column`}>
        <Link className={`${styles.title} pointable`} to={"/"}>
          {title}
        </Link>
        <a
          href="/rss.xml"
          target="_brank"
          className={styles.navIcon}
          title="RSSへ登録"
        >
          <i className="fa fa-rss" aria-hidden="true"></i>
        </a>
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {
  title: PropTypes.string,
};
