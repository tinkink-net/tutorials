# Arbeiten mit Remote-Repositories

## Einführung
Remotes ermöglichen Zusammenarbeit, Backup und Deployment. Dieses Tutorial deckt Hinzufügen, Inspektion, Synchronisation, Pruning und Verwaltung ab.

## Schlüsselbegriffe
| Begriff | Bedeutung |
|--------|-----------|
| Remote | Benannter Verweis auf gehostetes Repo (z.B. `origin`) |
| Tracking Branch | Lokaler Branch mit Upstream-Zuordnung (z.B. `main` ↔ `origin/main`) |
| Fetch | Lädt Objekte & Refs (kein Working-Tree-Update) |
| Pull | Fetch + Integration (Merge oder Rebase) |
| Push | Überträgt lokale Commits zu Remote |

## Remotes auflisten
```bash
git remote -v
```

## Remote hinzufügen
```bash
git remote add origin https://github.com/example/app.git
git remote add upstream https://github.com/org/app.git
```

## URL ändern
```bash
git remote set-url origin git@github.com:example/app.git
```

## Remote entfernen
```bash
git remote remove upstream
```

## Aktualisieren / Fetchen
```bash
git fetch
git fetch --all
git fetch origin main
```

## Remote-Branches ansehen
```bash
git branch -r
git branch -a
```

## Tracking-Branch erstellen
```bash
git checkout -b feature/ui origin/feature/ui
# oder
git switch -c feature/ui --track origin/feature/ui
```

## Upstream nachträglich setzen
```bash
git branch --set-upstream-to=origin/main main
# oder beim ersten Push
git push -u origin main
```

## Pull-Strategie konfigurieren
```bash
git config --global pull.rebase true
# oder nur im Repo
git config pull.rebase true
```

## Sicheres Aktualisieren
```bash
git fetch origin
git rebase origin/main   # oder merge je Policy
```

## Branch pushen / löschen
```bash
git push origin feature/auth
git push origin --delete feature/auth
```

## Lokalen Branch umbenennen (inkl. Remote)
```bash
git branch -m old-name new-name
git push origin :old-name new-name
git push origin -u new-name
```

## Veraltete Referenzen bereinigen
```bash
git remote prune origin
git fetch --prune
```

## Remote-Details anzeigen
```bash
git remote show origin
```

## Mehrere Remotes (Fork-Workflow)
```bash
git remote add upstream https://github.com/original/project.git
git fetch upstream
git rebase upstream/main
git push origin main
```

## Mirror / Backup
```bash
git clone --mirror https://github.com/source/repo.git
cd repo.git
git push --mirror git@internal:backup/repo.git
```

## Authentifizierungstipps
- SSH bevorzugen
- HTTPS + 2FA → Personal Access Token
- Credentials cachen: `git config --global credential.helper cache`

## Häufige Probleme
| Issue | Ursache | Lösung |
|-------|---------|--------|
| Push rejected (non-fast-forward) | Remote weiter | `git pull --rebase` + push |
| Auth fehlgeschlagen | Token/Key ungültig | Neu erzeugen |
| Detached HEAD Editing | Remote-Ref direkt ausgecheckt | Branch erstellen: `git switch -c fix upstream/main` |
| Stale Tracking | Branch remote gelöscht | `git fetch --prune` |

## Best Practices
1. Einheitliche Namen (`origin`, `upstream`)
2. Prune automatisieren
3. Kein Force-Push auf geteilte Branches
4. Schutzregeln für `main`
5. Tokens/Keys rotieren

## Zusammenfassung
Gezieltes Fetchen, bewusste Pull-Strategie, regelmäßiges Pruning und gute Upstream-Hygiene ermöglichen effiziente Kollaboration.

## Nächste Schritte
- Code Review Workflow (`pull-requests-and-code-review-workflow.md`)
- Konfliktstrategien (`git-conflict-resolution-strategies.md`)

---
**Key Commands**
```bash
git remote -v
git fetch --all --prune
git push origin <branch>
git remote show origin
git remote prune origin
```
