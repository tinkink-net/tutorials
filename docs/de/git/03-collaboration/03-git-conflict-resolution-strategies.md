# Strategien zur Lösung von Git-Konflikten

## Einführung
Konflikte sind unvermeidlich in kollaborativer Entwicklung. Dieser Leitfaden geht über Grundlagen hinaus: Muster, Entscheidungslogik und Tooling für schnelle, sichere Auflösung.

## Konflikttypen
| Typ | Beispiel | Ursache |
|-----|----------|---------|
| Content | Gleiche Zeilen geändert | Parallele Edits |
| Add/Delete | Datei in einem gelöscht, im anderen geändert | Divergierende Refactors |
| Rename/Edit | Umbenannt + editiert | Asynchrone Großänderung |
| Binary | Bild beidseitig geändert | Nicht zeilenweise verschmelzbar |
| Directory/File | Verzeichnis ↔ Datei | Struktur-Umbau |

## Allgemeiner Ablauf
```
Erkennen → Klassifizieren → Intention klären → Zusammenführen / wählen → Testen → Commit
```

## Schnelle Inspektion
```bash
git status
git diff --name-only --diff-filter=U
git diff --merge
```

## Ours vs Theirs
```bash
# Unsere Version behalten
git checkout --ours path/file.txt
# Deren Version behalten
git checkout --theirs path/file.txt
git add path/file.txt
```
Sparsam nutzen – fachliche Korrektheit prüfen.

## Strukturierte manuelle Zusammenführung
1. Beide Seiten vollständig lesen
2. Intention identifizieren (Fachlogik, Format, Hotfix?)
3. Zielverhalten rekonstruieren
4. Marker entfernen & Tests ausführen
5. `git add` → Commit-Fortsetzung

## Vorbeugung durch kleinere Commits
```bash
git add -p
```
Granulare, kohärente Commits reduzieren Konfliktfläche.

## Strategisches Rebase für Langläufer
```bash
git fetch origin
git rebase origin/main
```

## Tools
| Tool | Kommando | Hinweis |
|------|----------|---------|
| VS Code | Merge-Editor | Klarer Vergleich |
| Meld | `git mergetool` | Visuelle Diff/Merge |
| Beyond Compare | `git mergetool` | Kommerziell |
| IntelliJ | Gruppiert Konflikte | IDE-integriert |

## Konfliktmarker-Beispiel
```
<<<<<<< HEAD (current: main)
applyDiscount(cart, 0.10)
=======
applyDiscount(cart, discountRate())
>>>>>>> feature/dynamic-discount
```
Entscheidung: Dynamik mit Fallback:
```js
applyDiscount(cart, discountRate() ?? 0.10)
```

## Binärkonflikte
```bash
git checkout --theirs assets/logo.png
git add assets/logo.png
```
Oder Asset regenerieren.

## Abbrechen / Fortsetzen
```bash
git merge --abort
git rebase --abort
git rebase --continue
```

## Rerere (Reuse Recorded Resolution)
```bash
git config --global rerere.enabled true
```
Merkt sich Lösungen und wendet sie wieder an.

## Präventive Maßnahmen
| Technik | Nutzen |
|---------|--------|
| Einheitliches Formatting | Stil-Diffs weg |
| Kleine PRs | Weniger Überlappung |
| Frühe Branch-Synchronisation | Geringere Divergenz |
| Architektur-Abstimmung | Doppelarbeit verhindern |
| Feature Flags | Frühes Mergen unfertiger Arbeit |

## Sicherheitsnetz
```bash
./run-tests.sh
git diff --check
```

## Schlechte Auflösung zurücknehmen
```bash
git reflog
git reset --hard <hash>
```

## Zusammenfassung
Konflikte signalisieren parallele Innovation. Mit Systematik, Hygiene und Tools schrumpfen sie zu kleinen Unterbrechungen.

## Nächste Schritte
- Undo-Strategien (`git-reset-revert-and-checkout-explained.md`)
- Temporäre Änderungen (`git-stash-and-temporary-changes.md`)

---
**Key Commands**
```bash
git diff --name-only --diff-filter=U
git checkout --ours <file>
git checkout --theirs <file>
git merge --abort
git rebase --continue
```
