/* eslint no-console: 0 */
/**
 * gatsby build で生成されたディレクトリを削除する
 */
const rimraf = require('rimraf')
const path = require('path')

rimraf.sync(path.resolve(__dirname, '../public'))
console.log('Cleaned up public directory.')
