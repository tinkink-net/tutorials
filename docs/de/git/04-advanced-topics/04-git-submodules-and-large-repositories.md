# Git Submodule und große Repositories

## Einführung
Submodule betten ein Repo in ein anderes. Nützlich für fest versionierte Abhängigkeiten – riskant bei falscher Nutzung. Hier: Wann verwenden, Management, Alternativen.

## Wann geeignet / ungeeignet
| Geeignet | Ungeeignet |
|----------|-----------|
| Version-Pinning gemeinsamer Bibliothek | Häufige, gekoppelte Änderungen |
| Externe, vendored Dependency | Bedarf atomarer Cross-Repo Commits |
| Rechtliche/Audit-Isolation | Team ungeübt mit Submodule-Fluss |

## Hinzufügen
```bash
git submodule add https://github.com/vendor/lib-a external/lib-a
git commit -m "Add lib-a submodule"
```
`.gitmodules` entsteht.

### .gitmodules Beispiel
```
[submodule "external/lib-a"]
  path = external/lib-a
  url = https://github.com/vendor/lib-a
```

## Klonen mit Submodulen
```bash
git clone https://github.com/org/app.git
cd app
git submodule update --init --recursive
```
Oder direkt:
```bash
git clone --recurse-submodules <url>
```

## Aktualisieren
```bash
cd external/lib-a
git fetch
git checkout v2.4.0
cd ../..
git add external/lib-a
git commit -m "Bump lib-a to v2.4.0"
```
`git diff --submodule` liefert Kurzinfo.

## Entfernen
```bash
git submodule deinit -f external/lib-a
rm -rf .git/modules/external/lib-a
git rm -f external/lib-a
git commit -m "Remove lib-a submodule"
```

## Stolpersteine
| Problem | Ursache | Lösung |
|---------|---------|--------|
| Detached HEAD im Submodule | Frischer Clone | Branch anlegen vor Änderung |
| Pointer-Update vergessen | Nur im Submodule commit | Parent-Repo Pfad stage |
| Verschachtelungschaos | Rekursive Submodule | `--recursive` oder Vereinfachung |
| .gitmodules Konflikte | Gleichzeitige Edits | Koordination / Rebase früh |

## Alternativen für große Codebasen
| Strategie | Beschreibung |
|----------|--------------|
| Monorepo | Einheitliche Historie + Tooling |
| Subtree | Code einbetten, weniger Overhead |
| Paketmanager | Publizieren + Versionieren |
| Polyrepo + CI Orchestration | Lose Kopplung, Pipelines verbinden |

### Subtree Kurz
```bash
git subtree add --prefix=vendor/lib-a https://github.com/vendor/lib-a main --squash
```
Update:
```bash
git subtree pull --prefix=vendor/lib-a https://github.com/vendor/lib-a main --squash
```

## Performance-Tipps
- Shallow Clone in CI: `git clone --depth 20`
- Partial Clone (Git ≥2.19):
```bash
git clone --filter=blob:none --sparse <url>
```
- Sparse Checkout:
```bash
git sparse-checkout init --cone
git sparse-checkout set src/ docs/
```

## Status auditieren
```bash
git submodule status --recursive
```

## Sicherheit
- Quellcode auditieren
- Auf Tag/Commit pinnen (kein floating branch)
- Supply-Chain Advisories verfolgen

## Zusammenfassung
Submodule erzwingen explizites Version-Pinning, fügen aber Reibung hinzu. Bewusst einsetzen; für breitere Integration Subtree, Packages oder Monorepo evaluieren.

## Nächste Schritte
- Hooks & Automation
- Team-Best-Practices

---
**Key Commands**
```bash
git submodule add <url> <path>
git submodule update --init --recursive
git diff --submodule
git submodule status --recursive
```
