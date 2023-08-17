# 如何在 CentOS 7 上安裝 Docker

## 安裝 yum-utils 並添加源

爲了安裝 Docker，我們需要首先安裝`yum-utils`，以便添加 Docker 的源。

```sh
yum install -y yum-utils
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

## 安裝 Docker

直接使用`yum`命令即可安裝 Docker。

```sh
yum install docker-ce docker-ce-cli containerd.io
```

## 運行並設置自啓動

Docker 安裝完之後不會自動運行，需要手動運行：

```sh
systemctl start docker
```

可使用`docker ps`命令查看 Docker 運行狀態，如看到輸出正在運行的窗口列表，則啓動成功：

```
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
```

爲了讓 Docker 在每次重啓系統的時候能自動運行，還需要設置自啓動：

```sh
systemctl enable docker
```

至此就大功告成了。可以使用`hello-world`鏡像驗證一下：

```sh
docker run hello-world
```

看到以下輸出即爲成功：

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
