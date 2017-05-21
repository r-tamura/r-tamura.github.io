/* eslint no-console: 0 */
import ReactGA from 'react-ga'
import { config } from 'config'

ReactGA.initialize(config.googleAnalyticsId)

exports.onRouteUpdate = state => {
  ReactGA.pageview(state.pathname)
}

exports.wrapRootComponent = Root => {
  if ('serviceWorker' in window.navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope)
        })
        .catch(err => {
          console.log('ServiceWorker registration failed: ', err)
        })
    })
  }
  return Root
}
