# Linux: Dateien mit dem Find-Befehl suchen

<Validator lang="de" :platformList="['Ubuntu 22.10', 'Debian 11', 'CentOS Stream 9', 'macOS 13.2.1']" date="2023-04-04" />

Der `find`-Befehl in Linux ist ein leistungsstarkes Werkzeug, mit dem Sie nach Dateien und Verzeichnissen in einer gegebenen Verzeichnishierarchie basierend auf verschiedenen Parametern suchen können. In diesem Tutorial werden wir untersuchen, wie man den find-Befehl und seine verschiedenen Optionen verwendet.

## Grundlegende Syntax

Die grundlegende Syntax des find-Befehls lautet wie folgt:

```sh
find [Verzeichnis] [Ausdruck]
```

Hier ist `[Verzeichnis]` das Verzeichnis, in dem Sie nach Dateien suchen möchten, und `[Ausdruck]` ist das Suchkriterium, das Sie anwenden möchten. Der find-Befehl sucht nach Dateien und Verzeichnissen im angegebenen `[Verzeichnis]` und seinen Unterverzeichnissen, die dem angegebenen `[Ausdruck]` entsprechen.

Die Ausgabe des find-Befehls ist eine Liste von Dateien und Verzeichnissen, die den angegebenen Suchkriterien entsprechen. Wenn Sie zum Beispiel den folgenden Befehl ausführen:

```sh
find . -name "*.txt"
```

Erhalten Sie eine Liste aller Dateien mit der Erweiterung `.txt` im aktuellen Verzeichnis und seinen Unterverzeichnissen:

```
./example.txt
./example2.txt
./subdir/example3.txt
```

## Dateien nach Namen finden

Um nach einer Datei nach Namen zu suchen, verwenden Sie die Option `-name`, gefolgt vom Namen der gesuchten Datei. Zum Beispiel, um nach einer Datei mit dem Namen `beispiel.txt` im aktuellen Verzeichnis und seinen Unterverzeichnissen zu suchen, verwenden Sie den folgenden Befehl:

```sh
find . -name "beispiel.txt"
```

Dies sucht nach allen Dateien mit dem Namen "beispiel.txt" im aktuellen Verzeichnis und seinen Unterverzeichnissen.

Um nach allen Dateien mit einer bestimmten Erweiterung zu suchen, verwenden Sie die Option `-name`, gefolgt vom Platzhalterzeichen `*` und der Erweiterung, nach der Sie suchen. Zum Beispiel, um nach allen Dateien mit der Erweiterung `.txt` im aktuellen Verzeichnis und seinen Unterverzeichnissen zu suchen, verwenden Sie den folgenden Befehl:

```sh
find . -name "*.txt"
```

Dies sucht nach allen Dateien mit der Erweiterung `.txt` im aktuellen Verzeichnis und seinen Unterverzeichnissen.

Tatsächlich kann das Platzhalterzeichen `*` in jedem Teil des Dateinamens verwendet werden. Zum Beispiel:

```sh
find . -name "beispiel*"
find . -name "*beispiel.txt"
find . -name "*beispiel.*"
```

## Verzeichnisse finden

Um nach allen Verzeichnissen im aktuellen Verzeichnis und seinen Unterverzeichnissen zu suchen, verwenden Sie die Option `-type` gefolgt von `d`. Verwenden Sie zum Beispiel den folgenden Befehl, um nach allen Verzeichnissen im aktuellen Verzeichnis und seinen Unterverzeichnissen zu suchen:

```sh
find . -type d
```

Dies sucht nach allen Verzeichnissen im aktuellen Verzeichnis und seinen Unterverzeichnissen.

## Dateien nach Änderungszeit finden

Um nach allen Dateien zu suchen, die innerhalb eines bestimmten Zeitraums geändert wurden, verwenden Sie die Option `-mtime` gefolgt von der Anzahl der Tage. Wenn Sie nach Dateien suchen möchten, die innerhalb der letzten `n` Tage geändert wurden, verwenden Sie eine negative Zahl `-n`.

Verwenden Sie zum Beispiel den folgenden Befehl, um nach allen Dateien zu suchen, die innerhalb der letzten 7 Tage geändert wurden:

```sh
find . -mtime -7
find . -mtime -1w
```

Die Standardzeiteinheit für die Option `-mtime` sind Tage.

Sie können auf macOS auch andere Zeiteinheiten verwenden:

- `s` - Sekunden
- `m` - Minuten
- `h` - Stunden
- `d` - Tage
- `w` - Wochen

> Sie können auch die Optionen `-atime` und `-ctime` verwenden, um nach Dateien basierend auf ihrem Zugriffszeitpunkt und ihrem Erstellungszeitpunkt zu suchen.

## Dateien nach Größe finden

Um nach allen Dateien zu suchen, die größer als eine bestimmte Größe sind, verwenden Sie die Option `-size`, gefolgt von der Größe in Bytes mit einem `+`-Zeichen. Um nach allen Dateien zu suchen, die kleiner als eine bestimmte Größe sind, verwenden Sie die Option `-size`, gefolgt von der Größe in Bytes mit einem `-`-Zeichen.

Zum Beispiel, um nach allen Dateien größer als `10MB` im aktuellen Verzeichnis und seinen Unterverzeichnissen zu suchen, verwenden Sie den folgenden Befehl:

```sh
find . -size +10M
```

Dies sucht nach allen Dateien größer als `10MB` im aktuellen Verzeichnis und seinen Unterverzeichnissen.

Die gängigen Einheiten für die Größe, die Sie verwenden können, sind:

- `c` - Bytes
- `k` - Kilobytes (1024 Bytes)
- `M` - Megabytes (1024 Kilobytes)
- `G` - Gigabytes (1024 Megabytes)
- `T` - Terabytes (1024 Gigabytes)
- `P` - Petabytes (1024 Terabytes)

## Kombinieren von Suchkriterien

Sie können mehrere Suchkriterien kombinieren, um Dateien zu finden, die bestimmten Bedingungen entsprechen. Zum Beispiel, um nach allen Dateien mit einer bestimmten Erweiterung zu suchen, die innerhalb der letzten 7 Tage geändert wurden, verwenden Sie den folgenden Befehl:

```sh
find . -name "*.txt" -type f -mtime -7
```

Dies sucht nach allen Dateien mit der Erweiterung `.txt`, die innerhalb der letzten 7 Tage im aktuellen Verzeichnis und seinen Unterverzeichnissen geändert wurden.

## Verwendung der Ausgabe des find-Befehls


Sie können die Ausgabe des find-Befehls auf verschiedene Arten verwenden. Hier sind einige Beispiele:

Um die Ausgabe des find-Befehls in einer Datei zu speichern, verwenden Sie den folgenden Befehl:

```sh
find . -name "*.txt" > files.txt
```

Dies speichert die Namen aller Dateien mit der Erweiterung `.txt` in einer Datei namens `files.txt`.

Um die Ausgabe des find-Befehls als Eingabe für einen anderen Befehl zu verwenden, verwenden Sie den Befehl `xargs`.

Um beispielsweise alle Dateien mit einer bestimmten Erweiterung zu löschen, verwenden Sie den folgenden Befehl:

```sh
find . -name "*.txt" -type f | xargs rm
```

Um eine Aktion für jede vom find-Befehl gefundene Datei auszuführen, verwenden Sie die Option `-exec`.

Um beispielsweise die Berechtigungen aller Dateien mit einer bestimmten Erweiterung zu ändern, verwenden Sie den folgenden Befehl:

```sh
find . -name "*.txt" -type f -exec chmod 644 {} \;
```

Die Syntax des `-exec`-Arguments lautet:

```sh
-exec Befehl {} \;
```

- `Befehl` ist der Befehl, den Sie auf die vom find-Befehl gefundenen Dateien ausführen möchten.
- `{}` ist ein Platzhalter, der durch den Namen der vom find-Befehl gefundenen Datei ersetzt wird.
- `\;` wird verwendet, um den Befehl zu beenden und das Ende des `-exec`-Arguments anzugeben.

Um die Anzahl der von dem Befehl `find` gefundenen Dateien zu zählen, verwenden Sie den Befehl `wc`. Verwenden Sie zum Beispiel den folgenden Befehl, um die Anzahl der Dateien mit einer bestimmten Erweiterung zu zählen:

```sh
find . -name "*.txt" -type f | wc -l
```

## Fazit

Der Befehl `find` in Linux ist ein leistungsstarkes Werkzeug, mit dem Sie nach Dateien und Verzeichnissen basierend auf verschiedenen Kriterien suchen können. Durch die Verwendung verschiedener Optionen und die Kombination von Suchkriterien können Sie schnell die benötigten Dateien und Verzeichnisse finden. Sie können auch die Ausgabe des `find`-Befehls auf verschiedene Arten verwenden, um Aktionen auf den gefundenen Dateien auszuführen.