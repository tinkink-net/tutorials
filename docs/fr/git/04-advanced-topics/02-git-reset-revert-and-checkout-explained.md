# Git Reset, Revert et Checkout Expliqués

## Tableau Comparatif
| Commande | Réécrit Historique | Portée | Usage |
|----------|--------------------|--------|-------|
| reset    | Oui (local)        | HEAD / index / WD | Refaire commits locaux |
| revert   | Non (ajoute commit)| HEAD    | Annuler publiquement |
| checkout | Non                | HEAD ou fichiers | Naviguer / restaurer |

## git reset
```bash
git reset --soft <hash>
git reset --mixed <hash>   # défaut
git reset --hard <hash>
```
| Mode | Effet |
|------|-------|
| soft | Déplace HEAD seulement |
| mixed| HEAD + index |
| hard | HEAD + index + WD |

## git revert
Crée un commit inverse.
```bash
git revert <hash>
```
Merge revert :
```bash
git revert -m 1 <merge_hash>
```

## git checkout
Detached HEAD :
```bash
git checkout <hash>
```
Restaurer fichier :
```bash
git checkout HEAD -- src/app.js
```

## Scénarios
| Objectif | Commande |
|----------|----------|
| Retirer dernier commit local | reset --soft HEAD~1 |
| Annuler commit partagé | revert <hash> |
| Inspecter état ancien | checkout <hash> |

## Visual Mental
```
reset  → repositionne pointeurs
revert → ajoute anti-commit
checkout → déplace HEAD / récupère contenu
```

## Sécurité
- Éviter `--hard` sans sauvegarde
- Revert préserve traçabilité

## Reflog Sauvetage
```bash
git reflog
git branch rescue <hash>
```

## Alternatives Modernes
```bash
git switch <branch>
```

## Résumé
Choisir selon visibilité : reset (réécriture), revert (trace), checkout (navigation). Minimiser opérations destructives.
