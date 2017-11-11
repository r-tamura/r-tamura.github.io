exports.wrapRootComponent = Root => {
  // service workerの登録
  // - Service Worker スレッドを開始してリソースのダウンロードとキャッシュをバックグラウンドで実行すると
  //   ユーザが初めてアクセスした際のパフォーマンスが悪くなるので
  //   onloadイベントで登録を行う
  // - ページロード時にアニメーションがある場合にはそのアニメーション後にするのが良い場合もある
  // see: https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration?hl=ja
  if ('serviceWorker' in window.navigator) {
    const swPath = `/sw.js`
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(swPath)
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope)
        })
        .catch(err => {
          console.log('ServiceWorker registration failed: ', err)
        })
    })
  }
  // return Root
}
