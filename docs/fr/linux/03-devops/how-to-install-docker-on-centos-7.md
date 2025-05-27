# Comment installer Docker sur CentOS 7

## Installer yum-utils et ajouter les sources

Pour installer Docker, nous devons d'abord installer `yum-utils` afin d'ajouter les sources de Docker.

```sh
yum install -y yum-utils
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

## Installer Docker

Installez Docker directement avec la commande `yum`.

```sh
yum install docker-ce docker-ce-cli containerd.io
```

## Exécuter et configurer le démarrage automatique

Docker ne s'exécutera pas automatiquement après l'installation, vous devez le démarrer manuellement :

```sh
systemctl to start docker
```

Vous pouvez utiliser la commande `docker ps` pour vérifier l'état d'exécution de Docker. Si vous voyez la liste des fenêtres en cours d'exécution, alors le démarrage est réussi.

```
L'ID du conteneur image commande crée l'état port nom
```

Pour que Docker s'exécute automatiquement à chaque redémarrage de votre système, vous devez également configurer un démarrage automatique :

```sh
systemctl enable docker
```

C'est tout. Vous pouvez vérifier cela avec l'image `hello-world` :

```sh
docker run hello-world
```

Vous aurez réussi si vous voyez la sortie suivante.

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