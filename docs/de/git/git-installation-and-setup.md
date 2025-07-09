# Git Installation und Setup

Git ist ein verteiltes Versionskontrollsystem, das dir hilft, Änderungen in deinem Code zu verfolgen, mit anderen zusammenzuarbeiten und verschiedene Versionen deiner Projekte zu verwalten. Dieses Tutorial führt dich durch die Installation von Git auf verschiedenen Betriebssystemen und die Einrichtung deiner ersten Konfiguration.

## Was ist Git?

Git ist ein leistungsstarkes Versionskontrollsystem, das:
- Änderungen in deinen Dateien im Laufe der Zeit verfolgt
- Es dir ermöglicht, zu früheren Versionen zurückzukehren
- Die Zusammenarbeit mit mehreren Entwicklern ermöglicht
- Verschiedene Versionen (Branches) deines Projekts verwaltet
- Offline funktioniert und synchronisiert, wenn eine Verbindung besteht

## Git installieren

### Windows

#### Option 1: Offizielles Git für Windows
1. Besuche [git-scm.com](https://git-scm.com/download/win)
2. Lade die neueste Version für Windows herunter
3. Führe das Installationsprogramm aus und folge diesen empfohlenen Einstellungen:
   - Wähle "Use Git from the Windows Command Prompt"
   - Wähle "Checkout Windows-style, commit Unix-style line endings"
   - Wähle "Use Windows' default console window"

#### Option 2: Verwendung eines Paketmanagers (Chocolatey)
Wenn du Chocolatey installiert hast:
```bash
choco install git
```

#### Option 3: Verwendung eines Paketmanagers (Scoop)
Wenn du Scoop installiert hast:
```bash
scoop install git
```

### macOS

#### Option 1: Verwendung von Homebrew (Empfohlen)
```bash
brew install git
```

#### Option 2: Verwendung von MacPorts
```bash
sudo port install git
```

#### Option 3: Xcode Command Line Tools
```bash
xcode-select --install
```

#### Option 4: Offizielles Installationsprogramm
1. Besuche [git-scm.com](https://git-scm.com/download/mac)
2. Lade das macOS-Installationsprogramm herunter
3. Führe das Installationsprogramm aus und folge den Anweisungen

### Linux

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install git
```

#### CentOS/RHEL/Fedora
```bash
# CentOS/RHEL
sudo yum install git

# Fedora
sudo dnf install git
```

#### Arch Linux
```bash
sudo pacman -S git
```

#### OpenSUSE
```bash
sudo zypper install git
```

## Installation überprüfen

Nach der Installation überprüfe, ob Git korrekt installiert wurde:

```bash
git --version
```

Du solltest eine Ausgabe ähnlich dieser sehen:
```
git version 2.39.0
```

## Erste Git-Konfiguration

Bevor du Git verwendest, musst du deine Identität konfigurieren. Diese Informationen werden an deine Commits angehängt.

### Deine Identität festlegen

Konfiguriere deinen Namen und deine E-Mail-Adresse:

```bash
git config --global user.name "Dein vollständiger Name"
git config --global user.email "deine.email@example.com"
```

Beispiel:
```bash
git config --global user.name "John Doe"
git config --global user.email "john.doe@example.com"
```

### Deinen Standard-Editor festlegen

Konfiguriere deinen bevorzugten Texteditor für Git-Operationen:

```bash
# Für Visual Studio Code
git config --global core.editor "code --wait"

# Für Vim
git config --global core.editor "vim"

# Für Nano
git config --global core.editor "nano"

# Für Sublime Text
git config --global core.editor "subl -n -w"
```

### Standard-Branch-Namen festlegen

Lege den Standard-Branch-Namen für neue Repositories fest:

```bash
git config --global init.defaultBranch main
```

### Zeilenenden konfigurieren

#### Windows
```bash
git config --global core.autocrlf true
```

#### macOS/Linux
```bash
git config --global core.autocrlf input
```

## Erweiterte Konfigurationsoptionen

### Aliase einrichten

Erstelle Abkürzungen für häufig verwendete Git-Befehle:

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

### Push-Verhalten konfigurieren

Lege das Standard-Push-Verhalten fest:

```bash
git config --global push.default simple
```

### Anmeldeinformationsspeicher einrichten

Um zu vermeiden, dass du dein Passwort wiederholt eingeben musst:

#### Windows
```bash
git config --global credential.helper manager-core
```

#### macOS
```bash
git config --global credential.helper osxkeychain
```

#### Linux
```bash
git config --global credential.helper store
```

## Deine Konfiguration anzeigen

Um alle deine Git-Konfigurationseinstellungen anzuzeigen:

```bash
git config --list
```

Um einen bestimmten Konfigurationswert anzuzeigen:

```bash
git config user.name
git config user.email
```

Um zu sehen, wo eine Einstellung definiert ist:

```bash
git config --show-origin user.name
```

## Speicherorte der Konfigurationsdateien

Die Git-Konfiguration wird auf drei Ebenen gespeichert:

1. **Systemweit**: `/etc/gitconfig` (betrifft alle Benutzer)
2. **Benutzerspezifisch**: `~/.gitconfig` oder `~/.config/git/config` (betrifft den aktuellen Benutzer)
3. **Repository-spezifisch**: `.git/config` (betrifft nur das aktuelle Repository)

Jede Ebene überschreibt die vorherige, sodass repository-spezifische Einstellungen Vorrang haben.

## SSH-Schlüssel-Setup (Optional, aber empfohlen)

Für sichere Authentifizierung mit Remote-Repositories wie GitHub:

### SSH-Schlüssel generieren
```bash
ssh-keygen -t ed25519 -C "deine.email@example.com"
```

### SSH-Schlüssel zum SSH-Agent hinzufügen
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### Öffentlichen Schlüssel kopieren
```bash
# macOS
pbcopy < ~/.ssh/id_ed25519.pub

# Linux
xclip -sel clip < ~/.ssh/id_ed25519.pub

# Windows
clip < ~/.ssh/id_ed25519.pub
```

Füge dann diesen öffentlichen Schlüssel zu deinem GitHub/GitLab/Bitbucket-Konto hinzu.

## Fehlerbehebung bei häufigen Problemen

### Fehler "Zugriff verweigert"
Wenn du auf Berechtigungsprobleme stößt:
```bash
sudo chown -R $(whoami) ~/.gitconfig
```

### HTTPS vs SSH
Wenn du Authentifizierungsprobleme hast, musst du möglicherweise zwischen HTTPS und SSH wechseln:
```bash
# Aktuelle Remote-URL prüfen
git remote -v

# Zu SSH wechseln
git remote set-url origin git@github.com:username/repository.git

# Zu HTTPS wechseln
git remote set-url origin https://github.com/username/repository.git
```

### Zertifikatsprobleme
Wenn du auf SSL-Zertifikatsfehler stößt:
```bash
git config --global http.sslVerify false
```

**Hinweis**: Verwende dies nur als temporäre Lösung und aktiviere die SSL-Überprüfung danach wieder.

## Nächste Schritte

Jetzt, da du Git installiert und konfiguriert hast, bist du bereit:
- Dein erstes Git-Repository zu erstellen
- Grundlegende Git-Befehle zu lernen
- Änderungen in deinen Projekten zu verfolgen
- Mit anderen über Git zusammenzuarbeiten

## Zusammenfassung

In diesem Tutorial hast du gelernt, wie man:
- Git auf Windows, macOS und Linux installiert
- Deine Git-Identität und -Präferenzen konfiguriert
- SSH-Schlüssel für sichere Authentifizierung einrichtet
- Häufige Installationsprobleme behebt
- Die Git-Konfigurationshierarchie versteht

Git ist jetzt bereit, dir zu helfen, Änderungen zu verfolgen, mit anderen zusammenzuarbeiten und deinen Code effektiv zu verwalten. Im nächsten Tutorial werden wir Git-Grundlagen und Terminologie erkunden, um dein Fundament aufzubauen.