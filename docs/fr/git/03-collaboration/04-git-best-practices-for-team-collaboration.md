# Bonnes Pratiques Git pour la Collaboration

## Objectif
Qualité durable + historique clair + friction réduite.

## Principes
| Principe | Bénéfice |
|----------|----------|
| Branches courtes | Conflits réduits |
| Commits atomiques | Reverts simples |
| Revue précoce | Ajustement rapide |
| Automatisation | Constance |
| Transparence | Confiance |

## Nommage Branches
```
feature/<scope>-<résumé>
fix/<issue>-<bug>
chore/<tâche>
refactor/<zone>
docs/<sujet>
release/<version>
```

## Messages de Commit (Convention)
```
<type>(<scope>): <résumé impératif>

<context>
<détails>
```
Types: feat, fix, refactor, chore, docs, test, perf, ci.

## Commits Atomiques
Éviter mélange logique + formatage + refactor dans un seul.

## Squash
- Nettoyer WIP
- Pas pour commits déjà sémantiques

## Rebase vs Merge
| Situation | Choix |
|-----------|-------|
| PR petite | Rebase |
| Historique partagé complexe | Merge |
| Politique linéaire | Rebase |

## Mettre à Jour Régulièrement
```bash
git fetch origin
git rebase origin/main
```

## Hooks Locaux
| Hook | Usage |
|------|------|
| pre-commit | Lint rapide |
| commit-msg | Valider format |
| pre-push | Tests |

## Revue de Code
| Focus | Guide |
|-------|-------|
| Intention | Comprendre pourquoi |
| Exactitude | Logique, edge cases |
| Impact | Performance, sécurité |
| Clarté | Noms, découpage |

## Checklist PR Exemple
- [ ] Tests passent
- [ ] Lint OK
- [ ] Docs à jour
- [ ] Pas de debug leftover

## Branches Release
- Tag sémantique
- Seule corrections critiques

## Feature Flags
Fusionner tôt masqué derrière flag.

## Anti‑Patterns
| Pattern | Problème |
|---------|----------|
| PR monolithique | Revue lente |
| Force push sur main | Instabilité |
| Commits "fix stuff" | Opacité |

## Mesures Indicatives
| Métrique | Cible |
|----------|-------|
| PR ouverte moyenne | < 24h |
| Taille PR | < 300 LOC |

## Récupération
```bash
git reflog
git reset --hard <hash>
```

## Résumé
Légèreté + discipline = flux prévisible. Prioriser lisibilité future de l'historique.
