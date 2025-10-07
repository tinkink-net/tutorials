# Travailler avec des Dépôts Distants

## Concepts
| Terme | Description |
|-------|-------------|
| remote | Pointeur nommé vers une URL |
| origin | Nom par défaut principal |
| upstream | Source originale d'un fork |

## Ajouter un Remote
```bash
git remote add origin git@github.com:org/app.git
```

## Lister
```bash
git remote -v
```

## Modifier URL
```bash
git remote set-url origin git@github.com:org/app.git
```

## Récupérer (fetch)
```bash
git fetch origin
```
Met à jour refs sans fusionner.

## Pull = Fetch + Merge
```bash
git pull origin main
```
Recommandé : rebase propre :
```bash
git pull --rebase origin main
```

## Pousser
```bash
git push origin feature/auth
```
Première fois (définir upstream) :
```bash
git push -u origin feature/auth
```

## Supprimer Remote
```bash
git remote remove old
```

## Voir Branches Distantes
```bash
git branch -r
```

## Suivre Remote Après Fetch
```bash
git checkout -b feature/x origin/feature/x
```

## Prune Références Obsolètes
```bash
git fetch --prune
```

## Travailler avec un Fork
```
origin   → ton fork
upstream → repo source
```
Configurer :
```bash
git remote add upstream git@github.com:source/app.git
```
Synchroniser :
```bash
git fetch upstream
git checkout main
git merge upstream/main
# ou
git rebase upstream/main
```

## Tags Distants
```bash
git push origin v1.2.0
```

## Vérifier Diff Local vs Remote
```bash
git fetch origin
git log --oneline origin/main..main
```

## Renommer Remote
```bash
git remote rename origin primary
```

## Sécurité Clés SSH
- Utiliser clés par machine
- Passphrase recommandée
- Agent SSH chargement automatique

## Erreurs Courantes
| Problème | Solution |
|----------|----------|
| Rejet (non fast-forward) | Fetch + rebase/merge |
| Remote disparu | Vérifier accès/URL |
| Auth échoue | Clé SSH ou token |

## Bonnes Pratiques
- Nommer clairement (éviter multiples origin)
- Prune régulier
- Synchroniser avant gros refactor

## Résumé
Remote = référence d'URL. Cycle : fetch → rebase/merge → push. Maitriser pour collaboration fluide.
