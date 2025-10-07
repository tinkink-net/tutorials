# Git Rebase vs Merge: Cuándo usar cada uno

## Introducción
`merge` y `rebase` integran cambios, pero el resultado histórico difiere. Entenderlo permite claridad y menor dolor de integración.

## Diferencia Central
| Operación | Qué hace | Forma Historia | Commits | Uso típico |
|-----------|---------|----------------|---------|-----------|
| Merge | Crea commit de unión | No lineal (grafo) | Conservados | Integrar feature completo |
| Rebase | Reproduce commits sobre nueva base | Lineal | Reescritos | Actualizar feature antes de merge |

## Visual
```
     A---B  (feature)
    /
---o---C---D (main)
```
Merge:
```
---o---C---D----M
        \   /
         A-B
```
Rebase:
```
---o---C---D---A'---B'
```

## Pros / Contras
### Merge
+ Mantiene contexto real
+ Seguro (no reescribe publicados)
− Grafo ruidoso
− Muchos merges inflan historia

### Rebase
+ Historia limpia lineal
+ Bisect más fácil
− Reescribe hashes
− Riesgoso compartido
− Conflictos repetidos en cadenas largas

## Reglas Seguras Rebase
1. No rebase commits ya compartidos sin coordinación
2. Úsalo localmente antes del PR
3. Evita rebase tras iniciar revisión

## Actualizar Feature
```bash
git checkout feature/api-auth
git fetch origin
git rebase origin/main
# Resolver conflictos
git push --force-with-lease
```

## Rebase Interactivo
```bash
git rebase -i HEAD~6
```
Acciones: pick / squash / fixup / reword / edit

## Cuándo Preferir Merge
- Integrar feature terminado
- Contexto colaborativo grande
- Ramas de release
- Auditar orden de integración

## Cuándo Preferir Rebase
- Sincronizar con `main`
- Limpiar historia antes de compartir
- Fusionar commits exploratorios
- Evitar commits de merge triviales

## Flujo Híbrido
1. Desarrollar en `feature/*`
2. Rebase periódico
3. PR
4. Merge con `--no-ff`

## Conflictos en Rebase
```bash
git add <file>
git rebase --continue
```
Otros:
```bash
git rebase --skip
git rebase --abort
```

## Linealizar Historial con Muchos Merges
```bash
git rebase --rebase-merges origin/main
```

## Regla de Oro
En duda: merge. No reescribas historia pública sin acuerdo.

## Tabla Decisión
| Objetivo | Preferido | Razón |
|----------|-----------|-------|
| Contexto integración | Merge | Puntos visibles |
| Historia legible | Rebase | Simplicidad |
| Limpiar mensajes | Rebase interactivo | squash/reword |
| Preparar feature | Rebase | Menos ruido |
| Reversión fácil | Merge | Más contexto |

## Resumen
Rebase para desarrollo y limpieza; merge para integración y registro del evento.

---
**Comandos Clave**
```bash
git rebase origin/main
git rebase -i HEAD~N
git merge <branch>
git push --force-with-lease
```
