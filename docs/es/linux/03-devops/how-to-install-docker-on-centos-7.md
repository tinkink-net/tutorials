# Cómo instalar Docker en CentOS 7

## Instalar yum-utils y añadir fuentes

Para instalar Docker, primero necesitamos instalar `yum-utils` para poder añadir las fuentes de Docker.

```sh
yum install -y yum-utils
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

## Instalar Docker

Instala Docker directamente con el comando `yum`.

```sh
yum install docker-ce docker-ce-cli containerd.io
```

## Ejecutar y configurar el inicio automático

Docker no se ejecutará automáticamente después de la instalación, necesitas ejecutarlo manualmente:

```sh
systemctl to start docker
```

Puedes usar el comando `docker ps` para verificar el estado de ejecución de Docker. Si ves la lista de ventanas en ejecución, entonces el inicio ha sido exitoso.

```
El ID del contenedor imagen comando crea el estado puerto nombre
```

Para que Docker se ejecute automáticamente cada vez que reinicies tu sistema, también necesitas configurar el inicio automático:

```sh
systemctl enable docker
```

Esto es todo. Puedes verificarlo con la imagen `hello-world`:

```sh
docker run hello-world
```

Tendrás éxito si ves la siguiente salida.

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