const http = require('http')
const url = require('url')
/**
 * 簡易Staticファイルサーバツール
 *
 * arg1 サーバのルートディレクトリ指定
 * arg2 ポート番号
 *
 * @example
 *  // カレントディレクトリ内のpublicディレクトリをルートディレクトリとして指定
 *  node server.js public
 */
const path = require('path')
const fs = require('fs')
const context = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : process.cwd()
const port = process.argv[3] || 8888

const server = http.createServer((request, response) => {
  const reqUrl = url.parse(request.url).pathname
  let filepath = path.join(context, reqUrl)

  fs.exists(filepath, exists => {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write(`404 Not Found (${filepath})\n`);
      response.end();
      return;
    }

    if (fs.statSync(filepath).isDirectory()) filepath += '/index.html'

    fs.readFile(filepath, "binary", (err, file) => {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"})
        response.write(err + "\n")
        response.end()
        return
      }

      response.writeHead(200)
      response.write(file, "binary")
      response.end()
    })
  })
})
  .on('error', err => {
    throw err
  })

server.listen(port)
console.log(`Static file server running at\n  => http://localhost:${port}\nContext: ${context}\nCTRL + C to shutdown`)
