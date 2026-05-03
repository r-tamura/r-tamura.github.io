import sitemap from "@astrojs/sitemap";
import astroExpressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import rehypeImageZoom from "./src/rehype/rehype-image-zoom.mjs";

export default defineConfig({
  site: "https://rtam.xyz",
  integrations: [
    astroExpressiveCode({
      themes: ["github-dark", "github-light"],
    }),
    sitemap(),
  ],
  markdown: {
    rehypePlugins: [rehypeImageZoom],
  },
});
