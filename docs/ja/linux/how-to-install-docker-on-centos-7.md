# DockerをCentOS 7にインストールする方法

## yum-utilsをインストールしてソースを追加する

Dockerをインストールするには、まず`yum-utils`をインストールしてDockerのソースを追加する必要があります。

```sh
yum install -y yum-utils
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

## Dockerをインストールする

`yum`コマンドでDockerを直接インストールします。

```sh
yum install docker-ce docker-ce-cli containerd.io
```

## 実行して自動起動を設定する

Dockerはインストール後自動的に実行されません。手動で実行する必要があります:

```sh
systemctl to start docker
```

`docker ps`コマンドを使用してDockerの実行状態を確認できます。実行中のウィンドウのリストが出力された場合、起動に成功しています。

```
コンテナIDイメージコマンドは、ステータスポート名を作成します
```

システムを再起動するたびにDockerが自動的に実行されるようにするには、自己起動を設定する必要があります:

```sh
systemctl enable docker
```

これで完了です。 `hello-world`イメージで確認できます:

```sh
docker run hello-world
```

以下の出力が表示された場合、成功です。

```sh
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
93288797bd35: Pull complete
Digest: sha256:37a0b92b08d4919615c3ee023f7ddb068d12b8387475d64c622ac30f45c29c51
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```
