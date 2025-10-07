# Git Stash und temporäre Änderungen

## Einführung
`git stash` ermöglicht es dir, nicht commitete Arbeit *beiseite zu legen*, damit du Aufgaben wechseln, Updates ziehen oder Notfallkorrekturen vornehmen kannst, ohne unvollständigen Code zu committen.

## Was Stash speichert
Standardmäßig: Modifizierte verfolgte Dateien + gestagete Änderungen. Optional nicht verfolgte / ignorierte Dateien.

## Grundlegende Verwendung
```bash
git stash push -m "WIP: Formularvalidierung"
git stash list
```
Beispieleintrag in der Liste:
```
stash@{0}: On feature/form: WIP: Formularvalidierung
```

## Arbeit wiederherstellen
```bash
git stash apply stash@{0}   # Stash-Kopie behalten
git stash pop               # Neuesten anwenden und dann verwerfen
```

## Nicht verfolgte Dateien einbeziehen
```bash
git stash push -u -m "WIP: Konfigurationsprototyp hinzufügen"
```
Ignorierte Dateien einbeziehen:
```bash
git stash push -a -m "WIP: vollständige Umgebung"
```

## Teilweiser Stash (interaktiv)
```bash
git stash push -p -m "WIP: ausgewählte Änderungen"
```

## Stash-Diff anzeigen
```bash
git stash show stash@{1}
git stash show -p stash@{1}   # Vollständiger Patch
```

## Löschen / Leeren
```bash
git stash drop stash@{2}
git stash clear   # Gefährlich: entfernt alle Stashes
```

## Auf einen anderen Branch anwenden
```bash
git checkout feature/new-ui
git stash apply stash@{0}
```

## Einen Branch aus einem Stash erstellen
```bash
git stash branch feature/resume stash@{0}
```

## Übliche Muster
| Szenario | Befehl |
|----------|---------|
| Änderungen pullen aber WIP behalten | `git stash push -m "WIP" && git pull && git stash pop` |
| Hotfix auf main | Stash → wechseln → beheben → zurückkehren → pop |
| Arbeitsbereich für Build säubern | Nicht commitete Störungen stashen |

## Wann man Stash NICHT verwenden sollte
- Langzeitspeicherung (stattdessen einen WIP-Commit erstellen)
- Teilen mit anderen (einen Branch verwenden)
- Arbeiten mit vielen Binärdateien (kann zu großem Objektumsatz führen)

## Alternativen
| Bedarf | Alternative |
|------|------------|
| Sicherer Checkpoint | Commit zu temporärem Branch |
| Experimentelles Ausprobieren | `feature/spike-*` Branch |
| Schnelles Verwerfen | `git restore` |

## Fehlerbehebung
| Problem | Lösung |
|-------|----------|
| Konflikt beim Anwenden | Auflösen, `git add`, fortfahren (Stash bereits angewendet) |
| Verlorener Stash nach Pop | Wiederherstellen: `git fsck --lost-found` (manchmal) |
| Versehentlich nicht verfolgte wichtige Datei gestasht | In Zukunft Branches bevorzugen |

## Zusammenfassung
Stash ist ein taktisches Werkzeug für *kurzlebige* Unterbrechungen. Verwende es bedacht; bevorzuge explizite Commits für dauerhafte Fortschritte.

## Nächste Schritte
- Rückgängigmachen von Operationen (`git-reset-revert-and-checkout-explained.md`)
- Tiefergehende Konfliktworkflows (`git-conflict-resolution-strategies.md`)

---
**Wichtige Befehle**
```bash
git stash push -m "msg"
git stash list
git stash show -p stash@{n}
git stash pop
git stash branch <n> stash@{n}
```
