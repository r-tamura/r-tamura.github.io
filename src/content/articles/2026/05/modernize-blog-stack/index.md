---
title: ブログ基盤を Gatsby から Astro 6 へ全面刷新
date: 2026-05-03 14:00:00
path: "blog/2026/05/modernize-blog-stack"
tags: [astro, gatsby, migration, pnpm, mise, github-actions, oxlint]
---

このブログは長らく Gatsby v3 で運用してきたが、2026 年現在では古さが目立ち、Node 14 (EOL)・依存の脆弱性・ビルド失敗など実用上の問題が出てきた。今回、SSG 本体だけでなくランタイム・パッケージマネージャ・Linter・CI/CD まで含めて全面的に刷新したのでまとめておく。

## 旧スタック

| 領域 | 旧 |
|------|-----|
| SSG | Gatsby 3.11 (2021 リリース) |
| Runtime | Node 14 (Volta で固定、EOL 済み) |
| Package Manager | yarn classic |
| Lint/Format | Prettier のみ |
| Test | AVA + @ava/babel |
| CI | CircleCI v2 旧構文 |
| Deploy | `gh-pages` npm でブランチ push |
| Analytics | Universal Analytics (廃止済み) |
| Container | CentOS 7 (EOL) + Node 9 |

ビルドはそもそも失敗していた(`sharp@0.29` が Node 18 以降で動かない)。

## 新スタック

| 領域 | 新 |
|------|-----|
| SSG | **Astro 6** |
| Runtime | **Node 24 LTS** (mise) |
| Package Manager | **pnpm 10** |
| Lint/Format | **oxlint + oxfmt** |
| Test | (Astro 移行で記事ロジックがほぼなくなったため一旦削除) |
| CI/CD | **GitHub Actions** + `actions/deploy-pages` |
| Deploy | タグ push 時のみアーティファクト配信 |
| Analytics | (未設定、必要なら Cloudflare Web Analytics 等) |
| Container | 廃止 |

## 段階的に進めた

### 1. Linter/Formatter を oxlint/oxfmt へ

最初に手を付けたのはここ。Prettier は Rust 系の oxlint/oxfmt に置き換えた。`oxfmt` はまだ pre-1.0 (0.47.0) だが、個人ブログ用途では問題なし。

```json title="package.json" {6-8}
{
  "scripts": {
    "lint": "oxlint",
    "format": "oxfmt .",
    "format:check": "oxfmt --check ."
  }
}
```

oxlint は ESLint 互換ルールを 100 倍以上の速度で実行する。実際に走らせるとプロジェクト全体で **20ms** 程度。

### 2. パッケージマネージャを pnpm へ

`yarn.lock` を捨てて `pnpm-lock.yaml` を生成。`packageManager` フィールドで pnpm 10.33.2 を固定。Astro 6 のクリーンな install で約 6 秒。

### 3. Node を mise で 24 LTS に固定

Volta から mise へ移行。`.tool-versions` 一本で OS / CI 両方が同じバージョンを使う。GitHub Actions の `setup-node` も `node-version-file: .tool-versions` で読めて二重管理を避けられる。

```yaml title=".tool-versions"
node 24.15.0
```

### 4. CircleCI から GitHub Actions へ

GitHub Pages のデプロイは `actions/deploy-pages@v5` に統一。リポジトリ設定で `Source: GitHub Actions` に切り替えれば、`master` ブランチへの commit 配信は不要になる。

### 5. Gatsby 3 から Astro 6 へ

ここが本丸。Astro は Markdown ファイルをそのまま Content Collections として扱える上、JS バンドルを **デフォルトで 0** にできるので個人技術ブログに最適。

`src/content/articles/<YYYY>/<MM>/<slug>/index.md` というディレクトリ構造で、`gatsby-source-filesystem` 相当の自動ルーティングが手に入る。スキーマは zod で型付け:

```ts title="src/content.config.ts"
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { articles };
```

URL 構造は `/articles/YYYY/MM/<slug>/` で旧サイトと互換。記事 10 本 + index + タグページで全 42 ページが **1.3 秒** でビルドできる。

## ブログ機能の改善

ついでに気になっていた機能を整備した。

### コードブロック: astro-expressive-code

行番号・コピーボタン・ライト/ダーク両テーマ・ファイル名タブ・行ハイライト等が一通り揃う:

```js title="ec.config.mjs"
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { defineEcConfig } from "astro-expressive-code";

export default defineEcConfig({
  plugins: [pluginLineNumbers()],
  defaultProps: {
    wrap: true,
  },
});
```

### 画像 zoom: <dialog> + rehype プラグイン

小さい架構図やスクリーンショットを拡大表示できるようにした。Markdown の `<img>` を rehype プラグインで `<button data-zoom-target>` + `<dialog>` 構造に変換し、レイアウト側で `dialog.showModal()` をフックする。

```css
.zoom-dialog {
  width: 95vw;
  height: 95vh;
  background: transparent;
  border: none;
}
.zoom-dialog > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.zoom-dialog::backdrop {
  background: color-mix(in srgb, black 90%, transparent);
}
```

`<form method="dialog">` を使えば閉じる × ボタンの JavaScript すら不要。Esc / 領域外クリックで閉じる挙動も `<dialog>` 標準。

### タグ別ページ・目次・抜粋

- `/tags/` でタグ一覧、`/tags/<slug>/` で絞り込み
- 記事ページの `aside.toc` で目次サイドバー(`render(post)` の `headings` から自動生成)
- トップ一覧では `entry.body` を Markdown 記法を除去したうえで 140 字にトリムして冒頭表示

### アクセシビリティ

WCAG を意識した一通りのパスを実施: 本文 17px、`color-mix()` で AA 達成、タップ領域 44px、`:focus-visible` のアウトライン、`prefers-reduced-motion` 尊重、Skip-to-main-content リンクなど。

## デプロイ運用: タグ駆動

`main` への push は CI のみで本番反映しない。タグ push 時にだけデプロイされる構成。

```sh
# 通常のコード変更
pnpm release         # patch (vX.Y.Z+1)
pnpm release:minor   # minor (vX.Y+1.0)
pnpm release:major   # major (vX+1.0.0)

# 記事公開
pnpm release:post    # post-YYYYMMDD-HHmm タグ
```

記事公開とコードリリースをタグの prefix で分けたので、git log で「いつ何を出したか」が追える。

## 残課題

- 関連記事リンク・全文検索は未実装
- アナリティクスは要検討(Cloudflare Web Analytics または Plausible 候補)
- 記事のテストや prose lint(textlint 等)の導入は今後
