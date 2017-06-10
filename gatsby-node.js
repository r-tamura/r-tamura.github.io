/* eslint no-console: 0 */
const fs = require('fs')
const path = require('path')
const map = require('lodash/map')

// exports.modifyWebpackConfig = function(config, stage) {
//   config.loader('images', cfg => {
//     cfg.test = /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/
//     cfg.loader = 'url?limit=1000'
//     return cfg
//   })
//   return config
// }

function copyFile(source, target) {
  return new Promise((resolve, reject) => {
    const rd =
      fs.createReadStream(source)
        .on("error", err => reject(err))

    const wr =
      fs.createWriteStream(target)
        .on("error", err => reject(err))
        .on("close", () => resolve(source))
    rd.pipe(wr)
  })
}

/**
 * srcファイルをpublicディレクトリにコピーします
 * destが指定されない場合はsrcファイルと同名のファイルを作成します
 *
 * @param {string} src srcファイルパス
 * @param {string} dest コピー先パス (デフォルトではsrcファイル名)
 * @return {promise}
 */
function copyToPublic(src, dest = null) {
  const _src = path.resolve(__dirname, src)
  const _dest = path.resolve(__dirname, 'public', dest || path.basename(_src))

  console.log(`Copying file [${_src}] => [${_dest}]`)
  return copyFile(_src, _dest)
    .then(() => console.log(`"${path.basename(_src)}" was copied successfully!`))
}

/**
 *  srcファイルリストのファイルをPublicディレクトリへコピーします
 * @param {array} files srcファイルリスト
 * {
 *   src: srcファイルパス
 *   dest:  コピー先パス (デフォルトではsrcファイル名)
 * }
 * @return {promise}
 */
function copyFilesToPublic(files) {
  return Promise.all(map(files, ({ src, dest }) => copyToPublic(src, dest)))
}

exports.postBuild = (_, end) => {
  copyFilesToPublic([
    // circle.ymlをmasterにコピー
    // デプロイ(masterへのpush)時にCircleCIがmasterブランチをチェックアウトを行わないようにするため
    { src: 'circle.yml' },
    { src:'pages/_root/_sw.js', dest:'sw.js' },
    { src:'pages/_root/_manifest.json', dest:'manifest.json' },
    // Google Serach Console Webページの認証用ファイル
    { src:'pages/_root/_google9af3f4ed19ef44d9.html', dest: 'google9af3f4ed19ef44d9.html' }
  ])
  .then(() => console.log('All files have been copied successfully!'))
  .catch(err => console.log(err))
  .then(() => end()) // エラー発生/未発生によらず実行される
}
