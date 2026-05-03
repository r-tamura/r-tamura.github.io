import sitemap from "@astrojs/sitemap";
import astroExpressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://rtam.xyz",
  integrations: [
    astroExpressiveCode({
      themes: ["github-dark", "github-light"],
    }),
    sitemap(),
  ],
});
