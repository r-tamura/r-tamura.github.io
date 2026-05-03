# r-tamura.github.io 運用メモ

このリポジトリは Astro 6 で構築された個人ブログ (https://rtam.xyz)。

## ブランチと公開方針

- 運用ブランチは **`main` 一本**(かつて存在した `source` / `master` は廃止済)。
- `main` への push は **CI のみ**(lint / format:check / astro check / build)。本番反映はしない。
- 本番 (GitHub Pages) には **タグ push 時にだけ** デプロイされる。`actions/deploy-pages` がアーティファクトを直接配信。

## リリースコマンド

| コマンド             | タグ形式             | version bump | 使うとき         |
| -------------------- | -------------------- | ------------ | ---------------- |
| `pnpm release`       | `v2.0.1`             | patch        | 微調整・バグ修正 |
| `pnpm release:minor` | `v2.1.0`             | minor        | 機能追加         |
| `pnpm release:major` | `v3.0.0`             | major        | 大変更           |
| `pnpm release:post`  | `post-YYYYMMDD-HHmm` | なし         | **記事公開**     |

`release:post` は `scripts/release-post.mjs` がタグ作成・push を行う(version 据え置き)。記事追加だけのときは必ずこちらを使う。コードや設計に手が入った場合は semver 系を選ぶ。

## 記事の追加場所

`src/content/articles/<YYYY>/<MM>/<slug>/index.md` に置く。同ディレクトリに co-locate した画像は相対パス参照で WebP 変換される。

frontmatter:

```yaml
---
title: ...
date: 2026-05-03 12:00:00 # 公開日(必須)
last_modified: 2026-05-10 09:00:00 # 更新日(更新時のみ追記、任意)
tags: [tag1, tag2]
---
```

`last_modified` を入れた記事ページでは「公開: …」「更新: …」が並んで表示される(同日の場合は更新表記を省略)。

## 記事の更新フロー

新規公開も既存修正も同じ `pnpm release:post` で行う。コミットメッセージで区別:

- 新規: `article(created): <slug>`
- 更新: `article(updated): <slug>` + frontmatter に `last_modified` を追記

## 主要ディレクトリ

- `src/pages/` — ルーティング(`articles/[...slug].astro`, `tags/[tag].astro` など)
- `src/layouts/BaseLayout.astro` — 全ページ共通の `<head>`、ヘッダー、テーマ変数
- `src/layouts/BlogLayout.astro` — 記事ページ用(BaseLayout を内側で利用、TOC を含む)
- `src/utils/` — `tags.ts` (slug 正規化), `excerpt.ts` (一覧の冒頭抜粋)
- `src/content.config.ts` — Content Collections のスキーマ定義 (zod)

## 検証コマンド

公開前に必ずローカルで通すべきもの:

```sh
pnpm lint           # oxlint
pnpm format:check   # oxfmt
pnpm check          # astro check (型チェック)
pnpm build          # 静的ビルド
```

ローカル確認は `pnpm dev` で port 4321。

## ツールチェーン

- Node 24 LTS (mise の `.tool-versions` で固定)
- pnpm 10 (`packageManager` フィールドで固定)
- oxlint / oxfmt — Linter / Formatter
- Astro 6 / Shiki (シンタックスハイライト) / sharp (画像最適化)
- GitHub Actions / actions/deploy-pages

## 注意事項

- `main` に直接 push しても自動でデプロイ**されない**。本番反映は必ず `pnpm release*` コマンド経由でタグを切る。
- 旧 Gatsby 関連ファイル(`gatsby-*.js`, `src/components/`, `Dockerfile` など)はすべて削除済み。復活させない。
- GitHub Pages 環境のブランチポリシーは `main` (workflow_dispatch) / `v*` / `post-*` の 3 つを許可済み。
