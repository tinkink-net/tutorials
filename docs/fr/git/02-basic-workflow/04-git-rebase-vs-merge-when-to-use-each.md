# Rebase vs Merge : Quand Utiliser Chaque

## Vue Rapide
| Action | Historique | Simplicité | Lisibilité Chronologique |
|--------|------------|------------|--------------------------|
| merge  | Préserve branches | Haute | Moyen (branches visibles) |
| rebase | Réécrit commits | Moyen | Haute (linéaire) |

## git merge
- Avantages : sûr, non destructif
- Inconvénient : commits de merge nombreux

## git rebase
- Avantages : historique net, bisect plus simple
- Inconvénient : réécrit, dangereux si déjà poussé

## Exemple Merge
```
A---B---C main
     \
      D---E feature
```
Après merge :
```
A---B---C---M
         \ D---E
```

## Exemple Rebase
Rebase feature sur main :
```
A---B---C main
         \
          D'--E'
```
Puis fast-forward.

## Workflow Typique Rebase Avant Merge
```bash
git checkout feature/x
git fetch origin
git rebase origin/main
# résoudre si besoin
git checkout main
git merge feature/x   # fast-forward
```

## Quand Préférer Merge
| Contexte | Raison |
|----------|--------|
| Historique auditable | Traces exactes |
| Longue feature collaborative | Moins de réécriture |
| Débutants | Réduction erreurs |

## Quand Préférer Rebase
| Contexte | Raison |
|----------|--------|
| Commits WIP bruyants | Squash nettoie |
| Repo open source exige lineaire | Politique standard |
| Bisect fréquent | Menos bruit |

## Rebase Interactif (Nettoyage)
```bash
git rebase -i HEAD~5
# pick / squash / reword
```

## Règle d'Or
Ne jamais rebase une branche déjà partagée sans coordination.

## Annuler un Rebase
```bash
git rebase --abort
```

## Conflits en Rebase
Chaque commit rejoué peut générer conflit → résoudre → `git rebase --continue`.

## Stratégie Mixte
1. Rebase local pour nettoyer
2. Merge dans main (pas fast-forward) pour conserver contexte

## Résumé
Merge = sécurité et contexte. Rebase = propreté et linéarité. Choisir selon équipe, audit, complexité.
