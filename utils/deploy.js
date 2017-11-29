/* eslint no-console: 0 */
const ghpages = require('gh-pages')
const path = require('path')
const { promisify } = require('util')
const { DateTime } = require('luxon')

const options = {
  repo: 'git@github.com:r-tamura/r-tamura.github.io.git',
  branch: 'master',
  message: `Site updated: ${DateTime.local().setZone('Asia/Tokyo').toString()}`,
  dotfiles: true,
}

const publish = promisify(ghpages.publish)

publish(path.resolve(__dirname, '../public'), options)
  .then(_ => console.log('Deploy finished successfully'))
  .catch(err => {
    console.log(err)
    throw new Error('Deploy failed')
  })

