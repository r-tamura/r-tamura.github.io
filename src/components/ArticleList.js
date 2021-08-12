import React from "react";
import ArticlePreview from "../components/ArticlePreview";
import * as styles from "./Article.module.scss";

export default function ArticleList({ articles }) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <ul className={`${styles.articleList}`}>
      {articles.map(({ node }) => (
        <li key={node.fields.slug}>
          <ArticlePreview node={node} />
        </li>
      ))}
    </ul>
  );
}
