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

function copyFile(source, target, cb) {
  let cbCalled = false

  const rd =
    fs.createReadStream(source)
      .on("error", err => done(err))

  const wr =
    fs.createWriteStream(target)
      .on("error", err => done(err))
      .on("close", ex => done())

  rd.pipe(wr)

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

exports.postBuild = (pages, end) => {

  // circle.ymlをmasterにコピー
  // デプロイ(masterへのpush)時にCircleCIがmasterブランチをチェックアウトを行わないようにするため
  const src = path.join(__dirname, 'circle.yml')
  const dest = path.join(__dirname, 'public', 'circle.yml')
  console.log(`Copying file [${src}] => [${dest}]`)
  copyFile(src, dest, () => {
    console.log('Copied successfully!')
    end()
  })
}
