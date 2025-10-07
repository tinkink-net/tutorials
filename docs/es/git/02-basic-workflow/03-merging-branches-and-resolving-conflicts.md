# Fusionar Ramas y Resolver Conflictos

## Introducción
Branching aísla trabajo; merging lo integra. Aprende merges seguros, estrategias y resolución confiable de conflictos.

## Requisitos
- Flujo básico (`add`, `commit`, `push`)
- Crear/cambiar ramas
- Entender `git log`

## Objetivos
1. Fusionar ramas feature
2. Diferenciar fast-forward vs merge commit
3. Detectar y resolver conflictos
4. Abortar o reiniciar un merge problemático
5. Reducir frecuencia de conflictos

## Modelo Mental
Un merge crea un commit con **dos padres** (HEAD y otra rama) salvo fast-forward. Usa un three-way merge:
```
BASE (ancestro común)
HEAD (rama actual)
OTHER (rama a fusionar)
```
Differences BASE→HEAD y BASE→OTHER; overlap = conflicto.

## Fast-Forward vs Merge Commit
| Escenario | Resultado | Cuándo | Pros | Contras |
|-----------|-----------|--------|------|---------|
| Fast-forward | Mover puntero | HEAD atrás de otra | Historia lineal | Pierde contexto de rama |
| Merge commit | Nuevo commit 2 padres | Historias divergentes | Punto de integración | Más ruido |

Forzar merge commit:
```bash
git merge --no-ff feature/login
```

## Flujo Básico
```bash
git checkout main
git pull origin main
git merge feature/login
git push origin main
```

## Vista Previa
```bash
git log --oneline main..feature/login
git merge --no-commit --no-ff feature/login
# Abort
git merge --abort
```

## Escenario de Conflicto
```
git merge feature/rate-limit
# CONFLICT ...
```
Marcadores:
```
<<<<<<< HEAD
"rateLimit": 200,
=======
"rateLimit": 500,
>>>>>>> feature/rate-limit
```

## Inspección
```bash
git status
git diff
git diff --name-only --diff-filter=U
```
Luego:
```bash
git add config/app.json
git commit
```
Mensaje custom:
```bash
git commit -m "Merge feature/rate-limit: ajusta a 300"
```

## Abortar
```bash
git merge --abort
```

## Opciones
| Opción | Propósito |
|--------|-----------|
| `--no-ff` | Forzar merge commit |
| `--squash` | Consolidar sin merge commit |
| `--no-commit` | Pausar antes de commit |
| `--abort` | Deshacer merge pendiente |
| `-X ours` | Preferir actual |
| `-X theirs` | Preferir rama fusionada |

Squash:
```bash
git merge --squash feature/search
git commit -m "Add search"
```

## Visualizar
```bash
git log --graph --oneline --decorate
```

## Herramientas
```bash
git mergetool
```

## Prevención
1. Rebase/pull frecuente
2. Ramas pequeñas
3. No mezclar formato con lógica
4. Linting consistente
5. Comunicar refactors grandes

## Binarios
```bash
git checkout --ours path/to/img.png
git checkout --theirs path/to/img.png
git add path/to/img.png
```

## Problemas Comunes
| Problema | Causa | Fix |
|----------|-------|-----|
| Conflictos repetidos | Rama longeva | Rebase temprano |
| Bloques enormes | Formato + lógica juntos | Separar formato |
| Merge accidental | Config/Policy | `git pull --ff-only` |
| Cambios perdidos | Restore antes de stage | `git reflog` |

## Checklist Pre-Merge
- [ ] CI verde
- [ ] Review aplicado
- [ ] Actualizado con `main`
- [ ] Sin secretos/debug
- [ ] Mensajes limpios

## Resumen
Comprende el tipo de merge, revisa commits entrantes, resuelve quirúrgicamente y commit claro. Buen hygiene = menos fricción.

---
**Comandos Clave**
```bash
git merge <branch>
git merge --no-ff <branch>
git merge --squash <branch>
git merge --abort
git diff --name-only --diff-filter=U
git log --graph --oneline --decorate
```
