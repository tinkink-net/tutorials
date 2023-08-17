# Grundlegende Linux-Befehle für Anfänger

<Validator lang="de" :platform-list="['Ubuntu 22.04','Debian 11.6','CentOS 7.9','MacOS 13.2']" date="2023-04-27" />

Wenn Sie neu in Linux sind, ist es wichtig, grundlegende Befehle zu lernen, um sich im Dateisystem zurechtzufinden. Hier sind einige der wichtigsten Befehle und wie man sie verwendet:

## cd (Change Directory)

Der `cd`-Befehl wird verwendet, um Verzeichnisse im Linux-Dateisystem zu betreten. So verwenden Sie ihn:

```sh
cd [Verzeichnisname]
```

Um zum Beispiel den Ordner "Dokumente" zu betreten, würden Sie Folgendes eingeben:

```sh
cd Dokumente
```

In Linux gibt es ein spezielles Verzeichnis namens "home" (Heimatverzeichnis). Dies ist das Verzeichnis, in dem Sie sich befinden, wenn Sie sich zum ersten Mal in Ihr Linux-System einloggen. Sie können `~` verwenden, um das Heimatverzeichnis darzustellen. Um zum Beispiel das Heimatverzeichnis zu betreten, würden Sie Folgendes eingeben:

```sh
cd ~
```

Sie können auch `..` verwenden, um das übergeordnete Verzeichnis darzustellen. Wenn Sie sich zum Beispiel im Ordner "Dokumente" befinden und das übergeordnete Verzeichnis betreten möchten, würden Sie Folgendes eingeben:

```sh
cd ..
```

Sie können mehrere Verzeichnisnamen verwenden, um ein Verzeichnis zu betreten (getrennt durch `/`). Wenn Sie zum Beispiel den Ordner "Dokumente" im "home"-Verzeichnis betreten möchten, würden Sie Folgendes eingeben:

```sh
cd ~/Dokumente
```

## ls (Liste)

Der Befehl ls wird verwendet, um den Inhalt eines Verzeichnisses anzuzeigen. So wird er verwendet:

```sh
ls [Verzeichnisname]
```

Zum Beispiel, um den Inhalt des Ordners `/usr/share` aufzulisten, würden Sie Folgendes eingeben:

```sh
ls /usr/share
```

Die Ausgabe lautet:

```sh
applications  backgrounds  color  cups  dbus-1  doc  fonts  games  glib-2.0  gnome-shell  icons  i18n  locale  man  metainfo  mime  perl  pixmaps  polkit-1  systemd  themes  xml
```

Sie können alle Dateien und Verzeichnisse im Verzeichnis `/usr/share` sehen. Aber das Einzige, was Sie sehen können, sind die Namen der Dateien und Verzeichnisse. Wenn Sie mehr Informationen über die Dateien und Verzeichnisse sehen möchten, können Sie die Option `-l` verwenden. Zum Beispiel:

```sh
ls -l /var/log
```

Die Ausgabe lautet:

```sh
total 172
-rw-r--r-- 1 root     root    8241 Sep 14 00:00 alternatives.log
-rw-r----- 1 syslog   adm   134781 Sep 16 23:47 auth.log
-rw-r--r-- 1 root     root    1040 Sep 14 00:00 bootstrap.log
drwxr-xr-x 2 root     root    4096 Jan 25 18:16 cups
-rw-r--r-- 1 root     root    4935 Sep 14 00:00 dmesg
...
```

Sie können sehen, dass die Option `-l` mehr Informationen über die Dateien und Verzeichnisse von links nach rechts anzeigt, einschließlich:

- Dateityp und Berechtigungen: Das erste Zeichen gibt den Dateityp an. `-` gibt eine normale Datei an, `d` gibt ein Verzeichnis an, `l` gibt einen symbolischen Link an, und so weiter.
- Besitzer und Gruppe
- Dateigröße. Bei Verzeichnissen beträgt die Größe immer 4096 Bytes.
- Datum und Uhrzeit der letzten Änderung
- Dateiname

## mkdir (Verzeichnis erstellen)

Der `mkdir` Befehl wird verwendet, um ein neues Verzeichnis zu erstellen. So verwenden Sie ihn:

```sh
mkdir [Verzeichnisname]
```

Um beispielsweise ein neues Verzeichnis mit dem Namen "Projekte" zu erstellen, geben Sie Folgendes ein:

```sh
mkdir Projekte/
```

Dieser Befehl gibt keine Ausgabe aus, aber Sie können den Befehl ls verwenden, um zu überprüfen, ob das Verzeichnis erstellt wurde.

Wenn Sie mehrere Verzeichnisse auf einmal erstellen möchten, können Sie die Option `-p` verwenden. Um beispielsweise ein Verzeichnis mit dem Namen "Projekte" unter dem Ordner "Dokumente" zu erstellen, geben Sie Folgendes ein:

```sh
mkdir -p Dokumente/Projekte
```

## rm (Entfernen)

Der `rm` Befehl wird verwendet, um Dateien oder Verzeichnisse zu entfernen. So verwenden Sie ihn:

```sh
rm [Dateiname_oder_Verzeichnisname]
```

Zum Beispiel, um eine Datei namens "beispiel.txt" zu entfernen, würden Sie Folgendes eingeben:

```sh
rm beispiel.txt
```

Wenn Sie ein Verzeichnis entfernen möchten, können Sie die `-r` Option verwenden. Zum Beispiel, um ein Verzeichnis namens "Projekte" zu entfernen, würden Sie Folgendes eingeben:

```sh
rm -r Projekte/
```

Alle Dateien und Unterverzeichnisse im Verzeichnis werden entfernt.

In den meisten Fällen werden Sie zur Bestätigung der Löschung aufgefordert. Wenn Sie die Bestätigung überspringen möchten, können Sie die `-f` Option verwenden. Zum Beispiel:

```sh
rm -r beispiel.txt
rm -rf Projekte/
```

## mv (Verschieben)

Der `mv` Befehl wird verwendet, um Dateien oder Verzeichnisse von einem Ort zum anderen zu verschieben. So verwenden Sie ihn:

```sh
mv [Quellpfad] [Zielpfad]
```

Zum Beispiel, um eine Datei namens "beispiel.txt" vom Ordner "Dokumente" in den Ordner "Projekte" zu verschieben, würden Sie Folgendes eingeben:

```sh
mv Dokumente/beispiel.txt Projekte/
```

## cp (Kopieren)

Der `cp` Befehl wird verwendet, um Dateien oder Verzeichnisse an einen anderen Speicherort zu kopieren. So verwenden Sie ihn:

```sh
cp [Quellpfad] [Zielpfad]
```

Zum Beispiel, um eine Datei namens "example.txt" vom Ordner "Dokumente" in den Ordner "Projekte" zu kopieren, würden Sie Folgendes eingeben:

```sh
cp Dokumente/example.txt Projekte/
```

Wenn Sie ein Verzeichnis kopieren möchten, können Sie die `-r` Option verwenden. Zum Beispiel, um ein Verzeichnis namens "Projekte" in den Ordner "Dokumente" zu kopieren, würden Sie Folgendes eingeben:

```sh
cp -r Projekte/ Dokumente/
```

Wenn Sie den Inhalt des Quellverzeichnisses mit dem Zielverzeichnis zusammenführen möchten, können Sie die `-a` Option verwenden. Zum Beispiel, um ein Verzeichnis namens "Projekte" in den Ordner "Dokumente" zu kopieren, würden Sie Folgendes eingeben:

```sh
cp -a Projekte/ Dokumente/
```

## touch

Der `touch` Befehl wird verwendet, um eine neue leere Datei zu erstellen. So verwenden Sie ihn:

```sh
touch [Dateiname]
```

Zum Beispiel, um eine Datei namens "example.txt" zu erstellen, würden Sie Folgendes eingeben:

```sh
touch example.txt
```

## cat

Der `cat` Befehl wird verwendet, um den Inhalt einer Datei anzuzeigen. So verwenden Sie ihn:

```sh
cat [Dateiname]
```

Zum Beispiel, um den Inhalt einer Datei namens "example.txt" anzuzeigen, würden Sie Folgendes eingeben:

```sh
cat example.txt
```

## pwd (Arbeitsverzeichnis anzeigen)

Der Befehl `pwd` wird verwendet, um das aktuelle Arbeitsverzeichnis anzuzeigen. So verwenden Sie ihn:

```sh
pwd
```

Die Ausgabe wird wie folgt sein:

```sh
/home/benutzername
```

## Zusammenfassung

Dies sind nur einige der grundlegenden Linux-Befehle, die Sie zum Einstieg benötigen. Wenn Sie sich mit der Linux-Umgebung vertrauter machen, werden Sie feststellen, dass Ihnen viele weitere leistungsstarke Befehle zur Verfügung stehen.