# Git Hooks et Automatisation

## Définition
Scripts déclenchés sur événements Git pour appliquer politiques et tâches répétitives.

## Emplacement
```
.git/hooks/
```

## Hooks Locaux Clés
| Hook | Moment | Usage |
|------|--------|-------|
| pre-commit | Avant création commit | Lint, format rapide |
| commit-msg | Après message | Valider format |
| pre-push | Avant push | Tests, build |
| prepare-commit-msg | Avant édition | Pré-remplissage |

## Exemple pre-commit
```bash
#!/usr/bin/env bash
set -e
npm run lint
npm run test:quick
```
`chmod +x .git/hooks/pre-commit`

## commit-msg Format Conventionnel
```bash
#!/usr/bin/env bash
msgFile=$1
pattern='^(feat|fix|refactor|docs|test|chore)(\(.+\))?: '
if ! grep -Eq "$pattern" "$msgFile"; then
  echo "Format invalide: feat(scope): résumé" >&2
  exit 1
fi
```

## Bypass (rare)
```bash
git commit --no-verify
```

## Versionner Hooks
```bash
mkdir .githooks
git config core.hooksPath .githooks
```

## pre-push Exemple
```bash
#!/usr/bin/env bash
set -e
npm test -- --bail
```

## Serveur (Exemples)
| Hook | Rôle |
|------|------|
| pre-receive | Bloquer commits non conformes |
| update | Validation par branche |
| post-receive | Déploiement / notifications |

## Outils (Husky)
```bash
npm i -D husky
npx husky install
npx husky add .husky/pre-commit "npm run lint"
```

## Hooks vs CI
| Aspect | Hooks | CI |
|--------|-------|----|
| Latence | Instant | Minutes |
| Portée | Locale | Centrale |
| Fiabilité | Variable | Uniforme |

## Bonnes Pratiques
- Rapides (<2s)
- Messages d'erreur clairs
- Pas de secret dur-codé

## Dépannage
| Problème | Correction |
|----------|------------|
| Ne s'exécute pas | Permissions + shebang |
| Lent | Profil + cache |
| Fausse alerte | Ajuster règles |

## Exemple Bloquer Push direct main
```bash
#!/usr/bin/env bash
branch=$(git symbolic-ref --short HEAD)
if [ "$branch" = "main" ]; then
  echo "Push direct sur main interdit." >&2
  exit 1
fi
```

## Résumé
Hooks = garde-fous locaux; CI complète. Utiliser légers, partagés, cohérents.
