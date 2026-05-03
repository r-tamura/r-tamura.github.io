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
本番デプロイはタグの push、または GitHub Actions の workflow_dispatch から手動実行する。

### コードや設計の変更を出す (semver)

```sh
pnpm release         # patch (x.y.Z) — 微調整・バグ修正
pnpm release:minor   # minor (x.Y.0) — 機能追加
pnpm release:major   # major (X.0.0) — 大変更
```

`v<version>` タグを作成・push する(package.json の version も bump される)。

### 記事を公開する

```sh
pnpm release:post
```

`post-YYYYMMDD-HHmm` タグを作成・push する(version は据え置き)。

タグ push をトリガーに `actions/deploy-pages` が dist を GitHub Pages に配信する。
