# Git Rebase vs Merge: Wann was?

## Einführung
`merge` und `rebase` integrieren Änderungen, aber mit unterschiedlicher Historienform. Das Verständnis hilft, Klarheit + geringe Integrationskosten zu vereinen.

## Kerndifferenz
| Operation | Wirkung | Historie | Commit-IDs | Typische Nutzung |
|-----------|--------|----------|------------|------------------|
| Merge | Fügt Merge-Commit mit 2 Eltern hinzu | Verzweigt | Unverändert | Feature-Integration |
| Rebase | Spielt Commits auf neues Basis-Top um | Linear | Neu (umgeschrieben) | Feature vor Merge aktualisieren |

## Visualisierung
```
     A---B  (feature)
    /
---o---C---D (main)
```
Merge:
```
---o---C---D----M
        \   /
         A-B
```
Rebase:
```
---o---C---D---A'---B'
```

## Vor- & Nachteile
### Merge
+ Kontext der Integration sichtbar
+ Keine Umschreibung
− Mehr Rauschen
− Graph komplex

### Rebase
+ Saubere, lineare Historie
+ Einfacheres `git bisect`
− Umschreibt Hashes
− Gefährlich bei geteilten Branches
− Wiederholte Konflikte möglich

## Rebase Regeln (Sicherheit)
1. Nicht rebasen, wenn schon geteilt (ohne Absprache)
2. Lokal nutzen bevor PR
3. Nach Review-Beginn sparsam einsetzen

## Feature aktualisieren
```bash
git checkout feature/api-auth
git fetch origin
git rebase origin/main
# Konflikte lösen
git push --force-with-lease
```

## Interaktives Cleanup
```bash
git rebase -i HEAD~6
```
Aktionen: pick / squash / fixup / reword / edit

## Wann Merge?
- Große kollaborative Features
- Release-/Hotfix-Flows
- Audit von Integrationszeitpunkten

## Wann Rebase?
- Aktualisierung vor PR
- Aufräumen / Squash von Explorations-Commits
- Linearer Verlauf bevorzugt

## Hybrid Workflow
1. Feature-Branch
2. Regelmäßig `git fetch && git rebase origin/main`
3. PR öffnen
4. Merge mit `--no-ff` (Integration protokollieren)

## Konflikt während Rebase
```bash
git add <file>
git rebase --continue
```
Weitere:
```bash
git rebase --skip
git rebase --abort
```

## Merge-lastige Historie linearisieren
```bash
git rebase --rebase-merges origin/main
```

## Goldene Regel
Keine öffentlichen Commits rebasen ohne Zustimmung. Im Zweifel: Merge.

## Entscheidungs-Tabelle
| Ziel | Bevorzugt | Grund |
|------|-----------|------|
| Integrationskontext | Merge | Sichtbare Knoten |
| Lineare Lesbarkeit | Rebase | Navigation |
| Commit-Narrativ veredeln | Interaktives Rebase | squash/reword |
| Feature vor PR bereinigen | Rebase | Weniger Merge-Rauschen |
| Schnelle Rückrollbarkeit | Merge | Mehr Kontext |

## Fazit
Rebase für laufende Entwicklung & Aufräumen; Merge für Integration und Ereignis-Tracking.

---
**Key Commands**
```bash
git rebase origin/main
git rebase -i HEAD~N
git merge <branch>
git push --force-with-lease
```
