# Git Hooks y Automatización

## Qué Son
Scripts que se ejecutan en eventos del ciclo Git (local o del lado servidor) para reforzar políticas y automatizar tareas repetitivas.

## Ubicación
```
.git/hooks/
```
Ejemplos `.sample` presentes al inicializar un repo.

## Hooks Locales Más Útiles
| Hook | Momento | Uso Común |
|------|---------|-----------|
| pre-commit | Antes de crear commit | Lint, format, tests rápidos |
| commit-msg | Después de redactar mensaje | Validar convención |
| pre-push | Antes de enviar a remoto | Tests más lentos, build |
| prepare-commit-msg | Antes de abrir editor | Prefill mensaje |

## Ejemplo pre-commit (lint + formato)
```bash
#!/usr/bin/env bash
set -e
pnpm lint
pnpm format:check
```
Dar permisos:
```bash
chmod +x .git/hooks/pre-commit
```

## Validar Mensaje (commit-msg)
```bash
#!/usr/bin/env bash
msgFile=$1
pattern='^(feat|fix|refactor|docs|test|chore)(\(.+\))?: '
if ! grep -Eq "$pattern" "$msgFile"; then
  echo "Mensaje inválido. Usa: feat(scope): resumen" >&2
  exit 1
fi
```

## Saltar Hooks
```bash
git commit --no-verify
```
Úsalo solo si hay razón clara.

## Hooks Compartidos (core.hooksPath)
```bash
mkdir -p .githooks
git config core.hooksPath .githooks
```
Versiona `.githooks/` en el repo.

## Ejemplo pre-push
```bash
#!/usr/bin/env bash
set -e
pnpm test -- --bail
```

## Seguridad
- Revisa scripts antes de ejecutar (repos externos)
- No insertar secretos en hooks

## Del Lado Servidor (ejemplos)
| Hook | Uso |
|------|-----|
| pre-receive | Validar política (branch protegida) |
| update | Checks por rama |
| post-receive | Despliegue continuo, notificaciones |

## Flujo con Husky (Proyecto JS)
```bash
pnpm add -D husky
pnpm husky install
npx husky add .husky/pre-commit "pnpm lint"
```

## Diferencia CI vs Hooks
| Aspecto | Hooks | CI |
|---------|-------|----|
| Ámbito | Local inmediato | Centralizado |
| Tiempo feedback | Instantáneo | Minutos |
| Garantía | Depende del dev | Fuerte |
| Uso ideal | Filtros rápidos | Validación integral |

## Buenas Prácticas
- Mantener hooks rápidos (<2s)
- Fail fast con mensajes claros
- Documentar bypass permitido

## Troubleshooting
| Problema | Solución |
|----------|----------|
| Hook no corre | Permisos + ruta shebang |
| Lento | Perfilado + caché |
| Falsos positivos | Ajustar reglas lint |

## Ejemplo Avanzado: Bloquear main
pre-push (simplificado):
```bash
#!/usr/bin/env bash
branch=$(git symbolic-ref --short HEAD)
if [ "$branch" = "main" ]; then
  echo "Push directo a main bloqueado." >&2
  exit 1
fi
```

## Resumen
Hooks incrementan calidad temprano. Úsalos ligeros, versionados y alineados con pipeline CI.
