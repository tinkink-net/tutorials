# Wie man Dateien in einer Linux-Umgebung komprimiert und dekomprimiert

## Der Unterschied zwischen Packen und Komprimieren

Packen und Komprimieren sind unterschiedliche Konzepte. Beim Packen werden mehrere Dateien/Ordner in eine einzelne Datei kombiniert, während die Komprimierung die Dateigröße durch Komprimierungsalgorithmen reduziert. Es ist wichtig zu beachten, dass Packen nicht bedeutet, die Größe zu reduzieren, und Komprimieren nicht bedeutet, Dateien zusammenzuführen. Obwohl wir die meiste Zeit daran gewöhnt sind, "packen und komprimieren" und manchmal nicht zwischen ihnen unterscheiden müssen, kann das Verständnis des Unterschieds Ihnen helfen, die Befehle in Ihrem Linux-System besser zu verstehen.

## Packen und entpacken (tar)

### Nur packen und komprimieren

Verwenden Sie den Befehl `tar`, um mehrere Dateien/Ordner in eine Datei zu packen.

```sh
tar -cvf archiv.tar datei1 datei2 datei3
```

wobei `archiv.tar` die gepackte Datei ist und `datei1`, `datei2` und `datei3` die zu packenden Dateien/Ordner sind.

Für jede gepackte Datei wird die Ausgabe sein.

```sh
a datei1
a datei2
a datei3
```

### Packen und komprimieren

Der Befehl `tar` integriert auch die Komprimierung, entweder mit den gzip- oder bzip2-Komprimierungsalgorithmen, mit den folgenden Parametern `-z` und `-j` jeweils.

```sh
# Verwenden Sie die gzip-Komprimierung mit .gz nach dem Dateinamen
tar -zcvf archiv.tar.gz datei1 datei2 datei3

# Verwenden Sie die gzip-Komprimierung mit der Dateierweiterung .tgz
tar -zcvf archiv.tgz datei1 datei2 datei3

# Komprimieren Sie mit bzip2 und verwenden Sie .bz2 als Dateierweiterung
tar -jcvf archiv.tar.bz2 datei1 datei2 datei3

# Komprimieren Sie mit bzip2 und verwenden Sie .tbz2 als Dateierweiterung
tar -jcvf archiv.tbz2 datei1 datei2 datei3
```

### Entpacken

```sh
tar -xvf archiv.tar
```

Wenn Sie in das angegebene Verzeichnis entpacken möchten, fügen Sie den Parameter `-C` hinzu.

```sh
tar -xvf archiv.tar -C /pfad/zum/zielverzeichnis
```

Wenn eine Komprimierung vorliegt, fügen Sie die entsprechenden `-z` oder `-j` Argumente hinzu:

```sh
# Entpacken des gzip-Archivs
tar -zxvf archiv.tar.gz

# Entpacken des bzip2-Archivs
tar -jxvf archiv.tar.bz2
```

## Dateien komprimieren und dekomprimieren

### gzip-Komprimierung

Der Befehl `gzip` wird verwendet, um eine Datei zu komprimieren. Es ist erwähnenswert, dass die Originaldatei überschrieben wird, d.h. die Originaldatei verschwindet nach der Komprimierung mit dem `gzip`-Befehl.

```sh
## Die Datei verschwindet und es wird eine neue Datei.gz erstellt
gzip datei
```

Das direkte Anwenden von `gzip` auf ein Verzeichnis hat keine Auswirkungen, da `gzip` nur Dateien, nicht Verzeichnisse, komprimieren kann. Alle Dateien in einem Verzeichnis können jedoch rekursiv mit dem Argument `-r` komprimiert werden:

```sh

# Alle Dateien im Verzeichnis dirname werden komprimiert, jede Datei erzeugt eine entsprechende .gz-Datei und die Originaldatei verschwindet
gzip dirname
```

### gzip Entpackung

Entpacken Sie eine einzelne Datei mit dem `-d` Parameter.

```sh
### Entpacken Sie die file.gz-Datei und erstellen Sie eine neue Datei
gzip -d file.gz
```

Durch Hinzufügen des `-r` Arguments wird die rekursive Entpackung gegen Verzeichnisse ermöglicht, ähnlich wie die Rekursion bei der Komprimierung, die auch alle Dateien in einem Verzeichnis entpackt: ``

```sh
# Entpacken Sie alle gzip-komprimierten Dateien in dirname und Unterverzeichnissen
gzip -dr dirname
```

### zip Komprimierung

zip kann sowohl packen als auch komprimieren.

Zum Packen und Komprimieren.

```sh
zip archive.zip file1 file2 file3
```

Ausgabe.

```sh
adding: file1 (stored 0%)
adding: file2 (stored 0%)
adding: file3 (stored 0%)
```

Wenn Sie Verzeichnisse zusammen komprimieren möchten, müssen Sie den `-r` Parameter hinzufügen, und Sie können den `-q` Parameter verwenden, um die Ausgabe auszuschalten: ```sh

```sh
zip -qr archive.zip dirname
```

### zip entpacken

Um direkt aus dem aktuellen Verzeichnis zu entpacken.

```sh
unzip archive.zip
```

Wenn Sie in ein bestimmtes Verzeichnis entpacken möchten, verwenden Sie den Parameter `-d`. Mit dem zusätzlichen Parameter `-o` können vorhandene Dateien ohne Nachfrage überschrieben werden: ``sh

```sh
unzip -d /pfad/zum/zielverzeichnis -o archive.zip
```

## Kurzfassung

| Suffix | Packen/Zippen | Entpacken/Entzippen |
| ---- | ------- | --------- |
| .tar | tar -cvf archive.tar file1 file2 | tar -xvf archive.tar -C /ziel/pfad |
| .tar.gz/.tgz | tar -zcvf archive.tar file1 file2 | tar -zxvf archive.tar -C /ziel/pfad |
| .tar.bz2/.tbz2 | tar -jcvf archive.tar file1 file2 | tar -jxvf archive.tar -C /ziel/pfad |
| .gz | gzip datei | gzip -d datei.gz |
| .zip | zip -r archive.zip file1 file2 | unzip -d /ziel/pfad -o archive.zip |