# Git Stash y Cambios Temporales

## Cuándo Usarlo
Interrumpe tu trabajo sin ensuciar commits. Guarda un snapshot ligero fuera del historial.

## Comandos Básicos
```bash
git stash push -m "wip: login form"
git stash list
git stash show -p stash@{0}
git stash apply stash@{0}
git stash drop stash@{0}
git stash pop
```

## Con Paths Específicos
```bash
git stash push -m "solo ui" src/components/
```

## Incluyendo Untracked y Ignorados
```bash
git stash push -u       # untracked
git stash push -a       # untracked + ignored
```

## Guardar Solo Parte (Interactivo)
```bash
git add -p
# Stage selectivo
git stash push --staged -m "parcial"
```

## Aplicar sin Borrar
```bash
git stash apply stash@{2}
```

## Reintegrar con Pop
```bash
git stash pop          # aplica y elimina el último
```
Si hay conflicto puedes resolver y continuar; el stash no se borra si falla.

## Ver Diferencias
```bash
git stash show --name-only stash@{1}
git stash show -p stash@{1}
```

## Nombrado Significativo
Usa prefijo `wip:` + área:
```
wip: billing proration logic
wip: refactor http client
```

## Recuperar un Stash Borrado (Si Referencia en Reflog)
```bash
git fsck --no-reflogs --lost-found
```
O pista en `git reflog` si se aplicó recientemente.

## Mantener Limpio
- Elimina stashes antiguos semanalmente
- No conviertas stashes en backlog oculto

## Convertir en Rama
```bash
git stash branch tmp-refactor stash@{0}
```
Útil si los cambios eran más grandes de lo pensado.

## Casos de Uso Comunes
| Situación | Acción |
|-----------|--------|
| Cambio urgente hotfix | `git stash push` → cambiar de rama |
| Rebase largo | `git stash push --keep-index` |
| Experimentación arriesgada | Stash incremental |
| Probar build limpia | Stash + test |

## Flags Clave
| Flag | Descripción |
|------|-------------|
| -m | Mensaje |
| -u | Incluye untracked |
| -a | Incluye untracked + ignored |
| --staged | Solo index |
| --keep-index | No guarda index |

## Anti-Patrones
| Antipatrón | Riesgo |
|------------|-------|
| Usar stash como storage largo | Olvido / confusión |
| Stash sin mensaje | Difícil de identificar |
| Pop sin revisar | Pérdida accidental |

## Alternativas
| Necesidad | Mejor Opción |
|-----------|--------------|
| Guardar progreso compartible | Commit WIP en rama |
| Dividir cambios | Commits atómicos |
| Probar hipótesis | Rama throwaway |

## Resumen
`git stash` es buffer temporal, no historial paralelo. Úsalo para interrupciones controladas y vuelta rápida al foco.
