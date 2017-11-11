/* eslint no-console: 0 */
const ghpages = require('gh-pages')
const path = require('path')
const moment = require('moment')

const options = {
  repo: 'git@github.com:r-tamura/r-tamura.github.io.git',
  branch: 'master',
  message: `Site updated: ${moment().format('YYYY-MM-DD hh:mm:ss')}`
}

ghpages.publish(path.resolve(__dirname, '../public'), options, err => {
  if (err) {
    console.log(err)
    throw new Error('Deploy failed')
  } else {
    console.log('Deploy finished successfully')
  }
})
