# Wie man den Linux-Festplattenspeicherplatz anzeigen kann

## Anzeigen der Speicherbelegung einer Festplattenpartition

Um eine Partition unter Linux zu verwenden, müssen Sie sie unter einem bestimmten Verzeichnis einbinden, sodass angenommen werden kann, dass eine Partition einem Verzeichnis entsprechen muss, dessen Inhalt dem Inhalt dieser Partition entspricht.

Um die Speicherbelegung einer Partition zu sehen, können Sie das ``df``-Kommando verwenden.

```sh
df -h
```

Der Rückgabewert ist ähnlich wie folgt.

```
Dateisystem Kapazität Belegt Verfügbar Belegt % Einhängepunkt
devtmpfs 3,9G 0 3,9G 0% /dev
tmpfs 3,9G 0 3,9G 0% /dev/shm
/dev/sda2 496G 2,6G 484G 1% /
/dev/sda1 969M 112M 792M 13% /boot
```

Wie Sie sehen können, sind die Hauptpartitionen `/dev/sda1` und `/dev/sda2`, wobei `/dev/sda2` viel Platz hat und die Partition hauptsächlich für die Datenspeicherung verwendet wird, und der Einhängepunkt ist `/`, das Stammverzeichnis. Aus der obigen Ausgabe können Sie die Speicherbelegung jeder Festplattenpartition sehen.

## Überprüfen der Speicherbelegung eines Verzeichnisses

Um die Speicherbelegung eines Verzeichnisses anzuzeigen, können Sie das `du`-Kommando verwenden. Standardmäßig listet das `du`-Kommando den Speicherplatz von Verzeichnissen und Dateien auf allen Ebenen im angegebenen Verzeichnis auf. Sie können angeben, dass nur der Speicherplatz von Verzeichnissen und Dateien auf der angegebenen Ebene mit dem Parameter `-max-depth` aufgelistet wird.

```sh
du -h --max-depth=1
```

Die Rückgabe ist ähnlich wie folgt.

```
68K . /nginx
12K . /scripts
44M . /log
20K . /bakup
1.9M . /letsencrypt
20M . /storage
22M . /tmp
88M .
```

Aus der obigen Rückgabe können Sie den Gesamtspeicherplatz sehen, den jedes Verzeichnis belegt.

Es ist erwähnenswert, dass das `-du`-Kommando etwas langsamer ausgeführt wird, da es alle Dateien und Verzeichnisse im angegebenen Verzeichnis durchlaufen muss. Seien Sie also geduldig, und es dauert länger, wenn es mehr Verzeichnisse und Dateien gibt.

Es ist auch möglich, einen größeren Wert für den `-max-depth`-Parameter anzugeben, während die Lesbarkeit nicht beeinträchtigt wird, z.B.

```sh
du -h --max-depth=2
```

Auf diese Weise können Sie mehr Informationen auf einmal sehen und schnell verstehen, welche Verzeichnisse viel Platz einnehmen.

## Zusammenfassung

Oben ist die Methode zur Überprüfung der Speichernutzung auf Linux-Systemen. Die Kombination beider kann verwendet werden, um die tägliche Aufgabe der Überprüfung der Speichernutzung abzuschließen.