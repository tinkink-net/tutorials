# Git Reset, Revert und Checkout erklärt

## Einführung
Richtiges „Undo“ vermeidet Datenverlust und historische Inkonsistenz. Vergleich von `reset`, `revert`, `checkout` (plus `restore` / `switch`).

## Schnellvergleich
| Kommando | Wirkung | Historie umgeschrieben? | Typischer Zweck |
|----------|--------|-------------------------|-----------------|
| reset | Bewegt Branch-Ref / Index | Ja (nur lokal) | Lokale Commits neu ordnen |
| revert | Neuer Commit kehrt Patch um | Nein | Öffentliches Undo |
| checkout (Datei) | Working Tree ersetzen | Nein | Lokale Änderungen verwerfen |
| checkout (Branch) | HEAD wechseln | Nein | Branch-Switch |
| restore | Moderne Dateiwiederherstellung | Nein | Sicheres Unstage/Restore |
| switch | Moderner Branchwechsel | Nein | Klarere Semantik |

## Reset Modi
```bash
git reset --soft HEAD~1
git reset --mixed HEAD~1   # Default
git reset --hard HEAD~1
```
Soft: Inhalte gestaged lassen. Mixed: entstagen. Hard: alles verwerfen.

## Branch-Pointer verschieben
```bash
git reset --hard <commit>
```
Nicht auf geteilten Branches!

## Letzten Commit ändern
```bash
git commit --amend -m "Refine API error handling"
```
Nach Push nur mit Absprache.

## Revert
```bash
git revert <commit>
git revert <old>..<new>
```
Merge Revert:
```bash
git revert -m 1 <merge-hash>
```

## Lokale Dateiänderungen verwerfen
```bash
git restore path/file.txt
# Unstage
git restore --staged path/file.txt
```
(Alt: `git checkout -- file`)

## Branch wechseln
```bash
git switch main
git switch -c feature/new-dashboard
```

## Verlorene Commits retten
```bash
git reflog
git checkout <hash>
git switch -c recovery/<topic>
```

## Interaktives Rebase für Cleanup
```bash
git rebase -i HEAD~5
```

## Entscheidungshelfer
| Situation | Verwende |
|-----------|----------|
| Letzte 2 Commits neu bündeln | `git reset --soft HEAD~2` + amend |
| Öffentliches Undo | `git revert <hash>` |
| Unstaged Änderungen verwerfen | `git restore <file>` |
| Falsch gestaged | `git restore --staged <file>` |
| Lokal zu gutem Stand zurück | `git reset --hard <hash>` |
| Alten Commit inspizieren | `git checkout <hash>` |

## Sicherheits-Tipps
1. Mit `--hard` vorsichtig (vorher stash?)
2. Öffentlich = revert statt reset
3. Branches als Sicherheitsnetz
4. `reflog` kennen

## Zusammenfassung
Wähle minimal invasive Option: Reset (Schreiben), Revert (additiver Undo-Commit), Restore/Checkout (Arbeitsbaum).

## Nächste Schritte
- Stash
- Hooks & Automation

---
**Key Commands**
```bash
git reset --soft|--mixed|--hard <ref>
git revert <commit>
git restore [--staged] <file>
git reflog
```
