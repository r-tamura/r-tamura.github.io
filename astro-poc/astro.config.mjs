import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://rtam.xyz",
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});
