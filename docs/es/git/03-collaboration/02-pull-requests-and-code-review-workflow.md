# Pull Requests y Flujo de Revisión de Código

## Introducción
Un Pull Request (PR) formaliza la integración: agrupa cambios, muestra diffs, dispara automatizaciones y habilita feedback. Flujo agnóstico de plataforma.

## Razones para PR
- Puerta de calidad (tests, lint, seguridad)
- Difusión de conocimiento
- Trazabilidad / auditoría
- Impulsa unidades revisables pequeñas

## Nomenclatura de Ramas
| Tipo | Patrón | Ejemplo |
|------|--------|---------|
| Feature | `feature/<scope>` | `feature/payment-intents` |
| Fix | `fix/<issue-id>` | `fix/342-null-pointer` |
| Refactor | `refactor/<area>` | `refactor/auth-middleware` |
| Docs | `docs/<tema>` | `docs/api-pagination` |

## Ciclo
```
Plan → Branch → Commit → Sync → PR → Review → Update → Approve → Merge → Clean
```

## Crear PR (GitHub CLI)
```bash
git checkout -b feature/user-deactivation
# ...
git push -u origin feature/user-deactivation
gh pr create --fill --base main --head feature/user-deactivation
```

## Checklist de Calidad
- Título imperativo claro
- Descripción: problema → solución → notas
- Capturas/GIF UI
- `Fixes #id`
- Notas de pruebas / cobertura
- Estrategia de rollback

### Plantilla
```
## Summary
Implementa desactivación suave de usuarios.

## Changes
- Columna `status`
- Método servicio `deactivateUser()`
- Migración usuarios activos

## Testing
- Unit tests
- Prueba manual API (POST /users/:id/deactivate)

## Rollback
Revert migration 202510071230_add_status_column.sql
```

## Buenas Prácticas de Revisión
Revisor:
1. Entiende intención antes de estilo
2. Evalúa corrección, seguridad, performance, legibilidad
3. Sugiere (salvo política)
4. Aprueba sólo si listo para producción

Autor:
1. PR pequeño (< ~400 líneas añadidas)
2. Responde cada comentario
3. Evita force-push tras iniciar review (excepto squash final)
4. Mantén CI verde

## Incorporar Feedback
```bash
git commit -m "Refactor: extrae helper validación"
git push
```

## Draft vs Ready
Draft mientras estabiliza; Ready tras auto-revisión + tests.

## Automatizaciones Útiles
| Automación | Propósito |
|-----------|-----------|
| CI | Tests/Lint/Build |
| Análisis estático | Seguridad/Calidad |
| Conv. commit check | Estándar mensajes |
| Etiqueta tamaño | Detectar PR grandes |
| Auto reviewers | Menos latencia |

## Estrategias de Merge
| Estrategia | Descripción | Uso |
|-----------|-------------|-----|
| Squash | Un commit final | Historia limpia ruidosa |
| Rebase & merge | Linealiza | Preferencia lineal |
| Merge commit | Mantiene contexto | Features grandes |

Rebase previo (si política):
```bash
git fetch origin
git rebase origin/main
git push --force-with-lease
```

## Anti-patrones
| Patrón | Problema |
|--------|----------|
| PR gigante | Revisión difícil → bugs |
| Mezcla refactor+feature | Intención borrosa |
| Force-push post review | Invalida feedback |
| Sin descripción | Adivinanza |
| Ignorar CI rojo | Desperdicio tiempo |

## Limpieza Post-Merge
```bash
git checkout main
git pull origin main
git branch -d feature/user-deactivation
git push origin --delete feature/user-deactivation
```

## Métricas
- Tiempo de respuesta review
- Distribución tamaño PR
- Reverts / reopen
- Ratio squash vs merge

## Resumen
PR bien estructurado acelera entrega segura: claridad, tamaño reducido, validación automática, feedback respetuoso.

---
**Comandos Clave**
```bash
git push -u origin <branch>
git branch -d <branch>
git push origin --delete <branch>
```
