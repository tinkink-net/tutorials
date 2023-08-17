# Linux-Protokoll-Rolling-Cut mit logrotate

## Einführung in das Protokoll-Rolling-Cut

Das Protokollieren ist ein sehr wichtiger Teil von Online-Diensten. Verschiedene Dienste zeichnen ständig ihre eigenen Betriebsprotokolle auf, während sie ausgeführt werden, wie z.B. nginx-Zugriffsprotokolle, Protokolle zum Fluss des Geschäftssystems, verschiedene Fehlerprotokolle usw. Diese Protokolle werden normalerweise in verschiedenen Protokolldateien gespeichert, und die Größe der Protokolldateien wächst mit der Laufzeit.

Aber der Festplattenspeicher des Online-Servers ist begrenzt, und wenn die Größe der Protokolldateien weiter wächst, führt dies letztendlich zu unzureichendem Festplattenspeicher. Um dieses Problem zu lösen, müssen wir Rolling-Cuts an den Protokollen durchführen.

Konkret wird das Rolling-Cut mehrere Dinge tun.

1. bestimmte Rollregeln festlegen (z.B. nach Zeit oder Volumen)
2. das aktuelle Protokoll in ein Historienprotokoll ändern, wenn die Regel erfüllt ist, und eine neue Protokolldatei als aktuelle Protokolldatei generieren
3. automatisch einige alte Protokolldateien aufräumen, wenn es zu viele Historienprotokolldateien gibt

Auf diese Weise wird die ursprünglich große Protokolldatei zu einer Reihe kleiner Protokolldateien, die von Zeit zu Zeit geschnitten und gerollt werden, und die gesamte Protokollhistorie ist im Wesentlichen stabil und unverändert, sodass Sie sich keine Sorgen machen müssen, dass die Protokolle weiter wachsen und Festplattenspeicher belegen.

## Verwendung von logrotate

Die meisten Linux-Distributionen verfügen über ein integriertes logrotate-Tool, mit dem es einfach ist, logrotate-Regeln festzulegen und veraltete Protokolldateien automatisch zu bereinigen.

Die Konfigurationsdatei für `logrotate` ist

- `/etc/logrotate.conf` Hauptkonfigurationsdatei
- Das Verzeichnis `/etc/logrotate.d` kann viele spezifische logrotate-Konfigurationsdateien enthalten

Wenn wir eine Regel für das Rollen von Protokolldateien einrichten müssen, können wir eine neue Konfigurationsdatei unter `/etc/logrotate.d` erstellen. Zum Beispiel `/etc/logrotate.d/nginx`, der Inhalt dieser Datei lautet wie folgt

```
/var/log/nginx/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 640 root root
    sharedscripts
    postrotate
        [ -f /var/run/nginx.pid ] && kill -USR1 \`cat /var/run/nginx.pid`
    endscript
}
```

Die Bedeutung dieser Konfigurationsdatei ist.

- `daily` rollt einmal am Tag
- `missingok` rollt nicht, wenn die Datei nicht vorhanden ist
- `rotate 7` behält die letzten 7 Protokolldateien
- `compress` Komprimiert Protokolldateien
- `delaycompress` Verzögert die Komprimierung
- `notifempty` Rollt nicht, wenn die Datei leer ist
- `create 640 root root` Der Besitzer und die Berechtigungen der neuen Protokolldatei, insbesondere wenn nginx nicht vom Benutzer `root` ausgeführt wird

- `sharedscripts` teilt Skripte, d.h. führt Skripte aus, nachdem die Protokolle abgelaufen sind, sonst müssen Skripte für jede Protokolldatei einzeln ausgeführt werden
- `postrotate` Skript, das nach dem Abschluss des Protokollrollens ausgeführt wird, einige Geschäftsprotokolle benötigen möglicherweise dieses Skript

Sobald die Konfiguration für die Protokollrollenschnittregel festgelegt ist, können Sie ``logrotate -d`` verwenden, um die Regel zu überprüfen, zum Beispiel

```sh
logrotate -d /etc/logrotate.d/nginx
```

gibt etwas Ähnliches zurück.

```
Lese Konfigurationsdatei /etc/logrotate.d/nginx
Alloziere Hash-Tabelle für Statusdatei, Größe: 15360 B

Behandlung von 1 Protokollen

Rotationsmuster: /var/log/nginx/*.log nach 1 Tagen (7 Rotationen)
Leere Protokolldateien werden nicht rotiert, alte Protokolle werden entfernt
Betrachte Protokoll /var/log/nginx/*.log /access.log
  Protokoll muss nicht rotiert werden (Protokoll wurde bereits rotiert)
Betrachte Protokoll /var/log/nginx/*.log /error.log
  Protokoll muss nicht rotiert werden (Protokoll wurde bereits rotiert)

Ausführen des postrotate-Skripts
......
```

Keine Fehler bedeuten, dass die Konfigurationsdatei korrekt ist.

Wenn Sie die Ergebnisse sofort sehen möchten, können Sie `logrotate -f` verwenden, um einen Scroll-Cut zu erzwingen, z.B.

```sh
logrotate -f /etc/logrotate.d/nginx
```

## Weitere Parameter

- `compress` komprimiert die Verlaufsprotokolle nach dem Rollen
- ``nocompress`` komprimiert das Verlaufsprotokoll nach dem Rollen nicht
- `copytruncate` wird verwendet, um die aktuelle Protokolldatei zu sichern und abzuschneiden, während sie noch geöffnet ist; es handelt sich um eine Methode zum Kopieren und anschließenden Leeren, es besteht eine Zeitlücke zwischen dem Kopieren und dem Leeren, und einige Protokolldaten können verloren gehen.
- `nocopytruncate` sichert die Protokolldatei, schneidet sie jedoch nicht ab
- `create mode owner group` gibt den Besitzer und die Berechtigungen für das Erstellen neuer Dateien an
- `nocreate` erstellt keine neuen Protokolldateien
- `delaycompress` und `compress` komprimieren zusammen die Verlaufsprotokolldatei bis zum nächsten Rollen
- `nodelaycompress` überschreibt die Option `delaycompress` und komprimiert auf einer rollierenden Basis
- `missingok` Wenn ein Protokoll fehlt, wird ohne Fehlermeldung zum nächsten Protokoll gescrollt
- `errors address` Senden Sie Fehlermeldungen an die angegebene E-Mail-Adresse beim Scrollen
- `ifempty` Scrollen Sie auch dann, wenn die Protokolldatei leer ist
- `notifempty` Scrollen Sie nicht, wenn die Protokolldatei leer ist
- `mail address` Senden Sie die gescrollte Protokolldatei an die angegebene E-Mail-Adresse
- `nomail` Senden Sie keine Protokolldateien beim Scrollen
- `olddir directory` Legen Sie die gescrollte Protokolldatei in das angegebene Verzeichnis, es muss sich auf demselben Dateisystem wie die aktuelle Protokolldatei befinden

- `noolddir` Die gescrollte Protokolldatei wird im selben Verzeichnis wie die aktuelle Protokolldatei abgelegt
- `sharedscripts` Gemeinsame Skripte, d.h. die Skripte werden nach dem Scrollen der Protokolle ausgeführt, sonst wird jedes Mal, wenn eine Protokolldatei gescrollt wird, das Skript ausgeführt
- `prerotate` Der Befehl, der vor dem Scrollen ausgeführt werden soll, z.B. das Ändern der Eigenschaften der Datei; muss in einer separaten Zeile stehen
- `postrotate` Ein Befehl, der nach dem Rollen ausgeführt werden soll, z.B. das Neustarten (`kill -HUP`) eines Dienstes; muss in einer separaten Zeile stehen
- `daily` gibt an, dass der Rollzeitraum täglich ist
- `weekly` gibt an, dass der Rollzeitraum wöchentlich ist
- `monthly` gibt einen monatlichen Rollzyklus an
- `rotate count` gibt die Anzahl der Rollvorgänge an, bevor die Protokolldatei gelöscht wird, `0` bedeutet, dass keine Backups aufbewahrt werden, `5` bedeutet, dass 5 Backups aufbewahrt werden
- `dateext` verwendet das aktuelle Datum als Namensformat
- `dateformat . %s` wird zusammen mit `dateext` verwendet und erscheint unmittelbar nach der nächsten Zeile. Es definiert den Namen der Datei nach dem Schneiden und muss mit `dateext` verwendet werden. Es unterstützt nur die vier Parameter `%Y`/`%m`/`%d`/`%s`
- `size log-size` (oder `minsize log-size`) Scrollt die Protokolldatei, wenn sie die angegebene Größe erreicht. Folgendes ist das zulässige Format.
    - `size = 5` oder `size 5` (scrollt, wenn >= 5 Bytes)
    - `size = 100k` oder `size 100k`

    - `Größe = 100M` oder `Größe 100M`