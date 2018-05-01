# Nodejs Web Server Dockerfile
FROM centos:7
LABEL maintainer=rtamura

# コンテナ環境変数設定
ENV APP_PATH /usr/src/app
ENV NODE_VERSION 9
WORKDIR ${APP_PATH}

# nodeとyarnインストール
RUN curl --silent --location https://rpm.nodesource.com/setup_${NODE_VERSION}.x | bash -
RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo > /etc/yum.repos.d/yarn.repo
RUN yum -y install nodejs yarn
RUN yum -y groupinstall "Development Tools"

# 初期化スクリプトをコンテナに追加
ADD init.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/init.sh

# # 8080ポートをHTTPポートとして開放
EXPOSE 8000

CMD ["/usr/local/bin/init.sh"]
