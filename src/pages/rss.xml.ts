import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("articles");
  return rss({
    title: "Rの技術メモ",
    description: "主にWeb業界で働くエンジニアの忘備録ブログです。",
    site: context.site!,
    items: posts
      .toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        link: `/articles/${post.id.replace(/\/index$/, "")}/`,
        categories: post.data.tags,
      })),
  });
}
