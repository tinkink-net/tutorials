# Erstellen Ihres ersten Git-Repositorys

## Einführung

Nachdem Sie die Git-Grundlagen und Terminologie verstanden haben, ist es an der Zeit, Ihr erstes Git-Repository zu erstellen. Dieses Tutorial führt Sie durch den Prozess der Initialisierung eines neuen Git-Repositorys, das Verständnis der Verzeichnisstruktur und die Einrichtung Ihres ersten Projekts für die Versionskontrolle.

Am Ende dieses Tutorials werden Sie ein voll funktionsfähiges Git-Repository haben und verstehen, wie Sie mit der Verfolgung Ihrer Projektdateien beginnen können.

## Voraussetzungen

Bevor Sie mit diesem Tutorial beginnen, stellen Sie sicher, dass Sie Folgendes haben:
- Git auf Ihrem System installiert ([Git-Installation und Einrichtung](./git-installation-and-setup.md))
- Grundlegendes Verständnis von Git-Konzepten ([Git-Grundlagen und Terminologie verstehen](./understanding-git-basics-and-terminology.md))
- Einen Texteditor oder eine IDE Ihrer Wahl
- Grundlegende Kenntnisse der Befehlszeile

## Zwei Möglichkeiten, ein Git-Repository zu erstellen

Es gibt zwei Hauptmöglichkeiten, ein Git-Repository zu erstellen:

1. **Ein neues Repository initialisieren** in einem bestehenden Verzeichnis
2. **Ein bestehendes Repository klonen** von einem entfernten Standort

Dieses Tutorial konzentriert sich auf die erste Methode. Das Klonen wird in späteren Tutorials über Remote-Repositorys behandelt.

## Methode 1: Ein neues Repository initialisieren

### Schritt 1: Erstellen eines Projektverzeichnisses

Erstellen Sie zunächst ein neues Verzeichnis für Ihr Projekt:

```bash
# Erstellen eines neuen Verzeichnisses
mkdir my-first-git-project

# In das Verzeichnis navigieren
cd my-first-git-project
```

### Schritt 2: Git-Repository initialisieren

Initialisieren Sie Git in Ihrem Projektverzeichnis:

```bash
git init
```

Sie sollten eine Ausgabe ähnlich der folgenden sehen:
```
Initialized empty Git repository in /path/to/my-first-git-project/.git/
```

**Was ist gerade passiert?**
- Git hat ein verstecktes `.git`-Verzeichnis in Ihrem Projektordner erstellt
- Dieses `.git`-Verzeichnis enthält alle Git-Metadaten und die Objektdatenbank
- Ihr Verzeichnis ist jetzt ein Git-Repository (aber leer)

### Schritt 3: Repository-Erstellung überprüfen

Überprüfen Sie, ob Git in Ihrem Verzeichnis funktioniert:

```bash
git status
```

Sie sollten Folgendes sehen:
```
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

Dies bestätigt, dass:
- Sie sich auf dem `main`-Branch befinden
- Noch keine Commits gemacht wurden
- Es keine Dateien gibt, die verfolgt werden

## Verstehen des .git-Verzeichnisses

Das `.git`-Verzeichnis enthält alle Git-Repository-Daten. Lassen Sie uns seine Struktur erkunden:

```bash
ls -la .git/
```

Sie werden Verzeichnisse und Dateien wie diese sehen:
- `config` - Repository-Konfiguration
- `description` - Repository-Beschreibung (verwendet von GitWeb)
- `HEAD` - Zeigt auf den aktuellen Branch
- `hooks/` - Verzeichnis für Git-Hooks (Skripte)
- `info/` - Zusätzliche Repository-Informationen
- `objects/` - Git-Objektdatenbank
- `refs/` - Referenzen (Branches, Tags)

**Wichtig**: Bearbeiten Sie niemals manuell Dateien im `.git`-Verzeichnis, es sei denn, Sie wissen genau, was Sie tun!

## Erstellen Ihrer ersten Dateien

### Schritt 1: Erstellen einer README-Datei

Erstellen Sie eine README-Datei für Ihr Projekt:

```bash
echo "# My First Git Project" > README.md
```

Oder erstellen Sie sie mit Ihrem Texteditor:

```markdown
# My First Git Project

This is my first project using Git version control.

## Features

- Learning Git basics
- Understanding version control
- Building good development habits

## Getting Started

This project demonstrates basic Git workflow and commands.
```

### Schritt 2: Erstellen zusätzlicher Dateien

Lassen Sie uns einige weitere Dateien erstellen, um unser Projekt interessanter zu gestalten:

```bash
# Erstellen eines einfachen Python-Skripts
cat > hello.py << 'EOF'
#!/usr/bin/env python3

def greet(name):
    """Return a greeting message."""
    return f"Hello, {name}!"

if __name__ == "__main__":
    print(greet("World"))
EOF

# Erstellen einer einfachen Textdatei
echo "This is a sample text file for Git practice." > sample.txt

# Erstellen einer Projektkonfigurationsdatei
cat > config.json << 'EOF'
{
  "project": "my-first-git-project",
  "version": "1.0.0",
  "author": "Your Name",
  "description": "Learning Git version control"
}
EOF
```

### Schritt 3: Repository-Status überprüfen

Überprüfen Sie nun, was Git sieht:

```bash
git status
```

Sie sollten Folgendes sehen:
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	README.md
	config.json
	hello.py
	sample.txt

nothing added to commit but untracked files present (use "git add" to track)
```

**Die Ausgabe verstehen:**
- `Untracked files` - Dateien, die Git derzeit nicht verfolgt
- Git schlägt vor, `git add` zu verwenden, um diese Dateien zu verfolgen

## Dateistatus in Git

Git kategorisiert Dateien in verschiedene Zustände:

### 1. Unverfolgt (Untracked)
- Dateien, die in Ihrem Arbeitsverzeichnis existieren, aber nicht von Git verfolgt werden
- Neue Dateien fallen in diese Kategorie

### 2. Verfolgt (Tracked)
Dateien, die Git kennt, können sein:
- **Unverändert (Unmodified)** - Keine Änderungen seit dem letzten Commit
- **Geändert (Modified)** - Geändert, aber nicht gestaged
- **Gestaged (Staged)** - Änderungen für den nächsten Commit markiert

## Grundlegende Git-Konfiguration (Optional)

Bevor Sie Commits erstellen, möchten Sie vielleicht Git mit Ihrer Identität konfigurieren:

```bash
# Setzen Sie Ihren Namen und Ihre E-Mail (falls nicht global eingestellt)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Aktuelle Konfiguration anzeigen
git config --list
```

## Repository-spezifische Konfiguration

Sie können auch eine spezifische Konfiguration für dieses Repository festlegen:

```bash
# Repository-spezifische Konfiguration festlegen
git config user.name "Project Specific Name"
git config user.email "project@example.com"

# Repository-Konfiguration anzeigen
git config --local --list
```

## Erstellen einer .gitignore-Datei

Erstellen Sie eine `.gitignore`-Datei, um Dateien anzugeben, die Git ignorieren soll:

```bash
cat > .gitignore << 'EOF'
# Ignore compiled Python files
*.pyc
__pycache__/

# Ignore temporary files
*.tmp
*.temp

# Ignore log files
*.log

# Ignore IDE files
.vscode/
.idea/
*.swp
*.swo

# Ignore OS-specific files
.DS_Store
Thumbs.db
EOF
```

### Warum .gitignore verwenden?
- Verhindert, dass temporäre Dateien verfolgt werden
- Hält das Repository sauber
- Reduziert Störungen in `git status`
- Verhindert versehentliche Commits sensibler Daten

## Verstehen der Git-Repository-Struktur

Ihr Projekt hat jetzt diese Struktur:

```
my-first-git-project/
├── .git/                 # Git-Repository-Daten (versteckt)
├── .gitignore           # Zu ignorierende Dateien
├── README.md            # Projektdokumentation
├── config.json          # Konfigurationsdatei
├── hello.py             # Python-Skript
└── sample.txt           # Beispiel-Textdatei
```

## Repository-Status erneut überprüfen

Sehen wir uns an, wie unser Repository jetzt aussieht:

```bash
git status
```

Sie sollten Folgendes sehen:
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	README.md
	config.json
	hello.py
	sample.txt

nothing added to commit but untracked files present (use "git add" to track)
```

## Best Practices für die Repository-Erstellung

### 1. Früh initialisieren
Beginnen Sie mit Git von Anfang an bei Ihrem Projekt, nicht erst nachdem Sie bereits viel Code geschrieben haben.

### 2. Erstellen Sie eine gute README
Fügen Sie immer eine README-Datei hinzu, die erklärt:
- Was das Projekt tut
- Wie man es installiert/ausführt
- Wie man dazu beitragen kann

### 3. Verwenden Sie .gitignore von Anfang an
Richten Sie `.gitignore` früh ein, um zu vermeiden, dass unnötige Dateien verfolgt werden.

### 4. Wählen Sie aussagekräftige Verzeichnisnamen
Verwenden Sie beschreibende Namen für Ihre Projektverzeichnisse.

### 5. Halten Sie das Repository-Root sauber
Überfüllen Sie das Root-Verzeichnis nicht mit zu vielen Dateien.

## Häufige Fehler, die zu vermeiden sind

### 1. Initialisieren Sie Git nicht in Ihrem Home-Verzeichnis
```bash
# TUN SIE DAS NICHT
cd ~
git init
```

### 2. Löschen Sie nicht das .git-Verzeichnis
Das Löschen von `.git` zerstört die gesamte Git-Historie.

### 3. Initialisieren Sie Git nicht innerhalb eines anderen Git-Repositorys
Dies kann zu Verwirrung und Konflikten führen.

### 4. Verfolgen Sie keine großen Binärdateien
Verwenden Sie stattdessen Git LFS für große Dateien.

## Methode 2: Mit Dateien initialisieren

Wenn Sie bereits Dateien in einem Verzeichnis haben, können Sie Git dort initialisieren:

```bash
# Zu einem bestehenden Projekt navigieren
cd existing-project

# Git initialisieren
git init

# Dateien sind jetzt unverfolgt, bereit zum Hinzufügen
git status
```

## Fehlerbehebung bei häufigen Problemen

### Problem: "Not a git repository"
**Lösung**: Stellen Sie sicher, dass Sie sich im richtigen Verzeichnis befinden und `git init` ausgeführt haben.

### Problem: Permission Denied
**Lösung**: Überprüfen Sie die Dateiberechtigungen und stellen Sie sicher, dass Sie Schreibzugriff auf das Verzeichnis haben.

### Problem: Repository Already Exists
**Lösung**: Wenn Sie "Reinitialized existing Git repository" sehen, hat Git ein bestehendes `.git`-Verzeichnis erkannt.

## Zusammenfassung

Sie haben erfolgreich Ihr erstes Git-Repository erstellt! Hier ist, was Sie erreicht haben:

1. **Projektverzeichnis erstellt** und Git initialisiert
2. **Die .git-Verzeichnisstruktur** und ihren Zweck verstanden
3. **Projektdateien erstellt** einschließlich README, Code und Konfiguration
4. **.gitignore eingerichtet**, um unnötige Dateien auszuschließen
5. **Über Dateizustände in Git gelernt** (verfolgt vs. unverfolgt)
6. **Git konfiguriert** für Ihr Repository

### Verwendete Schlüsselbefehle:
- `git init` - Ein neues Repository initialisieren
- `git status` - Repository-Status überprüfen
- `git config` - Git-Einstellungen konfigurieren

### Aktueller Repository-Status:
- ✅ Repository initialisiert
- ✅ Dateien erstellt
- ✅ .gitignore konfiguriert
- ⏳ Dateien sind unverfolgt (bereit für Staging)

## Nächste Schritte

Jetzt, da Sie ein Repository mit Dateien haben, sind Sie bereit, den grundlegenden Git-Workflow zu erlernen:

1. **Dateien zur Staging-Area hinzufügen** (git add)
2. **Änderungen committen** (git commit)
3. **Zum Remote-Repository pushen** (git push)

Fahren Sie fort mit: [Grundlegender Git-Workflow: Add, Commit, Push](./basic-git-workflow-add-commit-push.md)

## Verwandte Ressourcen

- [Git-Grundlagen und Terminologie verstehen](./understanding-git-basics-and-terminology.md)
- [Git-Installation und Einrichtung](./git-installation-and-setup.md)
- [Git mit verschiedenen Konfigurationen in verschiedenen Projekten](./git-using-different-config-in-different-projects.md)
- [Offizielles Git-Tutorial](https://git-scm.com/docs/gittutorial)
- [Pro Git Buch - Erste Schritte](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)