/* eslint no-console: 0 */
const fs = require('fs')
const path = require('path')

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

function copyToPublic(src, dest) {
  const _src = path.resolve(__dirname, src)
  const _dest = path.resolve(__dirname, 'public', dest || path.basename(_src))

  console.log(`Copying file [${_src}] => [${_dest}]`)
  return copyFile(_src, _dest)
    .then(() => console.log(`"${path.basename(_src)}" was copied successfully!`))
}

exports.postBuild = (_, end) => {
  // copyFile(path.join(__dirname, 'circle.yml'), path.join(__dirname, 'public', 'circle.yml'))
  Promise.all([
    // circle.ymlをmasterにコピー
    // デプロイ(masterへのpush)時にCircleCIがmasterブランチをチェックアウトを行わないようにするため
    copyToPublic('circle.yml'),
    copyToPublic('pages/_sw.js', 'sw.js'),
  ])
  .then(() => console.log('All files have been copied successfully!'))
  .catch(err => console.log(err))
  .then(() => end()) // エラー発生/未発生によらず実行される
}
