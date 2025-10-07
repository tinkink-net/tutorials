# Git Stash et Changements Temporaires

## Pourquoi
Interruption rapide sans polluer l'historique. Snapshot volatile.

## Commandes de Base
```bash
git stash push -m "wip: formulaire login"
git stash list
git stash show -p stash@{0}
git stash apply stash@{0}
git stash drop stash@{0}
git stash pop
```

## Cibler Dossier
```bash
git stash push -m "ui" src/components/
```

## Inclure Non Suivis / Ignorés
```bash
git stash push -u   # untracked
git stash push -a   # untracked + ignored
```

## Partiel (Index)
```bash
git add -p
git stash push --staged -m "partiel"
```

## Appliquer vs Pop
- apply: conserve stash
- pop: applique puis supprime si succès

## Voir Détails
```bash
git stash show --name-only stash@{1}
```

## Nommer
`wip:` + domaine
```
wip: billing logic
wip: refactor http client
```

## Créer Branche Depuis Stash
```bash
git stash branch tmp-exp stash@{0}
```

## Nettoyer Régulièrement
Supprimer stashes obsolètes pour éviter accumulation.

## Cas d'Usage
| Situation | Stash ? |
|-----------|---------|
| Hotfix urgent | Oui |
| Expérimentation courte | Oui |
| Travail long | Préférer commits WIP |

## Flags
| Flag | Signification |
|------|--------------|
| -m | Message |
| -u | Inclure untracked |
| -a | Inclure ignorés |
| --staged | Uniquement index |

## Anti‑Patterns
| Pattern | Risque |
|---------|-------|
| Stockage longue durée | Oubli |
| Sans message | Ambigu |
| Pop impulsif | Perte données |

## Alternatives
| Besoin | Option |
|-------|-------|
| Partager progression | Commit WIP |
| Découper | Commits atomiques |
| Hypothèse longue | Branche dédiée |

## Résumé
`stash` = tampon transitoire. Utiliser pour interruptions, pas comme backlog caché.
