# Mejores Prácticas de Git para la Colaboración en Equipo

## Objetivo
Flujo consistente, historial limpio y menos fricción.

## Fundamentos
| Principio | Razón |
|-----------|-------|
| Ramas cortas | Menos conflictos |
| Commits atómicos | Reversión simple |
| Revisión temprana | Calidad y alineación |
| Automatización | Repetible y confiable |
| Transparencia | Facilita decisiones |

## Nomenclatura de Ramas
```
feature/<scope>-<resumen>
fix/<issue>-<bug>
chore/<tarea>
refactor/<area>
docs/<tema>
release/<version>
```
Ejemplo: `feature/auth-refresh-token`.

## Mensajes de Commit
Formato recomendado:
```
<tipo>(<opcional-scope>): <resumen imperativo>

<motivo / contexto>
<detalle adicional>
```
Tipos comunes: feat, fix, refactor, chore, docs, test, perf, ci.

Ejemplo:
```
feat(auth): implement refresh token rotation

Prevents reuse attacks and aligns with security policy 2024-Q1.
```

## Commits Atómicos
Un cambio lógico = un commit. Evita mezclar refactor + feature.

## Squash Inteligente
- Squash en PR para condensar WIP
- Preserva claridad: no squash merges de release/hotfix

## Rebase vs Merge
| Caso | Recomendar |
|------|------------|
| PR pequeño | Rebase interactivo |
| Historial público ya compartido | Merge normal |
| Resolución de conflicto compleja | Merge (contexto) |
| Serie de commits limpios | Rebase para linealidad |

## Pull Frecuente
```bash
git fetch origin
git rebase origin/main
```
Mantiene rama fresca.

## Hooks Útiles (local)
| Hook | Uso |
|------|-----|
| pre-commit | Lint, tests rápidos |
| commit-msg | Validar formato |
| pre-push | Tests más largos |

## Revisiones de Código Saludables
| Práctica | Detalle |
|----------|---------|
| < 400 líneas | Menos fatiga |
| Checklist | Consistencia |
| Enfoque en intención | No micro-nit |
| Responder con contexto | Evita ping-pong |
| Aceptar mejoras incrementales | Evita bloqueo |

## Checklist PR Ejemplo
- [ ] Compila
- [ ] Tests pasan
- [ ] Sin console.log/BREAKPOINTS
- [ ] Docs actualizados
- [ ] Migraciones revisadas
- [ ] Seguridad evaluada

## Sincronización de Releases
- Tag semántico: `v1.4.0`
- Changelog generado (Conv. Commits)
- Branch release congelada salvo fixes críticos

## Feature Flags
Permiten merge temprano; reducen ramas longevas.

## Evitar
| Antipatrón | Riesgo |
|-----------|-------|
| Ramas gigantes | Dificultad de revisión |
| Commits "misc" | Historial opaco |
| Forzar push a main | Corrupción colaborativa |
| Ignorar conflictos menores | Deuda acumulada |
| Reescribir historial público | Rotura de clones |

## Flujos Combinados Ejemplo
```
main (siempre deployable)
develop (si se necesita integración)
feature/*
release/*
hotfix/*
```
Minimizar capas si el equipo es pequeño.

## Métricas Sanas (Indicativas)
| Métrica | Objetivo |
|---------|---------|
| Tiempo PR abierto | < 24h |
| Tamaño PR | < 300 LOC |
| Conflictos por PR | Tendencia ↓ |
| Reverts | Bajo y justificado |

## Refactors Seguros
1. Tests de protección
2. Cambios mecánicos pequeños
3. Commits separados
4. Revisión con contexto

## Integración Continua
- Lint + Format (fail early)
- Tests unitarios + rápidos
- Seguridad (dependabot / scanner)
- Build determinista

## Comunicación
Prefijo en mensaje de commit o PR: `[BREAKING]`, `[SECURITY]`.

## Recuperación
```bash
git reflog
git reset --hard <hash>
```

## Resumen
Disciplina ligera y consistente produce velocidad sostenible y reduce sorpresas en producción.
