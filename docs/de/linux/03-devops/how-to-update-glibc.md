# Wie man glibc aktualisiert

## Hintergrund

Die GNU C Library (glibc) ist die Standard-C-Bibliothek für das GNU-System. Sie ist die Hauptbibliothek für das GNU-System und wird von den meisten Programmen auf GNU/Linux-Systemen verwendet. Sie bietet die grundlegenden Routinen zum Zuweisen von Speicher, zum Durchsuchen von Verzeichnissen, zum Öffnen und Schließen von Dateien, zum Lesen und Schreiben von Dateien, zur Zeichenkettenverarbeitung, zum Musterabgleich, zur Arithmetik usw.

Wenn Sie auf Linux Software installieren, können Sie auf den folgenden Fehler stoßen:

```bash
./configure: /lib64/libc.so.6: Version `GLIBC_2.14' nicht gefunden (erforderlich von ./configure)
```

Dieser Fehler bedeutet, dass die Version von glibc zu niedrig ist. Sie müssen glibc auf die neueste Version aktualisieren.

Wir können die Version von glibc mit dem folgenden Befehl überprüfen:

```bash
strings /lib64/libc.so.6|grep GLIBC_
```

Die Ausgabe lautet wie folgt:

```bash
GLIBC_2.2.5
GLIBC_2.2.6
GLIBC_2.3
GLIBC_2.3.2
GLIBC_2.3.3
GLIBC_2.3.4
GLIBC_2.4
GLIBC_2.5
GLIBC_2.6
GLIBC_2.7
GLIBC_2.8
GLIBC_2.9
GLIBC_2.10
GLIBC_2.11
GLIBC_2.12
GLIBC_PRIVATE
```

Wie Sie sehen können, ist die Version von glibc 2.12. Sie ist zu niedrig. Wir müssen sie auf die neueste Version aktualisieren.

## Glibc aktualisieren

Zuerst müssen wir ein Verzeichnis erstellen, um den Quellcode von glibc zu speichern:

```bash
mkdir ~/tmp/glibc
```

Dann müssen wir den Quellcode von glibc herunterladen:

```bash
cd ~/tmp/glibc
wget --no-check-certificate https://ftp.gnu.org/gnu/glibc/glibc-2.17.tar.gz
```

> Hinweis: `--no-check-certificate` wird verwendet, um die Zertifikatsprüfung zu deaktivieren, da das Zertifikat der offiziellen Website für einige Linux-Distributionen sehr neu ist. Das System vertraut ihm möglicherweise nicht und verursacht einen Download-Fehler.

Als nächstes müssen wir den Quellcode extrahieren:

```bash
tar -xvf glibc-2.17.tar.gz
```

Dann sehen Sie ein Verzeichnis namens `glibc-2.17`. Wenn Sie Probleme beim Extrahieren des Quellcodes haben, können Sie [hier](/de/linux/how-to-compress-and-decompress.html) nachsehen, wie man komprimiert und entpackt.

Wir müssen in das Verzeichnis wechseln, den Quellcode kompilieren und dann installieren:

```bash
cd glibc-2.17
mkdir build && cd build
../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
make&&make install
```

> Hinweis: Die Installation von glibc erfordert Root-Rechte. Sie müssen also zum Benutzer `root` wechseln oder `sudo` verwenden, um die obigen Befehle auszuführen.

Jetzt haben wir glibc auf die neueste Version aktualisiert. Wir können die Version von glibc erneut überprüfen:

```bash

```
strings /lib64/libc.so.6|grep GLIBC_
```

Die Ausgabe lautet wie folgt:

```bash
GLIBC_2.2.5
GLIBC_2.2.6
GLIBC_2.3
GLIBC_2.3.2
GLIBC_2.3.3
GLIBC_2.3.4
GLIBC_2.4
GLIBC_2.5
GLIBC_2.6
GLIBC_2.7
GLIBC_2.8
GLIBC_2.9
GLIBC_2.10
GLIBC_2.11
GLIBC_2.12
GLIBC_2.13
GLIBC_2.14
GLIBC_2.15
GLIBC_2.16
GLIBC_2.17
GLIBC_PRIVATE
```

Wie Sie sehen können, wurde die Version von glibc auf 2.17 aktualisiert. Jetzt können wir die Software installieren, die eine höhere Version von glibc erfordert.
