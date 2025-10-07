# Fusionner des Branches et Résoudre les Conflits

## Objectif
Intégrer le travail de ta branche dans `main` (ou autre) proprement.

## Préparer la Fusion
```bash
git checkout main
git pull origin main
```

## Fusion Fast-Forward
Si aucun commit divergent :
```bash
git merge feature/auth
```
Met juste à jour le pointeur.

## Fusion avec Commit de Merge
Branches divergentes :
```bash
git merge feature/auth
```
Crée un commit de merge.

## Prévenir Conflits
- Synchroniser souvent (`git fetch && git rebase origin/main`)
- Commits petits
- Éviter refactors massifs parallèles

## Détecter Conflits
Git insère marqueurs :
```
<<<<<<< HEAD
version main
=======
version feature
>>>>>>> feature/auth
```
Résoudre en choisissant ou combinant.

## Outils
| Outil | Avantage |
|-------|----------|
| VS Code Merge | Interface claire |
| `git mergetool` | Intégration externe |
| Diff 3 voies | Contexte base |

## Résoudre et Continuer
```bash
git add chemin/fichier
```
Après tous résolus :
```bash
git commit    # si merge en cours
```

## Annuler Merge en Cours
```bash
git merge --abort
```

## Rebase vs Merge
Rebase pour un historique linéaire avant merge :
```bash
git checkout feature/auth
git fetch origin
git rebase origin/main
```
Puis fusion fast-forward.

## Conflits Binaires
Pas de fusion automatique. Remplacer fichier voulu :
```bash
git checkout --theirs image.png  # prendre version branche fusionnée
```

## Vérifications Post-Fusion
```bash
git log --oneline --graph -n 5
git diff origin/main..main
```

## Pousser
```bash
git push origin main
```

## Stratégies de Conflit
| Situation | Tactique |
|-----------|----------|
| Même ligne logique | Combiner intentions |
| Refactor vs bugfix | Garder refactor + réappliquer fix |
| Formatage massif | Appliquer format après merge |

## Résumé
1. Mettre `main` à jour
2. Rebase ou merge selon politique
3. Résoudre soigneusement
4. Vérifier tests
5. Pousser
