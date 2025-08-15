# Tmux Spickzettel

<Validator lang="de" :platform-list="['Ubuntu 22.04','Debian 11.6','CentOS 7.9','MacOS 13.2']" date="2023-05-01" />

Dieser Spickzettel bietet eine schnelle Referenz für die am häufigsten verwendeten tmux-Befehle. Alle Befehle erfordern, dass zuerst die Präfix-Taste (standardmäßig `Ctrl+b`) gedrückt wird, gefolgt von der Befehlstaste.

## Sitzungsverwaltung

| Befehl | Beschreibung |
|---------|-------------|
| `tmux` | Neue tmux-Sitzung starten |
| `tmux new -s name` | Neue benannte Sitzung starten |
| `tmux ls` | Alle Sitzungen auflisten |
| `tmux attach -t name` | An eine benannte Sitzung anhängen |
| `tmux kill-session -t name` | Eine benannte Sitzung beenden |
| `tmux kill-server` | Alle Sitzungen und den tmux-Server beenden |

## Präfix-Tastenkombinationen

Alle folgenden Befehle erfordern, dass zuerst die Präfix-Taste (`Ctrl+b` standardmäßig) gedrückt wird:

### Sitzungsbefehle
| Taste | Beschreibung |
|-----|-------------|
| `d` | Von aktueller Sitzung trennen |
| `s` | Sitzungen auflisten |
| `$` | Sitzung umbenennen |
| `(` | Zur vorherigen Sitzung wechseln |
| `)` | Zur nächsten Sitzung wechseln |

### Fensterbefehle
| Taste | Beschreibung |
|-----|-------------|
| `c` | Neues Fenster erstellen |
| `n` | Nächstes Fenster |
| `p` | Vorheriges Fenster |
| `w` | Fenster auflisten |
| `,` | Aktuelles Fenster umbenennen |
| `&` | Aktuelles Fenster schließen |
| `0-9` | Zu Fensternummer wechseln |

### Bereichsbefehle
| Taste | Beschreibung |
|-----|-------------|
| `%` | Bereich vertikal teilen |
| `"` | Bereich horizontal teilen |
| `o` | Zum nächsten Bereich wechseln |
| `;` | Zum zuletzt aktiven Bereich wechseln |
| `x` | Aktuellen Bereich schließen |
| `z` | Bereichszoom umschalten |
| `{` | Aktuellen Bereich nach links verschieben |
| `}` | Aktuellen Bereich nach rechts verschieben |
| `space` | Zwischen Bereichslayouts umschalten |
| `q` | Bereichsnummern anzeigen |
| `Up/Down/Left/Right` | Zu Bereich in angegebener Richtung wechseln (mit Mausmodus) |

### Kopiermodus
| Taste | Beschreibung |
|-----|-------------|
| `[` | Kopiermodus aktivieren |
| `]` | Kopierten Text einfügen |
| `PgUp/PgDn` | Seite hoch/runter im Kopiermodus |
| `/` | Vorwärts suchen |
| `?` | Rückwärts suchen |

## Erweiterte Bereichsverwaltung

| Befehl | Beschreibung |
|---------|-------------|
| `Ctrl+b Ctrl+o` | Bereiche vorwärts rotieren |
| `Ctrl+b !` | Bereich in Fenster umwandeln |
| `Ctrl+b Ctrl+Left/Right/Up/Down` | Bereichsgröße ändern |
| `Ctrl+b Alt+1` | Bereiche gleichmäßig verteilen |
| `Ctrl+b q` | Bereichsnummern anzeigen (vorübergehend) |

## Kopiermodus-Navigation (Vim-Stil)

Im Kopiermodus (`Ctrl+b [`), kannst du Vim-ähnliche Navigation verwenden:

| Taste | Beschreibung |
|-----|-------------|
| `h/j/k/l` | Nach links/unten/oben/rechts bewegen |
| `w/W` | Zum nächsten Wort/Anfang des nächsten Wortes |
| `b/B` | Zum vorherigen Wort/Anfang des vorherigen Wortes |
| `0/^` | Zum Zeilenanfang |
| `$` | Zum Zeilenende |
| `H/M/L` | Zum oberen/mittleren/unteren Bildschirmrand |
| `gg/G` | Zum Anfang/Ende des Puffers |
| `Ctrl+u/d` | Halbe Seite nach oben/unten |
| `Ctrl+b/f` | Seite nach oben/unten |

## Kopiermodus-Operationen

| Taste | Beschreibung |
|-----|-------------|
| `Space` | Auswahl beginnen |
| `Enter` | Auswahl kopieren |
| `Esc` | Auswahl löschen |
| `v` | Zeichenweise Auswahl beginnen |
| `V` | Zeilenweise Auswahl beginnen |
| `Ctrl+v` | Blockweise Auswahl beginnen |

## Anpassungstipps

### Präfix-Taste ändern
Um die Präfix-Taste von `Ctrl+b` zu `Ctrl+a` zu ändern (wie bei GNU Screen), füge Folgendes zu `~/.tmux.conf` hinzu:
```bash
unbind C-b
set -g prefix C-a
bind C-a send-prefix
```

### Mausunterstützung aktivieren
```bash
set -g mouse on
```

### Konfiguration neu laden
Nach Änderung der `~/.tmux.conf`:
```sh
Ctrl+b : source-file ~/.tmux.conf
```

## Statusleisten-Anpassung

Häufige Statusleisten-Anpassungen für `~/.tmux.conf`:

```bash
# Statusleistenfarben ändern
set -g status-style bg=blue,fg=white

# Systemstatistiken anzeigen
set -g status-right "#[fg=white,bg=black] #H #[fg=white,bg=blue] %H:%M %d-%b-%y "

# Fensterliste mit besserer Formatierung anzeigen
set -g status-justify centre
setw -g window-status-format "#I:#W#F"
setw -g window-status-current-format "#I:#W#F"
```

## Kurzreferenz-Zusammenfassung

- **Präfix-Taste**: `Ctrl+b` (Standard)
- **Sitzung erstellen**: `tmux new -s session_name`
- **Trennen**: `Ctrl+b d`
- **Wieder verbinden**: `tmux attach -t session_name`
- **Neues Fenster**: `Ctrl+b c`
- **Bereich teilen**: `Ctrl+b %` (vertikal) oder `Ctrl+b "` (horizontal)
- **Zwischen Bereichen wechseln**: `Ctrl+b o` oder Pfeiltasten (mit Mausmodus)
- **Kopiermodus**: `Ctrl+b [`
- **Einfügen**: `Ctrl+b ]`

Dieser Spickzettel deckt die wichtigsten tmux-Befehle ab. Mit diesen wirst du in der Lage sein, mehrere Terminal-Sitzungen und Arbeitsabläufe effizient zu verwalten.