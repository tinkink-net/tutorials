# Grundlegender Git-Workflow: Add, Commit, Push

## Einführung

Nachdem Sie Ihr erstes Git-Repository erstellt haben und die grundlegenden Konzepte verstehen, ist es an der Zeit, den fundamentalen Git-Workflow zu erlernen. Dieser Workflow bildet das Rückgrat der täglichen Git-Nutzung und besteht aus drei Hauptschritten: **Add**, **Commit** und **Push**.

Dieses Tutorial führt Sie durch diese wesentlichen Operationen und hilft Ihnen zu verstehen, wie Sie Änderungen verfolgen, Snapshots Ihrer Arbeit speichern und Ihren Code mit anderen teilen können.

## Voraussetzungen

Bevor Sie mit diesem Tutorial beginnen, stellen Sie sicher, dass Sie:
- Ein Git-Repository erstellt haben ([Creating Your First Git Repository](./creating-your-first-git-repository.md))
- Grundlegendes Verständnis von Git-Konzepten haben ([Understanding Git Basics and Terminology](./understanding-git-basics-and-terminology.md))
- Einige Dateien in Ihrem Repository haben, mit denen Sie arbeiten können

## Der grundlegende Git-Workflow

Der Standard-Git-Workflow folgt diesen Schritten:

```
1. Dateien im Arbeitsverzeichnis ändern
2. Änderungen stagen (git add)
3. Änderungen committen (git commit)
4. In das Remote-Repository pushen (git push)
```

Lassen Sie uns jeden Schritt im Detail betrachten.

## Schritt 1: Aktuellen Status verstehen

Bevor wir Änderungen vornehmen, prüfen wir den aktuellen Status unseres Repositories:

```bash
git status
```

Sie sollten etwas wie folgt sehen:
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

Dies zeigt:
- Aktueller Branch: `main`
- Noch keine Commits
- Mehrere nicht verfolgte Dateien

## Schritt 2: Dateien zur Staging-Area hinzufügen (git add)

Der Befehl `git add` verschiebt Dateien vom Arbeitsverzeichnis in die Staging-Area. Hier bereiten Sie Ihren nächsten Commit vor.

### Einzelne Dateien hinzufügen

Fügen Sie Dateien einzeln hinzu:

```bash
# Die README-Datei hinzufügen
git add README.md

# Status prüfen
git status
```

Sie sollten sehen:
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	config.json
	hello.py
	sample.txt
```

**Beachten Sie den Unterschied:**
- `README.md` ist jetzt unter "Changes to be committed" (gestaged)
- Andere Dateien bleiben "Untracked"

### Mehrere Dateien hinzufügen

Fügen Sie mehrere Dateien auf einmal hinzu:

```bash
# Mehrere spezifische Dateien hinzufügen
git add hello.py config.json

# Oder alle Dateien im aktuellen Verzeichnis hinzufügen
git add .

# Status prüfen
git status
```

Nach dem Hinzufügen aller Dateien:
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   .gitignore
	new file:   README.md
	new file:   config.json
	new file:   hello.py
	new file:   sample.txt
```

### Häufige git add Muster

```bash
# Alle Dateien hinzufügen
git add .

# Alle Dateien im aktuellen Verzeichnis und Unterverzeichnissen hinzufügen
git add -A

# Nur geänderte Dateien hinzufügen (keine neuen Dateien)
git add -u

# Dateien interaktiv hinzufügen
git add -i

# Bestimmte Dateitypen hinzufügen
git add *.py
git add *.md
```

### Die Staging-Area verstehen

Die Staging-Area ermöglicht es Ihnen:
- **Präzise Commits zu erstellen** - Wählen Sie genau aus, was in jeden Commit aufgenommen wird
- **Änderungen zu überprüfen** - Sehen Sie, was committet wird, bevor Sie committen
- **Änderungen aufzuteilen** - Committen Sie zusammengehörige Änderungen separat

## Schritt 3: Ihren ersten Commit erstellen (git commit)

Ein Commit erstellt einen Snapshot Ihrer gestagten Änderungen. Jeder Commit sollte eine logische Arbeitseinheit darstellen.

### Grundlegender Commit-Befehl

```bash
git commit -m "Initial commit: Add project files"
```

Sie sollten eine Ausgabe wie diese sehen:
```
[main (root-commit) a1b2c3d] Initial commit: Add project files
 5 files changed, 23 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
 create mode 100644 config.json
 create mode 100755 hello.py
 create mode 100644 sample.txt
```

**Die Ausgabe verstehen:**
- `main` - Aktueller Branch
- `root-commit` - Dies ist der erste Commit
- `a1b2c3d` - Kurzer Commit-Hash
- `5 files changed, 23 insertions(+)` - Zusammenfassung der Änderungen

### Best Practices für Commit-Nachrichten

Gute Commit-Nachrichten sind entscheidend für die Projektwartung:

#### Struktur
```
Kurze Zusammenfassung (50 Zeichen oder weniger)

Ausführlichere Erklärung, falls nötig. Bei 72 Zeichen umbrechen.
Erklären Sie was und warum, nicht wie.

- Verwenden Sie Aufzählungspunkte für mehrere Änderungen
- Referenzieren Sie Issue-Nummern, falls zutreffend
```

#### Beispiele für gute Commit-Nachrichten
```bash
# Gut - Klar und präzise
git commit -m "Add user authentication system"

# Gut - Erklärt das Warum
git commit -m "Fix login bug that prevented password reset"

# Gut - Mehrzeilige Commit-Nachricht
git commit -m "Implement user profile editing

- Add form validation
- Update user model
- Add profile image upload
- Fix styling issues on mobile"
```

#### Beispiele für schlechte Commit-Nachrichten
```bash
# Schlecht - Zu vage
git commit -m "fix stuff"

# Schlecht - Nicht beschreibend
git commit -m "update"

# Schlecht - Zu lang für eine Zusammenfassung
git commit -m "This commit adds the new user authentication system that allows users to log in and register accounts with email validation and password reset functionality"
```

### Alternative Commit-Methoden

#### Verwendung des Standard-Editors
```bash
# Öffnet Ihren Standard-Editor für die Commit-Nachricht
git commit
```

#### Alle Änderungen committen
```bash
# Staged und committet alle verfolgten Dateien
git commit -a -m "Update all tracked files"
```

## Schritt 4: Commit-Verlauf anzeigen

Nach dem Erstellen von Commits können Sie den Verlauf Ihres Repositories anzeigen:

```bash
# Commit-Verlauf anzeigen
git log
```

Ausgabe:
```
commit a1b2c3d4e5f6789... (HEAD -> main)
Author: Your Name <your.email@example.com>
Date:   Wed Jul 9 10:30:00 2025 +0000

    Initial commit: Add project files
```

### Nützliche git log Optionen

```bash
# Kompaktes einzeiliges Format
git log --oneline

# Letzte 3 Commits anzeigen
git log -3

# Commits mit Dateiänderungen anzeigen
git log --stat

# Commits mit tatsächlichen Änderungen anzeigen
git log -p

# Grafische Darstellung
git log --graph --oneline
```

## Weitere Änderungen vornehmen

Lassen Sie uns den Workflow mit einigen Änderungen üben:

### Schritt 1: Eine Datei ändern

Bearbeiten Sie die README.md-Datei:

```bash
echo "

## Recent Updates

- Added basic project structure
- Created initial configuration
- Set up Git repository" >> README.md
```

### Schritt 2: Status prüfen

```bash
git status
```

Sie sollten sehen:
```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   README.md

no changes added to commit (use "git add" and commit)
```

### Schritt 3: Änderungen anzeigen

Sehen Sie, was sich geändert hat:

```bash
git diff
```

Dies zeigt die Unterschiede zwischen Ihrem Arbeitsverzeichnis und dem letzten Commit.

### Schritt 4: Stagen und Committen

```bash
# Änderungen stagen
git add README.md

# Änderungen committen
git commit -m "Update README with project status"
```

## Dateizustände verstehen

Dateien in Git durchlaufen verschiedene Zustände:

```
Untracked → Staged → Committed
    ↓         ↓         ↓
  git add → git commit → git push
```

### Beispiele für Dateistatus

```bash
# Detaillierten Status prüfen
git status

# Kurzen Status anzeigen
git status -s
```

Symbole für kurzen Status:
- `??` - Nicht verfolgte Datei
- `A` - Hinzugefügt (gestaged)
- `M` - Geändert
- `D` - Gelöscht
- `R` - Umbenannt

## Schritt 5: Ein Remote-Repository einrichten

Um Ihre Änderungen zu pushen, benötigen Sie ein Remote-Repository. Lassen Sie uns ein Remote einrichten:

### Verwendung von GitHub (Beispiel)

1. Erstellen Sie ein neues Repository auf GitHub
2. Kopieren Sie die Repository-URL
3. Fügen Sie es als Remote hinzu:

```bash
# Remote-Repository hinzufügen
git remote add origin https://github.com/yourusername/my-first-git-project.git

# Remote überprüfen
git remote -v
```

### Verwendung von GitLab oder anderen Diensten

Der Prozess ist ähnlich:
```bash
# GitLab-Beispiel
git remote add origin https://gitlab.com/yourusername/my-first-git-project.git

# Selbst gehosteter Git-Server
git remote add origin user@server:/path/to/repo.git
```

## Schritt 6: In das Remote-Repository pushen (git push)

Pushen Sie Ihre Commits in das Remote-Repository:

```bash
# In das Remote-Repository pushen
git push -u origin main
```

Die Option `-u` richtet das Tracking zwischen Ihrem lokalen `main`-Branch und dem Remote-`main`-Branch ein.

### Push-Ausgabe verstehen

```
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 4 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (7/7), 1.23 KiB | 1.23 MiB/s, done.
Total 7 (delta 0), reused 0 (delta 0)
To https://github.com/yourusername/my-first-git-project.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### Zukünftige Pushes

Nach dem ersten Push mit `-u` können Sie einfach verwenden:

```bash
git push
```

## Vollständiges Workflow-Beispiel

Hier ist ein vollständiges Beispiel des Git-Workflows:

```bash
# 1. Änderungen vornehmen
echo "print('Hello, Git!')" > new_script.py

# 2. Status prüfen
git status

# 3. Änderungen stagen
git add new_script.py

# 4. Änderungen committen
git commit -m "Add new Python script"

# 5. In das Remote-Repository pushen
git push
```

## Häufige Git-Workflow-Muster

### Feature-Entwicklungs-Workflow
```bash
# Mit der Arbeit an einem Feature beginnen
git status
# ... Änderungen vornehmen ...
git add .
git commit -m "Implement feature X"
git push
```

### Bugfix-Workflow
```bash
# Einen Bug beheben
git status
# ... den Bug beheben ...
git add -u  # Nur geänderte Dateien hinzufügen
git commit -m "Fix bug in user authentication"
git push
```

### Regulärer Entwicklungs-Workflow
```bash
# Täglicher Entwicklungszyklus
git status
# ... am Code arbeiten ...
git add .
git commit -m "Add user profile validation"
# ... weitere Arbeit ...
git add .
git commit -m "Update error handling"
git push
```

## Best Practices

### 1. Häufig committen
- Machen Sie kleine, fokussierte Commits
- Committen Sie zusammengehörige Änderungen gemeinsam
- Warten Sie nicht zu lange zwischen Commits

### 2. Gute Commit-Nachrichten schreiben
- Verwenden Sie die Gegenwartsform ("Add feature" statt "Added feature")
- Halten Sie die erste Zeile unter 50 Zeichen
- Erklären Sie warum, nicht nur was

### 3. Vor dem Committen überprüfen
```bash
# Überprüfen Sie immer, was Sie committen
git status
git diff --staged
```

### 4. Staging-Area effektiv nutzen
- Stagen Sie nur zusammengehörige Änderungen
- Verwenden Sie `git add -p` für teilweises Stagen von Dateien
- Überprüfen Sie gestagte Änderungen vor dem Committen

## Fehlerbehebung bei häufigen Problemen

### Problem: "Nothing to commit"
**Ursache**: Keine Änderungen für den Commit gestaged.
**Lösung**: Verwenden Sie `git add`, um Änderungen zuerst zu stagen.

### Problem: "Repository not found"
**Ursache**: Die URL des Remote-Repositories ist falsch.
**Lösung**: Überprüfen Sie die Remote-URL mit `git remote -v`.

### Problem: "Authentication failed"
**Ursache**: Falsche Anmeldedaten oder Berechtigungen.
**Lösung**: Überprüfen Sie Ihren Benutzernamen/Passwort oder SSH-Schlüssel.

### Problem: "Uncommitted changes"
**Ursache**: Versuch zu pushen mit nicht committeten Änderungen.
**Lösung**: Committen oder stashen Sie Änderungen zuerst.

## Zusammenfassung nützlicher Befehle

### Status und Informationen
```bash
git status          # Repository-Status prüfen
git log             # Commit-Verlauf anzeigen
git diff            # Änderungen anzeigen
git remote -v       # Remote-Repositories anzeigen
```

### Stagen und Committen
```bash
git add <file>      # Bestimmte Datei stagen
git add .           # Alle Dateien stagen
git commit -m "msg" # Mit Nachricht committen
git commit -a -m "msg" # Verfolgte Dateien stagen und committen
```

### Remote-Operationen
```bash
git remote add origin <url>  # Remote-Repository hinzufügen
git push -u origin main      # Pushen und Upstream setzen
git push                     # In konfiguriertes Remote pushen
```

## Zusammenfassung

Sie haben erfolgreich den grundlegenden Git-Workflow erlernt! Hier ist, was Sie erreicht haben:

1. **Verstehen des Workflows**: Add → Commit → Push
2. **Änderungen stagen**: Verwendung von `git add` zur Vorbereitung von Commits
3. **Commits erstellen**: Snapshots mit `git commit` erstellen
4. **Remotes einrichten**: Verbindung zu externen Repositories herstellen
5. **Änderungen pushen**: Ihre Arbeit mit `git push` teilen
6. **Best Practices**: Gute Commit-Nachrichten schreiben und Arbeit organisieren

### Wichtige beherrschte Befehle:
- `git add` - Änderungen für Commit stagen
- `git commit` - Snapshot gestagter Änderungen erstellen
- `git push` - Commits in Remote-Repository hochladen
- `git status` - Aktuellen Repository-Status prüfen
- `git log` - Commit-Verlauf anzeigen
- `git diff` - Änderungen zwischen Versionen anzeigen

### Workflow-Muster:
```
Dateien bearbeiten → git add → git commit → git push
```

Dieser grundlegende Workflow bildet die Grundlage für jede Git-Nutzung. Ob Sie alleine oder im Team arbeiten, diese Befehle werden Ihre täglichen Werkzeuge für die Versionskontrolle sein.

## Nächste Schritte

Nachdem Sie den grundlegenden Git-Workflow verstanden haben, sind Sie bereit, fortgeschrittenere Themen zu erkunden:

1. [Understanding Git Branches](./understanding-git-branches.md)
<!-- 2. [Creating and Switching Branches](./creating-and-switching-branches.md) -->
<!-- 3. [Working with Remote Repositories](./working-with-remote-repositories.md) -->

## Verwandte Ressourcen

- [Creating Your First Git Repository](./creating-your-first-git-repository.md)
- [Understanding Git Basics and Terminology](./understanding-git-basics-and-terminology.md)
- [Git Installation and Setup](./git-installation-and-setup.md)
- [Official Git Tutorial](https://git-scm.com/docs/gittutorial)
- [Pro Git Book - Git Basics](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)
