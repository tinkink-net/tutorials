# Git Best Practices für Team-Kollaboration

## Einführung
Über Befehle hinaus braucht erfolgreiche Zusammenarbeit gemeinsame Disziplin. Dieser Leitfaden listet pragmatische, durchsetzbare Praktiken.

## Philosophie
1. Klarheit > Cleverness
2. Kleine Änderungen liefern schneller
3. Automatisierung > manuelles Policing
4. Reproduzierbarkeit = Zuverlässigkeit

## Branch-Strategien
| Strategie | Beschreibung | Einsatz |
|-----------|--------------|---------|
| Trunk-Based | Kurze Branches, schnelles Merge in `main` | Hohe Geschwindigkeit + reifes CI |
| GitHub Flow | Feature → PR → Merge → Deploy | SaaS / Continuous Delivery |
| Git Flow | `develop`, Release-, Hotfix-Branches | Versionierte Produkte |
| Release Train | Zeitbox-Merges + Releases | Multi-Team-Koordination |

Wähle das einfachste funktionierende Modell.

## Commit Message Schema (Conventional)
```
<type>(<scope>): <summary>

<body>

<footer>
```
Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`.
Automatische Changelogs werden möglich.

## Durchsetzung per Hooks / CI
Beispiel commit-msg Hook mit commitlint.

## PR Hygiene
| Praxis | Ziel |
|--------|-----|
| Max Lines | ~400 (soft) |
| Review Turnaround | < 24h |
| Checks | 100% grün |
| Issue verlinkt | 100% |

## Lange Branches vermeiden
- Feature Flags
- Kompatibilitäts-Layer
- Dark Launches
- Frühe Rebases

## Hotfix Ablauf
```bash
git checkout main
git pull
git checkout -b hotfix/critical-timezone
# fix + test
git push origin hotfix/critical-timezone
# PR → Merge → Tag → Deploy
```

## Releases taggen
```bash
git tag -a v2.3.0 -m "Release v2.3.0"
git push origin v2.3.0
```

## Schutz von Main
- Required Status Checks
- Reviews erforderlich
- Force Push verbieten
- (Optional) Lineare Historie
- Signierte Commits bei Bedarf

## Große Repos / LFS
- Binaries in Git LFS
- Sparse Checkout für große Monorepos
- CODEOWNERS für kritische Pfade

## .gitignore
Minimal + projektspezifisch, keine generierten Artefakte.

## Pre-Merge Checkliste
- [ ] Tests grün
- [ ] Lint/Format sauber
- [ ] Security Scan ok
- [ ] Keine offenen TODO ohne Ticket
- [ ] Doku bei Verhaltensänderung angepasst

## Policy History-Rewrites
| Aktion | Erlaubt? | Hinweis |
|--------|----------|--------|
| Rebase lokaler Feature-Branch | Ja | Vor dem Teilen |
| Force-Push geteilte Branches | Selten | `--force-with-lease` |
| Rebase geschützter Branch | Nein | Konsumenten brechen |
| Squash Merge | Situativ | Wenn Commit-Granularität egal |

## Anti-Patterns
| Pattern | Problem | Abhilfe |
|---------|---------|---------|
| Drive-by Force Push | Stört andere | Rechte einschränken |
| Gemischte Anliegen | Review schwer | Aufsplitten |
| Stilles Merge | Niedrige Sichtbarkeit | PR Reviews erzwingen |
| Direkt auf main | Prod-Risiko | Branch Protection |

## Dokumentationsanker
- CONTRIBUTING.md
- CODEOWNERS
- Architektur-Entscheidungen (ADR)
- Onboarding Cheatsheet

## Metriken
- Mean Time To Merge
- Anteil PR > 1000 LOC
- Flaky-Test-Rate
- Revert-Häufigkeit

## Zusammenfassung
Effektive Git-Kollaboration = soziale Absprachen + Automatisierung + Disziplin. Mache den guten Weg zum einfachen Weg.

## Nächste Schritte
- Hooks & Automation
- Reset / Revert Strategien

---
**Key Commands**
```bash
git tag -a <tag> -m "msg"
git push origin <tag>
git push origin --delete <branch>
```
