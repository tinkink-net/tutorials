# Tmux Tutorial: Terminal Multiplexer für Linux

Tmux (Terminal Multiplexer) ist ein leistungsstarkes Tool, das es ermöglicht, mehrere Terminal-Sitzungen in einem einzigen Fenster zu verwalten. Es ist besonders nützlich für die Ausführung langer Prozesse, die Organisation des Arbeitsablaufs und die Aufrechterhaltung von Sitzungen, die auch nach dem Trennen der Verbindung zu einem Server bestehen bleiben.

## Was ist Tmux?

Tmux ist ein Terminal-Multiplexer, was bedeutet, dass es mehrere Terminal-Sitzungen innerhalb eines einzigen Terminal-Fensters ermöglicht. Man kann es sich als Fenstermanager für das Terminal vorstellen - es ermöglicht das Erstellen, den Zugriff und die Steuerung mehrerer Terminal-Sitzungen, jede mit mehreren Fenstern und Bereichen.

Das Kernkonzept hinter tmux ist die Trennung des Terminals (deines Terminal-Emulators wie gnome-terminal, iTerm2 usw.) von den darin laufenden Sitzungen. Diese Trennung bietet leistungsstarke Funktionen, die mit einem Standard-Terminal sonst unmöglich wären.

## Wie Tmux funktioniert

Tmux arbeitet mit einer Client-Server-Architektur:

1. **Server**: Wenn du zum ersten Mal einen tmux-Befehl ausführst, startet im Hintergrund ein tmux-Server-Prozess. Dieser Server verwaltet alle deine Sitzungen, Fenster und Bereiche.

2. **Sitzungen**: Eine Sitzung ist eine Instanz von tmux, die mehrere Fenster enthalten kann. Jede Sitzung ist unabhängig und kann an Terminal-Clients angehängt oder von ihnen getrennt werden.

3. **Client**: Wenn du tmux-Befehle ausführst, erstellst du tatsächlich Client-Verbindungen zum tmux-Server. Diese Clients zeigen an, was in einer Sitzung passiert.

Diese Architektur verleiht tmux seine leistungsstarken Persistenzfähigkeiten. Selbst wenn alle Clients die Verbindung trennen, läuft der Server weiter und hält deine Sitzungen am Leben.

## Warum Tmux verwenden?

Tmux bietet mehrere Schlüsselvorteile, die es für terminalbasierte Arbeit unschätzbar machen:

### Persistente Sitzungen
Eine der leistungsstärksten Funktionen von tmux ist die Sitzungspersistenz. Deine Sitzungen laufen weiter, auch wenn du die Verbindung zum Terminal trennst. Dies ist besonders wertvoll, wenn:
- Du auf entfernten Servern über SSH arbeitest
- Lange Prozesse ausführst, die Stunden dauern
- Unerwartet von einer Terminal-Sitzung getrennt wirst

### Fenster- und Bereichsverwaltung
Tmux ermöglicht es dir, deine Terminal-Arbeit effizient zu organisieren:
- Erstelle mehrere Fenster innerhalb einer Sitzung (wie Browser-Tabs)
- Teile Fenster in mehrere Bereiche für Multitasking
- Ändere die Größe und ordne Bereiche nach deinen Bedürfnissen an
- Führe mehrere Befehle gleichzeitig in einem strukturierten Layout aus

### Verbesserte Produktivität
Tmux verbessert deinen Terminal-Workflow erheblich:
- Wechsle zwischen verschiedenen Projekten oder Aufgaben, ohne mehrere Terminal-Fenster zu öffnen
- Behalte konsistente Arbeitsumgebungen über Terminal-Sitzungen hinweg
- Verwende Tastaturkürzel, um schnell zwischen Fenstern und Bereichen zu navigieren
- Kopiere und füge Text zwischen Bereichen und Sitzungen ein

## Installation von Tmux

Bevor du tmux verwenden kannst, musst du es installieren:

### Ubuntu/Debian:
```sh
sudo apt update
sudo apt install tmux
```

### CentOS/RHEL/Fedora:
```sh
# CentOS/RHEL
sudo yum install tmux

# Fedora
sudo dnf install tmux
```

### macOS:
```sh
# Mit Homebrew
brew install tmux
```

## Grundlegende Tmux-Konzepte

Das Verständnis der hierarchischen Struktur von tmux ist der Schlüssel zur effektiven Nutzung:

- **Sitzung**: Der Container auf oberster Ebene, der mehrere Fenster enthalten kann. Eine Sitzung ist das, woran du dich anhängst und von dem du dich trennst. Jede Sitzung hat einen eindeutigen Namen und kann als Projekt-Arbeitsbereich betrachtet werden.

- **Fenster**: Ähnlich wie ein Tab in einem Browser existiert ein Fenster innerhalb einer Sitzung und kann einen oder mehrere Bereiche enthalten. Jedes Fenster hat seinen eigenen Satz von Bereichen und kann verschiedene Programme unabhängig ausführen.

- **Bereich**: Eine separate Terminal-Ansicht innerhalb eines Fensters. Bereiche ermöglichen es dir, mehrere Programme nebeneinander im selben Fenster auszuführen. Du kannst Fenster horizontal oder vertikal teilen, um Bereiche zu erstellen.

Diese dreistufige Hierarchie (Sitzung → Fenster → Bereich) bietet ein leistungsstarkes Organisationssystem für deine Terminal-Arbeit. Du könntest beispielsweise eine Sitzung für ein Webentwicklungsprojekt mit mehreren Fenstern haben (eines für Code, eines für Logs, eines für die Datenbank), jedes mit mehreren Bereichen (Editor, Terminal, Ausgabe).

## Starten von Tmux

Es gibt mehrere Möglichkeiten, tmux zu starten, je nach deinen Bedürfnissen:

### Erstellen einer neuen Sitzung
Um eine neue unbenannte tmux-Sitzung zu starten:
```sh
tmux
```

Dies öffnet eine neue tmux-Sitzung mit einer Statusleiste am unteren Rand, die Sitzungsinformationen anzeigt.

### Erstellen einer benannten Sitzung
Für eine bessere Organisation, besonders wenn du an mehreren Projekten arbeitest, erstelle benannte Sitzungen:
```sh
tmux new -s sitzungsname
```

Benannte Sitzungen erleichtern die Identifizierung und Verwaltung mehrerer Sitzungen.

### Anhängen an eine bestehende Sitzung
Um sich an eine bestehende Sitzung anzuhängen:
```sh
tmux attach -t sitzungsname
```

Wenn du nur eine Sitzung hast, kannst du einfach verwenden:
```sh
tmux attach
```

### Verstehen der Statusleiste
Wenn du tmux startest, wirst du eine Statusleiste am unteren Rand des Terminals bemerken. Diese Leiste bietet wichtige Informationen:
- Aktueller Sitzungsname
- Fensterliste mit hervorgehobenem aktivem Fenster
- Systeminformationen wie Uhrzeit und Datum
- Hostname

Die Statusleiste ist dein wichtigster visueller Indikator für das, was in tmux passiert, und sie kann angepasst werden, um zusätzliche Informationen anzuzeigen.

## Tmux-Tastenbindungen

Alle tmux-Befehle beginnen mit einer Präfix-Taste. Standardmäßig ist dies `Strg+b`. Nach dem Drücken der Präfix-Taste kannst du eine weitere Taste drücken, um einen Befehl auszuführen.

Um beispielsweise ein neues Fenster zu erstellen, würdest du `Strg+b` gefolgt von `c` drücken.

### Verstehen des Präfix-Tasten-Mechanismus

Der Präfix-Tasten-Mechanismus ist zentral für die Funktionsweise von tmux. Da tmux innerhalb eines Terminals läuft, benötigt es eine Möglichkeit, zwischen folgenden zu unterscheiden:
1. Befehle, die du an Programme senden möchtest, die innerhalb von tmux laufen
2. Befehle, die du an tmux selbst senden möchtest

Indem eine Präfix-Taste vor tmux-Befehlen erforderlich ist, kann tmux diese Befehle abfangen, während alle anderen Tastenanschläge an deine Programme weitergeleitet werden. Deshalb kannst du vim, emacs oder jedes andere terminalbasierte Programm normal innerhalb von tmux verwenden - tmux erfasst nur die spezifischen Tastenkombinationen, die mit dem Präfix beginnen.

### Warum Strg+b?

Die Standard-Präfix-Taste `Strg+b` wurde gewählt, weil sie selten von anderen Programmen verwendet wird. Viele Benutzer ändern sie jedoch zu `Strg+a` (ähnlich wie bei GNU Screen), da sie mit einer Hand leichter zu drücken ist.

### Befehlsmodus

Nach dem Drücken der Präfix-Taste wechselt tmux für einen kurzen Zeitraum (konfigurierbar) in den Befehlsmodus, in dem es auf deinen Befehl wartet. Wenn du die falsche Taste drückst oder deine Meinung änderst, kannst du `Esc` drücken oder auf das Timeout warten, um zum normalen Betrieb zurückzukehren.

## Grundlegende Tmux-Befehle

### Sitzungsverwaltung
- `tmux new -s sitzungsname` - Erstelle eine neue Sitzung mit einem bestimmten Namen
- `tmux ls` - Liste alle Sitzungen auf
- `tmux attach -t sitzungsname` - Hänge dich an eine bestehende Sitzung an
- `tmux kill-session -t sitzungsname` - Beende eine bestimmte Sitzung

### Innerhalb einer Tmux-Sitzung
- `Strg+b d` - Trenne dich von der aktuellen Sitzung
- `Strg+b $` - Benenne die aktuelle Sitzung um
- `Strg+b s` - Liste alle Sitzungen auf und wechsle zwischen ihnen

### Fensterverwaltung
- `Strg+b c` - Erstelle ein neues Fenster
- `Strg+b n` - Wechsle zum nächsten Fenster
- `Strg+b p` - Wechsle zum vorherigen Fenster
- `Strg+b w` - Liste alle Fenster auf und wähle eines aus
- `Strg+b ,` - Benenne das aktuelle Fenster um
- `Strg+b &` - Schließe das aktuelle Fenster

### Bereichsverwaltung
- `Strg+b %` - Teile den aktuellen Bereich vertikal
- `Strg+b "` - Teile den aktuellen Bereich horizontal
- `Strg+b o` - Wechsle zwischen Bereichen
- `Strg+b ;` - Wechsle zum zuletzt aktiven Bereich
- `Strg+b x` - Schließe den aktuellen Bereich
- `Strg+b z` - Schalte die Bereichsvergrößerung um (maximieren/minimieren)
- `Strg+b {` - Verschiebe den aktuellen Bereich nach links
- `Strg+b }` - Verschiebe den aktuellen Bereich nach rechts

### Kopiermodus
- `Strg+b [` - Wechsle in den Kopiermodus
- Pfeiltasten oder vim-ähnliche Navigation (h,j,k,l) zum Bewegen
- `Leertaste` - Starte Auswahl
- `Enter` - Kopiere Auswahl
- `Strg+b ]` - Füge kopierten Text ein

## Praktische Beispiele

### Beispiel 1: Ausführen eines langen Prozesses
Einer der häufigsten Anwendungsfälle für tmux ist die Ausführung langer Prozesse, die auch dann weiterlaufen müssen, wenn du die Verbindung zum Terminal trennst.

1. Starte eine neue benannte tmux-Sitzung:
   ```sh
   tmux new -s langer_prozess
   ```
   
   Das Erstellen einer benannten Sitzung macht es später leichter, sie zu identifizieren.

2. Führe deinen langen Prozess aus (z.B. ein Backup):
   ```sh
   tar -czf backup.tar.gz /home/user/data
   ```
   
   Dieser Prozess wird innerhalb der tmux-Sitzung ausgeführt.

3. Wenn du die Verbindung trennen musst:
   Drücke `Strg+b` und dann `d`, um dich von der Sitzung zu trennen.
   
   Das Trennen stoppt den Prozess nicht - er läuft im Hintergrund weiter. Dies ist der Schlüsselmechanismus, der Persistenz ermöglicht.

4. Später, hänge dich wieder an, um den Prozess zu überprüfen:
   ```sh
   tmux attach -t langer_prozess
   ```
   
   Wenn du dich wieder anhängst, siehst du den aktuellen Status deines Prozesses genau so, wie du ihn verlassen hast.

### Beispiel 2: Organisation deiner Entwicklungsarbeit
Tmux eignet sich hervorragend für die Organisation komplexer Arbeitsabläufe mit mehreren verwandten Aufgaben.

1. Starte eine neue Sitzung für dein Projekt:
   ```sh
   tmux new -s projekt
   ```
   
   Dies erstellt einen dedizierten Arbeitsbereich für dein Projekt.

2. Erstelle Fenster für verschiedene Aufgaben:
   - Drücke `Strg+b c`, um ein Fenster zum Programmieren zu erstellen
   - Drücke erneut `Strg+b c`, um ein Fenster für Logs zu erstellen
   - Drücke erneut `Strg+b c`, um ein Fenster für Dokumentation zu erstellen
   
   Jedes Fenster ist wie ein Tab, der verschiedene Aspekte deiner Arbeit isoliert.

3. Teile innerhalb eines Fensters Bereiche für Multitasking:
   - Drücke `Strg+b %`, um vertikal für Editor und Terminal zu teilen
   - Drücke `Strg+b "`, um horizontal für die Ausgabe zu teilen
   
   Bereiche ermöglichen es dir, mehrere verwandte Ansichten gleichzeitig zu sehen.

4. Navigiere durch deinen organisierten Arbeitsbereich:
   - Verwende `Strg+b n` und `Strg+b p`, um zwischen Fenstern zu wechseln
   - Verwende `Strg+b o`, um zwischen Bereichen im aktuellen Fenster zu wechseln
   - Verwende `Strg+b w`, um eine visuelle Liste aller Fenster zu sehen

Diese Organisation ermöglicht es dir, eine konsistente Arbeitsumgebung für jedes Projekt zu erhalten. Wenn du zu deiner "Projekt"-Sitzung zurückkehrst, ist alles genau so, wie du es verlassen hast.

### Beispiel 3: Kollaborative Sitzung
Mehrere Benutzer können sich an dieselbe tmux-Sitzung anhängen, was kollaboratives Arbeiten ermöglicht:

1. Benutzer 1 erstellt eine Sitzung:
   ```sh
   tmux new -s zusammenarbeit
   ```

2. Benutzer 2 (am selben System angemeldet) hängt sich an dieselbe Sitzung an:
   ```sh
   tmux attach -t zusammenarbeit
   ```
   
Beide Benutzer sehen dasselbe Terminal, und Aktionen eines Benutzers sind für den anderen sichtbar. Dies ist möglich, weil die Client-Server-Architektur von tmux es mehreren Clients ermöglicht, sich mit derselben Sitzung zu verbinden.

## Anpassung von Tmux

Tmux ist über seine Konfigurationsdatei `~/.tmux.conf` hochgradig anpassbar. Diese Datei wird beim Start von tmux gelesen und ermöglicht es dir, Tastenbindungen, Aussehen, Verhalten und mehr zu ändern.

### Verstehen der tmux-Konfiguration

Die tmux-Konfigurationsdatei verwendet eine einfache Syntax, bei der jede Zeile ein Befehl ist. Kommentare beginnen mit `#`. Hier ist ein grundlegendes Beispiel mit Erklärungen:

```bash
# Setze Präfix-Taste auf Strg+a (wie bei screen)
# Dies wird oft bevorzugt, da es mit einer Hand leichter zu drücken ist
unbind C-b          # Entferne die Standard-Präfix-Tastenbindung
set -g prefix C-a   # Setze Strg+a als neue Präfix-Taste
bind C-a send-prefix # Erlaube Strg+a Strg+a, um an Programme weiterzuleiten

# Aktiviere Mausunterstützung
# Mit dieser Aktivierung kannst du klicken, um Bereiche auszuwählen, Bereiche zu vergrößern und zu scrollen
set -g mouse on

# Setze Statusleisten-Stil
# Passe das Aussehen der Statusleiste am unteren Rand an
set -g status-style bg=black,fg=white

# Aktiviere 256-Farben-Unterstützung
# Dies stellt sicher, dass Programme innerhalb von tmux Farben korrekt anzeigen können
set -g default-terminal "screen-256color"

# Erhöhe Scrollback-Puffer
# Dies ermöglicht es dir, nach oben zu scrollen und mehr Verlauf in jedem Bereich zu sehen
set -g history-limit 10000

# Binde Bereichswechsel neu, um vim-ähnliche Tasten zu verwenden
# Dies macht die Navigation für vim-Benutzer intuitiver
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R
```

### Anwenden von Konfigurationsänderungen

Nach dem Erstellen oder Ändern von `~/.tmux.conf` hast du zwei Möglichkeiten:

1. Starte tmux neu (was deine Sitzungen beenden wird)
2. Lade die Konfiguration in deiner bestehenden tmux-Sitzung neu:
   ```sh
   tmux source-file ~/.tmux.conf
   ```

Die zweite Option wird bevorzugt, da sie Änderungen anwendet, ohne deine Arbeit zu unterbrechen. Du kannst sogar eine Taste binden, um dies automatisch zu tun:
```bash
# Lade Konfiguration mit Präfix + r neu
bind r source-file ~/.tmux.conf
```

### Konfigurationsbereich

Beachte das `-g`-Flag in vielen Konfigurationsbefehlen. Dies steht für "global" und bedeutet, dass die Einstellung für alle Sitzungen, Fenster und Bereiche gilt. Ohne `-g` gelten Einstellungen nur für die aktuelle Sitzung.

Konfigurationsoptionen können auf verschiedenen Ebenen festgelegt werden:
- Global (mit `-g`): Gilt überall
- Sitzung: Gilt für eine Sitzung
- Fenster: Gilt für ein Fenster
- Bereich: Gilt für einen Bereich

## Zusammenfassung

Tmux ist ein unglaublich leistungsstarkes Tool zur Verwaltung von Terminal-Sitzungen, das auf einer Client-Server-Architektur basiert und Sitzungspersistenz, Fensterverwaltung und Bereichsorganisation bietet.

### Schlüsselmechanismen

1. **Client-Server-Architektur**: Tmux läuft als Server-Prozess, der Sitzungen unabhängig von Terminal-Clients verwaltet, was persistente Sitzungen ermöglicht, die Verbindungsabbrüche überleben.

2. **Hierarchische Organisation**: Die dreistufige Struktur (Sitzung → Fenster → Bereich) bietet eine leistungsstarke Organisation für komplexe Arbeitsabläufe.

3. **Präfix-Tasten-System**: Der Präfix-Tasten-Mechanismus ermöglicht es tmux, Befehle abzufangen, während alle anderen Tastenanschläge an Programme weitergeleitet werden, die innerhalb von tmux laufen.

4. **Trennen und Wiederanhängen**: Die Fähigkeit, sich von Sitzungen zu trennen, ohne Prozesse zu stoppen, macht tmux für Fernarbeit und lang laufende Aufgaben unschätzbar.

### Vorteile

- **Persistenz**: Verliere nie deine Arbeit aufgrund von Netzwerkproblemen oder Terminal-Schließungen
- **Organisation**: Strukturiere komplexe Arbeitsabläufe mit Fenstern und Bereichen
- **Zusammenarbeit**: Mehrere Benutzer können dieselbe Sitzung anzeigen und mit ihr interagieren
- **Ressourceneffizienz**: Führe mehrere Terminals innerhalb eines einzigen Terminal-Fensters aus
- **Produktivität**: Navigiere schnell zwischen Aufgaben mit Tastaturkürzeln

Mit Übung kann tmux deine Produktivität bei der Arbeit in Terminal-Umgebungen erheblich verbessern. Die anfängliche Lernkurve wird schnell durch die Effizienzgewinne bei der Verwaltung komplexer Terminal-Arbeitsabläufe belohnt.