# Git-Grundlagen und Terminologie verstehen

## Einführung

Git ist ein verteiltes Versionskontrollsystem, das Änderungen im Quellcode während der Softwareentwicklung verfolgt. Bevor man in die praktische Anwendung von Git einsteigt, ist es wichtig, die grundlegenden Konzepte und die Terminologie zu verstehen, die die Grundlage für die Funktionsweise von Git bilden.

Dieses Tutorial behandelt die Kernkonzepte, die jeder Git-Benutzer verstehen sollte, und bietet Ihnen eine solide Grundlage für die effektive Arbeit mit Git.

## Was ist Versionskontrolle?

Versionskontrolle ist ein System, das Änderungen an Dateien im Laufe der Zeit aufzeichnet, sodass Sie später bestimmte Versionen abrufen können. Sie ermöglicht es Ihnen:

- Änderungen an Ihrem Code zu verfolgen
- Mit anderen Entwicklern zusammenzuarbeiten
- Bei Bedarf zu früheren Versionen zurückzukehren
- Zu verstehen, was sich geändert hat, wann und wer die Änderungen vorgenommen hat
- Verschiedene Versionen Ihres Projekts gleichzeitig zu verwalten

## Git vs. andere Versionskontrollsysteme

### Zentralisiert vs. Verteilt

Traditionelle Versionskontrollsysteme (wie CVS, Subversion) sind **zentralisiert**:
- Ein zentraler Server speichert alle Versionen
- Entwickler checken Dateien aus dem zentralen Repository aus
- Wenn der Server ausfällt, stoppt die Zusammenarbeit

Git ist **verteilt**:
- Jeder Entwickler hat eine vollständige Kopie der Projekthistorie
- Kann offline arbeiten und Änderungen später synchronisieren
- Kein einzelner Fehlerpunkt
- Mehrere Sicherungskopien existieren auf natürliche Weise

## Kern-Git-Konzepte

### Repository (Repo)

Ein **Repository** ist ein Speicherort, in dem Ihr Projekt lebt. Es enthält:
- Alle Ihre Projektdateien
- Vollständige Historie der Änderungen
- Branches und Tags
- Konfigurationseinstellungen

Arten von Repositories:
- **Lokales Repository**: Auf Ihrem Computer
- **Remote-Repository**: Auf einem Server (wie GitHub, GitLab)

### Arbeitsverzeichnis

Das **Arbeitsverzeichnis** ist der Ordner auf Ihrem Computer, in dem Sie aktuell an Ihren Projektdateien arbeiten. Hier bearbeiten, erstellen und löschen Sie Dateien.

### Staging-Bereich (Index)

Der **Staging-Bereich** ist eine Datei, die Informationen darüber speichert, was in Ihren nächsten Commit aufgenommen wird. Er ist wie eine Vorschau Ihres nächsten Commits.

Stellen Sie sich das wie einen Einkaufswagen vor:
- Sie fügen Artikel (Änderungen) zu Ihrem Warenkorb (Staging-Bereich) hinzu
- Wenn Sie bereit sind, checken Sie (commit) alles in Ihrem Warenkorb aus

### Commit

Ein **Commit** ist eine Momentaufnahme Ihres Projekts zu einem bestimmten Zeitpunkt. Jeder Commit enthält:
- Eine eindeutige Kennung (Hash)
- Autorinformationen
- Zeitstempel
- Commit-Nachricht, die die Änderungen beschreibt
- Zeiger auf den vorherigen Commit

### Branch

Ein **Branch** ist ein leichtgewichtiger, beweglicher Zeiger auf einen bestimmten Commit. Er ermöglicht es Ihnen:
- An verschiedenen Funktionen gleichzeitig zu arbeiten
- Zu experimentieren, ohne den Hauptcode zu beeinflussen
- Mit anderen an separaten Funktionen zusammenzuarbeiten

Der Standardbranch heißt normalerweise `main` oder `master`.

### HEAD

**HEAD** ist ein Zeiger, der auf den aktuellen Branch verweist, an dem Sie arbeiten. Er teilt Git mit, welchen Commit Sie gerade betrachten.

## Git-Workflow-Zustände

Git-Dateien können in drei Hauptzuständen existieren:

### 1. Modifiziert
- Dateien wurden geändert, aber nicht committed
- Änderungen existieren nur in Ihrem Arbeitsverzeichnis

### 2. Gestaged
- Dateien sind markiert, um in den nächsten Commit aufgenommen zu werden
- Änderungen befinden sich im Staging-Bereich

### 3. Committed
- Dateien sind sicher in Ihrem lokalen Repository gespeichert
- Änderungen sind Teil der Projekthistorie

## Die drei Bereiche von Git

Das Verständnis dieser drei Bereiche ist entscheidend für die Beherrschung von Git:

```
Arbeitsverzeichnis → Staging-Bereich → Repository
     (modifizieren)      (stagen)       (committen)
```

### Arbeitsverzeichnis
- Wo Sie Dateien bearbeiten
- Enthält eine Version des Projekts
- Dateien können modifiziert, hinzugefügt oder gelöscht werden

### Staging-Bereich
- Speichert Informationen darüber, was in den nächsten Commit aufgenommen wird
- Wird auch als "Index" bezeichnet
- Ermöglicht es Ihnen, genau festzulegen, was in jeden Commit aufgenommen wird

### Repository
- Wo Git Metadaten und die Objektdatenbank speichert
- Enthält alle Versionen Ihres Projekts
- Der `.git`-Ordner im Projektstammverzeichnis

## Wesentliche Git-Terminologie

### Clone
Erstellen einer lokalen Kopie eines Remote-Repositories auf Ihrem Computer.

### Fork
Erstellen einer persönlichen Kopie des Repositories einer anderen Person auf einem Hosting-Dienst wie GitHub.

### Pull
Abrufen von Änderungen aus einem Remote-Repository und Zusammenführen mit Ihrem aktuellen Branch.

### Push
Hochladen Ihrer lokalen Commits in ein Remote-Repository.

### Merge
Kombinieren von Änderungen aus verschiedenen Branches in einen einzelnen Branch.

### Rebase
Verschieben oder Kombinieren von Commits von einem Branch in einen anderen, um eine lineare Historie zu erstellen.

### Tag
Eine Referenz auf einen bestimmten Commit, wird normalerweise verwendet, um Release-Punkte zu markieren.

### Remote
Eine Version Ihres Repositories, die auf einem Server gehostet wird und für die Zusammenarbeit genutzt wird.

### Origin
Der Standardname für das Remote-Repository, von dem Sie geklont haben.

### Upstream
Das ursprüngliche Repository, von dem Sie geforkt haben (in Fork-basierten Workflows).

## Git-Objekttypen

Git speichert alles als Objekte in seiner Datenbank:

### 1. Blob (Binary Large Object)
- Speichert Dateiinhalte
- Enthält keinen Dateinamen oder keine Verzeichnisstruktur

### 2. Tree
- Repräsentiert Verzeichnisse
- Enthält Referenzen auf Blobs und andere Trees
- Speichert Dateinamen und Berechtigungen

### 3. Commit
- Zeigt auf ein Tree-Objekt
- Enthält Metadaten (Autor, Zeitstempel, Nachricht)
- Referenziert Eltern-Commit(s)

### 4. Tag
- Zeigt auf einen Commit
- Enthält zusätzliche Metadaten
- Wird normalerweise für Releases verwendet

## Überblick über häufige Git-Befehle

Hier sind die am häufigsten verwendeten Git-Befehle und ihre Zwecke:

### Repository-Operationen
- `git init` - Initialisieren eines neuen Repositories
- `git clone` - Kopieren eines Repositories von Remote zu Lokal
- `git status` - Überprüfen des Status Ihres Arbeitsverzeichnisses

### Grundlegender Workflow
- `git add` - Änderungen für Commit stagen
- `git commit` - Änderungen im Repository speichern
- `git push` - Änderungen in das Remote-Repository hochladen
- `git pull` - Änderungen vom Remote-Repository herunterladen

### Branch-Operationen
- `git branch` - Branches auflisten, erstellen oder löschen
- `git checkout` - Zwischen Branches wechseln oder Dateien wiederherstellen
- `git merge` - Änderungen von einem Branch in einen anderen zusammenführen

### Informationsbefehle
- `git log` - Commit-Historie anzeigen
- `git diff` - Änderungen zwischen Commits, Branches usw. anzeigen
- `git show` - Informationen über Commits anzeigen

## Best Practices für das Verständnis von Git

### 1. In Snapshots denken
Git speichert keine Unterschiede; es speichert Snapshots Ihres gesamten Projekts bei jedem Commit.

### 2. Commits sind günstig
Haben Sie keine Angst, oft zu committen. Kleine, fokussierte Commits sind leichter zu verstehen und zu verwalten.

### 3. Aussagekräftige Commit-Nachrichten verwenden
Schreiben Sie klare, beschreibende Commit-Nachrichten, die erklären, was sich geändert hat und warum.

### 4. Die drei Zustände verstehen
Seien Sie sich immer bewusst, in welchem Zustand sich Ihre Dateien befinden: modifiziert, gestaged oder committed.

### 5. Früh und oft branchen
Verwenden Sie Branches für Funktionen, Experimente und Bugfixes. Sie sind leichtgewichtig und einfach zu handhaben.

## Zusammenfassung

Das Verständnis der Kernkonzepte und Terminologie von Git ist wesentlich für eine effektive Versionskontrolle. Wichtige Erkenntnisse:

- **Git ist verteilt**: Jede Kopie ist ein vollständiges Repository
- **Drei Zustände**: Modifiziert, gestaged, committed
- **Drei Bereiche**: Arbeitsverzeichnis, Staging-Bereich, Repository
- **Commits sind Snapshots**: Keine Unterschiede, sondern vollständige Projektzustände
- **Branches sind Zeiger**: Leichtgewichtige Referenzen auf Commits
- **HEAD verfolgt den Standort**: Zeigt, wo Sie sich in der Projekthistorie befinden

Mit diesen grundlegenden Konzepten verstanden, sind Sie bereit, Git effektiv zu nutzen. Das nächste Tutorial wird Sie durch die Erstellung Ihres ersten Git-Repositories und die Durchführung grundlegender Operationen führen.

## Nächste Schritte

Nachdem Sie die Git-Grundlagen und Terminologie verstanden haben, können Sie fortfahren mit:
1. [Erstellen Ihres ersten Git-Repositories](./creating-your-first-git-repository.md)
2. [Grundlegender Git-Workflow: Add, Commit, Push](./basic-git-workflow-add-commit-push.md)
3. [Git-Branches verstehen](./understanding-git-branches.md)

## Verwandte Ressourcen

- [Git-Installation und Einrichtung](./git-installation-and-setup.md)
- [Git mit verschiedenen Konfigurationen in verschiedenen Projekten](./git-using-different-config-in-different-projects.md)
- [Offizielle Git-Dokumentation](https://git-scm.com/doc)
- [Pro Git Buch](https://git-scm.com/book)