# Git Hooks und Automatisierung

## Einführung
Hooks sind Skripte zu Lebenszyklus-Events und automatisieren Qualität, Sicherheit, Compliance. Überblick über lokale Hooks, serverseitige Konzepte und Tooling.

## Kategorien
| Typ | Auslöser | Beispiel |
|-----|---------|----------|
| Client (lokal) | Entwickleraktionen | Lint vor Commit |
| Server | Push-Empfang | Policy Enforcement |

## Speicherort
`.git/hooks/` enthält `.sample` Dateien. Suffix entfernen + ausführbar machen.

## Häufige Client Hooks
| Hook | Zeitpunkt | Nutzung |
|------|----------|---------|
| pre-commit | Vor Commit (Index Snapshot) | Lint / Format / Quick Tests |
| commit-msg | Nach Message-Eingabe | Konvention prüfen |
| pre-push | Vor Netzwerktransfer | Schnelle Tests |
| post-merge | Nach Merge | Abhängigkeiten installieren |
| prepare-commit-msg | Vor Editor | Template einfügen |

## Einfaches pre-commit
```bash
#!/usr/bin/env bash
eslint . || exit 1
```

## Commit-Message Check
Regex-basiert (Conventional Commits) via commit-msg Hook.

## Hooks teilen
Lokal nicht versioniert. Lösungen:
1. Husky / Lefthook / pre-commit
2. Eigenes `hooks/` + Symlink

### Husky Beispiel
```bash
npx husky add .husky/pre-commit "npm test"
```

### Python pre-commit Framework
Config + `pre-commit install`.

## Serverseitige Hooks
`pre-receive`, `update`, `post-receive` – häufig durch Plattform ersetzt (Push Rules, Actions).

## Automatisieren
- Lint & Format
- Typprüfung
- Secret Scan
- Schnelle Unit-Tests
- Message-Konvention
- License Header

## Nicht in Hooks
- Lange Integrationstests
- Schwere Builds
- Deployments

## Fail Fast
Lokale Fehler früh blocken → CI bleibt grün.

## Sicherheit
Nur vertrauenswürdige Skripte. Versionen pinnen.

## Temporär umgehen
```bash
git commit --no-verify
```
Sparsam einsetzen.

## Performance
Dauer loggen; >3s demotivierend. Nur geänderte Dateien linten.

## Beispiel: Changed Files lint
Kurzskript mit `git diff --cached` Filter.

## Zusammenfassung
Hooks heben die Qualitätsschwelle an, verschieben Feedback nach links. Schnell, versionierbar, transparent halten.

## Nächste Schritte
- Team-Praktiken
- Submodule & große Repos

---
**Key Commands**
```bash
git config core.hooksPath hooks
chmod +x .git/hooks/<hook>
```
