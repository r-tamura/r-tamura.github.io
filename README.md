# Blog

https://rtam.xyz

## Stack

- SSG: Astro 6
- Hosting: GitHub Pages
- CDN: Cloudflare
- CI/CD: GitHub Actions
- Package manager: pnpm 10
- Runtime: Node.js 24 (managed by mise)

## Installation

```sh
git clone https://github.com/r-tamura/r-tamura.github.io.git
pnpm install
```

## Scripts

```sh
# Run dev server (http://localhost:4321/)
pnpm dev

# Generate HTML for publish
pnpm build

# Preview built site
pnpm preview

# Type check Astro components
pnpm check

# Lint and format
pnpm lint
pnpm format
```

## Create a post

Add a new directory under `src/content/articles/YYYY/MM/<slug>/` containing
an `index.md` with frontmatter:

```markdown
---
title: 記事のタイトル
date: 2026-05-03 12:00:00
tags: [tag1, tag2]
---
```

Place co-located images alongside `index.md` and reference them with relative paths.
