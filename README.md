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

## Deploy

`main` への push では CI(lint / format:check / astro check / build)のみ走り、本番には反映されない。
本番デプロイは `v*` タグの push、または GitHub Actions の workflow_dispatch から手動実行する。

```sh
# 通常リリース (patch: x.y.Z)
pnpm release

# 中規模リリース (minor: x.Y.0)
pnpm release:minor

# メジャーリリース (major: X.0.0)
pnpm release:major
```

各スクリプトは package.json の version を bump し、`v<version>` タグを作成して push まで一気通貫で行う。タグ push をトリガーに `actions/deploy-pages` が dist を GitHub Pages に配信する。
