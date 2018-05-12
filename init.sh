#!/bin/bash

# set -eu

# # モジュールインストール & Nodeサーバの起動
# npm install

# # TERMイベントハンドラ
# cat <<EOF >> ~/.bashrc
# trap 'pkill -TERM node;sleep 3;exit 1' TERM
# EOF

# bashプロセスを起動し、自プロセスは終了する
exec /usr/bin/yarn develop
