import Link from "gatsby-link";
import React from "react";
import TagLinkList from "../components/TagLinkList";
import * as s from "./Article.module.scss";

const ArticlePreview = ({ node }) => {
  return (
    <section className={s.articleListItem}>
      <div className="is-sm">{node.frontmatter.date}</div>
      <h3 style={{ marginTop: "10px", marginBottom: "10px" }}>
        <Link
          className={`text is-lg is-strong ${s.articleTitle}`}
          style={{ boxShadow: "none" }}
          to={node.fields.slug}
        >
          {node.frontmatter.title}
        </Link>
      </h3>
      <TagLinkList tags={node.frontmatter.tags || ["test"]} />
      <p className={`${s.articleAbstract}`}>{node.excerpt}</p>
      <div className="btns is-right artile__read-btns">
        <Link className="btn is-melt is-round" to={node.fields.slug}>
          {"READ"}
        </Link>
      </div>
    </section>
  );
};

export default ArticlePreview;
