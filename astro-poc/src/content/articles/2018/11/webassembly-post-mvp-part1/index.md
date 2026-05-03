---
title: WebAssembly's post-MVP futureを読んで Part1
date: 2018-11-25 13:06:31
path: "blog/2018/11/webassembly-post-mvp-part1"
tags: [web, javascript, webassembly, mvp]
---

ここ数年、Webに多数の機能が追加されているが、自分は最近WebAssemblyについて改めて調べることが多くなってきており、そんな中、WebAssemblyに求められるものについて分かりやすく書かれていた[WebAssembly's post-MVP future: A cartoon skill tree - Mozilla Hacks - the Web developer blog][1]という記事を見つけたので、その記事を中心にしてWebAssemblyについてメモをしていく。そちらの記事自体が長いため数パートに分けて書いていこうと思う。

その記事では以下のような内容が書かれている。
 - ・MVP (Minimum Viable Product)
 - ・これから必要となる/実装されている機能
 - ・他の言語機能との比較
 - ・ブラウザの外側
 - ・Node.js
 - ・CDN, Serverless and Edge Computing
 - ・Portable CLI tools
 - ・Internet of Things

WebAssemblyという名前ではあるが、ブラウザの中だけでなく、Node.jsやJavaScriptのエコシステムなどの関わり合いについて求められるものがまとめられているようだ。

### WebAssembly
WebAssemblyとは何かという分かりやすい説明が、本[Learn WebAssembly][2]にかかれている。
> WebAssemly is a compiler target for progmrams on the Web.


### MVP (Minimum Viable Product) の第一歩
WebAssemblyのストーリーはEmscriptenから始まった。EmscriptenはもともとC++のコードで書かれたプログラムをJavaScriptへ変換するツールで、このツールのおかげでゲームやデスクトップアプリなどの巨大なC++コードがWeb環境で動くようになった。

動くようになったものの、この変換で生成されたJavaScriptコードはとても遅くなってしまう。Mozillaによって型付けすることでコードがとても速く動くようになることが発見された。これがasm.jsと呼ばれるJavaScriptのサブセットである。他のブラウザでも取り入れられていったが、より速くする仕組みが求められ、ついにWebAssemlyというJavaScriptとは別の新しい言語の仕様が設計された。ここで、CやC+のコードがWeb上で効率よく実行されるにはWebAssemblyには何が必要であるかということが初めに考えられた。

**Compile target**、**Fast execution**、**Compact**、**Linear memory**がその4本柱として挙げられた。
#### Compile target
多くの言語をサポートできるようコンパイルターゲットで物理的になCPUのマシンコードではなく、仮想マシン(Conceptual Machine/JVMのような)上で動くバイトコード。

#### Fast execution
ユーザ体験を損なわない速さが要求される

#### Compact
コードのロード時間を最小限に抑えることが要求される。インストール型のデスクトップアプリとは異なり、Webはダウンロードが発生する場所がとても多い。LLVMのIRをそのまま使わないのはこのため。

#### Linear memory
ポインタを実装する必要があるが、そのままメモリにアクセスできるものではセキュアでないので、TypedArrayのようなメモリアクセス用のAPIが必要である。

### 処理の重いデスクトップアプリへの対応
WeAssemblyはブラウザで動くようになったが、それですべてではなく今後もその機能は拡張され続けていく。Photoshopがブラウザの上で動作したり、Gmailが即座に読み込まれるのを想像できるだろうか。AutodestkのAutoCADやAdobeのLightroomがWebAssemblyを使ってブラウザ上で動くことが実証されているが、重たいアプリケーションをブラウザ上でスムーズに動作するようにするにはまだ必要なものがある。**Threading**, **SIMD**, **64-bit addressing**, **Streaming compilation**, **Implicit HTTP caching**などである。

#### Threading
より早くプログラムを動かすためには複数のCPUコアで同時に処理を実行することが必要である。現状のWebAssemblyではシングルスレッドのみ可能なので、マルチスレッドプログラミングが可能となるようにすることが必要である。
Chrome70ではpthreadプログラムされたC/C++プログラムをWebAssemblyで実行できるよう実装し、[Origin Trial][Origin Trial]とした。
https://developers.google.com/web/updates/2018/10/wasm-threads

#### SIMD
メモリを小さな塊に分割して一つの演算命令（インストラクション）を複数のデータに同時に実行する。こちらも並列計算の手法の一種で、現在使われているCPUのほとんどがこの演算機能を備えている。

#### 64-bit addressing
64bitのメモリ空間ならば、実質ハードウェアの限界までアドレス空間を使用できる。

#### Streaming compilation
実行速度だけでなくロード速度もより早くすることが求められる。Streaming compilationではWebAssemblyファイルをダウンロードしながら、コンパイルしていく。ダウンロードが終わっているときにはコンパイルもほとんど終わっている。firefoxではStreaming compilationの機能を実装済みで他のブラウザも実装中である。
 - Reference: https://hacks.mozilla.org/2018/01/making-webassembly-even-faster-firefoxs-new-streaming-and-tiering-compiler/

#### Implicit HTTP caching
現状のWebAssemblyでは同じコードを2つのページで読み込んだ場合に、そのたびにコンパイルが実行されてしまう。コンパイルされたコードもHTTP Cacheへストアして、同じwasmを読み込む場合には事前にコンパイルされたコードをキャッシュから取り出すようにすることで、コンパイルをスキップすることができる。

### 各機能の現状(2018/10)
ここまでに挙げられた機能の仕様/実装状況

| Feature | Status |
|----------|-------|
| Threading | 仕様はほぼ固まっている(Spectre問題により[SharedArrayBufferがブラウザにより機能をオフにされている][2]こと以外)。|
| SIMD | 開発中|
| 64-bit addressing | 実装のために必要な仕様大体できている。x86やARMが64bit対応した時に近い方法で実現できる |
| Streaming compilation | Firefoxでは実装済み、他ブラウザーも開発中 |
| Implicit HTTP cache | サポート間近 |

## まとめ
このパートではWebAssemblyがMVPのはじめとして求められたもの、今後は求めらている機能とその開発状況についてまとめらた。ゲームなどのアプリケーション全体がWebAssemblyでできているアプリケーションは自分の環境からするとあまり遭遇することはなさそうだが、次のパートではアプリケーションの一部のみをWebAssemblyとするアプリがどのようにJavaScriptと連携していくかということに焦点を当てて見ていく。

## 参考
 - [WebAssembly's post-MVP future: A cartoon skill tree - Mozilla Hacks - the Web developer blog][1]
 - [Learn WebAssembly][2]

 [1]: https://hacks.mozilla.org/2018/10/webassemblys-post-mvp-future/
 [2]: https://www.packtpub.com/web-development/learn-webassembly