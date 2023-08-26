# Wie man Nginx verwendet, um einen statischen Dateiserver zu hosten

Nginx ist ein Webserver, der verwendet werden kann, um statische Dateien zu hosten. Dieses Tutorial beschreibt, wie man Nginx verwendet, um einen statischen Dateiserver zu hosten.

Nach Abschluss dieses Tutorials können Sie:

- Verzeichnisse durchsuchen
- Zu Unterverzeichnissen und Dateien navigieren
- Dateien über den Browser herunterladen

## Nginx konfigurieren

Zuerst müssen Sie Nginx installiert haben. Wenn Sie Nginx nicht installiert haben, können Sie sich an andere Anleitungen wenden.

Nach der Installation von Nginx können Sie es konfigurieren, um einen statischen Dateiserver zu hosten. Überprüfen Sie `/etc/nginx/nginx.conf`, um zu sehen, ob die Konfigurationsdatei in mehrere Dateien aufgeteilt ist. Sie können den folgenden Befehl verwenden, um es zu öffnen:

```
vi /etc/nginx/nginx.conf
```

Wenn Sie `include /etc/nginx/conf.d/*.conf;` im `http`-Abschnitt sehen können, bedeutet dies, dass die Konfigurationsdatei in mehrere Dateien aufgeteilt ist.

Sie können den folgenden Befehl verwenden, um eine neue Konfigurationsdatei zu erstellen:

```
vi /etc/nginx/conf.d/static-file-server.conf
```

> Hinweis: Möglicherweise müssen Sie `sudo` verwenden, um den obigen Befehl auszuführen. `sudo vi /etc/nginx/conf.d/static-file-server.conf`

Fügen Sie dann die folgende Konfiguration zur Datei hinzu:

```
server {
    listen       80;
    server_name  static-file-server.tinkink.net; # Ändern Sie dies in Ihren Domainnamen

    root /path/to/your/static/files; # Ändern Sie dies in Ihr Verzeichnis für statische Dateien

    autoindex on; # Aktivieren Sie die Verzeichnisliste

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Hier gibt `listen` den zu lauschenden Port an, `server_name` gibt den Domainnamen oder die IP-Adresse an, `root` gibt das Verzeichnis für statische Dateien an und `autoindex` aktiviert das Verzeichnislisting.

`location /` passt zum Stammverzeichnis, `try_files` gibt die auszuprobierenden Dateien an und gibt einen 404 Fehler zurück, wenn die Datei nicht gefunden wird.

## Nginx neu starten

Nachdem Sie Nginx konfiguriert haben, müssen Sie es neu starten, damit die Konfiguration wirksam wird:

```
sudo systemctl restart nginx
```

oder

```
sudo service nginx restart
```

## Auf die Website zugreifen

Jetzt können Sie über den Browser auf die Website zugreifen, zum Beispiel: `http://static-file-server.tinkink.net`

## Berechtigungen

Stellen Sie sicher, dass die Verzeichnisberechtigungen korrekt gesetzt sind, um Sicherheitsprobleme zu vermeiden. Da nginx möglicherweise einen eindeutigen Benutzer `nginx` zum Ausführen verwendet, sollten Sie den Besitzer und die Gruppe des Verzeichnisses auf diese Benutzergruppe setzen. Sie können den folgenden Befehl verwenden, um die Berechtigungen festzulegen:

```
chown -R nginx:nginx /Pfad/zu/Ihren/statischen/Dateien
```

Wenn sich das Verzeichnis für statische Dateien im Home-Verzeichnis des Benutzers befindet, müssen Sie außerdem sicherstellen, dass das Home-Verzeichnis und das Verzeichnis für statische Dateien die korrekten Zugriffsberechtigungen haben. Es ist etwas kompliziert, daher empfehle ich Ihnen, das Verzeichnis für statische Dateien aus dem Home-Verzeichnis zu verschieben.

Wenn Sie konsequent Home-Verzeichnisse verwenden, müssen Sie den Benutzer `nginx` zu Ihrer Benutzergruppe hinzufügen. Sie können den folgenden Befehl verwenden:

```
usermod -a -G {Benutzername} nginx
```

Dann müssen Sie Berechtigungen für die Gruppe hinzufügen. Sie können den folgenden Befehl verwenden:

```
chmod g+rwx /home/{Benutzername}
```

> Hinweis: Ersetzen Sie `{Benutzername}` durch Ihren Benutzernamen.

Wenn es immer noch nicht funktioniert, können Sie versuchen, SELinux auszuschalten. Sie können den folgenden Befehl verwenden:

```
sudo setenforce 0
```

Wenn es jetzt funktioniert, können Sie SELinux dauerhaft deaktivieren. Öffnen Sie die Datei `/etc/selinux/config` und ändern Sie `SELINUX=enforcing` in `SELINUX=disabled`. Speichern Sie dann die Datei und starten Sie das System neu.

## Schlussfolgerung

Das Einrichten eines statischen Dateiservers mit Nginx ist einfach, aber wenn Sie die Dateien im Home-Verzeichnis platzieren möchten, kann es etwas kompliziert sein.
