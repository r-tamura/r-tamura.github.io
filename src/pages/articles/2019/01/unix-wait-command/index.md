---
title: Unixのwaitコマンド
date: 2019-01-18 21:20:26
path: "blog/2019/01/unix-wait-command"
tags: [unix, process, shell]
---

2019 年最初の記事は Unix の`wait`コマンドについて。`wait`コマンドは Linux に通常 built-in で組み込まれているコマンドで、機能は**実行されている他のプロセスの終了を待つ**こと。 コマンド引数には待つ対象のプロセス ID を指定することができ、もし引数を指定しない場合は全ての子プロセスの終了を待つ。`wait`は現在の実行環境のジョブテーブルを参照するため、`cd`のようにシェルビルトインとして実装されている。(シェルビルトインは外部プログラムではなくシェル自体に組み込まれているコマンド[1][1])

## 基本的な使い方

`wait`コマンドこシンタックスは以下になる。 自分は複数の重い処理をバックグラウンドで同時に実行した場合の全プロセスの完了同期をするときに使う。

```bash
wait [n]

# n    : 待つ対象の プロセスID or ジョブID (現在実行されているバックグラウンドプロセスのジョブID)
```

### 例 1 指定したプロセスを待つ

#### サンプルプログラム 1

子プロセスが終了するまで、プロセスがブロッキングし、 子プロセスの返り値を自身の返り値とする。

```shell
#!/usr/bin/env bash

success_process () {
  sleep 3
  true
}

fail_process () {
  sleep 3
  return 100
}

success_process &
pid1=$!
echo "waiting process 1"
wait $pid1
echo "process 1 exited with $?"

fail_process &
pid2=$!
echo "waiting process 2..."
wait $pid2
echo "process 2 exited with $?"
```

#### Output

```shell
$ bash wait_1.sh
waiting process 1
process 1 exited with 0    # 3秒後に0を返す
waiting process 2...
process 2 exited with 100  # 3秒後に100を返す
```

### 例 2 全ての子プロセスの終了を待つ

#### サンプルプログラム 2

子プロセスが終了するまで、プロセスがブロッキングし、 子プロセスの返り値を自身の返り値とする。
重たいプロセスを想定した関数を 5 つ呼び出す。

```shell
#!/usr/bin/env bash
heavey_process () {
  sleep $1
}

for i in {1..5}
do
  # Run command in background
  heave5_process $i &
done

wait
echo "all process finished"
```

#### Output

```shell
$ bash wait_2.sh
all process finished   # ほぼ5秒後に終了
```

### 例 3 子プロセスが存在しない場合

#### サンプルプログラム 3

```shell
#!/usr/bin/env bash

sleep 5 &
pid=$1
kill $1
wait $1
echo $1 was terminated. exited with $?
```

#### Output

```shell
$ bash wait_3.sh
wait_3.sh: line 6:    79 Terminated              sleep 5
79 was terminated. exited with 143               # すぐに終了
```

どうやら今回の環境ではプロセスが存在しない場合は 143 を返すよう。

## カーネルの観点から

子プロセスは正常終了・異常終了にかかわらず、プロセスを終了するときに自身の親プロセスへ SIGCHILD シグナルを送信する。親プロセスはシグナルを無視するかシグナルハンドラーを実行するかを選択できるが、デフォルト動作は無視となっている。

- [Wait Command in Linux – Linux Hint](https://linuxhint.com/wait_command_linux/)
- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/bashref.html#index-wait)
- [Shell builtin - Wikipedia][1]

[1]: https://en.wikipedia.org/wiki/Shell_builtin
