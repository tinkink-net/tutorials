# Benutzer und Berechtigungen in Linux

<Validator lang="de" :platform-list="['Ubuntu 22.04']" date="2023-08-02" />

In Linux sind Benutzer Einzelpersonen, die auf das System und seine Ressourcen zugreifen können. Jeder Benutzer hat einen eindeutigen Benutzernamen und eine Benutzer-ID (`UID`), die sie dem System zuordnet. Gruppen sind Sammlungen von Benutzern, die gemeinsame Berechtigungen zum Zugriff auf Dateien und Verzeichnisse haben. Berechtigungen sind Regeln, die bestimmen, wer auf eine Datei oder ein Verzeichnis zugreifen kann und welche Aktionen sie darauf ausführen können.

Linux verwendet ein Berechtigungssystem, das aus drei Arten von Berechtigungen besteht: Lesen, Schreiben und Ausführen. Diese Berechtigungen können für drei Arten von Benutzern festgelegt werden: den Besitzer der Datei oder des Verzeichnisses, Mitglieder der Gruppe, die die Datei oder das Verzeichnis besitzt, und alle anderen Benutzer auf dem System.

Das Verständnis, wie Benutzer, Gruppen und Berechtigungen in Linux funktionieren, ist entscheidend für die Verwaltung des Zugriffs auf Systemressourcen und die Sicherheit Ihres Systems.

## Benutzer

### Aktuellen Benutzer identifizieren

Um den aktuellen Benutzer in Linux zu identifizieren, können Sie den Befehl `whoami` verwenden. Dieser Befehl zeigt den Benutzernamen des aktuellen Benutzers im Terminal an.

```sh
> whoami
tinymemo
```

Zusätzlich können Sie den Inhalt der Umgebungsvariable `$USER` überprüfen, die ebenfalls den Benutzernamen des aktuellen Benutzers anzeigt.

```sh
> echo $USER
tinymemo
```

### Benutzer-ID

Jeder Benutzer in Linux hat eine eindeutige Benutzer-ID (`UID`), die ihn dem System zuordnet. Sie können das `id`-Kommando verwenden, um die `UID` des aktuellen Benutzers anzuzeigen.

```sh
> id
uid=1000(tinymemo) gid=1000(tinymemo) Gruppen=1000(tinymemo),4(adm),27(sudo),44(video),50(staff)
```

Wie Sie sehen können, ist die `UID` des aktuellen Benutzers 1000. Sie können auch die Option `-u` verwenden, um nur die `UID` anzuzeigen, oder Sie können das `id -u`-Kommando verwenden, um nur die `UID` anzuzeigen.

```sh
> id -u
1000

> echo $UID
1000
```

Die `UID` eines Benutzers wird automatisch generiert, wenn der Benutzer erstellt wird. Die `UID` des Root-Benutzers ist immer 0.

Alle Benutzer auf einem Linux-System werden in der Datei `/etc/passwd` gespeichert. Sie können das `cat`-Kommando verwenden, um den Inhalt dieser Datei anzuzeigen.

```sh
> cat /etc/passwd

root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
...
tinymemo:x:1000:1000::/home/tinymemo:/bin/bash
```

Die zweite und dritte Spalte jeder Zeile in der Datei `/etc/passwd` sind die `UID` und die GID des Benutzers. Es ist wichtig zu beachten, dass die `UID` eines Benutzers nicht mit der GID des Benutzers identisch ist. Die GID eines Benutzers ist die ID der Gruppe, zu der der Benutzer gehört. Wir werden Gruppen im nächsten Abschnitt besprechen.

### Einen neuen Benutzer erstellen

Um einen neuen Benutzer in Linux zu erstellen, können Sie den Befehl `adduser` verwenden. Dieser Befehl erstellt einen neuen Benutzer mit dem angegebenen Benutzernamen und `UID`. Wenn Sie keine `UID` angeben, generiert der `adduser`-Befehl automatisch eine `UID` für den neuen Benutzer.

```sh
> sudo adduser neuerbenutzername

Benutzer »neuerbenutzername« wird hinzugefügt ...
Neue Gruppe »neuerbenutzername« (1000) wird hinzugefügt ...
Neuer Benutzer »neuerbenutzername« (1000) mit Gruppe »neuerbenutzername« wird hinzugefügt ...
Home-Verzeichnis »/home/neuerbenutzername« wird erstellt ...
Dateien werden von »/etc/skel« kopiert ...
Neues Passwort:
Neues Passwort erneut eingeben:
Passwort für »newusername« erfolgreich aktualisiert
Benutzerinformationen für neuerbenutzername ändern
Geben Sie den neuen Wert ein oder drücken Sie die Eingabetaste für den Standardwert
	Voller Name []:
	Zimmernummer []:
	Telefon (Arbeit) []:
	Telefon (Privat) []:
	Sonstiges []:
Sind die Informationen korrekt? [J/n] j
```

Nachdem Sie den `adduser`-Befehl ausgeführt haben, werden Sie aufgefordert, ein Passwort für den neuen Benutzer einzugeben. Sie können auch den `passwd`-Befehl verwenden, um ein Passwort für den neuen Benutzer festzulegen.

```sh
> sudo passwd neuerbenutzer
Neues Passwort:
Neues Passwort erneut eingeben:
Passwort für »neuerbenutzer« erfolgreich aktualisiert
```

Wenn Sie den Benutzernamen beim Ausführen des `passwd`-Befehls auslassen, wird ein Passwort für den aktuellen Benutzer festgelegt.

### Benutzer löschen

Um einen Benutzer in Linux zu löschen, können Sie den Befehl `deluser` verwenden. Dieser Befehl löscht den angegebenen Benutzer vom System.

```sh
> sudo deluser neuerbenutzer

Crontab wird entfernt ...
Benutzer "neuerbenutzer" wird entfernt ...
Fertig.
```

## Gruppen

Gruppen sind Sammlungen von Benutzern, die gemeinsame Berechtigungen zum Zugriff auf Dateien und Verzeichnisse haben. Jede Gruppe hat eine eindeutige Gruppen-ID (`GID`), die sie dem System zuordnet. Sie können den Befehl `id` verwenden, um die `GID` des aktuellen Benutzers anzuzeigen.

```sh
> id
uid=1000(tinymemo) gid=1000(tinymemo) Gruppen=1000(tinymemo),4(adm),27(sudo),44(video),50(staff)
```

Wie Sie sehen können, ist die `GID` des aktuellen Benutzers `1000`. Sie können auch die Option `-g` verwenden, um nur die `GID` anzuzeigen, oder Sie können den Befehl `id -g` verwenden, um nur die `GID` anzuzeigen.

### Benutzer zu einer Gruppe hinzufügen

Ein Benutzer kann Mitglied mehrerer Gruppen sein. Um einen Benutzer zu einer Gruppe hinzuzufügen, können Sie den Befehl `usermod` verwenden. Dieser Befehl fügt den angegebenen Benutzer zur angegebenen Gruppe hinzu.

```sh
> sudo usermod -a -G gruppenname benutzername
```

Die Option `-a` teilt dem `usermod`-Befehl mit, den Benutzer an die Gruppe anzuhängen, anstatt die aktuellen Gruppen des Benutzers zu ersetzen. Die Option `-G` teilt dem `usermod`-Befehl mit, den Benutzer zur angegebenen Gruppe hinzuzufügen.

### Entfernen eines Benutzers aus einer Gruppe

Um einen Benutzer aus einer Gruppe zu entfernen, können Sie den Befehl `gpasswd` verwenden. Dieser Befehl entfernt den angegebenen Benutzer aus der angegebenen Gruppe.

```sh
> sudo gpasswd -d benutzername gruppenname

Benutzer newuser wird aus der Gruppe tinkink entfernt
```

### Überprüfen der Benutzergruppen

Um die Gruppen zu überprüfen, zu denen ein Benutzer gehört, können Sie den Befehl `groups` verwenden. Dieser Befehl zeigt die Gruppen an, zu denen der angegebene Benutzer gehört.

```sh
> groups newuser

newuser: newuser tinkink
```

### Erstellen und Löschen einer Gruppe

Um eine neue Gruppe in Linux zu erstellen, können Sie den Befehl `addgroup` verwenden. Dieser Befehl erstellt eine neue Gruppe mit dem angegebenen Gruppennamen und der `GID`. Wenn Sie keine `GID` angeben, generiert der `addgroup`-Befehl automatisch eine `GID` für die neue Gruppe.

```sh
> sudo addgroup testgruppe

sudo addgroup testgruppe
Füge Gruppe "testgruppe" (GID 1001) hinzu ...
Erledigt.
```

Um eine Gruppe in Linux zu löschen, können Sie den Befehl `delgroup` verwenden. Dieser Befehl löscht die angegebene Gruppe aus dem System.

```sh
> sudo delgroup testgruppe

Entferne Gruppe "testgruppe" ...
Erledigt.
```

## Berechtigungen

Nach der langen Reise des Verständnisses von Benutzern und Gruppen sind wir endlich bereit, über Berechtigungen zu sprechen. Berechtigungen sind die Regeln, die bestimmen:

- wer auf eine Datei oder ein Verzeichnis zugreifen kann und
- was sie damit tun können

Diese Berechtigungen können für drei Arten von Benutzern (wer):

- den Besitzer der Datei oder des Verzeichnisses
- Mitglieder der Gruppe, die die Datei oder das Verzeichnis besitzt
- und alle anderen Benutzer auf dem System.

Es gibt drei Arten von Berechtigungen (was kann getan werden): `lesen`, `schreiben` und `ausführen`.

Daher können die Berechtigungen für eine Datei oder ein Verzeichnis für drei Arten von Benutzern (wer) und drei Arten von Berechtigungen (was kann getan werden) festgelegt werden.

### Berechtigungen überprüfen

Um die Berechtigungen einer Datei oder eines Verzeichnisses anzuzeigen, können Sie den Befehl `ls -l` verwenden. Dieser Befehl zeigt die Berechtigungen der angegebenen Datei oder des Verzeichnisses an.

```sh
> ls -l

-rw-r--r-- 1 tinymemo tinymemo  0 Aug  1 16:00 file.txt
drwxr-xr-x 2 tinymemo tinymemo 40 Aug  1 16:00 directory
-rwxr-xr-x 1 tinymemo tinymemo  0 Aug  1 16:00 script.sh
```

Das erste Zeichen jeder Zeile in der Ausgabe des Befehls `ls -l` ist der Dateityp. Die häufigsten Typen sind:

- `-` für eine reguläre Datei
- `d` für ein Verzeichnis

Die nächsten neun Zeichen sind die Berechtigungen für die Datei oder das Verzeichnis. Die ersten drei Zeichen sind die Berechtigungen für den Besitzer der Datei oder des Verzeichnisses. Die nächsten drei Zeichen sind die Berechtigungen für die Gruppe, die die Datei oder das Verzeichnis besitzt. Die letzten drei Zeichen sind die Berechtigungen für alle anderen Benutzer auf dem System.

Das erste Zeichen jeder Gruppe von drei Zeichen ist die `Lesen`-Berechtigung. Das zweite Zeichen jeder Gruppe von drei Zeichen ist die `Schreib`-Berechtigung. Das dritte Zeichen jeder Gruppe von drei Zeichen ist die `Ausführen`-Berechtigung.

Nehmen wir `file.txt` als Beispiel:

- Die ersten drei Zeichen sind `rw-`, was bedeutet, dass der Besitzer der Datei `Lesen`- und `Schreib`-Berechtigungen hat, aber keine `Ausführen`-Berechtigungen.

- Die nächsten drei Zeichen sind `r--`, was bedeutet, dass die Gruppe, die die Datei besitzt (`tinymemo` Gruppe), Leseberechtigungen hat, aber keine Schreib- oder Ausführungsberechtigungen.
- Die letzten drei Zeichen sind `r--`, was bedeutet, dass alle anderen Benutzer auf dem System Leseberechtigungen haben, aber keine Schreib- oder Ausführungsberechtigungen.

### Berechtigungen ändern

Um die Berechtigungen einer Datei oder eines Verzeichnisses zu ändern, können Sie den Befehl `chmod` verwenden. Dieser Befehl ändert die Berechtigungen der angegebenen Datei oder des Verzeichnisses. Hier sind einige Beispiele, wie der Befehl `chmod` verwendet werden kann:

```sh
> chmod +x file.txt
> chmod -x file.txt
> chmod u+x file.txt
> chmod g+x file.txt
> chmod o+x file.txt
> chmod 755 file.txt
> chmod 644 file.txt
> chmod 777 file.txt
> chmod 400 file.txt
```

Die erste Syntax der Berechtigungen lautet `[Rolle][Operator][Berechtigung]`.

- Die `Rolle` kann `u` für den Besitzer der Datei oder des Verzeichnisses, `g` für die Gruppe, die die Datei oder das Verzeichnis besitzt, oder `o` für alle anderen Benutzer auf dem System (alle Benutzer außer dem Besitzer und der Gruppe, die die Datei oder das Verzeichnis besitzt) sein. Wenn Sie die `Rolle` auslassen, gilt sie für alle drei Rollen.
- Der `Operator` kann `+` sein, um eine Berechtigung hinzuzufügen, `-` um eine Berechtigung zu entfernen oder `=` um eine Berechtigung festzulegen.
- Die `Berechtigung` kann `r` für `lesen`, `w` für `schreiben` oder `x` für `ausführen` sein.

Die zweite Syntax der Berechtigungen besteht aus drei Zahlen, wobei jede Zahl die Berechtigungen für den Besitzer, die Gruppe und alle anderen Benutzer auf dem System repräsentiert. Zum Beispiel repräsentiert die erste Zahl die Berechtigungen für den Besitzer, die zweite Zahl repräsentiert die Berechtigungen für die Gruppe und die dritte Zahl repräsentiert die Berechtigungen für alle anderen Benutzer auf dem System.

Der Wertebereich jeder Zahl liegt zwischen `0` und `7`. Tatsächlich handelt es sich um eine dreistellige Binärzahl. Die erste Ziffer repräsentiert die `Lesen`-Berechtigung, die zweite Ziffer repräsentiert die `Schreib`-Berechtigung und die dritte Ziffer repräsentiert die `Ausführen`-Berechtigung. Wenn die Ziffer `1` ist, bedeutet dies, dass die Berechtigung gesetzt ist. Wenn die Ziffer `0` ist, bedeutet dies, dass die Berechtigung nicht gesetzt ist. Zum Beispiel ist `7` in binär `111`, was bedeutet, dass alle drei Berechtigungen gesetzt sind. `6` ist in binär `110`, was bedeutet, dass die `Lesen`- und `Schreib`-Berechtigungen gesetzt sind, aber die `Ausführen`-Berechtigung nicht gesetzt ist.

Wenn wir also die Berechtigungen einer Datei auf `rw-r--r--` setzen möchten, können wir die binäre Zahl jeder Ziffer berechnen:

- `rw-` ist in binär `110`, was in dezimal `6` ist.
- `r--` ist in binär `100`, was in dezimal `4` ist.
- `r--` ist in binär `100`, was in dezimal `4` ist.

Wir können den folgenden Befehl verwenden:

```sh
> chmod 644 file.txt
```

### Besitzer ändern

Um den Besitzer einer Datei oder eines Verzeichnisses zu ändern, können Sie den Befehl `chown` verwenden. Dieser Befehl ändert den Besitzer der angegebenen Datei oder des Verzeichnisses. Hier sind einige Beispiele, wie der `chown` Befehl verwendet werden kann:

```sh
> chown tinymemo:tinymemo file.txt
> chown tinymemo: file.txt
> chown :tinymemo file.txt
> chown tinymemo file.txt
```

Die erste Syntax für den Besitzer lautet `[Benutzer]:[Gruppe]`. Sie können `[Benutzer]` oder `[Gruppe]` weglassen, es ändert nur das, was Sie angegeben haben.

Sie können `-R` verwenden, um den Besitzer eines Verzeichnisses rekursiv zu ändern.

### Gemeinsame Berechtigungen

Folgende sind einige gängige Berechtigungen:

- `644` für Dateien, dies ist auch die Standardberechtigung für Dateien
- `755` für Verzeichnisse, dies ist auch die Standardberechtigung für Verzeichnisse
- `600` oder `400` für sensible Dateien, wie z.B. SSH-Privatschlüssel
- `777` für temporäre Dateien, wie z.B. Cache-Dateien, oder wenn Sie etwas entwickeln, debuggen oder testen, wird dringend davon abgeraten, diese Berechtigung in einer Produktionsumgebung zu verwenden

Sie haben vielleicht den Unterschied zwischen `644` und `755` bemerkt, der in der `Ausführen`-Berechtigung für den Besitzer der Datei oder des Verzeichnisses liegt. Warum benötigt ein Verzeichnis die `Ausführen`-Berechtigung für den Besitzer? Das liegt daran, dass der Zugriff auf ein Verzeichnis tatsächlich das "Ausführen" des Verzeichnisses bedeutet, was bedeutet, dass Sie die Dateien und Verzeichnisse im Verzeichnis auflisten können.

## Abschließende Tipps

Hier sind einige abschließende Tipps:

Erstens hängen die Berechtigungen einer Datei oder eines Verzeichnisses auch von den Berechtigungen des übergeordneten Verzeichnisses ab.

Wenn Sie zum Beispiel keine Ausführungsberechtigung für ein Verzeichnis haben, können Sie nicht auf die Dateien und Verzeichnisse im Verzeichnis zugreifen, auch wenn Sie die Leseberechtigung für die Dateien und Verzeichnisse haben. Das häufigste Beispiel ist das `home`-Verzeichnis. Sie können nicht auf die Home-Verzeichnisse anderer Benutzer zugreifen, auch wenn Sie die Leseberechtigung für die Dateien und Verzeichnisse in den Home-Verzeichnissen haben.

Wenn Sie also eine Datei oder ein Verzeichnis mit anderen Benutzern teilen möchten, sollten Sie es besser in einem Verzeichnis ablegen, für das alle Benutzer die Ausführungsberechtigung haben (außerhalb des `home`-Verzeichnisses), da Sie sonst auf Berechtigungsprobleme stoßen können.

Zweitens kann `SELinux` auch die Berechtigungen einer Datei oder eines Verzeichnisses beeinflussen. Wenn Sie auf Berechtigungsprobleme stoßen und sich absolut sicher sind, dass die Berechtigungen korrekt sind, können Sie versuchen, `SELinux` zu deaktivieren, um zu sehen, ob es funktioniert.

Zu guter Letzt sollten Sie immer das Prinzip des geringsten Privilegs verwenden, wenn Sie Berechtigungen festlegen. Wenn Sie beispielsweise eine Datei mit anderen Benutzern teilen möchten, sollten Sie ihnen nur die `read`-Berechtigung geben, nicht die `write`-Berechtigung. Wenn Sie einen Webserver betreiben, sollten Sie dem Webserver nur die `read`- und `execute`-Berechtigungen geben, nicht die `write`-Berechtigung.

## Zusammenfassung

In diesem Artikel haben wir über Benutzer, Gruppen und Berechtigungen gelernt. Wir haben gelernt, wie man Benutzer und Gruppen erstellt, wie man Benutzer zu Gruppen hinzufügt, wie man den Besitz einer Datei oder eines Verzeichnisses ändert und wie man die Berechtigungen einer Datei oder eines Verzeichnisses ändert. Ich hoffe, es hat Ihnen gefallen. Bis zum nächsten Mal!