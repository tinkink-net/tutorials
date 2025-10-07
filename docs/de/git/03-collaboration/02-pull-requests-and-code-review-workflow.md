# Pull Requests und Code-Review-Workflow

## Einführung
Pull Requests (PRs) bündeln Änderungen, zeigen Diffs, triggern Automationen und ermöglichen Peer-Feedback. Dieser Leitfaden ist plattformneutral (GitHub/GitLab/Bitbucket ähnliche Konzepte).

## Warum PRs?
- Qualitäts-Gate (Tests, Lint, Security)
- Wissensaustausch
- Rückverfolgbarkeit / Audit-Trail
- Fördert kleinere, review-freundliche Einheiten

## Branch-Namensschema
| Typ | Muster | Beispiel |
|-----|--------|----------|
| Feature | `feature/<scope>` | `feature/payment-intents` |
| Bugfix | `fix/<issue-id>` | `fix/342-null-pointer` |
| Refactor | `refactor/<area>` | `refactor/auth-middleware` |
| Docs | `docs/<topic>` | `docs/api-pagination` |

## Lebenszyklus
```
Plan → Branch → Commit → Sync → Open PR → Review → Update → Approve → Merge → Clean up
```

## PR erstellen (GitHub CLI Beispiel)
```bash
git checkout -b feature/user-deactivation
# ... commits ...
git push -u origin feature/user-deactivation
gh pr create --fill --base main --head feature/user-deactivation
```

## Qualitäts-Checkliste
- Klarer, imperativer Titel
- Kurzbeschreibung: Problem → Lösung → Hinweise
- Screenshots/GIF bei UI
- Issue-Verknüpfung (`Fixes #123`)
- Test-Notizen / Abdeckung
- Rollback-Überlegung

### Beschreibungsvorlage
```
## Summary
Implementiert Soft-Delete Deaktivierung.

## Changes
- `status` Spalte
- Service-Methode `deactivateUser()`
- Migration bestehender Nutzer

## Testing
- Unit-Tests
- Manueller API Test (POST /users/:id/deactivate)

## Rollback
Revert migration 202510071230_add_status_column.sql
```

## Review Best Practices
Reviewer:
1. Intention vor Stil
2. Korrektheit, Sicherheit, Performance, Lesbarkeit
3. Vorschlagen, nicht befehlen (Policy-Ausnahmen)
4. Nur produktionsreif approven

Autor:
1. Klein halten (< ~400 Add-Lines)
2. Jede Anmerkung beantworten
3. Kein willkürliches Force-Push nach Start des Reviews (finales Squash ok)
4. CI grün halten

## Feedback einarbeiten
```bash
git commit -m "Refactor: extract validation helper"
git push
```

## Draft vs Ready
Draft während Stabilisierung, Ready nach Selbstreview + grüner CI.

## Nützliche Automationen
| Automation | Zweck |
|------------|-------|
| CI Pipeline | Tests/Lint/Build |
| Static Analysis | Security/Qualität |
| Commit-Konvention | Nachrichtenstil erzwingen |
| Size Label | Großes PR markieren |
| Auto Assign | Review-Latenz senken |

## Merge-Strategien
| Strategie | Beschreibung | Einsatz |
|-----------|--------------|---------|
| Squash | Alle Commits zu einem | Kleine / laute Historie |
| Rebase & Merge | Lineare Historie | Teams mit Linear-Präferenz |
| Merge Commit | Kontext behalten | Größere Feature-Bündel |

Rebase vor Merge (Policy):
```bash
git fetch origin
git rebase origin/main
git push --force-with-lease
```

## Anti-Pattern
| Muster | Problem |
|--------|---------|
| Riesiges PR | Schwer reviewbar → Fehler |
| Refactor + Feature gemischt | Intention unklar |
| Force-Push nach Review | Invalideiert Feedback |
| Fehlende Beschreibung | Reviewer raten |
| CI rot ignoriert | Zeitverschwendung |

## Aufräumen nach Merge
```bash
git checkout main
git pull origin main
git branch -d feature/user-deactivation
git push origin --delete feature/user-deactivation
```

## Team-Metriken
- Review Turnaround
- PR-Größenverteilung
- Reopened / Reverts
- Squash vs Merge Verhältnis

## Zusammenfassung
Strukturierte PRs beschleunigen sichere Auslieferung: Klarheit, kleine Einheiten, Automatisierung, respektvolles Feedback.

## Nächste Schritte
- Konfliktstrategien
- Team-Best-Practices

---
**Key Commands**
```bash
git push -u origin <branch>
git branch -d <branch>
git push origin --delete <branch>
```
