# Audio- und Videoformate mit ffmpeg konvertieren

ffmpeg ist ein Open-Source-Audio- und Videoverarbeitungstool, das in verschiedenen Audio- und Videoverarbeitungssituationen weit verbreitet ist, wie z.B. verschiedenen Video-Websites, Video-Wiedergabetools, Formatkonvertierungstools usw. Wir können es verwenden, um Audio- und Video-Dateien einfach in verschiedene Formate wie mp4, flv, avi, mov usw. zu konvertieren.

## ffmpeg installieren

Sie können ffmpeg direkt von der [offiziellen ffmpeg-Website](https://ffmpeg.org/download.html) herunterladen und installieren.

Auf MacOS können Sie ffmpeg auch mit brew installieren.

```sh
brew install ffmpeg
```

## Verwenden Sie ffmpeg, um Formate zu konvertieren und Videos zu komprimieren

```
ffmpeg -y -i input.mp4 -s 640x360 -r 20 -ac 1 -ar 24000 compress.mp4
```

Die Bedeutung dieses Befehls besteht darin, `input.mp4` in `compress.mp4` zu komprimieren. Die Parameter bedeuten Folgendes.

- `-i` die Eingabedatei, d.h. die zu konvertierende/komprimierende Videodatei
- `-y` die Ausgabedatei überschreiben, falls sie vorhanden ist
- `-s` Größe, Auflösung, hier auf 640x360 festgelegt
- `-r` Bildrate, hier auf 20 fps festgelegt
- `-ac` Anzahl der Kanäle, hier auf Mono-Ausgabe festgelegt, d.h. die linken und rechten Kanäle des Tons werden kombiniert
- `-ar` Abtastrate, hier auf 24000Hz festgelegt, d.h. 24KHz

Aus den obigen Parametern ergibt sich eine Ausgabevideodatei mit einer Auflösung von 640x360, einer Abtastrate von 24KHz, Mono und 20 Bildern pro Sekunde, was relativ eine kleine Videodatei ist. Wenn die obigen Parameter Ihren Anforderungen nicht entsprechen, können Sie sie entsprechend anpassen.

Weitere verfügbare Parameter.

- `-f` Format, Sie können das Ausgabeformat angeben, das Standardformat im Beispiel ist `mp4`, d.h. h264 + aac
- `-af` Soundfilter, der verwendet werden kann, um die Lautstärke des Videos zu ändern `-af 'volume=1'`
- `-an` um Tonspurdaten (Stummschaltung) aus dem Ausgabevideo zu entfernen