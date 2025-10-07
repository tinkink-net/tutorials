# Git Branches verstehen

Git Branches sind eine der mächtigsten Funktionen des Git Versionskontrollsystems. Sie ermöglichen es Ihnen, von der Hauptentwicklungslinie abzuzweigen und an verschiedenen Features, Bugfixes oder Experimenten zu arbeiten, ohne die Hauptcodebasis zu beeinträchtigen.

## Was sind Git Branches?

Ein Branch in Git ist im Wesentlichen ein beweglicher Zeiger auf einen bestimmten Commit. Wenn Sie einen neuen Branch erstellen, erstellt Git einen neuen Zeiger auf den Commit, auf dem Sie sich gerade befinden. Der Standard-Branch in den meisten Git Repositories heißt `main` (oder `master` in älteren Repositories).

Stellen Sie sich Branches wie parallele Universen für Ihren Code vor - Sie können gleichzeitig an verschiedenen Features arbeiten, ohne dass sie sich gegenseitig stören.

## Warum Branches verwenden?

### 1. **Parallele Entwicklung**
Mehrere Entwickler können gleichzeitig an verschiedenen Features arbeiten, ohne Konflikte zu verursachen.

### 2. **Feature-Isolation**
Jedes Feature kann isoliert entwickelt werden, was das Testen und Debuggen erleichtert.

### 3. **Sichere Experimente**
Sie können neue Ideen ausprobieren, ohne das Risiko einzugehen, die Hauptcodebasis zu beschädigen.

### 4. **Code Review**
Branches ermöglichen ordnungsgemäße Code-Review-Prozesse durch Pull/Merge Requests.

## Grundlegende Branch-Operationen

### Branches anzeigen

Um alle Branches in Ihrem Repository anzuzeigen:

```bash
# Alle lokalen Branches auflisten
git branch

# Alle Branches auflisten (lokal und remote)
git branch -a

# Nur Remote-Branches auflisten
git branch -r
```

Der aktuelle Branch wird mit einem Sternchen (*) hervorgehoben.

### Einen neuen Branch erstellen

Es gibt mehrere Möglichkeiten, einen neuen Branch zu erstellen:

```bash
# Neuen Branch erstellen, aber auf aktuellem Branch bleiben
git branch feature-login

# Branch erstellen und zu ihm wechseln
git checkout -b feature-login

# Moderne Art: Branch erstellen und zu ihm wechseln
git switch -c feature-login
```

### Zwischen Branches wechseln

```bash
# Zu einem bestehenden Branch wechseln (traditionelle Art)
git checkout main

# Zu einem bestehenden Branch wechseln (moderne Art)
git switch main
```

### Branch-Benennungskonventionen

Gute Branch-Namen sind beschreibend und folgen einem konsistenten Muster:

```bash
# Feature-Branches
git branch feature/user-authentication
git branch feature/shopping-cart
git branch feat/add-payment-gateway

# Bugfix-Branches
git branch bugfix/login-error
git branch fix/navbar-responsive
git branch hotfix/security-patch

# Release-Branches
git branch release/v1.2.0
git branch release/2024-01-15
```

## Mit Branches arbeiten

### Änderungen in einem Branch vornehmen

1. **Zu Ihrem Branch wechseln**:
```bash
git switch feature-login
```

2. **Änderungen vornehmen** und committen:
```bash
# Dateien bearbeiten
echo "Login functionality" > login.js

# Änderungen stagen
git add login.js

# Änderungen committen
git commit -m "Add basic login functionality"
```

3. **Branch zum Remote pushen**:
```bash
# Neuen Branch zum ersten Mal pushen
git push -u origin feature-login

# Nachfolgende Pushes
git push
```

### Remote Branches verfolgen

Bei der Arbeit mit Remote-Repositories:

```bash
# Neueste Änderungen vom Remote holen
git fetch origin

# Lokalen Branch erstellen, der einen Remote-Branch verfolgt
git checkout -b feature-login origin/feature-login

# Oder moderne Syntax verwenden
git switch -c feature-login origin/feature-login
```

## Branch-Status und Informationen

### Branch-Status überprüfen

```bash
# Aktuellen Branch und uncommittete Änderungen anzeigen
git status

# Branch-Commit-Historie anzeigen
git log --oneline

# Branch-Unterschiede anzeigen
git diff main..feature-login
```

### Branches vergleichen

```bash
# Commits anzeigen, die in feature-login sind, aber nicht in main
git log main..feature-login

# Datei-Unterschiede zwischen Branches anzeigen
git diff main feature-login

# Nur geänderte Dateinamen anzeigen
git diff --name-only main feature-login
```

## Best Practices für Branch-Management

### 1. **Branches kurzlebig halten**
Erstellen Sie Branches für spezifische Features oder Fixes und mergen Sie sie schnell zurück.

### 2. **Regelmäßige Updates**
Halten Sie Ihre Feature-Branches mit den neuesten Änderungen von main aktuell:

```bash
# Zu main wechseln und neueste Änderungen pullen
git switch main
git pull origin main

# Zurück zum Feature-Branch wechseln und main mergen
git switch feature-login
git merge main
```

### 3. **Branches aufräumen**
Löschen Sie Branches nach dem Mergen:

```bash
# Lokalen Branch löschen
git branch -d feature-login

# Remote-Branch löschen
git push origin --delete feature-login
```

### 4. **Beschreibende Namen verwenden**
Branch-Namen sollten deutlich angeben, wofür der Branch ist.

## Häufige Branch-Szenarien

### Szenario 1: Feature-Entwicklung

```bash
# Von main starten
git switch main
git pull origin main

# Feature-Branch erstellen
git switch -c feature/user-profile

# Am Feature arbeiten
echo "Profile page" > profile.html
git add profile.html
git commit -m "Add user profile page"

# Zum Remote pushen
git push -u origin feature/user-profile
```

### Szenario 2: Bugfix

```bash
# Bugfix-Branch von main erstellen
git switch main
git switch -c bugfix/navbar-mobile

# Bug beheben
echo "Fixed navbar" > navbar.css
git add navbar.css
git commit -m "Fix navbar responsiveness on mobile"

# Pushen und Pull Request erstellen
git push -u origin bugfix/navbar-mobile
```

### Szenario 3: Notfall-Hotfix

```bash
# Hotfix-Branch von main erstellen
git switch main
git switch -c hotfix/security-patch

# Dringenden Fix anwenden
echo "Security update" > security.js
git add security.js
git commit -m "Apply security patch for user authentication"

# Für sofortiges Mergen pushen
git push -u origin hotfix/security-patch
```

## Troubleshooting häufiger Probleme

### Problem: Kann nicht zwischen Branches wechseln wegen uncommitteter Änderungen

```bash
# Option 1: Änderungen temporär stashen
git stash
git switch other-branch
git stash pop

# Option 2: Änderungen zuerst committen
git add .
git commit -m "WIP: temporary commit"
git switch other-branch
```

### Problem: Branch ist vom Remote divergiert

```bash
# Force Push (mit Vorsicht verwenden)
git push --force-with-lease

# Oder neuen Branch erstellen
git switch -c feature-login-fixed
git push -u origin feature-login-fixed
```

## Erweiterte Branch-Befehle

### Interaktive Branch-Erstellung

```bash
# Branch von spezifischem Commit erstellen
git branch feature-login abc123

# Branch von Tag erstellen
git branch release-branch v1.0.0

# Orphan-Branch erstellen (keine Commit-Historie)
git checkout --orphan gh-pages
```

### Branch-Informationen

```bash
# Letzten Commit jedes Branches anzeigen
git branch -v

# Gemergte Branches anzeigen
git branch --merged main

# Nicht gemergte Branches anzeigen
git branch --no-merged main
```

## Nächste Schritte

Nachdem Sie Git Branches verstehen, sollten Sie lernen:

1. **Branches mergen** - Wie man Änderungen von verschiedenen Branches kombiniert
2. **Merge-Konflikte lösen** - Umgang mit Konflikten beim Mergen
3. **Pull Requests** - Kollaborativer Workflow für Code Review
4. **Git Rebase** - Alternative zum Mergen für saubere Historie

## Fazit

Git Branches sind essentiell für jeden Entwicklungsworkflow. Sie bieten die Flexibilität, gleichzeitig an mehreren Features zu arbeiten, während die Hauptcodebasis stabil bleibt. Üben Sie das Erstellen von Branches, das Vornehmen von Änderungen und das Wechseln zwischen ihnen, um sich mit dieser mächtigen Git-Funktion vertraut zu machen.

Denken Sie daran: Branches sind in Git günstig und schnell, also zögern Sie nicht, sie großzügig für jede neue Arbeit zu erstellen, die Sie machen!