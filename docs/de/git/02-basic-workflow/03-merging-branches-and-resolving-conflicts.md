# Branches mergen und Konflikte lösen

## Einführung
Branching isoliert Arbeit; Merging führt sie wieder zusammen. Hier lernst du sichere Merges, Strategien und selbstbewusstes Auflösen von Konflikten.

## Voraussetzungen
- Grundworkflow (`add`, `commit`, `push`)
- Branch-Erstellung/Wechsel bekannt
- Verständis von Commit-Historie / `git log`

## Lernziele
1. Feature-Branches in Mainline mergen
2. Fast-Forward vs Non-Fast-Forward unterscheiden
3. Konflikte erkennen, ansehen, lösen
4. Merge abbrechen oder neu starten
5. Best Practices zur Minimierung von Konflikten anwenden

## Mentales Modell
Merge erzeugt i.d.R. einen neuen Commit mit **zwei Eltern**, außer Fast-Forward ist möglich. Git macht einen Three-Way-Merge:
```
BASE (gemeinsamer Vorfahr)
HEAD (aktueller Branch)
OTHER (einzumergender Branch)
```
Diffs BASE→HEAD und BASE→OTHER: nicht überlappend = automatisch; Überschneidung = Konflikt.

## Fast-Forward vs Merge-Commit
| Szenario | Resultat | Wann | Vorteile | Nachteile |
|----------|----------|------|----------|-----------|
| Fast-forward | Zeiger verschiebt sich | Ziel strikt voraus | Lineare Historie | Verlust Branch-Kontext |
| Merge-Commit | Neuer Commit (2 Eltern) | Divergierende Historien | Sichtbarer Integrationspunkt | Extra Commits / Rauschen |

Erzwingen eines Merge-Commits:
```bash
git merge --no-ff feature/login
```

## Basis-Workflow
```bash
git checkout main
git pull origin main
git merge feature/login
git push origin main
```

## Vorschau
```bash
git log --oneline main..feature/login
git merge --no-commit --no-ff feature/login
# Rückgängig
git merge --abort
```

## Konflikt-Beispiel
```
git checkout main
git merge feature/rate-limit
# CONFLICT ...
```
Marker:
```
<<<<<<< HEAD
"rateLimit": 200,
=======
"rateLimit": 500,
>>>>>>> feature/rate-limit
```

## Konflikte untersuchen
```bash
git status
git diff
git diff --name-only --diff-filter=U
```
Resolve → Marker entfernen →
```bash
git add config/app.json
git commit
```
Oder individuelle Message:
```bash
git commit -m "Merge feature/rate-limit: adjust to 300"
```

## Abbrechen
```bash
git merge --abort
```

## Wichtige Optionen
| Option | Zweck |
|--------|-------|
| `--no-ff` | Merge-Commit erzwingen |
| `--squash` | Änderungen bündeln, kein Merge-Commit |
| `--no-commit` | Stop vor Commit |
| `--abort` | Merge zurücksetzen |
| `-X ours` | Bei Konflikten HEAD bevorzugen |
| `-X theirs` | Fremd-Branch bevorzugen |

Squash-Beispiel:
```bash
git checkout main
git merge --squash feature/search
git commit -m "Add search"
```

## Visualisierung
```bash
git log --graph --oneline --decorate
```

## Mergetools
```bash
git mergetool
```

## Konfliktprävention
1. Häufig pull / rebase
2. Kleine, fokussierte Branches
3. Formatierung nicht mit Logik mischen
4. Einheitliche Lint/Order
5. Früh über große Refactors sprechen

## Binärkonflikte
```bash
git checkout --ours  path/to/asset.png
git checkout --theirs path/to/asset.png
git add path/to/asset.png
```

## Häufige Probleme
| Problem | Ursache | Lösung |
|---------|---------|--------|
| Wiederholte Konflikte | Lang lebender Branch | Früher rebasen/mergen |
| Große Konfliktblöcke | Format + Logik gemischt | Format getrennt committen |
| Unerwarteter Merge-Commit | Policy / Default | `git pull --ff-only` |
| Verlorene Änderungen | Vor Staging verworfen | `git reflog` nutzen |

## Checkliste vor Merge
- [ ] CI grün
- [ ] Review erfolgt
- [ ] Aktualisiert gegen `main`
- [ ] Keine Debug-Artefakte / Secrets
- [ ] Saubere Messages

## Zusammenfassung
Verstehe Merge-Typ, prüfe anstehende Commits, löse Konflikte präzise, committe klar. Hygiene reduziert Reibung.

## Nächste Schritte
- Rebase vs Merge
- Konfliktstrategien

---
**Key Commands**
```bash
git merge <branch>
git merge --no-ff <branch>
git merge --squash <branch>
git merge --abort
git diff --name-only --diff-filter=U
git log --graph --oneline --decorate
```
