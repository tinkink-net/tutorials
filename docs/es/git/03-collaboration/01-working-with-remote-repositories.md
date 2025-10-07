# Trabajar con Repositorios Remotos

## Introducción
Los remotos permiten colaborar, respaldar y desplegar código. Esta guía cubre agregar, inspeccionar, sincronizar, podar y gestionar ramas remotas de forma segura.

## Conceptos Clave
| Término | Significado |
|--------|-------------|
| Remote | Referencia nombrada a un repo alojado (ej. `origin`) |
| Branch de tracking | Rama local vinculada a una rama remota (`main` ↔ `origin/main`) |
| Fetch | Descarga objetos y refs (sin tocar el árbol de trabajo) |
| Pull | Fetch + integración (merge o rebase) |
| Push | Sube commits locales a una rama remota |

## Listar Remotos
```bash
git remote -v
```

## Agregar Remoto
```bash
git remote add origin https://github.com/example/app.git
git remote add upstream https://github.com/org/app.git
```

## Cambiar URL
```bash
git remote set-url origin git@github.com:example/app.git
```

## Eliminar Remoto
```bash
git remote remove upstream
```

## Obtener Actualizaciones
```bash
git fetch
git fetch --all
git fetch origin main
```

## Ver Ramas Remotas
```bash
git branch -r
git branch -a
```

## Crear Rama de Tracking
```bash
git checkout -b feature/ui origin/feature/ui
# o
git switch -c feature/ui --track origin/feature/ui
```

## Definir Upstream Después
```bash
git branch --set-upstream-to=origin/main main
# o primer push
git push -u origin main
```

## Estrategia de Pull
Por defecto hace merge. Para rebase global:
```bash
git config --global pull.rebase true
```
Solo repo actual:
```bash
git config pull.rebase true
```

## Patrón Seguro de Actualización
```bash
git fetch origin
git rebase origin/main   # o merge según política
```

## Subir Ramas
```bash
git push origin feature/auth
```
Eliminar rama remota:
```bash
git push origin --delete feature/auth
```

## Renombrar Rama Local (y Remota)
```bash
git branch -m old-name new-name
git push origin :old-name new-name
git push origin -u new-name
```

## Podar Referencias Obsoletas
```bash
git remote prune origin
git fetch --prune
```

## Inspeccionar un Remoto
```bash
git remote show origin
```
Muestra tracking, ramas obsoletas y configuración de empuje.

## Flujo Multi-Remoto (Fork)
```bash
git remote add upstream https://github.com/original/project.git
git fetch upstream
git rebase upstream/main
git push origin main
```

## Mirroring (Administración)
```bash
git clone --mirror https://github.com/source/repo.git
cd repo.git
git push --mirror git@internal:backup/repo.git
```

## Consejos de Autenticación
- Prefiere SSH
- HTTPS + 2FA → Token personal
- Cachear credenciales: `git config --global credential.helper cache`

## Problemas Comunes
| Problema | Causa | Solución |
|----------|-------|----------|
| Push rechazado (non-fast-forward) | Remoto avanzó | `git pull --rebase` + push |
| Falla autenticación | Token/clave inválido | Regenerar credenciales |
| Editar en detached HEAD | Se hizo checkout a ref remota directo | `git switch -c fix upstream/main` |
| Ramas de tracking obsoletas | Rama remota eliminada | `git fetch --prune` |

## Mejores Prácticas
1. Nombres consistentes (`origin`, `upstream`)
2. Podar regularmente
3. Evitar force-push en ramas compartidas
4. Proteger `main`
5. Rotar tokens/SSH periódicamente

## Resumen
Dominar remotos habilita colaboración eficiente. Fetch deliberado, pull consciente, poda habitual, higiene upstream constante.

## Próximos Pasos
- Flujo de revisión (`pull-requests-and-code-review-workflow.md`)
- Estrategias de conflicto (`git-conflict-resolution-strategies.md`)

---
**Comandos Clave**
```bash
git remote -v
git fetch --all --prune
git push origin <branch>
git remote show origin
git remote prune origin
```
