# Créer et Changer de Branche

## Pourquoi les Branches ?
Isolation de travail. Permet d'expérimenter sans casser `main`.

## Créer une Branche
```bash
git branch feature/auth
```
Ne change pas encore de branche.

## Créer + Basculer (Raccourci)
```bash
git checkout -b feature/auth
# ou moderne
git switch -c feature/auth
```

## Basculer Entre Branches
```bash
git checkout main
# ou
git switch main
```

## Lister Branches
```bash
git branch          # local
git branch -a       # local + distantes
git branch -vv      # suivi + dernier commit
```

## Nommer les Branches
Bonnes pratiques :
- clair et court
- verbe ou scope
- éviter caractères spéciaux

Exemples :
```
feature/payment-refactor
fix/login-timeout
chore/upgrade-deps
```

## Suivi d'Une Branche Distante
Après fetch/pull :
```bash
git checkout -b feature/auth origin/feature/auth
# ou directement si existe déjà
git switch feature/auth
```

## Voir la Branche Courante
```bash
git status
# ou
git branch --show-current
```

## Changer Avec Travail Non Commité
Si modifications en cours :
- commit
- stash
- ou abandonner

```bash
git stash push -m "wip ui"
git switch main
git stash pop
```

## Supprimer une Branche
```bash
git branch -d feature/auth      # fusionnée
git branch -D feature/ancienne  # forcer
```

## Mettre à Jour par Rapport à main
```bash
git checkout feature/auth
git fetch origin
git rebase origin/main
```
Ou merge :
```bash
git merge origin/main
```

## Conventions d'Équipe (Exemple)
| Préfixe | Usage |
|---------|-------|
| feature | Nouvelle capacité |
| fix     | Correction bug |
| chore   | Maintenance |
| refactor| Changement interne |
| docs    | Documentation |

## Conflits Fréquents
- Branches longues → rebase plus souvent
- Messages de commit vagues → historique opaque

## Résumé
Branches = lignes de travail isolées. Crée, travaille, synchronise, termine (merge/supprime). Garder court et clair.
