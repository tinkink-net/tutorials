# Zusammenführen von Audio- und Videodateien mit ffmpeg

ffmpeg ist ein Open-Source-Audio- und Videoverarbeitungstool, das in verschiedenen Audio- und Videoverarbeitungssituationen weit verbreitet ist, wie z.B. verschiedenen Video-Websites, Video-Wiedergabetools, Formatkonvertierungstools usw. Wir können es verwenden, um Audio- und Videodateien einfach in verschiedene Formate wie mp4, flv, avi, mov usw. zu konvertieren.

## ffmpeg installieren

Sie können ffmpeg direkt von der [offiziellen ffmpeg-Website](https://ffmpeg.org/download.html) herunterladen und installieren.

Auf MacOS können Sie ffmpeg auch mit brew installieren: ``sh

```sh
brew install ffmpeg
```

## Audio- und Videodateien mit ffmpeg zusammenführen

Im Folgenden finden Sie ein Beispiel zum Zusammenführen von Videodateien, die Audiodateien sind ähnlich.

Erstellen Sie zunächst eine Textdatei mit der Liste der zu zusammenzuführenden Dateien, ``list.txt``.

```
file '1.mp4'
file '2.mp4'
```

Führen Sie anschließend die Dateien in der Liste mit ffmpeg zusammen.

```sh
ffmpeg -f concat -i list.txt -c copy all.mp4
```

## Zusammenfassung

Sie können Audio- und Videodateien mit dem ``concat``-Befehl zusammenführen, indem Sie eine Liste der Eingabedateien und Ausgabedateien mit dem Parameter ``-i`` angeben.