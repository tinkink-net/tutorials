# Verwenden Sie die VSCode-Timeline-/Lokale Dateiverlaufsfunktion, um versehentliches Löschen von Dateien zu verhindern

Es gibt nichts Schlimmeres in der Code-Entwicklung als das versehentliche Löschen einer Datei. Manchmal kann es ein Pop-up-Fenster, ein falscher Knopf oder ein Git-Fehler sein, und die Früchte tagelanger harter Arbeit sind verloren.

Es wäre schön, eine Funktion zu haben, die jede Version Ihres gespeicherten Codes lokal aufzeichnet und jederzeit abrufen kann, sodass Sie sich keine Sorgen machen müssen, Dateien versehentlich zu verlieren.

In VSCode wurde dies früher durch die Installation von Plugins (wie dem Local History Plugin) erreicht, aber nach Version 1.44 verfügt VSCode über eine integrierte Timeline-Funktion. In diesem Artikel wird erläutert, wie Sie die Timeline-Funktion verwenden können, um den Verlust von Dateien durch versehentliches Löschen zu verhindern.

## Verwendung

Wenn Sie eine Code-Datei öffnen, wird auf der linken Seite unterhalb des Dateipanels ein "TIMELINE"-Panel angezeigt, das die Zeitleiste darstellt.

![TIMELINE-Panel](/attachments/vscode/timeline-local-history-usage/01.panel.png)

Nachdem die Datei geändert und gespeichert wurde, erscheint ein neuer Knoten in der Zeitleiste, der die Versionshistorie der Code-Datei darstellt.

![Versionshistorie](/attachments/vscode/timeline-local-history-usage/02.timeline-versions.png)

> Neben "Speichern" werden auch Git-Commits, Dateiumbenennungen und andere Aktionen als Versionen im Panel angezeigt.

Durch Klicken auf eine Version wird ein Vergleichsbildschirm mit der aktuellen Datei geöffnet, sodass Sie sehen können, was sich von der historischen Version zur neuesten Version geändert hat.

Durch Klicken mit der rechten Maustaste auf eine Version werden verschiedene Menüs angezeigt.

![Versionsverlauf](/attachments/vscode/timeline-local-history-usage/03.context-menu.png)

Diese Menüs sind (für Mac-Systeme zum Beispiel):

- Mit Datei vergleichen Vergleicht mit der aktuellen Dateiversion
- Mit vorheriger Version vergleichen Vergleicht mit der vorherigen Version
- Für Vergleich auswählen Wählt die aktuelle Version als Vergleichsversion aus (Sie können eine andere Version im Dateibaum oder im TIMELINE-Panel auswählen, um die beiden Versionen zu vergleichen)
- Inhalt anzeigen Zeigt den Inhalt der ausgewählten Version an

- Inhalte wiederherstellen Wiederherstellen der Inhalte der ausgewählten Version
- Im Finder anzeigen Die ausgewählte Version der Datei im Dateimanager anzeigen
- Umbenennen Die ausgewählte Version umbenennen
- Löschen Die ausgewählte Version löschen

Klicken Sie auf die Schaltfläche "Filter" auf der rechten Seite des TIMELINE-Panels, um die Arten von Aufzeichnungen auszuwählen, die im Panel angezeigt werden sollen. Derzeit werden lokale Dateiaufzeichnungen und Git-Commit-Aufzeichnungen angezeigt, die bei Bedarf angezeigt werden können.

Wenn Sie nur die Git-Commit-Aufzeichnung überprüfen, können Sie die Git-Commit-Historie Ihrer Dateien sehen, was sehr praktisch ist.

## Wiederherstellen versehentlich gelöschter Dateien

Wenn eine Datei versehentlich gelöscht wird, wird sie in VSCode nicht angezeigt, geöffnet oder im TIMELINE-Panel gefunden. Tatsächlich ist jedoch trotz des versehentlichen Löschens die historische Version der Datei lokal noch vorhanden.

Wir können jede Version einer beliebigen Datei im selben Projekt finden und dann die ausgewählte Version im Dateimanager öffnen, indem wir mit der rechten Maustaste darauf klicken. Dadurch können wir den Ordner finden, in dem VSCode die Versionshistorie speichert. Auf einem Mac-System lautet der Pfad zum Beispiel wie folgt.

```
/Users/xxx/Library/Application Support/Code/User/History/61e8902
```

Das Verzeichnis `History` ist das Verzeichnis, in dem alle Versionshistorien gespeichert sind. Wir müssen also nur nach Schlüsselwörtern suchen, um die entsprechenden Dateien zu finden.

Wenn wir zum Beispiel nach dem Schlüsselwort `DbConnection` suchen, lautet der Suchbefehl wie folgt:

```sh
# Mac / Linux
grep -r DbConnection "/Users/xxx/Library/Application Support/Code/User/History"

# Windows
findstr /s /i DbConnection "C:\Users\xxx\AppData\Roaming\Code\User\History"
```

Nachdem Sie die Suchergebnisse durchsucht haben, können Sie die entsprechenden Dateien öffnen, sie einzeln überprüfen und die benötigte Version finden.

## Zusammenfassung

Die Timeline ist eine einfache und praktische Funktion. Mit ihr benötigen Sie keine anderen Plug-Ins, um den gesamten Dateiverlauf zu speichern. Sie müssen sich also keine Sorgen mehr machen, dass Code aufgrund versehentlicher Dateilöschung verloren geht.