import sitemap from "@astrojs/sitemap";
import astroExpressiveCode from "astro-expressive-code";
import mermaid from "astro-mermaid";
import { defineConfig } from "astro/config";
import rehypeImageZoom from "./src/rehype/rehype-image-zoom.mjs";

export default defineConfig({
  site: "https://rtam.xyz",
  integrations: [
    mermaid({ autoTheme: true }),
    astroExpressiveCode({
      themes: ["github-dark", "github-light"],
    }),
    sitemap(),
  ],
  markdown: {
    rehypePlugins: [rehypeImageZoom],
  },
});
