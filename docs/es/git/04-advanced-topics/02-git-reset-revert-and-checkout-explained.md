# Git Reset, Revert y Checkout Explicados

## Visión General
| Comando | Modifica Historial | Área Afectada | Uso Primario |
|---------|--------------------|---------------|-------------|
| reset   | Sí (local)         | HEAD / Index / (Opcional) Working Dir | Reescribir progreso local |
| revert  | No (agrega commit) | Crea commit nuevo | Deshacer públicamente |
| checkout| No (mueve HEAD o archivos) | HEAD o WD | Navegar / extraer archivo |

## git reset
```bash
git reset --soft <hash>    # Solo mueve HEAD
git reset --mixed <hash>   # (por defecto) HEAD + index
git reset --hard <hash>    # HEAD + index + working dir
```
### Casos
| Situación | Acción |
|-----------|--------|
| Reagrupar commits | soft |
| Quitar archivos staged | mixed |
| Descartar todo local | hard |

## git revert
```bash
git revert <hash>
```
Genera un commit inverso. Seguro en ramas compartidas.

Revertir múltiples:
```bash
git revert <hash1> <hash2>
```
Revertir un merge (necesitas parent):
```bash
git revert -m 1 <merge_hash>
```

## git checkout (HEAD Antiguo)
```bash
git checkout <hash>
```
Estado "detached HEAD" para inspección.

Restaurar archivo específico:
```bash
git checkout HEAD -- src/app.js
```

## Ejemplo Comparativo
### Escenario: Quitar último commit local (no publicado)
- Preferir: `git reset --soft HEAD~1`
### Escenario: Deshacer commit ya en remoto
- Usar: `git revert <hash>`

## Visual Mental
```
reset   → Mueve apuntadores
revert  → Añade commit inverso
git checkout <hash> → Mueve HEAD temporalmente
```

## Riesgos
| Acción | Riesgo |
|--------|-------|
| reset --hard | Pérdida permanente si no referenciado |
| Revert de revert | Historial ruidoso |
| Checkout detached prolongado | Commits "huérfanos" |

## Recuperación
```bash
git reflog
# Encuentra hash perdido
git branch rescue <hash>
```

## Buenas Prácticas
- `reset --hard` solo si entiendes el impacto
- Preferir revert en ramas compartidas
- Etiquetar antes de operaciones masivas

## Alternativa Moderna
Para cambiar de rama en lugar de checkout:
```bash
git switch <branch>
```
Para crear y cambiar:
```bash
git switch -c feature/x
```

## Resumen
Elige según visibilidad: `reset` reescribe, `revert` narra, `checkout` observa o extrae. Usa la herramienta mínima necesaria.
