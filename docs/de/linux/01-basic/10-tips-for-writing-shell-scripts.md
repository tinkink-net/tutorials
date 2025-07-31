# Tipps zum Schreiben besserer Shell-Skripte

Shell-Skripte sind leistungsstarke Werkzeuge für Automatisierung und Systemadministration, können jedoch fehleranfällig sein, wenn sie nicht sorgfältig geschrieben werden. Hier sind einige bewährte Praktiken, um Ihre Shell-Skripte robuster, wartbarer und benutzerfreundlicher zu gestalten.

## 1. Verwenden Sie die Shebang-Zeile

```bash
#!/bin/bash
```

**Warum es wichtig ist**: Die Shebang-Zeile gibt an, welcher Interpreter das Skript ausführen soll. Fügen Sie sie immer am Anfang ein, um Konsistenz zu gewährleisten, unabhängig davon, wie das Skript aufgerufen wird oder welche Standard-Shell der Benutzer verwendet.

## 2. Skript-Dokumentation einfügen

```bash
# backup-cleanup.sh
#
# Zweck: Bereinigung von Backup-Dateien basierend auf Aufbewahrungsrichtlinien
# Verwendung: ./backup-cleanup.sh [Optionen]
# Autor: Ihr Name
# Datum: 31. Januar 2025
```

**Warum es wichtig ist**: Gute Dokumentation erklärt den Zweck, die Verwendung und die Geschichte des Skripts. Dies hilft anderen (und Ihrem zukünftigen Selbst) zu verstehen, was das Skript tut und wie es richtig verwendet wird.

## 3. Fehlerbehandlung mit `set`-Optionen

```bash
# Sofort beenden, wenn ein Befehl fehlschlägt
set -e
# Nicht gesetzte Variablen als Fehler behandeln
set -u
# Rückgabewert einer Pipeline ist der letzte Befehl, der mit einem Nicht-Null-Status beendet wurde
set -o pipefail
```

**Warum es wichtig ist**: Standardmäßig führt Bash die Ausführung fort, auch wenn Befehle fehlschlagen. Diese Einstellungen lassen Ihre Skripte schnell und deutlich fehlschlagen und verhindern Folgefehler durch stille Fehler.

## 4. Verwenden Sie `trap` für Aufräumarbeiten

```bash
TEMP_FILE=$(mktemp)
trap "rm -f $TEMP_FILE" EXIT
```

**Warum es wichtig ist**: Der `trap`-Befehl stellt sicher, dass temporäre Ressourcen ordnungsgemäß bereinigt werden, wenn das Skript beendet wird, selbst wenn es aufgrund eines Fehlers beendet wird. Dies verhindert, dass temporäre Dateien oder andere Ressourcen zurückbleiben.

## 5. Variablen richtig deklarieren

```bash
# Konstanten (nach Konvention in Großbuchstaben)
declare -r MAX_RETRIES=5

# Arrays
declare -a FILES_TO_PROCESS=()

# Ganzzahlen
declare -i COUNTER=0

# Reguläre Variablen
VERSION="1.0.0"
```

**Warum es wichtig ist**: Die Verwendung von `declare` definiert explizit Variablentypen und -attribute, was Ihren Code wartbarer macht und subtile Fehler verhindert.

## 6. Dateien zeilenweise korrekt verarbeiten

```bash
while IFS= read -r line; do
    echo "Verarbeitung: $line"
done < "$INPUT_FILE"
```

**Warum es wichtig ist**: Dies ist die richtige Methode, um eine Datei zeilenweise in Bash zu lesen. Die Einstellung `IFS=` bewahrt führende/nachfolgende Leerzeichen, und das Flag `-r` verhindert, dass Backslash-Escapes interpretiert werden.

## 7. Verwenden Sie `mktemp` für temporäre Dateien

```bash
TEMP_FILE=$(mktemp)
LOG_FILE=$(mktemp -t logfile.XXXXXX)
```

**Warum es wichtig ist**: Die Verwendung von `mktemp` erstellt temporäre Dateien mit eindeutigen Namen, verhindert Dateinamen-Kollisionen und potenzielle Sicherheitslücken.

## 8. Verwenden Sie Parameterexpansion für Standardwerte

```bash
# Standardwert verwenden, wenn Parameter nicht gesetzt oder leer ist
INPUT_FILE="${1:-default.txt}"

# Standardwert nur verwenden, wenn Parameter nicht gesetzt ist
LOG_LEVEL="${LOG_LEVEL-INFO}"
```

**Warum es wichtig ist**: Parameterexpansion bietet elegante Möglichkeiten, Standardwerte zu handhaben, was Skripte flexibler und benutzerfreundlicher macht.

## 9. Verwenden Sie Regex mit Vorsicht

```bash
if [[ $filename =~ ^backup-([0-9]{4})([0-9]{2})([0-9]{2})\.tar\.gz$ ]]; then
    year="${BASH_REMATCH[1]}"
    month="${BASH_REMATCH[2]}"
    day="${BASH_REMATCH[3]}"
    echo "Backup gefunden vom $year-$month-$day"
fi
```

**Warum es wichtig ist**: Der Operator `=~` mit doppelten Klammern `[[` ermöglicht leistungsstarkes Pattern Matching. Das Array `BASH_REMATCH` enthält die erfassten Gruppen, was das Extrahieren von Teilen eines Strings erleichtert.

## 10. Ausführliche Ausgabe und Protokollierung einbeziehen

```bash
log_info() {
    echo "[INFO] $1"
}

log_error() {
    echo "[ERROR] $1" >&2
}

log_info "Starte Backup-Prozess"
```

**Warum es wichtig ist**: Gute Skripte teilen Benutzern mit, was sie tun, besonders bei Operationen, die nicht rückgängig gemacht werden können. Verschiedene Protokollierungsebenen helfen, zwischen Routineinformationen und kritischen Fehlern zu unterscheiden.

## 11. Befehlserfolg überprüfen

```bash
if ! command -v aws >/dev/null 2>&1; then
    log_error "AWS CLI ist nicht installiert"
    exit 1
fi

if ! cp "$SOURCE" "$DESTINATION"; then
    log_error "Fehler beim Kopieren von $SOURCE nach $DESTINATION"
    exit 1
fi
```

**Warum es wichtig ist**: Überprüfen Sie immer, ob Befehle erfolgreich sind, bevor Sie fortfahren, besonders bevor Sie destruktive Operationen durchführen.

## 12. Setzen Sie Ihre Variablen in Anführungszeichen

```bash
# Gut: Verhindert Worttrennung und Globbing
echo "Verarbeite Datei: $filename"

# Schlecht: Kann fehlschlagen, wenn $filename Leerzeichen oder Sonderzeichen enthält
echo Verarbeite Datei: $filename
```

**Warum es wichtig ist**: Setzen Sie Variablen immer in Anführungszeichen, um Worttrennung und Globbing-Probleme zu vermeiden, besonders wenn die Werte Leerzeichen oder Sonderzeichen enthalten könnten.

## 13. Verwenden Sie Funktionen für wiederverwendbaren Code

```bash
function backup_database() {
    local db_name="$1"
    local output_file="$2"

    log_info "Sichere Datenbank $db_name in $output_file"
    pg_dump "$db_name" > "$output_file"
    return $?
}

# Verwendung
backup_database "myapp" "/tmp/myapp_backup.sql"
```

**Warum es wichtig ist**: Funktionen machen Ihr Skript modular und wiederverwendbar. Die Verwendung von `local`-Variablen verhindert die Verschmutzung des globalen Namensraums.

## 14. Kommandozeilenargumente richtig verarbeiten

```bash
function show_usage() {
    echo "Verwendung: $(basename "$0") [-v] [-h] [-f DATEI]"
    echo "  -v: Ausführliche Ausgabe aktivieren"
    echo "  -h: Diese Hilfemeldung anzeigen"
    echo "  -f DATEI: Eingabedatei angeben"
}

VERBOSE=false
FILE=""

while getopts "vhf:" opt; do
    case ${opt} in
        v ) VERBOSE=true ;;
        h ) show_usage; exit 0 ;;
        f ) FILE=$OPTARG ;;
        * ) show_usage; exit 1 ;;
    esac
done
```

**Warum es wichtig ist**: Der Befehl `getopts` bietet eine standardmäßige Methode zur Verarbeitung von Kommandozeilenoptionen, was Ihre Skripte benutzerfreundlicher macht und Unix-Konventionen entspricht.

## 15. Eingabe frühzeitig validieren

```bash
if [[ ! -f "$INPUT_FILE" ]]; then
    log_error "Eingabedatei existiert nicht: $INPUT_FILE"
    exit 1
fi

if [[ ! $PORT =~ ^[0-9]+$ ]] || [[ $PORT -lt 1 ]] || [[ $PORT -gt 65535 ]]; then
    log_error "Ungültige Portnummer: $PORT"
    exit 1
fi
```

**Warum es wichtig ist**: Die frühzeitige Validierung von Eingaben verhindert Fehler später im Skript und liefert Benutzern aussagekräftige Fehlermeldungen.

## 16. Verwenden Sie aussagekräftige Exit-Codes

```bash
# Exit-Codes definieren
readonly E_SUCCESS=0
readonly E_USAGE=64
readonly E_MISSING_FILE=65
readonly E_PERMISSION=66

if [[ ! -r "$INPUT_FILE" ]]; then
    log_error "Kann Eingabedatei nicht lesen: $INPUT_FILE"
    exit $E_PERMISSION
fi
```

**Warum es wichtig ist**: Aussagekräftige Exit-Codes helfen automatisierten Systemen zu verstehen, warum ein Skript fehlgeschlagen ist, und entsprechende Maßnahmen zu ergreifen.

## 17. Verwenden Sie Shellcheck

Führen Sie Ihre Skripte regelmäßig durch [ShellCheck](https://www.shellcheck.net/), ein statisches Analysetool, das häufige Probleme in Shell-Skripten identifiziert.

**Warum es wichtig ist**: ShellCheck erkennt viele subtile Fehler und schlägt bewährte Praktiken vor, die schwer zu merken sein können.

## 18. Strukturieren Sie Ihr Skript logisch

Organisieren Sie Ihr Skript mit einer klaren Struktur:
1. Shebang und Dokumentation
2. Konstanten und Konfiguration
3. Funktionsdefinitionen
4. Hauptskriptlogik

**Warum es wichtig ist**: Eine logische Struktur macht Skripte leichter zu verstehen, zu debuggen und zu modifizieren.

## Fazit

Bessere Shell-Skripte zu schreiben bedeutet, sie robust, lesbar und wartbar zu machen. Wenn Sie diese Praktiken befolgen, werden Ihre Skripte zuverlässiger und für andere (einschließlich Ihres zukünftigen Selbst) leichter zu verstehen und zu modifizieren sein.