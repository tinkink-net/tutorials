# Pull Requests et Workflow de Revue de Code

## Objectif
Introduire des changements de façon contrôlée avec validation par pairs.

## Cycle PR
1. Créer branche
2. Commits atomiques
3. Push
4. Ouvrir PR (description claire)
5. Revue / ajustements
6. Tests passent + checks verts
7. Merge
8. Nettoyage branche

## Qualité d'une PR
| Élément | Bonnes Pratiques |
|---------|------------------|
| Titre | Verbe + scope : "feat: ajout cache utilisateur" |
| Description | Contexte + motivation + résumé solution |
| Taille | < 300 LOC si possible |
| Tests | Ajoutés / mis à jour |
| Screenshots | Pour UI/visuel |

## Modèle de Description (Exemple)
```
### Objet
Brève phrase.

### Contexte
Pourquoi ce changement ?

### Solution
Points clés.

### Tests
- [ ] Cas nominal
- [ ] Erreurs gérées

### Notes
Risques, follow-up éventuels.
```

## Rebase Avant Merge
```bash
git fetch origin
git rebase origin/main
```
Résoudre conflits tôt.

## Types de Merge de PR
| Type | Effet |
|------|-------|
| Merge commit | Conserve structure |
| Squash | Unifie commits WIP |
| Rebase (platform) | Historique linéaire |

## Quand Squash
- Série de commits de travail
- Historique bruité

## Revue Efficace (Reviewer)
| Aspect | Conseil |
|--------|---------|
| Contexte | Lire description avant diff |
| Focus | Architecture, logique, edge cases |
| Commentaires | Précis + suggest si possible |
| Empathie | Ton constructif |

## Répondre au Feedback (Auteur)
- Regrouper modifications
- Marquer résolu quand traité
- Clarifier si désaccord (données > opinion)

## Checks Automatisés
- Lint / format
- Tests unitaires
- Build
- Sécurité (dépendances)

## Draft PR
Utiliser pour feedback précoce.

## Eviter
| Anti-pattern | Problème |
|--------------|----------|
| PR massive | Revue superficielle |
| Force push après review sans note | Perte de contexte |
| Absence de tests | Régressions |

## Nettoyage Après Merge
```bash
git branch -d feature/x
git push origin :feature/x
```
Ou paramètre auto-delete.

## Métriques Saines
| Indicateur | Signal |
|-----------|--------|
| Temps moyen d'ouverture | < 24h |
| Nombre reviewers | 1–2 suffisent |
| Rewrites tardifs massifs | Process à ajuster |

## Résumé
PR = capsule narrative d'un changement. Clarté + petites unités + feedback structuré = flux rapide et qualité stable.
