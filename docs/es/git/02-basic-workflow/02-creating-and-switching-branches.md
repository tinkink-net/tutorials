# Crear y Cambiar Ramas en Git

Las ramas (branches) son el superpoder de Git: te permiten aislar líneas de desarrollo para experimentar, corregir errores o construir funcionalidades sin afectar la estabilidad de `main`. Dominar su creación y cambio es fundamental para un flujo de trabajo eficaz.

---
## 1. Modelo Mental
`main` (antes `master`) es la historia publicada estable. Una rama es un puntero móvil a un commit. Al crear una rama dices: “Desde aquí inicio una nueva línea de trabajo”. No se copia el árbol; sólo se crea una referencia ligera.

Ideas clave:
- Una rama apunta a un commit.
- `HEAD` indica qué rama (o commit) tienes activa.
- Cada commit avanza el puntero de la rama.

Son baratas: usa una por feature, bugfix o experimento.

---
## 2. Listar Ramas Existentes
Local:
```
$ git branch
```
Actual marcada con `*`. Local + remotas:
```
$ git branch -a
```
Con último commit:
```
$ git branch -v
```
Eliminar referencias remotas obsoletas:
```
$ git fetch --prune
```

---
## 3. Crear una Nueva Rama
Actualizar base (normalmente `main`):
```
$ git checkout main
$ git pull origin main
```
Sólo crear:
```
$ git branch feature/login-form
```
Crear y cambiar (recomendado):
```
$ git switch -c feature/login-form
```
Sintaxis antigua:
```
$ git checkout -b feature/login-form
```
Convenciones sugeridas:
- `feature/<nombre>` funcionalidad
- `bugfix/<ticket>` corrección
- `hotfix/<critico>` parche urgente producción
- `refactor/…`, `chore/…`, etc.

Evita espacios, mayúsculas y nombres ambiguos (`new`, `temp`).

---
## 4. Cambiar de Rama
```
$ git switch feature/login-form
```
Viejo:
```
$ git checkout feature/login-form
```
Git bloquea el cambio si perderías cambios sin commit. Opciones:
- Commit
- Stash: `git stash push -m "WIP"`
- Descartar: `git restore .`

Volver a la anterior:
```
$ git switch -
```

### Estado Detached HEAD
Si haces checkout a un commit:
```
$ git checkout 4f2a9c1
```
Estás “detached”. Puedes probar, pero commits sin rama pueden perderse. Para conservar:
```
$ git switch -c experiment/performance-tuning
```

---
## 5. Mantener Actualizada la Rama
Mientras desarrollas, `main` sigue avanzando:
```
$ git switch feature/login-form
$ git fetch origin
$ git merge origin/main
```
Historia lineal (si trabajas solo):
```
$ git fetch origin
$ git rebase origin/main
```
No rebases ramas compartidas (reescribe hashes).

---
## 6. Subir la Rama (Push)
Hasta hacer push es sólo local:
```
$ git push -u origin feature/login-form
```
Ver tracking:
```
$ git branch -vv
```

---
## 7. Renombrar Rama
En la misma rama:
```
$ git branch -m feature/login-form feature/auth-ui
```
Actualizar remoto:
```
$ git push origin :feature/login-form
$ git push -u origin feature/auth-ui
```

---
## 8. Eliminar Ramas
Tras integrar y no necesitarla:
Local:
```
$ git branch -d feature/login-form
```
Forzar:
```
$ git branch -D feature/login-form
```
Remoto:
```
$ git push origin --delete feature/login-form
```

---
## 9. Ejemplo de Flujo Feature
1. Actualiza main
2. Crea rama feature
3. Commits pequeños y descriptivos
4. Rebase o merge regular desde `origin/main`
5. Push + PR/MR
6. Elimina rama local y remota tras merge

---
## 10. Problemas Frecuentes
| Situación | Causa | Solución |
|----------|-------|----------|
| No cambia de rama | Cambios sobrescritos | Commit / stash / restore |
| Detached HEAD | Commit directo | `git switch -c nombre` |
| Falta rama tras clonar | Sólo rama por defecto | `git fetch --all` + switch |
| Push rechazado | Remote avanzó | `git pull --rebase` + push |
| Rama borrada accidentalmente | Sin referencia | `git reflog` + nueva rama |

---
## 11. Uso Estratégico
Además de features:
- Prototipos
- Hotfix desde tags
- (Limitados) branches de integración
- Cambios de docs/infra

Mantén ramas cortas: menos divergencia, menos conflictos.

---
## 12. Ejercicio
1. Init o clona repo
2. Crea `feature/colors` y añade archivo
3. Dos commits
4. Rebase tras cambio en `main`
5. Renombra a `feature/theme-colors`
6. Push + PR
7. Merge y borra

---
## 13. Claves
- Crear ramas es instantáneo → abusa de ello
- `switch` es más claro que `checkout` para ramas
- Actualiza pronto para minimizar fricción
- Limpia ramas viejas
- Crea rama antes de experimentar

Dominar branching habilita rebase avanzado y estrategias multi-rama.
