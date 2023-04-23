# How to install Docker on CentOS 7

## Install yum-utils and add sources

In order to install Docker, we need to first install `yum-utils` in order to add Docker's sources.

```sh
yum install -y yum-utils
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

## Install Docker

Install Docker directly with the `yum` command.

```sh
yum install docker-ce docker-ce-cli containerd.io
```

## Run and set autostart

Docker will not run automatically after installation, you need to run it manually:

```sh
systemctl to start docker
```

You can use the `docker ps` command to check the running status of Docker. If you see the list of running windows output, then the startup is successful.

```
The container ID image command creates the status port name
```

In order for Docker to run automatically every time you reboot your system, you also need to set up a self-start: ``sh

```sh
systemctl enable docker
```

This is all done. You can verify this with the `hello-world` image:

```sh
docker run hello-world
```

You will be successful if you see the following output.

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
