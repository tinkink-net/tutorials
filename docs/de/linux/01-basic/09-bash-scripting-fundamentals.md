# Bash-Scripting-Grundlagen

Shell-Scripting ist ein leistungsstarkes Werkzeug zur Automatisierung von Aufgaben, Verwaltung von Systemen und Erstellung effizienter Workflows. Dieses Tutorial vermittelt Ihnen die Grundlagen des Bash-Scriptings, von der grundlegenden Syntax bis hin zu fortgeschrittenen Techniken.

## Was ist Shell-Scripting?

Ein **Shell-Script** ist eine Textdatei, die eine Sequenz von Befehlen enthält, die die Shell ausführen kann. Shell-Scripts ermöglichen es Ihnen:

- **Wiederholende Aufgaben zu automatisieren** - Reduzierung manueller Arbeit
- **Systemoperationen zu verwalten** - Backup, Überwachung, Bereitstellung
- **Daten zu verarbeiten** - Textmanipulation, Dateioperationen
- **Benutzerdefinierte Tools zu erstellen** - Erstellen von Hilfsprogrammen für Ihren Workflow
- **Komplexe Operationen zu orchestrieren** - Kombination mehrerer Programme

## Erste Schritte

### Auswahl Ihrer Shell

```bash
# Verfügbare Shells überprüfen
cat /etc/shells

# Aktuelle Shell überprüfen
echo $SHELL

# Zu bash wechseln (falls nicht Standard)
bash
```

### Ihr erstes Script erstellen

Erstellen Sie eine Datei namens `hello.sh`:

```bash
#!/bin/bash
# Dies ist ein Kommentar
echo "Hello, World!"
echo "Aktuelles Datum: $(date)"
echo "Aktueller Benutzer: $(whoami)"
echo "Aktuelles Verzeichnis: $(pwd)"
```

### Scripts ausführbar machen

```bash
# Script ausführbar machen
chmod +x hello.sh

# Script ausführen
./hello.sh

# Oder direkt mit bash ausführen
bash hello.sh
```

### Die Shebang-Zeile

```bash
#!/bin/bash        # Am häufigsten - verwendet bash
#!/bin/sh          # POSIX-konforme Shell
#!/usr/bin/env bash # Findet bash im PATH
#!/bin/zsh         # Verwendet zsh-Shell
```

## Variablen und Datentypen

### Variablendeklaration und -verwendung

```bash
#!/bin/bash

# Variablenzuweisung (keine Leerzeichen um =)
name="John Doe"
age=30
is_student=true

# Verwendung von Variablen
echo "Name: $name"
echo "Age: $age"
echo "Is student: $is_student"

# Alternative Syntax
echo "Name: ${name}"
echo "Age: ${age}"
```

### Variablenbereich

```bash
#!/bin/bash

# Globale Variable
global_var="I'm global"

function show_variables() {
    # Lokale Variable
    local local_var="I'm local"

    echo "Inside function:"
    echo "Global: $global_var"
    echo "Local: $local_var"
}

show_variables

echo "Outside function:"
echo "Global: $global_var"
echo "Local: $local_var"  # Dies wird leer sein
```

### Umgebungsvariablen

```bash
#!/bin/bash

# Häufige Umgebungsvariablen
echo "Home directory: $HOME"
echo "Current user: $USER"
echo "PATH: $PATH"
echo "Shell: $SHELL"

# Umgebungsvariablen setzen
export MY_VAR="Custom value"
export PATH="$PATH:/custom/path"

# Prüfen, ob Variable gesetzt ist
if [ -z "$MY_VAR" ]; then
    echo "MY_VAR is not set"
else
    echo "MY_VAR is set to: $MY_VAR"
fi
```

### Spezielle Variablen

```bash
#!/bin/bash

echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
echo "All arguments: $@"
echo "Number of arguments: $#"
echo "Exit status of last command: $?"
echo "Process ID of script: $$"
echo "Process ID of last background command: $!"
```

## Ein- und Ausgabe

### Benutzereingabe lesen

```bash
#!/bin/bash

# Grundlegende Eingabe
echo "Enter your name:"
read name
echo "Hello, $name!"

# Eingabe mit Aufforderung
read -p "Enter your age: " age
echo "You are $age years old"

# Stille Eingabe (für Passwörter)
read -s -p "Enter password: " password
echo -e "\nPassword entered!"

# Eingabe mit Timeout
if read -t 5 -p "Enter something (5 seconds): " input; then
    echo "You entered: $input"
else
    echo -e "\nTimeout reached!"
fi
```

### Kommandozeilenargumente

```bash
#!/bin/bash

# Prüfen, ob Argumente angegeben wurden
if [ $# -eq 0 ]; then
    echo "Usage: $0 <name> [age]"
    exit 1
fi

name=$1
age=${2:-"Unknown"}  # Standardwert, falls nicht angegeben

echo "Name: $name"
echo "Age: $age"

# Durch alle Argumente iterieren
echo "All arguments:"
for arg in "$@"; do
    echo "  - $arg"
done
```

### Ausgabeumleitung

```bash
#!/bin/bash

# Standardausgabeumleitung
echo "This goes to stdout" > output.txt
echo "This appends to file" >> output.txt

# Fehlerumleitung
ls /nonexistent 2> error.log
ls /nonexistent 2>> error.log  # Anhängen

# Umleitung von stdout und stderr
command > output.txt 2>&1
command &> output.txt  # Kurzform

# Ausgabe unterdrücken
command > /dev/null 2>&1
```

## Kontrollstrukturen

### Bedingte Anweisungen

```bash
#!/bin/bash

# if-then-else
number=10

if [ $number -gt 5 ]; then
    echo "Number is greater than 5"
elif [ $number -eq 5 ]; then
    echo "Number is equal to 5"
else
    echo "Number is less than 5"
fi

# String-Vergleiche
name="John"

if [ "$name" = "John" ]; then
    echo "Hello, John!"
elif [ "$name" = "Jane" ]; then
    echo "Hello, Jane!"
else
    echo "Hello, stranger!"
fi
```

### Datei- und Verzeichnistests

```bash
#!/bin/bash

file="test.txt"
directory="test_dir"

# Dateitests
if [ -f "$file" ]; then
    echo "$file is a regular file"
fi

if [ -d "$directory" ]; then
    echo "$directory is a directory"
fi

if [ -r "$file" ]; then
    echo "$file is readable"
fi

if [ -w "$file" ]; then
    echo "$file is writable"
fi

if [ -x "$file" ]; then
    echo "$file is executable"
fi

if [ -e "$file" ]; then
    echo "$file exists"
fi

# Mehrere Bedingungen
if [ -f "$file" ] && [ -r "$file" ]; then
    echo "$file exists and is readable"
fi
```

### Schleifen

#### For-Schleifen

```bash
#!/bin/bash

# Durch Zahlen iterieren
for i in {1..5}; do
    echo "Number: $i"
done

# Durch Array iterieren
fruits=("apple" "banana" "orange")
for fruit in "${fruits[@]}"; do
    echo "Fruit: $fruit"
done

# Durch Dateien iterieren
for file in *.txt; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
    fi
done

# C-Style For-Schleife
for ((i=1; i<=5; i++)); do
    echo "Counter: $i"
done
```

#### While-Schleifen

```bash
#!/bin/bash

# Grundlegende While-Schleife
counter=1
while [ $counter -le 5 ]; do
    echo "Counter: $counter"
    ((counter++))
done

# Datei zeilenweise lesen
while IFS= read -r line; do
    echo "Line: $line"
done < "input.txt"

# Endlosschleife mit break
while true; do
    read -p "Enter 'quit' to exit: " input
    if [ "$input" = "quit" ]; then
        break
    fi
    echo "You entered: $input"
done
```

#### Until-Schleifen

```bash
#!/bin/bash

# Until-Schleife (Gegenteil von while)
counter=1
until [ $counter -gt 5 ]; do
    echo "Counter: $counter"
    ((counter++))
done
```

### Case-Anweisungen

```bash
#!/bin/bash

read -p "Enter a choice (1-3): " choice

case $choice in
    1)
        echo "You chose option 1"
        ;;
    2)
        echo "You chose option 2"
        ;;
    3)
        echo "You chose option 3"
        ;;
    *)
        echo "Invalid choice"
        ;;
esac

# Case mit Mustern
read -p "Enter a file name: " filename

case $filename in
    *.txt)
        echo "Text file"
        ;;
    *.jpg|*.jpeg|*.png)
        echo "Image file"
        ;;
    *.sh)
        echo "Shell script"
        ;;
    *)
        echo "Unknown file type"
        ;;
esac
```

## Funktionen

### Funktionsdefinition und -verwendung

```bash
#!/bin/bash

# Funktionsdefinition
greet() {
    echo "Hello, $1!"
}

# Funktion mit mehreren Parametern
add_numbers() {
    local num1=$1
    local num2=$2
    local sum=$((num1 + num2))
    echo $sum
}

# Funktion mit Rückgabewert
is_even() {
    local number=$1
    if [ $((number % 2)) -eq 0 ]; then
        return 0  # Wahr
    else
        return 1  # Falsch
    fi
}

# Funktionen verwenden
greet "John"
result=$(add_numbers 5 3)
echo "Sum: $result"

if is_even 4; then
    echo "4 is even"
fi
```

### Erweiterte Funktionsmerkmale

```bash
#!/bin/bash

# Funktion mit Standardparametern
create_user() {
    local username=$1
    local home_dir=${2:-"/home/$username"}
    local shell=${3:-"/bin/bash"}

    echo "Creating user: $username"
    echo "Home directory: $home_dir"
    echo "Shell: $shell"
}

# Funktion mit variablen Argumenten
print_all() {
    echo "Number of arguments: $#"
    for arg in "$@"; do
        echo "  - $arg"
    done
}

# Rekursive Funktion
factorial() {
    local n=$1
    if [ $n -le 1 ]; then
        echo 1
    else
        local prev=$(factorial $((n - 1)))
        echo $((n * prev))
    fi
}

# Verwendung
create_user "john"
create_user "jane" "/custom/home"
print_all "arg1" "arg2" "arg3"
echo "Factorial of 5: $(factorial 5)"
```

## Arrays

### Array-Deklaration und -Verwendung

```bash
#!/bin/bash

# Array-Deklaration
fruits=("apple" "banana" "orange")
numbers=(1 2 3 4 5)

# Alternative Deklaration
declare -a colors
colors[0]="red"
colors[1]="green"
colors[2]="blue"

# Zugriff auf Array-Elemente
echo "First fruit: ${fruits[0]}"
echo "Second fruit: ${fruits[1]}"

# Alle Elemente
echo "All fruits: ${fruits[@]}"
echo "All numbers: ${numbers[*]}"

# Array-Länge
echo "Number of fruits: ${#fruits[@]}"

# Array-Indizes
echo "Fruit indices: ${!fruits[@]}"
```

### Array-Operationen

```bash
#!/bin/bash

# Elemente hinzufügen
fruits=("apple" "banana")
fruits+=("orange")
fruits[3]="grape"

# Elemente entfernen
unset fruits[1]  # Entfernt banana

# Arrays slicen
numbers=(1 2 3 4 5 6 7 8 9 10)
echo "Elements 2-5: ${numbers[@]:2:4}"

# Durch Arrays iterieren
for fruit in "${fruits[@]}"; do
    if [ -n "$fruit" ]; then  # Prüfen, ob nicht leer
        echo "Fruit: $fruit"
    fi
done

# Schleife mit Indizes
for i in "${!fruits[@]}"; do
    echo "Index $i: ${fruits[i]}"
done
```

### Assoziative Arrays

```bash
#!/bin/bash

# Assoziatives Array deklarieren
declare -A person
person[name]="John Doe"
person[age]=30
person[city]="New York"

# Alternative Syntax
declare -A colors=(
    [red]="#FF0000"
    [green]="#00FF00"
    [blue]="#0000FF"
)

# Auf Werte zugreifen
echo "Name: ${person[name]}"
echo "Age: ${person[age]}"

# Alle Schlüssel und Werte
echo "All keys: ${!person[@]}"
echo "All values: ${person[@]}"

# Durch assoziatives Array iterieren
for key in "${!person[@]}"; do
    echo "$key: ${person[$key]}"
done
```

## String-Manipulation

### String-Operationen

```bash
#!/bin/bash

text="Hello, World!"
filename="document.txt"

# String-Länge
echo "Length: ${#text}"

# Teilstring-Extraktion
echo "Substring: ${text:0:5}"    # "Hello"
echo "Substring: ${text:7}"      # "World!"

# String-Ersetzung
echo "${text/World/Universe}"    # Ersetzt erstes Vorkommen
echo "${text//l/L}"             # Ersetzt alle Vorkommen

# Groß-/Kleinschreibung
echo "${text,,}"                # Kleinbuchstaben
echo "${text^^}"                # Großbuchstaben
echo "${text^}"                 # Ersten Buchstaben groß schreiben

# Musterabgleich
echo "${filename%.txt}"         # Entfernt kürzeste Übereinstimmung vom Ende
echo "${filename%.*}"           # Entfernt Erweiterung
echo "${filename#*.}"           # Holt Erweiterung
```

### String-Validierung

```bash
#!/bin/bash

validate_email() {
    local email=$1
    local pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"

    if [[ $email =~ $pattern ]]; then
        return 0  # Gültig
    else
        return 1  # Ungültig
    fi
}

validate_phone() {
    local phone=$1
    local pattern="^[0-9]{3}-[0-9]{3}-[0-9]{4}$"

    if [[ $phone =~ $pattern ]]; then
        return 0
    else
        return 1
    fi
}

# Verwendung
email="user@example.com"
if validate_email "$email"; then
    echo "Valid email: $email"
else
    echo "Invalid email: $email"
fi
```

## Dateioperationen

### Datei- und Verzeichnismanipulation

```bash
#!/bin/bash

# Verzeichnisse erstellen
mkdir -p "project/src/components"
mkdir -p "project/tests"

# Dateien erstellen
touch "project/README.md"
touch "project/src/main.js"

# Dateien und Verzeichnisse kopieren
cp "source.txt" "destination.txt"
cp -r "source_dir" "destination_dir"

# Dateien verschieben/umbenennen
mv "old_name.txt" "new_name.txt"
mv "file.txt" "directory/"

# Dateien und Verzeichnisse entfernen
rm "file.txt"
rm -r "directory"
rm -rf "directory"  # Erzwungenes Entfernen

# Dateieigenschaften prüfen
file="test.txt"
if [ -f "$file" ]; then
    echo "File size: $(stat -c%s "$file") bytes"
    echo "Last modified: $(stat -c%y "$file")"
    echo "Permissions: $(stat -c%A "$file")"
fi
```

### Dateiverarbeitung

```bash
#!/bin/bash

# Datei zeilenweise lesen
process_file() {
    local filename=$1
    local line_number=1

    while IFS= read -r line; do
        echo "Line $line_number: $line"
        ((line_number++))
    done < "$filename"
}

# Zeilen, Wörter und Zeichen zählen
count_file_stats() {
    local filename=$1

    if [ -f "$filename" ]; then
        local lines=$(wc -l < "$filename")
        local words=$(wc -w < "$filename")
        local chars=$(wc -c < "$filename")

        echo "File: $filename"
        echo "Lines: $lines"
        echo "Words: $words"
        echo "Characters: $chars"
    fi
}

# Suchen und Ersetzen in Datei
search_replace() {
    local filename=$1
    local search=$2
    local replace=$3

    if [ -f "$filename" ]; then
        sed -i "s/$search/$replace/g" "$filename"
        echo "Replaced '$search' with '$replace' in $filename"
    fi
}
```

## Fehlerbehandlung

### Exit-Codes und Fehlerbehandlung

```bash
#!/bin/bash

# Bei jedem Fehler beenden
set -e

# Bei undefinierter Variable beenden
set -u

# Befehle bei Ausführung anzeigen
set -x

# Benutzerdefinierte Fehlerbehandlung
handle_error() {
    local exit_code=$1
    local line_number=$2
    echo "Error: Command failed with exit code $exit_code at line $line_number"
    exit $exit_code
}

# Fehler-Trap setzen
trap 'handle_error $? $LINENO' ERR

# Funktion mit Fehlerbehandlung
safe_copy() {
    local source=$1
    local destination=$2

    if [ ! -f "$source" ]; then
        echo "Error: Source file '$source' does not exist"
        return 1
    fi

    if ! cp "$source" "$destination"; then
        echo "Error: Failed to copy '$source' to '$destination'"
        return 1
    fi

    echo "Successfully copied '$source' to '$destination'"
    return 0
}
```

### Logging und Debugging

```bash
#!/bin/bash

# Logging-Funktion
log() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    echo "[$timestamp] [$level] $message" | tee -a "script.log"
}

# Debug-Funktion
debug() {
    if [ "${DEBUG:-0}" = "1" ]; then
        log "DEBUG" "$*"
    fi
}

# Verwendung
log "INFO" "Script started"
debug "This is a debug message"
log "ERROR" "Something went wrong"
```

## Praktische Beispiele

### Systeminformations-Script

```bash
#!/bin/bash

# Script zum Sammeln von Systeminformationen
system_info() {
    echo "=== System Information ==="
    echo "Hostname: $(hostname)"
    echo "OS: $(uname -o)"
    echo "Kernel: $(uname -r)"
    echo "Architecture: $(uname -m)"
    echo "Uptime: $(uptime -p)"
    echo "Load Average: $(uptime | awk -F'load average:' '{print $2}')"
    echo

    echo "=== Memory Usage ==="
    free -h
    echo

    echo "=== Disk Usage ==="
    df -h
    echo

    echo "=== Network Interfaces ==="
    ip addr show | grep -E '^[0-9]+:|inet'
}

system_info
```

### Backup-Script

```bash
#!/bin/bash

# Backup-Script mit Rotation
BACKUP_SOURCE="/home/user/documents"
BACKUP_DEST="/backup"
BACKUP_NAME="documents_backup_$(date +%Y%m%d_%H%M%S).tar.gz"
KEEP_DAYS=7

create_backup() {
    echo "Creating backup of $BACKUP_SOURCE..."

    if [ ! -d "$BACKUP_SOURCE" ]; then
        echo "Error: Source directory does not exist"
        exit 1
    fi

    mkdir -p "$BACKUP_DEST"

    if tar -czf "$BACKUP_DEST/$BACKUP_NAME" -C "$(dirname "$BACKUP_SOURCE")" "$(basename "$BACKUP_SOURCE")"; then
        echo "Backup created: $BACKUP_DEST/$BACKUP_NAME"
    else
        echo "Error: Backup failed"
        exit 1
    fi
}

cleanup_old_backups() {
    echo "Cleaning up backups older than $KEEP_DAYS days..."
    find "$BACKUP_DEST" -name "documents_backup_*.tar.gz" -mtime +$KEEP_DAYS -delete
}

# Hauptausführung
create_backup
cleanup_old_backups
echo "Backup completed successfully"
```

### Service-Überwachungs-Script

```bash
#!/bin/bash

# Service-Überwachungs-Script
SERVICES=("nginx" "mysql" "ssh")
EMAIL="admin@example.com"

check_service() {
    local service=$1

    if systemctl is-active --quiet "$service"; then
        return 0  # Service läuft
    else
        return 1  # Service läuft nicht
    fi
}

restart_service() {
    local service=$1

    echo "Attempting to restart $service..."
    if systemctl restart "$service"; then
        echo "$service restarted successfully"
        return 0
    else
        echo "Failed to restart $service"
        return 1
    fi
}

send_alert() {
    local message=$1
    echo "$message" | mail -s "Service Alert" "$EMAIL"
}

# Haupt-Überwachungsschleife
for service in "${SERVICES[@]}"; do
    if ! check_service "$service"; then
        echo "Warning: $service is not running"

        if restart_service "$service"; then
            send_alert "$service was down but has been restarted"
        else
            send_alert "Critical: $service is down and could not be restarted"
        fi
    else
        echo "$service is running normally"
    fi
done
```

## Best Practices

### 1. Script-Struktur

```bash
#!/bin/bash

# Script-Header mit Beschreibung
# Zweck: Dieses Script macht etwas Nützliches
# Autor: Ihr Name
# Datum: 2024-01-01
# Version: 1.0

# Bei Fehlern beenden
set -euo pipefail

# Konfiguration
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly SCRIPT_NAME="$(basename "$0")"
readonly LOG_FILE="/var/log/${SCRIPT_NAME}.log"

# Globale Variablen
declare -g DEBUG=0
declare -g VERBOSE=0

# Funktionen
usage() {
    cat << EOF
Usage: $SCRIPT_NAME [OPTIONS]
Options:
    -h, --help      Show this help message
    -v, --verbose   Enable verbose output
    -d, --debug     Enable debug mode
EOF
}

main() {
    # Kommandozeilenargumente parsen
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                usage
                exit 0
                ;;
            -v|--verbose)
                VERBOSE=1
                shift
                ;;
            -d|--debug)
                DEBUG=1
                shift
                ;;
            *)
                echo "Unknown option: $1"
                usage
                exit 1
                ;;
        esac
    done

    # Hauptlogik des Scripts hier
    echo "Script execution completed"
}

# Hauptfunktion ausführen
main "$@"
```

### 2. Fehlerbehandlung

```bash
#!/bin/bash

# Robuste Fehlerbehandlung
set -euo pipefail

# Fehlerbehandler
error_handler() {
    local exit_code=$?
    local line_number=$1
    echo "Error: Command failed with exit code $exit_code at line $line_number"
    cleanup
    exit $exit_code
}

# Aufräumfunktion
cleanup() {
    echo "Performing cleanup..."
    # Temporäre Dateien entfernen, etc.
}

# Traps setzen
trap 'error_handler $LINENO' ERR
trap cleanup EXIT

# Ihre Script-Logik hier
```

### 3. Eingabevalidierung

```bash
#!/bin/bash

validate_input() {
    local input=$1
    local type=$2

    case $type in
        "email")
            if [[ ! $input =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]]; then
                return 1
            fi
            ;;
        "number")
            if [[ ! $input =~ ^[0-9]+$ ]]; then
                return 1
            fi
            ;;
        "file")
            if [[ ! -f $input ]]; then
                return 1
            fi
            ;;
        *)
            return 1
            ;;
    esac

    return 0
}

# Verwendung
read -p "Enter email: " email
if validate_input "$email" "email"; then
    echo "Valid email"
else
    echo "Invalid email"
    exit 1
fi
```

## Fazit

Bash-Scripting ist ein leistungsstarkes Werkzeug für Automatisierung und Systemadministration. Wichtige Erkenntnisse:

1. **Einfach beginnen** - Beginnen Sie mit einfachen Scripts und fügen Sie schrittweise Komplexität hinzu
2. **Funktionen verwenden** - Organisieren Sie Code in wiederverwendbare Funktionen
3. **Fehler behandeln** - Implementieren Sie ordnungsgemäße Fehlerbehandlung und Logging
4. **Eingaben validieren** - Validieren Sie immer Benutzereingaben und Argumente
5. **Konventionen befolgen** - Verwenden Sie konsistente Benennung und Struktur
6. **Gründlich testen** - Testen Sie Scripts mit verschiedenen Eingaben und Szenarien
7. **Code dokumentieren** - Fügen Sie Kommentare und Nutzungshinweise hinzu

Mit diesen Grundlagen können Sie effiziente, wartbare Bash-Scripts erstellen, die Aufgaben automatisieren und Ihre Produktivität verbessern.

## Nächste Schritte

Nach dem Beherrschen der Bash-Scripting-Grundlagen erkunden Sie:

1. **Fortgeschrittene Textverarbeitung** - sed, awk, grep-Muster
2. **Systemadministration** - Prozessverwaltung, Cron-Jobs
3. **Netzwerkoperationen** - API-Aufrufe, Dateiübertragungen
4. **Datenbankoperationen** - MySQL, PostgreSQL-Scripting
5. **CI/CD-Integration** - Build- und Deployment-Scripts
6. **Sicherheitspraktiken** - Sichere Scripting-Techniken

Shell-Scripting ist eine wesentliche Fähigkeit für Entwickler und Systemadministratoren und bildet die Grundlage für Automatisierung und effizientes Systemmanagement!