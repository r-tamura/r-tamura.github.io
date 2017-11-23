webpackJsonp([49453516252736],{396:function(e,n){e.exports={data:{site:{siteMetadata:{authorName:"r-tamura",authorDetail:"Web関連多めのソフトウェアエンジニアです。",githubId:"r-tamura",twitterId:"r_tamura30"}},markdownRemark:{html:'<p>npmでインストールしたコマンドが"node_modules/.bin"ディレクトリにcmdファイルで生成される。そのcmdファイルのソースを読んで理解する。</p>\n<h2>cmdファイルのソースコード(eslintの場合)</h2>\n<p>今回はeslintのcmdファイルを読むが、他のコマンドも同様の形式なので１つ理解すれば問題ない。\n以下がソースコードになる。</p>\n<div class="gatsby-highlight">\n      <pre class="language-cmd"><code>@IF EXIST "%~dp0\\node.exe" (                           // (1)\n  "%~dp0\\node.exe"  "%~dp0\\..\\eslint\\bin\\eslint.js" %* // (2)\n) ELSE (\n  @SETLOCAL                                            // (3)\n  @SET PATHEXT=%PATHEXT:;.JS;=;%                       // (4)\n  node  "%~dp0\\..\\eslint\\bin\\eslint.js" %*\n)</code></pre>\n      </div>\n<h4>TL;DR</h4>\n<p>cmdファイル全体では,\n(1) cmdファイルのディレクトリに<code>node.exe</code>が存在するか\n=> する： node.exeでeslint実行\n=> しない: js拡張子もの含めたパスでnodeコマンドにより、eslint実行</p>\n<h4>(1)の部分</h4>\n<p><code>%~dp0</code>はcmdファイル内で使用できる変数で、「実行されているファイルディレクトリのパス」を表す</p>\n<h4>(2)の部分</h4>\n<p><code>%*</code>はコマンドに続く任意数の引数を表す。\nつまり、(2)はnodejsでeslint.jsを実行しており、cmdファイルの引数を全て渡している。</p>\n<h4>(3)の部分</h4>\n<blockquote>\n<p>Starts localization of environment variables in a batch file. Localization continues until a matching endlocal command is encountered or the end of the batch file is reached.</p>\n</blockquote>\n<p><code>@SETLOCAL</code>はcmdファイル内でのみ有効な環境変数を定義できるようになる宣言になる。\n<code>@ENDLOCAL</code>が呼ばれるまでの間の<code>@SET</code>で設定された設定はcmdファイル内のみ有効になる。</p>\n<h4>(4)の部分</h4>\n<blockquote>\n<p>PathExt environment variable returns a list of the file extensions that the operating system considers to be executable. When executing a command line that does not contain an extension, the command interpreter (cmd.exe) uses the value of this environment variable to determine which extensions to look for and in what order.</p>\n</blockquote>\n<p>環境変数<code>PATHEXT</code>はWindowsが実行可能と判断するファイル拡張子リストである。\n(4)ではPATHEXTに拡張子がJSのファイルを追加している。</p>\n<h1>参考</h1>\n<ul>\n<li><a href="http://pentan.info/server/windows/cmd/dp0.html">%~dp0 とは</a></li>\n<li><a href="https://superuser.com/questions/149951/does-in-batch-file-mean-all-command-line-arguments">does %* in batch file mean all command line arguments?</a></li>\n<li><a href="https://technet.microsoft.com/en-us/library/bb491001.aspx">Setlocal</a></li>\n<li><a href="http://environmentvariables.org/PathExt">PathExt</a></li>\n</ul>',frontmatter:{tags:["nodejs","npm"],title:"node_modules/.binのcmdファイルについて",date:"13 May, 2017"}}},pathContext:{slug:"/articles/2017/05/read-node_modules-bin/"}}}});
//# sourceMappingURL=path---articles-2017-05-read-node-modules-bin-46016820b546090d3a26.js.map