/* eslint no-console: 0, no-unused-vars: 0 */
self.addEventListener('install', event => {
  console.log('V1 installing…')
})

self.addEventListener('activate', event => {
  console.log('V1 now ready to handle fetches!')
})

self.addEventListener('fetch', event => {
  console.log(event)
})
