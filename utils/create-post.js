/* eslint no-console: 0 */
/** 
 * create-postスクリプト
 * 新しい記事のボイラープレートを作成するスクリプトです
 * スペースは使えません。代わりにハイフン"-"を使ってください。
 * 
 * @syntax
 * npm run <post-title>
 * 
 * @example <caption>Create a post titled "new-post"</caption>
 * npm run create-post new-post
 */
const fs = require('fs')
const path = require('path')
const { promisify } = require("util")
const mkdirp = promisify(require('mkdirp'))
const writeFile = promisify(fs.writeFile)

// コマンド引数から記事名を取得
const [article] = process.argv.slice(2)

try {
  createNewArticle(article)
} catch (e) {
  console.error(e)
  process.exit(1)
}

function isEmpty(str) {
  return typeof str !== 'string' || str.length === 0
}

/**
* 記事名のバリデーションを行います
*
* - アルファベット
* - 数値
* - "-", "_"
* 以外の文字が使用されている場合はfalse
*
* @param {string} article 記事名
* @return {boolean} true: 正しい記事名
*/
function validateArticle(article) {
  return /[^a-zA-Z0-9\-_]/.test(article)
}

function now() {
  const date = new Date()

  // const digit2 = number => `00${number}`.slice(-2)
  const digit2 = number => number.toString().padStart(2, "0")

  return {
    year: String(date.getFullYear()),
    month: digit2(date.getMonth() + 1),
    date: digit2(date.getDate()),
    hour: digit2(date.getHours()),
    minute: digit2(date.getMinutes()),
    second: digit2(date.getSeconds()),
  }
}

/**
 * 記事のfront-matterを作成します
 *
 * @param {string} title 記事タイトル
 * @param {string} created 記事作成日
 * @param {string} path サイト内のパス
 * @return {string} front-matter文字列
 */
function createFrontMatter({title, created, path}) {
  return `---
title: ${title}
date: ${created}
path: "${path}"
tags: []
---`
}

/**
 * 新しい記事名のマークダウンファイルを作成します
 *
 * @param {string} article
 */
function createNewArticle(article) {
  // 記事名が指定されていない場合はエラーを表示して終了
  if (isEmpty(article)) {
    throw new Error('Usage: node create-post.js [article title]')
  }

  // 記事名のバリデーションで不正である場合はエラーを表示して終了
  if (validateArticle(article)) {
    throw new Error('Only alphabets, numbers, "-" and "_" can be used in an article name')
  }

  // 今日の日付(年、月)を取得する
  //  - 年、月をブログのディレクトリ名に設定
  //  - 時間をブログ作成日に設定
  const { year, month, date, hour, minute, second } = now()
  const dir = path.resolve(__dirname, `..`, `src`, `pages`, `articles`, year, month, article)
  mkdirp(dir)
    .then(() => {
      const content = createFrontMatter({
        title: article,
        created: `${year}-${month}-${date} ${hour}:${minute}:${second}`,
        path: `blog/${year}/${month}/${article}`,
      })
      writeFile(path.resolve(dir, "index.md"), content)
    })
    .then(() => {
      console.log(`[${article}] was saved!`)
    })     
}
