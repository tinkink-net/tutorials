# Branches in Git erstellen und wechseln

Branching ist die Superkraft von Git: isolierte Entwicklungsstränge für Features, Fixes oder Experimente ohne die Stabilität von `main` zu gefährden. Das effiziente Erstellen und Wechseln von Branches ist grundlegend für jeden sauberen Workflow.

---
## 1. Mentales Modell
`main` repräsentiert den veröffentlichten, stabilen Verlauf. Ein Branch ist nur ein beweglicher Zeiger (Pointer) auf einen Commit. Beim Erstellen eines neuen Branches sagst du: „Ab diesem Punkt starte ich eine neue Arbeitslinie.“ Es wird nichts kopiert – nur eine leichte Referenz angelegt.

Kernideen:
- Ein Branch zeigt auf genau einen Commit.
- `HEAD` sagt dir, auf welchem Branch (oder Commit) du „stehst“.
- Neue Commits bewegen den Branch-Zeiger nach vorn.

Weil Branches billig sind: nutze viele – Feature, Bugfix, Experiment.

---
## 2. Vorhandene Branches auflisten
Lokal:
```
$ git branch
```
Aktueller Branch hat `*`. Lokal + Remote:
```
$ git branch -a
```
Mit letztem Commit:
```
$ git branch -v
```
Stale Remote-Tracking-Branches entfernen:
```
$ git fetch --prune
```

---
## 3. Neuen Branch erstellen
Aktualisiere Basis (oft `main`):
```
$ git checkout main
$ git pull origin main
```
Nur erstellen:
```
$ git branch feature/login-form
```
Erstellen + direkt wechseln (empfohlen):
```
$ git switch -c feature/login-form
```
Ältere Syntax:
```
$ git checkout -b feature/login-form
```
Namenskonventionen:
- `feature/<name>` neue Funktion
- `bugfix/<ticket-id>` Fehlerbehebung
- `hotfix/<kritisch>` dringender Produktionsfix
- weitere: `refactor/`, `chore/`, `docs/` etc.

Vermeide Leerzeichen, Großbuchstaben, vage Namen (`new`, `temp`).

---
## 4. Zwischen Branches wechseln
```
$ git switch feature/login-form
```
Alt:
```
$ git checkout feature/login-form
```
Git blockt bei uncommitteten, überschreibungsgefährdeten Änderungen. Optionen:
- Committen
- Stashen: `git stash push -m "WIP"`
- Verwerfen: `git restore .`

Zurück zum vorherigen Branch:
```
$ git switch -
```

### Detached HEAD
Commit direkt auschecken:
```
$ git checkout 4f2a9c1
```
Jetzt „detached HEAD“ – kannst testen, aber Commits ohne Branch sind schwer auffindbar. Bewahren:
```
$ git switch -c experiment/performance-tuning
```

---
## 5. Branch aktuell halten
Während Featurearbeit wandert `main` weiter:
```
$ git switch feature/login-form
$ git fetch origin
$ git merge origin/main
```
Lineare Historie (nur wenn allein):
```
$ git fetch origin
$ git rebase origin/main
```
Nie gemeinsam genutzte Branches rebases, da Hashes sich ändern.

---
## 6. Branch pushen
Lokal existiert er nur bis zum Push:
```
$ git push -u origin feature/login-form
```
Tracking prüfen:
```
$ git branch -vv
```

---
## 7. Branch umbenennen
Auf Branch selbst:
```
$ git branch -m feature/login-form feature/auth-ui
```
Remote aktualisieren:
```
$ git push origin :feature/login-form
$ git push -u origin feature/auth-ui
```

---
## 8. Branch löschen
Nach Merge und wenn sicher:
Lokal:
```
$ git branch -d feature/login-form
```
Erzwingen (unmerged):
```
$ git branch -D feature/login-form
```
Remote:
```
$ git push origin --delete feature/login-form
```

---
## 9. Beispiel-Workflow
1. `main` updaten
2. Feature-Branch anlegen
3. Klein, häufig, bedeutungsvoll committen
4. Regelmäßig rebase oder merge von `origin/main`
5. Push + PR/MR öffnen
6. Nach Merge Branch lokal & remote löschen

---
## 10. Troubleshooting
| Situation | Ursache | Lösung |
|-----------|---------|--------|
| Wechsel blockiert | Überschreibungsgefahr | Commit / stash / restore |
| Detached HEAD | Commit statt Branch | `git switch -c <name>` |
| Branch fehlt nach Clone | Nur Default geholt | `git fetch --all` dann switch |
| Push rejected (non-fast-forward) | Remote weiter | `git pull --rebase` dann push |
| Branch versehentlich gelöscht | Kein Referenz mehr | `git reflog` + neuer Branch |

---
## 11. Strategische Nutzung
Nicht nur Features:
- Prototyping
- Hotfixes von Tags
- (Sparsame) Integrations-Branches
- Doku/Infra Änderungen

Kurze Lebensdauer minimiert Konflikte.

---
## 12. Übung
1. Repo init oder klonen
2. `feature/colors` + Datei
3. Zwei Commits
4. Rebase nach Update von `main`
5. Umbenennen in `feature/theme-colors`
6. Push + PR
7. Merge + löschen

---
## 13. Kernpunkte
- Branch-Erstellung ist sofort & billig
- `switch` ist klarer als altes `checkout`
- Früh aktualisieren minimiert Merge-Reibung
- Aufräumen reduziert kognitive Last
- Immer Branch für Exploratives

Das Beherrschen von Branches ebnet den Weg für Rebase, History Editing und Release-Strategien.
