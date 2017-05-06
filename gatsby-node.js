const fs = require('fs')
const path = require('path')

function copyFile(source, target, cb) {
  let cbCalled = false

  console.log(`Copying file [${source}] => [${target}]`)

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
      console.log('Copied successfully!')
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
  copyFile(src, dest, end)
}
