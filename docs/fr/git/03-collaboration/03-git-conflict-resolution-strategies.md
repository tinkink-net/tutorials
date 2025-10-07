# Stratégies de Résolution de Conflits Git

## Vue d'Ensemble
Les conflits signalent un travail parallèle. Objectif : préserver l'intention des deux côtés.

## Types Communs
| Type | Cause |
|------|------|
| Ligne éditée des deux côtés | Modif simultanée |
| Add/Delete | Un supprime, autre modifie |
| Rename/Edit | Renommage + changement |
| Binaire | Fichier non diffable modifié |
| Dir/File | Restructuration chemin |

## Processus Structuré
```
Identifier → Comprendre intentions → Fusionner logiques → Tester → Commit
```

## Diagnostic
```bash
git status
git diff --name-only --diff-filter=U
git diff --merge
```

## Choisir Ours / Theirs
```bash
git checkout --ours chemin/fichier
git checkout --theirs chemin/fichier
git add chemin/fichier
```
Ne pas appliquer en aveugle.

## Résolution Manuelle Exemple
```
<<<<<<< HEAD
calculateTotal(cart, 0.1)
=======
calculateTotal(cart, discountRate())
>>>>>>> feature/dynamic-discount
```
Fusion :
```js
calculateTotal(cart, discountRate() ?? 0.1)
```

## Commits Atomiques Aident
```bash
git add -p
```
Réduit surface future.

## Rebase Proactif
```bash
git fetch origin
git rebase origin/main
```

## Outils
| Outil | Atout |
|-------|------|
| VS Code Merge | Diff clair |
| Meld | Interface visuelle |
| Beyond Compare | Comparaison avancée |
| IntelliJ | Intégration IDE |

## Conflits Binaires
Choisir version ou régénérer :
```bash
git checkout --theirs assets/logo.png
```

## Abandonner
```bash
git merge --abort
git rebase --abort
```

## Continuer Rebase
```bash
git rebase --continue
```

## Rerere (Réutiliser Résolutions)
```bash
git config --global rerere.enabled true
```

## Prévention
| Pratique | Effet |
|----------|-------|
| Sync fréquent | Moins divergence |
| PR petites | Conflits plus simples |
| Format auto | Moins bruit |
| Communication refactor | Évite duplication |

## Sécurité Avant Commit
```bash
yarn test
git diff --check
```

## Récupérer Après Erreur
```bash
git reflog
git reset --hard <hash>
```

## Résumé
Conflits gérés méthodiquement = faible coût cognitif. Intention > ordre brut des lignes.
