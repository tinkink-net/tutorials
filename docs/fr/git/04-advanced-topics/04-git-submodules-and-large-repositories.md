# Git Submodules et Gros Dépôts

## Quand les Utiliser
| Cas | Submodule | Alternative |
|-----|-----------|-------------|
| Dépendance version figée | ✔ | Paquet registry |
| Co-développement intensif | ✘ | Monorepo |
| Repo externe tiers | ✔ | Vendor périodique |
| Gros mono-repo lent | Parfois | Sparse checkout |

## Ajouter
```bash
git submodule add https://github.com/org/lib.git libs/lib
```

## Initialiser / Mettre à Jour
```bash
git submodule update --init --recursive
```

## Statut
```bash
git submodule status
```

## Changer Version
```bash
cd libs/lib
git fetch
git checkout <tag|commit>
cd ../../
git add libs/lib
git commit -m "chore: bump lib v1.4.2"
```

## Mettre à Jour Tous (branche suivie)
```bash
git submodule update --remote --merge
```

## .gitmodules
```
[submodule "libs/lib"]
	path = libs/lib
	url = https://github.com/org/lib.git
	branch = main
```

## Bonnes Pratiques
| Pratique | Bénéfice |
|----------|----------|
| Limiter nombre | Moins complexité |
| Commits figés | Reproductible |
| Script sync | Onboarding rapide |
| Doc mise à jour | Clarté |

## Problèmes Courants
| Symptôme | Solution |
|----------|---------|
| Dossier vide | update --init |
| Modifs ignorées | Commit dans submodule + parent |
| Mauvaise branche | Ajuster .gitmodules + sync |

## Retirer Submodule
```bash
git submodule deinit -f libs/lib
rm -rf .git/modules/libs/lib
rm -rf libs/lib
git rm -f libs/lib
```

## Alternatives Modernes
| Objectif | Option |
|----------|-------|
| Partage interne | Monorepo (workspaces) |
| Lib externe | Registry (npm, Maven) |
| Taille | Partial clone / sparse |

## Sparse Checkout
```bash
git sparse-checkout init --cone
git sparse-checkout set src/core src/api
```

## Clone Partiel
```bash
git clone --filter=blob:none --sparse https://github.com/org/big.git
```

## LFS (Fichiers lourds)
```bash
git lfs install
git lfs track "*.psd"
```

## Résumé
Submodules = dépendances épinglées. Pour collaboration rapprochée, préférer monorepo ou packaging. Optimiser gros dépôts avec sparse / partial clone / LFS.
