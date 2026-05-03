import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    last_modified: z.coerce.date().optional(),
    path: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { articles };
