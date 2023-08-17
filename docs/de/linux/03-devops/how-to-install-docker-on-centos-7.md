# Wie man Docker auf CentOS 7 installiert

## Installieren Sie yum-utils und fügen Sie Quellen hinzu

Um Docker zu installieren, müssen wir zuerst `yum-utils` installieren, um die Quellen von Docker hinzuzufügen.

```sh
yum install -y yum-utils
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

## Installieren Sie Docker

Installieren Sie Docker direkt mit dem `yum` Befehl.

```sh
yum install docker-ce docker-ce-cli containerd.io
```

## Ausführen und Autostart einrichten

Docker wird nach der Installation nicht automatisch ausgeführt. Sie müssen es manuell ausführen:

```sh
systemctl start docker
```

Sie können den Befehl `docker ps` verwenden, um den Ausführungsstatus von Docker zu überprüfen. Wenn Sie die Liste der ausgeführten Fensterausgabe sehen, war der Start erfolgreich.

```
Die Container-ID-Bild-Befehl erstellt den Status Port-Name
```

Damit Docker jedes Mal automatisch ausgeführt wird, wenn Sie Ihr System neu starten, müssen Sie auch einen Selbststart einrichten: ``sh

```sh
systemctl enable docker
```

Das war's. Sie können dies mit dem `hello-world`-Image überprüfen:

```sh
docker run hello-world
```

Sie haben Erfolg, wenn Sie die folgende Ausgabe sehen.

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

 3. Der Docker-Daemon hat einen neuen Container aus diesem Image erstellt, der das ausführbare Programm ausführt, das die Ausgabe erzeugt, die Sie gerade lesen.
 4. Der Docker-Daemon hat diese Ausgabe an den Docker-Client gestreamt, der sie an Ihr Terminal gesendet hat.

Um etwas Ambitionierteres auszuprobieren, können Sie einen Ubuntu-Container mit folgendem Befehl ausführen:
 $ docker run -it ubuntu bash

Teilen Sie Bilder, automatisieren Sie Workflows und vieles mehr mit einer kostenlosen Docker-ID:
 https://hub.docker.com/

Für weitere Beispiele und Ideen besuchen Sie:
 https://docs.docker.com/get-started/
```